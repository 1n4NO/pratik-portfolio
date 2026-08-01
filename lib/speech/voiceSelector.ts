const preferredVoiceNames = [
  "Daniel",
  "Samantha",
  "Ava",
  "Karen",
  "Moira",
  "Serena",
  "Victoria",
  "Alex",
];

const preferredLocales = ["en-IN", "en-US", "en-GB", "en-AU", "en-CA", "en-NZ"];

type VoiceSelectionOptions = {
  preferredNames?: string[];
  preferredLocale?: string;
};

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function isEnglishLocale(locale: string) {
  return normalize(locale).startsWith("en");
}

function scoreVoice(voice: SpeechSynthesisVoice, options: Required<VoiceSelectionOptions>) {
  const voiceName = normalize(voice.name);
  const voiceLocale = normalize(voice.lang);
  let score = 0;

  const exactPreferredIndex = options.preferredNames.findIndex(
    (name) => normalize(name) === voiceName
  );

  if (exactPreferredIndex >= 0) {
    score += 1000 - exactPreferredIndex * 80;
  } else {
    const partialPreferredIndex = options.preferredNames.findIndex((name) => voiceName.includes(normalize(name)));
    if (partialPreferredIndex >= 0) {
      score += 700 - partialPreferredIndex * 50;
    }
  }

  const preferredLocaleIndex = options.preferredLocale === voice.lang ? 0 : preferredLocales.indexOf(voice.lang);
  if (preferredLocaleIndex >= 0) {
    score += 120 - preferredLocaleIndex * 12;
  }

  if (isEnglishLocale(voice.lang)) {
    score += 90;
  }

  if (voice.default) {
    score += 25;
  }

  if (voice.localService) {
    score += 20;
  }

  if (voiceName.includes("natural") || voiceName.includes("enhanced") || voiceName.includes("neural")) {
    score += 10;
  }

  if (voiceLocale === normalize(options.preferredLocale)) {
    score += 20;
  }

  return score;
}

export function selectBestVoice(
  voices: SpeechSynthesisVoice[],
  options: VoiceSelectionOptions = {}
): SpeechSynthesisVoice | null {
  if (!voices.length) return null;

  const resolvedOptions: Required<VoiceSelectionOptions> = {
    preferredNames: options.preferredNames ?? preferredVoiceNames,
    preferredLocale: options.preferredLocale ?? "en-IN",
  };

  const englishVoices = voices.filter((voice) => isEnglishLocale(voice.lang));
  const pool = englishVoices.length ? englishVoices : voices;

  return pool
    .slice()
    .sort((left, right) => scoreVoice(right, resolvedOptions) - scoreVoice(left, resolvedOptions))[0]
    ?? null;
}

export function waitForVoices(speechSynthesis: SpeechSynthesis, timeoutMs = 1500) {
  const existing = speechSynthesis.getVoices();
  if (existing.length > 0) {
    return Promise.resolve(existing);
  }

  return new Promise<SpeechSynthesisVoice[]>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(speechSynthesis.getVoices());
    };

    const onVoicesChanged = () => {
      if (speechSynthesis.getVoices().length > 0) {
        finish();
      }
    };

    const cleanup = () => {
      speechSynthesis.removeEventListener("voiceschanged", onVoicesChanged);
      window.clearTimeout(timeoutId);
    };

    const timeoutId = window.setTimeout(finish, timeoutMs);
    speechSynthesis.addEventListener("voiceschanged", onVoicesChanged);
  });
}

