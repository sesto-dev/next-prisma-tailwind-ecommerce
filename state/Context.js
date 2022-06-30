import { createContext, useContext } from 'react'

export const themes = ['light', 'dark']

export const ThemeContext = createContext({
    themetype: 'default',
    switchTheme: () => {},
})

export const themePreference = () => useContext(ThemeContext)
