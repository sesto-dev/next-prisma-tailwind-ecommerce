import { createContext, useContext } from 'react'

export const themes = ['light', 'dark']

export const ThemeContext = createContext({
    themetype: 'default',
    switchTheme: () => {},
})

export const UserContext = createContext(null)

export const themePreference = () => useContext(ThemeContext)
