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
    ["N", 35000, "2.0L turbo I4", 276, "25 mpg", "FWD", "crbh", "6-speed manual or 8-speed dual-clutch, electronic limited-slip"],
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
    ["Rubicon 392", 100000, "6.4L V8", 470, "14 mpg", "4WD", "acrbh", "HEMI V8, 2-in suspension lift"],
  ],
  "ford-bronco": [
    ["Big Bend", 40000, "2.3L turbo I4", 300, "20 mpg", "4WD", "acb", "Removable roof and doors, GOAT Modes"],
    ["Outer Banks", 47000, "2.3L turbo I4", 300, "20 mpg", "4WD", "acbh", "Leather-trimmed seats, body-color top"],
    ["Badlands", 50000, "2.3L turbo I4", 300, "18 mpg", "4WD", "acrbh", "Locking differentials, disconnecting sway bar"],
    ["Raptor", 90000, "3.0L twin-turbo V6", 418, "15 mpg", "4WD", "acrbhs", "FOX Live Valve shocks, 37-in tires"],
  ],
  "toyota-4runner": [
    ["SR5", 41000, "2.4L turbo I4", 278, "22 mpg", "RWD or 4WD", "acrb", "Toyota Safety Sense, 8-in touchscreen"],
    ["TRD Off-Road", 48000, "2.4L turbo I4", 278, "21 mpg", "RWD or 4WD", "acrbh", "Locking rear differential, crawl control"],
    ["Limited", 56000, "2.4L turbo I4", 278, "21 mpg", "RWD or 4WD", "acrbhs", "Leather seats, JBL audio"],
    ["TRD Pro", 67000, "2.4L turbo hybrid I4", 326, "23 mpg", "4WD", "acrbhs", "i-FORCE MAX hybrid, FOX shocks"],
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
    ["N", 67000, "Dual electric motors", 641, "221 mi range", "AWD", "acrbhs", "641 hp with N Grin Boost, simulated gearshifts"],
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
    ["Raptor", 80000, "3.5L twin-turbo V6", 450, "16 mpg", "4WD", "acrbhs", "FOX Live Valve shocks, 35-in tires"],
    ["Raptor R", 110000, "5.2L supercharged V8", 720, "12 mpg", "4WD", "acrbhs", "720-hp supercharged V8, FOX Live Valve shocks"],
  ],
  "chevrolet-silverado-1500": [
    ["WT", 38000, "2.7L turbo I4", 310, "20 mpg", "RWD or 4WD", "acb", "Work-ready interior, 7-in touchscreen"],
    ["LT", 49000, "5.3L V8", 355, "18 mpg", "RWD or 4WD", "acrbh", "13.4-in touchscreen, remote start"],
    ["Trail Boss", 55000, "5.3L V8", 355, "17 mpg", "4WD", "acrbh", "2-in factory lift, Z71 off-road package"],
    ["LTZ", 58000, "5.3L V8", 355, "18 mpg", "RWD or 4WD", "acrbhs", "Leather seats, multi-flex tailgate"],
    ["ZR2", 72000, "6.2L V8", 420, "16 mpg", "4WD", "acrbhs", "Multimatic DSSV dampers, front and rear lockers"],
  ],

  // Coupes & sports cars
  "ford-mustang": [
    ["EcoBoost", 33000, "2.3L turbo I4", 315, "22 mpg", "RWD", "crb", "13.2-in touchscreen, drive modes"],
    ["GT", 43000, "5.0L V8", 480, "18 mpg", "RWD", "crbh", "Manual or automatic, limited-slip differential"],
    ["Dark Horse", 64000, "5.0L V8", 500, "17 mpg", "RWD", "crbh", "Track-tuned suspension, Tremec manual"],
    ["GTD", 325000, "5.2L supercharged V8", 815, "12 mpg", "RWD", "cbh", "Track-bred, active aero and semi-active suspension"],
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
    ["RHO", 72000, "3.0L twin-turbo I6", 540, "16 mpg", "4WD", "acrbhs", "Off-road suspension, Bilstein Black Hawk shocks"],
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
    ["X5 M Competition", 127000, "4.4L twin-turbo V8", 617, "16 mpg", "AWD", "acrbhs", "617 hp, M-tuned chassis"],
  ],
  "bmw-m3": [
    ["Base", 77000, "3.0L turbo I6", 473, "19 mpg", "RWD", "crbhs", "6-speed manual, M adaptive suspension"],
    ["Competition", 81000, "3.0L turbo I6", 503, "19 mpg", "RWD", "crbhs", "8-speed automatic, higher output"],
    ["Competition xDrive", 88000, "3.0L turbo I6", 523, "19 mpg", "AWD", "acrbhs", "M xDrive AWD, carbon roof"],
    ["CS", 120000, "3.0L twin-turbo I6", 543, "19 mpg", "AWD", "acrbhs", "543 hp, carbon hood and roof"],
  ],
  "mercedes-benz-c-class": [
    ["C 300", 48000, "2.0L turbo I4", 255, "30 mpg", "RWD", "crbhs", "11.9-in touchscreen, mild-hybrid boost"],
    ["C 300 4MATIC", 50000, "2.0L turbo I4", 255, "29 mpg", "AWD", "acrbhs", "4MATIC AWD, 11.9-in touchscreen"],
    ["AMG C 43", 63000, "2.0L turbo I4", 402, "25 mpg", "AWD", "acrbhs", "AMG suspension, electric turbocharger"],
    ["AMG C 63 S E Performance", 87000, "2.0L turbo plug-in hybrid I4", 671, "8 mi electric / 19 mpg", "AWD", "acrbhs", "671-hp plug-in hybrid, rear-axle steering"],
  ],
  "mercedes-benz-glc": [
    ["GLC 300", 49500, "2.0L turbo I4", 255, "26 mpg", "RWD", "crbhs", "11.9-in touchscreen, power tailgate"],
    ["GLC 300 4MATIC", 51500, "2.0L turbo I4", 255, "26 mpg", "AWD", "acrbhs", "4MATIC AWD, panoramic sunroof"],
    ["AMG GLC 43", 66000, "2.0L turbo I4", 416, "23 mpg", "AWD", "acrbhs", "AMG suspension, sport exhaust"],
    ["AMG GLC 63 S E Performance", 90000, "2.0L turbo plug-in hybrid I4", 671, "8 mi electric / 18 mpg", "AWD", "acrbhs", "671-hp plug-in hybrid, rear-axle steering"],
  ],
  "mercedes-benz-e-class": [
    ["E 350", 62500, "2.0L turbo I4", 255, "27 mpg", "RWD", "crbhs", "MBUX Superscreen option, mild-hybrid boost"],
    ["E 350 4MATIC", 65000, "2.0L turbo I4", 255, "26 mpg", "AWD", "acrbhs", "4MATIC AWD, panoramic sunroof"],
    ["E 450 4MATIC", 68000, "3.0L turbo I6", 375, "25 mpg", "AWD", "acrbhs", "Inline-six power, air suspension option"],
    ["AMG E 53 Hybrid", 88000, "3.0L turbo plug-in hybrid I6", 577, "40 mi electric / 22 mpg", "AWD", "acrbhs", "577 hp with boost, AMG suspension"],
  ],
  "mercedes-benz-s-class": [
    ["S 500 4MATIC", 118500, "3.0L turbo I6", 442, "24 mpg", "AWD", "acrbhs", "MBUX rear display option, air suspension"],
    ["S 580 4MATIC", 128000, "4.0L turbo V8", 496, "20 mpg", "AWD", "acrbhs", "V8 power, Burmester audio"],
    ["AMG S 63 E Performance", 186000, "4.0L twin-turbo V8 plug-in hybrid", 791, "8 mi electric / 16 mpg", "AWD", "acrbhs", "791-hp plug-in hybrid, active roll stabilization"],
    ["Maybach S 580", 200000, "4.0L turbo V8", 496, "19 mpg", "AWD", "acrbhs", "Extended wheelbase, reclining rear seats"],
    ["Maybach S 680", 240000, "6.0L twin-turbo V12", 621, "14 mpg", "AWD", "acrbhs", "V12 power, Maybach rear lounge"],
  ],
  "mercedes-benz-gls": [
    ["GLS 450 4MATIC", 88500, "3.0L turbo I6", 375, "21 mpg", "AWD", "acrbhs", "Seven seats, air suspension, mild-hybrid boost"],
    ["GLS 580 4MATIC", 113000, "4.0L turbo V8", 510, "16 mpg", "AWD", "acrbhs", "V8 power, Burmester audio"],
    ["AMG GLS 63", 146000, "4.0L turbo V8", 603, "15 mpg", "AWD", "acrbhs", "AMG active ride control, sport exhaust"],
  ],
  "mercedes-benz-g-class": [
    ["G 550", 148000, "3.0L turbo I6", 443, "15 mpg", "4WD", "acrbhs", "Three locking differentials, mild-hybrid boost"],
    ["AMG G 63", 185000, "4.0L turbo V8", 577, "14 mpg", "4WD", "acrbhs", "AMG exhaust, adaptive suspension"],
  ],
  "audi-a3": [
    ["Premium", 39000, "2.0L turbo I4", 201, "31 mpg", "FWD or AWD", "acrb", "10.1-in touchscreen, virtual cockpit"],
    ["Premium Plus", 42000, "2.0L turbo I4", 201, "31 mpg", "FWD or AWD", "acrbhs", "Heated seats, panoramic sunroof"],
    ["S3", 48000, "2.0L turbo I4", 328, "26 mpg", "AWD", "acrbhs", "Sport suspension, quattro AWD"],
    ["RS 3", 64000, "2.5L turbo I5", 401, "22 mpg", "AWD", "acrbhs", "Five-cylinder, RS torque splitter"],
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
  "acura-integra": [
    ["Integra", 33000, "1.5L turbo I4", 200, "33 mpg", "FWD", "crbhs", "AcuraWatch, moonroof, 7-in touchscreen"],
    ["A-Spec", 35500, "1.5L turbo I4", 200, "32 mpg", "FWD", "crbhs", "Sport styling, 18-in wheels"],
    ["A-Spec Technology", 39000, "1.5L turbo I4", 200, "30 mpg", "FWD", "crbhs", "ELS Studio audio, 9-in touchscreen, manual option"],
    ["Type S", 52000, "2.0L turbo I4", 320, "24 mpg", "FWD", "crbhs", "6-speed manual, adaptive dampers"],
  ],
  "acura-rdx": [
    ["RDX", 46500, "2.0L turbo I4", 272, "23 mpg", "AWD", "acrbhs", "Panoramic roof, SH-AWD, AcuraWatch"],
    ["Technology", 50500, "2.0L turbo I4", 272, "23 mpg", "AWD", "acrbhs", "ELS Studio audio, navigation"],
    ["A-Spec", 52500, "2.0L turbo I4", 272, "23 mpg", "AWD", "acrbhs", "Sport styling, sport seats"],
    ["A-Spec Advance", 56000, "2.0L turbo I4", 272, "23 mpg", "AWD", "acrbhs", "Head-up display, 360-degree camera"],
  ],
  "acura-mdx": [
    ["MDX", 51000, "3.5L V6", 290, "22 mpg", "FWD or AWD", "acrbhs", "Three rows, panoramic roof, AcuraWatch"],
    ["Technology", 56000, "3.5L V6", 290, "21 mpg", "FWD or AWD", "acrbhs", "ELS Studio audio, navigation"],
    ["A-Spec", 61500, "3.5L V6", 290, "20 mpg", "AWD", "acrbhs", "Sport styling, SH-AWD"],
    ["Advance", 66000, "3.5L V6", 290, "20 mpg", "AWD", "acrbhs", "Head-up display, 360-degree camera, ventilated seats"],
    ["Type S Advance", 76000, "3.0L turbo V6", 355, "19 mpg", "AWD", "acrbhs", "Air suspension, Brembo brakes"],
  ],
  "dodge-hornet": [
    ["GT", 31000, "2.0L turbo I4", 268, "24 mpg", "AWD", "acrbh", "268 hp turbo, AWD standard"],
    ["GT Plus", 35000, "2.0L turbo I4", 268, "24 mpg", "AWD", "acrbhs", "Leather seats, Harman Kardon audio"],
  ],
  "dodge-durango": [
    ["GT", 42000, "3.6L V6", 295, "20 mpg", "RWD or AWD", "acrbhs", "Three rows, 8.4-in touchscreen"],
    ["R/T", 48000, "5.7L V8", 360, "17 mpg", "RWD or AWD", "acrbhs", "HEMI V8, 8,700 lb towing"],
    ["SRT 392", 65000, "6.4L V8", 475, "13 mpg", "AWD", "acrbhs", "475 hp, Brembo brakes"],
    ["SRT Hellcat", 100000, "6.2L supercharged V8", 710, "13 mpg", "AWD", "acrbhs", "710-hp supercharged V8, three rows"],
  ],
  "dodge-charger-daytona": [
    ["R/T", 59600, "Dual electric motors", 496, "308 mi range", "AWD", "acrbh", "496 hp, AWD, muscle-car styling"],
    ["Scat Pack", 64000, "Dual electric motors", 670, "241 mi range", "AWD", "acrbhs", "670 hp, Fratzonic exhaust sound"],
  ],
  "mini-cooper": [
    ["Cooper C", 29000, "1.5L turbo I3", 156, "32 mpg", "FWD", "crbh", "Round OLED display, go-kart handling"],
    ["Cooper S", 33000, "2.0L turbo I4", 201, "32 mpg", "FWD", "crbhs", "201 hp, panoramic roof option"],
    ["John Cooper Works", 40000, "2.0L turbo I4", 228, "30 mpg", "FWD", "crbhs", "228 hp, JCW sport seats"],
  ],
  "mini-countryman": [
    ["S ALL4", 40000, "2.0L turbo I4", 241, "27 mpg", "AWD", "acrbhs", "Largest Mini, ALL4 AWD"],
    ["John Cooper Works ALL4", 46000, "2.0L turbo I4", 312, "26 mpg", "AWD", "acrbhs", "312 hp, JCW styling"],
  ],
  "fiat-500e": [
    ["500e", 32500, "Single electric motor", 117, "149 mi range", "FWD", "crb", "Tiny footprint, easy to park"],
    ["Giorgio Armani Collection", 38000, "Single electric motor", 117, "149 mi range", "FWD", "crbhs", "Armani styling, glass roof"],
  ],
  "polestar-2": [
    ["Long Range Single Motor", 51000, "Single electric motor", 299, "314 mi range", "RWD", "crbhs", "Google built-in, 11.2-in screen"],
    ["Long Range Dual Motor", 57000, "Dual electric motors", 421, "278 mi range", "AWD", "acrbhs", "421 hp, AWD"],
    ["Dual Motor Performance", 64000, "Dual electric motors", 476, "254 mi range", "AWD", "acrbhs", "Öhlins dampers, Brembo brakes"],
  ],
  "polestar-4": [
    ["Long Range Single Motor", 56000, "Single electric motor", 272, "300 mi range", "RWD", "crbhs", "Camera rear-view mirror, glass roof"],
    ["Long Range Dual Motor", 63000, "Dual electric motors", 544, "272 mi range", "AWD", "acrbhs", "544 hp, AWD"],
  ],
  "polestar-3": [
    ["Long Range Single Motor", 70000, "Single electric motor", 299, "350 mi range", "RWD", "crbhs", "Air suspension, 14.5-in screen"],
    ["Long Range Dual Motor", 74000, "Dual electric motors", 489, "315 mi range", "AWD", "acrbhs", "489 hp, AWD"],
    ["Performance", 81000, "Dual electric motors", 517, "279 mi range", "AWD", "acrbhs", "517 hp, sport chassis"],
  ],
  "rivian-r1t": [
    ["Dual Standard", 71000, "Dual electric motors", 533, "270 mi range", "AWD", "arbhs", "Gear tunnel, air suspension"],
    ["Dual Max", 86000, "Dual electric motors", 665, "420 mi range", "AWD", "arbhs", "420-mi range, 11,000 lb towing"],
    ["Tri Max", 99000, "Three electric motors", 850, "374 mi range", "AWD", "arbhs", "850 hp, 0-60 in 2.9 s"],
  ],
  "rivian-r1s": [
    ["Dual Standard", 77000, "Dual electric motors", 533, "270 mi range", "AWD", "arbhs", "Three rows, air suspension"],
    ["Dual Max", 92000, "Dual electric motors", 665, "410 mi range", "AWD", "arbhs", "410-mi range"],
    ["Tri Max", 106000, "Three electric motors", 850, "369 mi range", "AWD", "arbhs", "850 hp, 0-60 in 2.9 s"],
  ],
  "lucid-air": [
    ["Pure", 70000, "Single electric motor", 430, "420 mi range", "RWD", "crbhs", "Glass canopy roof, 34-in curved display"],
    ["Touring", 79000, "Dual electric motors", 620, "406 mi range", "AWD", "acrbhs", "620 hp, AWD"],
    ["Grand Touring", 111000, "Dual electric motors", 819, "512 mi range", "AWD", "acrbhs", "512-mi range, 819 hp"],
  ],
  "lucid-gravity": [
    ["Grand Touring", 96000, "Dual electric motors", 828, "450 mi range", "AWD", "acrbhs", "Three rows, 450-mi range, 828 hp"],
  ],
  "infiniti-qx50": [
    ["Luxe", 44000, "2.0L variable-compression turbo I4", 268, "26 mpg", "FWD or AWD", "acrbhs", "ProPILOT Assist, panoramic roof"],
    ["Sport", 49000, "2.0L variable-compression turbo I4", 268, "25 mpg", "AWD", "acrbhs", "Sport styling, 20-in wheels"],
  ],
  "infiniti-qx60": [
    ["Pure", 50500, "2.0L turbo I4", 268, "24 mpg", "FWD or AWD", "acrbh", "Three rows, 12.3-in touchscreen"],
    ["Luxe", 56500, "2.0L turbo I4", 268, "24 mpg", "AWD", "acrbhs", "Panoramic roof, 360-degree camera"],
    ["Autograph", 66000, "2.0L turbo I4", 268, "24 mpg", "AWD", "acrbhs", "Quilted leather, Bose audio"],
  ],
  "infiniti-qx80": [
    ["Luxe", 85000, "3.5L twin-turbo V6", 450, "18 mpg", "RWD or 4WD", "acrbhs", "450 hp, three rows"],
    ["Sensory", 101000, "3.5L twin-turbo V6", 450, "17 mpg", "4WD", "acrbhs", "Massage seats, Klipsch audio"],
    ["Autograph", 112000, "3.5L twin-turbo V6", 450, "17 mpg", "4WD", "acrbhs", "Semi-aniline leather, 24-speaker audio"],
  ],
  "alfa-romeo-tonale": [
    ["Sprint", 37000, "2.0L turbo I4", 268, "24 mpg", "AWD", "acrbh", "268 hp, AWD standard"],
    ["Veloce", 43000, "2.0L turbo I4", 268, "24 mpg", "AWD", "acrbhs", "Adaptive dampers, Harman Kardon audio"],
  ],
  "alfa-romeo-giulia": [
    ["Sprint", 45000, "2.0L turbo I4", 280, "27 mpg", "RWD or AWD", "acrbh", "280 hp, sharp handling"],
    ["Ti", 48000, "2.0L turbo I4", 280, "26 mpg", "AWD", "acrbhs", "Leather, Harman Kardon option"],
    ["Quadrifoglio", 80000, "2.9L twin-turbo V6", 505, "20 mpg", "RWD", "crbhs", "505 hp, carbon-fiber trim"],
  ],
  "alfa-romeo-stelvio": [
    ["Sprint", 49000, "2.0L turbo I4", 280, "24 mpg", "AWD", "acrbh", "Sports-car handling in an SUV"],
    ["Ti", 52000, "2.0L turbo I4", 280, "24 mpg", "AWD", "acrbhs", "Leather, panoramic roof"],
    ["Quadrifoglio", 89000, "2.9L twin-turbo V6", 505, "19 mpg", "AWD", "acrbhs", "505 hp, 0-60 in 3.6 s"],
  ],
  "lotus-emira": [
    ["Turbo", 99900, "2.0L turbo I4", 400, "21 mpg", "RWD", "crbh", "Mid-engine, 400 hp"],
    ["V6", 105000, "3.5L supercharged V6", 400, "19 mpg", "RWD", "crbh", "Supercharged V6, manual available"],
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
    ["V-Series Blackwing", 96000, "6.2L supercharged V8", 668, "15 mpg", "RWD", "crbh", "6-speed manual available, Magnetic Ride Control"],
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
    ["Escalade-V", 155000, "6.2L supercharged V8", 682, "13 mpg", "AWD", "acrbhs", "682-hp supercharged V8, Super Cruise"],
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
    ["Cayenne Turbo E-Hybrid", 148000, "4.0L twin-turbo V8 plug-in hybrid", 729, "26 mi electric / 18 mpg", "AWD", "acrbhs", "729-hp plug-in hybrid, air suspension"],
  ],
  "porsche-taycan": [
    ["Taycan", 100000, "Single electric motor", 402, "300 mi range", "RWD", "crbhs", "Adaptive air suspension, 800-volt charging"],
    ["Taycan 4S", 120000, "Dual electric motors", 590, "295 mi range", "AWD", "acrbhs", "Dual motors, larger battery option"],
    ["Taycan Turbo", 175000, "Dual electric motors", 871, "287 mi range", "AWD", "acrbhs", "Launch-boosted power, rear-axle steering"],
    ["Taycan Turbo S", 210000, "Dual electric motors", 938, "278 mi range", "AWD", "acrbhs", "938 hp with launch control, active ride option"],
    ["Taycan Turbo GT", 231000, "Dual electric motors", 1019, "260 mi range", "AWD", "acrbh", "1,019 hp with launch control, track-tuned chassis"],
  ],
  "porsche-911-carrera": [
    ["Carrera", 122000, "3.0L turbo flat-6", 388, "20 mpg", "RWD", "crbhs", "PASM suspension, 12.6-in curved display"],
    ["Carrera T", 136000, "3.0L turbo flat-6", 388, "19 mpg", "RWD", "crbh", "6-speed manual, lightweight glass and less sound deadening"],
    ["Carrera S", 138000, "3.0L turbo flat-6", 473, "19 mpg", "RWD", "crbhs", "Higher output, larger brakes"],
    ["Carrera 4S", 146000, "3.0L turbo flat-6", 473, "19 mpg", "AWD", "acrbhs", "All-wheel drive, sport chrono option"],
    ["Carrera GTS", 166000, "3.6L turbo hybrid flat-6", 532, "18 mpg", "RWD", "crbhs", "T-Hybrid powertrain, rear-axle steering"],
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
  // Full lineups: Japanese mainstream brands
  "toyota-corolla-hatchback": [
    ["SE", 24500, "2.0L I4", 169, "35 mpg", "FWD", "crb", "Toyota Safety Sense, 8-in touchscreen"],
    ["Nightshade", 26000, "2.0L I4", 169, "35 mpg", "FWD", "crbh", "Black wheels and trim, heated seats"],
    ["XSE", 28000, "2.0L I4", 169, "33 mpg", "FWD", "crbh", "Heated seats, premium audio"],
  ],
  "toyota-corolla-cross": [
    ["L", 24500, "2.0L I4", 169, "32 mpg", "FWD", "crb", "Toyota Safety Sense, 8-in touchscreen"],
    ["LE", 28500, "2.0L I4", 169, "31 mpg", "FWD or AWD", "acrbh", "Heated seats, smart key"],
    ["Hybrid S", 30000, "2.0L hybrid I4", 196, "42 mpg", "AWD", "acrbh", "Standard AWD, sport styling"],
    ["XLE", 30500, "2.0L I4", 169, "31 mpg", "FWD or AWD", "acrbhs", "Moonroof, 18-in wheels"],
  ],
  "toyota-crown": [
    ["XLE", 41000, "2.5L hybrid I4", 236, "41 mpg", "AWD", "acrbhs", "Standard AWD, 12.3-in touchscreen"],
    ["Limited", 46000, "2.5L hybrid I4", 236, "41 mpg", "AWD", "acrbhs", "Leather seats, panoramic roof"],
    ["Platinum", 54000, "2.4L turbo hybrid I4", 340, "30 mpg", "AWD", "acrbhs", "Hybrid Max power, adaptive suspension"],
  ],
  "toyota-crown-signia": [
    ["XLE", 43500, "2.5L hybrid I4", 240, "38 mpg", "AWD", "acrbhs", "Standard AWD, 12.3-in touchscreen"],
    ["Limited", 48000, "2.5L hybrid I4", 240, "38 mpg", "AWD", "acrbhs", "Leather seats, panoramic roof"],
  ],
  "toyota-bz4x": [
    ["XLE", 37000, "Single electric motor", 201, "252 mi range", "FWD", "crbh", "12.3-in touchscreen, heated seats"],
    ["XLE AWD", 39500, "Dual electric motors", 214, "228 mi range", "AWD", "acrbh", "X-MODE AWD, heated seats"],
    ["Limited AWD", 43500, "Dual electric motors", 214, "222 mi range", "AWD", "acrbhs", "Panoramic roof, ventilated seats"],
  ],
  "toyota-grand-highlander": [
    ["XLE", 44500, "2.4L turbo I4", 265, "24 mpg", "FWD or AWD", "acrbh", "Three adult-size rows, 12.3-in touchscreen"],
    ["XLE Hybrid", 46500, "2.5L hybrid I4", 245, "37 mpg", "FWD or AWD", "acrbh", "Hybrid efficiency, three adult-size rows"],
    ["Limited", 51500, "2.4L turbo I4", 265, "23 mpg", "FWD or AWD", "acrbhs", "Leather seats, panoramic roof"],
    ["Hybrid MAX Platinum", 59000, "2.4L turbo hybrid I4", 362, "27 mpg", "AWD", "acrbhs", "Hybrid Max power, head-up display"],
  ],
  "toyota-sequoia": [
    ["SR5", 63000, "3.4L twin-turbo hybrid V6", 437, "21 mpg", "RWD or 4WD", "acrbh", "i-FORCE MAX hybrid, 14-in touchscreen"],
    ["Limited", 71000, "3.4L twin-turbo hybrid V6", 437, "21 mpg", "RWD or 4WD", "acrbhs", "Leather seats, power-folding third row"],
    ["TRD Pro", 81000, "3.4L twin-turbo hybrid V6", 437, "20 mpg", "4WD", "acrbhs", "FOX shocks, locking rear differential"],
    ["Capstone", 86000, "3.4L twin-turbo hybrid V6", 437, "21 mpg", "RWD or 4WD", "acrbhs", "Semi-aniline leather, 22-in wheels"],
  ],
  "toyota-tundra": [
    ["SR", 41000, "3.4L twin-turbo V6", 348, "19 mpg", "RWD or 4WD", "acrb", "Toyota Safety Sense, 8-in touchscreen"],
    ["SR5", 47000, "3.4L twin-turbo V6", 389, "19 mpg", "RWD or 4WD", "acrbh", "14-in touchscreen option, crew cab available"],
    ["Limited", 55000, "3.4L twin-turbo V6", 389, "18 mpg", "RWD or 4WD", "acrbhs", "Leather seats, power rear window"],
    ["TRD Pro", 69000, "3.4L twin-turbo hybrid V6", 437, "20 mpg", "4WD", "acrbhs", "i-FORCE MAX hybrid, FOX shocks"],
  ],
  "toyota-land-cruiser": [
    ["1958", 57000, "2.4L turbo hybrid I4", 326, "23 mpg", "4WD", "acrbh", "Round headlights, full-time 4WD"],
    ["Land Cruiser", 63000, "2.4L turbo hybrid I4", 326, "23 mpg", "4WD", "acrbhs", "Locking differentials, 12.3-in touchscreen"],
    ["First Edition", 74000, "2.4L turbo hybrid I4", 326, "23 mpg", "4WD", "acrbhs", "Leather seats, roof rack, rock rails"],
  ],
  "toyota-gr86": [
    ["Base", 30500, "2.4L flat-4", 228, "22 mpg", "RWD", "crb", "Torsen limited-slip differential, 8-in touchscreen"],
    ["Premium", 33500, "2.4L flat-4", 228, "22 mpg", "RWD", "crbh", "18-in wheels, heated seats"],
  ],
  "toyota-gr-supra": [
    ["3.0", 57000, "3.0L turbo I6", 382, "26 mpg", "RWD", "crbh", "Adaptive suspension, active differential"],
    ["3.0 Premium", 61000, "3.0L turbo I6", 382, "26 mpg", "RWD", "crbh", "JBL audio, head-up display"],
  ],
  "toyota-gr-corolla": [
    ["Core", 39000, "1.6L turbo I3", 300, "24 mpg", "AWD", "acrb", "GR-FOUR AWD, adjustable torque split"],
    ["Premium", 46000, "1.6L turbo I3", 300, "24 mpg", "AWD", "acrbh", "Torsen limited-slip differentials, heated seats"],
  ],
  "toyota-mirai": [
    ["XLE", 51000, "Hydrogen fuel cell", 182, "402 mi range", "RWD", "crbh", "Hydrogen refueling, sold only in California"],
    ["Limited", 68000, "Hydrogen fuel cell", 182, "357 mi range", "RWD", "crbhs", "Panoramic roof, ventilated seats"],
  ],
  "honda-passport": [
    ["EX-L", 42500, "3.5L V6", 280, "21 mpg", "AWD", "acrbhs", "Leather seats, power tailgate"],
    ["TrailSport", 45000, "3.5L V6", 280, "20 mpg", "AWD", "acrbhs", "All-terrain tires, skid plates"],
    ["Black Edition", 48500, "3.5L V6", 280, "21 mpg", "AWD", "acrbhs", "Black trim, ventilated seats"],
  ],
  "honda-ridgeline": [
    ["Sport", 41000, "3.5L V6", 280, "21 mpg", "AWD", "acrbh", "In-bed trunk, dual-action tailgate"],
    ["RTL", 44000, "3.5L V6", 280, "21 mpg", "AWD", "acrbhs", "Leather seats, sunroof"],
    ["TrailSport", 46500, "3.5L V6", 280, "20 mpg", "AWD", "acrbhs", "All-terrain tires, off-road suspension"],
    ["Black Edition", 47500, "3.5L V6", 280, "21 mpg", "AWD", "acrbhs", "Black trim, ventilated seats"],
  ],
  "honda-prologue": [
    ["EX", 48000, "Single electric motor", 220, "308 mi range", "FWD or AWD", "acrbh", "11.3-in touchscreen, Google built-in"],
    ["Touring", 51000, "Single electric motor", 220, "308 mi range", "FWD or AWD", "acrbhs", "Leather seats, panoramic roof"],
    ["Elite", 57000, "Dual electric motors", 288, "283 mi range", "AWD", "acrbhs", "Standard AWD, ventilated seats"],
  ],
  "honda-civic-type-r": [
    ["Type R", 46000, "2.0L turbo I4", 315, "24 mpg", "FWD", "crb", "6-speed manual, adaptive dampers"],
  ],
  "nissan-sentra": [
    ["S", 21500, "2.0L I4", 149, "34 mpg", "FWD", "cb", "Safety Shield 360, 7-in touchscreen"],
    ["SV", 22500, "2.0L I4", 149, "34 mpg", "FWD", "crbh", "12.3-in touchscreen, ProPILOT Assist"],
    ["SR", 25500, "2.0L I4", 149, "33 mpg", "FWD", "crbhs", "Sport styling, 18-in wheels"],
  ],
  "nissan-altima": [
    ["S", 27500, "2.5L I4", 188, "32 mpg", "FWD or AWD", "acb", "Safety Shield 360, 8-in touchscreen"],
    ["SV", 29000, "2.5L I4", 188, "32 mpg", "FWD or AWD", "acrbh", "ProPILOT Assist, heated seats"],
    ["SR", 30500, "2.5L I4", 188, "31 mpg", "FWD or AWD", "acrbhs", "Sport tuning, 19-in wheels"],
    ["SL", 34000, "2.5L I4", 188, "31 mpg", "FWD or AWD", "acrbhs", "Leather seats, Bose audio"],
  ],
  "nissan-kicks": [
    ["S", 22000, "2.0L I4", 141, "31 mpg", "FWD or AWD", "acb", "Safety Shield 360, 7-in touchscreen"],
    ["SV", 23500, "2.0L I4", 141, "31 mpg", "FWD or AWD", "acrbh", "12.3-in touchscreen, ProPILOT Assist"],
    ["SR", 26000, "2.0L I4", 141, "30 mpg", "FWD or AWD", "acrbhs", "Bose headrest speakers, 19-in wheels"],
  ],
  "nissan-murano": [
    ["SV", 41000, "2.0L turbo I4", 241, "24 mpg", "AWD", "acrbh", "Dual 12.3-in screens, standard AWD"],
    ["SL", 46000, "2.0L turbo I4", 241, "24 mpg", "AWD", "acrbhs", "Panoramic roof, leather seats"],
    ["Platinum", 50000, "2.0L turbo I4", 241, "24 mpg", "AWD", "acrbhs", "Massaging seats, Bose audio"],
  ],
  "nissan-pathfinder": [
    ["S", 37500, "3.5L V6", 284, "23 mpg", "FWD or 4WD", "acrb", "Three rows, ProPILOT Assist"],
    ["SV", 40500, "3.5L V6", 284, "23 mpg", "FWD or 4WD", "acrbh", "Heated seats, 8-in touchscreen"],
    ["Rock Creek", 45500, "3.5L V6", 295, "21 mpg", "4WD", "acrbh", "Off-road suspension, 6,000-lb towing"],
    ["Platinum", 51500, "3.5L V6", 284, "22 mpg", "FWD or 4WD", "acrbhs", "Leather seats, panoramic roof"],
  ],
  "nissan-armada": [
    ["SV", 57000, "3.5L twin-turbo V6", 425, "17 mpg", "RWD or 4WD", "acrbh", "14.3-in touchscreen, ProPILOT Assist"],
    ["SL", 64000, "3.5L twin-turbo V6", 425, "17 mpg", "RWD or 4WD", "acrbhs", "Leather seats, power third row"],
    ["PRO-4X", 68000, "3.5L twin-turbo V6", 425, "16 mpg", "4WD", "acrbhs", "Off-road suspension, locking rear differential"],
    ["Platinum", 72000, "3.5L twin-turbo V6", 425, "17 mpg", "RWD or 4WD", "acrbhs", "Massaging seats, Klipsch audio"],
  ],
  "nissan-frontier": [
    ["S", 32000, "3.8L V6", 310, "20 mpg", "RWD or 4WD", "acb", "Safety Shield 360, 8-in touchscreen"],
    ["SV", 36000, "3.8L V6", 310, "20 mpg", "RWD or 4WD", "acrbh", "12.3-in touchscreen, heated seats"],
    ["PRO-4X", 42500, "3.8L V6", 310, "19 mpg", "4WD", "acrbh", "Locking rear differential, Bilstein shocks"],
  ],
  "nissan-ariya": [
    ["Engage", 40000, "Single electric motor", 214, "216 mi range", "FWD", "crbh", "Dual 12.3-in screens, ProPILOT Assist"],
    ["Venture+", 45000, "Single electric motor", 238, "289 mi range", "FWD", "crbhs", "Larger battery, panoramic roof"],
    ["Platinum+ e-4ORCE", 54000, "Dual electric motors", 389, "267 mi range", "AWD", "acrbhs", "e-4ORCE AWD, Bose audio"],
  ],
  "nissan-z": [
    ["Sport", 43000, "3.0L twin-turbo V6", 400, "21 mpg", "RWD", "cb", "6-speed manual or 9-speed automatic"],
    ["Performance", 53000, "3.0L twin-turbo V6", 400, "21 mpg", "RWD", "cbh", "Limited-slip differential, larger brakes"],
    ["NISMO", 66000, "3.0L twin-turbo V6", 420, "19 mpg", "RWD", "cbh", "NISMO suspension, Recaro seats"],
  ],
  "mazda-mazda3-sedan": [
    ["2.5 S", 24500, "2.5L I4", 191, "31 mpg", "FWD or AWD", "acrb", "8.8-in display, i-Activsense safety"],
    ["2.5 S Preferred", 28500, "2.5L I4", 191, "31 mpg", "FWD or AWD", "acrbhs", "Leatherette seats, sunroof"],
    ["2.5 Turbo Premium Plus", 35500, "2.5L turbo I4", 250, "27 mpg", "AWD", "acrbhs", "Bose audio, 360-degree camera"],
  ],
  "mazda-cx-30": [
    ["2.5 S", 25500, "2.5L I4", 191, "29 mpg", "AWD", "acrb", "Standard AWD, 10.25-in display"],
    ["2.5 S Premium", 31500, "2.5L I4", 191, "29 mpg", "AWD", "acrbhs", "Leather seats, Bose audio"],
    ["2.5 Turbo Premium Plus", 36500, "2.5L turbo I4", 250, "26 mpg", "AWD", "acrbhs", "Turbo power, 360-degree camera"],
  ],
  "mazda-cx-70": [
    ["3.3 Turbo", 41500, "3.3L turbo I6", 280, "25 mpg", "AWD", "acrbh", "Two rows, 12.3-in display"],
    ["PHEV Preferred", 54000, "2.5L plug-in hybrid I4", 323, "26 mi electric / 25 mpg", "AWD", "acrbhs", "Plug-in hybrid, panoramic roof"],
    ["3.3 Turbo S Premium Plus", 55000, "3.3L turbo I6", 340, "24 mpg", "AWD", "acrbhs", "Higher output, ventilated seats"],
  ],
  "subaru-impreza": [
    ["Base", 23500, "2.0L flat-4", 152, "30 mpg", "AWD", "acrb", "Standard AWD, EyeSight safety"],
    ["Sport", 26500, "2.0L flat-4", 152, "29 mpg", "AWD", "acrbh", "11.6-in touchscreen, heated seats"],
    ["RS", 29500, "2.5L flat-4", 182, "29 mpg", "AWD", "acrbhs", "Sport suspension, Harman Kardon audio"],
  ],
  "subaru-legacy": [
    ["Base", 25500, "2.5L flat-4", 180, "30 mpg", "AWD", "acrb", "Standard AWD, EyeSight safety"],
    ["Premium", 27500, "2.5L flat-4", 180, "30 mpg", "AWD", "acrbh", "11.6-in touchscreen, heated seats"],
    ["Sport", 31500, "2.4L turbo flat-4", 260, "27 mpg", "AWD", "acrbhs", "Turbo power, 19-in wheels"],
    ["Limited", 33500, "2.5L flat-4", 180, "30 mpg", "AWD", "acrbhs", "Leather seats, Harman Kardon audio"],
  ],
  "subaru-brz": [
    ["Premium", 31000, "2.4L flat-4", 228, "22 mpg", "RWD", "crb", "Torsen limited-slip differential, 8-in touchscreen"],
    ["Limited", 34000, "2.4L flat-4", 228, "22 mpg", "RWD", "crbh", "Heated seats, 18-in wheels"],
    ["tS", 37000, "2.4L flat-4", 228, "22 mpg", "RWD", "cbh", "STI-tuned dampers, Brembo brakes"],
  ],
  "subaru-solterra": [
    ["Premium", 39000, "Dual electric motors", 215, "227 mi range", "AWD", "acrbh", "Standard AWD, X-MODE"],
    ["Limited", 44500, "Dual electric motors", 215, "222 mi range", "AWD", "acrbhs", "Panoramic roof, ventilated seats"],
    ["Touring", 47000, "Dual electric motors", 215, "222 mi range", "AWD", "acrbhs", "Harman Kardon audio, 360-degree camera"],
  ],
  "mitsubishi-outlander-sport": [
    ["S", 24000, "2.0L I4", 148, "27 mpg", "FWD or AWD", "acb", "8-in touchscreen, forward collision mitigation"],
    ["SE", 26500, "2.4L I4", 168, "26 mpg", "FWD or AWD", "acrbh", "Adaptive cruise, heated seats"],
    ["Trail Edition", 28000, "2.4L I4", 168, "26 mpg", "AWD", "acrbh", "Standard AWD, roof rack"],
  ],
  // Full lineups: US, Korean and Volkswagen brands
  "chevrolet-trailblazer": [
    ["LS", 23000, "1.2L turbo I3", 137, "31 mpg", "FWD", "cb", "11-in touchscreen, Chevy Safety Assist"],
    ["LT", 25000, "1.3L turbo I3", 155, "30 mpg", "FWD or AWD", "acrbh", "Adaptive cruise, heated seats"],
    ["ACTIV", 28500, "1.3L turbo I3", 155, "29 mpg", "FWD or AWD", "acrbh", "Off-road styling, tuned suspension"],
    ["RS", 29000, "1.3L turbo I3", 155, "29 mpg", "FWD or AWD", "acrbhs", "Sport styling, panoramic sunroof option"],
  ],
  "chevrolet-equinox": [
    ["LT", 29000, "1.5L turbo I4", 175, "26 mpg", "FWD or AWD", "acrbh", "11-in touchscreen, Chevy Safety Assist"],
    ["RS", 33500, "1.5L turbo I4", 175, "26 mpg", "FWD or AWD", "acrbhs", "Black trim, 19-in wheels"],
    ["ACTIV", 34000, "1.5L turbo I4", 175, "25 mpg", "FWD or AWD", "acrbhs", "All-terrain tires, off-road styling"],
  ],
  "chevrolet-blazer": [
    ["2LT", 37500, "2.0L turbo I4", 228, "24 mpg", "FWD or AWD", "acrbh", "10.2-in touchscreen, heated seats"],
    ["3LT", 40500, "2.0L turbo I4", 228, "24 mpg", "FWD or AWD", "acrbhs", "Leather seats, power liftgate"],
    ["RS", 45000, "2.0L turbo I4", 228, "23 mpg", "FWD or AWD", "acrbhs", "Sport styling, 21-in wheels"],
    ["Premier", 46000, "2.0L turbo I4", 228, "23 mpg", "FWD or AWD", "acrbhs", "Ventilated seats, Bose audio"],
  ],
  "chevrolet-blazer-ev": [
    ["LT", 45000, "Single electric motor", 220, "312 mi range", "FWD", "rbh", "17.7-in touchscreen, Super Cruise available"],
    ["RS", 50000, "Dual electric motors", 288, "279 mi range", "AWD", "arbhs", "Sport styling, ventilated seats"],
    ["SS", 61000, "Dual electric motors", 615, "303 mi range", "AWD", "arbhs", "WOW launch mode, 615 hp"],
  ],
  "chevrolet-traverse": [
    ["LS", 40000, "2.5L turbo I4", 328, "23 mpg", "FWD or AWD", "acrbh", "17.7-in touchscreen, three rows"],
    ["LT", 43000, "2.5L turbo I4", 328, "23 mpg", "FWD or AWD", "acrbh", "Remote start, power liftgate"],
    ["Z71", 49000, "2.5L turbo I4", 328, "21 mpg", "AWD", "acrbhs", "Off-road suspension, twin-clutch AWD"],
    ["RS", 55000, "2.5L turbo I4", 328, "22 mpg", "FWD or AWD", "acrbhs", "Super Cruise, 22-in wheels"],
  ],
  "chevrolet-suburban": [
    ["LS", 63000, "5.3L V8", 355, "17 mpg", "RWD or 4WD", "acrbh", "Huge third row, 10.2-in touchscreen"],
    ["LT", 70000, "5.3L V8", 355, "17 mpg", "RWD or 4WD", "acrbhs", "Leather seats, power liftgate"],
    ["Z71", 74000, "5.3L V8", 355, "16 mpg", "4WD", "acrbhs", "Off-road suspension, skid plates"],
    ["High Country", 85000, "6.2L V8", 420, "16 mpg", "RWD or 4WD", "acrbhs", "Air ride suspension, Super Cruise"],
  ],
  "chevrolet-colorado": [
    ["WT", 32000, "2.7L turbo I4", 237, "20 mpg", "RWD or 4WD", "acb", "11.3-in touchscreen, Chevy Safety Assist"],
    ["LT", 37500, "2.7L turbo I4", 310, "20 mpg", "RWD or 4WD", "acrbh", "Higher output, heated seats"],
    ["Z71", 43500, "2.7L turbo I4", 310, "19 mpg", "4WD", "acrbh", "Locking rear differential, off-road suspension"],
    ["ZR2", 50500, "2.7L turbo I4", 310, "17 mpg", "4WD", "acrbhs", "Multimatic DSSV dampers, front and rear lockers"],
  ],
  "chevrolet-silverado-2500hd": [
    ["WT", 46000, "6.6L V8", 401, "Not EPA-rated", "RWD or 4WD", "acb", "Heavy-duty frame, 14,500-lb towing"],
    ["LT", 55000, "6.6L V8", 401, "Not EPA-rated", "RWD or 4WD", "acrbh", "13.4-in touchscreen, heated seats"],
    ["LTZ", 66000, "6.6L turbo-diesel V8", 470, "Not EPA-rated", "RWD or 4WD", "acrbhs", "Duramax diesel, leather seats"],
    ["High Country", 76000, "6.6L turbo-diesel V8", 470, "Not EPA-rated", "4WD", "acrbhs", "Duramax diesel, 22,500-lb towing"],
  ],
  "chevrolet-silverado-ev": [
    ["WT", 57000, "Dual electric motors", 510, "450 mi range", "AWD", "arb", "Max Range battery, Multi-Flex midgate"],
    ["LT", 75000, "Dual electric motors", 754, "408 mi range", "AWD", "arbhs", "17-in touchscreen, Super Cruise"],
    ["RST", 90000, "Dual electric motors", 754, "440 mi range", "AWD", "arbhs", "Four-wheel steering, air suspension"],
  ],
  "chevrolet-corvette": [
    ["Stingray 1LT", 70000, "6.2L V8", 490, "19 mpg", "RWD", "cbh", "Mid-engine, removable roof panel"],
    ["Stingray 3LT", 83000, "6.2L V8", 490, "19 mpg", "RWD", "cbh", "Leather interior, Bose audio"],
    ["E-Ray", 108000, "6.2L V8 hybrid", 655, "19 mpg", "AWD", "acbh", "Front electric motor, eAWD"],
    ["Z06", 115000, "5.5L flat-plane V8", 670, "14 mpg", "RWD", "cbh", "Track-focused, 8,600-rpm redline"],
    ["ZR1", 175000, "5.5L twin-turbo flat-plane V8", 1064, "13 mpg", "RWD", "cbh", "1,064 hp, active aero"],
  ],
  "chevrolet-malibu": [
    ["LS", 26000, "1.5L turbo I4", 163, "32 mpg", "FWD", "cb", "8-in touchscreen, Chevy Safety Assist"],
    ["RS", 27500, "1.5L turbo I4", 163, "32 mpg", "FWD", "cb", "Sport styling, 18-in wheels"],
    ["LT", 28500, "1.5L turbo I4", 163, "32 mpg", "FWD", "cbh", "Heated seats, dual-zone climate"],
  ],
  "ford-escape": [
    ["Active", 30000, "1.5L turbo I3", 180, "30 mpg", "FWD or AWD", "acrb", "13.2-in touchscreen, Co-Pilot360"],
    ["ST-Line", 32000, "1.5L turbo I3", 180, "30 mpg", "FWD or AWD", "acrbh", "Sport styling, heated seats"],
    ["Platinum", 39000, "2.0L turbo I4", 250, "26 mpg", "AWD", "acrbhs", "Leather seats, B&O audio"],
    ["Plug-In Hybrid", 41000, "2.5L plug-in hybrid I4", 210, "37 mi electric / 40 mpg", "FWD", "crbhs", "Plug-in hybrid, 37-mi electric range"],
  ],
  "ford-bronco-sport": [
    ["Big Bend", 32000, "1.5L turbo I3", 180, "26 mpg", "4WD", "acrbh", "13.2-in touchscreen, G.O.A.T. modes"],
    ["Outer Banks", 35500, "1.5L turbo I3", 180, "26 mpg", "4WD", "acrbhs", "Leather seats, 18-in wheels"],
    ["Badlands", 40000, "2.0L turbo I4", 250, "23 mpg", "4WD", "acrbhs", "Twin-clutch rear drive, off-road suspension"],
  ],
  "ford-expedition": [
    ["Active", 61000, "3.5L twin-turbo V6", 400, "19 mpg", "RWD or 4WD", "acrbh", "24-in panoramic display, BlueCruise available"],
    ["Tremor", 79000, "3.5L twin-turbo V6", 440, "17 mpg", "4WD", "acrbhs", "Off-road suspension, 33-in all-terrain tires"],
    ["Platinum", 82000, "3.5L twin-turbo V6", 440, "18 mpg", "RWD or 4WD", "acrbhs", "Massaging seats, B&O audio"],
  ],
  "ford-ranger": [
    ["XL", 33500, "2.3L turbo I4", 270, "21 mpg", "RWD or 4WD", "acb", "10.1-in touchscreen, Co-Pilot360"],
    ["XLT", 37500, "2.3L turbo I4", 270, "21 mpg", "RWD or 4WD", "acrbh", "Adaptive cruise, heated seats"],
    ["Lariat", 47000, "2.7L turbo V6", 315, "19 mpg", "4WD", "acrbhs", "Leather seats, B&O audio"],
    ["Raptor", 57000, "3.0L twin-turbo V6", 405, "17 mpg", "4WD", "acrbhs", "FOX Live Valve shocks, 33-in tires"],
  ],
  "ford-f-150-lightning": [
    ["XLT", 55000, "Dual electric motors", 452, "240 mi range", "AWD", "acrbh", "Pro Power Onboard, mega power frunk"],
    ["Flash", 63000, "Dual electric motors", 580, "320 mi range", "AWD", "acrbh", "Extended-range battery, 15.5-in touchscreen"],
    ["Lariat", 77000, "Dual electric motors", 580, "320 mi range", "AWD", "acrbhs", "Leather seats, B&O audio"],
    ["Platinum", 85000, "Dual electric motors", 580, "300 mi range", "AWD", "acrbhs", "Massaging seats, 22-in wheels"],
  ],
  "ford-f-250-super-duty": [
    ["XL", 46000, "6.8L V8", 405, "Not EPA-rated", "RWD or 4WD", "acb", "Heavy-duty frame, 12-in touchscreen"],
    ["XLT", 53000, "7.3L V8", 430, "Not EPA-rated", "RWD or 4WD", "acrbh", "Bigger V8, remote start"],
    ["Lariat", 66000, "6.7L turbo-diesel V8", 475, "Not EPA-rated", "RWD or 4WD", "acrbhs", "Power Stroke diesel, leather seats"],
    ["Platinum", 85000, "6.7L high-output turbo-diesel V8", 500, "Not EPA-rated", "4WD", "acrbhs", "High-output diesel, massaging seats"],
  ],
  "gmc-acadia": [
    ["Elevation", 44000, "2.5L turbo I4", 328, "22 mpg", "FWD or AWD", "acrbh", "15-in touchscreen, three rows"],
    ["AT4", 50000, "2.5L turbo I4", 328, "21 mpg", "AWD", "acrbhs", "Off-road suspension, twin-clutch AWD"],
    ["Denali", 54000, "2.5L turbo I4", 328, "22 mpg", "FWD or AWD", "acrbhs", "Super Cruise available, ventilated seats"],
  ],
  "gmc-canyon": [
    ["Elevation", 38500, "2.7L turbo I4", 310, "20 mpg", "RWD or 4WD", "acrbh", "11.3-in touchscreen, heated seats"],
    ["AT4", 47000, "2.7L turbo I4", 310, "19 mpg", "4WD", "acrbhs", "Locking rear differential, leather seats"],
    ["Denali", 53500, "2.7L turbo I4", 310, "19 mpg", "4WD", "acrbhs", "Ventilated seats, Bose audio"],
    ["AT4X", 58000, "2.7L turbo I4", 310, "17 mpg", "4WD", "acrbhs", "Multimatic DSSV dampers, front and rear lockers"],
  ],
  "gmc-sierra-2500hd": [
    ["Pro", 47000, "6.6L V8", 401, "Not EPA-rated", "RWD or 4WD", "acb", "Heavy-duty frame, 14,500-lb towing"],
    ["SLT", 62000, "6.6L V8", 401, "Not EPA-rated", "RWD or 4WD", "acrbhs", "Leather seats, MultiPro tailgate"],
    ["AT4", 70000, "6.6L turbo-diesel V8", 470, "Not EPA-rated", "4WD", "acrbhs", "Duramax diesel, off-road suspension"],
    ["Denali", 77000, "6.6L turbo-diesel V8", 470, "Not EPA-rated", "RWD or 4WD", "acrbhs", "Duramax diesel, 22,500-lb towing"],
  ],
  "gmc-hummer-ev-pickup": [
    ["2X", 97000, "Dual electric motors", 570, "311 mi range", "AWD", "arbhs", "CrabWalk, removable roof panels"],
    ["3X", 107000, "Three electric motors", 830, "381 mi range", "AWD", "arbhs", "Watts to Freedom launch, Super Cruise"],
  ],
  "gmc-hummer-ev-suv": [
    ["2X", 99000, "Dual electric motors", 570, "314 mi range", "AWD", "arbhs", "CrabWalk, removable roof panels"],
    ["3X", 105000, "Three electric motors", 830, "314 mi range", "AWD", "arbhs", "Watts to Freedom launch, Super Cruise"],
  ],
  "gmc-sierra-ev": [
    ["Elevation", 90000, "Dual electric motors", 760, "390 mi range", "AWD", "arbhs", "16.8-in touchscreen, Multi-Pro midgate"],
    ["AT4", 98000, "Dual electric motors", 760, "314 mi range", "AWD", "arbhs", "Off-road tires, air suspension"],
    ["Denali", 100000, "Dual electric motors", 760, "440 mi range", "AWD", "arbhs", "Four-wheel steering, Super Cruise"],
  ],
  "jeep-grand-cherokee-l": [
    ["Laredo", 42000, "3.6L V6", 293, "21 mpg", "RWD or 4WD", "acrbh", "Three rows, 10.1-in touchscreen"],
    ["Limited", 50000, "3.6L V6", 293, "21 mpg", "RWD or 4WD", "acrbhs", "Leather seats, power liftgate"],
    ["Overland", 57000, "3.6L V6", 293, "20 mpg", "4WD", "acrbhs", "Quadra-Trac II 4WD, air suspension"],
    ["Summit", 64000, "3.6L V6", 293, "20 mpg", "RWD or 4WD", "acrbhs", "Quilted leather, McIntosh audio"],
  ],
  "jeep-wagoneer": [
    ["Wagoneer", 63000, "3.0L twin-turbo I6", 420, "19 mpg", "RWD or 4WD", "acrbh", "Hurricane I6, 12.3-in touchscreen"],
    ["Series II", 74000, "3.0L twin-turbo I6", 420, "19 mpg", "RWD or 4WD", "acrbhs", "Leather seats, panoramic roof"],
    ["Series III", 82000, "3.0L twin-turbo I6", 420, "18 mpg", "4WD", "acrbhs", "Air suspension, McIntosh audio"],
  ],
  "jeep-grand-wagoneer": [
    ["Series I", 91000, "3.0L twin-turbo I6", 510, "17 mpg", "4WD", "acrbhs", "Hurricane high-output I6, air suspension"],
    ["Series II", 100000, "3.0L twin-turbo I6", 510, "17 mpg", "4WD", "acrbhs", "Quilted leather, rear-seat screens"],
    ["Series III", 110000, "3.0L twin-turbo I6", 510, "17 mpg", "4WD", "acrbhs", "McIntosh audio, massaging seats"],
  ],
  "jeep-wagoneer-s": [
    ["Launch Edition", 72000, "Dual electric motors", 600, "303 mi range", "AWD", "acrbhs", "600 hp, McIntosh audio"],
  ],
  "ram-3500": [
    ["Tradesman", 50000, "6.4L V8", 405, "Not EPA-rated", "RWD or 4WD", "acb", "Dual rear wheels available, 12-in touchscreen option"],
    ["Big Horn", 55000, "6.4L V8", 405, "Not EPA-rated", "RWD or 4WD", "acrbh", "Remote start, heated seats"],
    ["Laramie", 66000, "6.7L Cummins turbo-diesel I6", 370, "Not EPA-rated", "RWD or 4WD", "acrbhs", "Cummins diesel, leather seats"],
    ["Limited", 85000, "6.7L Cummins high-output turbo-diesel I6", 430, "Not EPA-rated", "4WD", "acrbhs", "High-output Cummins, 37,090-lb towing"],
  ],
  "buick-envision": [
    ["Preferred", 37000, "2.0L turbo I4", 228, "26 mpg", "AWD", "acrbh", "Standard AWD, 30-in curved display"],
    ["Sport Touring", 39500, "2.0L turbo I4", 228, "26 mpg", "AWD", "acrbhs", "Sport styling, panoramic roof"],
    ["Avenir", 46000, "2.0L turbo I4", 228, "26 mpg", "AWD", "acrbhs", "Quilted leather, ventilated seats"],
  ],
  "hyundai-sonata": [
    ["SE", 27500, "2.5L I4", 191, "32 mpg", "FWD", "crb", "12.3-in touchscreen, Highway Driving Assist"],
    ["SEL", 29500, "2.5L I4", 191, "30 mpg", "FWD or AWD", "acrbh", "AWD available, heated seats"],
    ["Hybrid SEL", 31500, "2.0L hybrid I4", 192, "47 mpg", "FWD", "crbh", "Hybrid efficiency, heated seats"],
    ["N Line", 36000, "2.5L turbo I4", 290, "27 mpg", "FWD", "crbhs", "Turbo power, sport seats"],
  ],
  "hyundai-kona": [
    ["SE", 25000, "2.0L I4", 147, "31 mpg", "FWD or AWD", "acrb", "12.3-in touchscreen, Highway Driving Assist"],
    ["SEL", 27000, "2.0L I4", 147, "31 mpg", "FWD or AWD", "acrbh", "Heated seats, smart key"],
    ["N Line", 32000, "1.6L turbo I4", 190, "27 mpg", "FWD or AWD", "acrbhs", "Turbo power, sport styling"],
    ["Limited", 33000, "1.6L turbo I4", 190, "27 mpg", "FWD or AWD", "acrbhs", "Leather seats, ventilated seats"],
  ],
  "hyundai-kona-electric": [
    ["SE", 33000, "Single electric motor", 133, "200 mi range", "FWD", "crbh", "Heat pump, 12.3-in touchscreen"],
    ["SEL", 37500, "Single electric motor", 201, "261 mi range", "FWD", "crbh", "Larger battery, vehicle-to-load"],
    ["Limited", 42000, "Single electric motor", 201, "261 mi range", "FWD", "crbhs", "Leather seats, Bose audio"],
  ],
  "hyundai-santa-cruz": [
    ["SE", 30000, "2.5L I4", 191, "23 mpg", "FWD or AWD", "acrb", "Open bed, 8-in touchscreen"],
    ["SEL", 32500, "2.5L I4", 191, "23 mpg", "FWD or AWD", "acrbh", "Heated seats, tonneau cover"],
    ["XRT", 39000, "2.5L turbo I4", 281, "22 mpg", "AWD", "acrbh", "All-terrain tires, roof rails"],
    ["Limited", 42000, "2.5L turbo I4", 281, "22 mpg", "AWD", "acrbhs", "Leather seats, ventilated seats"],
  ],
  "hyundai-ioniq-6": [
    ["SE Standard Range", 38500, "Single electric motor", 149, "240 mi range", "RWD", "crbh", "Streamlined design, 12.3-in touchscreen"],
    ["SE", 43000, "Single electric motor", 225, "342 mi range", "RWD or AWD", "acrbh", "Long-range battery, Highway Driving Assist"],
    ["SEL", 46000, "Single electric motor", 225, "305 mi range", "RWD or AWD", "acrbhs", "Sunroof, wireless charging"],
    ["Limited", 50000, "Single electric motor", 225, "305 mi range", "RWD or AWD", "acrbhs", "Leather seats, Bose audio"],
  ],
  "hyundai-ioniq-9": [
    ["S", 59000, "Single electric motor", 215, "335 mi range", "RWD", "crbh", "Three rows, 800-volt fast charging"],
    ["SE", 63000, "Dual electric motors", 303, "320 mi range", "AWD", "acrbh", "Standard AWD, heated seats"],
    ["SEL", 67000, "Dual electric motors", 303, "320 mi range", "AWD", "acrbhs", "Relaxation seats, panoramic roof"],
    ["Performance Calligraphy", 77000, "Dual electric motors", 422, "311 mi range", "AWD", "acrbhs", "Higher output, Bose audio"],
  ],
  "kia-soul": [
    ["LX", 20500, "2.0L I4", 147, "30 mpg", "FWD", "cb", "8-in touchscreen, forward collision avoidance"],
    ["S", 22500, "2.0L I4", 147, "30 mpg", "FWD", "crb", "Adaptive cruise, blind-spot monitoring"],
    ["GT-Line", 24000, "2.0L I4", 147, "29 mpg", "FWD", "crbs", "Sport styling, sunroof"],
  ],
  "kia-seltos": [
    ["LX", 25000, "2.0L I4", 147, "29 mpg", "FWD or AWD", "acb", "8-in touchscreen, forward collision avoidance"],
    ["S", 26000, "2.0L I4", 147, "29 mpg", "FWD or AWD", "acrb", "Adaptive cruise, 10.25-in touchscreen"],
    ["EX", 28000, "2.0L I4", 147, "29 mpg", "FWD or AWD", "acrbh", "Heated seats, SynTex upholstery"],
    ["SX", 30500, "1.6L turbo I4", 195, "27 mpg", "AWD", "acrbhs", "Turbo power, Bose audio"],
  ],
  "kia-k5": [
    ["LXS", 27500, "1.6L turbo I4", 180, "31 mpg", "FWD or AWD", "acrb", "12.3-in touchscreen, Highway Driving Assist"],
    ["GT-Line", 30000, "1.6L turbo I4", 180, "31 mpg", "FWD or AWD", "acrbh", "Sport styling, heated seats"],
    ["EX", 32000, "1.6L turbo I4", 180, "30 mpg", "FWD or AWD", "acrbhs", "Leather seats, sunroof"],
    ["GT", 33000, "2.5L turbo I4", 290, "27 mpg", "FWD", "crbhs", "8-speed dual-clutch, sport suspension"],
  ],
  "kia-niro": [
    ["LX", 27500, "1.6L hybrid I4", 139, "53 mpg", "FWD", "crb", "Hybrid efficiency, 8-in touchscreen"],
    ["EX", 30500, "1.6L hybrid I4", 139, "50 mpg", "FWD", "crbh", "Heated seats, 10.25-in touchscreen"],
    ["SX Touring", 34500, "1.6L hybrid I4", 139, "49 mpg", "FWD", "crbhs", "Harman Kardon audio, sunroof"],
  ],
  "kia-niro-ev": [
    ["Wind", 40000, "Single electric motor", 201, "253 mi range", "FWD", "crbh", "Heat pump, vehicle-to-load"],
    ["Wave", 45000, "Single electric motor", 201, "253 mi range", "FWD", "crbhs", "Harman Kardon audio, ventilated seats"],
  ],
  "kia-sorento": [
    ["LX", 32000, "2.5L I4", 191, "25 mpg", "FWD or AWD", "acrb", "Three rows, 12.3-in touchscreen"],
    ["S", 34500, "2.5L I4", 191, "25 mpg", "FWD or AWD", "acrbh", "Heated seats, smart power liftgate"],
    ["Hybrid EX", 39500, "1.6L turbo hybrid I4", 227, "37 mpg", "FWD or AWD", "acrbhs", "Hybrid efficiency, leather seats"],
    ["X-Line SX Prestige", 47000, "2.5L turbo I4", 281, "24 mpg", "AWD", "acrbhs", "Turbo power, Bose audio"],
  ],
  "kia-ev6": [
    ["Light", 43000, "Single electric motor", 225, "250 mi range", "RWD", "crbh", "800-volt fast charging, dual 12.3-in screens"],
    ["Wind", 49000, "Single electric motor", 225, "319 mi range", "RWD or AWD", "acrbh", "Long-range battery, heated seats"],
    ["GT-Line", 55000, "Dual electric motors", 320, "290 mi range", "AWD", "acrbhs", "Sport styling, head-up display"],
    ["GT", 63000, "Dual electric motors", 641, "231 mi range", "AWD", "acrbhs", "641 hp with boost, virtual gear shifts"],
  ],
  "volkswagen-taos": [
    ["S", 25500, "1.5L turbo I4", 174, "31 mpg", "FWD or AWD", "acrb", "IQ.DRIVE assistance, 8-in touchscreen"],
    ["SE", 30000, "1.5L turbo I4", 174, "30 mpg", "FWD or AWD", "acrbh", "Heated seats, 12.9-in touchscreen"],
    ["SEL", 35000, "1.5L turbo I4", 174, "29 mpg", "AWD", "acrbhs", "Leather seats, Harman Kardon audio"],
  ],
  "volkswagen-atlas-cross-sport": [
    ["SE", 39500, "2.0L turbo I4", 269, "23 mpg", "AWD", "acrbh", "Two rows, 12.9-in touchscreen"],
    ["SE with Technology", 43000, "2.0L turbo I4", 269, "23 mpg", "AWD", "acrbhs", "Panoramic sunroof, wireless charging"],
    ["SEL R-Line", 51000, "2.0L turbo I4", 269, "22 mpg", "AWD", "acrbhs", "Ventilated seats, Harman Kardon audio"],
  ],
  "volkswagen-id-buzz": [
    ["Pro S", 61500, "Single electric motor", 282, "234 mi range", "RWD", "crbh", "Three rows, sliding doors"],
    ["Pro S Plus 4MOTION", 67000, "Dual electric motors", 335, "231 mi range", "AWD", "acrbhs", "Dual-motor AWD, Harman Kardon audio"],
  ],
  "volkswagen-golf-r": [
    ["Golf R", 46500, "2.0L turbo I4", 328, "26 mpg", "AWD", "acrbhs", "Torque-vectoring AWD, Drift mode"],
  ],
  // Full lineups: German luxury brands
  "bmw-2-series-coupe": [
    ["230i", 40000, "2.0L turbo I4", 255, "29 mpg", "RWD or AWD", "acrbh", "Rear-drive coupe, curved display"],
    ["M240i", 52000, "3.0L turbo I6", 382, "26 mpg", "RWD or AWD", "acrbhs", "Inline-six, adaptive M suspension"],
  ],
  "bmw-2-series-gran-coupe": [
    ["228", 40000, "2.0L turbo I4", 241, "28 mpg", "FWD or AWD", "acrbh", "Curved display, 7-speed dual-clutch"],
    ["M235 xDrive", 50000, "2.0L turbo I4", 312, "26 mpg", "AWD", "acrbhs", "M Sport suspension, xDrive AWD"],
  ],
  "bmw-4-series": [
    ["430i Gran Coupe", 48000, "2.0L turbo I4", 255, "29 mpg", "RWD or AWD", "acrbh", "Four-door liftback, curved display"],
    ["430i Coupe", 51000, "2.0L turbo I4", 255, "29 mpg", "RWD or AWD", "acrbh", "Two-door coupe, mild-hybrid boost"],
    ["M440i xDrive Coupe", 64000, "3.0L turbo I6", 386, "26 mpg", "AWD", "acrbhs", "Inline-six, M Sport differential"],
  ],
  "bmw-5-series": [
    ["530i", 58000, "2.0L turbo I4", 255, "30 mpg", "RWD or AWD", "acrbh", "14.9-in curved display, mild-hybrid boost"],
    ["540i xDrive", 66000, "3.0L turbo I6", 375, "28 mpg", "AWD", "acrbhs", "Inline-six, xDrive AWD"],
    ["550e xDrive", 75000, "3.0L plug-in hybrid I6", 483, "25 mi electric / 23 mpg", "AWD", "acrbhs", "Plug-in hybrid, 483 hp"],
  ],
  "bmw-i5": [
    ["eDrive40", 67000, "Single electric motor", 335, "295 mi range", "RWD", "crbhs", "14.9-in curved display, Highway Assistant"],
    ["xDrive40", 70000, "Dual electric motors", 389, "268 mi range", "AWD", "acrbhs", "Dual-motor AWD, air suspension"],
    ["M60 xDrive", 85000, "Dual electric motors", 593, "240 mi range", "AWD", "acrbhs", "593 hp, adaptive M suspension"],
  ],
  "bmw-7-series": [
    ["740i", 97000, "3.0L turbo I6", 375, "27 mpg", "RWD", "crbhs", "Air suspension, 31-in rear Theater Screen option"],
    ["740i xDrive", 100000, "3.0L turbo I6", 375, "26 mpg", "AWD", "acrbhs", "xDrive AWD, Bowers & Wilkins option"],
    ["760i xDrive", 122000, "4.4L twin-turbo V8", 536, "20 mpg", "AWD", "acrbhs", "V8 power, executive lounge seating"],
  ],
  "bmw-i7": [
    ["eDrive50", 106000, "Single electric motor", 449, "321 mi range", "RWD", "crbhs", "Air suspension, 31-in rear Theater Screen option"],
    ["xDrive60", 125000, "Dual electric motors", 536, "309 mi range", "AWD", "acrbhs", "Dual-motor AWD, Bowers & Wilkins audio"],
    ["M70 xDrive", 170000, "Dual electric motors", 650, "291 mi range", "AWD", "acrbhs", "650 hp, executive lounge seating"],
  ],
  "bmw-8-series": [
    ["840i Gran Coupe", 89000, "3.0L turbo I6", 335, "25 mpg", "RWD or AWD", "acrbhs", "Four-door coupe, Harman Kardon audio"],
    ["840i Coupe", 91000, "3.0L turbo I6", 335, "25 mpg", "RWD or AWD", "acrbhs", "Two-door grand tourer, leather interior"],
    ["M850i xDrive Coupe", 106000, "4.4L twin-turbo V8", 523, "20 mpg", "AWD", "acrbhs", "V8 power, Integral Active Steering"],
  ],
  "bmw-x1": [
    ["xDrive28i", 42000, "2.0L turbo I4", 241, "28 mpg", "AWD", "acrbh", "Standard AWD, curved display"],
    ["M35i xDrive", 51000, "2.0L turbo I4", 312, "26 mpg", "AWD", "acrbhs", "M Sport suspension, sport exhaust"],
  ],
  "bmw-x2": [
    ["xDrive28i", 44000, "2.0L turbo I4", 241, "27 mpg", "AWD", "acrbh", "Coupe-style roof, curved display"],
    ["M35i xDrive", 53000, "2.0L turbo I4", 312, "25 mpg", "AWD", "acrbhs", "M Sport suspension, quad exhaust"],
  ],
  "bmw-x4": [
    ["xDrive30i", 56000, "2.0L turbo I4", 248, "25 mpg", "AWD", "acrbh", "Coupe-style roof, xDrive AWD"],
    ["M40i", 66000, "3.0L turbo I6", 382, "24 mpg", "AWD", "acrbhs", "Inline-six, M Sport differential"],
    ["X4 M Competition", 83000, "3.0L twin-turbo I6", 503, "17 mpg", "AWD", "acrbhs", "503 hp, M Sport differential"],
  ],
  "bmw-x6": [
    ["xDrive40i", 76000, "3.0L turbo I6", 375, "23 mpg", "AWD", "acrbhs", "Coupe-style roof, curved display"],
    ["M60i xDrive", 95000, "4.4L twin-turbo V8", 523, "19 mpg", "AWD", "acrbhs", "V8 power, air suspension"],
    ["X6 M Competition", 131000, "4.4L twin-turbo V8", 617, "16 mpg", "AWD", "acrbhs", "617 hp, M-tuned chassis"],
  ],
  "bmw-x7": [
    ["xDrive40i", 85000, "3.0L turbo I6", 375, "22 mpg", "AWD", "acrbhs", "Three rows, air suspension"],
    ["M60i xDrive", 112000, "4.4L twin-turbo V8", 523, "18 mpg", "AWD", "acrbhs", "V8 power, Sky Lounge roof option"],
  ],
  "bmw-xm": [
    ["XM", 160000, "4.4L twin-turbo V8 plug-in hybrid", 644, "31 mi electric / 14 mpg", "AWD", "acrbhs", "Plug-in hybrid V8, adaptive M suspension"],
    ["Label", 186000, "4.4L twin-turbo V8 plug-in hybrid", 738, "29 mi electric / 14 mpg", "AWD", "acrbhs", "738 hp, carbon trim"],
  ],
  "bmw-ix": [
    ["xDrive50", 88000, "Dual electric motors", 516, "307 mi range", "AWD", "acrbhs", "Curved display, panoramic glass roof"],
    ["M60", 112000, "Dual electric motors", 610, "274 mi range", "AWD", "acrbhs", "610 hp, air suspension"],
  ],
  "bmw-z4": [
    ["sDrive30i", 55000, "2.0L turbo I4", 255, "28 mpg", "RWD", "crbh", "Power soft top, adaptive LED lights"],
    ["M40i", 67000, "3.0L turbo I6", 382, "26 mpg", "RWD", "crbh", "6-speed manual available, adaptive M suspension"],
  ],
  "bmw-m2": [
    ["M2", 65000, "3.0L twin-turbo I6", 473, "19 mpg", "RWD", "crbh", "6-speed manual or 8-speed automatic, M differential"],
  ],
  "bmw-m4": [
    ["Coupe", 81000, "3.0L twin-turbo I6", 473, "19 mpg", "RWD", "crbhs", "6-speed manual, adaptive M suspension"],
    ["Competition xDrive Coupe", 90000, "3.0L twin-turbo I6", 523, "19 mpg", "AWD", "acrbhs", "M xDrive AWD, carbon roof"],
    ["CS", 124000, "3.0L twin-turbo I6", 543, "19 mpg", "AWD", "acrbh", "543 hp, carbon body parts and track-tuned suspension"],
  ],
  "bmw-m5": [
    ["M5", 120000, "4.4L twin-turbo V8 plug-in hybrid", 717, "25 mi electric / 15 mpg", "AWD", "acrbhs", "717-hp plug-in hybrid V8, M xDrive"],
  ],
  "mercedes-benz-gla": [
    ["GLA 250", 44000, "2.0L turbo I4", 221, "28 mpg", "FWD or AWD", "acrbh", "MBUX touchscreen, mild-hybrid boost"],
    ["AMG GLA 35", 58000, "2.0L turbo I4", 302, "24 mpg", "AWD", "acrbhs", "AMG suspension, 4MATIC AWD"],
  ],
  "mercedes-benz-glb": [
    ["GLB 250 4MATIC", 47000, "2.0L turbo I4", 221, "26 mpg", "AWD", "acrbh", "Optional third row, 4MATIC AWD"],
    ["AMG GLB 35", 60000, "2.0L turbo I4", 302, "23 mpg", "AWD", "acrbhs", "AMG suspension, sport exhaust"],
  ],
  "mercedes-benz-gle": [
    ["GLE 350", 63000, "2.0L turbo I4", 255, "23 mpg", "RWD or AWD", "acrbhs", "MBUX dual screens, mild-hybrid boost"],
    ["GLE 450 4MATIC", 71000, "3.0L turbo I6", 375, "22 mpg", "AWD", "acrbhs", "Inline-six, optional third row"],
    ["GLE 450e 4MATIC", 72000, "2.0L plug-in hybrid I4", 381, "48 mi electric / 22 mpg", "AWD", "acrbhs", "Plug-in hybrid, 48-mi electric range"],
    ["GLE 580 4MATIC", 92000, "4.0L twin-turbo V8", 510, "19 mpg", "AWD", "acrbhs", "V8 power, E-Active Body Control option"],
    ["AMG GLE 63 S", 125000, "4.0L twin-turbo V8", 603, "16 mpg", "AWD", "acrbhs", "AMG active ride control, 603 hp"],
  ],
  "mercedes-benz-gle-coupe": [
    ["GLE 450 4MATIC Coupe", 82000, "3.0L turbo I6", 375, "21 mpg", "AWD", "acrbhs", "Coupe-style roof, air suspension"],
    ["AMG GLE 53 Coupe", 92000, "3.0L turbo I6", 429, "21 mpg", "AWD", "acrbhs", "AMG suspension, mild-hybrid boost"],
    ["AMG GLE 63 S Coupe", 130000, "4.0L twin-turbo V8", 603, "16 mpg", "AWD", "acrbhs", "AMG active ride control, 603 hp"],
  ],
  "mercedes-benz-glc-coupe": [
    ["GLC 300 4MATIC Coupe", 59000, "2.0L turbo I4", 255, "25 mpg", "AWD", "acrbhs", "Coupe-style roof, 11.9-in touchscreen"],
    ["AMG GLC 43 Coupe", 72000, "2.0L turbo I4", 416, "22 mpg", "AWD", "acrbhs", "AMG suspension, electric turbocharger"],
  ],
  "mercedes-benz-cla": [
    ["CLA 250", 44000, "2.0L turbo I4", 221, "29 mpg", "FWD or AWD", "acrbh", "MBUX touchscreen, coupe-like roofline"],
    ["AMG CLA 35", 56000, "2.0L turbo I4", 302, "25 mpg", "AWD", "acrbhs", "AMG suspension, 4MATIC AWD"],
    ["AMG CLA 45 S", 66000, "2.0L turbo I4", 416, "23 mpg", "AWD", "acrbhs", "416-hp four-cylinder, drift mode"],
  ],
  "mercedes-benz-cle": [
    ["CLE 300 4MATIC Coupe", 58000, "2.0L turbo I4", 255, "27 mpg", "AWD", "acrbhs", "Two-door coupe, 11.9-in touchscreen"],
    ["CLE 450 4MATIC Coupe", 68000, "3.0L turbo I6", 375, "26 mpg", "AWD", "acrbhs", "Inline-six, Burmester audio"],
    ["AMG CLE 53 Coupe", 78000, "3.0L turbo I6", 443, "23 mpg", "AWD", "acrbhs", "AMG suspension, rear-axle steering"],
  ],
  "mercedes-benz-eqb": [
    ["EQB 250+", 53000, "Single electric motor", 188, "251 mi range", "FWD", "crbh", "Optional third row, MBUX touchscreen"],
    ["EQB 300 4MATIC", 57000, "Dual electric motors", 228, "221 mi range", "AWD", "acrbh", "Dual-motor AWD, heated seats"],
    ["EQB 350 4MATIC", 61000, "Dual electric motors", 288, "221 mi range", "AWD", "acrbhs", "Higher output, panoramic roof"],
  ],
  "mercedes-benz-eqe": [
    ["EQE 350+", 76000, "Single electric motor", 288, "308 mi range", "RWD", "crbhs", "MBUX Hyperscreen option, air suspension option"],
    ["EQE 350 4MATIC", 79000, "Dual electric motors", 288, "260 mi range", "AWD", "acrbhs", "Dual-motor AWD, Burmester audio"],
    ["AMG EQE", 108000, "Dual electric motors", 617, "219 mi range", "AWD", "acrbhs", "617 hp with boost, AMG suspension"],
  ],
  "mercedes-benz-eqe-suv": [
    ["EQE 350+ SUV", 78000, "Single electric motor", 288, "279 mi range", "RWD", "crbhs", "MBUX Hyperscreen option, power liftgate"],
    ["EQE 350 4MATIC SUV", 81000, "Dual electric motors", 288, "253 mi range", "AWD", "acrbhs", "Dual-motor AWD, Burmester audio"],
    ["EQE 500 4MATIC SUV", 95000, "Dual electric motors", 402, "253 mi range", "AWD", "acrbhs", "Higher output, air suspension"],
    ["AMG EQE SUV", 113000, "Dual electric motors", 617, "220 mi range", "AWD", "acrbhs", "617 hp with boost, AMG suspension"],
  ],
  "mercedes-benz-eqs": [
    ["EQS 450+", 105000, "Single electric motor", 355, "390 mi range", "RWD", "crbhs", "390-mi range, MBUX Hyperscreen option"],
    ["EQS 450 4MATIC", 108000, "Dual electric motors", 355, "370 mi range", "AWD", "acrbhs", "Dual-motor AWD, rear-axle steering"],
    ["EQS 580 4MATIC", 128000, "Dual electric motors", 536, "340 mi range", "AWD", "acrbhs", "536 hp, massaging seats"],
  ],
  "mercedes-benz-eqs-suv": [
    ["EQS 450+ SUV", 105000, "Single electric motor", 355, "339 mi range", "RWD", "crbhs", "Three rows, MBUX Hyperscreen option"],
    ["EQS 450 4MATIC SUV", 108000, "Dual electric motors", 355, "305 mi range", "AWD", "acrbhs", "Dual-motor AWD, air suspension"],
    ["EQS 580 4MATIC SUV", 128000, "Dual electric motors", 536, "285 mi range", "AWD", "acrbhs", "536 hp, Burmester 3D audio"],
    ["Maybach EQS 680 SUV", 180000, "Dual electric motors", 649, "281 mi range", "AWD", "acrbhs", "Maybach rear seats, two-tone paint"],
  ],
  "mercedes-benz-amg-gt": [
    ["AMG GT 43 Coupe", 107000, "2.0L turbo I4", 416, "22 mpg", "RWD", "crbh", "2+2 seating, electric turbocharger"],
    ["AMG GT 55 Coupe", 137000, "4.0L twin-turbo V8", 469, "16 mpg", "AWD", "acrbh", "V8 power, 4MATIC+ AWD"],
    ["AMG GT 63 Coupe", 177000, "4.0L twin-turbo V8", 577, "16 mpg", "AWD", "acrbh", "577 hp, active roll stabilization"],
    ["AMG GT 63 PRO Coupe", 200000, "4.0L twin-turbo V8", 603, "16 mpg", "AWD", "acrbh", "Track-tuned suspension, extra aero"],
  ],
  "mercedes-benz-sl": [
    ["AMG SL 43", 110000, "2.0L turbo I4", 415, "22 mpg", "RWD", "crbh", "Power soft top, 2+2 seating"],
    ["AMG SL 55", 145000, "4.0L twin-turbo V8", 469, "16 mpg", "AWD", "acrbh", "V8 power, 4MATIC+ AWD"],
    ["AMG SL 63", 185000, "4.0L twin-turbo V8", 577, "16 mpg", "AWD", "acrbh", "577 hp, active roll stabilization"],
    ["AMG SL 63 S E Performance", 200000, "4.0L twin-turbo V8 plug-in hybrid", 805, "8 mi electric / 16 mpg", "AWD", "acrbh", "805-hp plug-in hybrid, active aero"],
  ],
  "audi-a5": [
    ["Premium", 47000, "2.0L turbo I4", 268, "29 mpg", "AWD", "acrbh", "quattro AWD, 11.9-in touchscreen"],
    ["Premium Plus", 51000, "2.0L turbo I4", 268, "29 mpg", "AWD", "acrbhs", "Panoramic roof, Bang & Olufsen audio"],
    ["S5 Premium", 62000, "3.0L turbo V6", 362, "25 mpg", "AWD", "acrbhs", "Sport differential, adaptive suspension"],
  ],
  "audi-a6": [
    ["45 Premium", 60000, "2.0L turbo I4", 261, "27 mpg", "AWD", "acrbh", "quattro AWD, dual touchscreens"],
    ["55 Premium Plus", 67000, "3.0L turbo V6", 335, "25 mpg", "AWD", "acrbhs", "V6 power, Bang & Olufsen audio"],
    ["S6 Premium Plus", 79000, "2.9L twin-turbo V6", 444, "21 mpg", "AWD", "acrbhs", "Sport differential, adaptive air suspension"],
  ],
  "audi-a6-e-tron": [
    ["Premium", 66000, "Single electric motor", 375, "370 mi range", "RWD", "crbhs", "800-volt fast charging, curved display"],
    ["quattro Premium Plus", 74000, "Dual electric motors", 456, "325 mi range", "AWD", "acrbhs", "Dual-motor quattro, Bang & Olufsen audio"],
    ["S6 e-tron", 86000, "Dual electric motors", 543, "320 mi range", "AWD", "acrbhs", "543 hp with boost, air suspension"],
  ],
  "audi-a7": [
    ["55 Premium", 75000, "3.0L turbo V6", 335, "24 mpg", "AWD", "acrbhs", "Sportback liftgate, dual touchscreens"],
    ["55 Prestige", 85000, "3.0L turbo V6", 335, "24 mpg", "AWD", "acrbhs", "Head-up display, Bang & Olufsen audio"],
    ["S7 Premium Plus", 90000, "2.9L twin-turbo V6", 444, "21 mpg", "AWD", "acrbhs", "Sport differential, adaptive air suspension"],
    ["RS 7 performance", 130000, "4.0L twin-turbo V8", 621, "17 mpg", "AWD", "acrbhs", "621 hp, RS adaptive air suspension"],
  ],
  "audi-a8": [
    ["A8 L 55", 91000, "3.0L turbo V6", 335, "22 mpg", "AWD", "acrbhs", "Long wheelbase, air suspension"],
    ["S8", 122000, "4.0L twin-turbo V8", 563, "18 mpg", "AWD", "acrbhs", "563 hp, predictive active suspension"],
  ],
  "audi-q3": [
    ["Premium", 40000, "2.0L turbo I4", 228, "24 mpg", "AWD", "acrbh", "quattro AWD, virtual cockpit"],
    ["Premium Plus", 44000, "2.0L turbo I4", 228, "24 mpg", "AWD", "acrbhs", "Panoramic roof, heated seats"],
    ["Prestige", 48000, "2.0L turbo I4", 228, "24 mpg", "AWD", "acrbhs", "Bang & Olufsen audio, 360-degree camera"],
  ],
  "audi-q4-e-tron": [
    ["45 Premium", 50000, "Single electric motor", 282, "258 mi range", "RWD", "crbh", "11.6-in touchscreen, heat pump"],
    ["55 quattro Premium", 54000, "Dual electric motors", 335, "244 mi range", "AWD", "acrbhs", "Dual-motor quattro, panoramic roof"],
    ["55 quattro Prestige", 61000, "Dual electric motors", 335, "244 mi range", "AWD", "acrbhs", "Augmented-reality head-up display, Sonos audio"],
  ],
  "audi-q6-e-tron": [
    ["Premium", 64000, "Dual electric motors", 456, "307 mi range", "AWD", "acrbhs", "800-volt fast charging, curved display"],
    ["Premium Plus", 68000, "Dual electric motors", 456, "307 mi range", "AWD", "acrbhs", "Passenger display, Bang & Olufsen audio"],
    ["SQ6 Premium", 73000, "Dual electric motors", 510, "275 mi range", "AWD", "acrbhs", "510 hp with launch control, air suspension"],
  ],
  "audi-q8": [
    ["Premium", 74000, "3.0L turbo V6", 335, "20 mpg", "AWD", "acrbhs", "Coupe-style roof, dual touchscreens"],
    ["Premium Plus", 78000, "3.0L turbo V6", 335, "20 mpg", "AWD", "acrbhs", "Bang & Olufsen audio, head-up display"],
    ["SQ8", 97000, "4.0L twin-turbo V8", 500, "17 mpg", "AWD", "acrbhs", "V8 power, adaptive air suspension"],
    ["RS Q8 Performance", 140000, "4.0L twin-turbo V8", 631, "15 mpg", "AWD", "acrbhs", "631 hp, carbon-ceramic brakes"],
  ],
  "porsche-macan": [
    ["Macan", 64000, "2.0L turbo I4", 261, "21 mpg", "AWD", "acrbh", "Standard AWD, 10.9-in touchscreen"],
    ["Macan T", 69000, "2.0L turbo I4", 261, "21 mpg", "AWD", "acrbh", "Sport suspension, Sport Chrono"],
    ["Macan S", 78000, "2.9L twin-turbo V6", 375, "19 mpg", "AWD", "acrbhs", "Twin-turbo V6, adaptive dampers"],
    ["Macan GTS", 92000, "2.9L twin-turbo V6", 434, "19 mpg", "AWD", "acrbhs", "434 hp, air suspension"],
  ],
  "porsche-panamera": [
    ["Panamera", 104000, "2.9L twin-turbo V6", 348, "21 mpg", "RWD", "crbhs", "Air suspension, curved digital gauges"],
    ["Panamera 4", 110000, "2.9L twin-turbo V6", 348, "21 mpg", "AWD", "acrbhs", "Standard AWD, passenger display option"],
    ["Panamera GTS", 153000, "4.0L twin-turbo V8", 493, "18 mpg", "AWD", "acrbhs", "V8 power, sport exhaust"],
    ["Panamera Turbo E-Hybrid", 196000, "4.0L twin-turbo V8 plug-in hybrid", 670, "40 mi electric / 19 mpg", "AWD", "acrbhs", "670-hp plug-in hybrid, Active Ride option"],
    ["Panamera Turbo S E-Hybrid", 225000, "4.0L twin-turbo V8 plug-in hybrid", 771, "40 mi electric / 18 mpg", "AWD", "acrbhs", "771 hp, Porsche Active Ride"],
  ],
  "porsche-718-cayman": [
    ["718 Cayman", 72000, "2.0L turbo flat-4", 300, "24 mpg", "RWD", "cbh", "Mid-engine, front and rear trunks"],
    ["718 Cayman GTS 4.0", 102000, "4.0L flat-6", 394, "20 mpg", "RWD", "cbh", "Naturally aspirated flat-six, limited-slip differential"],
    ["718 Cayman GT4 RS", 162000, "4.0L flat-6", 493, "17 mpg", "RWD", "cbh", "9,000-rpm flat-six, track aero"],
  ],
  "porsche-718-boxster": [
    ["718 Boxster", 75000, "2.0L turbo flat-4", 300, "24 mpg", "RWD", "cbh", "Mid-engine roadster, power soft top"],
    ["718 Boxster GTS 4.0", 104000, "4.0L flat-6", 394, "20 mpg", "RWD", "cbh", "Naturally aspirated flat-six, limited-slip differential"],
    ["718 Spyder RS", 165000, "4.0L flat-6", 493, "17 mpg", "RWD", "cbh", "9,000-rpm flat-six, lightweight top"],
  ],
  "porsche-cayenne-coupe": [
    ["Cayenne Coupe", 97000, "3.0L turbo V6", 348, "19 mpg", "AWD", "acrbhs", "Sloped roof, adaptive spoiler"],
    ["Cayenne S Coupe", 115000, "4.0L twin-turbo V8", 468, "17 mpg", "AWD", "acrbhs", "V8 power, air suspension"],
  ],
  // Full lineups: other luxury brands
  "lexus-is": [
    ["IS 300", 41000, "2.0L turbo I4", 241, "25 mpg", "RWD", "crbh", "Lexus Safety System+ 3.0, 12.3-in touchscreen"],
    ["IS 350 F Sport", 47000, "3.5L V6", 311, "22 mpg", "RWD or AWD", "acrbhs", "F Sport suspension, sport seats"],
    ["IS 500 F Sport Performance", 63000, "5.0L V8", 472, "20 mpg", "RWD", "crbhs", "V8 power, quad exhaust"],
  ],
  "lexus-ls": [
    ["LS 500", 81000, "3.4L twin-turbo V6", 416, "22 mpg", "RWD or AWD", "acrbhs", "Air suspension, Mark Levinson option"],
    ["LS 500 F Sport", 86000, "3.4L twin-turbo V6", 416, "22 mpg", "RWD or AWD", "acrbhs", "Adaptive suspension, rear-wheel steering"],
  ],
  "lexus-lc": [
    ["LC 500", 101000, "5.0L V8", 471, "19 mpg", "RWD", "crbh", "Naturally aspirated V8, carbon roof option"],
    ["LC 500h", 107000, "3.5L hybrid V6", 354, "29 mpg", "RWD", "crbhs", "Multistage hybrid, glass roof"],
  ],
  "lexus-rc": [
    ["RC 300", 47000, "2.0L turbo I4", 241, "24 mpg", "RWD", "crbh", "Two-door coupe, Lexus Safety System+"],
    ["RC 350 F Sport", 53000, "3.5L V6", 311, "22 mpg", "RWD or AWD", "acrbhs", "F Sport suspension, sport seats"],
    ["RC F", 73000, "5.0L V8", 472, "18 mpg", "RWD", "crbhs", "V8 power, Torsen limited-slip differential"],
  ],
  "lexus-ux": [
    ["UX 300h", 37500, "2.0L hybrid I4", 196, "43 mpg", "FWD or AWD", "acrbh", "Hybrid efficiency, 8-in touchscreen"],
    ["UX 300h F Sport Design", 40000, "2.0L hybrid I4", 196, "42 mpg", "FWD or AWD", "acrbhs", "Sport styling, 12.3-in touchscreen"],
    ["UX 300h Luxury", 46000, "2.0L hybrid I4", 196, "42 mpg", "FWD or AWD", "acrbhs", "Leather seats, Mark Levinson audio"],
  ],
  "lexus-tx": [
    ["TX 350", 56000, "2.4L turbo I4", 275, "23 mpg", "FWD or AWD", "acrbh", "Three adult-size rows, 14-in touchscreen"],
    ["TX 500h F Sport Performance", 70000, "2.4L turbo hybrid I4", 366, "27 mpg", "AWD", "acrbhs", "Hybrid power, adaptive suspension"],
    ["TX 550h+ Luxury", 83000, "3.5L plug-in hybrid V6", 404, "33 mi electric / 27 mpg", "AWD", "acrbhs", "Plug-in hybrid, Mark Levinson audio"],
  ],
  "lexus-gx": [
    ["GX 550 Premium", 66000, "3.4L twin-turbo V6", 349, "17 mpg", "4WD", "acrbh", "Full-time 4WD, 14-in touchscreen"],
    ["GX 550 Overtrail", 70000, "3.4L twin-turbo V6", 349, "17 mpg", "4WD", "acrbhs", "Locking rear differential, all-terrain tires"],
    ["GX 550 Luxury", 77000, "3.4L twin-turbo V6", 349, "17 mpg", "4WD", "acrbhs", "Semi-aniline leather, Mark Levinson audio"],
  ],
  "lexus-rz": [
    ["RZ 300e", 47000, "Single electric motor", 201, "220 mi range", "FWD", "crbh", "14-in touchscreen, heated seats"],
    ["RZ 450e Premium", 54000, "Dual electric motors", 308, "220 mi range", "AWD", "acrbhs", "DIRECT4 AWD, glass roof"],
    ["RZ 450e Luxury", 60000, "Dual electric motors", 308, "196 mi range", "AWD", "acrbhs", "Ventilated seats, Mark Levinson audio"],
  ],
  "acura-tlx": [
    ["Base", 46000, "2.0L turbo I4", 272, "25 mpg", "FWD or AWD", "acrbh", "AcuraWatch, 12.3-in display"],
    ["A-Spec", 50000, "2.0L turbo I4", 272, "24 mpg", "FWD or AWD", "acrbhs", "Sport styling, ELS Studio audio"],
    ["Type S", 58000, "3.0L turbo V6", 355, "21 mpg", "AWD", "acrbhs", "SH-AWD, Brembo brakes"],
  ],
  "acura-zdx": [
    ["A-Spec RWD", 65000, "Single electric motor", 340, "313 mi range", "RWD", "crbhs", "11.3-in touchscreen, Google built-in"],
    ["A-Spec AWD", 69000, "Dual electric motors", 490, "304 mi range", "AWD", "acrbhs", "Dual-motor AWD, Bang & Olufsen audio"],
    ["Type S", 74000, "Dual electric motors", 499, "288 mi range", "AWD", "acrbhs", "Air suspension, Brembo brakes"],
  ],
  "acura-adx": [
    ["ADX", 35000, "1.5L turbo I4", 190, "28 mpg", "FWD or AWD", "acrbh", "9-in touchscreen, AcuraWatch"],
    ["A-Spec", 40000, "1.5L turbo I4", 190, "27 mpg", "FWD or AWD", "acrbhs", "Sport styling, panoramic roof"],
  ],
  "infiniti-qx55": [
    ["Luxe", 52000, "2.0L variable-compression turbo I4", 268, "25 mpg", "AWD", "acrbhs", "Coupe-style roof, ProPILOT Assist"],
    ["Essential", 56000, "2.0L variable-compression turbo I4", 268, "25 mpg", "AWD", "acrbhs", "Leather seats, 360-degree camera"],
    ["Sensory", 59000, "2.0L variable-compression turbo I4", 268, "25 mpg", "AWD", "acrbhs", "Bose audio, ventilated seats"],
  ],
  "genesis-g80": [
    ["2.5T Advanced", 57000, "2.5L turbo I4", 300, "23 mpg", "AWD", "acrbhs", "27-in display, Highway Driving Assist II"],
    ["3.5T Sport Prestige", 75000, "3.5L twin-turbo V6", 375, "20 mpg", "AWD", "acrbhs", "Sport styling, rear-wheel steering"],
  ],
  "genesis-g90": [
    ["3.5T", 100000, "3.5L twin-turbo V6", 375, "20 mpg", "AWD", "acrbhs", "Air suspension, reclining rear seats"],
    ["3.5T E-Supercharger", 113000, "3.5L twin-turbo V6 with e-supercharger", 409, "20 mpg", "AWD", "acrbhs", "Electric supercharger, Bang & Olufsen audio"],
  ],
  "genesis-gv60": [
    ["Standard", 53000, "Single electric motor", 225, "294 mi range", "RWD", "crbhs", "800-volt fast charging, face-recognition entry"],
    ["Advanced", 57000, "Dual electric motors", 314, "264 mi range", "AWD", "acrbhs", "Dual-motor AWD, ventilated seats"],
    ["Performance", 69000, "Dual electric motors", 429, "250 mi range", "AWD", "acrbhs", "Boost mode, adaptive suspension"],
  ],
  "genesis-electrified-gv70": [
    ["Advanced", 67000, "Dual electric motors", 429, "236 mi range", "AWD", "acrbhs", "Boost mode, 800-volt fast charging"],
    ["Prestige", 75000, "Dual electric motors", 429, "236 mi range", "AWD", "acrbhs", "Nappa leather, Bang & Olufsen audio"],
  ],
  "genesis-gv80-coupe": [
    ["3.5T Advanced", 80000, "3.5L twin-turbo V6", 375, "19 mpg", "AWD", "acrbhs", "Coupe-style roof, 27-in display"],
    ["3.5T E-Supercharger Prestige", 88000, "3.5L twin-turbo V6 with e-supercharger", 409, "19 mpg", "AWD", "acrbhs", "Electric supercharger, Bang & Olufsen audio"],
  ],
  "volvo-s60": [
    ["B5 Core", 45000, "2.0L turbo mild-hybrid I4", 247, "29 mpg", "AWD", "acrbh", "Standard AWD, Google built-in"],
    ["B5 Plus", 49000, "2.0L turbo mild-hybrid I4", 247, "29 mpg", "AWD", "acrbhs", "Harman Kardon audio, panoramic roof"],
    ["B5 Ultra", 53000, "2.0L turbo mild-hybrid I4", 247, "29 mpg", "AWD", "acrbhs", "Bowers & Wilkins audio, head-up display"],
  ],
  "volvo-s90": [
    ["B6 Plus", 61000, "2.0L turbo mild-hybrid I4", 295, "26 mpg", "AWD", "acrbhs", "Long wheelbase, Pilot Assist"],
    ["B6 Ultra", 65000, "2.0L turbo mild-hybrid I4", 295, "26 mpg", "AWD", "acrbhs", "Bowers & Wilkins audio, massaging seats"],
    ["T8 Ultra", 73000, "2.0L plug-in hybrid I4", 455, "38 mi electric / 30 mpg", "AWD", "acrbhs", "Plug-in hybrid, 455 hp"],
  ],
  "volvo-v60-cross-country": [
    ["B5 Plus", 52000, "2.0L turbo mild-hybrid I4", 247, "26 mpg", "AWD", "acrbhs", "Raised ride height, hill descent control"],
    ["B5 Ultra", 56000, "2.0L turbo mild-hybrid I4", 247, "26 mpg", "AWD", "acrbhs", "Bowers & Wilkins audio, 360-degree camera"],
  ],
  "volvo-v90-cross-country": [
    ["B6 Plus", 62000, "2.0L turbo mild-hybrid I4", 295, "25 mpg", "AWD", "acrbhs", "Raised ride height, air suspension option"],
    ["B6 Ultra", 66000, "2.0L turbo mild-hybrid I4", 295, "25 mpg", "AWD", "acrbhs", "Bowers & Wilkins audio, massaging seats"],
  ],
  "volvo-ex30": [
    ["Plus Single Motor", 45000, "Single electric motor", 268, "261 mi range", "RWD", "crbh", "12.3-in center screen, Google built-in"],
    ["Ultra Twin Motor Performance", 53000, "Dual electric motors", 422, "253 mi range", "AWD", "acrbhs", "422 hp, Harman Kardon audio"],
  ],
  "volvo-ex40": [
    ["Plus Single Motor", 54000, "Single electric motor", 248, "293 mi range", "RWD", "crbhs", "Google built-in, Pilot Assist"],
    ["Ultra Twin Motor", 61000, "Dual electric motors", 402, "257 mi range", "AWD", "acrbhs", "Dual-motor AWD, Harman Kardon audio"],
  ],
  "volvo-ec40": [
    ["Plus Single Motor", 57000, "Single electric motor", 248, "296 mi range", "RWD", "crbhs", "Coupe-style roof, Google built-in"],
    ["Ultra Twin Motor", 63000, "Dual electric motors", 402, "257 mi range", "AWD", "acrbhs", "Dual-motor AWD, Harman Kardon audio"],
  ],
  "volvo-ex90": [
    ["Twin Motor Plus", 80000, "Dual electric motors", 402, "310 mi range", "AWD", "acrbhs", "Three rows, lidar-based safety"],
    ["Twin Motor Performance Ultra", 89000, "Dual electric motors", 510, "300 mi range", "AWD", "acrbhs", "510 hp, Bowers & Wilkins audio"],
  ],
  "land-rover-defender-90": [
    ["S", 57000, "3.0L turbo mild-hybrid I6", 395, "18 mpg", "4WD", "acrbh", "Two-door, Terrain Response"],
    ["X-Dynamic SE", 66000, "3.0L turbo mild-hybrid I6", 395, "18 mpg", "4WD", "acrbhs", "Air suspension, Meridian audio"],
    ["V8", 102000, "5.0L supercharged V8", 518, "15 mpg", "4WD", "acrbhs", "Supercharged V8, adaptive dynamics"],
  ],
  "land-rover-defender-130": [
    ["S", 69000, "2.0L turbo I4", 296, "18 mpg", "4WD", "acrbh", "Eight seats, air suspension"],
    ["X-Dynamic SE", 79000, "3.0L turbo mild-hybrid I6", 395, "18 mpg", "4WD", "acrbhs", "Inline-six, Meridian audio"],
  ],
  "land-rover-discovery": [
    ["S", 61000, "2.0L turbo I4", 296, "20 mpg", "4WD", "acrbh", "Seven seats, Terrain Response 2"],
    ["Dynamic SE", 71000, "3.0L turbo mild-hybrid I6", 355, "20 mpg", "4WD", "acrbhs", "Inline-six, air suspension"],
  ],
  "land-rover-discovery-sport": [
    ["S", 51000, "2.0L turbo I4", 247, "23 mpg", "AWD", "acrbh", "Optional third row, Terrain Response"],
    ["Dynamic SE", 56000, "2.0L turbo I4", 247, "23 mpg", "AWD", "acrbhs", "Panoramic roof, Meridian audio"],
  ],
  "land-rover-range-rover-evoque": [
    ["S", 52000, "2.0L turbo mild-hybrid I4", 246, "24 mpg", "AWD", "acrbh", "Pivi Pro touchscreen, ClearSight mirror"],
    ["Dynamic SE", 57000, "2.0L turbo mild-hybrid I4", 246, "24 mpg", "AWD", "acrbhs", "Panoramic roof, Meridian audio"],
  ],
  "land-rover-range-rover-velar": [
    ["S", 64000, "2.0L turbo I4", 247, "23 mpg", "AWD", "acrbhs", "Curved 11.4-in touchscreen, flush door handles"],
    ["Dynamic SE", 69000, "2.0L turbo I4", 247, "23 mpg", "AWD", "acrbhs", "Air suspension, Meridian audio"],
  ],
  "cadillac-ct4": [
    ["Luxury", 37000, "2.0L turbo I4", 237, "27 mpg", "RWD or AWD", "acrbh", "8-in touchscreen, Super Cruise available"],
    ["V-Series", 48000, "2.7L turbo I4", 325, "22 mpg", "RWD or AWD", "acrbhs", "Magnetic Ride Control, Brembo brakes"],
    ["V-Series Blackwing", 63000, "3.6L twin-turbo V6", 472, "18 mpg", "RWD", "crbh", "6-speed manual available, track-tuned suspension"],
  ],
  "cadillac-xt4": [
    ["Luxury", 39000, "2.0L turbo I4", 235, "26 mpg", "FWD or AWD", "acrbh", "33-in curved display, power liftgate"],
    ["Premium Luxury", 44000, "2.0L turbo I4", 235, "26 mpg", "FWD or AWD", "acrbhs", "Leather seats, panoramic roof"],
    ["Sport", 46000, "2.0L turbo I4", 235, "25 mpg", "FWD or AWD", "acrbhs", "Sport suspension, AKG audio"],
  ],
  "cadillac-xt5": [
    ["Luxury", 46000, "2.0L turbo I4", 237, "23 mpg", "FWD or AWD", "acrbh", "8-in touchscreen, power liftgate"],
    ["Premium Luxury", 51000, "2.0L turbo I4", 237, "23 mpg", "FWD or AWD", "acrbhs", "Leather seats, panoramic roof"],
    ["Sport", 57000, "2.0L turbo I4", 237, "22 mpg", "AWD", "acrbhs", "Twin-clutch AWD, adaptive dampers"],
  ],
  "cadillac-xt6": [
    ["Luxury", 51000, "3.6L V6", 310, "21 mpg", "FWD or AWD", "acrbh", "Three rows, 8-in touchscreen"],
    ["Premium Luxury", 56000, "3.6L V6", 310, "21 mpg", "FWD or AWD", "acrbhs", "Leather seats, Bose audio"],
    ["Sport", 62000, "3.6L V6", 310, "20 mpg", "AWD", "acrbhs", "Twin-clutch AWD, adaptive dampers"],
  ],
  "cadillac-optiq": [
    ["Luxury", 54000, "Dual electric motors", 300, "302 mi range", "AWD", "arbhs", "33-in display, AKG audio"],
    ["Sport", 56000, "Dual electric motors", 300, "302 mi range", "AWD", "arbhs", "Sport styling, 20-in wheels"],
    ["Premium Luxury", 58000, "Dual electric motors", 300, "302 mi range", "AWD", "arbhs", "Super Cruise, ventilated seats"],
  ],
  "cadillac-vistiq": [
    ["Luxury", 78000, "Dual electric motors", 615, "305 mi range", "AWD", "arbhs", "Three rows, 33-in display"],
    ["Sport", 81000, "Dual electric motors", 615, "305 mi range", "AWD", "arbhs", "Four-wheel steering, sport styling"],
    ["Platinum", 90000, "Dual electric motors", 615, "305 mi range", "AWD", "arbhs", "Super Cruise, AKG Studio audio"],
  ],
  "cadillac-escalade-iq": [
    ["Luxury 1", 128000, "Dual electric motors", 750, "460 mi range", "AWD", "arbhs", "55-in pillar-to-pillar display, Super Cruise"],
    ["Sport 3", 148000, "Dual electric motors", 750, "460 mi range", "AWD", "arbhs", "Executive rear seats, four-wheel steering"],
  ],
  "cadillac-celestiq": [
    ["Celestiq", 340000, "Dual electric motors", 655, "303 mi range", "AWD", "arbhs", "Hand-built to order, smart-glass roof"],
  ],
  "lincoln-nautilus": [
    ["Premiere", 54000, "2.0L turbo I4", 250, "24 mpg", "AWD", "acrbhs", "48-in panoramic display, BlueCruise available"],
    ["Reserve", 62000, "2.0L turbo I4", 250, "24 mpg", "AWD", "acrbhs", "Massaging seats, Revel audio"],
    ["Black Label", 76000, "2.0L turbo I4", 250, "24 mpg", "AWD", "acrbhs", "Black Label interior, concierge service"],
  ],
  "aston-martin-vanquish": [
    ["Vanquish", 420000, "5.2L twin-turbo V12", 824, "14 mpg", "RWD", "crbh", "824-hp V12, carbon body"],
  ],
  "bentley-flying-spur": [
    ["Flying Spur", 230000, "4.0L V8 plug-in hybrid", 671, "40 mi electric", "AWD", "acrbhs", "Four-door grand tourer, rear-wheel steering"],
    ["Speed", 270000, "4.0L V8 plug-in hybrid", 771, "40 mi electric", "AWD", "acrbhs", "771 hp, active anti-roll"],
  ],
  // Performance models
  "porsche-911-gt3": [
    ["GT3", 222000, "4.0L flat-6", 502, "16 mpg", "RWD", "cbh", "9,000-rpm flat-six, swan-neck rear wing"],
    ["GT3 Touring", 222000, "4.0L flat-6", 502, "16 mpg", "RWD", "cbh", "Wingless body, 6-speed manual"],
    ["GT3 RS", 241000, "4.0L flat-6", 518, "15 mpg", "RWD", "cbh", "Active aero with DRS, adjustable race suspension"],
  ],
  "porsche-911-turbo": [
    ["Turbo S", 230000, "3.7L twin-turbo flat-6", 640, "17 mpg", "AWD", "acrbhs", "640 hp, rear-axle steering"],
  ],
  "audi-rs-6-avant": [
    ["RS 6 Avant performance", 128000, "4.0L twin-turbo V8", 621, "17 mpg", "AWD", "acrbhs", "621-hp wagon, RS adaptive air suspension"],
  ],
};
