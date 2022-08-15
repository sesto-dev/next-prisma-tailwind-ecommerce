import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react'

const AuthContext = createContext({
    isAuthenticated: false,
    setLocalAuthentication: () => {},
})

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const authentication = window.localStorage.getItem('authentication')
            setAuthenticated(authentication)
        }
    }, [])

    const setLocalAuthentication = useCallback((authentication) => {
        setAuthenticated(authentication)
        if (typeof window !== 'undefined' && window.localStorage)
            window.localStorage.setItem('authentication', authentication)
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setLocalAuthentication,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export function useIsAuthenticated() {
    const context = useAuth()
    return context.isAuthenticated
}
