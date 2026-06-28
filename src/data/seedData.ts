export const commonRateNote =
  "Rates are per person in USD based on double occupancy. Single occupancy rates are available. Triple and quad occupancy may be available. Full payment is required at booking. Canadian packages may be subject to GST/HST. Availability and pricing are subject to change before booking.";

export const teams = [
  ["MEX", "Mexico", "A", "Mexico"],
  ["RSA", "South Africa", "A", "South Africa"],
  ["KOR", "Korea", "A", "Korea"],
  ["CZE", "Czechia", "A", "Czechia"],
  ["CAN", "Canada", "B", "Canada"],
  ["BIH", "Bosnia & Herzegovina", "B", "Bosnia & Herzegovina"],
  ["QAT", "Qatar", "B", "Qatar"],
  ["SUI", "Switzerland", "B", "Switzerland"],
  ["BRA", "Brazil", "C", "Brazil"],
  ["MAR", "Morocco", "C", "Morocco"],
  ["HAI", "Haiti", "C", "Haiti"],
  ["SCO", "Scotland", "C", "Scotland"],
  ["USA", "United States", "D", "United States"],
  ["PAR", "Paraguay", "D", "Paraguay"],
  ["AUS", "Australia", "D", "Australia"],
  ["TUR", "Türkiye", "D", "Türkiye"],
  ["GER", "Germany", "E", "Germany"],
  ["CUW", "Curaçao", "E", "Curaçao"],
  ["CIV", "Côte d’Ivoire", "E", "Côte d’Ivoire"],
  ["ECU", "Ecuador", "E", "Ecuador"],
  ["NED", "Netherlands", "F", "Netherlands"],
  ["JPN", "Japan", "F", "Japan"],
  ["SWE", "Sweden", "F", "Sweden"],
  ["TUN", "Tunisia", "F", "Tunisia"],
  ["BEL", "Belgium", "G", "Belgium"],
  ["EGY", "Egypt", "G", "Egypt"],
  ["IRN", "IR Iran", "G", "IR Iran"],
  ["NZL", "New Zealand", "G", "New Zealand"],
  ["ESP", "Spain", "H", "Spain"],
  ["CPV", "Cabo Verde", "H", "Cabo Verde"],
  ["KSA", "Saudi Arabia", "H", "Saudi Arabia"],
  ["URU", "Uruguay", "H", "Uruguay"],
  ["FRA", "France", "I", "France"],
  ["SEN", "Senegal", "I", "Senegal"],
  ["IRQ", "Iraq", "I", "Iraq"],
  ["NOR", "Norway", "I", "Norway"],
  ["ARG", "Argentina", "J", "Argentina"],
  ["ALG", "Algeria", "J", "Algeria"],
  ["AUT", "Austria", "J", "Austria"],
  ["JOR", "Jordan", "J", "Jordan"],
  ["POR", "Portugal", "K", "Portugal"],
  ["COD", "Congo DR", "K", "Congo DR"],
  ["UZB", "Uzbekistan", "K", "Uzbekistan"],
  ["COL", "Colombia", "K", "Colombia"],
  ["ENG", "England", "L", "England"],
  ["CRO", "Croatia", "L", "Croatia"],
  ["GHA", "Ghana", "L", "Ghana"],
  ["PAN", "Panama", "L", "Panama"]
].map(([code, name, group, country]) => ({ code, name, group, country }));

