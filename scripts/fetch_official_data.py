#!/usr/bin/env python3
"""Pull official U.S. government data for every model in lib/cars.ts.

Run with:  python3 scripts/fetch_official_data.py
Writes:    lib/official-data.json

Sources, both free and public domain:
  - FuelEconomy.gov (EPA/DOE): MPG, EV range, engine, drivetrain, transmission
    https://www.fueleconomy.gov/feg/ws/
  - NHTSA: crash-test ratings and safety recalls
    https://www.nhtsa.gov/nhtsa-datasets-and-apis

Matching a model to the government's names is done by the rules below. Review
the printed report after each run: a model with no match keeps the site's own
estimates and simply shows no official data.
"""

import csv
import io
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CARS_TS = ROOT / "lib" / "cars.ts"
OUT = ROOT / "lib" / "official-data.json"
USER_AGENT = "CarMatchAI-data/1.0 (https://github.com/Dylandersen06/my-product-site)"
EPA_ZIP = "https://www.fueleconomy.gov/feg/epadata/vehicles.csv.zip"
DATASET_YEAR = 2025
YEARS_TO_TRY = [DATASET_YEAR, DATASET_YEAR + 1, DATASET_YEAR - 1]

# EPA labels for each fuel type in lib/cars.ts.
FUEL_TO_ATV = {
    "gas": {"", "FFV"},
    "hybrid": {"Hybrid"},
    "phev": {"Plug-in Hybrid"},
    "electric": {"EV"},
}

