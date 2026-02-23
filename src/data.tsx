import img_buk_side from "./assets/img_buk_side.png"
import img_buk_snowdrift_side from "./assets/img_buk_snowdrift_side.png"
import img_dogear_side from "./assets/img_dogear_side.png"
import img_kub_launcher_side from "./assets/img_kub_launcher_side.png"
import img_kub_radar_side from "./assets/img_kub_radar_side.png"
import img_osa_front from "./assets/img_osa_front.png"
import img_osa_side from "./assets/img_osa_side.png"
import img_placeholder from "./assets/img_placeholder.png"
import img_s300_bigbird from "./assets/img_s300_bigbird.png"
import img_s300_clamshell from "./assets/img_s300_clamshell.png"
import img_s300_flaplid from "./assets/img_s300_flaplid.png"
import img_s300_launcher from "./assets/img_s300_launcher.png"
import img_shilka23_side from "./assets/img_shilka23_side.png"
import img_sparka57_side from "./assets/img_sparka57_side.png"
import img_strela9_front from "./assets/img_strela9_front.png"
import img_strela9_side from "./assets/img_strela9_side.png"
import img_strela13_side from "./assets/img_strela13_side.png"
import img_tor_radardown from "./assets/img_tor_radardown.png"
import img_tor_side from "./assets/img_tor_side.png"
import img_tunguska_radardown from "./assets/img_tunguska_radardown.png"
import img_tunguska_side from "./assets/img_tunguska_side.png"

export interface SamSystem {
    name: React.ReactNode;
    nameShort: string;
    minRangeNm: number;
    maxRangeNm: number;
    minAltFt: number;
    maxAltFt: number;
    alertNoLaunchWarn?: boolean;
    alertShootAtMsl?: boolean;
    units: SamUnit[];
}
export interface SamUnit {
    name?: string;
    type?: string;
    rwr: string | null;
    harm: string | null;
    magazine?: string[];
    isOptional?: boolean;
    images: SamUnitImage[];
    usedIn?: SamKey[];
}
export interface SamUnitImage {
    src: string;
    variant?: string;
    css?: React.CSSProperties;
}

export const units = {
    "dogear": {
        name: "Dog Ear",
        rwr: "DE",
        harm: "109",
        type: "Search radar",
        images: [{ src: img_dogear_side }],
        usedIn: ["strela10", "tor", "tunguska"],
    },
    "flatface": {
        name: "Flat Face",
        rwr: "S",
        harm: "122",
        type: "Search radar",
        images: [{ src: img_placeholder }],
        usedIn: ["s75", "s125", "s200"],
    },
} satisfies Record<string, SamUnit>;