export const venues = [
  {
    city: "Vancouver",
    country: "Canada",
    region: "Western",
    stadium: "BC Place",
    capacity: 54500,
    hotels: ["Auberge Vancouver Hotel", "Pan Pacific Vancouver"]
  },
  {
    city: "Seattle",
    country: "United States",
    region: "Western",
    stadium: "Lumen Field",
    capacity: 69000,
    hotels: ["Hyatt Place Seattle Downtown", "Kimpton Hotel Monaco Seattle", "Kimpton Hotel Vintage Seattle", "Fairmont Olympic Hotel"]
  },
  {
    city: "San Francisco",
    country: "United States",
    region: "Western",
    stadium: "Levi's Stadium",
    capacity: 70909,
    hotels: ["Hyatt House Santa Clara", "Hilton Santa Clara", "Hayes Mansion San Jose"]
  },
  {
    city: "Los Angeles",
    country: "United States",
    region: "Western",
    stadium: "SoFi Stadium",
    capacity: 70240,
    hotels: ["Hyatt Place Pasadena", "Beverly Hills Marriott", "Conrad Los Angeles", "Peninsula Beverly Hills", "Four Seasons Beverly Hills"]
  },
  {
    city: "Guadalajara",
    country: "Mexico",
    region: "Central",
    stadium: "Estadio Akron",
    capacity: 48071,
    hotels: ["Barcelo Guadalajara", "Hilton Guadalajara Midtown"]
  },
  {
    city: "Mexico City",
    country: "Mexico",
    region: "Central",
    stadium: "Estadio Azteca",
    capacity: 87523,
    hotels: ["Bel Air Unique Mexico City WTC, Trademark by Wyndham", "Hyatt Regency Mexico City", "Sofitel Mexico City Reforma", "Four Seasons Mexico City"]
  },
  {
    city: "Monterrey",
    country: "Mexico",
    region: "Central",
    stadium: "Estadio BBVA",
    capacity: 53460,
    hotels: ["Wyndham Monterrey Ambassador Centro", "Westin Monterrey Valle"]
  },
  {
    city: "Houston",
    country: "United States",
    region: "Central",
    stadium: "NRG Stadium",
    capacity: 72220,
    hotels: ["Hyatt Regency Houston Galleria", "Hotel ICON, Marriott Autograph Collection"]
  },
  {
    city: "Dallas",
    country: "United States",
    region: "Central",
    stadium: "AT&T Stadium",
    capacity: 92967,
    hotels: ["Hyatt Place Dallas Arlington", "Doubletree by Hilton Arlington", "Lorenzo Hotel, Tapestry Collection by Hilton", "Le Meridien Dallas by the Galleria", "Thompson Dallas by Hyatt", "Adolphus Hotel Dallas"]
  },
  {
    city: "Kansas City",
    country: "United States",
    region: "Central",
    stadium: "Arrowhead Stadium",
    capacity: 76640,
    hotels: ["Crowne Plaza Kansas City Downtown"]
  },
  {
    city: "Atlanta",
    country: "United States",
    region: "Eastern",
    stadium: "Mercedes-Benz Stadium",
    capacity: 75000,
    hotels: ["Hyatt Place Atlanta Centennial Park", "Courtyard Atlanta Midtown", "Hilton Atlanta", "Westin Atlanta Buckhead", "Waldorf Astoria Atlanta Buckhead", "Ritz-Carlton Atlanta"]
  },
  {
    city: "Miami",
    country: "United States",
    region: "Eastern",
    stadium: "Hard Rock Stadium",
    capacity: 67518,
    hotels: ["Hotel Continental Miami Beach", "Hotel AKA Miami Brickell", "W South Beach"]
  },
  {
    city: "Toronto",
    country: "Canada",
    region: "Eastern",
    stadium: "BMO Field",
    capacity: 45736,
    hotels: ["Novotel Toronto Centre", "Hyatt Regency Toronto", "St. Regis Toronto"]
  },
  {
    city: "Boston",
    country: "United States",
    region: "Eastern",
    stadium: "Gillette Stadium",
    capacity: 70000,
    hotels: ["Hyatt Place Boston Seaport", "Hyatt Regency Boston", "The Colonnade Hotel Boston"]
  },
  {
    city: "Philadelphia",
    country: "United States",
    region: "Eastern",
    stadium: "Lincoln Financial Field",
    capacity: 69328,
    hotels: ["Sheraton Philadelphia University City", "Sonesta Philadelphia Rittenhouse Square", "Sofitel Philadelphia at Rittenhouse Square"]
  },
  {
    city: "New York",
    country: "United States",
    region: "Eastern",
    stadium: "MetLife Stadium",
    capacity: 87157,
    hotels: ["Hotel 50 Bowery, JdV by Hyatt", "InterContinental Barclay", "Luxury Collection Manhattan Midtown", "The Carlyle, a Rosewood Hotel"]
  }
] as const;

const venueByCity = Object.fromEntries(venues.map((venue) => [venue.city, venue]));

type Stage =
  | "Group Stage"
  | "Round of 32"
  | "Round of 16"
  | "Quarterfinal"
  | "Semifinal"
  | "Bronze Final"
  | "Final";

type GameSeedInput = {
  matchNumber: number;
  stage: Stage;
  date: string;
  localTime: string;
  city: string;
  homeLabel: string;
  awayLabel: string;
};

function game(input: GameSeedInput) {
  const venue = venueByCity[input.city];
  const knownCodes = new Set(teams.map((team) => team.code));
  const homeTeamCode = knownCodes.has(input.homeLabel) ? input.homeLabel : "";
  const awayTeamCode = knownCodes.has(input.awayLabel) ? input.awayLabel : "";

  return {
    ...input,
    stadium: venue.stadium,
    region: venue.region,
    homeTeamCode,
    awayTeamCode
  };
}