# Where EPA names differ from ours. base = EPA baseModel; include/exclude are
# regexes on the EPA model name; atv overrides the fuel mapping; skip = no data.
EPA_RULES = {
    "toyota-corolla": {"exclude": r"Hatchback|GR |FX|Cross"},
    "honda-civic": {"exclude": r"Type R|Hatchback|5Dr"},
    "mazda-mazda3-hatchback": {"base": "3", "include": r"5-Door"},
    "toyota-rav4-hybrid": {"base": "RAV4"},
    "toyota-rav4-plug-in-hybrid": {"base": "RAV4"},
    "chrysler-pacifica-plug-in-hybrid": {"base": "Pacifica"},
    "chevrolet-silverado-1500": {"base": "Silverado", "exclude": r"HD|EV|ZR2"},
    "gmc-sierra-1500": {"base": "Sierra", "exclude": r"HD|EV|AT4X"},
    "ford-f-150": {"base": "F150", "exclude": r"RAPTOR|Lightning|HEV|Tremor"},
    "ram-1500": {"base": "1500", "atv": {"", "Hybrid"}, "exclude": r"TRX|RHO|REV"},
    "ram-2500": {"skip": "Heavy-duty pickups aren't EPA-rated."},
    "mazda-mx-5-miata": {"base": "MX-5"},
    "aston-martin-dbx707": {"base": "DBX 707"},
    "porsche-911-carrera": {"base": "911", "include": r"^911 Carrera( S| 4S| 4 S)?$"},
    "ford-mustang": {"exclude": r"Mach"},
    "volkswagen-golf-gti": {"base": "Golf/GTI", "include": r"GTI"},
    "chevrolet-equinox-ev": {"base": "Equinox"},
    "mitsubishi-outlander-phev": {"base": "Outlander"},
    "buick-encore-gx": {"base": "Encore", "include": r"GX"},
    "bmw-x5": {"base": "X5"},
    "bmw-m3": {"base": "M", "include": r"^M3"},
    "mercedes-benz-c-class": {"base": "C-Class", "exclude": r"AMG C ?63"},
    "mercedes-benz-glc": {"base": "GLC-Class", "exclude": r"Coupe|AMG GLC ?63"},
    "mercedes-benz-e-class": {"base": "E-Class", "exclude": r"Wagon|AMG"},
    # Gas S-Classes are mild hybrids in the EPA data; the V12 Maybach is a different car.
    "mercedes-benz-s-class": {"base": "S-Class", "atv": {"Hybrid", ""}, "exclude": r"Maybach|S580e"},
    "mercedes-benz-gls": {"base": "GLS-Class", "exclude": r"Maybach"},
    "toyota-corolla-hatchback": {"base": "Corolla", "include": r"Hatchback", "exclude": r"GR"},
    "toyota-gr-corolla": {"base": "Corolla", "include": r"GR"},
    "toyota-mirai": {"atv": {"FCV"}},
    "mazda-mazda3-sedan": {"base": "3", "include": r"4-Door"},
    # The EPA files the Type R under the Civic hatchback with no separate name.
    "honda-civic-type-r": {"skip": "Not listed separately in the EPA data."},
    "toyota-gr86": {"base": "GR 86"},
    "mitsubishi-outlander": {"exclude": r"Sport"},
    "mitsubishi-outlander-sport": {"base": "Outlander", "include": r"Sport"},
    "chevrolet-blazer-ev": {"base": "Blazer"},
    "chevrolet-silverado-2500hd": {"skip": "Heavy-duty pickups aren't EPA-rated."},
    "chevrolet-silverado-ev": {"base": "Silverado"},
    "chevrolet-corvette": {"atv": {"", "Hybrid"}, "exclude": r"ZR1|Carbon Aero"},
    "ford-escape": {"atv": {"", "Plug-in Hybrid"}},
    "ford-f-250-super-duty": {"skip": "Heavy-duty pickups aren't EPA-rated."},
    "gmc-sierra-2500hd": {"skip": "Heavy-duty pickups aren't EPA-rated."},
    "gmc-hummer-ev-pickup": {"base": "Hummer EV", "include": r"Pickup"},
    "gmc-hummer-ev-suv": {"base": "Hummer EV", "include": r"SUV"},
    "gmc-sierra-ev": {"base": "Sierra"},
    "jeep-grand-cherokee": {"exclude": r"Grand Cherokee L"},
    "jeep-grand-cherokee-l": {"base": "Grand Cherokee", "include": r"Grand Cherokee L"},
    "jeep-wagoneer": {"exclude": r"Wagoneer L"},
    "jeep-grand-wagoneer": {"exclude": r"Wagoneer L"},
    "jeep-wagoneer-s": {"base": "Wagoneer"},
    "ram-3500": {"skip": "Heavy-duty pickups aren't EPA-rated."},
    "hyundai-sonata": {"atv": {"", "Hybrid"}},
    "hyundai-kona-electric": {"base": "Kona"},
    "hyundai-ioniq-5": {"exclude": r"Robo taxi"},
    "kia-niro-ev": {"base": "Niro"},
    "kia-sorento": {"atv": {"", "Hybrid"}},
    "volkswagen-atlas": {"exclude": r"Cross Sport"},
    "volkswagen-atlas-cross-sport": {"base": "Atlas", "include": r"Cross Sport"},
    "volkswagen-golf-r": {"base": "Golf/GTI", "include": r"Golf R"},
    "bmw-2-series-coupe": {"base": "2 Series", "include": r"Coupe", "exclude": r"Gran"},
    "bmw-2-series-gran-coupe": {"base": "2 Series", "include": r"Gran Coupe"},
    "bmw-4-series": {"exclude": r"Convertible"},
    "bmw-5-series": {"atv": {"Hybrid", "Plug-in Hybrid"}},
    "bmw-7-series": {"atv": {"Hybrid", "Plug-in Hybrid"}, "exclude": r"750e"},
    "bmw-8-series": {"exclude": r"Convertible|Alpina"},
    "bmw-x4": {"exclude": r"X4 M( Competition)?$"},
    "bmw-x6": {"exclude": r"X6 M Competition"},
    "bmw-x7": {"exclude": r"Alpina"},
    "bmw-m2": {"base": "M", "include": r"^M2 Coupe$"},
    "bmw-m4": {"base": "M", "include": r"^M4 (Competition M xDrive )?Coupe$"},
    "mercedes-benz-gla": {"base": "GLA-Class"},
    "mercedes-benz-glb": {"base": "GLB-Class"},
    "mercedes-benz-gle": {"base": "GLE-Class", "atv": {"Hybrid", "Plug-in Hybrid", ""}, "exclude": r"Coupe"},
    "mercedes-benz-gle-coupe": {"base": "GLE-Class", "include": r"Coupe"},
    "mercedes-benz-glc-coupe": {"base": "GLC-Class", "include": r"[Cc]oupe", "exclude": r"GLC ?63"},
    "mercedes-benz-cla": {"base": "CLA-Class", "atv": {"Hybrid", ""}},
    "mercedes-benz-cle": {"base": "CLE-Class", "include": r"[Cc]oupe"},
    "mercedes-benz-eqe": {"exclude": r"SUV"},
    "mercedes-benz-eqe-suv": {"base": "EQE", "include": r"SUV"},
    "mercedes-benz-eqs": {"exclude": r"SUV"},
    "mercedes-benz-eqs-suv": {"base": "EQS", "include": r"SUV"},
    "mercedes-benz-amg-gt": {"atv": {"Hybrid", ""}, "include": r"\(coupe\)"},
    "mercedes-benz-sl": {"base": "SL-Class", "atv": {"Hybrid", ""}, "exclude": r"Maybach"},
    "audi-a5": {"include": r"^A5 quattro$"},
    "audi-q4-e-tron": {"exclude": r"Sportback"},
    "audi-q6-e-tron": {"exclude": r"Sportback|ultra"},
    "porsche-cayenne": {"exclude": r"Coupe"},
    "porsche-cayenne-coupe": {"base": "Cayenne", "include": r"Coupe"},
    "porsche-718-cayman": {"base": "718", "include": r"Cayman"},
    "porsche-718-boxster": {"base": "718", "include": r"Boxster|Spyder"},
    "dodge-charger-daytona": {"base": "Charger", "include": r"Daytona"},
    "audi-s-e-tron-gt": {"base": "e-tron GT", "include": r"^S e-tron GT"},
    "land-rover-defender-110": {"base": "Defender", "include": r"110"},
    "land-rover-range-rover-sport": {"base": "Range Rover", "include": r"Sport"},
    "land-rover-range-rover": {"base": "Range Rover", "exclude": r"Sport|Velar|Evoque|LWB"},
    "porsche-macan-electric": {"base": "Macan"},
    "aston-martin-db12": {"base": "DB12 V8"},
    "bentley-continental-gt": {"base": "Continental", "exclude": r"Convertible"},
    "lamborghini-urus-se": {"base": "Urus"},
    "lamborghini-temerario": {"atv": {"Hybrid", "Plug-in Hybrid"}},
    "lamborghini-revuelto": {"atv": {"Hybrid", "Plug-in Hybrid"}},
    "mclaren-gts": {"skip": "Not in the EPA data."},
    "mclaren-artura": {"skip": "Not in the EPA data."},
    "mclaren-750s": {"skip": "Not in the EPA data."},
}


