"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CircleStop, Mic, MicOff, Send, Volume2, VolumeX } from "lucide-react";
import { SpeechService } from "@/lib/speech/speechService";

type NavigationTarget =
  | { kind: "hash"; value: string }
  | { kind: "route"; value: string }
  | { kind: "external"; value: string };

type BrowserSpeechRecognition = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
};

type RecognitionConstructor = new () => BrowserSpeechRecognition;

type SpeechRecognitionResultEvent = Event & {
  results: Array<{
    isFinal: boolean;
    0: { transcript: string };
  }>;
};

type SpeechRecognitionErrorEvent = Event & {
  error: string;
};

type IntentResult = {
  response: string;
  spokenResponse: string;
  followUps: string[];
  target?: NavigationTarget;
};

type IntentDefinition = {
  id: string;
  baseScore: number;
  phrases: string[];
  keywords: string[];
  keywordGroups: string[][];
  response: (tokens: Set<string>) => string;
  spokenResponse: (tokens: Set<string>) => string;
  followUps: (tokens: Set<string>) => string[];
  target?: NavigationTarget | ((tokens: Set<string>) => NavigationTarget | undefined);
};

const DEFAULT_FOLLOW_UPS = [
  "Show me your strongest work",
  "What is your architecture experience?",
  "Have you built AI products?",
  "Have you led engineering teams?",
];

const promptSuggestions = DEFAULT_FOLLOW_UPS;

const expertiseSuggestions = [
  "Show me the case studies",
  "What is your React experience?",
  "Have you built design systems?",
  "Tell me more about your leadership",
];

const aiSuggestions = [
  "Show me the multi-agent system",
  "What was your role?",
  "How do you approach AI interfaces?",
  "Show me Product Studio",
];

const leadershipSuggestions = [
  "What teams have you led?",
  "Show me your architecture work",
  "What roles are you exploring?",
  "Have you mentored engineers?",
];

function normalizeText(text: string) {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/artificial intelligence/g, "ai")
    .replace(/\bnext[\s.-]*js\b/g, "nextjs")
    .replace(/\breact[\s.-]*js\b/g, "reactjs")
    .replace(/\bfront[\s-]*end\b/g, "frontend")
    .replace(/\bcv\b/g, "resume")
    .replace(/\br[ée]sum[ée]\b/g, "resume")
    .replace(/\bmulti[\s-]*agent\b/g, "multiagent")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenSet(text: string) {
  return new Set(normalizeText(text).split(" ").filter(Boolean));
}

function hasAll(tokens: Set<string>, required: string[]) {
  return required.every((token) => tokens.has(token));
}

function scoreIntent(questionText: string, tokens: Set<string>, intent: IntentDefinition) {
  let score = 0;
  let matched = false;

  for (const phrase of intent.phrases) {
    if (questionText.includes(normalizeText(phrase))) {
      score += 7;
      matched = true;
    }
  }

  for (const keyword of intent.keywords) {
    if (tokens.has(keyword)) {
      score += 1.2;
      matched = true;
    }
  }

  for (const group of intent.keywordGroups) {
    if (hasAll(tokens, group)) {
      score += 2.5;
      matched = true;
    }
  }

  return matched ? score + intent.baseScore : 0;
}

function getRecognitionConstructor(): RecognitionConstructor | null {
  if (typeof window === "undefined") return null;

  const win = window as Window & {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  };

  return win.SpeechRecognition ?? win.webkitSpeechRecognition ?? null;
}

function selectProjectTarget(tokens: Set<string>): NavigationTarget | undefined {
  const hasProductStudio = ["productstudio", "brief", "blueprint", "audit", "export", "generator"].some(
    (signal) => tokens.has(signal)
  );
  const hasMultiAgent = ["multiagent", "planner", "research", "critic", "ollama", "agent", "llm", "citations"].some(
    (signal) => tokens.has(signal)
  );

  if (hasProductStudio && !hasMultiAgent) {
    return { kind: "hash", value: "#project-product-studio" };
  }

  if (hasMultiAgent) {
    return { kind: "hash", value: "#project-multi-agent-ai-system" };
  }

  return undefined;
}

