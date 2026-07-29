// Downloadable brand-asset icons for /downloads. Colors are baked in as
// concrete hex values (not CSS variables) since these are standalone files
// meant to be used outside the site's own theme context.
//
// To add a new icon: add an object here with a self-contained <svg> string
// (viewBox 0 0 24 24 keeps sizing consistent with the rest) — it will
// automatically get a preview tile plus SVG/PNG download buttons.

export type DownloadableIcon = {
  id: string;
  name: string;
  svg: string;
};

export const ICON_EXPORT_COLOR = "#1B140F";
const ink = ICON_EXPORT_COLOR;

export const downloadableIcons: DownloadableIcon[] = [
  {
    id: "logo-mark",
    name: "Logo mark",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#3652E0"/><text x="16" y="22" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif" font-weight="700" font-size="15" letter-spacing="-0.5" fill="#F7F8FA">PS</text></svg>`,
  },
  {
    id: "leadership",
    name: "Leadership",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M15.2 8.8L13.2 13.2L8.8 15.2L10.8 10.8L15.2 8.8Z"/><circle cx="12" cy="12" r="1" fill="${ink}" stroke="none"/></svg>`,
  },
  {
    id: "frontend",
    name: "Frontend",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="M3.5 9H20.5"/><path d="M16.2 13.4H18.8V16"/><circle cx="7" cy="7" r="0.7" fill="${ink}" stroke="none"/><circle cx="9.4" cy="7" r="0.7" fill="${ink}" stroke="none"/></svg>`,
  },
  {
    id: "state-data",
    name: "State & data",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="6.5" cy="7" r="2.3"/><circle cx="17.5" cy="7" r="2.3"/><circle cx="12" cy="17" r="2.3"/><path d="M8.7 7H15.3"/><path d="M7.6 9L10.9 15"/><path d="M16.4 9L13.1 15"/></svg>`,
  },
  {
    id: "ai-integration",
    name: "AI integration",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.8L19.1 7.9V16.1L12 20.2L4.9 16.1V7.9L12 3.8Z"/><path d="M12 8.2V15.8"/><path d="M8.2 12H15.8"/><path d="M9.3 9.3L14.7 14.7"/><path d="M14.7 9.3L9.3 14.7"/></svg>`,
  },
  {
    id: "data-visualization",
    name: "Data visualization",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 18V13"/><path d="M10 18V9"/><path d="M15 18V11"/><path d="M20 18V6"/><path d="M5 6.5L10 9L15 7.4L20 4.8"/><circle cx="15" cy="7.4" r="1.3" fill="${ink}" stroke="none"/></svg>`,
  },
  {
    id: "quality-security",
    name: "Quality & security",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.8L18.5 6.2V11.4C18.5 15.5 15.9 18.7 12 20.2C8.1 18.7 5.5 15.5 5.5 11.4V6.2L12 3.8Z"/><path d="M9.1 12.1L11.1 14.1L15.2 9.8"/></svg>`,
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8.2 17.5H17.2A3.3 3.3 0 0 0 17 10.9A5.1 5.1 0 0 0 7.2 9.2A4.2 4.2 0 0 0 8.2 17.5Z"/><path d="M12 13V21"/><path d="M8.8 17.8L12 21L15.2 17.8"/><circle cx="12" cy="13" r="1.2" fill="${ink}" stroke="none"/></svg>`,
  },
  {
    id: "principle-marker-1",
    name: "Principle marker — node",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="${ink}"/></svg>`,
  },
  {
    id: "principle-marker-2",
    name: "Principle marker — pair",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 12H18" fill="none" stroke="${ink}" stroke-linecap="round" stroke-width="2"/><circle cx="6" cy="12" r="2" fill="${ink}"/><circle cx="18" cy="12" r="2" fill="${ink}"/></svg>`,
  },
  {
    id: "principle-marker-3",
    name: "Principle marker — triangle",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 4.5L20 18.5H4L12 4.5Z" fill="none" stroke="${ink}" stroke-linejoin="round" stroke-width="2"/><circle cx="12" cy="4.5" r="1.8" fill="${ink}"/><circle cx="20" cy="18.5" r="1.8" fill="${ink}"/><circle cx="4" cy="18.5" r="1.8" fill="${ink}"/></svg>`,
  },
  {
    id: "principle-marker-4",
    name: "Principle marker — diamond",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3.8L20.2 12L12 20.2L3.8 12L12 3.8Z" fill="none" stroke="${ink}" stroke-linejoin="round" stroke-width="2"/><circle cx="12" cy="3.8" r="1.8" fill="${ink}"/><circle cx="20.2" cy="12" r="1.8" fill="${ink}"/><circle cx="12" cy="20.2" r="1.8" fill="${ink}"/><circle cx="3.8" cy="12" r="1.8" fill="${ink}"/></svg>`,
  },
  {
    id: "principle-marker-5",
    name: "Principle marker — pentagon",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3.5L20.1 9.4L17 19H7L3.9 9.4L12 3.5Z" fill="none" stroke="${ink}" stroke-linejoin="round" stroke-width="2"/><circle cx="12" cy="3.5" r="1.55" fill="${ink}"/><circle cx="20.1" cy="9.4" r="1.55" fill="${ink}"/><circle cx="17" cy="19" r="1.55" fill="${ink}"/><circle cx="7" cy="19" r="1.55" fill="${ink}"/><circle cx="3.9" cy="9.4" r="1.55" fill="${ink}"/></svg>`,
  },
  {
    id: "principle-marker-6",
    name: "Principle marker — hexagon",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 4L18.93 8L18.93 16L12 20L5.07 16L5.07 8Z" fill="none" stroke="${ink}" stroke-linejoin="round" stroke-width="2"/><circle cx="12" cy="4" r="1.4" fill="${ink}"/><circle cx="18.93" cy="8" r="1.4" fill="${ink}"/><circle cx="18.93" cy="16" r="1.4" fill="${ink}"/><circle cx="12" cy="20" r="1.4" fill="${ink}"/><circle cx="5.07" cy="16" r="1.4" fill="${ink}"/><circle cx="5.07" cy="8" r="1.4" fill="${ink}"/></svg>`,
  },
  {
    id: "principle-marker-7",
    name: "Principle marker — heptagon",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 4L18.25 7.01L19.81 13.78L15.47 19.21L8.53 19.21L4.19 13.78L5.75 7.01Z" fill="none" stroke="${ink}" stroke-linejoin="round" stroke-width="2"/><circle cx="12" cy="4" r="1.3" fill="${ink}"/><circle cx="18.25" cy="7.01" r="1.3" fill="${ink}"/><circle cx="19.81" cy="13.78" r="1.3" fill="${ink}"/><circle cx="15.47" cy="19.21" r="1.3" fill="${ink}"/><circle cx="8.53" cy="19.21" r="1.3" fill="${ink}"/><circle cx="4.19" cy="13.78" r="1.3" fill="${ink}"/><circle cx="5.75" cy="7.01" r="1.3" fill="${ink}"/></svg>`,
  },
  {
    id: "principle-marker-8",
    name: "Principle marker — octagon",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 4L17.66 6.34L20 12L17.66 17.66L12 20L6.34 17.66L4 12L6.34 6.34Z" fill="none" stroke="${ink}" stroke-linejoin="round" stroke-width="2"/><circle cx="12" cy="4" r="1.2" fill="${ink}"/><circle cx="17.66" cy="6.34" r="1.2" fill="${ink}"/><circle cx="20" cy="12" r="1.2" fill="${ink}"/><circle cx="17.66" cy="17.66" r="1.2" fill="${ink}"/><circle cx="12" cy="20" r="1.2" fill="${ink}"/><circle cx="6.34" cy="17.66" r="1.2" fill="${ink}"/><circle cx="4" cy="12" r="1.2" fill="${ink}"/><circle cx="6.34" cy="6.34" r="1.2" fill="${ink}"/></svg>`,
  },
];

