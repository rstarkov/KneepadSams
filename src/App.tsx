import React from 'react';
import { sams, type SamSystem, type SamUnitImage } from './data'
import { styled } from '@mui/material'

function App() {
    return (
        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "row", gap: "1rem 0", flexWrap: "wrap" }}>
            <SamSystemCard sam={sams.buk} />
            <SamSystemCard sam={sams.tor} />
            <SamSystemCard sam={sams.tunguska} />
            <SamSystemCard sam={sams.s300} />
        </div>
    )
}

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
                    <RwrDiv>[{mainUnit.rwr}]</RwrDiv>
                    <HarmDiv>[{mainUnit.harm}]</HarmDiv>
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
                {mainUnit.type && <div>{mainUnit.type}</div>}
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
    background-color: #E7F0FD;
    border-top: 2px solid #1A73E8;
    border-bottom: 2px solid #1A73E8;
    color: #0B5394;
    font-size: 1.1rem;
    padding: 0;
    margin: 0;
    text-align: center;
    & > span {
        color: #9E9D9C;
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
    color: #990000;
`;

const HarmDiv = styled("div")`
    font-weight: bold;
    color: #018D19;
`;

const MagazineDiv = styled("div")`
    color: #9900FF;
`;

const AlertDiv = styled("div")`
    color: #FF161D;
`;

const UnitName = styled("div")`
    color: #9E9D9C;
    text-align: right;
`;

export default App
