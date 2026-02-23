import React from 'react';
import { rwrs, sams, type SamSystem, type SamUnitImage } from './data'
import { styled, createTheme, ThemeProvider } from '@mui/material'

declare module '@mui/material/styles' {
    interface Palette {
        sam: {
            rwr: string;
            harm: string;
            magazine: string;
            alert: string;
            params: string;
        };
        selection: {
            border: string;
            borderActive: string;
            backgroundActive: string;
        };
        card: {
            titleBackground: string;
            titleBorder: string;
            titleText: string;
            legendBackground: string;
        };
        muted: {
            text: string;
        };
    }
    interface PaletteOptions {
        sam?: {
            rwr?: string;
            harm?: string;
            magazine?: string;
            alert?: string;
            params?: string;
        };
        selection?: {
            border?: string;
            borderActive?: string;
            backgroundActive?: string;
        };
        card?: {
            titleBackground?: string;
            titleBorder?: string;
            titleText?: string;
            legendBackground?: string;
        };
        muted?: {
            text?: string;
        };
    }
}

const theme = createTheme({
    palette: {
        sam: {
            rwr: '#990000',
            harm: '#018D19',
            magazine: '#9900FF',
            alert: '#FF161D',
            params: '#318BB1',
        },
        selection: {
            border: '#ccc',
            borderActive: '#1A73E8',
            backgroundActive: '#cee0fb',
        },
        card: {
            titleBackground: '#E7F0FD',
            titleBorder: '#1A73E8',
            titleText: '#0B5394',
            legendBackground: '#f0f0f0',
        },
        muted: {
            text: '#9E9D9C',
        },
    },
});

function parseHash(): { rwr: string[], sam: string[] } {
    const hash = window.location.hash.slice(1); // remove #
    const params = new URLSearchParams(hash);
    return {
        rwr: params.get('rwr')?.split(',').filter(Boolean) || [],
        sam: params.get('sam')?.split(',').filter(Boolean) || []
    };
}

function App() {
    const initial = parseHash();
    const [includeRwr, setIncludeRwr] = React.useState<string[]>(initial.rwr);
    const [includeSam, setIncludeSam] = React.useState<string[]>(initial.sam);

    // Sync to URL hash on every change
    React.useEffect(() => {
        const parts = [];
        if (includeRwr.length > 0) parts.push(`rwr=${includeRwr.join(',')}`);
        if (includeSam.length > 0) parts.push(`sam=${includeSam.join(',')}`);
        window.location.hash = parts.join('&');
    }, [includeRwr, includeSam]);

    function toggle(key: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) {
        if (list.includes(key)) {
            setList(list.filter(k => k !== key));
        } else {
            setList([...list, key]);
        }
    }

    // Union selection to decide SAMs to show
    const samsToShow = Object.keys(sams).filter(sk => includeSam.includes(sk) || sams[sk].units.some(u => u.rwr && includeRwr.includes(u.rwr)));
    const possibleRwr = new Set<string>();
    samsToShow.forEach(sk => sams[sk].units.forEach(u => u.rwr && possibleRwr.add(u.rwr)));

    return (
        <div style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
                <div>RWR:</div>
                {Object.keys(rwrs).map(rwr => <SelectDiv key={rwr} selected={includeRwr.includes(rwr) ? "yes" : possibleRwr.has(rwr) ? "implicit" : "no"} onClick={() => toggle(rwr, includeRwr, setIncludeRwr)}><RwrDiv>{rwr}</RwrDiv></SelectDiv>)}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
                <div>SAM:</div>
                {Object.keys(sams).map(sk => <SelectDiv key={sk} selected={includeSam.includes(sk) ? "yes" : samsToShow.includes(sk) ? "implicit" : "no"} onClick={() => toggle(sk, includeSam, setIncludeSam)}>{sams[sk].nameShort}</SelectDiv>)}
            </div>
            <div style={{ display: "flex", flexDirection: "row", gap: "1rem 0", flexWrap: "wrap", marginTop: "1rem" }}>
                {samsToShow.map(sk => <SamSystemCard key={sk} sam={sams[sk]} />)}
                {samsToShow.length > 0 && <SummaryCardDiv>
                    {Object.keys(rwrs).filter(rwr => possibleRwr.has(rwr)).map(rwr => {
                        const samsWithThisRwr = samsToShow.filter(sk => sams[sk].units.some(u => u.rwr === rwr));
                        const maxRange = Math.max(...samsWithThisRwr.map(sk => sams[sk].maxRangeNm));
                        const maxAlt = Math.max(...samsWithThisRwr.map(sk => sams[sk].maxAltFt));
                        return <>
                            <RwrDiv style={{ textAlign: "center" }} key={rwr}>[{rwr}]</RwrDiv>
                            <ParamsDiv>{maxRange > 99 ? 99 : maxRange.toFixed(0)}/{maxAlt > 99000 ? 99 : (maxAlt / 1000).toFixed(0)}</ParamsDiv>
                            <UnitName>{rwrs[rwr].name}</UnitName>
                            <div style={{ textAlign: "center" }}>{shortType(rwrs[rwr].type)}</div>
                            <HarmDiv>[{rwrs[rwr].harm}]</HarmDiv>
                        </>;
                    })}
                </SummaryCardDiv>}
                {samsToShow.length > 0 && <LegendCard />}
            </div>
        </div>
    )
}

