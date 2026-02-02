// Slot Machine Sound Effects using Web Audio API
// No external API required - synthesized sounds

class SlotSoundEffects {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private volume: number = 0.5;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    // Resume if suspended (browser autoplay policy)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  isEnabled() {
    return this.enabled;
  }

  getVolume() {
    return this.volume;
  }

  // Spinning reel sound - rapid clicking
  playSpinStart() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // Create a series of rapid clicks
    for (let i = 0; i < 8; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = 800 + Math.random() * 200;
      osc.type = 'square';
      
      const clickTime = now + i * 0.05;
      gain.gain.setValueAtTime(0.1 * this.volume, clickTime);
      gain.gain.setValueAtTime(0.001, clickTime + 0.03);
      
      osc.start(clickTime);
      osc.stop(clickTime + 0.03);
    }
  }

  // Reel spinning loop sound
  playReelSpin(): () => void {
    if (!this.enabled) return () => {};
    
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sawtooth';
    osc.frequency.value = 100;
    
    filter.type = 'lowpass';
    filter.frequency.value = 500;
    
    gain.gain.value = 0.08 * this.volume;
    
    osc.start();
    
    // Return stop function
    return () => {
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      setTimeout(() => osc.stop(), 150);
    };
  }

  // Reel stop sound - mechanical clunk
  playReelStop() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // Low thump
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
    osc.type = 'sine';
    
    gain.gain.setValueAtTime(0.3 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    osc.start(now);
    osc.stop(now + 0.15);

    // Click overlay
    const click = ctx.createOscillator();
    const clickGain = ctx.createGain();
    
    click.connect(clickGain);
    clickGain.connect(ctx.destination);
    
    click.frequency.value = 1200;
    click.type = 'square';
    
    clickGain.gain.setValueAtTime(0.15 * this.volume, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    
    click.start(now);
    click.stop(now + 0.03);
  }

  // Small win sound - ascending notes
  playSmallWin() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    const notes = [523, 659, 784]; // C5, E5, G5
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = freq;
      osc.type = 'sine';
      
      const noteTime = now + i * 0.1;
      gain.gain.setValueAtTime(0, noteTime);
      gain.gain.linearRampToValueAtTime(0.25 * this.volume, noteTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.3);
      
      osc.start(noteTime);
      osc.stop(noteTime + 0.3);
    });
  }

  // Medium win sound - coin cascade
  playMediumWin() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // Fanfare chord
    const chord = [523, 659, 784, 1047]; // C5, E5, G5, C6
    
    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = freq;
      osc.type = 'triangle';
      
      gain.gain.setValueAtTime(0.2 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      
      osc.start(now);
      osc.stop(now + 0.8);
    });

    // Coin sounds
    for (let i = 0; i < 10; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = 2000 + Math.random() * 2000;
      osc.type = 'sine';
      
      const coinTime = now + 0.1 + i * 0.08;
      gain.gain.setValueAtTime(0.1 * this.volume, coinTime);
      gain.gain.exponentialRampToValueAtTime(0.001, coinTime + 0.1);
      
      osc.start(coinTime);
      osc.stop(coinTime + 0.1);
    }
  }

  // Big win sound - epic fanfare
  playBigWin() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // Epic ascending melody
    const melody = [
      { freq: 392, time: 0 },      // G4
      { freq: 523, time: 0.15 },   // C5
      { freq: 659, time: 0.3 },    // E5
      { freq: 784, time: 0.45 },   // G5
      { freq: 1047, time: 0.6 },   // C6
    ];
    
    melody.forEach(({ freq, time }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = freq;
      osc.type = 'triangle';
      
      const noteTime = now + time;
      gain.gain.setValueAtTime(0.3 * this.volume, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.4);
      
      osc.start(noteTime);
      osc.stop(noteTime + 0.4);
    });

    // Triumphant chord at the end
    setTimeout(() => {
      const chordNotes = [523, 659, 784, 1047, 1319]; // C major with high E
      chordNotes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.value = freq;
        osc.type = 'sine';
        
        gain.gain.setValueAtTime(0.15 * this.volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
        
        osc.start();
        osc.stop(ctx.currentTime + 1.5);
      });
    }, 700);

    // Lots of coins
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.value = 2500 + Math.random() * 2500;
        osc.type = 'sine';
        
        gain.gain.setValueAtTime(0.08 * this.volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }, 800 + i * 60);
    }
  }

  // Bonus trigger sound - magical/mystical
  playBonusTrigger() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // Mystical shimmer - ascending sweep
    const sweep = ctx.createOscillator();
    const sweepGain = ctx.createGain();
    
    sweep.connect(sweepGain);
    sweepGain.connect(ctx.destination);
    
    sweep.frequency.setValueAtTime(200, now);
    sweep.frequency.exponentialRampToValueAtTime(2000, now + 0.5);
    sweep.type = 'sine';
    
    sweepGain.gain.setValueAtTime(0.2 * this.volume, now);
    sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    
    sweep.start(now);
    sweep.stop(now + 0.6);

    // Magical sparkles
    for (let i = 0; i < 15; i++) {
      const sparkle = ctx.createOscillator();
      const sparkleGain = ctx.createGain();
      
      sparkle.connect(sparkleGain);
      sparkleGain.connect(ctx.destination);
      
      sparkle.frequency.value = 1500 + Math.random() * 3000;
      sparkle.type = 'sine';
      
      const sparkleTime = now + 0.1 + i * 0.04;
      sparkleGain.gain.setValueAtTime(0.12 * this.volume, sparkleTime);
      sparkleGain.gain.exponentialRampToValueAtTime(0.001, sparkleTime + 0.15);
      
      sparkle.start(sparkleTime);
      sparkle.stop(sparkleTime + 0.15);
    }

    // Deep mystical tone
    const deep = ctx.createOscillator();
    const deepGain = ctx.createGain();
    
    deep.connect(deepGain);
    deepGain.connect(ctx.destination);
    
    deep.frequency.value = 80;
    deep.type = 'sine';
    
    deepGain.gain.setValueAtTime(0.25 * this.volume, now);
    deepGain.gain.exponentialRampToValueAtTime(0.001, now + 1);
    
    deep.start(now);
    deep.stop(now + 1);

    // Final magical chord
    setTimeout(() => {
      const magicNotes = [440, 554, 659, 880, 1109]; // A minor type
      magicNotes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.value = freq;
        osc.type = 'triangle';
        
        gain.gain.setValueAtTime(0.12 * this.volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      });
    }, 500);
  }

  // Button click sound
  playButtonClick() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.frequency.value = 600;
    osc.type = 'sine';
    
    gain.gain.setValueAtTime(0.15 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    
    osc.start(now);
    osc.stop(now + 0.08);
  }

  // No win sound - descending tone
  playNoWin() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.3);
    osc.type = 'sine';
    
    gain.gain.setValueAtTime(0.1 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    
    osc.start(now);
    osc.stop(now + 0.3);
  }
}

// Singleton instance
export const slotSounds = new SlotSoundEffects();
