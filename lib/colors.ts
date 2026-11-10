// Typical factory paint colors, to give shoppers a general idea of what each car
// comes in. Car makers share most paints across their lineup, so colors are kept
// per brand, with overrides for models whose palette is quite different.
//
// Written from general knowledge of recent (2024-2026) US palettes. Not every
// color is offered on every model, trim or year, and the hex swatches are only
// approximations of how the paint looks. Confirm with a dealer.

import type { Car } from "./cars";

/** [paint name, approximate hex] */
type Paint = [string, string];

export interface Swatch {
  name: string;
  hex: string;
  family: ColorFamily;
}

export type ColorFamily =
  | "white"
  | "black"
  | "gray"
  | "silver"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "brown";

export interface Palette {
  colors: Swatch[];
  /** Extra context, such as a custom-paint program. */
  note?: string;
  /** True when the palette is this model's own rather than the brand's. */
  modelSpecific: boolean;
}

const BRAND_PAINTS: Record<string, { paints: Paint[]; note?: string }> = {
  Toyota: {
    paints: [
      ["Wind Chill Pearl", "#EDEDE8"],
      ["Ice Cap", "#F3F3F0"],
      ["Midnight Black Metallic", "#1B1B1D"],
      ["Celestial Silver Metallic", "#A9ADB1"],
      ["Magnetic Gray Metallic", "#5C6066"],
      ["Underground", "#4A4B4C"],
      ["Supersonic Red", "#A3161D"],
      ["Blueprint", "#1F3A6B"],
    ],
  },
  Honda: {
    paints: [
      ["Platinum White Pearl", "#ECEBE6"],
      ["Crystal Black Pearl", "#141416"],
      ["Lunar Silver Metallic", "#A7AAAD"],
      ["Meteorite Gray Metallic", "#55585C"],
      ["Urban Gray Pearl", "#6E7173"],
      ["Radiant Red Metallic", "#8E1A20"],
      ["Still Night Pearl", "#1E2840"],
      ["Canyon River Blue Metallic", "#2C4F72"],
    ],
  },
  Acura: {
    paints: [
      ["Platinum White Pearl", "#ECEBE6"],
      ["Majestic Black Pearl", "#151517"],
      ["Lunar Silver Metallic", "#A7AAAD"],
      ["Liquid Carbon Metallic", "#3E4043"],
      ["Urban Gray Pearl", "#6E7173"],
      ["Apex Blue Pearl", "#1F4E8C"],
      ["Performance Red Pearl", "#9C1C22"],
      ["Tiger Eye Pearl", "#C4621D"],
    ],
  },
  Hyundai: {
    paints: [
      ["Serenity White Pearl", "#EEEEEA"],
      ["Abyss Black Pearl", "#18191B"],
      ["Shimmering Silver", "#A6A9AC"],
      ["Portofino Gray", "#6A6D70"],
      ["Amazon Gray", "#4E5550"],
      ["Ultimate Red", "#8F1B22"],
      ["Intense Blue", "#22427A"],
      ["Ecotronic Gray", "#8E918A"],
    ],
  },
  Kia: {
    paints: [
      ["Snow White Pearl", "#EEEEEA"],
      ["Ebony Black", "#121214"],
      ["Everlasting Silver", "#A8ABAE"],
      ["Steel Gray", "#5E6266"],
      ["Wolf Gray", "#7A7C7C"],
      ["Runway Red", "#9A1C24"],
      ["Gravity Blue", "#243656"],
      ["Jungle Wood Green", "#3F4A3A"],
    ],
  },
  Mazda: {
    paints: [
      ["Soul Red Crystal Metallic", "#A5121C"],
      ["Machine Gray Metallic", "#5D6064"],
      ["Rhodium White Premium", "#E8E6E0"],
      ["Jet Black Mica", "#151515"],
      ["Polymetal Gray Metallic", "#7F8789"],
      ["Deep Crystal Blue Mica", "#1E2D4A"],
      ["Platinum Quartz Metallic", "#B7AFA4"],
      ["Zircon Sand Metallic", "#B4A890"],
    ],
  },
  Subaru: {
    paints: [
      ["Crystal White Pearl", "#EEEDE8"],
      ["Crystal Black Silica", "#18191A"],
      ["Ice Silver Metallic", "#A9ACAE"],
      ["Magnetite Gray Metallic", "#555A5E"],
      ["Crimson Red Pearl", "#8A1B24"],
      ["Sapphire Blue Pearl", "#233A6A"],
      ["Autumn Green Metallic", "#3E4A3C"],
      ["Brilliant Bronze Metallic", "#6E5642"],
    ],
  },
  Nissan: {
    paints: [
      ["Pearl White TriCoat", "#EEEDE8"],
      ["Super Black", "#131315"],
      ["Brilliant Silver Metallic", "#A8ABAD"],
      ["Gun Metallic", "#4F5357"],
      ["Boulder Gray Pearl", "#7B7D7B"],
      ["Scarlet Ember Tintcoat", "#9A1D23"],
      ["Deep Blue Pearl", "#1E2E55"],
    ],
  },
  Volkswagen: {
    paints: [
      ["Pure White", "#EFEFEC"],
      ["Deep Black Pearl", "#141517"],
      ["Pyrite Silver Metallic", "#9EA0A0"],
      ["Platinum Gray Metallic", "#6B6E70"],
      ["Kings Red Metallic", "#8E1A22"],
      ["Atlantic Blue Metallic", "#1E3A5F"],
      ["Avocado Green Pearl", "#4E5A3E"],
    ],
  },
  Ford: {
    paints: [
      ["Oxford White", "#F1F1EE"],
      ["Star White Metallic Tri-Coat", "#ECEAE3"],
      ["Agate Black Metallic", "#151517"],
      ["Iconic Silver Metallic", "#A3A6A9"],
      ["Carbonized Gray Metallic", "#4C4F53"],
      ["Rapid Red Metallic", "#8A1A1F"],
      ["Atlas Blue Metallic", "#1F3B66"],
      ["Antimatter Blue Metallic", "#2A3346"],
    ],
  },
  Chevrolet: {
    paints: [
      ["Summit White", "#F2F2F0"],
      ["Black", "#121212"],
      ["Silver Ice Metallic", "#B0B3B5"],
      ["Sterling Gray Metallic", "#77797B"],
      ["Mosaic Black Metallic", "#1D1E21"],
      ["Radiant Red Tintcoat", "#8E1A22"],
      ["Glacier Blue Metallic", "#6C8DAF"],
      ["Cacti Green", "#6B7356"],
    ],
  },
  GMC: {
    paints: [
      ["Summit White", "#F2F2F0"],
      ["White Frost Tricoat", "#EEECE5"],
      ["Onyx Black", "#141414"],
      ["Sterling Metallic", "#7C7E80"],
      ["Thunderstorm Gray", "#5A5D60"],
      ["Downpour Metallic", "#4C5A63"],
      ["Cayenne Red Tintcoat", "#8C1A1F"],
    ],
  },
  Buick: {
    paints: [
      ["Summit White", "#F2F2F0"],
      ["White Frost Tricoat", "#EEECE5"],
      ["Ebony Twilight Metallic", "#1A1A1D"],
      ["Sterling Gray Metallic", "#77797B"],
      ["Moonstone Gray Metallic", "#6F6F6E"],
      ["Cinnabar Metallic", "#8E2A20"],
      ["Deep Azure Metallic", "#1F3150"],
    ],
  },
  Cadillac: {
    paints: [
      ["Crystal White Tricoat", "#EDEBE5"],
      ["Stellar Black Metallic", "#151618"],
      ["Radiant Silver Metallic", "#A6A8AA"],
      ["Shadow Metallic", "#4E5054"],
      ["Midnight Steel Metallic", "#3D4045"],
      ["Infrared Tintcoat", "#8F1B22"],
      ["Opulent Blue Metallic", "#22314E"],
    ],
  },
  Lincoln: {
    paints: [
      ["Pristine White", "#EEEDE8"],
      ["Infinite Black", "#141416"],
      ["Silver Radiance", "#A8AAAC"],
      ["Asher Gray", "#6A6C6C"],
      ["Burgundy Velvet", "#5E1A22"],
      ["Flight Blue", "#2E3D55"],
    ],
  },
  Chrysler: {
    paints: [
      ["Bright White", "#F2F2F0"],
      ["Brilliant Black Crystal Pearl", "#141416"],
      ["Silver Mist", "#ABADAE"],
      ["Granite Crystal Metallic", "#4A4C50"],
      ["Ceramic Grey", "#A3A39D"],
      ["Velvet Red Pearl", "#7E1A22"],
      ["Fathom Blue Pearl", "#1E3048"],
    ],
  },
  Jeep: {
    paints: [
      ["Bright White", "#F2F2F0"],
      ["Diamond Black Crystal Pearl", "#121214"],
      ["Silver Zynith", "#A9ABAD"],
      ["Baltic Gray Metallic", "#5D6266"],
      ["Velvet Red Pearl", "#7E1A22"],
      ["Rocky Mountain Pearl", "#2C3A55"],
      ["Hydro Blue Pearl", "#2F6FA0"],
    ],
  },
  Ram: {
    paints: [
      ["Bright White", "#F2F2F0"],
      ["Diamond Black Crystal Pearl", "#121214"],
      ["Billet Silver Metallic", "#A4A7AA"],
      ["Granite Crystal Metallic", "#4A4C50"],
      ["Flame Red", "#B3121E"],
      ["Delmonico Red Pearl", "#6E1A22"],
      ["Patriot Blue Pearl", "#1E2F55"],
      ["Hydro Blue Pearl", "#2F6FA0"],
    ],
  },
  Tesla: {
    paints: [
      ["Pearl White Multi-Coat", "#F0F0EE"],
      ["Diamond Black", "#121214"],
      ["Stealth Grey", "#4D5053"],
      ["Quicksilver", "#A3A5A7"],
      ["Ultra Red", "#A51D24"],
      ["Deep Blue Metallic", "#1E3157"],
    ],
  },
  Mitsubishi: {
    paints: [
      ["White Diamond", "#EEEDE8"],
      ["Black Diamond", "#131315"],
      ["Alloy Silver Metallic", "#A6A8AA"],
      ["Titanium Gray Metallic", "#5A5D60"],
      ["Red Diamond", "#9A1820"],
      ["Cosmic Blue", "#1F2C4E"],
    ],
  },
  Lexus: {
    paints: [
      ["Eminent White Pearl", "#ECEAE3"],
      ["Ultra White", "#F2F2F0"],
      ["Caviar", "#151517"],
      ["Atomic Silver", "#A6A8AA"],
      ["Cloudburst Gray", "#7C8084"],
      ["Matador Red Mica", "#8C1A22"],
      ["Nori Green Pearl", "#3D4A42"],
      ["Copper Crest", "#8F5B3E"],
    ],
  },
  Genesis: {
    paints: [
      ["Uyuni White", "#EEEDE8"],
      ["Vik Black", "#141416"],
      ["Savile Silver", "#A6A9AB"],
      ["Makalu Gray (matte)", "#77797A"],
      ["Mauna Red", "#8C1E25"],
      ["Adriatic Blue", "#25466B"],
      ["Brunswick Green", "#2E4637"],
    ],
  },
  Volvo: {
    paints: [
      ["Crystal White", "#EEEDE8"],
      ["Onyx Black", "#131315"],
      ["Silver Dawn", "#A9ABAC"],
      ["Vapour Grey", "#8C8F8F"],
      ["Thunder Grey", "#5E6163"],
      ["Denim Blue", "#3F5671"],
      ["Fusion Red", "#8A1E24"],
    ],
  },
  Dodge: {
    paints: [
      ["White Knuckle", "#EFEFEC"],
      ["Pitch Black", "#121214"],
      ["Destroyer Grey", "#5E6163"],
      ["Silver Bullet", "#A8AAAC"],
      ["Go Mango", "#E8731C"],
      ["Redline Red", "#B5121B"],
      ["Frostbite", "#1E3F8C"],
      ["Sublime", "#7FC241"],
    ],
  },
  Mini: {
    paints: [
      ["Nanuq White", "#F0EFEA"],
      ["Midnight Black", "#141416"],
      ["Melting Silver", "#A6A8AA"],
      ["Chili Red", "#B5121B"],
      ["Ocean Wave Green", "#4E7A6E"],
      ["Sunny Side Yellow", "#E9C83A"],
      ["Blazing Blue", "#1F4FA0"],
      ["Legend Grey", "#5E6163"],
    ],
    note: "Most Minis can also have a contrast roof and mirror caps.",
  },
  Fiat: {
    paints: [
      ["Ice White", "#F0F0EE"],
      ["Onyx Black", "#141416"],
      ["Mineral Grey", "#6A6D70"],
      ["Celestial Blue", "#5E8DB0"],
      ["Rose Gold", "#C9A08D"],
      ["(RED)", "#B5121B"],
    ],
  },
  Polestar: {
    paints: [
      ["Snow", "#EEEEEA"],
      ["Space", "#141416"],
      ["Magnesium", "#8C8F90"],
      ["Thunder", "#5A5D60"],
      ["Midnight", "#1E2A3E"],
      ["Jupiter", "#C7C2B6"],
    ],
  },
  Rivian: {
    paints: [
      ["Glacier White", "#EFEFEC"],
      ["Midnight", "#1C2130"],
      ["El Cap Granite", "#5E6163"],
      ["LA Silver", "#A6A8AA"],
      ["Forest Green", "#2E4A3A"],
      ["Rivian Blue", "#2F5E8C"],
      ["Launch Green", "#5C6B4A"],
      ["Red Canyon", "#8C2A22"],
    ],
  },
  Lucid: {
    paints: [
      ["Eureka Gold", "#B59A6A"],
      ["Infinite Black", "#121214"],
      ["Quantum Grey", "#6A6D70"],
      ["Stellar White", "#F0F0EE"],
      ["Zenith Red", "#8C1E25"],
      ["Cosmos Silver", "#A9ABAD"],
    ],
  },
  Infiniti: {
    paints: [
      ["Radiant White", "#EEEDE8"],
      ["Black Obsidian", "#131315"],
      ["Moonbow Blue", "#22314E"],
      ["Graphite Shadow", "#4E5054"],
      ["Liquid Platinum", "#A9ABAD"],
      ["Dynamic Sunstone Red", "#8C1A22"],
      ["Mineral Black", "#1E1F22"],
    ],
  },
  "Alfa Romeo": {
    paints: [
      ["Alfa White", "#EFEFEC"],
      ["Vulcano Black", "#141416"],
      ["Vesuvio Grey", "#5D6062"],
      ["Silverstone Grey", "#A0A3A5"],
      ["Alfa Rosso", "#B5121B"],
      ["Misano Blue", "#1F3A7A"],
      ["Montreal Green", "#2E4A3A"],
    ],
  },
  Lotus: {
    paints: [
      ["Magma Red", "#B5121B"],
      ["Hethel Yellow", "#F2C230"],
      ["Seneca Blue", "#3A6EA5"],
      ["Dark Verdant", "#2E4A3A"],
      ["Shadow Grey", "#5A5D60"],
      ["Nimbus Grey", "#A0A3A5"],
      ["Osmium Silver", "#B5B7B9"],
      ["Pure White", "#F0F0EE"],
    ],
    note: "Lotus offers more colors through its Exclusive program.",
  },
  BMW: {
    paints: [
      ["Alpine White", "#F1F1EE"],
      ["Mineral White Metallic", "#E3E2DC"],
      ["Black Sapphire Metallic", "#141518"],
      ["Brooklyn Grey Metallic", "#8A8D8E"],
      ["Skyscraper Grey Metallic", "#6F7378"],
      ["Portimao Blue Metallic", "#1E4FA0"],
      ["Aventurine Red Metallic", "#6E1D24"],
      ["Isle of Man Green Metallic", "#1E4A3A"],
    ],
    note: "BMW Individual offers many more colors at extra cost.",
  },
  "Mercedes-Benz": {
    paints: [
      ["Polar White", "#F1F1EE"],
      ["Obsidian Black Metallic", "#141517"],
      ["Iridium Silver Metallic", "#A7A9AA"],
      ["Selenite Grey Metallic", "#6A6C6E"],
      ["Graphite Grey Metallic", "#4D4F51"],
      ["Spectral Blue Metallic", "#22335A"],
      ["Patagonia Red Metallic", "#7A1B22"],
    ],
    note: "MANUFAKTUR offers extra special paints, including matte finishes.",
  },
  Audi: {
    paints: [
      ["Glacier White Metallic", "#EBEBE7"],
      ["Mythos Black Metallic", "#141416"],
      ["Florett Silver Metallic", "#A9ABAD"],
      ["Chronos Gray Metallic", "#7B7D7E"],
      ["Daytona Gray Pearl", "#57595C"],
      ["Navarra Blue Metallic", "#1F3F7A"],
      ["Tango Red Metallic", "#8A1A20"],
      ["District Green Metallic", "#40524A"],
    ],
  },
  Porsche: {
    paints: [
      ["White", "#EFEFEC"],
      ["Black", "#121212"],
      ["GT Silver Metallic", "#A8AAAB"],
      ["Ice Grey Metallic", "#8F9396"],
      ["Chalk", "#CFCDC6"],
      ["Gentian Blue Metallic", "#1E3A7A"],
      ["Carmine Red", "#A11720"],
      ["Python Green", "#6DBB34"],
    ],
    note: "Paint to Sample lets buyers order almost any color, at a high price.",
  },
  "Land Rover": {
    paints: [
      ["Fuji White", "#F0F0EE"],
      ["Santorini Black", "#141416"],
      ["Hakuba Silver", "#A8AAAB"],
      ["Eiger Grey", "#5D6062"],
      ["Carpathian Grey", "#474A4C"],
      ["Gondwana Stone", "#9C9784"],
      ["Lantau Bronze", "#6F5E4C"],
      ["Tasman Blue", "#2B4462"],
    ],
    note: "SV Bespoke offers custom colors.",
  },
  Maserati: {
    paints: [
      ["Bianco Alpi", "#EFEEE9"],
      ["Nero Ribelle", "#141416"],
      ["Grigio Lava", "#575A5D"],
      ["Grigio Mistral", "#8A8D8F"],
      ["Blu Emozione", "#1F3A6E"],
      ["Rosso Folgore", "#9D1A22"],
      ["Giallo Corse", "#E3B51C"],
    ],
    note: "Fuoriserie personalization offers custom colors.",
  },
  "Aston Martin": {
    paints: [
      ["Lunar White", "#EDEDE8"],
      ["Onyx Black", "#141414"],
      ["Magnetic Silver", "#8F9294"],
      ["Xenon Grey", "#5D6062"],
      ["Aston Martin Racing Green", "#1F3A2E"],
      ["Hyper Red", "#A1141E"],
      ["Cosmos Orange", "#D95A1E"],
    ],
    note: "Q by Aston Martin offers custom colors.",
  },
  Bentley: {
    paints: [
      ["Glacier White", "#F0EFEA"],
      ["Onyx", "#121214"],
      ["Moonbeam", "#B0B2B3"],
      ["Cricket Ball", "#6A1A22"],
      ["Verdant", "#2E4A3A"],
      ["Dark Sapphire", "#1E2B4C"],
    ],
    note: "Mulliner offers dozens more colors, or any custom shade.",
  },
  "Rolls-Royce": {
    paints: [
      ["Arctic White", "#F1F1EE"],
      ["English White", "#EAE6DA"],
      ["Diamond Black", "#141416"],
      ["Jubilee Silver", "#ADB0B2"],
      ["Darkest Tungsten", "#3A3C3E"],
      ["Salamanca Blue", "#1F2C4A"],
    ],
    note: "Bespoke commissions can be painted virtually any color.",
  },
  Ferrari: {
    paints: [
      ["Rosso Corsa", "#C8102E"],
      ["Giallo Modena", "#F2C230"],
      ["Bianco Avus", "#EFEFEC"],
      ["Nero Daytona", "#121214"],
      ["Argento Nürburgring", "#A6A9AB"],
      ["Grigio Silverstone", "#6F7377"],
      ["Blu Pozzi", "#1F3266"],
    ],
    note: "Tailor Made lets buyers choose nearly any color.",
  },
  Lamborghini: {
    paints: [
      ["Giallo Inti", "#F5C518"],
      ["Verde Mantis", "#6CC24A"],
      ["Arancio Borealis", "#F26B21"],
      ["Bianco Monocerus", "#EFEFEC"],
      ["Nero Noctis", "#121214"],
      ["Grigio Telesto", "#6E7174"],
      ["Blu Cepheus", "#1F3B7A"],
      ["Rosso Mars", "#B5121B"],
    ],
    note: "Ad Personam offers hundreds of custom colors.",
  },
  McLaren: {
    paints: [
      ["Papaya Spark", "#F07A1C"],
      ["Silica White", "#EFEFEC"],
      ["Onyx Black", "#121214"],
      ["Magnesium Silver", "#A6A8AA"],
      ["Ludus Blue", "#1E4FA3"],
      ["Amaranth Red", "#8C1A2B"],
      ["Napier Green", "#1E3E30"],
    ],
    note: "McLaren Special Operations (MSO) offers custom colors.",
  },
};

