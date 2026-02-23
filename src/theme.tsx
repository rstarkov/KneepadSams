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
            sam: {
                rwr: '#990000',
                harm: '#018D19',
                magazine: '#9900FF',
                alert: '#FF161D',
                params: '#318BB1',
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

const ThemeToggleButton = styled("button")`
    position: fixed;
    top: 8px;
    right: 8px;
    z-index: 1000;
    background: ${p => p.theme.palette.mode === 'light' ? '#f0f0f0' : '#333'};
    border: 1px solid ${p => p.theme.palette.mode === 'light' ? '#ccc' : '#555'};
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 1.2rem;
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
                    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
                    lineHeight: 1.5,
                    fontWeight: 400,
                    colorScheme: mode,
                    color: mode === 'light' ? 'black' : 'white',
                    backgroundColor: mode === 'light' ? 'white' : '#121212',
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
            <ThemeToggleButton onClick={toggleTheme}>
                {mode === 'light' ? '🌙' : '☀️'}
            </ThemeToggleButton>
            {p.children}
        </ThemeProvider>
    );
}
