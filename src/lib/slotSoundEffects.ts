// Slot Machine Sound Effects using Web Audio API
// Egyptian-themed synthesized sounds inspired by ancient Egypt

export interface SlotSoundSettings {
  spinClickInterval: number;
  spinClickFreqStart: number;
  spinClickFreqEnd: number;
  spinClickVolume: number;
  spinMotorVolume: number;
  spinTickerEnabled: boolean;
  spinTickerFrequency: number;
  stopImpactVolume: number;
  stopChimeEnabled: boolean;
  stopChimeVolume: number;
  // Win sounds
  winSmallVolume: number;
  winSmallArpeggioSpeed: number;
  winSmallCoinCount: number;
  winMediumVolume: number;
  winMediumSistrumCount: number;
  winMediumCoinCount: number;
  winBigVolume: number;
  winBigFanfareEnabled: boolean;
  winBigDrumEnabled: boolean;
}

class SlotSoundEffects {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private volume: number = 0.5;
  private musicEnabled: boolean = true;
  private musicGainNode: GainNode | null = null;
  private currentMusic: OscillatorNode[] = [];
  private musicInterval: NodeJS.Timeout | null = null;

  // Configurable sound settings
  private soundSettings: SlotSoundSettings = {
    spinClickInterval: 45,
    spinClickFreqStart: 280,
    spinClickFreqEnd: 180,
    spinClickVolume: 0.12,
    spinMotorVolume: 0.03,
    spinTickerEnabled: true,
    spinTickerFrequency: 1000,
    stopImpactVolume: 0.3,
    stopChimeEnabled: true,
    stopChimeVolume: 0.1,
    // Win sounds
    winSmallVolume: 0.22,
    winSmallArpeggioSpeed: 80,
    winSmallCoinCount: 5,
    winMediumVolume: 0.18,
    winMediumSistrumCount: 12,
    winMediumCoinCount: 15,
    winBigVolume: 0.25,
    winBigFanfareEnabled: true,
    winBigDrumEnabled: true,
  };

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

  // Update sound settings from admin panel
  updateSoundSettings(settings: Partial<SlotSoundSettings>) {
    this.soundSettings = { ...this.soundSettings, ...settings };
  }

