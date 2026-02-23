import img_buk_side from "./assets/img_buk_side.png"
import img_buk_snowdrift_side from "./assets/img_buk_snowdrift_side.png"
import img_dogear_side from "./assets/img_dogear_side.png"
import img_kub_launcher_side from "./assets/img_kub_launcher_side.png"
import img_kub_radar_side from "./assets/img_kub_radar_side.png"
import img_osa_front from "./assets/img_osa_front.png"
import img_osa_side from "./assets/img_osa_side.png"
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
}
export interface SamUnitImage {
    src: string;
    variant?: string;
    css?: React.CSSProperties;
}

export const sams = {
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
            images: [{ src: img_s300_flaplid }],
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
} satisfies Record<string, SamSystem>;

export type SamKey = keyof typeof sams;