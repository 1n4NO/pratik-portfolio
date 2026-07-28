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
