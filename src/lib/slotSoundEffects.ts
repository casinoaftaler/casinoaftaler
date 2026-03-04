// Slot Machine Sound Effects using Web Audio API
// Egyptian-themed synthesized sounds inspired by ancient Egypt
// Supports custom uploaded sound files with fallback to synthesized sounds

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
  // Scatter sounds
  scatterVolume: number;
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

export interface CustomSoundFiles {
  backgroundMusic?: string | null;
  spinSound?: string | null;
  stopSound?: string | null;
  smallWinSound?: string | null;
  mediumWinSound?: string | null;
  bigWinSound?: string | null;
  bonusTriggerSound?: string | null;
  bonusWinSound?: string | null;
  bonusSymbolScrollSound?: string | null;
  bonusSymbolSelectedSound?: string | null;
  scatterSound1?: string | null;
  scatterSound2?: string | null;
  scatterSound3?: string | null;
  scatterCelebrationSound?: string | null;
  symbolHighlightSound?: string | null;
  symbolDropInSound?: string | null;
}

// localStorage key for persisting audio settings
const AUDIO_SETTINGS_KEY = 'slot-audio-settings';

interface PersistedAudioSettings {
  enabled: boolean;
  volume: number;
  musicEnabled: boolean;
  effectsEnabled: boolean;
  bonusSoundsOnly: boolean;
}

// Default bundled background music per game
const DEFAULT_BACKGROUND_MUSIC: Record<string, string> = {
  'book-of-fedesvin': '/sounds/egyptianmusic.mp3',
  'rise-of-fedesvin': '/sounds/riseoffedesvin.mp3',
  'fedesvin-bonanza': '/sounds/fedesvinbonanzamusic.mp3',
};
// Default bundled spin start sound
const DEFAULT_SPIN_SOUND = '/sounds/spin-start.mp3';

class SlotSoundEffects {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private volume: number = 0.5;
  private musicEnabled: boolean = true;
  private effectsEnabled: boolean = true;
  private bonusSoundsOnly: boolean = false;
  private currentGameId: string = "book-of-fedesvin";
  private musicGainNode: GainNode | null = null;
  private currentMusic: OscillatorNode[] = [];
  private musicInterval: NodeJS.Timeout | null = null;

  // Custom uploaded sound files
  private customSoundFiles: CustomSoundFiles = {};
  private customAudioElements: Map<string, HTMLAudioElement> = new Map();
  private backgroundMusicAudio: HTMLAudioElement | null = null;
  private defaultMusicAudio: HTMLAudioElement | null = null;

  // Audio pool for reliable mobile playback (multiple pre-warmed elements per sound)
  private audioPool: Map<string, HTMLAudioElement[]> = new Map();
  private readonly POOL_SIZE = 3;

  // Mobile audio unlock tracking
  private audioUnlocked: boolean = false;
  private windAmbienceNode: AudioBufferSourceNode | null = null;
  private windAmbienceGain: GainNode | null = null;

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
    // Scatter sounds
    scatterVolume: 0.35,
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

  // Set the current game ID (affects default music fallback)
  // When game changes, clear stale custom sounds from previous game
  setGameId(gameId: string) {
    if (this.currentGameId !== gameId) {
      console.log(`[SlotSounds] Switching game from "${this.currentGameId}" to "${gameId}" — clearing stale sounds`);
      this.currentGameId = gameId;
      // Clear all custom sound state from the previous game to prevent bleed-through
      this.clearAllCustomAudio();
    } else {
      this.currentGameId = gameId;
    }
  }

  // Set custom sound file URLs from admin settings
  setCustomSoundFiles(files: CustomSoundFiles) {
    this.customSoundFiles = files;
    
    const loadedKeys = Object.entries(files).filter(([, v]) => !!v).map(([k]) => k);
    console.log(`[SlotSounds] Setting custom sounds for "${this.currentGameId}":`, loadedKeys);
    
    // Preload custom audio files
    this.preloadCustomAudio();
  }

  // Clear all custom audio state (pools, elements, background music)
  private clearAllCustomAudio() {
    this.customSoundFiles = {};
    
    this.customAudioElements.forEach(audio => {
      audio.pause();
      audio.src = '';
    });
    this.customAudioElements.clear();

    this.audioPool.forEach(pool => {
      pool.forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    });
    this.audioPool.clear();

    // Clear stale background music from previous game
    if (this.backgroundMusicAudio) {
      this.backgroundMusicAudio.pause();
      this.backgroundMusicAudio.src = '';
      this.backgroundMusicAudio = null;
    }
    
    // Clear default music so it gets recreated with the new game's track
    if (this.defaultMusicAudio) {
      this.defaultMusicAudio.pause();
      this.defaultMusicAudio.src = '';
      this.defaultMusicAudio = null;
    }
  }

