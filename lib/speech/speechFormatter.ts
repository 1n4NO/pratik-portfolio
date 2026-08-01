export type SpeechFormatRule = {
  pattern: RegExp;
  replacement: string | ((match: string, ...groups: string[]) => string);
};

const baseRules: SpeechFormatRule[] = [
  {
    pattern: /\bCI\/CD\b/gi,
    replacement: "continuous integration, continuous delivery",
  },
  {
    pattern: /\bNext[\s.-]*js\b/gi,
    replacement: "Next dot J S",
  },
  {
    pattern: /\bNode[\s.-]*js\b/gi,
    replacement: "Node J S",
  },
  {
    pattern: /\bTypeScript\b/gi,
    replacement: "Type Script",
  },
  {
    pattern: /\bJavaScript\b/gi,
    replacement: "Java Script",
  },
  {
    pattern: /\bPostgreSQL\b/gi,
    replacement: "Postgres",
  },
  {
    pattern: /\bGitHub\b/gi,
    replacement: "Git Hub",
  },
  {
    pattern: /\bREST\b/gi,
    replacement: "REST API",
  },
  {
    pattern: /\bAPI\b/gi,
    replacement: "A.P.I.",
  },
  {
    pattern: /\bSDK\b/gi,
    replacement: "S.D.K.",
  },
  {
    pattern: /\bUI\b/gi,
    replacement: "U.I.",
  },
  {
    pattern: /\bUX\b/gi,
    replacement: "U.X.",
  },
  {
    pattern: /\bAWS\b/gi,
    replacement: "Amazon Web Services",
  },
  {
    pattern: /\bCSS\b/gi,
    replacement: "C.S.S.",
  },
  {
    pattern: /\bHTML\b/gi,
    replacement: "H.T.M.L.",
  },
  {
    pattern: /\bJSON\b/gi,
    replacement: "J.S.O.N.",
  },
  {
    pattern: /\bJWT\b/gi,
    replacement: "J.W.T.",
  },
  {
    pattern: /\bAI-powered\b/gi,
    replacement: "artificial intelligence powered",
  },
  {
    pattern: /\bAI\b/gi,
    replacement: "artificial intelligence",
  },
  {
    pattern: /\bfrontend\b/gi,
    replacement: "front end",
  },
];

function applyRule(text: string, rule: SpeechFormatRule) {
  return text.replace(rule.pattern, (...args) => {
    const match = args[0];
    const groups = args.slice(1, -2) as string[];

    if (typeof rule.replacement === "function") {
      return rule.replacement(match, ...groups);
    }

    return rule.replacement;
  });
}

export function formatSpeechText(text: string, extraRules: SpeechFormatRule[] = []) {
  let formatted = text.trim();

  if (!formatted) return "";

  formatted = formatted
    .replace(/\s+/g, " ")
    .replace(/\s*([,;:!?])\s*/g, "$1 ")
    .replace(/\s*[—–-]\s*/g, ", ")
    .replace(/\s*&\s*/g, " and ")
    .replace(/\s*\/\s*/g, " / ")
    .replace(/\s+\./g, ".")
    .replace(/\.\s*\./g, ".")
    .replace(/\s+/g, " ")
    .trim();

  for (const rule of [...baseRules, ...extraRules]) {
    formatted = applyRule(formatted, rule);
  }

  return formatted
    .replace(/\s+/g, " ")
    .replace(/\s+([,;:!?])/g, "$1")
    .replace(/,\s*,/g, ",")
    .replace(/\s+\./g, ".")
    .trim();
}