  getSoundSettings(): SlotSoundSettings {
    return { ...this.soundSettings };
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

  // Egyptian/Arabic scale (Hijaz maqam - very characteristic Middle Eastern sound)
  private getEgyptianScale(): number[] {
    // D Hijaz scale: D, Eb, F#, G, A, Bb, C, D (with augmented second interval)
    return [146.83, 155.56, 185.00, 196.00, 220.00, 233.08, 261.63, 293.66, 311.13, 370.00, 392.00, 440.00];
  }

  // Start ambient Egyptian background music with oud, ney flute, and darbuka rhythms
  startMusic() {
    if (!this.enabled || !this.musicEnabled) return;
    if (this.musicInterval) return; // Already playing

    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // Create master gain for music with fade-in
    this.musicGainNode = ctx.createGain();
    this.musicGainNode.gain.setValueAtTime(0, now);
    this.musicGainNode.gain.linearRampToValueAtTime(0.1 * this.volume, now + 3); // 3 second fade-in
    this.musicGainNode.connect(ctx.destination);

    // Deep drone on D (like a low oud string)
    const drone = ctx.createOscillator();
    const droneGain = ctx.createGain();
    const droneFilter = ctx.createBiquadFilter();
    
    drone.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(this.musicGainNode);
    
    drone.frequency.value = 73.42; // D2
    drone.type = 'triangle';
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 250;
    droneGain.gain.value = 0.5;
    
    drone.start();
    this.currentMusic.push(drone);

    // Fifth drone for harmonic richness
    const drone2 = ctx.createOscillator();
    const drone2Gain = ctx.createGain();
    
    drone2.connect(drone2Gain);
    drone2Gain.connect(this.musicGainNode);
    
    drone2.frequency.value = 110; // A2
    drone2.type = 'triangle';
    drone2Gain.gain.value = 0.25;
    
    drone2.start();
    this.currentMusic.push(drone2);

    const scale = this.getEgyptianScale();
    let noteIndex = 0;
    let patternStep = 0;
    
    // Darbuka-style rhythm pattern (Egyptian percussion)
    const playDarbuka = () => {
      if (!this.enabled || !this.musicEnabled) return;
      
      const now = ctx.currentTime;
      
      // Doum (low hit) - using filtered noise
      const doum = ctx.createOscillator();
      const doumGain = ctx.createGain();
      const doumFilter = ctx.createBiquadFilter();
      
      doum.connect(doumFilter);
      doumFilter.connect(doumGain);
      doumGain.connect(this.musicGainNode!);
      
      doum.frequency.setValueAtTime(80, now);
      doum.frequency.exponentialRampToValueAtTime(40, now + 0.1);
      doum.type = 'sine';
      doumFilter.type = 'lowpass';
      doumFilter.frequency.value = 200;
      
      doumGain.gain.setValueAtTime(0.4, now);
      doumGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      
      doum.start(now);
      doum.stop(now + 0.15);
    };
    
    const playTek = (delay: number = 0) => {
      if (!this.enabled || !this.musicEnabled) return;
      
      const now = ctx.currentTime + delay;
      
      // Tek (high hit)
      const tek = ctx.createOscillator();
      const tekGain = ctx.createGain();
      
      tek.connect(tekGain);
      tekGain.connect(this.musicGainNode!);
      
      tek.frequency.setValueAtTime(400, now);
      tek.frequency.exponentialRampToValueAtTime(200, now + 0.05);
      tek.type = 'triangle';
      
      tekGain.gain.setValueAtTime(0.2, now);
      tekGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      
      tek.start(now);
      tek.stop(now + 0.08);
    };

    // Main music loop - combines ney-like melody with darbuka rhythm
    this.musicInterval = setInterval(() => {
      if (!this.enabled || !this.musicEnabled) return;
      
      const now = ctx.currentTime;
      
      // Maqsoum rhythm pattern (classic Egyptian): Doum tek tek Doum tek
      const rhythmPattern = [
        { type: 'doum', delay: 0 },
        { type: 'tek', delay: 0.25 },
        { type: 'tek', delay: 0.5 },
        { type: 'doum', delay: 0.75 },
        { type: 'tek', delay: 1.0 },
      ];
      
      rhythmPattern.forEach(hit => {
        if (hit.type === 'doum') {
          setTimeout(() => playDarbuka(), hit.delay * 1000);
        } else {
          setTimeout(() => playTek(), hit.delay * 1000);
        }
      });
      
      // Ney flute-like melody (breathy, ornamental)
      const neyOsc = ctx.createOscillator();
      const neyGain = ctx.createGain();
      const neyFilter = ctx.createBiquadFilter();
      
      neyOsc.connect(neyFilter);
      neyFilter.connect(neyGain);
      neyGain.connect(this.musicGainNode!);
      
      // Add slight vibrato for ney authenticity
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();
      vibrato.connect(vibratoGain);
      vibratoGain.connect(neyOsc.frequency);
      vibrato.frequency.value = 5;
      vibratoGain.gain.value = 8;
      
      neyOsc.frequency.value = scale[noteIndex];
      neyOsc.type = 'sine';
      
      neyFilter.type = 'lowpass';
      neyFilter.frequency.value = 2000;
      
      neyGain.gain.setValueAtTime(0, now);
      neyGain.gain.linearRampToValueAtTime(0.35, now + 0.1);
      neyGain.gain.setValueAtTime(0.35, now + 0.8);
      neyGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
      
      vibrato.start(now);
      neyOsc.start(now);
      neyOsc.stop(now + 1.6);
      vibrato.stop(now + 1.6);
      
      // Oud-like pluck (string instrument)
      if (patternStep % 2 === 0) {
        const oud = ctx.createOscillator();
        const oudGain = ctx.createGain();
        const oudFilter = ctx.createBiquadFilter();
        
        oud.connect(oudFilter);
        oudFilter.connect(oudGain);
        oudGain.connect(this.musicGainNode!);
        
        oud.frequency.value = scale[(noteIndex + 4) % scale.length] / 2;
        oud.type = 'sawtooth';
        
        oudFilter.type = 'lowpass';
        oudFilter.frequency.setValueAtTime(1500, now);
        oudFilter.frequency.exponentialRampToValueAtTime(400, now + 0.8);
        
        oudGain.gain.setValueAtTime(0.25, now);
        oudGain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
        
        oud.start(now);
        oud.stop(now + 1.0);
      }

      // Move through scale with characteristic Egyptian intervals
      noteIndex = (noteIndex + [1, 2, 1, -1, 2, -2, 1, 3][patternStep % 8] + scale.length) % scale.length;
      patternStep++;
    }, 1500);
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

  // Reel spinning loop - Book of Dead style mechanical clicking
  playReelSpin(): () => void {
    if (!this.enabled) return () => {};
    
    const ctx = this.getContext();
    let isRunning = true;
    let clickCount = 0;
    
    // Get configurable settings
    const {
      spinClickInterval,
      spinClickFreqStart,
      spinClickFreqEnd,
      spinClickVolume,
      spinMotorVolume,
      spinTickerEnabled,
      spinTickerFrequency,
    } = this.soundSettings;
    
    // Motor hum undertone - continuous low drone
    const motorOsc = ctx.createOscillator();
    const motorGain = ctx.createGain();
    const motorFilter = ctx.createBiquadFilter();
    
    motorOsc.connect(motorFilter);
    motorFilter.connect(motorGain);
    motorGain.connect(ctx.destination);
    
    motorOsc.type = 'sawtooth';
    motorOsc.frequency.value = 100;
    
    motorFilter.type = 'lowpass';
    motorFilter.frequency.value = 150;
    
    motorGain.gain.value = spinMotorVolume * this.volume;
    
    // Slight motor modulation for realism
    const motorMod = ctx.createOscillator();
    const motorModGain = ctx.createGain();
    motorMod.connect(motorModGain);
    motorModGain.connect(motorOsc.frequency);
    motorMod.frequency.value = 3;
    motorModGain.gain.value = 5;
    
    motorOsc.start();
    motorMod.start();
    
    // Function to play a single mechanical click (symbol flying by)
    const playSymbolClick = () => {
      if (!isRunning || !this.enabled) return;
      
      const now = ctx.currentTime;
      
      // Main click - sine wave with quick pitch drop
      const click = ctx.createOscillator();
      const clickGain = ctx.createGain();
      const clickFilter = ctx.createBiquadFilter();
      
      click.connect(clickFilter);
      clickFilter.connect(clickGain);
      clickGain.connect(ctx.destination);
      
      // Pitch sweep from start to end frequency for mechanical "thunk"
      click.frequency.setValueAtTime(spinClickFreqStart, now);
      click.frequency.exponentialRampToValueAtTime(spinClickFreqEnd, now + 0.015);
      click.type = 'sine';
      
      clickFilter.type = 'lowpass';
      clickFilter.frequency.value = 800;
      
      // Quick attack and decay
      clickGain.gain.setValueAtTime(spinClickVolume * this.volume, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
      
      click.start(now);
      click.stop(now + 0.025);
    };
    
    // Function to play mechanism ticker (higher pitched accent)
    const playMechanismTick = () => {
      if (!isRunning || !this.enabled || !spinTickerEnabled) return;
      
      const now = ctx.currentTime;
      
      // High frequency tick
      const tick = ctx.createOscillator();
      const tickGain = ctx.createGain();
      const tickFilter = ctx.createBiquadFilter();
      
      tick.connect(tickFilter);
      tickFilter.connect(tickGain);
      tickGain.connect(ctx.destination);
      
      tick.frequency.value = spinTickerFrequency;
      tick.type = 'square';
      
      // Filter to soften the square wave
      tickFilter.type = 'lowpass';
      tickFilter.frequency.value = 1500;
      
      tickGain.gain.setValueAtTime(0.04 * this.volume, now);
      tickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);
      
      tick.start(now);
      tick.stop(now + 0.015);
    };
    
    // Interval-based clicking system - configurable interval
    const clickInterval = setInterval(() => {
      if (!isRunning) return;
      
      playSymbolClick();
      
      // Play mechanism tick every other click
      if (clickCount % 2 === 0) {
        playMechanismTick();
      }
      
      clickCount++;
    }, spinClickInterval);
    
    // Return stop function
    return () => {
      isRunning = false;
      clearInterval(clickInterval);
      
      const stopTime = ctx.currentTime;
      motorGain.gain.linearRampToValueAtTime(0.001, stopTime + 0.15);
      
      setTimeout(() => {
        try {
          motorOsc.stop();
          motorMod.stop();
        } catch (e) {
          // Already stopped
        }
      }, 200);
    };
  }

  // Individual reel stop sound - plays when each reel lands (with pitch variation per reel)
  playReelStopSingle(reelIndex: number = 0) {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // Get configurable settings
    const { stopImpactVolume, stopChimeEnabled, stopChimeVolume } = this.soundSettings;

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
    
    impactGain.gain.setValueAtTime(stopImpactVolume * this.volume, now);
    impactGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    impact.start(now);
    impact.stop(now + 0.15);

    // Golden chime accent - ascending pitch per reel (if enabled)
    if (stopChimeEnabled) {
      const chime = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      
      chime.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      
      chime.frequency.value = chimePitch;
      chime.type = 'sine';
      
      chimeGain.gain.setValueAtTime(stopChimeVolume * this.volume, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      
      chime.start(now);
      chime.stop(now + 0.12);
    }
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
    
    const { winSmallVolume, winSmallArpeggioSpeed, winSmallCoinCount } = this.soundSettings;
    
    // Egyptian harp arpeggio (D minor pentatonic)
    const notes = [293.66, 349.23, 440.00, 523.25]; // D4, F4, A4, C5
    const arpeggioMs = winSmallArpeggioSpeed / 1000; // Convert to seconds
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = freq;
      osc.type = 'triangle';
      
      const noteTime = now + i * arpeggioMs;
      gain.gain.setValueAtTime(0, noteTime);
      gain.gain.linearRampToValueAtTime(winSmallVolume * this.volume, noteTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.4);
      
      osc.start(noteTime);
      osc.stop(noteTime + 0.4);
    });

    // Golden coin tinkle
    for (let i = 0; i < winSmallCoinCount; i++) {
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
    
    const { winMediumVolume, winMediumSistrumCount, winMediumCoinCount } = this.soundSettings;
    
    // Triumphant Egyptian chord
    const chord = [293.66, 349.23, 440.00, 587.33]; // D, F, A, D (D minor)
    
    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = freq;
      osc.type = 'triangle';
      
      gain.gain.setValueAtTime(winMediumVolume * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1);
      
      osc.start(now);
      osc.stop(now + 1);
    });

    // Sistrum shakes (Egyptian rattle)
    for (let i = 0; i < winMediumSistrumCount; i++) {
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
    for (let i = 0; i < winMediumCoinCount; i++) {
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
    
    const { winBigVolume, winBigFanfareEnabled, winBigDrumEnabled } = this.soundSettings;
    
    // Epic ascending Egyptian fanfare
    if (winBigFanfareEnabled) {
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
        gain.gain.setValueAtTime(winBigVolume * this.volume, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.5);
        
        osc.start(noteTime);
        osc.stop(noteTime + 0.5);
      });
    }

    // Deep ceremonial drum
    if (winBigDrumEnabled) {
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
        
        gain.gain.setValueAtTime((winBigVolume * 0.6) * this.volume, ctx.currentTime);
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

  // Tease mode drumroll - building anticipation when 2 scatters land
  playTeaseStart(): () => void {
    if (!this.enabled) return () => {};
    
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // Create master gain for tease sounds
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.25 * this.volume;
    masterGain.connect(ctx.destination);
    
    // Deep heartbeat-like pulse
    const heartbeatInterval = setInterval(() => {
      if (!this.enabled) return;
      
      const currentTime = ctx.currentTime;
      
      // First beat (stronger)
      const beat1 = ctx.createOscillator();
      const beat1Gain = ctx.createGain();
      beat1.connect(beat1Gain);
      beat1Gain.connect(masterGain);
      
      beat1.frequency.setValueAtTime(60, currentTime);
      beat1.frequency.exponentialRampToValueAtTime(30, currentTime + 0.15);
      beat1.type = 'sine';
      
      beat1Gain.gain.setValueAtTime(0.8, currentTime);
      beat1Gain.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.2);
      
      beat1.start(currentTime);
      beat1.stop(currentTime + 0.2);
      
      // Second beat (softer, delayed)
      const beat2 = ctx.createOscillator();
      const beat2Gain = ctx.createGain();
      beat2.connect(beat2Gain);
      beat2Gain.connect(masterGain);
      
      beat2.frequency.setValueAtTime(50, currentTime + 0.2);
      beat2.frequency.exponentialRampToValueAtTime(25, currentTime + 0.35);
      beat2.type = 'sine';
      
      beat2Gain.gain.setValueAtTime(0.5, currentTime + 0.2);
      beat2Gain.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.35);
      
      beat2.start(currentTime + 0.2);
      beat2.stop(currentTime + 0.35);
    }, 600); // Heartbeat rhythm
    
    // Tension drone
    const drone = ctx.createOscillator();
    const droneGain = ctx.createGain();
    const droneFilter = ctx.createBiquadFilter();
    
    drone.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(masterGain);
    
    drone.frequency.value = 55; // Low A
    drone.type = 'sawtooth';
    
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 150;
    
    droneGain.gain.setValueAtTime(0.3, now);
    
    drone.start(now);
    
    // Tremolo/shimmer effect
    const tremolo = ctx.createOscillator();
    const tremoloGain = ctx.createGain();
    
    tremolo.connect(tremoloGain);
    tremoloGain.connect(droneGain.gain);
    
    tremolo.frequency.value = 8; // 8Hz tremolo
    tremoloGain.gain.value = 0.15;
    
    tremolo.start(now);
    
    // Return stop function
    return () => {
      clearInterval(heartbeatInterval);
      
      const stopTime = ctx.currentTime;
      droneGain.gain.linearRampToValueAtTime(0.001, stopTime + 0.3);
      masterGain.gain.linearRampToValueAtTime(0.001, stopTime + 0.3);
      
      setTimeout(() => {
        try {
          drone.stop();
          tremolo.stop();
        } catch (e) {
          // Already stopped
        }
      }, 350);
    };
  }

