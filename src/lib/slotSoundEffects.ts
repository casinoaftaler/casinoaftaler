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

// localStorage key for persisting audio settings
const AUDIO_SETTINGS_KEY = 'slot-audio-settings';

interface PersistedAudioSettings {
  enabled: boolean;
  volume: number;
  musicEnabled: boolean;
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

  constructor() {
    // Load persisted settings on initialization
    this.loadPersistedSettings();
  }

  private loadPersistedSettings() {
    try {
      const saved = localStorage.getItem(AUDIO_SETTINGS_KEY);
      if (saved) {
        const settings: PersistedAudioSettings = JSON.parse(saved);
        this.enabled = settings.enabled ?? true;
        this.volume = settings.volume ?? 0.5;
        this.musicEnabled = settings.musicEnabled ?? true;
      }
    } catch (e) {
      // Ignore parse errors, use defaults
    }
  }

  private persistSettings() {
    try {
      const settings: PersistedAudioSettings = {
        enabled: this.enabled,
        volume: this.volume,
        musicEnabled: this.musicEnabled,
      };
      localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      // Ignore storage errors
    }
  }

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
    this.persistSettings();
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.musicGainNode) {
      this.musicGainNode.gain.value = 0.08 * this.volume;
    }
    this.persistSettings();
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
    this.persistSettings();
  }

  // Egyptian/Arabic scale (Hijaz maqam - very characteristic Middle Eastern sound)
  private getEgyptianScale(): number[] {
    // D Hijaz scale: D, Eb, F#, G, A, Bb, C, D (with augmented second interval)
    return [146.83, 155.56, 185.00, 196.00, 220.00, 233.08, 261.63, 293.66, 311.13, 370.00, 392.00, 440.00];
  }

  // Book of Dead style dramatic Egyptian music
  startMusic() {
    if (!this.enabled || !this.musicEnabled) return;
    if (this.musicInterval) return; // Already playing

    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // Create master gain for music with fade-in
    this.musicGainNode = ctx.createGain();
    this.musicGainNode.gain.setValueAtTime(0, now);
    this.musicGainNode.gain.linearRampToValueAtTime(0.12 * this.volume, now + 3);
    this.musicGainNode.connect(ctx.destination);

    // Deep sub-bass drone on D (cinematic foundation)
    const subBass = ctx.createOscillator();
    const subBassGain = ctx.createGain();
    const subBassFilter = ctx.createBiquadFilter();
    
    subBass.connect(subBassFilter);
    subBassFilter.connect(subBassGain);
    subBassGain.connect(this.musicGainNode);
    
    subBass.frequency.value = 36.71; // D1 - very deep
    subBass.type = 'sine';
    subBassFilter.type = 'lowpass';
    subBassFilter.frequency.value = 80;
    subBassGain.gain.value = 0.6;
    
    subBass.start();
    this.currentMusic.push(subBass);

    // Primary drone on D2 with rich harmonics
    const drone = ctx.createOscillator();
    const droneGain = ctx.createGain();
    const droneFilter = ctx.createBiquadFilter();
    
    drone.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(this.musicGainNode);
    
    drone.frequency.value = 73.42; // D2
    drone.type = 'sawtooth';
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 300;
    droneGain.gain.value = 0.35;
    
    drone.start();
    this.currentMusic.push(drone);

    // Fifth drone for harmonic richness (A2)
    const drone2 = ctx.createOscillator();
    const drone2Gain = ctx.createGain();
    const drone2Filter = ctx.createBiquadFilter();
    
    drone2.connect(drone2Filter);
    drone2Filter.connect(drone2Gain);
    drone2Gain.connect(this.musicGainNode);
    
    drone2.frequency.value = 110; // A2
    drone2.type = 'triangle';
    drone2Filter.type = 'lowpass';
    drone2Filter.frequency.value = 400;
    drone2Gain.gain.value = 0.25;
    
    drone2.start();
    this.currentMusic.push(drone2);

    // Mysterious choir pad (ethereal, mystical)
    const choirOsc1 = ctx.createOscillator();
    const choirOsc2 = ctx.createOscillator();
    const choirGain = ctx.createGain();
    const choirFilter = ctx.createBiquadFilter();
    
    choirOsc1.connect(choirFilter);
    choirOsc2.connect(choirFilter);
    choirFilter.connect(choirGain);
    choirGain.connect(this.musicGainNode);
    
    choirOsc1.frequency.value = 293.66; // D4
    choirOsc2.frequency.value = 440; // A4
    choirOsc1.type = 'sine';
    choirOsc2.type = 'sine';
    
    // Slow LFO for choir movement
    const choirLFO = ctx.createOscillator();
    const choirLFOGain = ctx.createGain();
    choirLFO.connect(choirLFOGain);
    choirLFOGain.connect(choirOsc1.frequency);
    choirLFO.frequency.value = 0.3;
    choirLFOGain.gain.value = 3;
    
    choirFilter.type = 'lowpass';
    choirFilter.frequency.value = 800;
    choirFilter.Q.value = 2;
    choirGain.gain.value = 0.08;
    
    choirOsc1.start();
    choirOsc2.start();
    choirLFO.start();
    this.currentMusic.push(choirOsc1);
    this.currentMusic.push(choirOsc2);
    this.currentMusic.push(choirLFO);

    // String pad layer (cinematic tension)
    const stringOsc = ctx.createOscillator();
    const stringOsc2 = ctx.createOscillator();
    const stringGain = ctx.createGain();
    const stringFilter = ctx.createBiquadFilter();
    
    stringOsc.connect(stringFilter);
    stringOsc2.connect(stringFilter);
    stringFilter.connect(stringGain);
    stringGain.connect(this.musicGainNode);
    
    stringOsc.frequency.value = 146.83; // D3
    stringOsc2.frequency.value = 220; // A3
    stringOsc.type = 'sawtooth';
    stringOsc2.type = 'sawtooth';
    
    stringFilter.type = 'lowpass';
    stringFilter.frequency.value = 1200;
    stringFilter.Q.value = 0.5;
    stringGain.gain.value = 0.06;
    
    // Slow string tremolo
    const stringTremolo = ctx.createOscillator();
    const stringTremoloGain = ctx.createGain();
    stringTremolo.connect(stringTremoloGain);
    stringTremoloGain.connect(stringGain.gain);
    stringTremolo.frequency.value = 4;
    stringTremoloGain.gain.value = 0.02;
    
    stringOsc.start();
    stringOsc2.start();
    stringTremolo.start();
    this.currentMusic.push(stringOsc);
    this.currentMusic.push(stringOsc2);
    this.currentMusic.push(stringTremolo);

    const scale = this.getEgyptianScale();
    let noteIndex = 0;
    let patternStep = 0;
    let measureCount = 0;
    
    // Frame drum (deep, resonant)
    const playFrameDrum = (time: number, intensity: number = 1) => {
      if (!this.enabled || !this.musicEnabled) return;
      
      const drumOsc = ctx.createOscillator();
      const drumOsc2 = ctx.createOscillator();
      const drumGain = ctx.createGain();
      const drumFilter = ctx.createBiquadFilter();
      
      drumOsc.connect(drumFilter);
      drumOsc2.connect(drumFilter);
      drumFilter.connect(drumGain);
      drumGain.connect(this.musicGainNode!);
      
      drumOsc.frequency.setValueAtTime(100 * intensity, time);
      drumOsc.frequency.exponentialRampToValueAtTime(35, time + 0.15);
      drumOsc.type = 'sine';
      
      drumOsc2.frequency.setValueAtTime(60 * intensity, time);
      drumOsc2.frequency.exponentialRampToValueAtTime(25, time + 0.2);
      drumOsc2.type = 'triangle';
      
      drumFilter.type = 'lowpass';
      drumFilter.frequency.value = 200;
      
      drumGain.gain.setValueAtTime(0.5 * intensity, time);
      drumGain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
      
      drumOsc.start(time);
      drumOsc2.start(time);
      drumOsc.stop(time + 0.3);
      drumOsc2.stop(time + 0.3);
    };
    
    // Darbuka tek (high, sharp)
    const playTek = (time: number, pitch: number = 1) => {
      if (!this.enabled || !this.musicEnabled) return;
      
      const tek = ctx.createOscillator();
      const tekGain = ctx.createGain();
      const tekFilter = ctx.createBiquadFilter();
      
      tek.connect(tekFilter);
      tekFilter.connect(tekGain);
      tekGain.connect(this.musicGainNode!);
      
      tek.frequency.setValueAtTime(500 * pitch, time);
      tek.frequency.exponentialRampToValueAtTime(150, time + 0.04);
      tek.type = 'triangle';
      
      tekFilter.type = 'highpass';
      tekFilter.frequency.value = 200;
      
      tekGain.gain.setValueAtTime(0.25, time);
      tekGain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);
      
      tek.start(time);
      tek.stop(time + 0.08);
    };
    
    // Sistrum shake (metallic shimmer)
    const playSistrum = (time: number) => {
      if (!this.enabled || !this.musicEnabled) return;
      
      for (let i = 0; i < 3; i++) {
        const sisOsc = ctx.createOscillator();
        const sisGain = ctx.createGain();
        
        sisOsc.connect(sisGain);
        sisGain.connect(this.musicGainNode!);
        
        sisOsc.frequency.value = 2000 + i * 800 + Math.random() * 200;
        sisOsc.type = 'sine';
        
        const startTime = time + i * 0.02;
        sisGain.gain.setValueAtTime(0.03, startTime);
        sisGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);
        
        sisOsc.start(startTime);
        sisOsc.stop(startTime + 0.12);
      }
    };

    // Main music loop - Book of Dead style dramatic phrasing
    this.musicInterval = setInterval(() => {
      if (!this.enabled || !this.musicEnabled) return;
      
      const now = ctx.currentTime;
      const beatDuration = 0.3; // ~100 BPM feel
      
      // Complex rhythm pattern based on measure
      const isIntenseMeasure = measureCount % 4 === 3;
      
      // Main downbeat
      playFrameDrum(now, isIntenseMeasure ? 1.2 : 1);
      
      // Offbeat teks
      playTek(now + beatDuration * 1, 1);
      playTek(now + beatDuration * 2, 0.8);
      
      // Second frame drum on beat 3
      playFrameDrum(now + beatDuration * 3, 0.8);
      
      // Fill teks
      playTek(now + beatDuration * 4, 1.1);
      
      // Sistrum accent on intense measures
      if (isIntenseMeasure) {
        playSistrum(now + beatDuration * 2.5);
        playTek(now + beatDuration * 5, 0.9);
      }
      
      // Ney flute melody with ornaments
      const neyOsc = ctx.createOscillator();
      const neyOsc2 = ctx.createOscillator();
      const neyGain = ctx.createGain();
      const neyFilter = ctx.createBiquadFilter();
      
      neyOsc.connect(neyFilter);
      neyOsc2.connect(neyFilter);
      neyFilter.connect(neyGain);
      neyGain.connect(this.musicGainNode!);
      
      // Vibrato for authentic ney sound
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();
      vibrato.connect(vibratoGain);
      vibratoGain.connect(neyOsc.frequency);
      vibrato.frequency.value = 5.5;
      vibratoGain.gain.value = 10;
      
      const melodyNote = scale[noteIndex];
      neyOsc.frequency.value = melodyNote;
      neyOsc2.frequency.value = melodyNote * 1.002; // Slight detune for richness
      neyOsc.type = 'sine';
      neyOsc2.type = 'triangle';
      
      neyFilter.type = 'bandpass';
      neyFilter.frequency.value = 1500;
      neyFilter.Q.value = 1;
      
      // Expressive envelope
      neyGain.gain.setValueAtTime(0, now + beatDuration);
      neyGain.gain.linearRampToValueAtTime(0.3, now + beatDuration + 0.08);
      neyGain.gain.setValueAtTime(0.3, now + beatDuration * 3);
      neyGain.gain.exponentialRampToValueAtTime(0.001, now + beatDuration * 5);
      
      vibrato.start(now + beatDuration);
      neyOsc.start(now + beatDuration);
      neyOsc2.start(now + beatDuration);
      vibrato.stop(now + beatDuration * 5.5);
      neyOsc.stop(now + beatDuration * 5.5);
      neyOsc2.stop(now + beatDuration * 5.5);
      
      // Oud bass line (plucked, resonant)
      if (patternStep % 2 === 0) {
        const oud = ctx.createOscillator();
        const oud2 = ctx.createOscillator();
        const oudGain = ctx.createGain();
        const oudFilter = ctx.createBiquadFilter();
        
        oud.connect(oudFilter);
        oud2.connect(oudFilter);
        oudFilter.connect(oudGain);
        oudGain.connect(this.musicGainNode!);
        
        const oudNote = scale[(noteIndex + 4) % scale.length] / 2;
        oud.frequency.value = oudNote;
        oud2.frequency.value = oudNote * 2; // Octave harmonic
        oud.type = 'sawtooth';
        oud2.type = 'triangle';
        
        oudFilter.type = 'lowpass';
        oudFilter.frequency.setValueAtTime(1800, now);
        oudFilter.frequency.exponentialRampToValueAtTime(300, now + 1.2);
        
        oudGain.gain.setValueAtTime(0.25, now);
        oudGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
        
        oud.start(now);
        oud2.start(now);
        oud.stop(now + 1.5);
        oud2.stop(now + 1.5);
      }
      
      // Mysterious harmonic accents on certain beats
      if (patternStep % 8 === 0) {
        const harmOsc = ctx.createOscillator();
        const harmGain = ctx.createGain();
        const harmFilter = ctx.createBiquadFilter();
        
        harmOsc.connect(harmFilter);
        harmFilter.connect(harmGain);
        harmGain.connect(this.musicGainNode!);
        
        harmOsc.frequency.value = scale[(noteIndex + 7) % scale.length] * 2;
        harmOsc.type = 'sine';
        
        harmFilter.type = 'bandpass';
        harmFilter.frequency.value = 2500;
        harmFilter.Q.value = 5;
        
        harmGain.gain.setValueAtTime(0, now + beatDuration * 2);
        harmGain.gain.linearRampToValueAtTime(0.08, now + beatDuration * 2.5);
        harmGain.gain.exponentialRampToValueAtTime(0.001, now + beatDuration * 5);
        
        harmOsc.start(now + beatDuration * 2);
        harmOsc.stop(now + beatDuration * 5.5);
      }

      // Move through scale with Book of Dead style phrasing
      const phrasePattern = [1, 2, -1, 1, 3, -2, 1, -1, 2, 1, -3, 2];
      noteIndex = (noteIndex + phrasePattern[patternStep % phrasePattern.length] + scale.length) % scale.length;
      patternStep++;
      measureCount++;
    }, 1800); // Slightly slower, more dramatic pacing
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

  // Retrigger - triumphant power boost during bonus
  playRetrigger() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // Quick power burst (faster than bonus trigger)
    const burst = ctx.createOscillator();
    const burstGain = ctx.createGain();
    const burstFilter = ctx.createBiquadFilter();
    
    burst.connect(burstFilter);
    burstFilter.connect(burstGain);
    burstGain.connect(ctx.destination);
    
    burst.frequency.setValueAtTime(80, now);
    burst.frequency.exponentialRampToValueAtTime(400, now + 0.3);
    burst.type = 'sine';
    
    burstFilter.type = 'lowpass';
    burstFilter.frequency.value = 500;
    
    burstGain.gain.setValueAtTime(0.35 * this.volume, now);
    burstGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    
    burst.start(now);
    burst.stop(now + 0.4);

    // Ascending sparkle cascade (faster and more numerous than trigger)
    for (let i = 0; i < 25; i++) {
      const sparkle = ctx.createOscillator();
      const sparkleGain = ctx.createGain();
      
      sparkle.connect(sparkleGain);
      sparkleGain.connect(ctx.destination);
      
      // Higher frequencies for more "brilliant" feel
      sparkle.frequency.value = 1800 + Math.random() * 4000;
      sparkle.type = 'sine';
      
      // Tighter intervals for faster cascade
      const sparkleTime = now + 0.05 + i * 0.025;
      sparkleGain.gain.setValueAtTime(0.12 * this.volume, sparkleTime);
      sparkleGain.gain.exponentialRampToValueAtTime(0.001, sparkleTime + 0.12);
      
      sparkle.start(sparkleTime);
      sparkle.stop(sparkleTime + 0.12);
    }

    // Triumphant E major chord (brighter than D minor trigger)
    const triumphNotes = [164.81, 207.65, 246.94, 329.63, 415.30]; // E3, G#3, B3, E4, G#4
    triumphNotes.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = freq;
      osc.type = 'triangle';
      
      gain.gain.setValueAtTime(0.16 * this.volume, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      
      osc.start(now + 0.15);
      osc.stop(now + 1.2);
    });

    // High shimmer layer with tremolo (book glow effect)
    const shimmer1 = ctx.createOscillator();
    const shimmer2 = ctx.createOscillator();
    const shimmerGain = ctx.createGain();
    const shimmerFilter = ctx.createBiquadFilter();
    const tremolo = ctx.createOscillator();
    const tremoloGain = ctx.createGain();
    
    shimmer1.connect(shimmerFilter);
    shimmer2.connect(shimmerFilter);
    shimmerFilter.connect(shimmerGain);
    shimmerGain.connect(ctx.destination);
    
    tremolo.connect(tremoloGain);
    tremoloGain.connect(shimmerGain.gain);
    
    shimmer1.frequency.value = 2500;
    shimmer2.frequency.value = 3200;
    shimmer1.type = 'sine';
    shimmer2.type = 'sine';
    
    shimmerFilter.type = 'bandpass';
    shimmerFilter.frequency.value = 3000;
    shimmerFilter.Q.value = 3;
    
    tremolo.frequency.value = 12; // Fast tremolo
    tremoloGain.gain.value = 0.04 * this.volume;
    
    shimmerGain.gain.setValueAtTime(0.08 * this.volume, now + 0.1);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
    
    shimmer1.start(now + 0.1);
    shimmer2.start(now + 0.1);
    tremolo.start(now + 0.1);
    shimmer1.stop(now + 1.5);
    shimmer2.stop(now + 1.5);
    tremolo.stop(now + 1.5);

    // Bonus-reinforcing whoosh
    const whoosh = ctx.createOscillator();
    const whooshGain = ctx.createGain();
    
    whoosh.connect(whooshGain);
    whooshGain.connect(ctx.destination);
    
    whoosh.frequency.setValueAtTime(200, now);
    whoosh.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
    whoosh.frequency.exponentialRampToValueAtTime(600, now + 0.35);
    whoosh.type = 'triangle';
    
    whooshGain.gain.setValueAtTime(0.2 * this.volume, now);
    whooshGain.gain.linearRampToValueAtTime(0.25 * this.volume, now + 0.1);
    whooshGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    
    whoosh.start(now);
    whoosh.stop(now + 0.4);
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

  // Big win counting sound - more dramatic, triumphant sound for big/mega/epic wins
  playBigWinCount(): () => void {
    if (!this.enabled) return () => {};
    
    const ctx = this.getContext();
    let isPlaying = true;
    let tickCount = 0;
    
    // Egyptian scale notes for ascending chimes
    const chimeNotes = [293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.26, 783.99]; // D4 to G5
    
    const playTick = () => {
      if (!isPlaying || !this.enabled) return;
      
      const now = ctx.currentTime;
      
      // Deep coin impact (lower, more impactful)
      const coin = ctx.createOscillator();
      const coinGain = ctx.createGain();
      const coinFilter = ctx.createBiquadFilter();
      
      coin.connect(coinFilter);
      coinFilter.connect(coinGain);
      coinGain.connect(ctx.destination);
      
      // Lower pitch for more impact
      const basePitch = 800 + Math.random() * 200;
      coin.frequency.setValueAtTime(basePitch, now);
      coin.frequency.exponentialRampToValueAtTime(basePitch * 0.5, now + 0.1);
      coin.type = 'triangle';
      
      coinFilter.type = 'lowpass';
      coinFilter.frequency.value = 2000;
      
      coinGain.gain.setValueAtTime(0.18 * this.volume, now);
      coinGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      
      coin.start(now);
      coin.stop(now + 0.12);
      
      // Ascending golden chimes (Egyptian harp style)
      const chimeNote = chimeNotes[tickCount % chimeNotes.length];
      const chime = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      const chimeFilter = ctx.createBiquadFilter();
      
      chime.connect(chimeFilter);
      chimeFilter.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      
      chime.frequency.value = chimeNote;
      chime.type = 'sine';
      
      chimeFilter.type = 'bandpass';
      chimeFilter.frequency.value = chimeNote;
      chimeFilter.Q.value = 2;
      
      chimeGain.gain.setValueAtTime(0.1 * this.volume, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      
      chime.start(now);
      chime.stop(now + 0.35);
      
      // Golden shimmer sparkle (more intense)
      const shimmer = ctx.createOscillator();
      const shimmerGain = ctx.createGain();
      
      shimmer.connect(shimmerGain);
      shimmerGain.connect(ctx.destination);
      
      shimmer.frequency.value = 2500 + Math.random() * 800;
      shimmer.type = 'sine';
      
      shimmerGain.gain.setValueAtTime(0.08 * this.volume, now);
      shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      
      shimmer.start(now);
      shimmer.stop(now + 0.15);
      
      // Subtle triumphant undertone every 4 ticks
      if (tickCount % 4 === 0) {
        const brass = ctx.createOscillator();
        const brass2 = ctx.createOscillator();
        const brassGain = ctx.createGain();
        const brassFilter = ctx.createBiquadFilter();
        
        brass.connect(brassFilter);
        brass2.connect(brassFilter);
        brassFilter.connect(brassGain);
        brassGain.connect(ctx.destination);
        
        brass.frequency.value = 146.83; // D3
        brass2.frequency.value = 220; // A3
        brass.type = 'sawtooth';
        brass2.type = 'sawtooth';
        
        brassFilter.type = 'lowpass';
        brassFilter.frequency.value = 600;
        
        brassGain.gain.setValueAtTime(0.06 * this.volume, now);
        brassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        
        brass.start(now);
        brass2.start(now);
        brass.stop(now + 0.25);
        brass2.stop(now + 0.25);
      }
      
      tickCount++;
    };
    
    // Slightly slower interval for more impactful feel (60ms)
    const interval = setInterval(playTick, 60);
    playTick(); // Play first tick immediately
    
    // Return stop function
    return () => {
      isPlaying = false;
      clearInterval(interval);
    };
  }

  // Progressive scatter land sound - builds tension as more scatters land
  playScatterLand(scatterNumber: number) {
    if (!this.enabled) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // Refined progressive settings - more dramatic progression
    // 1st scatter: Subtle mystical chime (0.4s)
    // 2nd scatter: Rising tension with shimmer (0.5s)
    // 3rd scatter: Powerful pre-bonus burst (0.7s)
    
    const baseFreq = 520 + (scatterNumber - 1) * 180; // 520Hz → 700Hz → 880Hz (higher, clearer)
    const duration = 0.4 + (scatterNumber - 1) * 0.15; // 0.4s → 0.55s → 0.7s
    const volume = 0.18 + (scatterNumber - 1) * 0.1; // 0.18 → 0.28 → 0.38 (clearer progression)
    
    // Primary golden bell tone
    const primary = ctx.createOscillator();
    const primaryGain = ctx.createGain();
    const primaryFilter = ctx.createBiquadFilter();
    
    primary.connect(primaryFilter);
    primaryFilter.connect(primaryGain);
    primaryGain.connect(ctx.destination);
    
    // More musical pitch bend - rises then settles
    primary.frequency.setValueAtTime(baseFreq * 0.9, now);
    primary.frequency.exponentialRampToValueAtTime(baseFreq * 1.3, now + duration * 0.25);
    primary.frequency.exponentialRampToValueAtTime(baseFreq, now + duration * 0.7);
    primary.type = 'sine'; // Cleaner sine for bell-like quality
    
    primaryFilter.type = 'bandpass';
    primaryFilter.frequency.value = baseFreq * 1.8;
    primaryFilter.Q.value = 1.5;
    
    primaryGain.gain.setValueAtTime(0, now);
    primaryGain.gain.linearRampToValueAtTime(volume * this.volume, now + 0.02);
    primaryGain.gain.setValueAtTime(volume * this.volume, now + duration * 0.3);
    primaryGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    primary.start(now);
    primary.stop(now + duration + 0.1);
    
    // Warm harmonic overtone
    const harmonic = ctx.createOscillator();
    const harmonicGain = ctx.createGain();
    
    harmonic.connect(harmonicGain);
    harmonicGain.connect(ctx.destination);
    
    harmonic.frequency.value = baseFreq * 2.5; // Higher harmonic for shimmer
    harmonic.type = 'sine';
    
    harmonicGain.gain.setValueAtTime(0, now);
    harmonicGain.gain.linearRampToValueAtTime(volume * 0.25 * this.volume, now + 0.03);
    harmonicGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.6);
    
    harmonic.start(now);
    harmonic.stop(now + duration);
    
    // Sub-bass resonance for weight
    const subBass = ctx.createOscillator();
    const subGain = ctx.createGain();
    const subFilter = ctx.createBiquadFilter();
    
    subBass.connect(subFilter);
    subFilter.connect(subGain);
    subGain.connect(ctx.destination);
    
    subBass.frequency.value = baseFreq / 4; // Low resonance
    subBass.type = 'sine';
    
    subFilter.type = 'lowpass';
    subFilter.frequency.value = 200;
    
    const subVol = 0.12 + (scatterNumber - 1) * 0.06;
    subGain.gain.setValueAtTime(subVol * this.volume, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.8);
    
    subBass.start(now);
    subBass.stop(now + duration);
    
    // Golden sparkle cascade for all scatters (scaled by number)
    const sparkleCount = 3 + scatterNumber * 3; // 6, 9, 12 sparkles
    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = ctx.createOscillator();
      const sparkleGain = ctx.createGain();
      
      sparkle.connect(sparkleGain);
      sparkleGain.connect(ctx.destination);
      
      // Higher frequencies for magical shimmer
      sparkle.frequency.value = 2000 + Math.random() * 2000 + scatterNumber * 500;
      sparkle.type = 'sine';
      
      const sparkleTime = now + 0.02 + i * 0.025;
      const sparkleVol = (0.04 + scatterNumber * 0.015) * this.volume;
      sparkleGain.gain.setValueAtTime(sparkleVol, sparkleTime);
      sparkleGain.gain.exponentialRampToValueAtTime(0.001, sparkleTime + 0.08);
      
      sparkle.start(sparkleTime);
      sparkle.stop(sparkleTime + 0.1);
    }
    
    // Rising tension sweep for 2nd+ scatter
    if (scatterNumber >= 2) {
      const sweep = ctx.createOscillator();
      const sweepGain = ctx.createGain();
      
      sweep.connect(sweepGain);
      sweepGain.connect(ctx.destination);
      
      sweep.frequency.setValueAtTime(200, now);
      sweep.frequency.exponentialRampToValueAtTime(600 + scatterNumber * 200, now + 0.25);
      sweep.type = 'triangle';
      
      const sweepVol = scatterNumber === 3 ? 0.15 : 0.1;
      sweepGain.gain.setValueAtTime(sweepVol * this.volume, now);
      sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      
      sweep.start(now);
      sweep.stop(now + 0.4);
    }
    
    // Powerful pre-bonus effect for 3rd scatter
    if (scatterNumber >= 3) {
      // Deep power impact
      const impact = ctx.createOscillator();
      const impactGain = ctx.createGain();
      const impactFilter = ctx.createBiquadFilter();
      
      impact.connect(impactFilter);
      impactFilter.connect(impactGain);
      impactGain.connect(ctx.destination);
      
      impact.frequency.setValueAtTime(80, now);
      impact.frequency.exponentialRampToValueAtTime(40, now + 0.3);
      impact.type = 'sine';
      
      impactFilter.type = 'lowpass';
      impactFilter.frequency.value = 150;
      
      impactGain.gain.setValueAtTime(0.25 * this.volume, now);
      impactGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      
      impact.start(now);
      impact.stop(now + 0.45);
      
      // Triumphant chord preview (hints at bonus)
      const chordNotes = [293.66, 369.99, 440.00]; // D4, F#4, A4 (D major - triumphant)
      chordNotes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.value = freq;
        osc.type = 'triangle';
        
        filter.type = 'lowpass';
        filter.frequency.value = 1200;
        
        const chordTime = now + 0.1;
        gain.gain.setValueAtTime(0, chordTime);
        gain.gain.linearRampToValueAtTime(0.08 * this.volume, chordTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, chordTime + 0.6);
        
        osc.start(chordTime);
        osc.stop(chordTime + 0.65);
      });
    }
  }
}

// Singleton instance
export const slotSounds = new SlotSoundEffects();