export const games = [
  game({ matchNumber: 1, stage: "Group Stage", date: "2026-06-11", localTime: "13:00", city: "Mexico City", homeLabel: "MEX", awayLabel: "RSA" }),
  game({ matchNumber: 2, stage: "Group Stage", date: "2026-06-11", localTime: "20:00", city: "Guadalajara", homeLabel: "KOR", awayLabel: "CZE" }),
  game({ matchNumber: 3, stage: "Group Stage", date: "2026-06-12", localTime: "15:00", city: "Toronto", homeLabel: "CAN", awayLabel: "BIH" }),
  game({ matchNumber: 4, stage: "Group Stage", date: "2026-06-12", localTime: "18:00", city: "Los Angeles", homeLabel: "USA", awayLabel: "PAR" }),
  game({ matchNumber: 5, stage: "Group Stage", date: "2026-06-13", localTime: "21:00", city: "Boston", homeLabel: "HAI", awayLabel: "SCO" }),
  game({ matchNumber: 6, stage: "Group Stage", date: "2026-06-13", localTime: "21:00", city: "Vancouver", homeLabel: "AUS", awayLabel: "TUR" }),
  game({ matchNumber: 7, stage: "Group Stage", date: "2026-06-13", localTime: "18:00", city: "New York", homeLabel: "BRA", awayLabel: "MAR" }),
  game({ matchNumber: 8, stage: "Group Stage", date: "2026-06-13", localTime: "12:00", city: "San Francisco", homeLabel: "QAT", awayLabel: "SUI" }),
  game({ matchNumber: 9, stage: "Group Stage", date: "2026-06-14", localTime: "19:00", city: "Philadelphia", homeLabel: "CIV", awayLabel: "ECU" }),
  game({ matchNumber: 10, stage: "Group Stage", date: "2026-06-14", localTime: "12:00", city: "Houston", homeLabel: "GER", awayLabel: "CUW" }),
  game({ matchNumber: 11, stage: "Group Stage", date: "2026-06-14", localTime: "15:00", city: "Dallas", homeLabel: "NED", awayLabel: "JPN" }),
  game({ matchNumber: 12, stage: "Group Stage", date: "2026-06-14", localTime: "20:00", city: "Monterrey", homeLabel: "SWE", awayLabel: "TUN" }),
  game({ matchNumber: 13, stage: "Group Stage", date: "2026-06-15", localTime: "18:00", city: "Miami", homeLabel: "KSA", awayLabel: "URU" }),
  game({ matchNumber: 14, stage: "Group Stage", date: "2026-06-15", localTime: "12:00", city: "Atlanta", homeLabel: "ESP", awayLabel: "CPV" }),
  game({ matchNumber: 15, stage: "Group Stage", date: "2026-06-15", localTime: "18:00", city: "Los Angeles", homeLabel: "IRN", awayLabel: "NZL" }),
  game({ matchNumber: 16, stage: "Group Stage", date: "2026-06-15", localTime: "12:00", city: "Seattle", homeLabel: "BEL", awayLabel: "EGY" }),
  game({ matchNumber: 17, stage: "Group Stage", date: "2026-06-16", localTime: "15:00", city: "New York", homeLabel: "FRA", awayLabel: "SEN" }),
  game({ matchNumber: 18, stage: "Group Stage", date: "2026-06-16", localTime: "18:00", city: "Boston", homeLabel: "IRQ", awayLabel: "NOR" }),
  game({ matchNumber: 19, stage: "Group Stage", date: "2026-06-16", localTime: "20:00", city: "Kansas City", homeLabel: "ARG", awayLabel: "ALG" }),
  game({ matchNumber: 20, stage: "Group Stage", date: "2026-06-16", localTime: "21:00", city: "San Francisco", homeLabel: "AUT", awayLabel: "JOR" }),
  game({ matchNumber: 21, stage: "Group Stage", date: "2026-06-17", localTime: "19:00", city: "Toronto", homeLabel: "GHA", awayLabel: "PAN" }),
  game({ matchNumber: 22, stage: "Group Stage", date: "2026-06-17", localTime: "15:00", city: "Dallas", homeLabel: "ENG", awayLabel: "CRO" }),
  game({ matchNumber: 23, stage: "Group Stage", date: "2026-06-17", localTime: "12:00", city: "Houston", homeLabel: "POR", awayLabel: "COD" }),
  game({ matchNumber: 24, stage: "Group Stage", date: "2026-06-17", localTime: "20:00", city: "Mexico City", homeLabel: "UZB", awayLabel: "COL" }),
  game({ matchNumber: 25, stage: "Group Stage", date: "2026-06-18", localTime: "12:00", city: "Atlanta", homeLabel: "CZE", awayLabel: "RSA" }),
  game({ matchNumber: 26, stage: "Group Stage", date: "2026-06-18", localTime: "12:00", city: "Los Angeles", homeLabel: "SUI", awayLabel: "BIH" }),
  game({ matchNumber: 27, stage: "Group Stage", date: "2026-06-18", localTime: "15:00", city: "Vancouver", homeLabel: "CAN", awayLabel: "QAT" }),
  game({ matchNumber: 28, stage: "Group Stage", date: "2026-06-18", localTime: "19:00", city: "Guadalajara", homeLabel: "MEX", awayLabel: "KOR" }),
  game({ matchNumber: 29, stage: "Group Stage", date: "2026-06-19", localTime: "21:00", city: "Philadelphia", homeLabel: "BRA", awayLabel: "HAI" }),
  game({ matchNumber: 30, stage: "Group Stage", date: "2026-06-19", localTime: "18:00", city: "Boston", homeLabel: "SCO", awayLabel: "MAR" }),
  game({ matchNumber: 31, stage: "Group Stage", date: "2026-06-19", localTime: "20:00", city: "San Francisco", homeLabel: "TUR", awayLabel: "PAR" }),
  game({ matchNumber: 32, stage: "Group Stage", date: "2026-06-19", localTime: "12:00", city: "Seattle", homeLabel: "USA", awayLabel: "AUS" }),
  game({ matchNumber: 33, stage: "Group Stage", date: "2026-06-20", localTime: "16:00", city: "Toronto", homeLabel: "GER", awayLabel: "CIV" }),
  game({ matchNumber: 34, stage: "Group Stage", date: "2026-06-20", localTime: "19:00", city: "Kansas City", homeLabel: "ECU", awayLabel: "CUW" }),
  game({ matchNumber: 35, stage: "Group Stage", date: "2026-06-20", localTime: "12:00", city: "Houston", homeLabel: "NED", awayLabel: "SWE" }),
  game({ matchNumber: 36, stage: "Group Stage", date: "2026-06-20", localTime: "22:00", city: "Monterrey", homeLabel: "TUN", awayLabel: "JPN" }),
  game({ matchNumber: 37, stage: "Group Stage", date: "2026-06-21", localTime: "18:00", city: "Miami", homeLabel: "URU", awayLabel: "CPV" }),
  game({ matchNumber: 38, stage: "Group Stage", date: "2026-06-21", localTime: "12:00", city: "Atlanta", homeLabel: "ESP", awayLabel: "KSA" }),
  game({ matchNumber: 39, stage: "Group Stage", date: "2026-06-21", localTime: "12:00", city: "Los Angeles", homeLabel: "BEL", awayLabel: "IRN" }),
  game({ matchNumber: 40, stage: "Group Stage", date: "2026-06-21", localTime: "18:00", city: "Vancouver", homeLabel: "NZL", awayLabel: "EGY" }),
  game({ matchNumber: 41, stage: "Group Stage", date: "2026-06-22", localTime: "20:00", city: "New York", homeLabel: "NOR", awayLabel: "SEN" }),
  game({ matchNumber: 42, stage: "Group Stage", date: "2026-06-22", localTime: "17:00", city: "Philadelphia", homeLabel: "FRA", awayLabel: "IRQ" }),
  game({ matchNumber: 43, stage: "Group Stage", date: "2026-06-22", localTime: "12:00", city: "Dallas", homeLabel: "ARG", awayLabel: "AUT" }),
  game({ matchNumber: 44, stage: "Group Stage", date: "2026-06-22", localTime: "20:00", city: "San Francisco", homeLabel: "JOR", awayLabel: "ALG" }),
  game({ matchNumber: 45, stage: "Group Stage", date: "2026-06-23", localTime: "16:00", city: "Boston", homeLabel: "ENG", awayLabel: "GHA" }),
  game({ matchNumber: 46, stage: "Group Stage", date: "2026-06-23", localTime: "19:00", city: "Toronto", homeLabel: "PAN", awayLabel: "CRO" }),
  game({ matchNumber: 47, stage: "Group Stage", date: "2026-06-23", localTime: "12:00", city: "Houston", homeLabel: "POR", awayLabel: "UZB" }),
  game({ matchNumber: 48, stage: "Group Stage", date: "2026-06-23", localTime: "20:00", city: "Guadalajara", homeLabel: "COL", awayLabel: "COD" }),
  game({ matchNumber: 49, stage: "Group Stage", date: "2026-06-24", localTime: "18:00", city: "Miami", homeLabel: "SCO", awayLabel: "BRA" }),
  game({ matchNumber: 50, stage: "Group Stage", date: "2026-06-24", localTime: "18:00", city: "Atlanta", homeLabel: "MAR", awayLabel: "HAI" }),
  game({ matchNumber: 51, stage: "Group Stage", date: "2026-06-24", localTime: "12:00", city: "Vancouver", homeLabel: "SUI", awayLabel: "CAN" }),
  game({ matchNumber: 52, stage: "Group Stage", date: "2026-06-24", localTime: "12:00", city: "Seattle", homeLabel: "BIH", awayLabel: "QAT" }),
  game({ matchNumber: 53, stage: "Group Stage", date: "2026-06-24", localTime: "19:00", city: "Mexico City", homeLabel: "CZE", awayLabel: "MEX" }),
  game({ matchNumber: 54, stage: "Group Stage", date: "2026-06-24", localTime: "19:00", city: "Monterrey", homeLabel: "RSA", awayLabel: "KOR" }),
  game({ matchNumber: 55, stage: "Group Stage", date: "2026-06-25", localTime: "16:00", city: "Philadelphia", homeLabel: "CUW", awayLabel: "CIV" }),
  game({ matchNumber: 56, stage: "Group Stage", date: "2026-06-25", localTime: "16:00", city: "New York", homeLabel: "ECU", awayLabel: "GER" }),
  game({ matchNumber: 57, stage: "Group Stage", date: "2026-06-25", localTime: "18:00", city: "Dallas", homeLabel: "JPN", awayLabel: "SWE" }),
  game({ matchNumber: 58, stage: "Group Stage", date: "2026-06-25", localTime: "18:00", city: "Kansas City", homeLabel: "TUN", awayLabel: "NED" }),
  game({ matchNumber: 59, stage: "Group Stage", date: "2026-06-25", localTime: "19:00", city: "Los Angeles", homeLabel: "TUR", awayLabel: "USA" }),
  game({ matchNumber: 60, stage: "Group Stage", date: "2026-06-25", localTime: "19:00", city: "San Francisco", homeLabel: "PAR", awayLabel: "AUS" }),
  game({ matchNumber: 61, stage: "Group Stage", date: "2026-06-26", localTime: "15:00", city: "Boston", homeLabel: "NOR", awayLabel: "FRA" }),
  game({ matchNumber: 62, stage: "Group Stage", date: "2026-06-26", localTime: "15:00", city: "Toronto", homeLabel: "SEN", awayLabel: "IRQ" }),
  game({ matchNumber: 63, stage: "Group Stage", date: "2026-06-26", localTime: "20:00", city: "Seattle", homeLabel: "EGY", awayLabel: "IRN" }),
  game({ matchNumber: 64, stage: "Group Stage", date: "2026-06-26", localTime: "20:00", city: "Vancouver", homeLabel: "NZL", awayLabel: "BEL" }),
  game({ matchNumber: 65, stage: "Group Stage", date: "2026-06-26", localTime: "19:00", city: "Houston", homeLabel: "CPV", awayLabel: "KSA" }),
  game({ matchNumber: 66, stage: "Group Stage", date: "2026-06-26", localTime: "18:00", city: "Guadalajara", homeLabel: "URU", awayLabel: "ESP" }),
  game({ matchNumber: 67, stage: "Group Stage", date: "2026-06-27", localTime: "17:00", city: "New York", homeLabel: "PAN", awayLabel: "ENG" }),
  game({ matchNumber: 68, stage: "Group Stage", date: "2026-06-27", localTime: "17:00", city: "Philadelphia", homeLabel: "CRO", awayLabel: "GHA" }),
  game({ matchNumber: 69, stage: "Group Stage", date: "2026-06-27", localTime: "21:00", city: "Kansas City", homeLabel: "ALG", awayLabel: "AUT" }),
  game({ matchNumber: 70, stage: "Group Stage", date: "2026-06-27", localTime: "21:00", city: "Dallas", homeLabel: "JOR", awayLabel: "ARG" }),
  game({ matchNumber: 71, stage: "Group Stage", date: "2026-06-27", localTime: "19:30", city: "Miami", homeLabel: "COL", awayLabel: "POR" }),
  game({ matchNumber: 72, stage: "Group Stage", date: "2026-06-27", localTime: "19:30", city: "Atlanta", homeLabel: "COD", awayLabel: "UZB" }),
  game({ matchNumber: 73, stage: "Round of 32", date: "2026-06-28", localTime: "12:00", city: "Los Angeles", homeLabel: "2A", awayLabel: "2B" }),
  game({ matchNumber: 74, stage: "Round of 32", date: "2026-06-29", localTime: "16:30", city: "Boston", homeLabel: "1E", awayLabel: "3ABCDF" }),
  game({ matchNumber: 75, stage: "Round of 32", date: "2026-06-29", localTime: "19:00", city: "Monterrey", homeLabel: "1F", awayLabel: "2C" }),
  game({ matchNumber: 76, stage: "Round of 32", date: "2026-06-29", localTime: "12:00", city: "Houston", homeLabel: "1C", awayLabel: "2F" }),
  game({ matchNumber: 77, stage: "Round of 32", date: "2026-06-30", localTime: "17:00", city: "New York", homeLabel: "1I", awayLabel: "3CDFGH" }),
  game({ matchNumber: 78, stage: "Round of 32", date: "2026-06-30", localTime: "12:00", city: "Dallas", homeLabel: "2E", awayLabel: "2I" }),
  game({ matchNumber: 79, stage: "Round of 32", date: "2026-06-30", localTime: "19:00", city: "Mexico City", homeLabel: "1A", awayLabel: "3CEFHI" }),
  game({ matchNumber: 80, stage: "Round of 32", date: "2026-07-01", localTime: "12:00", city: "Atlanta", homeLabel: "1L", awayLabel: "3EHIJK" }),
  game({ matchNumber: 81, stage: "Round of 32", date: "2026-07-01", localTime: "17:00", city: "San Francisco", homeLabel: "1D", awayLabel: "3BEFIJ" }),
  game({ matchNumber: 82, stage: "Round of 32", date: "2026-07-01", localTime: "13:00", city: "Seattle", homeLabel: "1G", awayLabel: "3AEHIJ" }),
  game({ matchNumber: 83, stage: "Round of 32", date: "2026-07-02", localTime: "19:00", city: "Toronto", homeLabel: "2K", awayLabel: "2L" }),
  game({ matchNumber: 84, stage: "Round of 32", date: "2026-07-02", localTime: "12:00", city: "Los Angeles", homeLabel: "1H", awayLabel: "2J" }),
  game({ matchNumber: 85, stage: "Round of 32", date: "2026-07-02", localTime: "20:00", city: "Vancouver", homeLabel: "1B", awayLabel: "3EFGIJ" }),
  game({ matchNumber: 86, stage: "Round of 32", date: "2026-07-03", localTime: "18:00", city: "Miami", homeLabel: "1J", awayLabel: "2H" }),
  game({ matchNumber: 87, stage: "Round of 32", date: "2026-07-03", localTime: "20:30", city: "Kansas City", homeLabel: "1K", awayLabel: "3DEIJL" }),
  game({ matchNumber: 88, stage: "Round of 32", date: "2026-07-03", localTime: "13:00", city: "Dallas", homeLabel: "2D", awayLabel: "2G" }),
  game({ matchNumber: 89, stage: "Round of 16", date: "2026-07-04", localTime: "17:00", city: "Philadelphia", homeLabel: "W74", awayLabel: "W77" }),
  game({ matchNumber: 90, stage: "Round of 16", date: "2026-07-04", localTime: "12:00", city: "Houston", homeLabel: "W73", awayLabel: "W75" }),
  game({ matchNumber: 91, stage: "Round of 16", date: "2026-07-05", localTime: "16:00", city: "New York", homeLabel: "W76", awayLabel: "W78" }),
  game({ matchNumber: 92, stage: "Round of 16", date: "2026-07-05", localTime: "18:00", city: "Mexico City", homeLabel: "W79", awayLabel: "W80" }),
  game({ matchNumber: 93, stage: "Round of 16", date: "2026-07-06", localTime: "14:00", city: "Dallas", homeLabel: "W83", awayLabel: "W84" }),
  game({ matchNumber: 94, stage: "Round of 16", date: "2026-07-06", localTime: "17:00", city: "Seattle", homeLabel: "W81", awayLabel: "W82" }),
  game({ matchNumber: 95, stage: "Round of 16", date: "2026-07-07", localTime: "12:00", city: "Atlanta", homeLabel: "W86", awayLabel: "W88" }),
  game({ matchNumber: 96, stage: "Round of 16", date: "2026-07-07", localTime: "13:00", city: "Vancouver", homeLabel: "W85", awayLabel: "W87" }),
  game({ matchNumber: 97, stage: "Quarterfinal", date: "2026-07-09", localTime: "16:00", city: "Boston", homeLabel: "W89", awayLabel: "W90" }),
  game({ matchNumber: 98, stage: "Quarterfinal", date: "2026-07-10", localTime: "12:00", city: "Los Angeles", homeLabel: "W93", awayLabel: "W94" }),
  game({ matchNumber: 99, stage: "Quarterfinal", date: "2026-07-11", localTime: "17:00", city: "Miami", homeLabel: "W91", awayLabel: "W92" }),
  game({ matchNumber: 100, stage: "Quarterfinal", date: "2026-07-11", localTime: "20:00", city: "Kansas City", homeLabel: "W95", awayLabel: "W96" }),
  game({ matchNumber: 101, stage: "Semifinal", date: "2026-07-14", localTime: "14:00", city: "Dallas", homeLabel: "W97", awayLabel: "W98" }),
  game({ matchNumber: 102, stage: "Semifinal", date: "2026-07-15", localTime: "15:00", city: "Atlanta", homeLabel: "W99", awayLabel: "W100" }),
  game({ matchNumber: 103, stage: "Bronze Final", date: "2026-07-18", localTime: "17:00", city: "Miami", homeLabel: "Bronze", awayLabel: "Bronze" }),
  game({ matchNumber: 104, stage: "Final", date: "2026-07-19", localTime: "15:00", city: "New York", homeLabel: "Finalist", awayLabel: "Finalist" })
];