function resolveIntent(rawQuestion: string): IntentResult {
  const questionText = normalizeText(rawQuestion);
  const tokens = tokenSet(rawQuestion);
  const projectTarget = selectProjectTarget(tokens) ?? { kind: "hash", value: "#work" };

  const intents: IntentDefinition[] = [
    {
      id: "latest-work",
      baseScore: 10,
      phrases: [
        "what is your latest work",
        "show me your latest work",
        "show me the latest work",
        "what is your newest work",
        "show me your newest work",
        "tell me about blue lotus",
        "show me blue lotus",
        "blue lotus",
        "latest project",
        "recent work",
      ],
      keywords: ["latest", "newest", "recent", "blue", "lotus", "upcoming", "work", "project"],
      keywordGroups: [["blue", "lotus"], ["latest", "work"], ["newest", "work"], ["recent", "work"]],
      response: () => "I’ve opened Blue Lotus Experience below. It’s the latest work I’m sharing right now.",
      spokenResponse: () =>
        "I’ve opened Blue Lotus Experience below. It’s the latest work I’m sharing right now.",
      followUps: () => [
        "Visit site",
        "Show me the screenshots",
        "What was your role?",
        "Show me Product Studio",
      ],
      target: { kind: "hash", value: "#upcoming-project" },
    },
    {
      id: "project-specific",
      baseScore: 9,
      phrases: [
        "show me product studio",
        "tell me about product studio",
        "show me the multi agent system",
        "show me the multi-agent system",
        "tell me about the multi agent system",
        "tell me about the multi-agent system",
        "take me to product studio",
        "take me to the multi agent system",
        "take me to the multi-agent system",
      ],
      keywords: ["productstudio", "multiagent", "studio", "project", "projects", "system"],
      keywordGroups: [["product", "studio"], ["multiagent", "system"], ["show", "project"]],
      response: () => {
        if (projectTarget.value === "#project-product-studio") {
          return "I’ve opened Product Studio below. It’s the clearest fit for brief-to-blueprint workflows and exportable output.";
        }

        if (projectTarget.value === "#project-multi-agent-ai-system") {
          return "I’ve opened the Multi-Agent AI System below. It shows the planner, researcher, critic, and export flow in one place.";
        }

        return "I’ve opened Selected Work below so you can start with the strongest case studies.";
      },
      spokenResponse: () => {
        if (projectTarget.value === "#project-product-studio") {
          return "I’ve opened Product Studio below. It’s the clearest fit for brief to blueprint workflows and exportable output.";
        }

        if (projectTarget.value === "#project-multi-agent-ai-system") {
          return "I’ve opened the Multi-Agent AI System below. It shows the planner, researcher, critic, and export flow in one place.";
        }

        return "I’ve opened Selected Work below so you can start with the strongest case studies.";
      },
      followUps: () => [
        "Show me the multi-agent system",
        "What was your role?",
        "What is your React experience?",
        "Show me Product Studio",
      ],
      target: () => projectTarget,
    },
    {
      id: "resume",
      baseScore: 10,
      phrases: [
        "can i see your resume",
        "download your cv",
        "where is your resume",
        "show me your resume",
        "can i download your profile",
      ],
      keywords: ["resume", "cv", "downloads", "profile"],
      keywordGroups: [["download", "resume"], ["show", "resume"]],
      response: () =>
        "My résumé is in the Downloads section. I’ve opened it below so you can grab the PDF directly.",
      spokenResponse: () =>
        "My résumé is in Downloads. I’ve opened it below so you can download the PDF directly.",
      followUps: () => [
        "Show me your strongest work",
        "What is your architecture experience?",
        "How can I contact you?",
        "Where are you based?",
      ],
      target: { kind: "route", value: "/downloads" },
    },
    {
      id: "contact",
      baseScore: 9,
      phrases: [
        "how can i contact you",
        "how can i hire you",
        "how do i get in touch",
        "where is your linkedin",
        "are you available",
      ],
      keywords: ["contact", "hire", "available", "linkedin", "email"],
      keywordGroups: [["get", "touch"], ["in", "touch"]],
      response: () => "Email is the quickest way to reach me, and LinkedIn is public in the portfolio footer.",
      spokenResponse: () => "Email is the quickest way to reach me, and my LinkedIn is listed in the footer.",
      followUps: () => [
        "Show me your strongest work",
        "What is your architecture experience?",
        "Where are you based?",
        "Download your CV",
      ],
    },
    {
      id: "location",
      baseScore: 8,
      phrases: [
        "where are you based",
        "where do you live",
        "are you in bangalore",
        "which timezone are you in",
        "are you based in india",
      ],
      keywords: ["bangalore", "india", "location", "timezone", "based"],
      keywordGroups: [["where", "based"], ["based", "india"]],
      response: () => "I’m based in Bangalore, India.",
      spokenResponse: () => "I’m based in Bangalore, India.",
      followUps: () => [
        "How can I contact you?",
        "What is your architecture experience?",
        "Show me your strongest work",
        "Tell me about your career",
      ],
    },
    {
      id: "featured-work",
      baseScore: 7,
      phrases: [
        "show me your work",
        "what have you built",
        "show me your projects",
        "what are your strongest projects",
        "take me to your case studies",
      ],
      keywords: ["work", "projects", "case", "studies", "built"],
      keywordGroups: [["show", "work"], ["case", "studies"]],
      response: () =>
        "I’ve opened the Selected Work section. The strongest case studies are the Multi-Agent AI System and Product Studio.",
      spokenResponse: () =>
        "I’ve opened Selected Work. The Multi-Agent AI System and Product Studio are the best places to start.",
      followUps: () => [
        "Show me the multi-agent system",
        "Show me Product Studio",
        "What is your React experience?",
        "What is your architecture experience?",
      ],
      target: { kind: "hash", value: "#work" },
    },
    {
      id: "ai",
      baseScore: 7,
      phrases: [
        "have you built ai products",
        "show me your ai work",
        "what have you built with agents",
        "tell me about the multi agent project",
        "have you worked with conversational interfaces",
        "show me product studio",
        "show me the multi agent system",
        "show me the multi-agent system",
      ],
      keywords: [
        "ai",
        "agent",
        "agents",
        "conversational",
        "interface",
        "llm",
        "ollama",
        "productstudio",
        "multiagent",
      ],
      keywordGroups: [["multiagent", "system"], ["conversational", "interfaces"], ["product", "studio"]],
      response: () => {
        if (projectTarget.value === "#project-product-studio") {
          return "I’ve opened Product Studio below. It’s the cleanest fit for brief-to-blueprint workflows, audits, and exported frontend output.";
        }

        if (projectTarget.value === "#project-multi-agent-ai-system") {
          return "I’ve opened the Multi-Agent AI System below. It shows the planner, researcher, critic, and export flow in one inspectable path.";
        }

        return "I’ve opened the Selected Work section below. The Multi-Agent AI System and Product Studio are the strongest fits.";
      },
      spokenResponse: () => {
        if (projectTarget.value === "#project-product-studio") {
          return "I’ve opened Product Studio below. It’s the clearest example of brief to blueprint workflows and exported frontend output.";
        }

        if (projectTarget.value === "#project-multi-agent-ai-system") {
          return "I’ve opened the Multi-Agent AI System below. It shows the planner, researcher, critic, and export flow in one inspectable path.";
        }

        return "I’ve opened Selected Work. The Multi-Agent AI System and Product Studio are the strongest fits.";
      },
      followUps: () =>
        projectTarget.value === "#project-product-studio"
          ? aiSuggestions
          : ["Show me the multi-agent system", "What was your role?", "How do you approach AI interfaces?", "Show me Product Studio"],
      target: () => projectTarget,
    },
    {
      id: "architecture",
      baseScore: 6,
      phrases: [
        "tell me about your architecture experience",
        "what kind of systems do you design",
        "have you worked on scalable frontend systems",
        "what is your frontend architecture experience",
        "have you built design systems",
      ],
      keywords: ["architecture", "frontend", "system", "systems", "design", "rendering"],
      keywordGroups: [["frontend", "architecture"], ["design", "systems"]],
      response: () =>
        "I work on frontend architecture, rendering choices, design systems, and product shells that stay easy to change after launch.",
      spokenResponse: () =>
        "I work on frontend architecture, design systems, and rendering choices that stay easy to change after launch.",
      followUps: () => expertiseSuggestions,
      target: { kind: "route", value: "/expertise" },
    },
    {
      id: "react-next",
      baseScore: 6,
      phrases: [
        "what is your react experience",
        "have you worked with nextjs",
        "what is your frontend stack",
        "which react systems have you built",
        "what technologies do you use",
      ],
      keywords: ["react", "nextjs", "frontend", "stack", "typescript", "tailwind"],
      keywordGroups: [["nextjs", "react"], ["react", "experience"]],
      response: () =>
        "My work uses React, Next.js, TypeScript, and Tailwind, with rendering strategy chosen per route instead of by habit.",
      spokenResponse: () =>
        "My work uses React, Next.js, TypeScript, and Tailwind, with rendering strategy chosen per route.",
      followUps: () => expertiseSuggestions,
      target: { kind: "route", value: "/expertise" },
    },
    {
      id: "leadership",
      baseScore: 6,
      phrases: [
        "have you led teams",
        "what is your leadership experience",
        "have you mentored engineers",
        "have you managed frontend teams",
        "do you have technical leadership experience",
      ],
      keywords: ["lead", "leadership", "mentor", "mentored", "team", "teams"],
      keywordGroups: [["technical", "leadership"], ["frontend", "teams"]],
      response: () =>
        "I’ve led frontend architecture, mentorship, delivery planning, and quality standards that help teams keep shipping.",
      spokenResponse: () =>
        "I’ve led frontend architecture, mentorship, and delivery standards that help teams keep shipping.",
      followUps: () => leadershipSuggestions,
      target: { kind: "route", value: "/expertise" },
    },
    {
      id: "experience",
      baseScore: 5,
      phrases: [
        "how much experience do you have",
        "tell me about your career",
        "what is your background",
        "how long have you been a frontend engineer",
        "what roles are you looking for",
      ],
      keywords: ["experience", "career", "background", "roles", "frontend"],
      keywordGroups: [["12", "years"], ["role", "looking"]],
      response: () =>
        "I’ve been building frontend systems for 12+ years, and I’m focused on senior frontend architect and staff-level frontend work.",
      spokenResponse: () =>
        "I’ve been building frontend systems for over twelve years, and I’m focused on senior frontend architect and staff-level work.",
      followUps: () => expertiseSuggestions,
      target: { kind: "route", value: "/expertise" },
    },
    {
      id: "about",
      baseScore: 4,
      phrases: ["who is pratik", "tell me about yourself", "introduce yourself", "what do you do", "who are you"],
      keywords: ["pratik", "front", "architect", "about", "introduce"],
      keywordGroups: [["who", "are", "you"], ["what", "do", "you", "do"]],
      response: () =>
        "I’m Pratik Singh, a Frontend Architect with 12+ years building frontend systems that ship quickly and still make sense later.",
      spokenResponse: () =>
        "I’m Pratik Singh, a Frontend Architect, with over twelve years building frontend systems that ship quickly and still make sense later.",
      followUps: () => promptSuggestions,
    },
  ];

  const ranked = intents
    .map((intent) => ({
      intent,
      score: scoreIntent(questionText, tokens, intent),
    }))
    .sort((left, right) => right.score - left.score);

  const winner = ranked[0];

  if (!winner || winner.score < 5.25) {
    return {
      response:
        "This portfolio currently understands questions about projects, architecture, technologies, experience, leadership, resume and contact.",
      spokenResponse:
        "This portfolio understands questions about projects, architecture, technologies, experience, leadership, resume, and contact.",
      followUps: promptSuggestions,
    };
  }

  const target =
    typeof winner.intent.target === "function"
      ? winner.intent.target(tokens)
      : winner.intent.target;

  return {
    response: winner.intent.response(tokens),
    spokenResponse: winner.intent.spokenResponse(tokens),
    followUps: winner.intent.followUps(tokens),
    target,
  };
}

