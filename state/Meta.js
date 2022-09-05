import config from '../config/main.config'
import i18n from '../config/i18n.config'

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react'

export const MetaContext = createContext({})

export function useMeta() {
    const context = useContext(MetaContext)
    if (context === undefined)
        throw new Error('Hooks must be used within a provider.')

    return context
}