/** Models whose palette differs a lot from the rest of the brand. */
const MODEL_PAINTS: Record<string, { paints: Paint[]; note?: string }> = {
  "jeep-wrangler": {
    paints: [
      ["Bright White", "#F2F2F0"],
      ["Black", "#131313"],
      ["Silver Zynith", "#A9ABAD"],
      ["Granite Crystal Metallic", "#4A4C50"],
      ["Earl", "#8A8F8A"],
      ["Firecracker Red", "#C1121F"],
      ["Hydro Blue Pearl", "#2F6FA0"],
      ["Sarge Green", "#5A5C47"],
      ["Mojito!", "#9CC33B"],
    ],
    note: "Jeep often adds limited-run colors each year.",
  },
  "ford-bronco": {
    paints: [
      ["Oxford White", "#F1F1EE"],
      ["Shadow Black", "#141414"],
      ["Carbonized Gray Metallic", "#4C4F53"],
      ["Cactus Gray", "#8A9187"],
      ["Azure Gray Metallic", "#7C8A92"],
      ["Desert Sand", "#C8B28B"],
      ["Eruption Green Metallic", "#4C5B4A"],
      ["Race Red", "#C8102E"],
      ["Velocity Blue Metallic", "#1C5BA8"],
    ],
  },
  "ford-mustang": {
    paints: [
      ["Oxford White", "#F1F1EE"],
      ["Shadow Black", "#141414"],
      ["Iconic Silver Metallic", "#A3A6A9"],
      ["Carbonized Gray Metallic", "#4C4F53"],
      ["Race Red", "#C8102E"],
      ["Rapid Red Metallic", "#8A1A1F"],
      ["Grabber Blue", "#1F78C8"],
      ["Vapor Blue Metallic", "#8FA4B4"],
      ["Yellow Splash", "#E8C21C"],
    ],
  },
  "tesla-cybertruck": {
    paints: [["Brushed stainless steel", "#B9BCBE"]],
    note: "The body is unpainted stainless steel. Color comes from optional factory or aftermarket wraps.",
  },
};
MODEL_PAINTS["jeep-gladiator"] = MODEL_PAINTS["jeep-wrangler"];