def fetch(url, timeout=60):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return resp.read()
        except Exception:
            if attempt == 3:
                raise
            time.sleep(2 * (attempt + 1))


def car_list():
    src = CARS_TS.read_text()
    out = []
    for make, model, body, fuel in re.findall(r'^\s*car\("([^"]+)", "([^"]+)", "(\w+)", "(\w+)"', src, re.M):
        cid = re.sub(r"(^-|-$)", "", re.sub(r"[^a-z0-9]+", "-", f"{make}-{model}".lower()))
        out.append({"id": cid, "make": make, "model": model, "body": body, "fuel": fuel})
    return out


def engine_label(r):
    if r["atvType"] == "EV":
        return r["evMotor"] or "Electric motor"
    displ, cyl = r["displ"], r["cylinders"]
    boost = " turbo" if r["tCharger"] == "T" else " supercharged" if r["sCharger"] == "S" else ""
    label = f"{float(displ):.1f}L {cyl}-cyl{boost}" if displ and cyl else "Engine"
    if r["atvType"] in ("Hybrid", "Plug-in Hybrid"):
        label += f" {r['atvType'].lower()}"
    return label


def epa_configs(rows, car):
    rule = EPA_RULES.get(car["id"], {})
    if "skip" in rule:
        return None, rule["skip"]
    base = rule.get("base", car["model"])
    atv = rule.get("atv", FUEL_TO_ATV[car["fuel"]])
    include = re.compile(rule["include"]) if "include" in rule else None
    exclude = re.compile(rule["exclude"]) if "exclude" in rule else None
    def matches(year, allowed):
        return [
            r for r in rows
            if r["year"] == str(year)
            and r["make"].lower() == car["make"].lower()
            and r["baseModel"].lower() == base.lower()
            and r["atvType"] in allowed
            and (include is None or include.search(r["model"]))
            and (exclude is None or not exclude.search(r["model"]))
        ]

    for year in YEARS_TO_TRY:
        hits = matches(year, atv)
        # The EPA lists many gas cars with a small mild-hybrid system as "Hybrid".
        if not hits and car["fuel"] == "gas" and "atv" not in rule:
            hits = matches(year, {"Hybrid"})
        if hits:
            configs = []
            for r in hits:
                cfg = {
                    "name": r["model"],
                    "engine": engine_label(r),
                    "drive": r["drive"],
                    "transmission": r["trany"],
                    "fuel": r["fuelType"],
                    "mpg": {"city": int(r["city08"]), "highway": int(r["highway08"]), "combined": int(r["comb08"])},
                    "epaId": int(r["id"]),
                }
                if r["atvType"] == "EV":
                    cfg["mpg"] = None
                    cfg["mpge"] = int(r["comb08"])
                    cfg["rangeMi"] = int(float(r["range"] or 0)) or None
                elif r["atvType"] == "Plug-in Hybrid":
                    cfg["electricRangeMi"] = int(float(r["rangeA"] or 0)) or None
                    if r["combA08"] and r["combA08"] != "0":
                        cfg["mpge"] = int(r["combA08"])
                configs.append(cfg)
            configs.sort(key=lambda c: (c["name"], c["drive"], c["transmission"]))
            return {"year": year, "configs": configs}, None
    return None, "No matching EPA record."