  // Active tease slowdown sound - intense crescendo when tease reel starts slowing down
  playActiveTeaseSlowdown(reelIndex: number): () => void {
    if (!this.enabled) return () => {};
    
    const ctx = this.getContext();
    const now = ctx.currentTime;
    let isPlaying = true;
    
    // Master gain for this effect
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.15 * this.volume, now);
    masterGain.connect(ctx.destination);
    
    // Base pitch increases for later reels (builds progression)
    const basePitchOffset = reelIndex * 20;
    
    // Rising drone that increases in pitch over 3 seconds
    const drone = ctx.createOscillator();
    const droneGain = ctx.createGain();
    const droneFilter = ctx.createBiquadFilter();
    
    drone.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(masterGain);
    
    drone.type = 'sawtooth';
    drone.frequency.setValueAtTime(80 + basePitchOffset, now);
    drone.frequency.exponentialRampToValueAtTime(200 + basePitchOffset, now + 3);
    
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(200, now);
    droneFilter.frequency.exponentialRampToValueAtTime(800, now + 3);
    
    droneGain.gain.setValueAtTime(0.3, now);
    droneGain.gain.exponentialRampToValueAtTime(0.6, now + 2.5);
    droneGain.gain.exponentialRampToValueAtTime(0.2, now + 3);
    