export function HeroVoicePortfolio() {
  const router = useRouter();
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const speechServiceRef = useRef<SpeechService | null>(null);
  const recognitionSessionRef = useRef(0);
  const stopReasonRef = useRef<"manual" | "finished" | null>(null);
  const recognitionStartRef = useRef(0);
  const recognitionSawTranscriptRef = useRef(false);
  const pendingNavigationRef = useRef<NavigationTarget | null>(null);
  const navigationTimerRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [voiceInputSupported, setVoiceInputSupported] = useState(false);
  const [voiceOutputSupported, setVoiceOutputSupported] = useState(false);
  const [autoVoice, setAutoVoice] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [questionDraft, setQuestionDraft] = useState("");
  const [heardTranscript, setHeardTranscript] = useState("");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [spokenStatus, setSpokenStatus] = useState("");
  const [error, setError] = useState("");
  const [followUps, setFollowUps] = useState(DEFAULT_FOLLOW_UPS);

  useEffect(() => {
    setMounted(true);
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const recognitionCtor = getRecognitionConstructor();
    setVoiceInputSupported(Boolean(recognitionCtor && window.isSecureContext));
    setVoiceOutputSupported("speechSynthesis" in window);

    if ("speechSynthesis" in window) {
      speechServiceRef.current = new SpeechService(window.speechSynthesis, {
        preferredLanguage: "en-IN",
      });
    }

    return () => {
      clearTimer();
      abortRecognition();
      speechServiceRef.current?.destroy();
      speechServiceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      if (isListening) {
        stopReasonRef.current = "manual";
        setIsListening(false);
        setHeardTranscript("");

        const recognition = recognitionRef.current;
        recognitionRef.current = null;

        if (recognition) {
          recognition.onresult = null;
          recognition.onerror = null;
          recognition.onend = null;

          try {
            recognition.abort();
          } catch {
            // Some browsers throw if recognition is already stopped.
          }
        }

        setSpokenStatus(autoVoice ? "Ready to listen again." : "Voice replies are muted.");
        return;
      }

      if (isSpeaking) {
        clearTimer();
        pendingNavigationRef.current = null;
        speechServiceRef.current?.stop();
        setIsSpeaking(false);
        setSpokenStatus(autoVoice ? "" : "Voice replies are muted.");
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mounted, isListening, isSpeaking, autoVoice]);

  function clearTimer() {
    if (navigationTimerRef.current !== null) {
      window.clearTimeout(navigationTimerRef.current);
      navigationTimerRef.current = null;
    }
  }

  function abortRecognition() {
    const recognition = recognitionRef.current;
    recognitionRef.current = null;

    if (!recognition) return;

    recognition.onresult = null;
    recognition.onerror = null;
    recognition.onend = null;

    try {
      recognition.abort();
    } catch {
      // Some browsers throw if recognition is already stopped.
    }
  }

  function cancelSpeechOutput() {
    pendingNavigationRef.current = null;
    speechServiceRef.current?.stop();
    setIsSpeaking(false);
  }

  function performNavigation(target: NavigationTarget) {
    if (target.kind === "hash") {
      const element = document.querySelector(target.value);

      if (element instanceof HTMLElement) {
        element.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
        window.history.pushState(null, "", target.value);
      }

      return;
    }

    if (target.kind === "route") {
      router.push(target.value);
      return;
    }

    window.location.href = target.value;
  }

  function scheduleNavigation(target: NavigationTarget, delayOverride?: number) {
    clearTimer();

    const delay =
      delayOverride ??
      (target.kind === "hash" ? (prefersReducedMotion ? 120 : 650) : prefersReducedMotion ? 120 : 900);

    navigationTimerRef.current = window.setTimeout(() => {
      performNavigation(target);
    }, delay);
  }

  function speakResponse(displayText: string, speechText: string, target?: NavigationTarget) {
    const speechService = speechServiceRef.current;

    if (!voiceOutputSupported || !autoVoice || !speechService) {
      if (target) {
        scheduleNavigation(target);
      }

      return;
    }

    clearTimer();
    pendingNavigationRef.current = target ?? null;
    const speechPromise = speechService.speak({
      displayText,
      speechText,
      language: "en-IN",
      rate: 0.93,
      pitch: 0.93,
      volume: 1,
      onStart: () => {
        setIsSpeaking(true);
        setSpokenStatus("Speaking the response.");
      },
      onEnd: () => {
        setIsSpeaking(false);
        setSpokenStatus("Reply complete.");

        const pendingTarget = pendingNavigationRef.current;
        pendingNavigationRef.current = null;

        if (pendingTarget && pendingTarget.kind !== "hash") {
          clearTimer();
          performNavigation(pendingTarget);
        }
      },
      onError: () => {
        setIsSpeaking(false);
        setSpokenStatus("");
        pendingNavigationRef.current = null;
      },
    });

    void speechPromise.catch(() => {
      setIsSpeaking(false);
      setSpokenStatus("");
      pendingNavigationRef.current = null;
    });

    if (target && target.kind !== "hash") {
      navigationTimerRef.current = window.setTimeout(() => {
        if (pendingNavigationRef.current) {
          const pendingTarget = pendingNavigationRef.current;
          pendingNavigationRef.current = null;
          performNavigation(pendingTarget);
        }
      }, 9000);
    }

    if (target && target.kind === "hash") {
      scheduleNavigation(target);
    }
  }

  function finalizeQuestion(rawQuestion: string, source: "type" | "voice") {
    const cleanQuestion = rawQuestion.trim();

    if (!cleanQuestion) {
      setError("Type a question or use the microphone.");
      inputRef.current?.focus();
      return;
    }

    clearTimer();
    cancelSpeechOutput();
    setError("");

    const resolved = resolveIntent(cleanQuestion);
    setQuestion(cleanQuestion);
    setResponse(resolved.response);
    setFollowUps(resolved.followUps);
    setHeardTranscript("");
    setQuestionDraft("");

    if (source === "type") {
      inputRef.current?.focus();
    }

    if (resolved.target) {
      if (voiceOutputSupported && autoVoice) {
        speakResponse(resolved.response, resolved.spokenResponse, resolved.target);
        return;
      }

      scheduleNavigation(resolved.target);
      setSpokenStatus(voiceOutputSupported ? "Voice replies are muted." : "Text response ready.");
      return;
    }

    if (voiceOutputSupported && autoVoice) {
      speakResponse(resolved.response, resolved.spokenResponse);
      return;
    }

    setSpokenStatus(voiceOutputSupported ? "Voice replies are muted." : "Text response ready.");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!questionDraft.trim()) {
      setError("Type a question or use the microphone.");
      inputRef.current?.focus();
      return;
    }

    finalizeQuestion(questionDraft, "type");
  }

  function handleSuggestion(suggestion: string) {
    setQuestionDraft(suggestion);
    finalizeQuestion(suggestion, "type");
  }

  function stopSpeaking() {
    if (!voiceOutputSupported) return;

    clearTimer();
    pendingNavigationRef.current = null;
    speechServiceRef.current?.stop();
    setIsSpeaking(false);
    setSpokenStatus(autoVoice ? "" : "Voice replies are muted.");
  }

  function stopListening() {
    stopReasonRef.current = "manual";
    setIsListening(false);
    setHeardTranscript("");
    abortRecognition();
    setSpokenStatus(autoVoice ? "Ready to listen again." : "Voice replies are muted.");
  }

  function startListening() {
    if (!voiceInputSupported) {
      setError("Voice input isn’t available in this browser. You can keep typing.");
      return;
    }

    const RecognitionCtor = getRecognitionConstructor();

    if (!RecognitionCtor) {
      setError("Voice input isn’t available in this browser. You can keep typing.");
      return;
    }

    clearTimer();
    cancelSpeechOutput();
    abortRecognition();
    setError("");
    setHeardTranscript("");
    setSpokenStatus("Listening...");
    recognitionStartRef.current = Date.now();
    recognitionSawTranscriptRef.current = false;

    const recognition = new RecognitionCtor();
    const sessionId = recognitionSessionRef.current + 1;
    recognitionSessionRef.current = sessionId;
    stopReasonRef.current = null;

    recognition.lang = "en-IN";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      if (recognitionSessionRef.current !== sessionId) return;

      let finalTranscript = "";
      let interimTranscript = "";

      for (const result of event.results) {
        const transcript = result[0]?.transcript.trim() ?? "";
        if (!transcript) continue;

        if (result.isFinal) {
          finalTranscript = transcript;
        } else {
          interimTranscript = transcript;
        }
      }

      if (interimTranscript) {
        recognitionSawTranscriptRef.current = true;
        setHeardTranscript(interimTranscript);
      }

      if (finalTranscript) {
        recognitionSawTranscriptRef.current = true;
        stopReasonRef.current = "finished";
        setIsListening(false);
        abortRecognition();
        finalizeQuestion(finalTranscript, "voice");
      }
    };

    recognition.onerror = (event) => {
      if (recognitionSessionRef.current !== sessionId) return;

      setIsListening(false);
      abortRecognition();
      const elapsed = Date.now() - recognitionStartRef.current;

      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setError("Microphone access was blocked. You can still type your question.");
        setSpokenStatus("");
        return;
      }

      if (event.error === "no-speech") {
        if (elapsed < 1200) {
          setSpokenStatus("Listening...");
          return;
        }

        setError("I didn’t catch any speech. Try again when you’re ready.");
        setSpokenStatus("");
        return;
      }

      if (elapsed < 1200) {
        setSpokenStatus("Listening...");
        return;
      }

      setError("I couldn’t recognise that voice input. Try again or type it instead.");
      setSpokenStatus("");
    };

    recognition.onend = () => {
      if (recognitionSessionRef.current !== sessionId) return;

      recognitionRef.current = null;
      setIsListening(false);
      const elapsed = Date.now() - recognitionStartRef.current;

      if (stopReasonRef.current === "manual" || stopReasonRef.current === "finished") {
        stopReasonRef.current = null;
        return;
      }

      if (!recognitionSawTranscriptRef.current && elapsed >= 1200) {
        setError("I didn’t catch any speech. Try again when you’re ready.");
        setSpokenStatus("");
      }

      stopReasonRef.current = null;
    };

    recognitionRef.current = recognition;
    setIsListening(true);

    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setIsListening(false);
      setError("Voice input couldn’t start here. You can keep typing.");
      setSpokenStatus("");
    }
  }

  function toggleVoicePlayback() {
    if (!voiceOutputSupported) return;

    if (isSpeaking) {
      stopSpeaking();
      return;
    }

    const next = !autoVoice;
    setAutoVoice(next);
    setSpokenStatus(next ? "Voice replies are on." : "Voice replies are muted.");

    if (!next) {
      clearTimer();
      pendingNavigationRef.current = null;
    }
  }

  const currentMode = isListening
    ? "Listening"
    : isSpeaking
      ? "Speaking"
      : "Text only";

  const helperText = !mounted
    ? "Voice controls load in the browser."
    : !voiceInputSupported
      ? "Voice input isn’t available here, so typing stays fully functional."
      : "Click on the mic, speak one question at a time, or type it below.";

  const currentSuggestions = followUps.length ? followUps : DEFAULT_FOLLOW_UPS;
  const liveRegion = error || spokenStatus || response || "Ask about my work, architecture, experience or contact.";

  return (
    <div className="space-y-5 bg-[rgb(10_14_20_/_0.18)] p-4 shadow-[0_20px_56px_rgba(0,0,0,0.24)] backdrop-blur-xl md:p-5">
      <div className="flex flex-col gap-3 border-b border-line pb-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl">
          <p className="font-mono text-micro uppercase tracking-caps text-signal">
            Ask this portfolio
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            {helperText}
          </p>
        </div>
        {voiceOutputSupported && !isListening && !isSpeaking ? (
          <button
            type="button"
            onClick={toggleVoicePlayback}
            className="inline-flex items-center gap-2 rounded border border-line bg-paper px-3 py-2 font-mono text-micro uppercase tracking-caps text-ink-soft transition-colors hover:border-line-strong hover:text-ink focus-ring"
            aria-label={autoVoice ? "Mute voice replies" : "Enable voice replies"}
          >
            {autoVoice ? (
              <Volume2 size={14} aria-hidden="true" />
            ) : (
              <VolumeX size={14} aria-hidden="true" />
            )}
            {autoVoice ? "Mute voice replies" : "Enable voice replies"}
          </button>
        ) : (
          <div className="flex items-center gap-2 rounded border border-line bg-paper px-3 py-2 font-mono text-micro uppercase tracking-caps text-ink-soft">
            <span
              className={`h-2 w-2 rounded-full ${
                isListening ? "bg-signal" : isSpeaking ? "bg-amber" : "bg-signal/70"
              }`}
              aria-hidden="true"
            />
            <span>{currentMode}</span>
          </div>
        )}
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveRegion}
      </div>

      {error && (
        <p
          className="rounded border border-danger/35 bg-danger/10 px-3 py-2 text-sm leading-relaxed text-ink"
          role="alert"
        >
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-stretch">
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            disabled={!voiceInputSupported && !isListening}
            aria-label={isListening ? "Stop listening" : "Start voice input"}
            className={`inline-flex h-12 w-12 items-center justify-center border transition-colors focus-ring disabled:cursor-not-allowed disabled:opacity-45 ${
              isListening
                ? "border-signal bg-signal text-paper"
                : voiceInputSupported
                  ? "border-line-strong bg-paper text-signal hover:border-ink"
                  : "border-line bg-paper text-ink-soft"
            }`}
          >
            {isListening ? (
              <CircleStop size={16} aria-hidden="true" />
            ) : voiceInputSupported ? (
              <Mic size={16} aria-hidden="true" />
            ) : (
              <MicOff size={16} aria-hidden="true" />
            )}
          </button>

          <div className="min-w-0">
            <label htmlFor="hero-question" className="sr-only">
              Ask about Pratik&apos;s portfolio
            </label>
            <input
              ref={inputRef}
              id="hero-question"
              name="hero-question"
              type="text"
              value={questionDraft}
              onChange={(event) => setQuestionDraft(event.target.value)}
              placeholder="Ask about my work, architecture, React or experience"
              autoComplete="off"
              spellCheck={false}
              aria-invalid={Boolean(error)}
              aria-describedby="hero-voice-help hero-voice-answer"
              className="h-12 w-full border border-line bg-paper px-4 font-sans text-body leading-none text-ink placeholder:text-ink-soft/65 focus-ring"
            />
          </div>

          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 border border-signal bg-signal px-4 font-mono text-caption uppercase tracking-caps text-paper transition-colors hover:bg-signal-dark focus-ring"
          >
            Ask
            <Send size={14} aria-hidden="true" />
          </button>
        </div>

        <div id="hero-voice-help" className="space-y-2">
          {isListening && heardTranscript ? (
            <p className="font-mono text-micro uppercase tracking-caps text-signal">
              Heard:{" "}
              <span className="normal-case tracking-normal text-ink">{heardTranscript}</span>
            </p>
          ) : null}

          {!isListening && questionDraft ? (
            <p className="font-mono text-micro uppercase tracking-caps text-ink-soft/65">
              Ready to ask:{" "}
              <span className="normal-case tracking-normal text-ink-soft">{questionDraft}</span>
            </p>
          ) : null}

          {voiceOutputSupported ? (
            <div className="flex flex-wrap items-center gap-2">
              {isSpeaking ? (
                <button
                  type="button"
                  onClick={stopSpeaking}
                  className="inline-flex items-center gap-2 rounded border border-line px-3 py-2 font-mono text-micro uppercase tracking-caps text-ink-soft transition-colors hover:border-line-strong hover:text-ink focus-ring"
                >
                  Stop speaking
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </form>

      <div className="space-y-4 border-t border-line pt-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-micro uppercase tracking-caps text-ink-soft">
            Suggested questions
          </p>
          {question ? (
            <p className="font-mono text-micro uppercase tracking-caps text-ink-soft/60">
              {question}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2" aria-label="Suggested portfolio questions">
          {currentSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSuggestion(suggestion)}
              className="inline-flex items-center gap-1.5 rounded border border-line px-3 py-2 font-mono text-micro uppercase tracking-caps text-ink-soft transition-colors hover:border-line-strong hover:text-ink focus-ring"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div id="hero-voice-answer" className="space-y-3">
          {question ? (
            <p className="font-mono text-micro uppercase tracking-caps text-signal">
              Question
            </p>
          ) : null}

          {question ? (
            <p className="max-w-prose text-body leading-body text-ink">{question}</p>
          ) : null}

          {response ? (
            <div className="space-y-3">
              <p className="font-mono text-micro uppercase tracking-caps text-ink-soft/60">
                Response
              </p>
              <p className="max-w-prose text-body leading-body text-ink-soft">{response}</p>
            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}
