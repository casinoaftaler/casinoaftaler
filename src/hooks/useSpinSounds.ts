import { useRef, useState, useCallback, useEffect } from "react";

// Lazy-loaded audio with Web Audio API for precise timing
function createOscillatorSound(
  ctx: AudioContext,
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  gain = 0.15
) {
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  gainNode.gain.setValueAtTime(gain, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

export function useSpinSounds() {
  const ctxRef = useRef<AudioContext | null>(null);
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem("spin_muted") === "true";
    } catch {
      return false;
    }
  });
  const tickIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickCountRef = useRef(0);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("spin_muted", String(next));
      } catch {}
      return next;
    });
  }, []);

  const playSpinStart = useCallback(() => {
    if (muted) return;
    const ctx = getCtx();
    // Rising whoosh
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  }, [muted, getCtx]);

  const startTicking = useCallback(() => {
    if (muted) return;
    tickCountRef.current = 0;
    const tick = () => {
      tickCountRef.current++;
      const ctx = getCtx();
      createOscillatorSound(ctx, 1200 + Math.random() * 200, 0.04, "square", 0.08);
      // Gradually slow ticking: start 60ms, end ~300ms over ~5 seconds
      const progress = Math.min(tickCountRef.current / 60, 1);
      const delay = 60 + progress * progress * 240;
      tickIntervalRef.current = setTimeout(tick, delay);
    };
    tick();
  }, [muted, getCtx]);

  const stopTicking = useCallback(() => {
    if (tickIntervalRef.current) {
      clearTimeout(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }
  }, []);

  const playStop = useCallback(() => {
    if (muted) return;
    const ctx = getCtx();
    // Thud sound
    createOscillatorSound(ctx, 150, 0.2, "sine", 0.2);
    setTimeout(() => createOscillatorSound(ctx, 100, 0.15, "sine", 0.15), 50);
  }, [muted, getCtx]);

  const playWin = useCallback(() => {
    if (muted) return;
    const ctx = getCtx();
    // Victory jingle - rising notes
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => {
        createOscillatorSound(ctx, freq, 0.3, "sine", 0.12);
        createOscillatorSound(ctx, freq * 1.5, 0.2, "triangle", 0.06);
      }, i * 120);
    });
  }, [muted, getCtx]);

  const playLose = useCallback(() => {
    if (muted) return;
    const ctx = getCtx();
    // Descending tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  }, [muted, getCtx]);

  // Cleanup
  useEffect(() => {
    return () => {
      stopTicking();
    };
  }, [stopTicking]);

  return {
    muted,
    toggleMute,
    playSpinStart,
    startTicking,
    stopTicking,
    playStop,
    playWin,
    playLose,
  };
}
