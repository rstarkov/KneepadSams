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
} satisfies Record<string, SamUnit>;

export const sams = {
    "s75": {
        name: <>SA-2 <span>Guideline</span> – S-75</>,
    },
    "s125": {
        name: <>SA-3 <span>Goa</span> – S-125</>,
    },
    "s200": {
        name: <>SA-5 <span>Gammon</span> – S-200</>,
    },
    "kub": {
        name: <>SA-6 <span>Gainful</span> – Kub</>,
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
    "strela1": {
        name: <>SA-9 <span>Gaskin</span> – Strela-1</>,
        minRangeNm: 0.4,
        maxRangeNm: 2.5,
        minAltFt: 100,
        maxAltFt: 12000,
        alertNoLaunchWarn: true,
        units: [{
            rwr: null,
            harm: null,
            magazine: ["4x infrared missiles"],
            images: [{ src: img_strela9_side }, { src: img_strela9_front, variant: "front" }],
        }],
    },
    "strela10": {
        name: <>SA-13 <span>Gopher</span> – Strela-10</>,
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
        }],
    },
    "s300": {
        name: <>SA-10 <span>Grumble</span> – S-300</>,
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
    "buk": {
        name: <>SA-11 <span>Gadfly</span> – Buk</>,
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
        }],
    },
    "tunguska": {
        name: <>SA-19 <span>Grison</span> – Tunguska</>,
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
        }],
    },
    "pantsir": {
        name: <>SA-22 <span>Greyhound</span> – Pantsir</>,
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

export type SamKey = keyof typeof sams;