/** Groups a paint into a broad color family from its swatch. */
function familyOf(name: string, hex: string): ColorFamily {
  // The paint name is the best guide when it names a color.
  const n = name.toLowerCase();
  const named: [RegExp, ColorFamily][] = [
    [/white|bianco|chalk/, "white"],
    [/black|nero|onyx|obsidian|caviar|ebony/, "black"],
    [/green|verde|mojito/, "green"],
    [/blue|blu\b|azure|sapphire/, "blue"],
    [/red|rosso|ember|cinnabar|burgundy|cricket ball/, "red"],
    [/yellow|giallo/, "yellow"],
    [/orange|arancio|papaya|tiger eye/, "orange"],
    [/gray|grey|grigio|graphite|tungsten|carbon|lava|\bearl\b/, "gray"],
    [/bronze|sand|stone|copper|quartz/, "brown"],
    [/stainless|silver|argento|zynith|billet|jubilee|moonbeam|florett|iridium|radiance|mist/, "silver"],
  ];
  for (const [pattern, family] of named) if (pattern.test(n)) return family;
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const light = (max + min) / 2;
  const sat = max === min ? 0 : (max - min) / (1 - Math.abs(2 * light - 1));
  if (sat < 0.18 || max - min < 0.06) {
    if (light > 0.85) return "white";
    if (light < 0.16) return "black";
    if (light > 0.6) return "silver";
    return "gray";
  }
  let hue = 0;
  if (max === r) hue = ((g - b) / (max - min)) % 6;
  else if (max === g) hue = (b - r) / (max - min) + 2;
  else hue = (r - g) / (max - min) + 4;
  hue = (hue * 60 + 360) % 360;
  if (hue < 15 || hue >= 330) return "red";
  if (hue < 40) return light < 0.35 ? "brown" : "orange";
  if (hue < 65) return light < 0.45 ? "brown" : "yellow";
  if (hue < 170) return "green";
  if (hue < 260) return "blue";
  return "red";
}

