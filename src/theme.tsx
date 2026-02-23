import { createTheme, GlobalStyles, styled, ThemeProvider, type PaletteMode } from '@mui/material';
import React from 'react';

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

function getTheme(mode: PaletteMode) {
    return createTheme({
        palette: {
            mode,
            text: {
                primary: mode === 'light' ? '#000000' : '#ffffff',
            },
            background: {
                default: mode === 'light' ? '#ffffff' : '#000000',
            },
            sam: {
                rwr: mode === 'light' ? '#990000' : '#FF5F59',
                harm: mode === 'light' ? '#018D19' : '#2CAA01',
                magazine: mode === 'light' ? '#9900FF' : '#8A4293',
                alert: mode === 'light' ? '#FF161D' : '#FF161D',
                params: mode === 'light' ? '#318BB1' : '#0983AD',
            },
            selection: {
                border: mode === 'light' ? '#ccc' : '#555',
                borderActive: '#1A73E8',
                backgroundActive: mode === 'light' ? '#cee0fb' : '#1a3a5c',
            },
            card: {
                titleBackground: mode === 'light' ? '#E7F0FD' : '#1a2332',
                titleBorder: '#1A73E8',
                titleText: mode === 'light' ? '#0B5394' : '#6ba3d8',
                legendBackground: mode === 'light' ? '#f0f0f0' : '#2a2a2a',
            },
            muted: {
                text: '#9E9D9C',
            },
        },
        typography: {
            fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
        },
    });
}

export const TopRightButton = styled("button")`
    position: absolute;
    top: 8px;
    right: 8px;
    width: 40px;
    height: 40px;
    background: ${p => p.theme.palette.mode === 'light' ? '#f0f0f0' : '#333'};
    border: 1px solid ${p => p.theme.palette.mode === 'light' ? '#ccc' : '#555'};
    border-radius: 4px;
    padding: 8px 8px;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
        background: ${p => p.theme.palette.mode === 'light' ? '#e0e0e0' : '#444'};
    }
`;

export function ThemeWrapper(p: { children?: React.ReactNode }) {
    const [mode, setMode] = React.useState<PaletteMode>(() => {
        const saved = localStorage.getItem('themeMode');
        return (saved === 'light' || saved === 'dark') ? saved : 'light';
    });

    const theme = React.useMemo(() => getTheme(mode), [mode]);

    const toggleTheme = () => {
        setMode((prevMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            localStorage.setItem('themeMode', newMode);
            return newMode;
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles styles={{
                ':root': {
                    fontFamily: theme.typography.fontFamily,
                    lineHeight: 1.5,
                    fontWeight: 400,
                    colorScheme: theme.palette.mode,
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.default,
                    fontSynthesis: 'none',
                    textRendering: 'optimizeLegibility',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                },
                body: {
                    margin: 0,
                    minHeight: '100vh',
                },
            }} />
            <TopRightButton onClick={toggleTheme}>
                {mode === 'light' ? '🌙' : '☀️'}
            </TopRightButton>
            {p.children}
        </ThemeProvider>
    );
}