    drone.start(now);
    
    // Intensifying sistrum shimmer - gets louder over time
    const shimmer = ctx.createOscillator();
    const shimmerGain = ctx.createGain();
    const shimmerFilter = ctx.createBiquadFilter();
    
    shimmer.connect(shimmerFilter);
    shimmerFilter.connect(shimmerGain);
    shimmerGain.connect(masterGain);
    
    shimmer.type = 'square';
    shimmer.frequency.setValueAtTime(2500, now);
    shimmer.frequency.linearRampToValueAtTime(4000, now + 3);
    
    shimmerFilter.type = 'highpass';
    shimmerFilter.frequency.value = 2000;
    
    shimmerGain.gain.setValueAtTime(0.02, now);
    shimmerGain.gain.exponentialRampToValueAtTime(0.15, now + 2.5);
    shimmerGain.gain.exponentialRampToValueAtTime(0.05, now + 3);
    
    // Tremolo for shimmer
    const shimmerTremolo = ctx.createOscillator();
    const shimmerTremoloGain = ctx.createGain();
    shimmerTremolo.connect(shimmerTremoloGain);
    shimmerTremoloGain.connect(shimmerGain.gain);
    shimmerTremolo.frequency.setValueAtTime(15, now);
    shimmerTremolo.frequency.linearRampToValueAtTime(30, now + 3);
    shimmerTremoloGain.gain.value = 0.05;
    
