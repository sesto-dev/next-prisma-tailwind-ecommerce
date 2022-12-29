import { client } from 'lib/wagmi'
import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react'

import { WagmiConfig } from 'wagmi'

const AuthContext = createContext({
    isAuthenticated: false,
    setLocalAuthentication: (authentiation) => {},
})

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const authentication = window.localStorage.getItem('authentication')
            setAuthenticated(authentication === 'true' ? true : false)
        }
    }, [])

    const setLocalAuthentication = useCallback((authentication) => {
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem('authentication', authentication)
            setAuthenticated(authentication)
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setLocalAuthentication,
            }}
        >
            <WagmiConfig client={client}>{children}</WagmiConfig>
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined)
        throw new Error('Hooks must be used within a provider.')

    return context
}

export function useIsAuthenticated() {
    const context = useAuth()
    return context.isAuthenticated
}