function shortType(type: string | undefined): string {
    if (type == "Search radar") return "SR";
    if (type == "Track radar") return "TR";
    if (type == "Search/track radar") return "STR";
    if (type == "TLAR") return "TLAR";
    return "?";
}

const SelectDiv = styled("div") <{ selected: "yes" | "implicit" | "no" }>`
    padding: 0 0.26rem;
    border: 1px solid ${p => p.theme.palette.selection.border};
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    ${p => p.selected != "no" ? `border-color: ${p.theme.palette.selection.borderActive};` : ""}
    ${p => p.selected != "no" ? `outline: 1px solid ${p.theme.palette.selection.borderActive};` : ""}
    ${p => p.selected === "yes" ? `background-color: ${p.theme.palette.selection.backgroundActive};` : ""}
`;

const SummaryCardDiv = styled("div")`
    display: grid;
    grid-template-columns: max-content max-content max-content max-content max-content;
    gap: 0.1rem 0.6rem;
    align-items: center;
    align-self: center;
    margin: 0 auto;
`;


function LegendCard(): React.ReactNode {
    return <LegendDiv>
        <RwrDiv>[CS] <span style={{ fontWeight: "normal" }}>RWR code</span></RwrDiv>
        <HarmDiv>[103] <span style={{ fontWeight: "normal" }}>HARM code</span></HarmDiv>
        <ParamsDiv><b>7/26</b> Max range / altitude</ParamsDiv>
        <div>Priority unit listed first</div>
    </LegendDiv>;
}
const LegendDiv = styled("div")`
    display: flex;
    flex-direction: column;
    border: 2px solid ${p => p.theme.palette.card.titleBorder};
    align-self: center;
    margin: 0 auto;
    padding: 0.7rem 1rem;
    background: ${p => p.theme.palette.card.legendBackground};
`;