    shimmer.start(now);
    shimmerTremolo.start(now);
    
    // Accelerating darbuka rhythm - starts slow, speeds up
    let drumInterval = 300; // Start at 300ms
    const minInterval = 80; // End at 80ms
    const accelerationRate = 0.92; // Multiply interval by this each hit
    
    const playDrum = () => {
      if (!isPlaying || !this.enabled) return;
      
      const hitTime = ctx.currentTime;
      
      // Doum hit
      const drum = ctx.createOscillator();
      const drumGain = ctx.createGain();
      const drumFilter = ctx.createBiquadFilter();
      
      drum.connect(drumFilter);
      drumFilter.connect(drumGain);
      drumGain.connect(masterGain);
      
      drum.frequency.setValueAtTime(120 + basePitchOffset, hitTime);
      drum.frequency.exponentialRampToValueAtTime(60, hitTime + 0.08);
      drum.type = 'sine';
      
      drumFilter.type = 'lowpass';
      drumFilter.frequency.value = 300;
      
      drumGain.gain.setValueAtTime(0.5, hitTime);
      drumGain.gain.exponentialRampToValueAtTime(0.001, hitTime + 0.12);
      
      drum.start(hitTime);
      drum.stop(hitTime + 0.12);
      
      // Schedule next hit with accelerating rhythm
      drumInterval = Math.max(minInterval, drumInterval * accelerationRate);
      setTimeout(playDrum, drumInterval);
    };
    
