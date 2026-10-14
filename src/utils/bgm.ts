// Cosmic Ambient Background Music Engine for PlanetKuu using Web Audio API
// Generates an atmospheric, meditative space ambient soundtrack (infinite, lightweight, zero assets needed).

class CosmicBGMManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private isRunning: boolean = false;
  private isEnabled: boolean = true;
  private intervalId: number | null = null;
  private twinkleIntervalId: number | null = null;
  private activeVoices: OscillatorNode[] = [];
  private currentChordIndex: number = 0;
  private volume: number = 0.35;
  private gestureListenerAttached: boolean = false;

  // Atmospheric Space Chord Progressions (in Hz)
  // Peaceful, deep interstellar harmony: [C minor9, Ab maj7, Eb maj9, Bb sus4]
  private readonly chords: number[][] = [
    [65.41, 130.81, 196.00, 293.66, 349.23], // C minor / space depth
    [51.91, 103.83, 164.81, 207.65, 311.13], // Ab major / wonder
    [77.78, 155.56, 233.08, 311.13, 392.00], // Eb major9 / starlight
    [58.27, 116.54, 174.61, 261.63, 349.23], // Bb sus4 / endless voyage
  ];

  // Celestial Twinkle Bell Notes (Pentatonic Starlight Scale in Hz)
  private readonly twinkleNotes: number[] = [
    523.25, 659.25, 783.99, 1046.50, 1174.66, 1318.51, 1567.98
  ];

  constructor() {
    // Automatically attach user gesture listener for seamless autoplay once interacted
    if (typeof window !== 'undefined') {
      this.initOnFirstUserGesture();
    }
  }

  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  // Attach global first-touch listener so music starts seamlessly without browser popup blocks
  public initOnFirstUserGesture() {
    if (this.gestureListenerAttached || typeof window === 'undefined') return;
    this.gestureListenerAttached = true;

    const startOnInteraction = () => {
      if (this.isEnabled && !this.isRunning) {
        this.start();
      }
      // Remove listeners after initial trigger
      window.removeEventListener('click', startOnInteraction);
      window.removeEventListener('touchstart', startOnInteraction);
      window.removeEventListener('keydown', startOnInteraction);
    };

    window.addEventListener('click', startOnInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', startOnInteraction, { once: true, passive: true });
    window.addEventListener('keydown', startOnInteraction, { once: true, passive: true });
  }

  public start() {
    if (this.isRunning) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      this.isRunning = true;

      // Master output gain
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(this.volume, ctx.currentTime + 3.0);

      // Warm low-pass filter for cosmic space ambiance
      this.filterNode = ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(450, ctx.currentTime);
      this.filterNode.Q.setValueAtTime(1.5, ctx.currentTime);

      this.filterNode.connect(this.masterGain);
      this.masterGain.connect(ctx.destination);

      // Play initial chord and start chord cycle
      this.playChord(this.chords[this.currentChordIndex]);

      // Cycle chords every 7 seconds smoothly
      this.intervalId = window.setInterval(() => {
        if (!this.isRunning) return;
        this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
        this.playChord(this.chords[this.currentChordIndex]);
      }, 7000);

      // Celestial twinkle bells randomly every 3 to 6 seconds
      this.startTwinkleCycle();
    } catch (e) {
      console.warn('Failed to start cosmic BGM', e);
      this.isRunning = false;
    }
  }

  private playChord(frequencies: number[]) {
    const ctx = this.ctx;
    const filter = this.filterNode;
    if (!ctx || !filter || !this.isRunning) return;

    const now = ctx.currentTime;
    const voiceDuration = 8.5; // Overlap with next chord

    frequencies.forEach((freq, idx) => {
      try {
        const osc = ctx.createOscillator();
        const voiceGain = ctx.createGain();

        // Sub drone or warm space pad
        osc.type = idx === 0 ? 'sine' : idx % 2 === 0 ? 'triangle' : 'sine';
        // Subtle detuning for lush stereo-like thickness
        const detune = (idx - 2) * 5;
        osc.frequency.setValueAtTime(freq, now);
        osc.detune.setValueAtTime(detune, now);

        // Soft attack, sustained, slow release
        const peakGain = (0.16 / frequencies.length) * (idx === 0 ? 1.5 : 1.0);
        voiceGain.gain.setValueAtTime(0.0001, now);
        voiceGain.gain.exponentialRampToValueAtTime(peakGain, now + 2.0);
        voiceGain.gain.setValueAtTime(peakGain, now + 5.5);
        voiceGain.gain.exponentialRampToValueAtTime(0.0001, now + voiceDuration);

        osc.connect(voiceGain);
        voiceGain.connect(filter);

        osc.start(now);
        osc.stop(now + voiceDuration);

        this.activeVoices.push(osc);

        // Cleanup voice from tracking array when done
        osc.onended = () => {
          const index = this.activeVoices.indexOf(osc);
          if (index > -1) {
            this.activeVoices.splice(index, 1);
          }
        };
      } catch {
        // Voice creation error ignored
      }
    });

    // Gentle filter sweep
    try {
      filter.frequency.setValueAtTime(380, now);
      filter.frequency.exponentialRampToValueAtTime(620, now + 3.5);
      filter.frequency.exponentialRampToValueAtTime(380, now + 7.0);
    } catch {
      // Ignore filter ramp errors
    }
  }

  private startTwinkleCycle() {
    const triggerTwinkle = () => {
      if (!this.isRunning || !this.ctx || !this.masterGain) return;

      try {
        const ctx = this.ctx;
        const now = ctx.currentTime;
        const note = this.twinkleNotes[Math.floor(Math.random() * this.twinkleNotes.length)];

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.04, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 1.8);
      } catch {
        // Twinkle sound error suppressed
      }

      // Schedule next random twinkle in 2.5 - 5.5 seconds
      if (this.isRunning) {
        const nextDelay = 2500 + Math.random() * 3000;
        this.twinkleIntervalId = window.setTimeout(triggerTwinkle, nextDelay);
      }
    };

    this.twinkleIntervalId = window.setTimeout(triggerTwinkle, 2000);
  }

  public stop() {
    if (!this.isRunning) return;

    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.twinkleIntervalId !== null) {
      clearTimeout(this.twinkleIntervalId);
      this.twinkleIntervalId = null;
    }

    if (this.masterGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
        setTimeout(() => {
          this.activeVoices.forEach((v) => {
            try {
              v.stop();
            } catch {
              // Ignore stopped voices
            }
          });
          this.activeVoices = [];
        }, 1300);
      } catch {
        // Stop error suppressed
      }
    }

    this.isRunning = false;
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.stop();
      this.isEnabled = false;
      return false;
    } else {
      this.isEnabled = true;
      this.start();
      return true;
    }
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled && this.isRunning) {
      this.stop();
    } else if (enabled && !this.isRunning) {
      this.start();
    }
  }

  public isMusicPlaying(): boolean {
    return this.isRunning;
  }

  public isMusicEnabled(): boolean {
    return this.isEnabled;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }
}

export const cosmicBGM = new CosmicBGMManager();
