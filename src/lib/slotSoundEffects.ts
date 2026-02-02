// Slot Machine Sound Effects using Web Audio API
// Egyptian-themed synthesized sounds inspired by ancient Egypt

class SlotSoundEffects {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private volume: number = 0.5;
  private musicEnabled: boolean = true;
  private musicGainNode: GainNode | null = null;
  private currentMusic: OscillatorNode[] = [];
  private musicInterval: NodeJS.Timeout | null = null;

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
    if (!enabled) {
      this.stopMusic();
    }
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.musicGainNode) {
      this.musicGainNode.gain.value = 0.08 * this.volume;
    }
  }

  isEnabled() {
    return this.enabled;
  }

  getVolume() {
    return this.volume;
  }

  isMusicEnabled() {
    return this.musicEnabled;
  }

  setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (enabled && this.enabled) {
      this.startMusic();
    } else {
      this.stopMusic();
    }
  }

  // Egyptian pentatonic scale notes (ancient Egyptian-inspired)
  private getEgyptianScale(): number[] {
    // D minor pentatonic with added augmented notes for exotic feel
    return [146.83, 174.61, 196.00, 220.00, 261.63, 293.66, 349.23, 392.00, 440.00];
  }

  // Start ambient Egyptian background music
  startMusic() {
    if (!this.enabled || !this.musicEnabled) return;
    if (this.musicInterval) return; // Already playing

    const ctx = this.getContext();
    
    // Create master gain for music
    this.musicGainNode = ctx.createGain();
    this.musicGainNode.gain.value = 0.08 * this.volume;
    this.musicGainNode.connect(ctx.destination);

    // Low drone - the foundation
    const drone = ctx.createOscillator();
    const droneGain = ctx.createGain();
    const droneFilter = ctx.createBiquadFilter();
    
    drone.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(this.musicGainNode);
    
    drone.frequency.value = 73.42; // D2
    drone.type = 'sine';
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 200;
    droneGain.gain.value = 0.6;
    
    drone.start();
    this.currentMusic.push(drone);

    // Second drone - fifth above for depth
    const drone2 = ctx.createOscillator();
    const drone2Gain = ctx.createGain();
    
    drone2.connect(drone2Gain);
    drone2Gain.connect(this.musicGainNode);
    
    drone2.frequency.value = 110; // A2
    drone2.type = 'sine';
    drone2Gain.gain.value = 0.3;
    
    drone2.start();
    this.currentMusic.push(drone2);

    // Melodic pattern - Egyptian scale arpeggios
    const scale = this.getEgyptianScale();
    let noteIndex = 0;
    let ascending = true;

    this.musicInterval = setInterval(() => {
      if (!this.enabled || !this.musicEnabled) return;
      
      const melodyOsc = ctx.createOscillator();
      const melodyGain = ctx.createGain();
      const melodyFilter = ctx.createBiquadFilter();
      
      melodyOsc.connect(melodyFilter);
      melodyFilter.connect(melodyGain);
      melodyGain.connect(this.musicGainNode!);
      
      melodyOsc.frequency.value = scale[noteIndex];
      melodyOsc.type = 'triangle';
      
      melodyFilter.type = 'lowpass';
      melodyFilter.frequency.value = 1500;
      
      const now = ctx.currentTime;
      melodyGain.gain.setValueAtTime(0.4, now);
      melodyGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
      
      melodyOsc.start(now);
      melodyOsc.stop(now + 2);

      // Add shimmer/bell tone
      if (Math.random() > 0.5) {
        const shimmer = ctx.createOscillator();
        const shimmerGain = ctx.createGain();
        
        shimmer.connect(shimmerGain);
        shimmerGain.connect(this.musicGainNode!);
        
        shimmer.frequency.value = scale[noteIndex] * 2;
        shimmer.type = 'sine';
        
        shimmerGain.gain.setValueAtTime(0.15, now + 0.1);
        shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
        
        shimmer.start(now + 0.1);
        shimmer.stop(now + 1.5);
      }

      // Move through scale
      if (ascending) {
        noteIndex++;
        if (noteIndex >= scale.length - 1) ascending = false;
      } else {
        noteIndex--;
        if (noteIndex <= 0) ascending = true;
      }
    }, 2000);
  }

  stopMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    
    this.currentMusic.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Already stopped
      }
    });
    this.currentMusic = [];
    
    if (this.musicGainNode) {
      this.musicGainNode.disconnect();
      this.musicGainNode = null;
    }
  }

  // Egyptian-themed spinning reel sound - mystical whoosh with ancient percussion
  playSpinStart() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // Mystical whoosh sweep
    const sweep = ctx.createOscillator();
    const sweepGain = ctx.createGain();
    const sweepFilter = ctx.createBiquadFilter();
    
    sweep.connect(sweepFilter);
    sweepFilter.connect(sweepGain);
    sweepGain.connect(ctx.destination);
    
    sweep.frequency.setValueAtTime(100, now);
    sweep.frequency.exponentialRampToValueAtTime(600, now + 0.3);
    sweep.type = 'sawtooth';
    
    sweepFilter.type = 'lowpass';
    sweepFilter.frequency.setValueAtTime(300, now);
    sweepFilter.frequency.exponentialRampToValueAtTime(1500, now + 0.3);
    
    sweepGain.gain.setValueAtTime(0.15 * this.volume, now);
    sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    
    sweep.start(now);
    sweep.stop(now + 0.4);

    // Ancient drum hits (like a sistrum or frame drum)
    for (let i = 0; i < 6; i++) {
      const drum = ctx.createOscillator();
      const drumGain = ctx.createGain();
      
      drum.connect(drumGain);
      drumGain.connect(ctx.destination);
      
      const hitTime = now + i * 0.06;
      drum.frequency.setValueAtTime(180 - i * 10, hitTime);
      drum.frequency.exponentialRampToValueAtTime(60, hitTime + 0.05);
      drum.type = 'sine';
      
      drumGain.gain.setValueAtTime(0.12 * this.volume, hitTime);
      drumGain.gain.exponentialRampToValueAtTime(0.001, hitTime + 0.08);
      
      drum.start(hitTime);
      drum.stop(hitTime + 0.08);
    }
  }

  // Reel spinning loop - mystical humming with desert wind
  playReelSpin(): () => void {
    if (!this.enabled) return () => {};
    
    const ctx = this.getContext();
    
    // Main spinning hum
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sawtooth';
    osc.frequency.value = 110;
    
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    
    gain.gain.value = 0.06 * this.volume;
    
    osc.start();

    // Add modulation for mystical wavering
    const modulator = ctx.createOscillator();
    const modGain = ctx.createGain();
    
    modulator.connect(modGain);
    modGain.connect(osc.frequency);
    
    modulator.frequency.value = 6;
    modGain.gain.value = 15;
    
    modulator.start();
    
    // Return stop function
    return () => {
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      setTimeout(() => {
        osc.stop();
        modulator.stop();
      }, 200);
    };
  }

  // Individual reel stop sound - plays when each reel lands (with pitch variation per reel)
  playReelStopSingle(reelIndex: number = 0) {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // Base frequency increases slightly for each reel (creates ascending effect)
    const basePitch = 100 + reelIndex * 15;
    const chimePitch = 660 + reelIndex * 110; // Golden chime goes up for each reel

    // Heavy stone impact
    const impact = ctx.createOscillator();
    const impactGain = ctx.createGain();
    const impactFilter = ctx.createBiquadFilter();
    
    impact.connect(impactFilter);
    impactFilter.connect(impactGain);
    impactGain.connect(ctx.destination);
    
    impact.frequency.setValueAtTime(basePitch, now);
    impact.frequency.exponentialRampToValueAtTime(40, now + 0.1);
    impact.type = 'sine';
    
    impactFilter.type = 'lowpass';
    impactFilter.frequency.value = 300;
    
    impactGain.gain.setValueAtTime(0.3 * this.volume, now);
    impactGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    impact.start(now);
    impact.stop(now + 0.15);

    // Golden chime accent - ascending pitch per reel
    const chime = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    
    chime.connect(chimeGain);
    chimeGain.connect(ctx.destination);
    
    chime.frequency.value = chimePitch;
    chime.type = 'sine';
    
    chimeGain.gain.setValueAtTime(0.1 * this.volume, now);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    
    chime.start(now);
    chime.stop(now + 0.12);
  }

  // Reel stop sound - stone tablet landing with golden chime (legacy - plays for all reels at once)
  playReelStop() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // Heavy stone impact
    const impact = ctx.createOscillator();
    const impactGain = ctx.createGain();
    const impactFilter = ctx.createBiquadFilter();
    
    impact.connect(impactFilter);
    impactFilter.connect(impactGain);
    impactGain.connect(ctx.destination);
    
    impact.frequency.setValueAtTime(120, now);
    impact.frequency.exponentialRampToValueAtTime(40, now + 0.12);
    impact.type = 'sine';
    
    impactFilter.type = 'lowpass';
    impactFilter.frequency.value = 300;
    
    impactGain.gain.setValueAtTime(0.35 * this.volume, now);
    impactGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    
    impact.start(now);
    impact.stop(now + 0.18);

    // Golden chime accent
    const chime = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    
    chime.connect(chimeGain);
    chimeGain.connect(ctx.destination);
    
    chime.frequency.value = 880;
    chime.type = 'sine';
    
    chimeGain.gain.setValueAtTime(0.12 * this.volume, now);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    chime.start(now);
    chime.stop(now + 0.15);

    // Subtle sand/dust settling
    const noise = ctx.createOscillator();
    const noiseGain = ctx.createGain();
    const noiseFilter = ctx.createBiquadFilter();
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    noise.type = 'sawtooth';
    noise.frequency.value = 2000;
    
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 4000;
    
    noiseGain.gain.setValueAtTime(0.03 * this.volume, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    
    noise.start(now);
    noise.stop(now + 0.1);
  }

  // Small win - golden coins with Egyptian harp
  playSmallWin() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // Egyptian harp arpeggio (D minor pentatonic)
    const notes = [293.66, 349.23, 440.00, 523.25]; // D4, F4, A4, C5
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = freq;
      osc.type = 'triangle';
      
      const noteTime = now + i * 0.08;
      gain.gain.setValueAtTime(0, noteTime);
      gain.gain.linearRampToValueAtTime(0.22 * this.volume, noteTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.4);
      
      osc.start(noteTime);
      osc.stop(noteTime + 0.4);
    });

    // Golden coin tinkle
    for (let i = 0; i < 5; i++) {
      const coin = ctx.createOscillator();
      const coinGain = ctx.createGain();
      
      coin.connect(coinGain);
      coinGain.connect(ctx.destination);
      
      coin.frequency.value = 2500 + Math.random() * 1500;
      coin.type = 'sine';
      
      const coinTime = now + 0.2 + i * 0.06;
      coinGain.gain.setValueAtTime(0.08 * this.volume, coinTime);
      coinGain.gain.exponentialRampToValueAtTime(0.001, coinTime + 0.12);
      
      coin.start(coinTime);
      coin.stop(coinTime + 0.12);
    }
  }

  // Medium win - treasure discovery with sistrum
  playMediumWin() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // Triumphant Egyptian chord
    const chord = [293.66, 349.23, 440.00, 587.33]; // D, F, A, D (D minor)
    
    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = freq;
      osc.type = 'triangle';
      
      gain.gain.setValueAtTime(0.18 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1);
      
      osc.start(now);
      osc.stop(now + 1);
    });

    // Sistrum shakes (Egyptian rattle)
    for (let i = 0; i < 12; i++) {
      const shake = ctx.createOscillator();
      const shakeGain = ctx.createGain();
      
      shake.connect(shakeGain);
      shakeGain.connect(ctx.destination);
      
      shake.frequency.value = 3000 + Math.random() * 3000;
      shake.type = 'sine';
      
      const shakeTime = now + 0.05 + i * 0.05;
      shakeGain.gain.setValueAtTime(0.06 * this.volume, shakeTime);
      shakeGain.gain.exponentialRampToValueAtTime(0.001, shakeTime + 0.06);
      
      shake.start(shakeTime);
      shake.stop(shakeTime + 0.06);
    }

    // Golden coins cascade
    for (let i = 0; i < 15; i++) {
      const coin = ctx.createOscillator();
      const coinGain = ctx.createGain();
      
      coin.connect(coinGain);
      coinGain.connect(ctx.destination);
      
      coin.frequency.value = 2000 + Math.random() * 2500;
      coin.type = 'sine';
      
      const coinTime = now + 0.15 + i * 0.07;
      coinGain.gain.setValueAtTime(0.08 * this.volume, coinTime);
      coinGain.gain.exponentialRampToValueAtTime(0.001, coinTime + 0.1);
      
      coin.start(coinTime);
      coin.stop(coinTime + 0.1);
    }
  }

  // Big win - Pharaoh's treasure fanfare
  playBigWin() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // Epic ascending Egyptian fanfare
    const melody = [
      { freq: 196.00, time: 0 },      // G3
      { freq: 233.08, time: 0.12 },   // Bb3
      { freq: 293.66, time: 0.24 },   // D4
      { freq: 349.23, time: 0.36 },   // F4
      { freq: 392.00, time: 0.48 },   // G4
      { freq: 466.16, time: 0.60 },   // Bb4
      { freq: 587.33, time: 0.72 },   // D5
    ];
    
    melody.forEach(({ freq, time }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = freq;
      osc.type = 'triangle';
      
      const noteTime = now + time;
      gain.gain.setValueAtTime(0.28 * this.volume, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.5);
      
      osc.start(noteTime);
      osc.stop(noteTime + 0.5);
    });

    // Deep ceremonial drum
    for (let i = 0; i < 4; i++) {
      const drum = ctx.createOscillator();
      const drumGain = ctx.createGain();
      
      drum.connect(drumGain);
      drumGain.connect(ctx.destination);
      
      const drumTime = now + i * 0.25;
      drum.frequency.setValueAtTime(80, drumTime);
      drum.frequency.exponentialRampToValueAtTime(40, drumTime + 0.15);
      drum.type = 'sine';
      
      drumGain.gain.setValueAtTime(0.3 * this.volume, drumTime);
      drumGain.gain.exponentialRampToValueAtTime(0.001, drumTime + 0.2);
      
      drum.start(drumTime);
      drum.stop(drumTime + 0.2);
    }

    // Triumphant Pharaoh chord
    setTimeout(() => {
      const pharaohChord = [196.00, 293.66, 349.23, 392.00, 587.33]; // G minor with power
      pharaohChord.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.value = freq;
        osc.type = 'triangle';
        
        gain.gain.setValueAtTime(0.15 * this.volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);
        
        osc.start();
        osc.stop(ctx.currentTime + 2);
      });
    }, 850);

    // Massive gold treasure cascade
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const coin = ctx.createOscillator();
        const coinGain = ctx.createGain();
        
        coin.connect(coinGain);
        coinGain.connect(ctx.destination);
        
        coin.frequency.value = 2000 + Math.random() * 3000;
        coin.type = 'sine';
        
        coinGain.gain.setValueAtTime(0.06 * this.volume, ctx.currentTime);
        coinGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        
        coin.start();
        coin.stop(ctx.currentTime + 0.12);
      }, 900 + i * 50);
    }
  }

  // Bonus trigger - Book of Dead opens with ancient power
  playBonusTrigger() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // Deep ancient power awakening
    const power = ctx.createOscillator();
    const powerGain = ctx.createGain();
    const powerFilter = ctx.createBiquadFilter();
    
    power.connect(powerFilter);
    powerFilter.connect(powerGain);
    powerGain.connect(ctx.destination);
    
    power.frequency.setValueAtTime(40, now);
    power.frequency.exponentialRampToValueAtTime(120, now + 0.8);
    power.type = 'sine';
    
    powerFilter.type = 'lowpass';
    powerFilter.frequency.value = 300;
    
    powerGain.gain.setValueAtTime(0.4 * this.volume, now);
    powerGain.gain.exponentialRampToValueAtTime(0.001, now + 1);
    
    power.start(now);
    power.stop(now + 1);

    // Mystical ascending sweep (book opening)
    const sweep = ctx.createOscillator();
    const sweepGain = ctx.createGain();
    
    sweep.connect(sweepGain);
    sweepGain.connect(ctx.destination);
    
    sweep.frequency.setValueAtTime(150, now);
    sweep.frequency.exponentialRampToValueAtTime(1500, now + 0.6);
    sweep.type = 'sine';
    
    sweepGain.gain.setValueAtTime(0.2 * this.volume, now);
    sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    
    sweep.start(now);
    sweep.stop(now + 0.7);

    // Ancient magical sparkles
    for (let i = 0; i < 20; i++) {
      const sparkle = ctx.createOscillator();
      const sparkleGain = ctx.createGain();
      
      sparkle.connect(sparkleGain);
      sparkleGain.connect(ctx.destination);
      
      sparkle.frequency.value = 1200 + Math.random() * 3500;
      sparkle.type = 'sine';
      
      const sparkleTime = now + 0.15 + i * 0.035;
      sparkleGain.gain.setValueAtTime(0.1 * this.volume, sparkleTime);
      sparkleGain.gain.exponentialRampToValueAtTime(0.001, sparkleTime + 0.18);
      
      sparkle.start(sparkleTime);
      sparkle.stop(sparkleTime + 0.18);
    }

    // Egyptian mystical chord (D minor with augmented feel)
    setTimeout(() => {
      const mysticNotes = [146.83, 174.61, 220.00, 293.66, 349.23]; // D, F, A, D, F (D minor)
      mysticNotes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.value = freq;
        osc.type = 'triangle';
        
        gain.gain.setValueAtTime(0.14 * this.volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
        
        osc.start();
        osc.stop(ctx.currentTime + 1.5);
      });
    }, 600);

    // Choir-like mystical hum
    setTimeout(() => {
      const choirNotes = [220, 277, 330];
      choirNotes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.value = freq;
        osc.type = 'sine';
        
        filter.type = 'bandpass';
        filter.frequency.value = freq;
        filter.Q.value = 5;
        
        gain.gain.setValueAtTime(0.1 * this.volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);
        
        osc.start();
        osc.stop(ctx.currentTime + 2);
      });
    }, 800);
  }

  // Symbol expansion - ancient power surge
  playSymbolExpand() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // Massive power surge
    const surge = ctx.createOscillator();
    const surgeGain = ctx.createGain();
    const surgeFilter = ctx.createBiquadFilter();
    
    surge.connect(surgeFilter);
    surgeFilter.connect(surgeGain);
    surgeGain.connect(ctx.destination);
    
    surge.frequency.setValueAtTime(50, now);
    surge.frequency.exponentialRampToValueAtTime(150, now + 0.35);
    surge.type = 'sine';
    
    surgeFilter.type = 'lowpass';
    surgeFilter.frequency.value = 250;
    
    surgeGain.gain.setValueAtTime(0.4 * this.volume, now);
    surgeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    
    surge.start(now);
    surge.stop(now + 0.5);

    // Golden expansion whoosh
    const whoosh = ctx.createOscillator();
    const whooshGain = ctx.createGain();
    
    whoosh.connect(whooshGain);
    whooshGain.connect(ctx.destination);
    
    whoosh.frequency.setValueAtTime(120, now);
    whoosh.frequency.exponentialRampToValueAtTime(800, now + 0.2);
    whoosh.frequency.exponentialRampToValueAtTime(500, now + 0.35);
    whoosh.type = 'triangle';
    
    whooshGain.gain.setValueAtTime(0.22 * this.volume, now);
    whooshGain.gain.linearRampToValueAtTime(0.28 * this.volume, now + 0.12);
    whooshGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    
    whoosh.start(now);
    whoosh.stop(now + 0.4);

    // Crystalline golden shimmer
    for (let i = 0; i < 10; i++) {
      const shimmer = ctx.createOscillator();
      const shimmerGain = ctx.createGain();
      
      shimmer.connect(shimmerGain);
      shimmerGain.connect(ctx.destination);
      
      shimmer.frequency.value = 800 + i * 180 + Math.random() * 200;
      shimmer.type = 'sine';
      
      const shimmerTime = now + 0.04 + i * 0.025;
      shimmerGain.gain.setValueAtTime(0.09 * this.volume, shimmerTime);
      shimmerGain.gain.exponentialRampToValueAtTime(0.001, shimmerTime + 0.22);
      
      shimmer.start(shimmerTime);
      shimmer.stop(shimmerTime + 0.22);
    }

    // Ancient power chord
    const powerNotes = [146.83, 174.61, 220.00, 293.66]; // D minor
    powerNotes.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = freq;
      osc.type = 'triangle';
      
      const chordTime = now + 0.08;
      gain.gain.setValueAtTime(0.1 * this.volume, chordTime);
      gain.gain.exponentialRampToValueAtTime(0.001, chordTime + 0.7);
      
      osc.start(chordTime);
      osc.stop(chordTime + 0.7);
    });
  }

  // Button click - golden tap
  playButtonClick() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.frequency.value = 800;
    osc.type = 'sine';
    
    gain.gain.setValueAtTime(0.12 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    
    osc.start(now);
    osc.stop(now + 0.06);

    // Small golden chime
    const chime = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    
    chime.connect(chimeGain);
    chimeGain.connect(ctx.destination);
    
    chime.frequency.value = 1600;
    chime.type = 'sine';
    
    chimeGain.gain.setValueAtTime(0.06 * this.volume, now);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    
    chime.start(now);
    chime.stop(now + 0.08);
  }

  // No win - mysterious sand whisper
  playNoWin() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // Descending mysterious tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.35);
    osc.type = 'triangle';
    
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    
    gain.gain.setValueAtTime(0.08 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    
    osc.start(now);
    osc.stop(now + 0.35);
  }
}

// Singleton instance
export const slotSounds = new SlotSoundEffects();
