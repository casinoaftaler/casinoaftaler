import React, { useRef, useEffect, useCallback, useState } from "react";

interface ChromaKeyVideoProps {
  src: string;
  width: number;
  height: number;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  playbackRate?: number;
  playTrigger?: number;
  onEnded?: () => void;
}

const VERTEX_SHADER = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform sampler2D u_video;
  void main() {
    vec4 color = texture2D(u_video, v_texCoord);
    float g = color.g;
    float r = color.r;
    float b = color.b;
    float maxRB = max(r, b);
    float greenDominance = g - maxRB;
    // Hard key — aggressive removal of green-dominant pixels
    if (greenDominance > 0.05 && g > 0.15) {
      discard;
    }
    // Soft edge — fade out green fringe
    float alpha = 1.0;
    if (greenDominance > 0.02 && g > 0.10) {
      alpha = smoothstep(0.05, 0.02, greenDominance);
    }
    // Despill — remove green tint from edge pixels
    float despill = max(0.0, g - maxRB * 0.8);
    color.g = g - despill * 0.6;
    gl_FragColor = vec4(color.rgb, color.a * alpha);
  }
`;

function initWebGL(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
  if (!gl) return null;

  const vs = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(vs, VERTEX_SHADER);
  gl.compileShader(vs);

  const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(fs, FRAGMENT_SHADER);
  gl.compileShader(fs);

  const program = gl.createProgram()!;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.useProgram(program);

  // Full-screen quad
  const posBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const texBuf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texBuf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,1, 1,1, 0,0, 1,0]), gl.STATIC_DRAW);
  const aTex = gl.getAttribLocation(program, "a_texCoord");
  gl.enableVertexAttribArray(aTex);
  gl.vertexAttribPointer(aTex, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  // Clear to transparent immediately
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return { gl, texture };
}

export const ChromaKeyVideo = React.memo(function ChromaKeyVideo({
  src,
  width,
  height,
  className,
  autoplay = true,
  loop = true,
  playbackRate = 1,
  playTrigger,
  onEnded,
}: ChromaKeyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const glRef = useRef<{ gl: WebGLRenderingContext; texture: WebGLTexture } | null>(null);
  const sizedRef = useRef(false);
  const [ready, setReady] = useState(false);
  const hasRenderedFrameRef = useRef(false);

  const renderFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return false;

    if (!glRef.current) {
      glRef.current = initWebGL(canvas);
    }
    const ctx = glRef.current;
    if (!ctx) return false;

    const { gl, texture } = ctx;

    // Set canvas size once we know video dimensions
    if (!sizedRef.current && video.videoWidth > 0) {
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      const aspectRatio = vw / vh;
      let dw = width;
      let dh = dw / aspectRatio;
      if (dh > height) {
        dh = height;
        dw = dh * aspectRatio;
      }
      canvas.width = Math.round(dw);
      canvas.height = Math.round(dh);
      gl.viewport(0, 0, canvas.width, canvas.height);
      sizedRef.current = true;
    }

    if (video.videoWidth === 0) return false;

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (!hasRenderedFrameRef.current) {
      hasRenderedFrameRef.current = true;
      setReady(true);
    }

    return true;
  }, [width, height]);

  const processFrame = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.paused || video.ended) return;
    renderFrame();
    rafRef.current = requestAnimationFrame(processFrame);
  }, [renderFrame]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    hasRenderedFrameRef.current = false;
    setReady(false);

    const startProcessing = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      sizedRef.current = false;
      rafRef.current = requestAnimationFrame(processFrame);
    };

    const handleEnded = () => {
      onEnded?.();
    };

    // When video has loaded enough data, render the first frame immediately
    // before showing - prevents green screen flash
    const handleCanPlay = () => {
      renderFrame();
    };

    video.playbackRate = playbackRate;
    video.addEventListener("play", startProcessing);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("canplay", handleCanPlay);

    // Try to play only when autoplay is intended.
    const primeVideo = () => {
      try {
        video.pause();
        if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
          video.load();
        } else {
          renderFrame();
        }
      } catch {
        renderFrame();
      }
    };

    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        try {
          video.load();
          await video.play();
        } catch {
          console.warn("[ChromaKeyVideo] Play failed for", src);
          renderFrame();
        }
      }
    };

    if (autoplay) {
      tryPlay();
    } else {
      primeVideo();
    }

    return () => {
      video.removeEventListener("play", startProcessing);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("canplay", handleCanPlay);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [autoplay, processFrame, renderFrame, onEnded, playbackRate, src]);

  // Handle playTrigger changes — restart video from beginning without flashing
  useEffect(() => {
    if (playTrigger === undefined || playTrigger === 0) return;
    const video = videoRef.current;
    if (!video) return;

    hasRenderedFrameRef.current = false;
    setReady(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const handleSeeked = () => {
      renderFrame();
      video.playbackRate = playbackRate;
      video.play().catch(() => {
        renderFrame();
      });
    };

    video.pause();
    video.addEventListener("seeked", handleSeeked, { once: true });

    try {
      video.currentTime = 0;
    } catch {
      handleSeeked();
    }

    return () => {
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [playTrigger, playbackRate, renderFrame]);

  return (
    <div
      className={className}
      style={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <video
        ref={videoRef}
        src={src}
        loop={loop}
        muted
        playsInline
        autoPlay
        preload="auto"
        crossOrigin="anonymous"
        style={{ display: "none" }}
      />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          width: "auto",
          height: "auto",
          maxWidth: "100%",
          maxHeight: "100%",
          display: "block",
          // Hide canvas until first chroma-keyed frame is rendered
          // This prevents the green/black flash between video switches
          opacity: ready ? 1 : 0,
           transition: "none",
        }}
      />
    </div>
  );
});