const coreInclusions = [
  "First-class accommodations",
  "Roadtrips-style host support",
  "Personalized itinerary",
  "Expert pre-travel assistance"
];

const standardAddOns = [
  "Hotel room upgrades",
  "Airfare between host cities",
  "Unique cultural experiences",
  "Round-trip transfers between airport and hotel",
  "Private transfers",
  "Additional hotel nights"
];

export const travelPackages = [
  {
    slug: "custom-getaways",
    title: "Custom Getaways to the 2026 World Cup",
    category: "Custom",
    dateRange: "June 11 - July 11, 2026",
    city: "Multi-city",
    shortDescription: "Personalized 3-to-30-night World Cup travel itineraries across preferred host cities.",
    longDescription:
      "Build a flexible World Cup experience around preferred dates, host cities, first-class accommodations, host assistance, and optional extras from the group stage through quarter-finals.",
    baseNights: 3,
    minNights: 3,
    maxNights: 30,
    priceFromUsd: 3135,
    featured: true,
    inclusions: ["First-class accommodations in preferred destinations", ...coreInclusions.slice(1)],
    addOns: standardAddOns,
    variants: [
      {
        id: "custom-3-night",
        title: "3 Night Custom Getaway",
        hotel: "Preferred destination hotel selection",
        roomType: "Standard room",
        city: "Multi-city",
        nights: 3,
        priceFromUsd: 3135,
        callForRates: false,
        taxNote: commonRateNote
      }
    ],
    relatedCities: venues.map((venue) => venue.city),
    relatedMatchNumbers: games.filter((fixture) => fixture.matchNumber <= 100).map((fixture) => fixture.matchNumber),
    brochurePage: 7
  },
  {
    slug: "follow-your-team",
    title: "Follow Your Team Packages",
    category: "Team Travel",
    dateRange: "June 11 - 27, 2026",
    city: "Team host cities",
    shortDescription: "Travel logistics for following any of the 48 teams through the group stage.",
    longDescription:
      "Choose the country you support and build a team-first itinerary around its group-stage host cities, with first-class accommodations, arrival support, match-day planning, and optional transfers or city add-ons.",
    baseNights: 3,
    minNights: 3,
    maxNights: 18,
    priceFromUsd: 3135,
    featured: true,
    inclusions: [
      "First-class accommodations in your team's host cities",
      "Roadtrips-style hosts",
      "Personalized meet and greet upon arrival",
      "Personalized itinerary",
      "Dedicated arrival transfer for Team USA and Team Mexico packages",
      "Round-trip hotel-to-stadium transfers on match days for Team USA and Team Mexico packages",
      "Expert pre-travel assistance"
    ],
    addOns: [
      "Hotel room upgrades",
      "Airfare between host cities",
      "Unique cultural experiences",
      "Dedicated departure transfer from hotel to airport",
      "Private transfers",
      "Additional hotel nights"
    ],
    variants: [
      { id: "team-usa", title: "Team USA - 3 Night Package", hotel: "Team host city hotel selection", roomType: "Standard room", city: "Los Angeles / Seattle", nights: 3, priceFromUsd: 5395, callForRates: false, taxNote: commonRateNote },
      { id: "team-mexico", title: "Team Mexico - 3 Night Package", hotel: "Team host city hotel selection", roomType: "Standard room", city: "Mexico City / Guadalajara", nights: 3, priceFromUsd: 7155, callForRates: false, taxNote: commonRateNote },
      { id: "team-canada", title: "Team Canada - 3 Night Package", hotel: "Team host city hotel selection", roomType: "Standard room", city: "Toronto / Vancouver", nights: 3, priceFromUsd: 3815, callForRates: false, taxNote: commonRateNote },
      { id: "other-team", title: "Other Teams - 3 Night Package", hotel: "Team host city hotel selection", roomType: "Standard room", city: "Varies by team", nights: 3, priceFromUsd: 3135, callForRates: false, taxNote: "Rate varies by team. " + commonRateNote }
    ],
    relatedCities: venues.map((venue) => venue.city),
    relatedMatchNumbers: games.filter((fixture) => fixture.stage === "Group Stage").map((fixture) => fixture.matchNumber),
    brochurePage: 8
  },
  {
    slug: "dallas-semi-final",
    title: "Dallas Semi-Final Packages",
    category: "Semi-Final",
    dateRange: "July 13 - 16, 2026",
    city: "Dallas",
    shortDescription: "Three-night Dallas Finals Week experience for the first semi-final.",
    longDescription:
      "Begin Finals Week in Dallas with luxury hotel options, custom itinerary support, match-day transfers, host assistance, and the option to add Atlanta or New York.",
    baseNights: 3,
    minNights: 3,
    maxNights: 7,
    priceFromUsd: 6675,
    featured: true,
    inclusions: [...coreInclusions, "All taxes and service charges", "Round-trip hotel-to-stadium transfers on match day"],
    addOns: [...standardAddOns, "Atlanta during the second semi-final"],
    variants: [
      { id: "dallas-hyatt-place", title: "Hyatt Place Dallas Arlington", hotel: "Hyatt Place Dallas Arlington", roomType: "Standard Room", city: "Dallas", nights: 3, priceFromUsd: 6675, callForRates: false, taxNote: commonRateNote },
      { id: "dallas-lorenzo", title: "Lorenzo Hotel Dallas, Tapestry Collection by Hilton", hotel: "Lorenzo Hotel Dallas, Tapestry Collection by Hilton", roomType: "Standard Room", city: "Dallas", nights: 3, priceFromUsd: 6860, callForRates: false, taxNote: commonRateNote },
      { id: "dallas-doubletree", title: "Doubletree by Hilton Arlington DFW South", hotel: "Doubletree by Hilton Arlington DFW South", roomType: "Standard Room", city: "Dallas", nights: 3, priceFromUsd: 7265, callForRates: false, taxNote: commonRateNote },
      { id: "dallas-le-meridien-junior", title: "Le Meridien Dallas by the Galleria - Junior Suite", hotel: "Le Meridien Dallas by the Galleria", roomType: "Junior Suite", city: "Dallas", nights: 3, priceFromUsd: 7560, callForRates: false, taxNote: commonRateNote },
      { id: "dallas-le-meridien-exec", title: "Le Meridien Dallas by the Galleria - Executive Suite", hotel: "Le Meridien Dallas by the Galleria", roomType: "Executive Suite", city: "Dallas", nights: 3, priceFromUsd: 8000, callForRates: false, taxNote: commonRateNote },
      { id: "dallas-thompson", title: "Thompson Dallas by Hyatt", hotel: "Thompson Dallas by Hyatt", roomType: "Standard", city: "Dallas", nights: 3, priceFromUsd: 8000, callForRates: false, taxNote: commonRateNote },
      { id: "dallas-adolphus-deluxe", title: "Adolphus Hotel Dallas - Deluxe", hotel: "Adolphus Hotel Dallas", roomType: "Deluxe", city: "Dallas", nights: 3, priceFromUsd: 8000, callForRates: false, taxNote: commonRateNote },
      { id: "dallas-adolphus-exec", title: "Adolphus Hotel Dallas - Executive Suite", hotel: "Adolphus Hotel Dallas", roomType: "Executive Suite", city: "Dallas", nights: 3, priceFromUsd: null, callForRates: true, taxNote: "Call for rates. " + commonRateNote }
    ],
    relatedCities: ["Dallas", "Atlanta", "New York"],
    relatedMatchNumbers: [101],
    brochurePage: 9
  },
  {
    slug: "atlanta-semi-final",
    title: "Atlanta Semi-Final Packages",
    category: "Semi-Final",
    dateRange: "July 13 - 16, 2026",
    city: "Atlanta",
    shortDescription: "Three-night Atlanta Finals Week package for the second semi-final.",
    longDescription:
      "Plan a custom Atlanta semi-final stay with first-class accommodations, host support, match-day transfers, and the ability to add Dallas, New York, or both.",
    baseNights: 3,
    minNights: 3,
    maxNights: 7,
    priceFromUsd: 6675,
    featured: true,
    inclusions: [...coreInclusions, "All taxes and service charges", "Round-trip hotel-to-stadium transfers on match day"],
    addOns: [...standardAddOns, "Dallas during the first semi-final", "New York for the final"],
    variants: [
      { id: "atlanta-courtyard", title: "Courtyard Atlanta Midtown", hotel: "Courtyard Atlanta Midtown", roomType: "Standard Room", city: "Atlanta", nights: 3, priceFromUsd: 6675, callForRates: false, taxNote: commonRateNote },
      { id: "atlanta-hyatt-place", title: "Hyatt Place Atlanta Centennial Park", hotel: "Hyatt Place Atlanta Centennial Park", roomType: "Standard Room", city: "Atlanta", nights: 3, priceFromUsd: 7250, callForRates: false, taxNote: commonRateNote },
      { id: "atlanta-hilton", title: "Hilton Atlanta", hotel: "Hilton Atlanta", roomType: "Standard Room", city: "Atlanta", nights: 3, priceFromUsd: 7765, callForRates: false, taxNote: commonRateNote },
      { id: "atlanta-westin", title: "Westin Buckhead Atlanta", hotel: "Westin Buckhead Atlanta", roomType: "Standard Room", city: "Atlanta", nights: 3, priceFromUsd: 7945, callForRates: false, taxNote: commonRateNote },
      { id: "atlanta-ritz-city", title: "Ritz-Carlton Atlanta - City View Room", hotel: "Ritz-Carlton Atlanta", roomType: "City View Room", city: "Atlanta", nights: 3, priceFromUsd: null, callForRates: true, taxNote: "Call for rates. " + commonRateNote },
      { id: "atlanta-ritz-corner", title: "Ritz-Carlton Atlanta - Corner Room", hotel: "Ritz-Carlton Atlanta", roomType: "Corner Room", city: "Atlanta", nights: 3, priceFromUsd: null, callForRates: true, taxNote: "Call for rates. " + commonRateNote }
    ],
    relatedCities: ["Atlanta", "Dallas", "New York"],
    relatedMatchNumbers: [102],
    brochurePage: 10
  },
  {
    slug: "finals-week",
    title: "Finals Week Packages",
    category: "Finals Week",
    dateRange: "July 16 - 20, 2026",
    city: "New York / New Jersey",
    shortDescription: "Four-night New York/New Jersey package around the 2026 World Cup Final at MetLife Stadium.",
    longDescription:
      "A premium Finals Week itinerary with Manhattan hotel options, meet and greet, arrival transfer, host and local assistance, commemorative gift package, stadium transfers, and semi-final add-on possibilities.",
    baseNights: 4,
    minNights: 4,
    maxNights: 10,
    priceFromUsd: 18515,
    featured: true,
    inclusions: [
      "First-class accommodations for four nights in New York",
      "On-site host and local assistance",
      "Commemorative World Cup gift package",
      "Welcome kit",
      "Personalized meet and greet upon arrival",
      "Personalized itinerary",
      "All taxes and service charges",
      "Dedicated arrival transfer from airport to hotel",
      "Round-trip hotel-to-stadium transfers on match days",
      "Expert pre-travel assistance"
    ],
    addOns: ["Dallas or Atlanta during the semifinals", "Private transfers", "Unique cultural experiences", "Dedicated departure transfer from hotel to airport", "Hotel room upgrades", "Additional hotel nights"],
    variants: [
      { id: "finals-50-bowery", title: "Hotel 50 Bowery, JdV by Hyatt", hotel: "Hotel 50 Bowery, JdV by Hyatt", roomType: "Standard Room", city: "New York", nights: 4, priceFromUsd: 18515, callForRates: false, taxNote: commonRateNote },
      { id: "finals-intercontinental", title: "InterContinental Barclay", hotel: "InterContinental Barclay", roomType: "Classic Room", city: "New York", nights: 4, priceFromUsd: 18515, callForRates: false, taxNote: commonRateNote },
      { id: "finals-luxury-collection", title: "Luxury Collection Manhattan Midtown", hotel: "Luxury Collection Manhattan Midtown", roomType: "1 Bedroom Suite", city: "New York", nights: 4, priceFromUsd: 19495, callForRates: false, taxNote: commonRateNote },
      { id: "finals-carlyle-standard", title: "The Carlyle, a Rosewood Hotel", hotel: "The Carlyle, a Rosewood Hotel", roomType: "Standard Room", city: "New York", nights: 4, priceFromUsd: 21395, callForRates: false, taxNote: commonRateNote },
      { id: "finals-carlyle-suite", title: "The Carlyle, a Rosewood Hotel - Superior Suite", hotel: "The Carlyle, a Rosewood Hotel", roomType: "Superior Suite", city: "New York", nights: 4, priceFromUsd: null, callForRates: true, taxNote: "Call for rates. " + commonRateNote }
    ],
    relatedCities: ["New York", "Dallas", "Atlanta"],
    relatedMatchNumbers: [101, 102, 104],
    brochurePage: 11
  }
] as const;