export const sams: Record<any, SamSystem> = {
    "s75": {
        name: <>SA-2 <span>Guideline</span> – S-75</>,
        nameShort: "2: S-75",
        minRangeNm: -1,
        maxRangeNm: 28,
        minAltFt: -1,
        maxAltFt: 82000,
        units: [{
            name: "Fan Song",
            rwr: "2",
            harm: "126",
            type: "Track radar",
            images: [{ src: img_placeholder }],
        },
        units.flatface,
        {
            rwr: null,
            harm: null,
            type: "Launcher",
            magazine: ["1x radar missile"],
            images: [{ src: img_placeholder }],
        }],
    },
    "s125": {
        name: <>SA-3 <span>Goa</span> – S-125</>,
        nameShort: "3: S-125",
        minRangeNm: 3.2,
        maxRangeNm: 13.5,
        minAltFt: 700,
        maxAltFt: 66000,
        units: [{
            name: "Low Blow",
            rwr: "3",
            harm: "123",
            type: "Track radar",
            images: [{ src: img_placeholder }],
        },
        units.flatface,
        {
            rwr: null,
            harm: null,
            type: "Launcher",
            magazine: ["4x radar missiles"],
            images: [{ src: img_placeholder }],
        }],
    },
    "s200": {
        name: <>SA-5 <span>Gammon</span> – S-200</>,
        nameShort: "5: S-200",
        minRangeNm: -1,
        maxRangeNm: 160,
        minAltFt: -1,
        maxAltFt: 115000,
        units: [{
            name: "Square Pair",
            rwr: "5",
            harm: "129",
            type: "Track radar",
            images: [{ src: img_placeholder }],
        }, {
            name: "Tin Shield",
            rwr: "TS",
            harm: "130",
            type: "Search radar",
            images: [{ src: img_placeholder }],
        },
        units.flatface,
        {
            rwr: null,
            harm: null,
            type: "Launcher",
            magazine: ["1x radar missile"],
            images: [{ src: img_placeholder }],
        }],
    },
    "kub": {
        name: <>SA-6 <span>Gainful</span> – Kub</>,
        nameShort: "6: Kub",
        minRangeNm: 0.5,
        maxRangeNm: 19.2,
        minAltFt: 100,
        maxAltFt: 33000,
        units: [{
            rwr: "6",
            harm: "108",
            type: "Track/search radar",
            images: [{ src: img_kub_radar_side }],
        }, {
            rwr: null,
            harm: null,
            type: "Launcher",
            magazine: ["3x radar missiles"],
            images: [{ src: img_kub_launcher_side }],
        }],
    },
    "osa": {
        name: <>SA-8 <span>Gecko</span> – Osa</>,
        nameShort: "8: Osa",
        minRangeNm: 0.8,
        maxRangeNm: 7.5,
        minAltFt: 50,
        maxAltFt: 21000,
        units: [{
            rwr: "8",
            harm: "117",
            magazine: ["6x radar missiles"],
            images: [{ src: img_osa_side }, { src: img_osa_front, variant: "front" }],
        }],
    },
    // Non-radar system - exclude for now
    // "strela1": {
    //     name: <>SA-9 <span>Gaskin</span> – Strela-1</>,
    //     nameShort: "9: Strela",
    //     minRangeNm: 0.4,
    //     maxRangeNm: 2.5,
    //     minAltFt: 100,
    //     maxAltFt: 12000,
    //     alertNoLaunchWarn: true,
    //     units: [{
    //         rwr: null,
    //         harm: null,
    //         magazine: ["4x infrared missiles"],
    //         images: [{ src: img_strela9_side }, { src: img_strela9_front, variant: "front" }],
    //     }],
    // },
    "s300": {
        name: <>SA-10 <span>Grumble</span> – S-300</>,
        nameShort: "10: S-300",
        minRangeNm: 3,
        maxRangeNm: 40,
        minAltFt: 50,
        maxAltFt: 150000,
        alertShootAtMsl: true,
        units: [{
            name: "Flap Lid",
            rwr: "10",
            harm: "110",
            type: "Track radar",
            images: [{ src: img_s300_flaplid, css: { width: "6.1rem" } }],
        }, {
            name: "Big Bird",
            rwr: "BB",
            harm: "104",
            type: "Search radar",
            images: [{ src: img_s300_bigbird, css: { width: "5.6rem", position: "absolute", zIndex: 10 } }],
        }, {
            name: "Clam Shell",
            rwr: "CS",
            harm: "103",
            type: "Search radar",
            images: [{ src: img_s300_clamshell, css: { width: "3.7rem", position: "absolute", right: 0, bottom: "-0.3rem" } }],
        }, {
            rwr: null,
            harm: null,
            type: "Launcher",
            magazine: ["4x radar missiles"],
            images: [{ src: img_s300_launcher }],
        }],
    },
    "strela10": {
        name: <>SA-13 <span>Gopher</span> – Strela-10</>,
        nameShort: "13: Strela",
        minRangeNm: 0.4,
        maxRangeNm: 4.3,
        minAltFt: 75,
        maxAltFt: 15000,
        alertNoLaunchWarn: true,
        units: [{
            rwr: "13",
            harm: "118",
            magazine: ["4x infrared missiles"],
            images: [{ src: img_strela13_side }],
        },
        units.dogear],
    },
    "buk": {
        name: <>SA-11 <span>Gadfly</span> – Buk</>,
        nameShort: "11: Buk",
        minRangeNm: 1.8,
        maxRangeNm: 18.9,
        minAltFt: 50,
        maxAltFt: 72000,
        units: [{
            rwr: "11",
            harm: "115",
            magazine: ["4x radar missiles"],
            images: [{ src: img_buk_side }],
        }, {
            name: "Snow Drift",
            rwr: "SD",
            harm: "107",
            type: "Search radar",
            isOptional: true,
            images: [{ src: img_buk_snowdrift_side }],
        }],
    },
    "tor": {
        name: <>SA-15 <span>Gauntlet</span> – Tor</>,
        nameShort: "15: Tor",
        minRangeNm: 0.8,
        maxRangeNm: 6.5,
        minAltFt: 60,
        maxAltFt: 26000,
        alertShootAtMsl: true,
        units: [{
            rwr: "15",
            harm: "119",
            magazine: ["7x radar missiles"],
            images: [{ src: img_tor_side }, { src: img_tor_radardown, variant: "radar down" }],
        },
        units.dogear],
    },
    "tunguska": {
        name: <>SA-19 <span>Grison</span> – Tunguska</>,
        nameShort: "19: Tunguska",
        minRangeNm: 0,
        maxRangeNm: 4,
        minAltFt: 0,
        maxAltFt: 16000,
        alertNoLaunchWarn: true,
        units: [{
            rwr: "19",
            harm: "120",
            magazine: ["8x optical missiles", "2x guns"],
            images: [{ src: img_tunguska_side }, { src: img_tunguska_radardown, variant: "radar down" }],
        },
        units.dogear],
    },
    "pantsir": {
        name: <>SA-22 <span>Greyhound</span> – Pantsir</>,
        nameShort: "22: Pantsir",
        minRangeNm: -1,
        maxRangeNm: 11,
        minAltFt: -1,
        maxAltFt: 33000,
        alertNoLaunchWarn: true,
        alertShootAtMsl: true,
        units: [{
            rwr: "22",
            harm: "134",
            magazine: ["12x optical missiles", "2x guns"],
            images: [{ src: img_placeholder }],
        }],
    },
} satisfies Record<string, SamSystem>;

// Set usedIn for all sam-specific units
for (const [samKey, sam] of Object.entries(sams)) {
    for (const unit of sam.units) {
        if (unit.usedIn === undefined)
            unit.usedIn = [samKey];
        else {
            if (!unit.usedIn.includes(samKey))
                throw new Error(`Unit ${unit.name} in SAM ${samKey} is missing ${samKey} in its usedIn array`);
        }
    }
}

const allUnits = Object.values(sams).flatMap(s => s.units).concat(Object.values(units));
export const rwrs = Object.fromEntries(allUnits.filter(u => !!u.rwr).map(u => [u.rwr!, u]));

export type SamKey = keyof typeof sams;