import config from '../config/main.config'
import i18n from '../config/i18n.config'
import { useThemeProvider } from '../state/Theme'
import { useAuth } from '../state/Auth'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react'

const obj = {
    config,
    i18n,
    useThemeProvider,
    useAuth,
    Link,
    Head,
    useRouter,
    axios,
}

const EssentialsContext = createContext({
    essentials: obj,
    setLocalEssentials: () => {},
})

export const EssentialsProvider = ({ children }) => {
    const [essentials, setEssentials] = useState(obj)

    const setLocalEssentials = useCallback((param) => {
        setEssentials(param)
    }, [])

    return (
        <EssentialsContext.Provider value={{ essentials, setLocalEssentials }}>
            {children}
        </EssentialsContext.Provider>
    )
}

export function useEssentials() {
    const context = useContext(EssentialsContext)
    if (context === undefined) {
        throw new Error('Hooks must be used within a provider.')
    }
    return context
}
