import React, { useRef, useEffect, useCallback } from "react";

interface ChromaKeyVideoProps {
  src: string;
  width: number;
  height: number;
  className?: string;
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
    // Hard key
    if (g > 0.314 && g > r * 1.4 && g > b * 1.4) {
      discard;
    }
    // Soft edge
    float alpha = 1.0;
    if (g > 0.235 && g > r * 1.2 && g > b * 1.2) {
      alpha = 0.5;
    }
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

  return { gl, texture };
}

export const ChromaKeyVideo = React.memo(function ChromaKeyVideo({
  src,
  width,
  height,
  className,
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

  const processFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.paused || video.ended) return;

    if (!glRef.current) {
      glRef.current = initWebGL(canvas);
    }
    const ctx = glRef.current;
    if (!ctx) {
      rafRef.current = requestAnimationFrame(processFrame);
      return;
    }

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

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    rafRef.current = requestAnimationFrame(processFrame);
  }, [width, height]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startProcessing = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      sizedRef.current = false;
      rafRef.current = requestAnimationFrame(processFrame);
    };

    const handleEnded = () => {
      onEnded?.();
    };

    video.playbackRate = playbackRate;
    video.addEventListener("play", startProcessing);
    video.addEventListener("ended", handleEnded);
    video.play().catch(() => {});

    return () => {
      video.removeEventListener("play", startProcessing);
      video.removeEventListener("ended", handleEnded);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [processFrame, onEnded]);

  // Handle playTrigger changes — restart video from beginning
  useEffect(() => {
    if (playTrigger === undefined || playTrigger === 0) return;
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  }, [playTrigger]);

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
        }}
      />
    </div>
  );
});
