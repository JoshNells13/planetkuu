// Web Speech API helper for Astro's voice narration in Indonesian
class AstroVoiceManager {
  private enabled: boolean = true;

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (!val && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public speak(text: string) {
    if (!this.enabled) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();

      // Clean speech text
      const cleanText = text.replace(/[*_~`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95; // Friendly cadence suitable for children
      utterance.pitch = 1.15; // Cheerful astronaut voice pitch

      // Try to find an Indonesian voice
      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find((v) => v.lang.toLowerCase().startsWith('id'));
      if (idVoice) {
        utterance.voice = idVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech error suppressed gracefully
    }
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignored
      }
    }
  }
}

export const astroVoice = new AstroVoiceManager();