    // Start drum pattern after small delay
    setTimeout(playDrum, 100);
    
    // Return stop function
    return () => {
      isPlaying = false;
      
      const stopTime = ctx.currentTime;
      masterGain.gain.linearRampToValueAtTime(0.001, stopTime + 0.2);
      droneGain.gain.linearRampToValueAtTime(0.001, stopTime + 0.2);
      shimmerGain.gain.linearRampToValueAtTime(0.001, stopTime + 0.2);
      
      setTimeout(() => {
        try {
          drone.stop();
          shimmer.stop();
          shimmerTremolo.stop();
        } catch (e) {
          // Already stopped
        }
      }, 250);
    };
  }

  // Coin counting sound - plays while win amount ticks up
  playCoinCount(): () => void {
    if (!this.enabled) return () => {};
    
    const ctx = this.getContext();
    let isPlaying = true;
    let tickCount = 0;
    
    const playTick = () => {
      if (!isPlaying || !this.enabled) return;
      
      const now = ctx.currentTime;
      
      // Egyptian coin clink with varying pitch
      const coin = ctx.createOscillator();
      const coinGain = ctx.createGain();
      const coinFilter = ctx.createBiquadFilter();
      
      coin.connect(coinFilter);
      coinFilter.connect(coinGain);
      coinGain.connect(ctx.destination);
      
      // Vary pitch slightly for natural feel
      const basePitch = 1800 + Math.random() * 400;
      coin.frequency.setValueAtTime(basePitch, now);
      coin.frequency.exponentialRampToValueAtTime(basePitch * 0.7, now + 0.06);
      coin.type = 'triangle';
      
      coinFilter.type = 'highpass';
      coinFilter.frequency.value = 1200;
      
      coinGain.gain.setValueAtTime(0.12 * this.volume, now);
      coinGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      
      coin.start(now);
      coin.stop(now + 0.08);
      
      // Secondary shimmer layer (golden sparkle)
      const shimmer = ctx.createOscillator();
      const shimmerGain = ctx.createGain();
      
      shimmer.connect(shimmerGain);
      shimmerGain.connect(ctx.destination);
      
      shimmer.frequency.value = 3000 + Math.random() * 500;
      shimmer.type = 'sine';
      
      shimmerGain.gain.setValueAtTime(0.04 * this.volume, now);
      shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      
      shimmer.start(now);
      shimmer.stop(now + 0.05);
      
      tickCount++;
    };
    
    // Play ticks at a fast rate (every 30ms for rapid counting feel)
    const interval = setInterval(playTick, 30);
    playTick(); // Play first tick immediately
    
    // Return stop function
    return () => {
      isPlaying = false;
      clearInterval(interval);
    };
  }
}

// Singleton instance
export const slotSounds = new SlotSoundEffects();