def load_epa():
    print("Downloading FuelEconomy.gov data...", file=sys.stderr)
    data = fetch(EPA_ZIP, timeout=120)
    with zipfile.ZipFile(io.BytesIO(data)) as z:
        text = z.read("vehicles.csv").decode("utf-8", errors="replace")
    years = {str(y) for y in YEARS_TO_TRY}
    return [r for r in csv.DictReader(io.StringIO(text)) if r["year"] in years]


# ---------------------------------------------------------------- NHTSA

NHTSA = "https://api.nhtsa.gov"
RATING_YEARS = [DATASET_YEAR, DATASET_YEAR - 1, DATASET_YEAR - 2]
RECALL_CHECK_YEARS = range(DATASET_YEAR - 5, DATASET_YEAR + 1)

# Crash ratings use their own model names. A regex per car picks the right
# entries from NHTSA's list of rated models for that make and year.
NHTSA_RATING = {
    "honda-civic": r"^CIVIC SEDAN$",
    "honda-accord": r"^ACCORD SEDAN$",
    "toyota-camry": r"^CAMRY( HYBRID)?$",
    "tesla-model-3": r"^MODEL 3\b",
    "tesla-model-y": r"^MODEL Y\b",
    "tesla-model-s": r"^MODEL S\b",
    "tesla-model-x": r"^MODEL X\b",
    "tesla-cybertruck": r"^CYBERTRUCK\b",
    "bmw-3-series": r"^3 SERIES SEDAN$",
    "bmw-i4": r"^I4\b",
    "bmw-m3": r"^M3\b",
    "mazda-mazda3-hatchback": r"^MAZDA3( HATCHBACK)?$",
    "volkswagen-golf-gti": r"^GOLF GTI$",
    "nissan-leaf": r"^LEAF\b",
    "toyota-rav4-hybrid": r"^RAV4 HYBRID$",
    "toyota-rav4-plug-in-hybrid": r"^RAV4 (PHEV|PRIME)$",
    "jeep-wrangler": r"^WRANGLER 4-DOOR$",
    "ford-bronco": r"^BRONCO 4DR$",
    "ford-mustang-mach-e": r"^MUSTANG MACH-E\b",
    "toyota-sienna": r"^SIENNA\b",
    "ford-maverick": r"^MAVERICK HEV\b",
    "ford-f-150": r"^F-150 \(SUPER ?CREW\) GAS$",
    "chevrolet-silverado-1500": r"^SILVERADO 1500$",
    "gmc-sierra-1500": r"^SIERRA 1500$",
    "mazda-mx-5-miata": r"^MX-5\b",
    "mitsubishi-outlander-phev": r"^OUTLANDER PHEV$",
    "ram-1500": r"^RAM 1500 CREW CAB$",
    "ram-2500": r"^RAM 2500 CREW CAB$",
    "mercedes-benz-c-class": r"^C-CLASS$",
    "mercedes-benz-glc": r"^GLC$",
    "mercedes-benz-e-class": r"^E-CLASS$",
    "mercedes-benz-s-class": r"^S-CLASS$",
    "mercedes-benz-gls": r"^GLS$",
    "mercedes-benz-g-class": r"^G-CLASS$",
    "audi-a3": r"^A3$",
    "audi-s-e-tron-gt": r"^S E-TRON GT$",
    "lexus-es": r"^ES 300H$",
    "lexus-nx": r"^NX 350H$",
    "lexus-rx": r"^RX 350$",
    "lexus-lx": r"^LX 600$",
    "volvo-xc40": r"^XC40 B5$",
    "volvo-xc60": r"^XC60 B5$",
    "volvo-xc90": r"^XC90 B5$",
    "land-rover-defender-110": r"^(LAND ROVER )?DEFENDER 110$",
    "land-rover-range-rover-sport": r"^(LAND ROVER )?RANGE ROVER SPORT$",
    "land-rover-range-rover": r"^(LAND ROVER )?RANGE ROVER$",
    "lincoln-corsair": r"^CORSAIR( GAS)?$",
    "porsche-911-carrera": r"911 CARRERA$",
    "porsche-macan-electric": r"^MACAN( ELECTRIC)?$",
    "porsche-cayenne": r"CAYENNE$",
    "porsche-taycan": r"TAYCAN$",
    "bentley-bentayga": r"^BENTAYGA V8$",
    "bentley-continental-gt": r"^CONTINENTAL GT( SPEED)?$",
    "rolls-royce-ghost": r"^GHOST$",
    "rolls-royce-cullinan": r"^CULLINAN$",
    "rolls-royce-phantom": r"^PHANTOM$",
}

