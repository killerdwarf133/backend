import { flagIso } from "../data/flags.js";

// Country name -> ISO 3166-1 alpha-2 (lowercase) for resolving flags of
// admin-added teams. Covers the 2026 field plus common football nations.
const countryIso: Record<string, string> = {
  mexico: "mx",
  "south africa": "za",
  "south korea": "kr",
  korea: "kr",
  czechia: "cz",
  "czech republic": "cz",
  canada: "ca",
  "bosnia and herzegovina": "ba",
  "bosnia & herzegovina": "ba",
  qatar: "qa",
  switzerland: "ch",
  brazil: "br",
  morocco: "ma",
  haiti: "ht",
  scotland: "gb-sct",
  "united states": "us",
  usa: "us",
  paraguay: "py",
  australia: "au",
  turkey: "tr",
  türkiye: "tr",
  germany: "de",
  curaçao: "cw",
  curacao: "cw",
  "côte d'ivoire": "ci",
  "cote d'ivoire": "ci",
  "ivory coast": "ci",
  ecuador: "ec",
  netherlands: "nl",
  japan: "jp",
  sweden: "se",
  tunisia: "tn",
  belgium: "be",
  egypt: "eg",
  iran: "ir",
  "new zealand": "nz",
  spain: "es",
  "cabo verde": "cv",
  "cape verde": "cv",
  "saudi arabia": "sa",
  uruguay: "uy",
  france: "fr",
  senegal: "sn",
  iraq: "iq",
  norway: "no",
  argentina: "ar",
  algeria: "dz",
  austria: "at",
  jordan: "jo",
  portugal: "pt",
  "dr congo": "cd",
  "congo dr": "cd",
  uzbekistan: "uz",
  colombia: "co",
  england: "gb-eng",
  croatia: "hr",
  ghana: "gh",
  panama: "pa",
  // common others
  italy: "it",
  "united kingdom": "gb",
  wales: "gb-wls",
  "northern ireland": "gb-nir",
  ireland: "ie",
  poland: "pl",
  denmark: "dk",
  serbia: "rs",
  ukraine: "ua",
  russia: "ru",
  greece: "gr",
  romania: "ro",
  hungary: "hu",
  nigeria: "ng",
  cameroon: "cm",
  mali: "ml",
  "burkina faso": "bf",
  "costa rica": "cr",
  honduras: "hn",
  jamaica: "jm",
  peru: "pe",
  chile: "cl",
  venezuela: "ve",
  bolivia: "bo",
  china: "cn",
  india: "in",
  indonesia: "id",
  thailand: "th",
  "united arab emirates": "ae",
  "south sudan": "ss"
};

const localIsos = new Set(Object.values(flagIso));

function isoFor(code?: string, country?: string): string {
  const upper = (code ?? "").toUpperCase();
  if (upper && flagIso[upper]) return flagIso[upper];
  const key = (country ?? "").trim().toLowerCase();
  return countryIso[key] ?? "";
}

/**
 * Resolves a flag URL from a team code and/or country name.
 * Uses our downloaded local flags for the seeded 48; otherwise falls back to
 * flagcdn.com so newly-added teams still get a flag automatically.
 */
export function resolveFlag(code?: string, country?: string): string {
  const iso = isoFor(code, country);
  if (!iso) return "";
  return localIsos.has(iso) ? `/assets/flags/${iso}.svg` : `https://flagcdn.com/${iso}.svg`;
}