const toSwatches = (paints: Paint[]): Swatch[] =>
  paints.map(([name, hex]) => ({ name, hex, family: familyOf(name, hex) }));

export const FAMILY_LABELS: Record<ColorFamily, string> = {
  white: "White",
  black: "Black",
  gray: "Gray",
  silver: "Silver",
  red: "Red",
  orange: "Orange",
  yellow: "Yellow",
  green: "Green",
  blue: "Blue",
  brown: "Brown or tan",
};
const FAMILY_ORDER = Object.keys(FAMILY_LABELS) as ColorFamily[];

export function paletteFor(car: Pick<Car, "id" | "make">): Palette | null {
  const own = MODEL_PAINTS[car.id];
  const source = own ?? BRAND_PAINTS[car.make];
  if (!source) return null;
  return { colors: toSwatches(source.paints), note: source.note, modelSpecific: !!own };
}

/** The broad color families a car comes in, in a fixed order. */
export function familiesFor(car: Pick<Car, "id" | "make">): ColorFamily[] {
  const palette = paletteFor(car);
  if (!palette) return [];
  const found = new Set(palette.colors.map((c) => c.family));
  return FAMILY_ORDER.filter((f) => found.has(f));
}

/** Every brand with a palette, for checks. */
export const BRANDS_WITH_COLORS = Object.keys(BRAND_PAINTS);
