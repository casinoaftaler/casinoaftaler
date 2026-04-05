import React, { useRef, useEffect, useCallback, useState } from "react";

interface BlackChromaKeyVideoProps {
  src: string;
  width: number;
  height: number;
  className?: string;
  loop?: boolean;
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
    float lum = color.r * 0.299 + color.g * 0.587 + color.b * 0.114;
    if (lum < 0.08) {
      discard;
    }
    float alpha = smoothstep(0.08, 0.18, lum);
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
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return { gl, texture };
}

export const BlackChromaKeyVideo = React.memo(function BlackChromaKeyVideo({
  src,
  width,
  height,
  className,
  loop = false,
  onEnded,
}: BlackChromaKeyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const glRef = useRef<{ gl: WebGLRenderingContext; texture: WebGLTexture } | null>(null);
  const [ready, setReady] = useState(false);

  const readyRef = useRef(false);

  const renderFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.videoWidth === 0) return;

    if (!glRef.current) {
      glRef.current = initWebGL(canvas);
    }
    const ctx = glRef.current;
    if (!ctx) return;

    const { gl, texture } = ctx;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (!readyRef.current) {
      readyRef.current = true;
      setReady(true);
    }
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

    const startProcessing = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(processFrame);
    };

    const handleEnded = () => onEnded?.();

    video.addEventListener("play", startProcessing);
    video.addEventListener("ended", handleEnded);

    video.play().catch(() => {
      renderFrame();
    });

    return () => {
      video.removeEventListener("play", startProcessing);
      video.removeEventListener("ended", handleEnded);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [processFrame, renderFrame, onEnded, src]);

  return (
    <div className={className} style={{ width, height, position: "relative" }}>
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
          width: "100%",
          height: "100%",
          display: "block",
          opacity: ready ? 1 : 0,
        }}
      />
    </div>
  );
});
