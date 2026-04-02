import React, { useRef, useEffect, useCallback } from "react";

interface ChromaKeyVideoProps {
  src: string;
  width: number;
  height: number;
  className?: string;
}

export const ChromaKeyVideo = React.memo(function ChromaKeyVideo({
  src,
  width,
  height,
  className,
}: ChromaKeyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const bufferCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const processFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.paused || video.ended) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Use offscreen buffer at video's native resolution
    if (!bufferCanvasRef.current) {
      bufferCanvasRef.current = document.createElement("canvas");
    }
    const buf = bufferCanvasRef.current;
    buf.width = video.videoWidth || canvas.width;
    buf.height = video.videoHeight || canvas.height;
    const bCtx = buf.getContext("2d", { willReadFrequently: true });
    if (!bCtx) return;

    bCtx.drawImage(video, 0, 0, buf.width, buf.height);
    const frame = bCtx.getImageData(0, 0, buf.width, buf.height);
    const data = frame.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Green screen removal: if green is dominant
      if (g > 80 && g > r * 1.4 && g > b * 1.4) {
        data[i + 3] = 0; // fully transparent
      } else if (g > 60 && g > r * 1.2 && g > b * 1.2) {
        // Edge softening
        data[i + 3] = 128;
      }
    }

    bCtx.putImageData(frame, 0, 0);

    // Draw to display canvas maintaining aspect ratio
    const vw = buf.width;
    const vh = buf.height;
    const aspectRatio = vw / vh;
    let dw = width;
    let dh = dw / aspectRatio;
    if (dh > height) {
      dh = height;
      dw = dh * aspectRatio;
    }
    canvas.width = Math.round(dw);
    canvas.height = Math.round(dh);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(buf, 0, 0, canvas.width, canvas.height);

    rafRef.current = requestAnimationFrame(processFrame);
  }, [width, height]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startProcessing = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(processFrame);
    };

    video.addEventListener("play", startProcessing);
    // Auto-play
    video.play().catch(() => {});

    return () => {
      video.removeEventListener("play", startProcessing);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [processFrame]);

  return (
    <div className={className} style={{ width, height }}>
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        autoPlay
        style={{ display: "none" }}
      />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
});
