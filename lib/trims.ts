// Main trims for every model in lib/cars.ts, cheapest first.
//
// Figures are approximate 2025 US values for planning: starting price before
// destination fees, engine or motor, horsepower, EPA-style MPG or EV range, and
// drivetrain. Specs and equipment change by year and package, so always confirm
// with a dealer. A few low-volume models are sold in only one trim and are
// listed that way rather than padded with made-up variants.
//
// Row: [name, new price, engine or motor, hp, economy, drivetrain, feature codes, highlights]
// Feature codes (available on that trim, including as an option):
//   a = AWD/4WD, c = CarPlay/Android Auto, r = adaptive cruise,
//   b = blind-spot monitoring, h = heated seats, s = sunroof/glass roof

export type TrimRow = [string, number, string, number, string, string, string, string];

export const TRIM_DATA: Record<string, TrimRow[]> = {
  // Sedans
  "toyota-corolla": [
    ["LE", 22500, "2.0L I4", 169, "35 mpg", "FWD", "crb", "Toyota Safety Sense, 8-in touchscreen"],
    ["SE", 24500, "2.0L I4", 169, "34 mpg", "FWD", "crbh", "Sport styling, 18-in wheels"],
    ["XSE", 28500, "2.0L I4", 169, "33 mpg", "FWD", "crbhs", "SofTex seats, premium audio option"],
  ],
  "honda-civic": [
    ["LX", 24500, "2.0L I4", 150, "36 mpg", "FWD", "crb", "Honda Sensing, 7-in touchscreen"],
    ["Sport", 26500, "2.0L I4", 150, "33 mpg", "FWD", "crb", "18-in wheels, sport pedals"],
    ["Si", 30000, "1.5L turbo I4", 200, "31 mpg", "FWD", "crbs", "6-speed manual, limited-slip differential"],
  ],
  "hyundai-elantra": [
    ["SE", 22000, "2.0L I4", 147, "37 mpg", "FWD", "cb", "8-in touchscreen, lane-keep assist"],
    ["SEL Sport", 24500, "2.0L I4", 147, "34 mpg", "FWD", "crbh", "17-in wheels, dual-zone climate"],
    ["Limited", 28500, "2.0L I4", 147, "34 mpg", "FWD", "crbhs", "Leather seats, Bose audio"],
    ["N Line", 30000, "1.6L turbo I4", 201, "28 mpg", "FWD", "crbhs", "Sport suspension, sport seats"],
  ],
  "toyota-camry": [
    ["LE", 29000, "2.5L hybrid I4", 225, "51 mpg", "FWD or AWD", "acrb", "Toyota Safety Sense, 8-in touchscreen"],
    ["SE", 31500, "2.5L hybrid I4", 225, "47 mpg", "FWD or AWD", "acrbh", "Sport suspension, 18-in wheels"],
    ["XLE", 34000, "2.5L hybrid I4", 225, "47 mpg", "FWD or AWD", "acrbhs", "Leather seats, 12.3-in touchscreen"],
    ["XSE", 36000, "2.5L hybrid I4", 225, "44 mpg", "FWD or AWD", "acrbhs", "19-in wheels, two-tone paint option"],
  ],
  "honda-accord": [
    ["LX", 28500, "1.5L turbo I4", 192, "32 mpg", "FWD", "crb", "Honda Sensing, 7-in touchscreen"],
    ["EX", 31000, "1.5L turbo I4", 192, "32 mpg", "FWD", "crbhs", "Moonroof, power driver's seat"],
  ],
  "tesla-model-3": [
    ["Long Range RWD", 42500, "Single electric motor", 287, "363 mi range", "RWD", "rbhs", "15.4-in touchscreen, glass roof"],
    ["Long Range AWD", 48000, "Dual electric motors", 394, "346 mi range", "AWD", "arbhs", "Dual motors, heated rear seats"],
    ["Performance", 55000, "Dual electric motors", 510, "303 mi range", "AWD", "arbhs", "Adaptive suspension, 20-in wheels"],
  ],
  "bmw-3-series": [
    ["330i", 45500, "2.0L turbo I4", 255, "30 mpg", "RWD", "crbhs", "Curved display, power seats"],
    ["330i xDrive", 47500, "2.0L turbo I4", 255, "29 mpg", "AWD", "acrbhs", "xDrive AWD, curved display"],
    ["M340i", 58500, "3.0L turbo I6", 386, "26 mpg", "RWD or AWD", "acrbhs", "M Sport suspension, mild-hybrid boost"],
  ],

  // Hatchbacks & wagons
  "toyota-prius": [
    ["LE", 28500, "2.0L hybrid I4", 194, "57 mpg", "FWD or AWD", "acrb", "Toyota Safety Sense, 8-in touchscreen"],
    ["XLE", 32000, "2.0L hybrid I4", 194, "52 mpg", "FWD or AWD", "acrbhs", "19-in wheels, SofTex seats"],
    ["Limited", 36000, "2.0L hybrid I4", 194, "52 mpg", "FWD or AWD", "acrbhs", "12.3-in touchscreen, JBL audio"],
  ],
  "mazda-mazda3-hatchback": [
    ["2.5 S", 25000, "2.5L I4", 191, "31 mpg", "FWD or AWD", "acrb", "i-Activsense safety suite, 10-in display"],
    ["2.5 S Premium", 29500, "2.5L I4", 191, "30 mpg", "FWD or AWD", "acrbhs", "Leather seats, Bose audio"],
    ["2.5 Turbo Premium Plus", 37500, "2.5L turbo I4", 250, "26 mpg", "AWD", "acrbhs", "Heads-up display, 360-degree camera"],
  ],
  "volkswagen-golf-gti": [
    ["S", 32500, "2.0L turbo I4", 241, "28 mpg", "FWD", "crb", "Plaid seats, 10.4-in touchscreen"],
    ["SE", 38000, "2.0L turbo I4", 241, "28 mpg", "FWD", "crbhs", "Panoramic sunroof, keyless access"],
    ["Autobahn", 41000, "2.0L turbo I4", 241, "28 mpg", "FWD", "crbhs", "Leather seats, adaptive dampers"],
  ],
  "nissan-leaf": [
    ["S", 28500, "Single electric motor", 147, "149 mi range", "FWD", "cb", "40 kWh battery, e-Pedal"],
    ["SV Plus", 36000, "Single electric motor", 214, "212 mi range", "FWD", "crbh", "60 kWh battery, 8-in touchscreen"],
  ],
  "subaru-outback": [
    ["Base", 29500, "2.5L flat-4", 182, "28 mpg", "AWD", "acrb", "EyeSight, standard AWD"],
    ["Premium", 31500, "2.5L flat-4", 182, "28 mpg", "AWD", "acrbh", "11.6-in touchscreen, roof rails"],
    ["Limited", 38000, "2.5L flat-4", 182, "28 mpg", "AWD", "acrbhs", "Leather seats, Harman Kardon audio"],
    ["Touring XT", 42500, "2.4L turbo flat-4", 260, "26 mpg", "AWD", "acrbhs", "Nappa leather, cooled front seats"],
  ],

  // Small & midsize SUVs
  "chevrolet-trax": [
    ["LS", 21500, "1.2L turbo I3", 137, "30 mpg", "FWD", "cb", "8-in touchscreen, automatic braking"],
    ["LT", 23500, "1.2L turbo I3", 137, "30 mpg", "FWD", "crb", "11-in touchscreen, remote start"],
    ["RS", 25000, "1.2L turbo I3", 137, "30 mpg", "FWD", "crbhs", "Sport styling, 19-in wheels"],
  ],
  "honda-hr-v": [
    ["LX", 25500, "2.0L I4", 158, "28 mpg", "FWD or AWD", "acrb", "Honda Sensing, 7-in touchscreen"],
    ["Sport", 27500, "2.0L I4", 158, "27 mpg", "FWD or AWD", "acrb", "9-in touchscreen, 18-in wheels"],
    ["EX-L", 29500, "2.0L I4", 158, "27 mpg", "FWD or AWD", "acrbhs", "Leather seats, moonroof"],
  ],
  "honda-cr-v": [
    ["LX", 30500, "1.5L turbo I4", 190, "30 mpg", "FWD or AWD", "acrb", "Honda Sensing, 7-in touchscreen"],
    ["EX", 32500, "1.5L turbo I4", 190, "30 mpg", "FWD or AWD", "acrbhs", "Moonroof, dual-zone climate"],
    ["EX-L", 35000, "1.5L turbo I4", 190, "29 mpg", "FWD or AWD", "acrbhs", "Leather seats, power tailgate"],
  ],
  "toyota-rav4-hybrid": [
    ["LE", 33000, "2.5L hybrid I4", 219, "39 mpg", "AWD", "acrb", "Toyota Safety Sense, electric AWD"],
    ["XLE", 35000, "2.5L hybrid I4", 219, "40 mpg", "AWD", "acrbh", "Dual-zone climate, roof rails"],
    ["XSE", 39000, "2.5L hybrid I4", 219, "39 mpg", "AWD", "acrbhs", "Sport suspension, two-tone paint"],
    ["Limited", 41500, "2.5L hybrid I4", 219, "38 mpg", "AWD", "acrbhs", "SofTex seats, 10.5-in touchscreen"],
  ],
  "toyota-rav4-plug-in-hybrid": [
    ["SE", 43500, "2.5L plug-in hybrid I4", 302, "42 mi electric / 38 mpg", "AWD", "acrbh", "Heated front seats, 8-in touchscreen"],
    ["XSE", 48000, "2.5L plug-in hybrid I4", 302, "42 mi electric / 38 mpg", "AWD", "acrbhs", "Sunroof, 10.5-in touchscreen"],
  ],
  "mazda-cx-5": [
    ["2.5 S", 29500, "2.5L I4", 187, "28 mpg", "AWD", "acrb", "Standard AWD, 10.25-in display"],
    ["2.5 S Preferred", 31000, "2.5L I4", 187, "27 mpg", "AWD", "acrbh", "Leatherette seats, power driver's seat"],
    ["2.5 S Premium", 33000, "2.5L I4", 187, "27 mpg", "AWD", "acrbhs", "Moonroof, Bose audio"],
    ["2.5 Turbo Signature", 41500, "2.5L turbo I4", 256, "24 mpg", "AWD", "acrbhs", "Nappa leather, 360-degree camera"],
  ],
  "subaru-forester": [
    ["Base", 30000, "2.5L flat-4", 180, "29 mpg", "AWD", "acrb", "EyeSight, standard AWD"],
    ["Premium", 32000, "2.5L flat-4", 180, "29 mpg", "AWD", "acrbhs", "Panoramic moonroof, 11.6-in touchscreen"],
    ["Limited", 35500, "2.5L flat-4", 180, "29 mpg", "AWD", "acrbhs", "Leather seats, power tailgate"],
    ["Touring", 38000, "2.5L flat-4", 180, "28 mpg", "AWD", "acrbhs", "Nappa leather, Harman Kardon audio"],
  ],
  "hyundai-tucson": [
    ["SE", 29000, "2.5L I4", 187, "28 mpg", "FWD or AWD", "acrb", "SmartSense safety, 8-in touchscreen"],
    ["SEL", 31000, "2.5L I4", 187, "28 mpg", "FWD or AWD", "acrbh", "Dual-zone climate, power driver's seat"],
    ["N Line", 35000, "2.5L I4", 187, "26 mpg", "FWD or AWD", "acrbhs", "Sport styling, panoramic sunroof"],
    ["Limited", 39500, "2.5L I4", 187, "26 mpg", "AWD", "acrbhs", "Leather seats, Bose audio"],
  ],
  "jeep-wrangler": [
    ["Sport", 33000, "3.6L V6", 285, "20 mpg", "4WD", "ac", "Removable top, Command-Trac 4x4"],
    ["Sport S", 36000, "3.6L V6", 285, "20 mpg", "4WD", "acbh", "Power windows, remote keyless entry"],
    ["Rubicon", 46000, "3.6L V6", 285, "19 mpg", "4WD", "acrbh", "Locking differentials, disconnecting sway bar"],
  ],
  "ford-bronco": [
    ["Big Bend", 40000, "2.3L turbo I4", 300, "20 mpg", "4WD", "acb", "Removable roof and doors, GOAT Modes"],
    ["Outer Banks", 47000, "2.3L turbo I4", 300, "20 mpg", "4WD", "acbh", "Leather-trimmed seats, body-color top"],
    ["Badlands", 50000, "2.3L turbo I4", 300, "18 mpg", "4WD", "acrbh", "Locking differentials, disconnecting sway bar"],
  ],
  "toyota-4runner": [
    ["SR5", 41000, "2.4L turbo I4", 278, "22 mpg", "RWD or 4WD", "acrb", "Toyota Safety Sense, 8-in touchscreen"],
    ["TRD Off-Road", 48000, "2.4L turbo I4", 278, "21 mpg", "RWD or 4WD", "acrbh", "Locking rear differential, crawl control"],
    ["Limited", 56000, "2.4L turbo I4", 278, "21 mpg", "RWD or 4WD", "acrbhs", "Leather seats, JBL audio"],
  ],

  // Three-row SUVs
  "ford-explorer": [
    ["Active", 40500, "2.3L turbo I4", 300, "24 mpg", "RWD or AWD", "acrb", "13.2-in touchscreen, Co-Pilot360"],
    ["ST-Line", 45000, "2.3L turbo I4", 300, "24 mpg", "RWD or AWD", "acrbhs", "Sport styling, 20-in wheels"],
    ["Platinum", 53500, "2.3L turbo I4", 300, "23 mpg", "AWD", "acrbhs", "Leather seats, massaging front seats"],
    ["ST", 54000, "3.0L turbo V6", 400, "20 mpg", "AWD", "acrbhs", "Performance suspension, Brembo brakes"],
  ],
  "honda-pilot": [
    ["Sport", 41000, "3.5L V6", 285, "22 mpg", "FWD or AWD", "acrb", "Honda Sensing, 9-in touchscreen"],
    ["EX-L", 44500, "3.5L V6", 285, "22 mpg", "FWD or AWD", "acrbhs", "Leather seats, moonroof"],
    ["TrailSport", 51000, "3.5L V6", 285, "20 mpg", "AWD", "acrbhs", "Off-road suspension, all-terrain tires"],
    ["Elite", 54000, "3.5L V6", 285, "21 mpg", "AWD", "acrbhs", "Panoramic roof, ventilated seats"],
  ],
  "toyota-highlander": [
    ["LE", 40000, "2.4L turbo I4", 265, "25 mpg", "FWD or AWD", "acrb", "Toyota Safety Sense, 12.3-in touchscreen"],
    ["XLE", 44000, "2.4L turbo I4", 265, "25 mpg", "FWD or AWD", "acrbhs", "Moonroof, SofTex seats"],
    ["Limited", 49000, "2.4L turbo I4", 265, "24 mpg", "FWD or AWD", "acrbhs", "Leather seats, JBL audio"],
    ["Platinum", 52500, "2.4L turbo I4", 265, "24 mpg", "AWD", "acrbhs", "Panoramic roof, heads-up display"],
  ],
  "kia-telluride": [
    ["LX", 36500, "3.8L V6", 291, "21 mpg", "FWD or AWD", "acrb", "Drive Wise safety, 12.3-in touchscreen"],
    ["S", 39000, "3.8L V6", 291, "21 mpg", "FWD or AWD", "acrbhs", "Power sunroof, heated front seats"],
    ["EX", 43000, "3.8L V6", 291, "21 mpg", "FWD or AWD", "acrbhs", "Leatherette seats, ventilated front seats"],
    ["SX", 47500, "3.8L V6", 291, "20 mpg", "FWD or AWD", "acrbhs", "Dual sunroofs, Harman Kardon audio"],
  ],
  "chevrolet-tahoe": [
    ["LS", 59000, "5.3L V8", 355, "17 mpg", "RWD or 4WD", "acrb", "17.7-in touchscreen, 8,400 lb max towing"],
    ["Z71", 69000, "5.3L V8", 355, "16 mpg", "4WD", "acrbh", "Off-road suspension, skid plates"],
    ["Premier", 72000, "5.3L V8", 355, "17 mpg", "RWD or 4WD", "acrbhs", "Leather seats, Bose audio"],
    ["High Country", 80000, "6.2L V8", 420, "15 mpg", "RWD or 4WD", "acrbhs", "Air suspension, ventilated seats"],
  ],

  // Electric SUVs
  "tesla-model-y": [
    ["Long Range RWD", 45000, "Single electric motor", 295, "357 mi range", "RWD", "rbhs", "15.4-in touchscreen, glass roof"],
    ["Long Range AWD", 48500, "Dual electric motors", 384, "327 mi range", "AWD", "arbhs", "Dual motors, heated and cooled seats"],
    ["Performance", 61000, "Dual electric motors", 460, "306 mi range", "AWD", "arbhs", "Adaptive suspension, sport seats"],
  ],
  "hyundai-ioniq-5": [
    ["SE Standard Range", 43000, "Single electric motor", 168, "245 mi range", "RWD", "crb", "12.3-in displays, fast charging"],
    ["SE", 46500, "Single or dual electric motors", 225, "318 mi range", "RWD or AWD", "acrbh", "Larger battery, heated front seats"],
    ["SEL", 49500, "Single or dual electric motors", 225, "318 mi range", "RWD or AWD", "acrbhs", "Power tailgate, wireless charging"],
    ["Limited", 54000, "Single or dual electric motors", 225, "318 mi range", "RWD or AWD", "acrbhs", "Vision roof, Bose audio"],
  ],
  "chevrolet-equinox-ev": [
    ["LT", 35000, "Single or dual electric motors", 213, "319 mi range", "FWD or AWD", "arb", "17.7-in touchscreen, Super Cruise available"],
    ["RS", 43000, "Single or dual electric motors", 213, "319 mi range", "FWD or AWD", "arbhs", "Sport styling, panoramic roof"],
  ],
  "ford-mustang-mach-e": [
    ["Select", 40000, "Single or dual electric motors", 264, "260 mi range", "RWD or AWD", "acrbh", "15.5-in touchscreen, Co-Pilot360"],
    ["Premium", 43000, "Single or dual electric motors", 264, "300 mi range", "RWD or AWD", "acrbhs", "Glass roof, Bang & Olufsen audio"],
    ["GT", 54000, "Dual electric motors", 480, "280 mi range", "AWD", "acrbhs", "MagneRide suspension, Brembo brakes"],
  ],
  "kia-ev9": [
    ["Light", 55000, "Single electric motor", 215, "230 mi range", "RWD", "crb", "Dual 12.3-in displays, three rows"],
    ["Wind", 65000, "Dual electric motors", 379, "280 mi range", "AWD", "acrbh", "Long-range battery, 5,000 lb towing"],
    ["GT-Line", 74000, "Dual electric motors", 379, "270 mi range", "AWD", "acrbhs", "Dual sunroofs, Highway Driving Assist 2"],
  ],

  // Minivans
  "honda-odyssey": [
    ["EX-L", 39500, "3.5L V6", 280, "22 mpg", "FWD", "crbhs", "Leather seats, Magic Slide second row"],
    ["Sport-L", 45000, "3.5L V6", 280, "22 mpg", "FWD", "crbhs", "Black styling, 19-in wheels"],
    ["Touring", 48000, "3.5L V6", 280, "22 mpg", "FWD", "crbhs", "Rear entertainment, CabinWatch camera"],
    ["Elite", 52500, "3.5L V6", 280, "22 mpg", "FWD", "crbhs", "Ventilated seats, premium audio"],
  ],
  "toyota-sienna": [
    ["LE", 39500, "2.5L hybrid I4", 245, "36 mpg", "FWD or AWD", "acrb", "Toyota Safety Sense, power sliding doors"],
    ["XLE", 44000, "2.5L hybrid I4", 245, "36 mpg", "FWD or AWD", "acrbhs", "Moonroof, SofTex seats"],
    ["XSE", 46000, "2.5L hybrid I4", 245, "35 mpg", "FWD or AWD", "acrbhs", "Sport styling, 20-in wheels"],
    ["Platinum", 55000, "2.5L hybrid I4", 245, "35 mpg", "FWD or AWD", "acrbhs", "Reclining ottoman seats, JBL audio"],
  ],
  "chrysler-pacifica-plug-in-hybrid": [
    ["Select", 51000, "3.6L plug-in hybrid V6", 260, "32 mi electric / 30 mpg", "FWD", "crbhs", "Leather seats, 10.1-in touchscreen"],
    ["Pinnacle", 60000, "3.6L plug-in hybrid V6", 260, "32 mi electric / 30 mpg", "FWD", "crbhs", "Quilted Nappa leather, rear entertainment"],
  ],
  "kia-carnival": [
    ["LX", 36500, "3.5L V6", 287, "22 mpg", "FWD", "crb", "Dual power sliding doors, 12.3-in touchscreen"],
    ["EX", 39000, "3.5L V6", 287, "22 mpg", "FWD", "crbhs", "Heated front seats, power tailgate"],
    ["SX", 44000, "3.5L V6", 287, "21 mpg", "FWD", "crbhs", "Leather seats, dual sunroofs"],
    ["SX Prestige", 49500, "3.5L V6", 287, "21 mpg", "FWD", "crbhs", "VIP lounge seats, Bose audio"],
  ],

  // Pickup trucks
  "ford-maverick": [
    ["XL", 28500, "2.5L hybrid I4", 191, "37 mpg", "FWD or AWD", "acb", "4.5-ft bed, Co-Pilot360"],
    ["XLT", 31000, "2.5L hybrid I4", 191, "37 mpg", "FWD or AWD", "acrbh", "13.2-in touchscreen, keyless entry"],
    ["Lariat", 37000, "2.5L hybrid I4", 191, "37 mpg", "FWD or AWD", "acrbh", "Leather-trimmed seats, power driver's seat"],
  ],
  "toyota-tacoma": [
    ["SR", 32500, "2.4L turbo I4", 228, "21 mpg", "RWD or 4WD", "acrb", "Toyota Safety Sense, 8-in touchscreen"],
    ["TRD Sport", 40000, "2.4L turbo I4", 278, "21 mpg", "RWD or 4WD", "acrbh", "Sport suspension, 18-in wheels"],
    ["TRD Off-Road", 44000, "2.4L turbo I4", 278, "20 mpg", "RWD or 4WD", "acrbhs", "Locking rear differential, Bilstein shocks"],
    ["Limited", 52000, "2.4L turbo I4", 278, "20 mpg", "RWD or 4WD", "acrbhs", "Leather seats, JBL audio"],
  ],
  "ford-f-150": [
    ["XL", 39500, "2.7L turbo V6", 325, "22 mpg", "RWD or 4WD", "acrb", "Pro Trailer Backup Assist available, 12-in touchscreen"],
    ["XLT", 46000, "2.7L turbo V6", 325, "22 mpg", "RWD or 4WD", "acrbh", "Crew cab available, remote start"],
    ["Lariat", 60000, "5.0L V8", 400, "19 mpg", "RWD or 4WD", "acrbhs", "Leather seats, power tailgate"],
    ["Platinum", 68000, "5.0L V8", 400, "19 mpg", "4WD", "acrbhs", "Massaging seats, Bang & Olufsen audio"],
  ],
  "chevrolet-silverado-1500": [
    ["WT", 38000, "2.7L turbo I4", 310, "20 mpg", "RWD or 4WD", "acb", "Work-ready interior, 7-in touchscreen"],
    ["LT", 49000, "5.3L V8", 355, "18 mpg", "RWD or 4WD", "acrbh", "13.4-in touchscreen, remote start"],
    ["Trail Boss", 55000, "5.3L V8", 355, "17 mpg", "4WD", "acrbh", "2-in factory lift, Z71 off-road package"],
    ["LTZ", 58000, "5.3L V8", 355, "18 mpg", "RWD or 4WD", "acrbhs", "Leather seats, multi-flex tailgate"],
  ],

  // Coupes & sports cars
  "ford-mustang": [
    ["EcoBoost", 33000, "2.3L turbo I4", 315, "22 mpg", "RWD", "crb", "13.2-in touchscreen, drive modes"],
    ["GT", 43000, "5.0L V8", 480, "18 mpg", "RWD", "crbh", "Manual or automatic, limited-slip differential"],
    ["Dark Horse", 64000, "5.0L V8", 500, "17 mpg", "RWD", "crbh", "Track-tuned suspension, Tremec manual"],
  ],
  "mazda-mx-5-miata": [
    ["Sport", 29500, "2.0L I4", 181, "30 mpg", "RWD", "cb", "Soft top, 6-speed manual"],
    ["Club", 33000, "2.0L I4", 181, "29 mpg", "RWD", "crb", "Limited-slip differential, Bose audio"],
    ["Grand Touring", 36000, "2.0L I4", 181, "29 mpg", "RWD", "crbh", "Leather seats, adaptive headlights"],
  ],

  // More mainstream brands
  "nissan-versa": [
    ["S", 18000, "1.6L I4", 122, "35 mpg", "FWD", "cb", "Automatic emergency braking, 7-in touchscreen"],
    ["SV", 20500, "1.6L I4", 122, "35 mpg", "FWD", "crb", "8-in touchscreen, alloy wheels"],
    ["SR", 21500, "1.6L I4", 122, "34 mpg", "FWD", "crbh", "Sport styling, heated front seats"],
  ],
  "nissan-rogue": [
    ["S", 29500, "1.5L turbo I3", 201, "33 mpg", "FWD or AWD", "acrb", "Safety Shield 360, 8-in touchscreen"],
    ["SV", 31000, "1.5L turbo I3", 201, "33 mpg", "FWD or AWD", "acrbh", "ProPILOT Assist, remote start"],
    ["SL", 37000, "1.5L turbo I3", 201, "32 mpg", "FWD or AWD", "acrbhs", "Leather seats, panoramic moonroof"],
    ["Platinum", 40000, "1.5L turbo I3", 201, "31 mpg", "FWD or AWD", "acrbhs", "Quilted leather, Bose audio"],
  ],
  "mitsubishi-mirage": [
    ["ES", 17500, "1.2L I3", 78, "39 mpg", "FWD", "c", "7-in touchscreen, forward collision mitigation"],
    ["LE", 18500, "1.2L I3", 78, "39 mpg", "FWD", "c", "Black styling, alloy wheels"],
    ["SE", 19500, "1.2L I3", 78, "39 mpg", "FWD", "c", "Keyless entry, automatic climate"],
  ],
  "mitsubishi-eclipse-cross": [
    ["ES", 27500, "1.5L turbo I4", 152, "26 mpg", "AWD", "ab", "Super All-Wheel Control, 8-in touchscreen"],
    ["SE", 29000, "1.5L turbo I4", 152, "26 mpg", "AWD", "acbh", "Heated front seats, 18-in wheels"],
    ["SEL", 31500, "1.5L turbo I4", 152, "25 mpg", "AWD", "acrbhs", "Leather seats, panoramic sunroof"],
  ],
  "mitsubishi-outlander": [
    ["ES", 29500, "2.5L I4", 181, "26 mpg", "FWD or AWD", "acrb", "Three rows, 8-in touchscreen"],
    ["SE", 33000, "2.5L I4", 181, "26 mpg", "FWD or AWD", "acrbhs", "12.3-in touchscreen, heated seats"],
    ["SEL", 36000, "2.5L I4", 181, "25 mpg", "FWD or AWD", "acrbhs", "Leather seats, Bose audio"],
  ],
  "mitsubishi-outlander-phev": [
    ["ES", 41000, "2.4L plug-in hybrid I4", 248, "38 mi electric / 26 mpg", "AWD", "acrb", "Three rows, DC fast charging"],
    ["SEL", 48000, "2.4L plug-in hybrid I4", 248, "38 mi electric / 26 mpg", "AWD", "acrbhs", "Leather seats, Bose audio"],
  ],
  "kia-k4": [
    ["LX", 22500, "2.0L I4", 147, "34 mpg", "FWD", "crb", "Dual 12.3-in displays, Drive Wise safety"],
    ["EX", 24500, "2.0L I4", 147, "33 mpg", "FWD", "crbh", "Heated front seats, 17-in wheels"],
    ["GT-Line", 26000, "2.0L I4", 147, "32 mpg", "FWD", "crbhs", "Sport styling, power sunroof"],
    ["GT-Line Turbo", 28500, "1.6L turbo I4", 190, "30 mpg", "FWD", "crbhs", "Multi-link rear suspension, sport seats"],
  ],
  "kia-sportage": [
    ["LX", 28500, "2.5L I4", 187, "28 mpg", "FWD or AWD", "acrb", "Drive Wise safety, 12.3-in touchscreen"],
    ["EX", 30500, "2.5L I4", 187, "28 mpg", "FWD or AWD", "acrbh", "Heated front seats, wireless charging"],
    ["SX", 33000, "2.5L I4", 187, "27 mpg", "FWD or AWD", "acrbhs", "Panoramic sunroof, power tailgate"],
    ["X-Pro", 38500, "2.5L I4", 187, "25 mpg", "AWD", "acrbhs", "All-terrain tires, Harman Kardon audio"],
  ],
  "hyundai-venue": [
    ["SE", 20500, "1.6L I4", 121, "31 mpg", "FWD", "cb", "8-in touchscreen, lane-keep assist"],
    ["SEL", 22500, "1.6L I4", 121, "31 mpg", "FWD", "cbhs", "Sunroof option, heated front seats"],
    ["Limited", 24000, "1.6L I4", 121, "31 mpg", "FWD", "cbhs", "Black two-tone roof, rear disc brakes"],
  ],
  "hyundai-santa-fe": [
    ["SE", 34500, "2.5L I4", 190, "25 mpg", "FWD or AWD", "acrb", "Three rows, dual 12.3-in displays"],
    ["SEL", 37000, "2.5L I4", 190, "25 mpg", "FWD or AWD", "acrbh", "Heated front seats, power tailgate"],
    ["XRT", 42500, "2.5L turbo I4", 277, "21 mpg", "AWD", "acrbhs", "All-terrain tires, higher ride height"],
    ["Calligraphy", 48000, "2.5L turbo I4", 277, "22 mpg", "FWD or AWD", "acrbhs", "Nappa leather, Bose audio"],
  ],
  "hyundai-palisade": [
    ["SE", 39000, "3.8L V6", 291, "22 mpg", "FWD or AWD", "acrb", "Three rows, 12.3-in touchscreen"],
    ["SEL", 42000, "3.8L V6", 291, "22 mpg", "FWD or AWD", "acrbhs", "Heated front seats, sunroof option"],
    ["XRT", 44500, "3.8L V6", 291, "21 mpg", "FWD or AWD", "acrbhs", "Rugged styling, 18-in wheels"],
    ["Limited", 50000, "3.8L V6", 291, "21 mpg", "FWD or AWD", "acrbhs", "Leather seats, dual sunroofs"],
  ],
  "mazda-cx-50": [
    ["2.5 S", 31000, "2.5L I4", 187, "27 mpg", "AWD", "acrb", "Standard AWD, 10.25-in display"],
    ["2.5 S Premium Plus", 37000, "2.5L I4", 187, "26 mpg", "AWD", "acrbhs", "Panoramic moonroof, Bose audio"],
    ["2.5 Turbo Meridian Edition", 42000, "2.5L turbo I4", 256, "24 mpg", "AWD", "acrbhs", "All-terrain tires, 3,500 lb towing"],
  ],
  "mazda-cx-90": [
    ["3.3 Turbo Select", 38500, "3.3L turbo I6", 280, "25 mpg", "AWD", "acrb", "Three rows, 12.3-in display"],
    ["3.3 Turbo Preferred", 42000, "3.3L turbo I6", 280, "25 mpg", "AWD", "acrbh", "Heated front seats, leatherette seats"],
    ["3.3 Turbo Premium", 47000, "3.3L turbo I6", 280, "25 mpg", "AWD", "acrbhs", "Leather seats, Bose audio"],
    ["3.3 Turbo S", 52000, "3.3L turbo I6", 340, "24 mpg", "AWD", "acrbhs", "Higher-output engine, 360-degree camera"],
  ],
  "subaru-crosstrek": [
    ["Base", 26500, "2.0L flat-4", 152, "29 mpg", "AWD", "acrb", "EyeSight, standard AWD"],
    ["Premium", 27500, "2.0L flat-4", 152, "29 mpg", "AWD", "acrbh", "11.6-in touchscreen, heated seats package"],
    ["Sport", 30500, "2.5L flat-4", 180, "29 mpg", "AWD", "acrbh", "Bigger engine, X-Mode dual-function"],
    ["Limited", 33000, "2.5L flat-4", 180, "29 mpg", "AWD", "acrbhs", "Leather seats, Harman Kardon audio"],
  ],
  "subaru-ascent": [
    ["Premium", 39000, "2.4L turbo flat-4", 260, "22 mpg", "AWD", "acrb", "Three rows, 5,000 lb towing"],
    ["Limited", 45000, "2.4L turbo flat-4", 260, "21 mpg", "AWD", "acrbhs", "Leather seats, ventilated front seats"],
    ["Touring", 50000, "2.4L turbo flat-4", 260, "21 mpg", "AWD", "acrbhs", "Panoramic moonroof, Harman Kardon audio"],
  ],
  "subaru-wrx": [
    ["Base", 33500, "2.4L turbo flat-4", 271, "22 mpg", "AWD", "acb", "6-speed manual, symmetrical AWD"],
    ["Premium", 35000, "2.4L turbo flat-4", 271, "22 mpg", "AWD", "acrbhs", "11.6-in touchscreen, sunroof option"],
    ["Limited", 39000, "2.4L turbo flat-4", 271, "22 mpg", "AWD", "acrbhs", "Leather seats, Harman Kardon audio"],
    ["tS", 42000, "2.4L turbo flat-4", 271, "22 mpg", "AWD", "acbh", "Electronically adjustable suspension, Brembo brakes"],
  ],
  "volkswagen-jetta": [
    ["S", 22500, "1.5L turbo I4", 158, "35 mpg", "FWD", "cb", "8-in touchscreen, IQ.Drive safety"],
    ["Sport", 24000, "1.5L turbo I4", 158, "34 mpg", "FWD", "crb", "Sport styling, adaptive cruise"],
    ["SE", 26500, "1.5L turbo I4", 158, "34 mpg", "FWD", "crbhs", "Sunroof, heated front seats"],
    ["SEL", 31000, "1.5L turbo I4", 158, "34 mpg", "FWD", "crbhs", "Leatherette seats, Beats audio"],
  ],
  "volkswagen-tiguan": [
    ["S", 30000, "2.0L turbo I4", 184, "28 mpg", "FWD or AWD", "acrb", "IQ.Drive safety, 8-in touchscreen"],
    ["SE", 33000, "2.0L turbo I4", 184, "28 mpg", "FWD or AWD", "acrbh", "Heated front seats, power tailgate"],
    ["SEL R-Line", 40000, "2.0L turbo I4", 184, "26 mpg", "AWD", "acrbhs", "Panoramic sunroof, Harman Kardon audio"],
  ],
  "volkswagen-atlas": [
    ["SE", 39000, "2.0L turbo I4", 269, "23 mpg", "FWD or AWD", "acrb", "Three rows, 5,000 lb towing"],
    ["SE with Technology", 44000, "2.0L turbo I4", 269, "23 mpg", "FWD or AWD", "acrbhs", "Panoramic sunroof, heated seats"],
    ["SEL", 48000, "2.0L turbo I4", 269, "22 mpg", "FWD or AWD", "acrbhs", "Leatherette seats, 360-degree camera"],
  ],
  "volkswagen-id-4": [
    ["Standard", 40000, "Single electric motor", 282, "206 mi range", "RWD", "crb", "12.9-in touchscreen, 62 kWh battery"],
    ["Pro", 45000, "Single electric motor", 282, "291 mi range", "RWD", "crbh", "82 kWh battery, heated seats"],
    ["Pro S Plus", 53000, "Dual electric motors", 335, "263 mi range", "AWD", "acrbhs", "Panoramic glass roof, Harman Kardon audio"],
  ],
  "jeep-compass": [
    ["Sport", 27500, "2.0L turbo I4", 200, "27 mpg", "4WD", "acrb", "Standard 4x4, 10.1-in touchscreen"],
    ["Latitude", 30000, "2.0L turbo I4", 200, "27 mpg", "4WD", "acrbh", "Remote start, heated front seats"],
    ["Limited", 33000, "2.0L turbo I4", 200, "26 mpg", "4WD", "acrbhs", "Leather seats, 10.25-in display"],
  ],
  "jeep-grand-cherokee": [
    ["Laredo", 37500, "3.6L V6", 293, "23 mpg", "RWD or 4WD", "acrb", "10.1-in touchscreen, Quadra-Trac 4x4"],
    ["Altitude", 41000, "3.6L V6", 293, "23 mpg", "RWD or 4WD", "acrbh", "Black styling, 20-in wheels"],
    ["Limited", 45000, "3.6L V6", 293, "23 mpg", "RWD or 4WD", "acrbhs", "Leather seats, power tailgate"],
    ["Summit", 60000, "3.6L V6", 293, "22 mpg", "4WD", "acrbhs", "Air suspension, Nappa leather"],
  ],
  "jeep-gladiator": [
    ["Sport", 39000, "3.6L V6", 285, "19 mpg", "4WD", "acb", "Removable top, 7,700 lb max towing"],
    ["Mojave", 50000, "3.6L V6", 285, "17 mpg", "4WD", "acbh", "Desert-tuned Fox shocks, 33-in tires"],
    ["Rubicon", 52000, "3.6L V6", 285, "17 mpg", "4WD", "acrbh", "Locking differentials, disconnecting sway bar"],
  ],
  "ram-1500": [
    ["Tradesman", 41500, "3.6L V6 mild hybrid", 305, "20 mpg", "RWD or 4WD", "acb", "Work-ready interior, 8.4-in touchscreen"],
    ["Big Horn", 46000, "3.6L V6 mild hybrid", 305, "20 mpg", "RWD or 4WD", "acrbh", "Remote start, RamBox option"],
    ["Laramie", 56000, "3.0L turbo I6", 420, "19 mpg", "RWD or 4WD", "acrbhs", "Leather seats, 12-in touchscreen"],
    ["Limited", 73000, "3.0L turbo I6", 540, "18 mpg", "4WD", "acrbhs", "Air suspension, Harman Kardon audio"],
  ],
  "ram-2500": [
    ["Tradesman", 48000, "6.4L V8", 405, "Not EPA-rated", "RWD or 4WD", "acb", "Heavy-duty frame, 16,000 lb towing"],
    ["Big Horn", 54000, "6.4L V8", 405, "Not EPA-rated", "RWD or 4WD", "acrbh", "Remote start, 12-in touchscreen option"],
    ["Laramie", 62000, "6.4L V8", 405, "Not EPA-rated", "RWD or 4WD", "acrbhs", "Leather seats, premium audio"],
  ],
  "gmc-terrain": [
    ["Elevation", 33500, "1.5L turbo I4", 175, "26 mpg", "FWD or AWD", "acrb", "11.3-in touchscreen, Pro Safety Plus"],
    ["AT4", 39000, "1.5L turbo I4", 175, "26 mpg", "AWD", "acrbhs", "Off-road suspension, all-terrain tires"],
    ["Denali", 42000, "1.5L turbo I4", 175, "26 mpg", "AWD", "acrbhs", "Leather seats, panoramic sunroof"],
  ],
  "gmc-sierra-1500": [
    ["Pro", 40000, "2.7L turbo I4", 310, "20 mpg", "RWD or 4WD", "acb", "Work-ready interior, 7-in touchscreen"],
    ["Elevation", 50000, "5.3L V8", 355, "18 mpg", "RWD or 4WD", "acrbh", "13.4-in touchscreen, MultiPro tailgate"],
    ["AT4", 66000, "6.2L V8", 420, "16 mpg", "4WD", "acrbhs", "2-in lift, off-road suspension"],
    ["Denali", 70000, "6.2L V8", 420, "16 mpg", "RWD or 4WD", "acrbhs", "Leather seats, Bose audio"],
  ],
  "gmc-yukon": [
    ["SLE", 62000, "5.3L V8", 355, "17 mpg", "RWD or 4WD", "acrb", "16.8-in touchscreen, 8,400 lb max towing"],
    ["SLT", 72000, "5.3L V8", 355, "17 mpg", "RWD or 4WD", "acrbhs", "Leather seats, power tailgate"],
    ["AT4", 77000, "6.2L V8", 420, "15 mpg", "4WD", "acrbhs", "Off-road suspension, all-terrain tires"],
    ["Denali", 82000, "6.2L V8", 420, "15 mpg", "RWD or 4WD", "acrbhs", "Air suspension, Bose audio"],
  ],
  "buick-envista": [
    ["Preferred", 24000, "1.2L turbo I3", 137, "30 mpg", "FWD", "crb", "11-in touchscreen, Buick Driver Confidence"],
    ["Sport Touring", 26000, "1.2L turbo I3", 137, "30 mpg", "FWD", "crbh", "Sport styling, 18-in wheels"],
    ["Avenir", 30000, "1.2L turbo I3", 137, "30 mpg", "FWD", "crbhs", "Leather seats, sunroof"],
  ],
  "buick-encore-gx": [
    ["Preferred", 26500, "1.2L turbo I3", 137, "30 mpg", "FWD or AWD", "acrb", "11-in touchscreen, Buick Driver Confidence"],
    ["Sport Touring", 28000, "1.3L turbo I3", 155, "29 mpg", "FWD or AWD", "acrbh", "Sport styling, heated front seats"],
    ["Avenir", 33000, "1.3L turbo I3", 155, "29 mpg", "FWD or AWD", "acrbhs", "Leather seats, sunroof"],
  ],
  "buick-enclave": [
    ["Preferred", 46000, "2.5L turbo I4", 328, "22 mpg", "FWD or AWD", "acrbh", "Three rows, 30-in curved display"],
    ["Sport Touring", 51000, "2.5L turbo I4", 328, "22 mpg", "FWD or AWD", "acrbhs", "Sport styling, power tailgate"],
    ["Avenir", 58000, "2.5L turbo I4", 328, "21 mpg", "FWD or AWD", "acrbhs", "Leather seats, massaging front seats"],
  ],
  "chrysler-pacifica": [
    ["Select", 41500, "3.6L V6", 287, "22 mpg", "FWD or AWD", "acrbh", "Stow 'n Go seats, 10.1-in touchscreen"],
    ["Limited", 50500, "3.6L V6", 287, "22 mpg", "FWD or AWD", "acrbhs", "Leather seats, dual sunroofs"],
    ["Pinnacle", 55000, "3.6L V6", 287, "21 mpg", "FWD or AWD", "acrbhs", "Quilted Nappa leather, rear entertainment"],
  ],
  "chrysler-voyager": [
    ["LX", 40500, "3.6L V6", 287, "22 mpg", "FWD", "crb", "Power sliding doors, 7-in touchscreen"],
    ["LXi", 42500, "3.6L V6", 287, "22 mpg", "FWD", "crb", "Fleet-focused trim, Stow 'n Go seats"],
  ],

  // Luxury brands
  "tesla-model-s": [
    ["Dual Motor AWD", 80000, "Dual electric motors", 670, "405 mi range", "AWD", "arbhs", "17-in touchscreen, glass roof"],
    ["Plaid", 95000, "Tri electric motors", 1020, "396 mi range", "AWD", "arbhs", "Tri-motor setup, under 2.1 s 0-60 claimed"],
  ],
  "tesla-model-x": [
    ["Dual Motor AWD", 85000, "Dual electric motors", 670, "348 mi range", "AWD", "arbhs", "Falcon-wing doors, seating for 7"],
    ["Plaid", 100000, "Tri electric motors", 1020, "335 mi range", "AWD", "arbhs", "Tri-motor setup, 5,000 lb towing"],
  ],
  "tesla-cybertruck": [
    ["Long Range AWD", 80000, "Dual electric motors", 600, "325 mi range", "AWD", "arbhs", "Stainless steel body, 11,000 lb towing"],
    ["Cyberbeast", 100000, "Tri electric motors", 845, "301 mi range", "AWD", "arbhs", "Tri-motor setup, adaptive air suspension"],
  ],
  "bmw-x3": [
    ["30 xDrive", 50000, "2.0L turbo I4", 255, "28 mpg", "AWD", "acrbhs", "Curved display, power tailgate"],
    ["M50 xDrive", 65000, "3.0L turbo I6", 393, "25 mpg", "AWD", "acrbhs", "M Sport suspension, mild-hybrid boost"],
  ],
  "bmw-i4": [
    ["eDrive35", 57500, "Single electric motor", 282, "256 mi range", "RWD", "crbhs", "Curved display, fast charging"],
    ["eDrive40", 62000, "Single electric motor", 335, "318 mi range", "RWD", "crbhs", "Larger battery, adaptive M suspension"],
    ["M50 xDrive", 70000, "Dual electric motors", 536, "270 mi range", "AWD", "acrbhs", "M Sport brakes, dual motors"],
  ],
  "bmw-x5": [
    ["sDrive40i", 67500, "3.0L turbo I6", 375, "24 mpg", "RWD", "crbhs", "Curved display, mild-hybrid boost"],
    ["xDrive40i", 70000, "3.0L turbo I6", 375, "24 mpg", "AWD", "acrbhs", "xDrive AWD, panoramic moonroof"],
    ["M60i xDrive", 90000, "4.4L turbo V8", 523, "20 mpg", "AWD", "acrbhs", "Air suspension, M Sport differential"],
  ],
  "bmw-m3": [
    ["Base", 77000, "3.0L turbo I6", 473, "19 mpg", "RWD", "crbhs", "6-speed manual, M adaptive suspension"],
    ["Competition", 81000, "3.0L turbo I6", 503, "19 mpg", "RWD", "crbhs", "8-speed automatic, higher output"],
    ["Competition xDrive", 88000, "3.0L turbo I6", 523, "19 mpg", "AWD", "acrbhs", "M xDrive AWD, carbon roof"],
  ],
  "mercedes-benz-c-class": [
    ["C 300", 48000, "2.0L turbo I4", 255, "30 mpg", "RWD", "crbhs", "11.9-in touchscreen, mild-hybrid boost"],
    ["C 300 4MATIC", 50000, "2.0L turbo I4", 255, "29 mpg", "AWD", "acrbhs", "4MATIC AWD, 11.9-in touchscreen"],
    ["AMG C 43", 63000, "2.0L turbo I4", 402, "25 mpg", "AWD", "acrbhs", "AMG suspension, electric turbocharger"],
  ],
  "mercedes-benz-glc": [
    ["GLC 300", 49500, "2.0L turbo I4", 255, "26 mpg", "RWD", "crbhs", "11.9-in touchscreen, power tailgate"],
    ["GLC 300 4MATIC", 51500, "2.0L turbo I4", 255, "26 mpg", "AWD", "acrbhs", "4MATIC AWD, panoramic sunroof"],
    ["AMG GLC 43", 66000, "2.0L turbo I4", 416, "23 mpg", "AWD", "acrbhs", "AMG suspension, sport exhaust"],
  ],
  "mercedes-benz-e-class": [
    ["E 350", 62500, "2.0L turbo I4", 255, "27 mpg", "RWD", "crbhs", "MBUX Superscreen option, mild-hybrid boost"],
    ["E 350 4MATIC", 65000, "2.0L turbo I4", 255, "26 mpg", "AWD", "acrbhs", "4MATIC AWD, panoramic sunroof"],
    ["E 450 4MATIC", 68000, "3.0L turbo I6", 375, "25 mpg", "AWD", "acrbhs", "Inline-six power, air suspension option"],
  ],
  "mercedes-benz-s-class": [
    ["S 500 4MATIC", 118500, "3.0L turbo I6", 442, "24 mpg", "AWD", "acrbhs", "MBUX rear display option, air suspension"],
    ["S 580 4MATIC", 128000, "4.0L turbo V8", 496, "20 mpg", "AWD", "acrbhs", "V8 power, Burmester audio"],
    ["Maybach S 580", 200000, "4.0L turbo V8", 496, "19 mpg", "AWD", "acrbhs", "Extended wheelbase, reclining rear seats"],
  ],
  "mercedes-benz-g-class": [
    ["G 550", 148000, "3.0L turbo I6", 443, "15 mpg", "4WD", "acrbhs", "Three locking differentials, mild-hybrid boost"],
    ["AMG G 63", 185000, "4.0L turbo V8", 577, "14 mpg", "4WD", "acrbhs", "AMG exhaust, adaptive suspension"],
  ],
  "audi-a3": [
    ["Premium", 39000, "2.0L turbo I4", 201, "31 mpg", "FWD or AWD", "acrb", "10.1-in touchscreen, virtual cockpit"],
    ["Premium Plus", 42000, "2.0L turbo I4", 201, "31 mpg", "FWD or AWD", "acrbhs", "Heated seats, panoramic sunroof"],
    ["S3", 48000, "2.0L turbo I4", 328, "26 mpg", "AWD", "acrbhs", "Sport suspension, quattro AWD"],
  ],
  "audi-q5": [
    ["Premium", 47000, "2.0L turbo I4", 261, "25 mpg", "AWD", "acrbhs", "quattro AWD, panoramic sunroof"],
    ["Premium Plus", 50500, "2.0L turbo I4", 261, "25 mpg", "AWD", "acrbhs", "Virtual cockpit, ventilated seats"],
    ["Prestige", 57000, "2.0L turbo I4", 261, "24 mpg", "AWD", "acrbhs", "Heads-up display, Bang & Olufsen audio"],
    ["SQ5", 61000, "3.0L turbo V6", 349, "21 mpg", "AWD", "acrbhs", "Sport suspension, V6 power"],
  ],
  "audi-q7": [
    ["Premium", 61000, "2.0L turbo I4", 261, "21 mpg", "AWD", "acrbhs", "Three rows, quattro AWD"],
    ["Premium Plus", 65000, "2.0L turbo I4", 261, "21 mpg", "AWD", "acrbhs", "Virtual cockpit, Bose audio"],
    ["Prestige", 71000, "3.0L turbo V6", 335, "20 mpg", "AWD", "acrbhs", "V6 power, heads-up display"],
  ],
  "audi-s-e-tron-gt": [
    ["S e-tron GT Premium Plus", 126000, "Dual electric motors", 590, "300 mi range", "AWD", "acrbhs", "Air suspension, 800-volt charging"],
    ["S e-tron GT Prestige", 136000, "Dual electric motors", 590, "300 mi range", "AWD", "acrbhs", "Heads-up display, Bang & Olufsen audio"],
    ["RS e-tron GT", 170000, "Dual electric motors", 912, "278 mi range", "AWD", "acrbhs", "Launch-boosted power, carbon roof"],
  ],
  "lexus-es": [
    ["ES 300h", 44500, "2.5L hybrid I4", 215, "44 mpg", "FWD", "crbhs", "14-in touchscreen, Lexus Safety System+"],
    ["ES 300h F Sport Handling", 49000, "2.5L hybrid I4", 215, "41 mpg", "FWD", "crbhs", "Adaptive suspension, sport seats"],
    ["ES 300h Ultra Luxury", 51000, "2.5L hybrid I4", 215, "43 mpg", "FWD", "crbhs", "Semi-aniline leather, Mark Levinson audio"],
  ],
  "lexus-nx": [
    ["NX 350h", 46000, "2.5L hybrid I4", 240, "39 mpg", "AWD", "acrbhs", "Standard AWD, 9.8-in touchscreen"],
    ["NX 350h Premium", 50000, "2.5L hybrid I4", 240, "39 mpg", "AWD", "acrbhs", "Moonroof, ventilated seats"],
    ["NX 350h Luxury", 56000, "2.5L hybrid I4", 240, "37 mpg", "AWD", "acrbhs", "14-in touchscreen, Mark Levinson audio"],
  ],
  "lexus-rx": [
    ["RX 350", 50000, "2.4L turbo I4", 275, "24 mpg", "FWD or AWD", "acrbhs", "14-in touchscreen, Lexus Safety System+"],
    ["RX 350 Premium", 54000, "2.4L turbo I4", 275, "24 mpg", "FWD or AWD", "acrbhs", "Moonroof, power tailgate"],
    ["RX 350 F Sport Handling", 62000, "2.4L turbo I4", 275, "23 mpg", "AWD", "acrbhs", "Adaptive suspension, sport seats"],
  ],
  "lexus-lx": [
    ["LX 600 Premium", 105000, "3.4L turbo V6", 409, "19 mpg", "4WD", "acrbhs", "Three rows, adaptive suspension"],
    ["LX 600 F Sport Handling", 112000, "3.4L turbo V6", 409, "19 mpg", "4WD", "acrbhs", "Sport styling, performance dampers"],
    ["LX 600 Ultra Luxury", 140000, "3.4L turbo V6", 409, "19 mpg", "4WD", "acrbhs", "Rear lounge seats, Mark Levinson audio"],
  ],
  "genesis-g70": [
    ["2.5T", 42000, "2.5L turbo I4", 300, "25 mpg", "RWD or AWD", "acrbhs", "14.5-in touchscreen, Highway Driving Assist"],
    ["2.5T Sport Prestige", 47000, "2.5L turbo I4", 300, "24 mpg", "RWD or AWD", "acrbhs", "Adaptive suspension, Lexicon audio"],
    ["3.3T Sport Prestige", 52000, "3.3L turbo V6", 365, "21 mpg", "AWD", "acrbhs", "V6 power, Brembo brakes"],
  ],
  "genesis-gv70": [
    ["2.5T Select", 46500, "2.5L turbo I4", 300, "24 mpg", "AWD", "acrbhs", "Standard AWD, 14.5-in touchscreen"],
    ["2.5T Sport Prestige", 55000, "2.5L turbo I4", 300, "23 mpg", "AWD", "acrbhs", "Adaptive suspension, Lexicon audio"],
    ["3.5T Sport Prestige", 68000, "3.5L turbo V6", 375, "21 mpg", "AWD", "acrbhs", "V6 power, Nappa leather"],
  ],
  "genesis-gv80": [
    ["2.5T Select", 58000, "2.5L turbo I4", 300, "21 mpg", "AWD", "acrbhs", "Three rows, 27-in OLED display"],
    ["3.5T Prestige", 72000, "3.5L turbo V6", 375, "19 mpg", "AWD", "acrbhs", "V6 power, Lexicon audio"],
    ["3.5T Prestige Signature", 78000, "3.5L turbo V6", 375, "19 mpg", "AWD", "acrbhs", "Rear comfort seats, Nappa leather"],
  ],
  "volvo-xc40": [
    ["Core", 40000, "2.0L turbo I4", 247, "26 mpg", "AWD", "acrbh", "9-in touchscreen, Pilot Assist"],
    ["Plus", 44000, "2.0L turbo I4", 247, "26 mpg", "AWD", "acrbhs", "Panoramic moonroof, Harman Kardon audio"],
    ["Ultra", 49000, "2.0L turbo I4", 247, "25 mpg", "AWD", "acrbhs", "360-degree camera, ventilated seats"],
  ],
  "volvo-xc60": [
    ["Core", 47000, "2.0L turbo I4", 247, "25 mpg", "AWD", "acrbh", "9-in touchscreen, Pilot Assist"],
    ["Plus", 51000, "2.0L turbo I4", 247, "25 mpg", "AWD", "acrbhs", "Panoramic moonroof, power tailgate"],
    ["Ultra", 57000, "2.0L turbo I4", 247, "24 mpg", "AWD", "acrbhs", "Bowers & Wilkins audio, massaging seats"],
  ],
  "volvo-xc90": [
    ["Core", 58500, "2.0L turbo I4", 247, "22 mpg", "AWD", "acrbh", "Three rows, 11.2-in touchscreen"],
    ["Plus", 62000, "2.0L turbo I4", 247, "22 mpg", "AWD", "acrbhs", "Panoramic moonroof, Bowers & Wilkins option"],
    ["Ultra", 68000, "2.0L turbo I4", 295, "22 mpg", "AWD", "acrbhs", "Higher output, air suspension"],
  ],
  "land-rover-defender-110": [
    ["S", 58000, "2.0L turbo I4", 296, "18 mpg", "4WD", "acrb", "Terrain Response, 11.4-in touchscreen"],
    ["X-Dynamic SE", 72000, "3.0L turbo I6", 395, "18 mpg", "4WD", "acrbhs", "Mild-hybrid boost, sliding panoramic roof"],
    ["X", 88000, "3.0L turbo I6", 395, "17 mpg", "4WD", "acrbhs", "Air suspension, Meridian audio"],
  ],
  "land-rover-range-rover-sport": [
    ["SE", 85000, "3.0L turbo I6", 355, "21 mpg", "AWD", "acrbhs", "Air suspension, 13.1-in touchscreen"],
    ["Dynamic SE", 96000, "3.0L turbo I6", 395, "20 mpg", "AWD", "acrbhs", "Higher output, sport styling"],
    ["Autobiography", 120000, "4.4L turbo V8", 523, "19 mpg", "AWD", "acrbhs", "V8 power, Meridian Signature audio"],
  ],
  "land-rover-range-rover": [
    ["SE", 110000, "3.0L turbo I6", 395, "20 mpg", "AWD", "acrbhs", "Air suspension, rear-wheel steering"],
    ["Autobiography", 170000, "4.4L turbo V8", 523, "18 mpg", "AWD", "acrbhs", "V8 power, Meridian Signature audio"],
    ["SV", 230000, "4.4L turbo V8", 606, "17 mpg", "AWD", "acrbhs", "SV signature interior, rear executive seats"],
  ],
  "cadillac-ct5": [
    ["Luxury", 50000, "2.0L turbo I4", 237, "26 mpg", "RWD or AWD", "acrbhs", "33-in curved display, AKG audio"],
    ["Premium Luxury", 55000, "2.0L turbo I4", 237, "26 mpg", "RWD or AWD", "acrbhs", "Leather seats, power sunroof"],
    ["V-Series", 65000, "3.0L turbo V6", 360, "22 mpg", "RWD or AWD", "acrbhs", "Magnetic Ride Control, Brembo brakes"],
  ],
  "cadillac-lyriq": [
    ["Tech", 59000, "Single electric motor", 340, "326 mi range", "RWD", "rbhs", "33-in curved display, panoramic roof"],
    ["Luxury", 63000, "Single or dual electric motors", 340, "326 mi range", "RWD or AWD", "arbhs", "Super Cruise available, ventilated seats"],
    ["Sport", 68000, "Dual electric motors", 515, "319 mi range", "AWD", "arbhs", "Sport styling, performance dual motors"],
  ],
  "cadillac-escalade": [
    ["Luxury", 87000, "6.2L V8", 420, "16 mpg", "RWD or 4WD", "acrbhs", "38-in curved display, AKG audio"],
    ["Premium Luxury", 96000, "6.2L V8", 420, "16 mpg", "RWD or 4WD", "acrbhs", "Magnetic Ride Control, heated second row"],
    ["Sport", 98000, "6.2L V8", 420, "15 mpg", "RWD or 4WD", "acrbhs", "Sport styling, Super Cruise available"],
    ["Platinum", 116000, "6.2L V8", 420, "15 mpg", "4WD", "acrbhs", "Air Ride, AKG Studio audio"],
  ],
  "lincoln-corsair": [
    ["Premiere", 40000, "2.0L turbo I4", 250, "25 mpg", "FWD or AWD", "acrbhs", "13.2-in touchscreen, Co-Pilot360"],
    ["Reserve", 49000, "2.0L turbo I4", 250, "24 mpg", "AWD", "acrbhs", "Revel audio, panoramic roof"],
  ],
  "lincoln-aviator": [
    ["Premiere", 56000, "3.0L turbo V6", 400, "21 mpg", "RWD or AWD", "acrbhs", "Three rows, 10.1-in touchscreen"],
    ["Reserve", 62000, "3.0L turbo V6", 400, "21 mpg", "RWD or AWD", "acrbhs", "Panoramic roof, Revel audio"],
    ["Black Label", 86000, "3.0L turbo V6", 400, "20 mpg", "AWD", "acrbhs", "Air suspension, Perfect Position seats"],
  ],
  "lincoln-navigator": [
    ["Premiere", 98000, "3.5L turbo V6", 440, "18 mpg", "4WD", "acrbhs", "48-in Panoramic Display, three rows"],
    ["Reserve", 108000, "3.5L turbo V6", 440, "18 mpg", "4WD", "acrbhs", "Revel Ultima audio, BlueCruise available"],
    ["Black Label", 121000, "3.5L turbo V6", 440, "18 mpg", "4WD", "acrbhs", "Air suspension, Perfect Position seats"],
  ],
  "porsche-macan-electric": [
    ["Macan", 76000, "Single electric motor", 355, "308 mi range", "RWD", "crbhs", "800-volt charging, 12.6-in curved display"],
    ["Macan 4", 80000, "Dual electric motors", 402, "288 mi range", "AWD", "acrbhs", "Dual motors, Porsche Active Suspension"],
    ["Macan Turbo", 105000, "Dual electric motors", 630, "288 mi range", "AWD", "acrbhs", "Air suspension, torque vectoring"],
  ],
  "porsche-cayenne": [
    ["Cayenne", 85000, "3.0L turbo V6", 348, "19 mpg", "AWD", "acrbhs", "12.3-in curved display, 7,700 lb towing"],
    ["Cayenne S", 98000, "4.0L turbo V8", 468, "18 mpg", "AWD", "acrbhs", "V8 power, adaptive suspension"],
    ["Cayenne GTS", 130000, "4.0L turbo V8", 493, "17 mpg", "AWD", "acrbhs", "Sport exhaust, lowered suspension"],
  ],
  "porsche-taycan": [
    ["Taycan", 100000, "Single electric motor", 402, "300 mi range", "RWD", "crbhs", "Adaptive air suspension, 800-volt charging"],
    ["Taycan 4S", 120000, "Dual electric motors", 590, "295 mi range", "AWD", "acrbhs", "Dual motors, larger battery option"],
    ["Taycan Turbo", 175000, "Dual electric motors", 871, "287 mi range", "AWD", "acrbhs", "Launch-boosted power, rear-axle steering"],
  ],
  "porsche-911-carrera": [
    ["Carrera", 122000, "3.0L turbo flat-6", 388, "20 mpg", "RWD", "crbhs", "PASM suspension, 12.6-in curved display"],
    ["Carrera S", 138000, "3.0L turbo flat-6", 473, "19 mpg", "RWD", "crbhs", "Higher output, larger brakes"],
    ["Carrera 4S", 146000, "3.0L turbo flat-6", 473, "19 mpg", "AWD", "acrbhs", "All-wheel drive, sport chrono option"],
  ],

  // Exotic & ultra-luxury brands
  "maserati-grecale": [
    ["GT", 70000, "2.0L turbo I4", 296, "22 mpg", "AWD", "acrbhs", "Mild-hybrid boost, 12.3-in touchscreen"],
    ["Modena", 84000, "2.0L turbo I4", 325, "22 mpg", "AWD", "acrbhs", "Limited-slip differential, adaptive dampers"],
    ["Trofeo", 110000, "3.0L twin-turbo V6", 523, "19 mpg", "AWD", "acrbhs", "Nettuno V6, air suspension"],
  ],
  "maserati-granturismo": [
    ["Modena", 175000, "3.0L twin-turbo V6", 483, "18 mpg", "AWD", "acrbh", "Nettuno V6, 2+2 seating"],
    ["Trofeo", 210000, "3.0L twin-turbo V6", 542, "18 mpg", "AWD", "acrbh", "Higher output, Sonus faber audio"],
  ],
  "maserati-mc20": [
    ["Coupe", 240000, "3.0L twin-turbo V6", 621, "18 mpg", "RWD", "crb", "Butterfly doors, carbon monocoque"],
    ["Cielo", 285000, "3.0L twin-turbo V6", 621, "18 mpg", "RWD", "crb", "Retractable glass roof, Sonus faber audio"],
  ],
  "aston-martin-vantage": [
    ["Coupe", 195000, "4.0L twin-turbo V8", 656, "18 mpg", "RWD", "crbh", "10.25-in touchscreen, adaptive dampers"],
    ["Roadster", 210000, "4.0L twin-turbo V8", 656, "18 mpg", "RWD", "crbh", "Power-folding soft top, Bowers & Wilkins option"],
  ],
  "aston-martin-db12": [
    ["Coupe", 250000, "4.0L twin-turbo V8", 671, "18 mpg", "RWD", "crbh", "Super Tourer focus, 10.25-in touchscreen"],
    ["Volante", 270000, "4.0L twin-turbo V8", 671, "18 mpg", "RWD", "crbh", "Power-folding soft top, 2+2 seating"],
  ],
  "aston-martin-dbx707": [
    ["DBX707", 250000, "4.0L twin-turbo V8", 697, "15 mpg", "AWD", "acrbhs", "Carbon brakes, 3-chamber air suspension"],
  ],
  "bentley-bentayga": [
    ["V8", 205000, "4.0L twin-turbo V8", 542, "18 mpg", "AWD", "acrbhs", "10.9-in touchscreen, 7,700 lb towing"],
    ["Azure", 240000, "4.0L twin-turbo V8", 542, "18 mpg", "AWD", "acrbhs", "Wellness seats, Azure styling"],
    ["Speed", 260000, "4.0L twin-turbo V8", 641, "17 mpg", "AWD", "acrbhs", "Higher output, active anti-roll"],
  ],
  "bentley-continental-gt": [
    ["Azure", 300000, "4.0L V8 plug-in hybrid", 671, "40 mi electric", "AWD", "acrbh", "Wellness seats, Azure styling"],
    ["Speed", 330000, "4.0L V8 plug-in hybrid", 771, "40 mi electric", "AWD", "acrbh", "Rear-wheel steering, active anti-roll"],
    ["Mulliner", 370000, "4.0L V8 plug-in hybrid", 771, "40 mi electric", "AWD", "acrbh", "Bespoke interior, Mulliner styling"],
  ],
  "mclaren-gts": [
    ["GTS", 210000, "4.0L twin-turbo V8", 626, "18 mpg", "RWD", "crb", "Carbon structure, 15 cu ft luggage space"],
  ],
  "mclaren-artura": [
    ["Coupe", 250000, "3.0L V6 plug-in hybrid", 690, "11 mi electric", "RWD", "crb", "Carbon structure, dihedral doors"],
    ["Spider", 275000, "3.0L V6 plug-in hybrid", 690, "11 mi electric", "RWD", "crb", "Retractable hardtop, carbon structure"],
  ],
  "mclaren-750s": [
    ["Coupe", 332000, "4.0L twin-turbo V8", 740, "17 mpg", "RWD", "crb", "Under 3,000 lb curb weight, dihedral doors"],
    ["Spider", 355000, "4.0L twin-turbo V8", 740, "17 mpg", "RWD", "crb", "Retractable hardtop, active rear wing"],
  ],
  "ferrari-roma": [
    ["Roma", 250000, "3.9L twin-turbo V8", 612, "18 mpg", "RWD", "crb", "2+2 seating, 8-speed dual-clutch"],
    ["Roma Spider", 280000, "3.9L twin-turbo V8", 612, "18 mpg", "RWD", "crb", "Soft top, wind deflector"],
  ],
  "ferrari-296-gtb": [
    ["296 GTB", 342000, "3.0L V6 plug-in hybrid", 819, "15 mi electric", "RWD", "crb", "Mid-engine V6, 8-speed dual-clutch"],
    ["296 GTS", 375000, "3.0L V6 plug-in hybrid", 819, "15 mi electric", "RWD", "crb", "Retractable hardtop, mid-engine V6"],
  ],
  "ferrari-purosangue": [
    ["Purosangue", 400000, "6.5L V12", 715, "12 mpg", "AWD", "acrb", "Naturally aspirated V12, rear-hinged rear doors"],
  ],
  "ferrari-12cilindri": [
    ["12Cilindri", 423000, "6.5L V12", 819, "12 mpg", "RWD", "crb", "Front-mid V12, 8-speed dual-clutch"],
    ["12Cilindri Spider", 465000, "6.5L V12", 819, "12 mpg", "RWD", "crb", "Retractable hardtop, front-mid V12"],
  ],
  "ferrari-sf90-stradale": [
    ["SF90 Stradale", 530000, "4.0L V8 plug-in hybrid", 986, "15 mi electric", "AWD", "acrb", "Three electric motors, electric front axle"],
    ["SF90 Spider", 580000, "4.0L V8 plug-in hybrid", 986, "15 mi electric", "AWD", "acrb", "Retractable hardtop, three electric motors"],
  ],
  "lamborghini-urus-se": [
    ["Urus SE", 258000, "4.0L V8 plug-in hybrid", 789, "37 mi electric", "AWD", "acrbhs", "Rear-wheel steering, carbon-ceramic brakes"],
  ],
  "lamborghini-temerario": [
    ["Temerario", 350000, "4.0L V8 plug-in hybrid", 907, "Short electric range", "AWD", "acrb", "Three electric motors, 10,000 rpm redline"],
  ],
  "lamborghini-revuelto": [
    ["Revuelto", 608000, "6.5L V12 plug-in hybrid", 1001, "Short electric range", "AWD", "acrb", "Three electric motors, scissor doors"],
  ],
  "rolls-royce-ghost": [
    ["Ghost", 350000, "6.75L twin-turbo V12", 563, "14 mpg", "AWD", "acrbhs", "Planar suspension, Starlight headliner option"],
    ["Ghost Extended", 400000, "6.75L twin-turbo V12", 563, "14 mpg", "AWD", "acrbhs", "Longer wheelbase, rear lounge seats"],
    ["Black Badge Ghost", 420000, "6.75L twin-turbo V12", 591, "14 mpg", "AWD", "acrbhs", "Darkened styling, higher output"],
  ],
  "rolls-royce-cullinan": [
    ["Cullinan", 400000, "6.75L twin-turbo V12", 563, "14 mpg", "AWD", "acrbhs", "Viewing Suite, Recreation Module option"],
    ["Black Badge Cullinan", 460000, "6.75L twin-turbo V12", 591, "14 mpg", "AWD", "acrbhs", "Darkened styling, higher output"],
  ],
  "rolls-royce-spectre": [
    ["Spectre", 420000, "Dual electric motors", 577, "260 mi range", "AWD", "acrbhs", "Coach doors, Starlight doors"],
    ["Black Badge Spectre", 500000, "Dual electric motors", 650, "250 mi range", "AWD", "acrbhs", "Darkened styling, higher output"],
  ],
  "rolls-royce-phantom": [
    ["Phantom", 475000, "6.75L twin-turbo V12", 563, "14 mpg", "RWD", "crbhs", "Planar suspension, The Gallery dashboard"],
    ["Phantom Extended", 550000, "6.75L twin-turbo V12", 563, "14 mpg", "RWD", "crbhs", "Longer wheelbase, rear Serenity seats"],
  ],
};
