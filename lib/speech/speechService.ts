import { formatSpeechText, type SpeechFormatRule } from "@/lib/speech/speechFormatter";
import { selectBestVoice, waitForVoices } from "@/lib/speech/voiceSelector";

type SpeakCallbacks = {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (message: string) => void;
};

type SpeakOptions = {
  displayText: string;
  speechText?: string;
  language?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  rules?: SpeechFormatRule[];
} & SpeakCallbacks;

type SpeechServiceOptions = {
  preferredVoiceNames?: string[];
  preferredLanguage?: string;
  voiceWaitMs?: number;
};

const DEFAULT_OPTIONS: Required<SpeechServiceOptions> = {
  preferredVoiceNames: ["Daniel", "Samantha", "Ava", "Karen", "Moira", "Serena", "Victoria", "Alex"],
  preferredLanguage: "en-IN",
  voiceWaitMs: 1500,
};

export class SpeechService {
  private readonly synthesis: SpeechSynthesis;
  private readonly options: Required<SpeechServiceOptions>;
  private voice: SpeechSynthesisVoice | null = null;
  private voiceLoadPromise: Promise<SpeechSynthesisVoice | null> | null = null;
  private activeToken = 0;

  constructor(synthesis: SpeechSynthesis, options: SpeechServiceOptions = {}) {
    this.synthesis = synthesis;
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
  }

  stop() {
    this.activeToken += 1;
    this.synthesis.cancel();
  }

  destroy() {
    this.stop();
    this.voice = null;
    this.voiceLoadPromise = null;
  }

  async speak({
    displayText,
    speechText,
    language,
    rate = 0.93,
    pitch = 0.93,
    volume = 1,
    rules = [],
    onStart,
    onEnd,
    onError,
  }: SpeakOptions) {
    const token = ++this.activeToken;
    this.synthesis.cancel();

    const text = formatSpeechText(speechText ?? displayText, rules);
    if (!text) {
      onError?.("No speech text available.");
      return;
    }

    const voice = await this.getVoice();
    if (token !== this.activeToken) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voice?.lang || language || this.options.preferredLanguage;
    utterance.voice = voice ?? null;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => {
      if (token !== this.activeToken) return;
      onStart?.();
    };

    utterance.onend = () => {
      if (token !== this.activeToken) return;
      onEnd?.();
    };

    utterance.onerror = () => {
      if (token !== this.activeToken) return;
      onError?.("Speech playback failed.");
    };

    this.synthesis.speak(utterance);
  }

  private async getVoice() {
    if (this.voice) return this.voice;

    if (!this.voiceLoadPromise) {
      this.voiceLoadPromise = waitForVoices(this.synthesis, this.options.voiceWaitMs)
        .then((voices) =>
          selectBestVoice(voices, {
            preferredNames: this.options.preferredVoiceNames,
            preferredLocale: this.options.preferredLanguage,
          })
        )
        .then((selectedVoice) => {
          this.voice = selectedVoice ?? null;
          return selectedVoice ?? null;
        })
        .finally(() => {
          this.voiceLoadPromise = null;
        });
    }

    return this.voiceLoadPromise;
  }
}