# Recall lookups take a plain model name, where it differs from ours.
NHTSA_MODEL = {
    "mazda-mazda3-hatchback": "MAZDA3",
    "toyota-rav4-hybrid": "RAV4 HYBRID",
    "toyota-rav4-plug-in-hybrid": "RAV4 PRIME",
    "chrysler-pacifica-plug-in-hybrid": "PACIFICA HYBRID",
    "chevrolet-silverado-1500": "SILVERADO",
    "gmc-sierra-1500": "SIERRA",
    "ford-f-150": "F-150",
    "ram-1500": "1500",
    "ram-2500": "2500",
    "mazda-mx-5-miata": "MX-5 MIATA",
    "porsche-911-carrera": "911",
    "porsche-macan-electric": "MACAN",
    "audi-s-e-tron-gt": "E-TRON GT",
    "land-rover-defender-110": "DEFENDER",
    "aston-martin-dbx707": "DBX",
    "lamborghini-urus-se": "URUS",
    "mitsubishi-outlander-phev": "OUTLANDER PHEV",
    "ferrari-sf90-stradale": "SF90 STRADALE",
    "volkswagen-golf-gti": "GOLF GTI",
}


def nhtsa_json(path):
    """NHTSA answers some empty results with HTTP 400 and a valid JSON body, so read it."""
    req = urllib.request.Request(NHTSA + path, headers={"User-Agent": USER_AGENT})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                return json.loads(resp.read())
        except urllib.error.HTTPError as e:
            try:
                body = json.loads(e.read())
                if isinstance(body, dict) and ("Count" in body or "Results" in body or "results" in body):
                    return body
            except Exception:
                pass
            error = e
        except Exception as e:
            error = e
        time.sleep(2 * (attempt + 1))
    print(f"  NHTSA request failed: {path} ({error})", file=sys.stderr)
    return None


def nhtsa_name(car):
    return NHTSA_MODEL.get(car["id"], car["model"])


_rated_models = {}


def rated_models(make, year):
    """NHTSA's list of model names with crash-test entries, for one make and year."""
    key = (make, year)
    if key not in _rated_models:
        res = nhtsa_json(f"/SafetyRatings/modelyear/{year}/make/{urllib.parse.quote(make)}") or {}
        _rated_models[key] = sorted({m["Model"] for m in res.get("Results") or []})
    return _rated_models[key]