export const blueLotusExperienceIcons: DownloadableIcon[] = [
  {
    id: "blue-lotus-mark",
    name: "Blue Lotus mark",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="Blue Lotus mark"><rect width="256" height="256" rx="128" fill="${ink}"/><circle cx="128" cy="128" r="98" fill="none" stroke="#B9975B" stroke-width="3"/><path d="M128 68C113 86 97 106 97 128C97 152 112 169 128 188C144 169 159 152 159 128C159 106 143 86 128 68Z" fill="#556B2F" fill-opacity="0.16" stroke="#F7F6F2" stroke-opacity="0.14"/><path d="M128 80C115 95 104 111 104 128C104 146 115 162 128 176C141 162 152 146 152 128C152 111 141 95 128 80Z" fill="#F7F6F2" fill-opacity="0.08"/><path d="M128 88C120 99 114 111 114 128C114 141 119 151 128 164C137 151 142 141 142 128C142 111 136 99 128 88Z" fill="#B9975B" fill-opacity="0.3"/><path d="M95 140C112 136 115 148 128 164C141 148 144 136 161 140" stroke="#F7F6F2" stroke-opacity="0.15" stroke-width="2" stroke-linecap="round"/><path d="M80 108C96 111 102 123 106 137" stroke="#F7F6F2" stroke-opacity="0.12" stroke-width="2" stroke-linecap="round"/><path d="M176 108C160 111 154 123 150 137" stroke="#F7F6F2" stroke-opacity="0.12" stroke-width="2" stroke-linecap="round"/></svg>`,
  },
  {
    id: "blue-lotus-sigil",
    name: "Blue Lotus sigil",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="Blue Lotus sigil" fill="none" stroke="${ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.8"/><path d="M12 4.8c2.7 2.8 4.7 5.6 4.7 7.2 0 2.9-2 5.3-4.7 7.2-2.7-1.9-4.7-4.3-4.7-7.2 0-1.6 2-4.4 4.7-7.2Z" fill="#556B2F" fill-opacity="0.18"/><path d="M12 7.2c1.5 1.9 2.6 3.7 2.6 4.9 0 1.9-1.1 3.5-2.6 4.9-1.5-1.4-2.6-3-2.6-4.9 0-1.2 1.1-3 2.6-4.9Z" fill="#F7F6F2" fill-opacity="0.08"/><path d="M12 9.1c.8 1 1.4 1.9 1.4 2.8 0 1.1-.5 2.1-1.4 3-.9-.9-1.4-1.9-1.4-3 0-.9.6-1.8 1.4-2.8Z" fill="#B9975B" fill-opacity="0.36"/></svg>`,
  },
  {
    id: "forest-walk",
    name: "Forest walk",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Forest walk" fill="none" stroke="${ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 94c8-17 18-29 27-39 8-8 16-17 19-31"/><path d="M60 24c4 11 7 20 13 29 8 13 20 24 29 41"/><path d="M30 56c7 0 12-5 18-9"/><path d="M53 46c7 1 12 5 17 10"/><path d="M71 35c6 3 11 8 16 15"/><path d="M24 94h72"/><circle cx="43" cy="39" r="6"/><circle cx="76" cy="31" r="7"/></svg>`,
  },
  {
    id: "tea-ceremony",
    name: "Tea ceremony",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Tea ceremony" fill="none" stroke="${ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M39 50h37v18c0 11-8 20-19 20h-2c-10 0-18-8-18-18V50Z"/><path d="M76 56h7c5 0 9 4 9 9s-4 9-9 9h-5"/><path d="M48 42c0-5 3-9 3-14"/><path d="M58 39c0-4 2-7 3-11"/><path d="M68 42c0-5 3-9 3-14"/><path d="M44 86h32"/></svg>`,
  },
  {
    id: "campfire",
    name: "Campfire",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Campfire" fill="none" stroke="${ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M59 23c3 9-3 14-7 20-4 6-6 11-3 17 2 5 7 7 10 12 4 6 4 15-1 22"/><path d="M60 25c7 6 14 10 18 18 6 10 6 21 1 31-4 8-12 13-19 16-9 4-20 5-30 3"/><path d="M26 95h67"/><path d="M39 88c4-9 10-16 17-21 5 5 10 11 15 21"/><path d="M48 88c2-5 6-9 11-13 4 4 8 8 11 13"/></svg>`,
  },
  {
    id: "journaling",
    name: "Journaling",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Journaling" fill="none" stroke="${ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="27" y="24" width="56" height="72" rx="6"/><path d="M39 24v72"/><path d="M48 39h24"/><path d="M48 51h24"/><path d="M48 63h16"/><path d="M52 78l20-20 6 6-20 20-8 2 2-8Z"/></svg>`,
  },
  {
    id: "shared-silence",
    name: "Shared silence",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Shared silence" fill="none" stroke="${ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M24 60h72"/><path d="M32 52c6-9 13-14 20-14 4 0 8 1 12 4 4-3 8-4 12-4 7 0 14 5 20 14"/><path d="M40 71c5 7 10 11 20 11s15-4 20-11"/><path d="M48 42c-3 5-5 10-5 18"/><path d="M72 42c3 5 5 10 5 18"/></svg>`,
  },
];
