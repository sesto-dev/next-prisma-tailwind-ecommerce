import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import config from '../config/main.config'

const themes = ['light', 'dark']

const ThemeContext = createContext({
    themetype: 'default',
    setLocalTheme: () => {},
})

export const ThemeProvider = ({ children }) => {
    const [themeType, setThemeType] = useState(config.theme.defaultTheme)

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            document.documentElement.removeAttribute('style')
            document.body.removeAttribute('style')

            const theme = window.localStorage.getItem('theme')
            if (themes.includes(theme)) setThemeType(theme)
        }
    }, [])

    const setLocalTheme = useCallback((theme) => {
        setThemeType(theme)
        if (typeof window !== 'undefined' && window.localStorage)
            window.localStorage.setItem('theme', theme)
    }, [])

    return (
        <GeistProvider themeType={themeType}>
            <CssBaseline />
            <ThemeContext.Provider value={{ themeType, setLocalTheme }}>
                {children}
            </ThemeContext.Provider>
        </GeistProvider>
    )
}

export const useThemeProvider = () => {
    const context = useContext(ThemeContext)
    if (context === undefined)
        throw new Error('Hooks must be used within a provider.')

    return context
}