function SamSystemCard(p: { sam: SamSystem }): React.ReactNode {
    const mainUnit = p.sam.units[0];
    return <div style={{ display: "flex", flexDirection: "column", padding: "0 1rem" }}>
        <SamSystemTitle>{p.sam.name}</SamSystemTitle>
        <div style={{ display: "grid", gridTemplateColumns: "max-content max-content", gap: "1rem 0" }}>
            <div style={{ position: "relative" }}>
                {mainUnit.images.map((ui, i) => <UnitImage key={i} img={ui} />)}
            </div>
            <div>
                <TwoCol>
                    <RwrDiv>[{mainUnit.rwr || "n/a"}]</RwrDiv>
                    <HarmDiv>[{mainUnit.harm || "n/a"}]</HarmDiv>
                </TwoCol>
                <TwoCol>
                    <div>{p.sam.minRangeNm} nm</div>
                    <div>{p.sam.maxRangeNm} nm</div>
                </TwoCol>
                <TwoCol>
                    <div>{p.sam.minAltFt} ft</div>
                    <div>{p.sam.maxAltFt.toLocaleString("en-GB", { useGrouping: true })} ft</div>
                </TwoCol>
                {mainUnit.magazine && mainUnit.magazine.map((m, i) => <MagazineDiv key={i}>{m}</MagazineDiv>)}
                {p.sam.alertShootAtMsl && <AlertDiv>Shoots at missiles</AlertDiv>}
                {p.sam.alertNoLaunchWarn && <AlertDiv>No launch warning</AlertDiv>}
                {mainUnit.type && mainUnit.type != "TLAR" && <div>{mainUnit.type}</div>}
                {mainUnit.name && <UnitName>{mainUnit.name}</UnitName>}
            </div>

            {p.sam.units.slice(1).map((u, i) => <React.Fragment key={i}>
                <div style={{ position: "relative" }}>
                    {u.images.map((ui, i) => <UnitImage key={i} img={ui} />)}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <TwoCol>
                        <RwrDiv>[{u.rwr || "n/a"}]</RwrDiv>
                        <HarmDiv>[{u.harm || "n/a"}]</HarmDiv>
                    </TwoCol>
                    {u.type && <div>{u.type}</div>}
                    {u.magazine && u.magazine.map((m, i) => <MagazineDiv key={i}>{m}</MagazineDiv>)}
                    {u.name && <UnitName>{u.name}</UnitName>}
                </div>
            </React.Fragment>)}
        </div>
    </div>;
}

function UnitImage({ img }: { img: SamUnitImage }): React.ReactNode {
    return <div style={{ width: "8rem", marginTop: "0.4rem", marginBottom: "0.6rem", marginRight: "0.5rem", position: "relative", ...img.css }}>
        {img.variant && <div style={{ position: "absolute", top: 0, left: "0.3rem", color: "white", fontSize: "80%" }}>({img.variant})</div>}
        <img src={img.src} alt={img.variant || "unit"} style={{ display: "block", width: "100%", objectFit: "contain" }} />
    </div>
}

const SamSystemTitle = styled("h2")`
    background-color: ${p => p.theme.palette.card.titleBackground};
    border-top: 2px solid ${p => p.theme.palette.card.titleBorder};
    border-bottom: 2px solid ${p => p.theme.palette.card.titleBorder};
    color: ${p => p.theme.palette.card.titleText};
    font-size: 1.1rem;
    padding: 0;
    margin: 0;
    text-align: center;
    & > span {
        color: ${p => p.theme.palette.muted.text};
    }
`;

const TwoCol = styled("div")`
    display: grid;
    grid-template-columns: max-content max-content;
    justify-content: space-between;
    gap: 0 1rem;
`;

const RwrDiv = styled("div")`
    font-weight: bold;
    color: ${p => p.theme.palette.sam.rwr};
`;

const HarmDiv = styled("div")`
    font-weight: bold;
    color: ${p => p.theme.palette.sam.harm};
`;

const MagazineDiv = styled("div")`
    color: ${p => p.theme.palette.sam.magazine};
`;

const AlertDiv = styled("div")`
    color: ${p => p.theme.palette.sam.alert};
`;

const UnitName = styled("div")`
    color: ${p => p.theme.palette.muted.text};
    text-align: right;
`;

const ParamsDiv = styled("div")`
    color: ${p => p.theme.palette.sam.params};
    text-align: right;
`;

export default function AppWithTheme() {
    return (
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    );
}
