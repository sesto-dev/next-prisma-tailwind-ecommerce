import { createContext, useContext } from 'react'

export const MetaContext = createContext({})

export function useMeta() {
    const context = useContext(MetaContext)
    if (context === undefined)
        throw new Error('Hooks must be used within a provider.')

    return context
}