  private preloadCustomAudio() {
    // Clear existing cached audio elements
    this.customAudioElements.forEach(audio => {
      audio.pause();
      audio.src = '';
    });
    this.customAudioElements.clear();

    // Clear existing audio pool
    this.audioPool.forEach(pool => {
      pool.forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    });
    this.audioPool.clear();

    // Preload each sound file (including scatter and bonus symbol sounds for mobile reliability)
    const soundKeys: (keyof CustomSoundFiles)[] = [
      'spinSound', 'stopSound', 'smallWinSound', 'mediumWinSound', 
      'bigWinSound', 'bonusTriggerSound', 'bonusWinSound',
      'bonusSymbolScrollSound', 'bonusSymbolSelectedSound',
      'scatterSound1', 'scatterSound2', 'scatterSound3',
      'scatterCelebrationSound', 'symbolHighlightSound', 'symbolDropInSound'
    ];

    soundKeys.forEach(key => {
      const url = this.customSoundFiles[key];
      if (url) {
        // Create single preloaded element for compatibility
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = url;
        this.customAudioElements.set(key, audio);
        
        // Create audio pool for reliable mobile playback
        const pool: HTMLAudioElement[] = [];
        for (let i = 0; i < this.POOL_SIZE; i++) {
          const poolAudio = new Audio(url);
          poolAudio.preload = 'auto';
          poolAudio.load(); // Force buffer loading for mobile
          pool.push(poolAudio);
        }
        this.audioPool.set(key, pool);
      }
    });

    // Handle background music separately — clear old reference if new game has no custom music
    if (this.customSoundFiles.backgroundMusic) {
      // Stop default music if it was playing (prevents two tracks overlapping)
      if (this.defaultMusicAudio && !this.defaultMusicAudio.paused) {
        this.defaultMusicAudio.pause();
        this.defaultMusicAudio.currentTime = 0;
      }
      if (this.backgroundMusicAudio) {
        this.backgroundMusicAudio.pause();
      }
      this.backgroundMusicAudio = new Audio();
      this.backgroundMusicAudio.preload = 'auto';
      this.backgroundMusicAudio.loop = true;
      this.backgroundMusicAudio.src = this.customSoundFiles.backgroundMusic;
      // Auto-start custom music if music was already playing
      if (this.enabled && this.musicEnabled) {
        this.backgroundMusicAudio.volume = this.volume * 0.5;
        this.backgroundMusicAudio.play().catch(() => {});
      }
    } else {
      // No custom background music for this game — clear any stale reference
      if (this.backgroundMusicAudio) {
        this.backgroundMusicAudio.pause();
        this.backgroundMusicAudio.src = '';
        this.backgroundMusicAudio = null;
      }
    }
  }