def rating_names(car, year):
    pattern = NHTSA_RATING.get(car["id"])
    if pattern is None:
        # By default, our model name alone, ignoring a trailing body or fuel word.
        own = re.escape(car["model"].upper())
        pattern = rf"^{own}( SEDAN| SUV| HATCHBACK| \(ALL VARIANTS\))?$"
    regex = re.compile(pattern, re.I)
    return [m for m in rated_models(car["make"], year) if regex.search(m)]


def safety(car):
    for year in RATING_YEARS:
        rating = safety_for_year(car, year)
        if rating:
            return rating
    return None


def safety_for_year(car, year):
    q = lambda s: urllib.parse.quote(s)
    variants = []
    for name in rating_names(car, year):
        found = nhtsa_json(f"/SafetyRatings/modelyear/{year}/make/{q(car['make'])}/model/{q(name)}")
        variants += (found or {}).get("Results") or []
    best = None
    for v in variants:
        detail = nhtsa_json(f"/SafetyRatings/VehicleId/{v['VehicleId']}")
        r = ((detail or {}).get("Results") or [None])[0]
        if not r:
            continue
        rating = {
            "description": r.get("VehicleDescription"),
            "overall": r.get("OverallRating"),
            "frontal": r.get("OverallFrontCrashRating"),
            "side": r.get("OverallSideCrashRating"),
            "rollover": r.get("RolloverRating"),
            "vehicleId": v["VehicleId"],
        }
        # Prefer a variant that was actually rated overall.
        if best is None or (best["overall"] in (None, "Not Rated") and rating["overall"] not in (None, "Not Rated")):
            best = rating
        time.sleep(0.15)
    if best and best["overall"] in (None, "Not Rated") and all(best[k] in (None, "Not Rated") for k in ("frontal", "side", "rollover")):
        return None
    return best and {"year": year, **best}


def recall_items(car, year):
    params = urllib.parse.urlencode({"make": car["make"], "model": nhtsa_name(car), "modelYear": year})
    data = nhtsa_json(f"/recalls/recallsByVehicle?{params}")
    return None if data is None else (data.get("results") or [])


def recalls(car, year):
    items = recall_items(car, year)
    if items is None:
        return None  # The request failed: unknown, not zero.
    if not items:
        # NHTSA answers an unrecognized model name with zero results too. Only
        # trust a zero if the same name has recalls in some other recent year.
        known = any(recall_items(car, y) for y in RECALL_CHECK_YEARS if y != year)
        if not known:
            return None
    out = []
    for it in items:
        out.append({
            "campaign": it.get("NHTSACampaignNumber"),
            "date": it.get("ReportReceivedDate"),
            "component": (it.get("Component") or "").title(),
            "summary": re.sub(r"\s+", " ", it.get("Summary") or "").strip()[:280],
        })
    out.sort(key=lambda r: r["campaign"] or "", reverse=True)
    return {"year": year, "count": len(out), "items": out[:5]}


def main():
    cars = car_list()
    rows = load_epa()
    out, report = {}, []
    for car in cars:
        epa, why = epa_configs(rows, car)
        entry = {"epa": epa}
        if why:
            entry["epaNote"] = why
        year = epa["year"] if epa else DATASET_YEAR
        print(f"NHTSA: {car['id']} ({year})", file=sys.stderr)
        entry["safety"] = safety(car)
        entry["recalls"] = recalls(car, year)
        out[car["id"]] = entry
        report.append((
            car["id"],
            len(epa["configs"]) if epa else 0,
            why,
            entry["safety"] and entry["safety"]["overall"],
            entry["recalls"]["count"] if entry["recalls"] else "unknown",
        ))
        time.sleep(0.2)

    OUT.write_text(json.dumps({
        "sources": {
            "epa": "FuelEconomy.gov (U.S. EPA and Department of Energy)",
            "nhtsa": "NHTSA crash ratings and recalls",
            "fetchedOn": time.strftime("%Y-%m-%d"),
        },
        "cars": out,
    }, indent=1) + "\n")
    print(f"\nWrote {OUT.relative_to(ROOT)}")
    print("id | EPA configs | note | overall stars | recalls")
    for r in report:
        print(" | ".join("" if x is None else str(x) for x in r))


if __name__ == "__main__":
    main()
