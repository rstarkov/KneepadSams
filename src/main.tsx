import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { ThemeWrapper } from './theme'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeWrapper>
            <App />
        </ThemeWrapper>
    </StrictMode>,
)