  // Ensure AudioContext is active (resume if suspended by mobile browser)
  private ensureAudioContextActive() {
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume().catch(() => {});
    }
  }

  // Fallback audio playback for when pool fails
  private playFallbackAudio(key: keyof CustomSoundFiles, volumeMultiplier: number) {
    const url = this.customSoundFiles[key];
    if (url) {
      const audio = new Audio(url);
      audio.volume = this.volume * volumeMultiplier;
      audio.play().catch(() => {});
    }
  }

  // Play a custom sound file if available, returns true if played
  // Uses audio pool for reliable mobile playback
  private playCustomSound(key: keyof CustomSoundFiles, volumeMultiplier: number = 1): boolean {
    if (!this.enabled || !this.effectsEnabled) return false;
    
    // Ensure AudioContext is active (mobile browsers may suspend it)
    this.ensureAudioContextActive();
    
    // Try to use audio pool first (most reliable on mobile)
    const pool = this.audioPool.get(key);
    if (pool && pool.length > 0) {
      // Find an available (not playing) audio element
      const audio = pool.find(a => a.paused || a.ended) || pool[0];
      
      // Reset and play
      audio.currentTime = 0;
      audio.volume = this.volume * volumeMultiplier;
      
      // Use play promise for reliability with fallback
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback: try with a fresh audio element
          this.playFallbackAudio(key, volumeMultiplier);
        });
      }
      return true;
    }
    
    // Fallback: use preloaded audio element (clone for overlapping playback)
    const preloadedAudio = this.customAudioElements.get(key);
    if (preloadedAudio && preloadedAudio.src) {
      const audio = preloadedAudio.cloneNode() as HTMLAudioElement;
      audio.volume = this.volume * volumeMultiplier;
      audio.play().catch(() => {
        // Last resort fallback
        this.playFallbackAudio(key, volumeMultiplier);
      });
      return true;
    }
    
    // Final fallback: create new audio from URL
    const url = this.customSoundFiles[key];
    if (url) {
      const audio = new Audio(url);
      audio.volume = this.volume * volumeMultiplier;
      audio.play().catch(() => {});
      return true;
    }
    return false;
  }

  // Check if regular effects can play (muted in bonus-only mode)
  private canPlayEffect(): boolean {
    return this.enabled && this.effectsEnabled && !this.bonusSoundsOnly;
  }

  // Check if bonus sounds can play (scatter, tease, bonus trigger)
  private canPlayBonusSound(): boolean {
    return this.enabled && this.effectsEnabled;
  }

  private loadPersistedSettings() {
    try {
      const saved = localStorage.getItem(AUDIO_SETTINGS_KEY);
      if (saved) {
        const settings: PersistedAudioSettings = JSON.parse(saved);
        this.enabled = settings.enabled ?? true;
        this.volume = settings.volume ?? 0.5;
        this.musicEnabled = settings.musicEnabled ?? true;
        this.effectsEnabled = settings.effectsEnabled ?? true;
        this.bonusSoundsOnly = settings.bonusSoundsOnly ?? false;
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
        effectsEnabled: this.effectsEnabled,
        bonusSoundsOnly: this.bonusSoundsOnly,
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

  // Unlock audio for mobile devices - call on first user interaction
  // This establishes audio permission by playing silent audio within user gesture context
  unlockAudio() {
    if (this.audioUnlocked) return;
    
    // Resume AudioContext if suspended
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume();
    }
    
    // Pre-warm the AudioContext
    this.getContext();
    
    // Play a silent sound to unlock audio on mobile
    // This must happen within user gesture context (click/touch)
    const silentAudio = new Audio();
    silentAudio.volume = 0.001;
    // Minimal valid MP3 data (silent)
    silentAudio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAgAAABIADw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8P//8AAABQS0RSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/jOMAAT0AALAAAAAFJS2YBCgAAmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJj/4zjAAAAsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/jOMABP/wAABpAAAAAAAANIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==';
    silentAudio.play().then(() => {
      this.audioUnlocked = true;
      console.log('[SlotSounds] Audio unlocked for mobile playback');
    }).catch(() => {
      // Ignore errors, we'll try again on next interaction
    });
    
    // Also "warm up" preloaded audio elements by setting their volume
    // This helps ensure they're ready for instant playback
    this.customAudioElements.forEach((audio) => {
      audio.load(); // Force reload to ensure buffer is ready
    });
  }

  isAudioUnlocked(): boolean {
    return this.audioUnlocked;
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
    } else if (this.musicEnabled) {
      this.startMusic();
    }
    this.persistSettings();
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.musicGainNode) {
      this.musicGainNode.gain.value = 0.08 * this.volume;
    }
    // Update custom background music volume
    if (this.backgroundMusicAudio) {
      this.backgroundMusicAudio.volume = this.volume * 0.5;
    }
    // Update default background music volume
    if (this.defaultMusicAudio) {
      this.defaultMusicAudio.volume = this.volume * 0.5;
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

  isEffectsEnabled() {
    return this.effectsEnabled;
  }

  setEffectsEnabled(enabled: boolean) {
    this.effectsEnabled = enabled;
    this.persistSettings();
  }

  isBonusSoundsOnly() {
    return this.bonusSoundsOnly;
  }

  setBonusSoundsOnly(enabled: boolean) {
    this.bonusSoundsOnly = enabled;
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
    
    // If custom background music is configured, ONLY use that — never fall back to default
    if (this.customSoundFiles.backgroundMusic) {
      if (this.backgroundMusicAudio && !this.backgroundMusicAudio.paused) {
        return; // Custom music already playing
      }
      // Stop any default music that might be playing
      if (this.defaultMusicAudio && !this.defaultMusicAudio.paused) {
        this.defaultMusicAudio.pause();
        this.defaultMusicAudio.currentTime = 0;
      }
      this.stopMusic();
      if (this.backgroundMusicAudio) {
        this.backgroundMusicAudio.volume = this.volume * 0.5;
        this.backgroundMusicAudio.play().catch(() => {});
      }
      return;
    }
    
    // No custom music — use default bundled music
    const expectedDefaultUrl = DEFAULT_BACKGROUND_MUSIC[this.currentGameId] || DEFAULT_BACKGROUND_MUSIC['book-of-fedesvin'];
    if (this.defaultMusicAudio && !this.defaultMusicAudio.paused) {
      const currentSrc = this.defaultMusicAudio.src;
      const expectedSrc = new URL(expectedDefaultUrl, window.location.origin).href;
      if (currentSrc === expectedSrc) {
        return; // Correct default music already playing
      }
    }
    if (this.musicInterval) return; // Synthesized music already playing
    
    // Stop any currently playing music first to prevent overlap
    this.stopMusic();
    
    this.playDefaultMusic();
  }

  // Play the default bundled music for the current game
  private playDefaultMusic() {
    const defaultMusicUrl = DEFAULT_BACKGROUND_MUSIC[this.currentGameId] || DEFAULT_BACKGROUND_MUSIC['book-of-fedesvin'];
    
    // Recreate if the URL changed (game switch)
    if (this.defaultMusicAudio && this.defaultMusicAudio.src !== new URL(defaultMusicUrl, window.location.origin).href) {
      this.defaultMusicAudio.pause();
      this.defaultMusicAudio = null;
    }
    
    if (!this.defaultMusicAudio) {
      this.defaultMusicAudio = new Audio(defaultMusicUrl);
      this.defaultMusicAudio.loop = true;
      this.defaultMusicAudio.preload = 'auto';
    }
    
    if (this.defaultMusicAudio.paused) {
      this.defaultMusicAudio.volume = this.volume * 0.5;
      this.defaultMusicAudio.play().catch(() => {
        // If default music fails, fall back to synthesized
        this.startSynthesizedMusic();
      });
    }
  }

  // Synthesized Egyptian music (fallback)
  private startSynthesizedMusic() {
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
    // Stop custom background music
    if (this.backgroundMusicAudio) {
      this.backgroundMusicAudio.pause();
      this.backgroundMusicAudio.currentTime = 0;
    }

    // Stop default background music
    if (this.defaultMusicAudio) {
      this.defaultMusicAudio.pause();
      this.defaultMusicAudio.currentTime = 0;
    }

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

  // Spin start sound effect
  playSpinStart() {
    if (!this.canPlayEffect()) return;
    
    // Try custom spin sound first (from admin upload) - use reduced volume
    if (this.playCustomSound('spinSound', 0.1)) return;
    
    // Play default bundled spin sound at reduced volume
    const audio = new Audio(DEFAULT_SPIN_SOUND);
    audio.volume = this.volume * 0.1;
    audio.play().catch(() => {
      // Ignore autoplay errors
    });
  }

  // Reel spinning loop - Book of Dead style mechanical clicking
  playReelSpin(): () => void {
    if (!this.canPlayEffect()) return () => {};
    
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
    if (!this.canPlayEffect()) return;
    
    // Try custom stop sound first - plays for each reel
    if (this.playCustomSound('stopSound')) return;
    
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
    if (!this.canPlayEffect()) return;
    
    // Try custom stop sound first
    if (this.playCustomSound('stopSound')) return;
    
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

  // Crackling electric burst for symbol explosions
  playCrackle() {
    if (!this.canPlayEffect()) return;
    
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // White noise burst
    const bufferSize = ctx.sampleRate * 0.15;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    
    // High-pass filter for crackle texture
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 3000;
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.25 * this.volume, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.15);
    
    // High frequency zaps
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 4000 + Math.random() * 3000;
      osc.type = 'sawtooth';
      const t = now + i * 0.04;
      gain.gain.setValueAtTime(0.12 * this.volume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      osc.start(t);
      osc.stop(t + 0.05);
    }
  }

  // Candy drop-in sound for tumble refills
  playSymbolDropIn() {
    if (!this.canPlayEffect()) return;
    if (this.playCustomSound('symbolDropInSound', 0.6)) return;
    // Fallback: use the clack sound
    this.playClack();
  }

  // Percussive clack for symbol landing impact
  playClack() {
    if (!this.canPlayEffect()) return;
    
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // Low frequency thud
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.3 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.start(now);
    osc.stop(now + 0.12);
    
    // Short click transient
    const click = ctx.createOscillator();
    const clickGain = ctx.createGain();
    click.connect(clickGain);
    clickGain.connect(ctx.destination);
    click.frequency.value = 800;
    click.type = 'square';
    clickGain.gain.setValueAtTime(0.15 * this.volume, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    click.start(now);
    click.stop(now + 0.03);
  }

  // Small win - golden coins with Egyptian harp
  playSmallWin() {
    if (!this.canPlayEffect()) return;
    
    // Try custom small win sound first
    if (this.playCustomSound('smallWinSound')) return;
    
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
    if (!this.canPlayEffect()) return;
    
    // Try custom medium win sound first
    if (this.playCustomSound('mediumWinSound')) return;
    
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
    if (!this.canPlayEffect()) return;
    
    // Try custom big win sound first
    if (this.playCustomSound('bigWinSound')) return;
    
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
    if (!this.canPlayBonusSound()) return;
    
    // Try custom bonus trigger sound first
    if (this.playCustomSound('bonusTriggerSound')) return;
    
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

  // Scatter celebration - plays during the 1.5s pulsing animation before bonus overlay
  playScatterCelebration() {
    if (!this.canPlayBonusSound()) return;
    
    // Try custom scatter celebration sound first
    if (this.playCustomSound('scatterCelebrationSound')) return;
    
    // Synthesized Egyptian celebration build-up (~1.5 seconds)
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // Rising mystical shimmer
    for (let i = 0; i < 15; i++) {
      const shimmer = ctx.createOscillator();
      const shimmerGain = ctx.createGain();
      
      shimmer.connect(shimmerGain);
      shimmerGain.connect(ctx.destination);
      
      // Rising frequencies for build-up effect
      shimmer.frequency.value = 800 + i * 150 + Math.random() * 200;
      shimmer.type = 'sine';
      
      const shimmerTime = now + i * 0.1;
      shimmerGain.gain.setValueAtTime(0.08 * this.volume, shimmerTime);
      shimmerGain.gain.exponentialRampToValueAtTime(0.001, shimmerTime + 0.2);
      
      shimmer.start(shimmerTime);
      shimmer.stop(shimmerTime + 0.2);
    }
    
    // Deep mystical drone building tension
    const drone = ctx.createOscillator();
    const droneGain = ctx.createGain();
    const droneFilter = ctx.createBiquadFilter();
    
    drone.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(ctx.destination);
    
    drone.frequency.setValueAtTime(80, now);
    drone.frequency.exponentialRampToValueAtTime(150, now + 1.3);
    drone.type = 'sawtooth';
    
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(200, now);
    droneFilter.frequency.exponentialRampToValueAtTime(800, now + 1.3);
    
    droneGain.gain.setValueAtTime(0.15 * this.volume, now);
    droneGain.gain.linearRampToValueAtTime(0.25 * this.volume, now + 1);
    droneGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
    
    drone.start(now);
    drone.stop(now + 1.5);
    
    // Magical chime sequence (Egyptian scale)
    const chimeNotes = [293.66, 349.23, 392.00, 440.00, 523.25]; // D minor ascending
    chimeNotes.forEach((freq, i) => {
      const chime = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      
      chime.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      
      chime.frequency.value = freq;
      chime.type = 'triangle';
      
      const chimeTime = now + 0.2 + i * 0.2;
      chimeGain.gain.setValueAtTime(0.12 * this.volume, chimeTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, chimeTime + 0.4);
      
      chime.start(chimeTime);
      chime.stop(chimeTime + 0.4);
    });
    
    // Final mystical sweep before bonus
    const sweep = ctx.createOscillator();
    const sweepGain = ctx.createGain();
    
    sweep.connect(sweepGain);
    sweepGain.connect(ctx.destination);
    
    sweep.frequency.setValueAtTime(200, now + 1.1);
    sweep.frequency.exponentialRampToValueAtTime(1200, now + 1.4);
    sweep.type = 'sine';
    
    sweepGain.gain.setValueAtTime(0.18 * this.volume, now + 1.1);
    sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
    
    sweep.start(now + 1.1);
    sweep.stop(now + 1.5);
  }

  // Bonus symbol scroll - mystical scrolling sound during symbol picker
  playBonusSymbolScroll(): () => void {
    if (!this.canPlayBonusSound()) return () => {};
    
    // Ensure AudioContext is active for mobile
    this.ensureAudioContextActive();
    
    // Try pooled audio first (most reliable on mobile)
    const pool = this.audioPool.get('bonusSymbolScrollSound');
    if (pool && pool.length > 0) {
      const audio = pool[0];
      audio.currentTime = 0;
      audio.volume = this.volume;
      audio.loop = true;
      audio.play().catch(() => {});
      return () => {
        audio.pause();
        audio.currentTime = 0;
        audio.loop = false;
      };
    }
    
    // Try custom bonus symbol scroll sound (fallback to preloaded)
    const customAudio = this.customSoundFiles.bonusSymbolScrollSound;
    if (customAudio) {
      const audio = new Audio(customAudio);
      audio.volume = this.volume;
      audio.loop = true;
      audio.play().catch(() => {});
      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
    
    // Fallback to synthesized sound
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // Create oscillators for mystical whoosh effect
    const whooshOsc = ctx.createOscillator();
    const whooshGain = ctx.createGain();
    const whooshFilter = ctx.createBiquadFilter();
    
    whooshOsc.connect(whooshFilter);
    whooshFilter.connect(whooshGain);
    whooshGain.connect(ctx.destination);
    
    whooshOsc.type = 'sawtooth';
    whooshOsc.frequency.setValueAtTime(100, now);
    
    whooshFilter.type = 'bandpass';
    whooshFilter.frequency.setValueAtTime(400, now);
    whooshFilter.Q.value = 2;
    
    // LFO for frequency modulation (scrolling effect)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.connect(lfoGain);
    lfoGain.connect(whooshOsc.frequency);
    lfo.frequency.value = 8; // Fast modulation for scroll feel
    lfoGain.gain.value = 50;
    
    whooshGain.gain.setValueAtTime(0.15 * this.volume, now);
    
    whooshOsc.start(now);
    lfo.start(now);
    
    // Sparkle overlay
    const sparkleInterval = setInterval(() => {
      const sparkle = ctx.createOscillator();
      const sparkleGain = ctx.createGain();
      
      sparkle.connect(sparkleGain);
      sparkleGain.connect(ctx.destination);
      
      sparkle.frequency.value = 1500 + Math.random() * 2500;
      sparkle.type = 'sine';
      
      sparkleGain.gain.setValueAtTime(0.08 * this.volume, ctx.currentTime);
      sparkleGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      
      sparkle.start();
      sparkle.stop(ctx.currentTime + 0.1);
    }, 120);
    
    // Return stop function
    return () => {
      clearInterval(sparkleInterval);
      const stopTime = ctx.currentTime;
      whooshGain.gain.exponentialRampToValueAtTime(0.001, stopTime + 0.3);
      whooshOsc.stop(stopTime + 0.3);
      lfo.stop(stopTime + 0.3);
    };
  }

  // Bonus symbol selected - dramatic reveal sound when symbol is chosen
  playBonusSymbolSelected() {
    if (!this.canPlayBonusSound()) return;
    
    // Try custom sound first
    if (this.playCustomSound('bonusSymbolSelectedSound')) return;
    
    // Fallback to synthesized dramatic reveal
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // Deep impact hit
    const impact = ctx.createOscillator();
    const impactGain = ctx.createGain();
    const impactFilter = ctx.createBiquadFilter();
    
    impact.connect(impactFilter);
    impactFilter.connect(impactGain);
    impactGain.connect(ctx.destination);
    
    impact.frequency.setValueAtTime(150, now);
    impact.frequency.exponentialRampToValueAtTime(40, now + 0.3);
    impact.type = 'sine';
    
    impactFilter.type = 'lowpass';
    impactFilter.frequency.value = 200;
    
    impactGain.gain.setValueAtTime(0.4 * this.volume, now);
    impactGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    
    impact.start(now);
    impact.stop(now + 0.5);
    
    // Mystical shimmer chord (D major with Egyptian flavor)
    const shimmerNotes = [293.66, 369.99, 440, 587.33]; // D4, F#4, A4, D5
    shimmerNotes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = freq;
      osc.type = 'sine';
      
      filter.type = 'lowpass';
      filter.frequency.value = 2000;
      
      const startTime = now + 0.05 + (i * 0.03);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.15 * this.volume, startTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2);
      
      osc.start(startTime);
      osc.stop(startTime + 1.2);
    });
    
    // Sparkle burst
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const sparkle = ctx.createOscillator();
        const sparkleGain = ctx.createGain();
        
        sparkle.connect(sparkleGain);
        sparkleGain.connect(ctx.destination);
        
        sparkle.frequency.value = 2000 + Math.random() * 3000;
        sparkle.type = 'sine';
        
        sparkleGain.gain.setValueAtTime(0.1 * this.volume, ctx.currentTime);
        sparkleGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        
        sparkle.start();
        sparkle.stop(ctx.currentTime + 0.15);
      }, i * 40);
    }
  }

  // Retrigger - triumphant power boost during bonus
  playRetrigger() {
    if (!this.canPlayEffect()) return;
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

  // Bonus complete - triumphant ancient victory
  playBonusWin() {
    if (!this.canPlayEffect()) return;
    
    // Try custom bonus win sound first
    if (this.playCustomSound('bonusWinSound')) return;
    
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // Triumphant fanfare with Egyptian scale
    const fanfareNotes = [
      { freq: 293.66, time: 0 },      // D4
      { freq: 349.23, time: 0.15 },   // F4
      { freq: 440.00, time: 0.30 },   // A4
      { freq: 523.25, time: 0.45 },   // C5
      { freq: 587.33, time: 0.60 },   // D5 - high triumphant note
    ];
    
    fanfareNotes.forEach(({ freq, time }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = freq;
      osc.type = 'triangle';
      
      const noteTime = now + time;
      gain.gain.setValueAtTime(0.25 * this.volume, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.5);
      
      osc.start(noteTime);
      osc.stop(noteTime + 0.5);
    });
    
    // Massive gold coin cascade
    for (let i = 0; i < 40; i++) {
      const coin = ctx.createOscillator();
      const coinGain = ctx.createGain();
      
      coin.connect(coinGain);
      coinGain.connect(ctx.destination);
      
      coin.frequency.value = 1800 + Math.random() * 3500;
      coin.type = 'sine';
      
      const coinTime = now + 0.4 + i * 0.04;
      coinGain.gain.setValueAtTime(0.07 * this.volume, coinTime);
      coinGain.gain.exponentialRampToValueAtTime(0.001, coinTime + 0.15);
      
      coin.start(coinTime);
      coin.stop(coinTime + 0.15);
    }
    
    // Deep ceremonial drums
    for (let i = 0; i < 6; i++) {
      const drum = ctx.createOscillator();
      const drumGain = ctx.createGain();
      
      drum.connect(drumGain);
      drumGain.connect(ctx.destination);
      
      const drumTime = now + i * 0.3;
      drum.frequency.setValueAtTime(90, drumTime);
      drum.frequency.exponentialRampToValueAtTime(35, drumTime + 0.2);
      drum.type = 'sine';
      
      drumGain.gain.setValueAtTime(0.35 * this.volume, drumTime);
      drumGain.gain.exponentialRampToValueAtTime(0.001, drumTime + 0.25);
      
      drum.start(drumTime);
      drum.stop(drumTime + 0.3);
    }
    
    // Triumphant D major chord with shimmer
    setTimeout(() => {
      const victoryChord = [293.66, 369.99, 440.00, 587.33, 739.99]; // D major
      victoryChord.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.value = freq;
        osc.type = 'triangle';
        
        gain.gain.setValueAtTime(0.2 * this.volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
        
        osc.start();
        osc.stop(ctx.currentTime + 2.5);
      });
    }, 800);
  }

  // Symbol expansion - ancient power surge
  playSymbolExpand() {
    if (!this.canPlayEffect()) return;
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
    if (!this.canPlayEffect()) return;
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
    if (!this.canPlayEffect()) return;
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
    if (!this.canPlayBonusSound()) return () => {};
    
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // Create master gain for tease sounds
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.25 * this.volume;
    masterGain.connect(ctx.destination);
    
    // Deep heartbeat-like pulse
    const heartbeatInterval = setInterval(() => {
      if (!this.canPlayEffect()) return;
      
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
    if (!this.canPlayBonusSound()) return () => {};
    
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
    if (!this.canPlayEffect()) return () => {};
    
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
    if (!this.canPlayEffect()) return () => {};
    
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

  // Progressive scatter land sound - cat meow sounds that build in intensity
  playScatterLand(scatterNumber: number) {
    if (!this.canPlayBonusSound()) return;
    
    // Get scatter volume from settings (default 0.35)
    const scatterVolume = this.soundSettings.scatterVolume ?? 0.35;
    
    // Try to play custom scatter sound based on scatter number
    const scatterKey = `scatterSound${scatterNumber}` as keyof CustomSoundFiles;
    if (this.playCustomSound(scatterKey, scatterVolume)) {
      return; // Custom sound played successfully
    }
    
    // Fallback to synthesized meow
    const ctx = this.getContext();
    const now = ctx.currentTime;
    
    // Progressive cat sound settings
    // 1st scatter: Soft curious meow
    // 2nd scatter: Louder, more excited meow
    // 3rd scatter: Powerful triumphant meow/yowl
    
    const basePitch = 300 + (scatterNumber - 1) * 100; // 300Hz → 400Hz → 500Hz
    const duration = 0.3 + (scatterNumber - 1) * 0.15; // 0.3s → 0.45s → 0.6s
    // Apply scatter volume setting with progressive scaling
    const baseVolume = scatterVolume * (0.7 + (scatterNumber - 1) * 0.35); // Uses setting with progressive scaling
    
    // Main meow formant - vocal tract simulation
    const meow1 = ctx.createOscillator();
    const meow1Gain = ctx.createGain();
    const meow1Filter = ctx.createBiquadFilter();
    
    meow1.connect(meow1Filter);
    meow1Filter.connect(meow1Gain);
    meow1Gain.connect(ctx.destination);
    
    // Cat meow pitch contour - rises then falls (characteristic "mee-ow")
    meow1.frequency.setValueAtTime(basePitch * 0.8, now);
    meow1.frequency.exponentialRampToValueAtTime(basePitch * 1.5, now + duration * 0.3);
    meow1.frequency.exponentialRampToValueAtTime(basePitch * 0.6, now + duration * 0.9);
    meow1.type = 'sawtooth'; // Rich harmonics for vocal quality
    
    // Formant filter for "ee" to "ow" transition
    meow1Filter.type = 'bandpass';
    meow1Filter.frequency.setValueAtTime(800, now);
    meow1Filter.frequency.exponentialRampToValueAtTime(400, now + duration * 0.7);
    meow1Filter.Q.value = 2 + scatterNumber; // Sharper resonance for later scatters
    
    // Volume envelope - attack, sustain, decay
    meow1Gain.gain.setValueAtTime(0, now);
    meow1Gain.gain.linearRampToValueAtTime(baseVolume * this.volume, now + 0.03);
    meow1Gain.gain.setValueAtTime(baseVolume * this.volume * 0.8, now + duration * 0.4);
    meow1Gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    meow1Gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    meow1.start(now);
    meow1.stop(now + duration + 0.1);
    
    // Second formant for richer meow sound
    const meow2 = ctx.createOscillator();
    const meow2Gain = ctx.createGain();
    const meow2Filter = ctx.createBiquadFilter();
    
    meow2.connect(meow2Filter);
    meow2Filter.connect(meow2Gain);
    meow2Gain.connect(ctx.destination);
    
    meow2.frequency.setValueAtTime(basePitch * 1.6, now);
    meow2.frequency.exponentialRampToValueAtTime(basePitch * 2.4, now + duration * 0.25);
    meow2.frequency.exponentialRampToValueAtTime(basePitch * 1.2, now + duration * 0.85);
    meow2.type = 'triangle';
    
    meow2Filter.type = 'bandpass';
    meow2Filter.frequency.setValueAtTime(1200, now);
    meow2Filter.frequency.exponentialRampToValueAtTime(600, now + duration * 0.6);
    meow2Filter.Q.value = 3;
    
    meow2Gain.gain.setValueAtTime(0, now);
    meow2Gain.gain.linearRampToValueAtTime(baseVolume * 0.4 * this.volume, now + 0.04);
    meow2Gain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.8);
    
    meow2.start(now);
    meow2.stop(now + duration);
    
    // Nasal resonance (cats have a nasal quality)
    const nasal = ctx.createOscillator();
    const nasalGain = ctx.createGain();
    const nasalFilter = ctx.createBiquadFilter();
    
    nasal.connect(nasalFilter);
    nasalFilter.connect(nasalGain);
    nasalGain.connect(ctx.destination);
    
    nasal.frequency.setValueAtTime(basePitch * 3, now);
    nasal.frequency.exponentialRampToValueAtTime(basePitch * 2, now + duration * 0.5);
    nasal.type = 'sine';
    
    nasalFilter.type = 'bandpass';
    nasalFilter.frequency.value = 2500;
    nasalFilter.Q.value = 5;
    
    nasalGain.gain.setValueAtTime(baseVolume * 0.15 * this.volume, now + 0.02);
    nasalGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.5);
    
    nasal.start(now);
    nasal.stop(now + duration);
    
    // Add vibrato for 2nd+ scatter (more expressive meow)
    if (scatterNumber >= 2) {
      const vibrato = ctx.createOscillator();
      const vibratoGain = ctx.createGain();
      
      vibrato.frequency.value = 6 + scatterNumber * 2; // 8Hz, 10Hz vibrato
      vibratoGain.gain.value = 15 + scatterNumber * 10; // Deeper vibrato for later scatters
      
      vibrato.connect(vibratoGain);
      vibratoGain.connect(meow1.frequency);
      
      vibrato.start(now + duration * 0.2);
      vibrato.stop(now + duration);
    }
    
    // Triumphant yowl effect for 3rd scatter
    if (scatterNumber >= 3) {
      // Extended yowl with multiple peaks
      const yowl = ctx.createOscillator();
      const yowlGain = ctx.createGain();
      const yowlFilter = ctx.createBiquadFilter();
      
      yowl.connect(yowlFilter);
      yowlFilter.connect(yowlGain);
      yowlGain.connect(ctx.destination);
      
      // More dramatic pitch contour
      yowl.frequency.setValueAtTime(basePitch * 0.5, now + 0.1);
      yowl.frequency.exponentialRampToValueAtTime(basePitch * 2, now + 0.25);
      yowl.frequency.exponentialRampToValueAtTime(basePitch * 1.5, now + 0.4);
      yowl.frequency.exponentialRampToValueAtTime(basePitch * 0.4, now + 0.7);
      yowl.type = 'sawtooth';
      
      yowlFilter.type = 'lowpass';
      yowlFilter.frequency.value = 1500;
      yowlFilter.Q.value = 2;
      
      yowlGain.gain.setValueAtTime(0, now + 0.1);
      yowlGain.gain.linearRampToValueAtTime(0.3 * this.volume, now + 0.15);
      yowlGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
      
      yowl.start(now + 0.1);
      yowl.stop(now + 0.8);
      
      // Purr undertone for satisfaction
      const purr = ctx.createOscillator();
      const purrGain = ctx.createGain();
      
      purr.connect(purrGain);
      purrGain.connect(ctx.destination);
      
      purr.frequency.value = 25; // Cat purr frequency ~25Hz
      purr.type = 'sine';
      
      purrGain.gain.setValueAtTime(0.15 * this.volume, now + 0.2);
      purrGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      
      purr.start(now + 0.2);
      purr.stop(now + 0.85);
    }
  }
  // Column stop thud sound (soft impact per column landing)
  playColumnStop() {
    if (!this.canPlayEffect()) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);
    osc.type = 'sine';

    filter.type = 'lowpass';
    filter.frequency.value = 200;

    gain.gain.setValueAtTime(0.2 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Deep thunder for climax state (chain 3+)
  playDeepThunder() {
    if (!this.canPlayEffect()) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // Low frequency rumble
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(50, now);
    osc.frequency.exponentialRampToValueAtTime(25, now + 0.8);
    osc.type = 'sine';

    osc2.frequency.setValueAtTime(35, now);
    osc2.frequency.exponentialRampToValueAtTime(18, now + 1);
    osc2.type = 'triangle';

    filter.type = 'lowpass';
    filter.frequency.value = 150;

    gain.gain.setValueAtTime(0.35 * this.volume, now);
    gain.gain.linearRampToValueAtTime(0.25 * this.volume, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + 1.3);
    osc2.stop(now + 1.3);
  }

  // Wind ambience loop (filtered white noise)
  playWindAmbience() {
    if (!this.enabled) return;
    if (this.windAmbienceNode) return; // Already playing

    const ctx = this.getContext();
    // Generate white noise buffer
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 400;
    filter.Q.value = 0.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.04 * this.volume, ctx.currentTime + 2);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start();
    this.windAmbienceNode = source;
    this.windAmbienceGain = gain;
  }

  stopWindAmbience() {
    if (this.windAmbienceNode) {
      try {
        if (this.windAmbienceGain) {
          const ctx = this.audioContext;
          if (ctx) {
            this.windAmbienceGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
            setTimeout(() => {
              try { this.windAmbienceNode?.stop(); } catch {}
              this.windAmbienceNode = null;
              this.windAmbienceGain = null;
            }, 1100);
            return;
          }
        }
        this.windAmbienceNode.stop();
      } catch {}
      this.windAmbienceNode = null;
      this.windAmbienceGain = null;
    }
  }

  // --- BONUS-SPECIFIC SOUNDS ---

  // Heavier column stop for bonus mode (thud + electric crackle)
  playBonusColumnStop() {
    if (!this.canPlayBonusSound()) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // Heavy thud
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.15);
    filter.type = 'lowpass';
    filter.frequency.value = 250;
    gain.gain.setValueAtTime(0.3 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.start(now);
    osc.stop(now + 0.25);

    // Electric crackle overtone
    const crackle = ctx.createOscillator();
    const crackleGain = ctx.createGain();
    crackle.connect(crackleGain);
    crackleGain.connect(ctx.destination);
    crackle.type = 'sawtooth';
    crackle.frequency.setValueAtTime(800, now);
    crackle.frequency.exponentialRampToValueAtTime(200, now + 0.1);
    crackleGain.gain.setValueAtTime(0.08 * this.volume, now);
    crackleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    crackle.start(now);
    crackle.stop(now + 0.15);
  }

  // Sharp thunder crack for final column in bonus
  playBonusThunderCrack() {
    if (!this.canPlayBonusSound()) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.4);

    osc2.type = 'square';
    osc2.frequency.setValueAtTime(150, now);
    osc2.frequency.exponentialRampToValueAtTime(25, now + 0.5);

    gain.gain.setValueAtTime(0.25 * this.volume, now);
    gain.gain.linearRampToValueAtTime(0.15 * this.volume, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + 0.65);
    osc2.stop(now + 0.65);
  }

  // Deep bass boom when multiplier hits the counter
  playMultiplierSlam() {
    if (!this.canPlayBonusSound()) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(60, now);
    osc.frequency.exponentialRampToValueAtTime(20, now + 0.3);
    filter.type = 'lowpass';
    filter.frequency.value = 180;

    gain.gain.setValueAtTime(0.4 * this.volume, now);
    gain.gain.linearRampToValueAtTime(0.2 * this.volume, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.start(now);
    osc.stop(now + 0.55);

    // Impact transient
    const click = ctx.createOscillator();
    const clickGain = ctx.createGain();
    click.connect(clickGain);
    clickGain.connect(ctx.destination);
    click.type = 'triangle';
    click.frequency.setValueAtTime(2000, now);
    click.frequency.exponentialRampToValueAtTime(500, now + 0.03);
    clickGain.gain.setValueAtTime(0.15 * this.volume, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    click.start(now);
    click.stop(now + 0.06);
  }

  // Orchestral/choir swell for large bonus wins (ascending chord)
  playBonusWinSwell() {
    if (!this.canPlayBonusSound()) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // Ascending chord: C4, E4, G4, C5
    const freqs = [261.63, 329.63, 392.00, 523.25];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = i < 2 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq * 0.98, now + i * 0.15);
      osc.frequency.linearRampToValueAtTime(freq, now + i * 0.15 + 0.3);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12 * this.volume, now + i * 0.15 + 0.2);
      gain.gain.setValueAtTime(0.12 * this.volume, now + 1.5);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

      osc.start(now + i * 0.15);
      osc.stop(now + 2.6);
    });
  }

  // Symbol highlight sound — plays when winning symbols light up before exploding
  playSymbolHighlight() {
    if (!this.canPlayEffect()) return;
    
    // Try custom sound first
    if (this.playCustomSound('symbolHighlightSound', 0.7)) return;
    
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // Bright crystalline chime — rising shimmer that says "these symbols are about to pop"
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    // Two detuned sine waves for sparkle
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1200, now);
    osc1.frequency.exponentialRampToValueAtTime(2400, now + 0.15);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1800, now);
    osc2.frequency.exponentialRampToValueAtTime(3200, now + 0.12);

    filter.type = 'bandpass';
    filter.frequency.value = 2000;
    filter.Q.value = 1.5;

    gain.gain.setValueAtTime(0.18 * this.volume, now);
    gain.gain.setValueAtTime(0.22 * this.volume, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc1.start(now);
    osc1.stop(now + 0.35);
    osc2.start(now);
    osc2.stop(now + 0.3);

    // Sub-thud anticipation layer
    const thud = ctx.createOscillator();
    const thudGain = ctx.createGain();
    thud.connect(thudGain);
    thudGain.connect(ctx.destination);

    thud.type = 'sine';
    thud.frequency.setValueAtTime(180, now);
    thud.frequency.exponentialRampToValueAtTime(80, now + 0.15);
    thudGain.gain.setValueAtTime(0.1 * this.volume, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    thud.start(now);
    thud.stop(now + 0.25);
  }

  // Scatter tease rising pitch sound (2-3 scatters visible)
  playScatterTease(scatterCount: number) {
    if (!this.canPlayBonusSound()) return;
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // Rising pitch sweep — higher pitch for more scatters
    const baseFreq = scatterCount >= 3 ? 400 : 300;
    const endFreq = scatterCount >= 3 ? 1200 : 800;
    const duration = scatterCount >= 3 ? 0.8 : 0.6;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);

    gain.gain.setValueAtTime(0.15 * this.volume, now);
    gain.gain.setValueAtTime(0.2 * this.volume, now + duration * 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration + 0.2);

    osc.start(now);
    osc.stop(now + duration + 0.25);

    // Add shimmer overtone
    const shimmer = ctx.createOscillator();
    const shimmerGain = ctx.createGain();
    shimmer.connect(shimmerGain);
    shimmerGain.connect(ctx.destination);

    shimmer.type = 'triangle';
    shimmer.frequency.setValueAtTime(baseFreq * 2.5, now);
    shimmer.frequency.exponentialRampToValueAtTime(endFreq * 2, now + duration);

    shimmerGain.gain.setValueAtTime(0.06 * this.volume, now);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + duration + 0.1);

    shimmer.start(now);
    shimmer.stop(now + duration + 0.15);
  }
}

// Singleton instance
export const slotSounds = new SlotSoundEffects();
