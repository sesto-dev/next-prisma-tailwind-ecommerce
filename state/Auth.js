import React from 'react'

const AuthContext = React.createContext({
    isAuthenticated: false,
    setAuthenticated: () => {},
})

/**
 * The initial value of `isAuthenticated` comes from the `authenticated`
 * prop which gets set by _app. We store that value in state and ignore
 * the prop from then on. The value can be changed by calling the
 * `setAuthenticated()` method in the context.
 */
export const AuthProvider = ({ children, authenticated }) => {
    const [isAuthenticated, setAuthenticated] = React.useState(authenticated)
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export function useIsAuthenticated() {
    const context = useAuth()
    return context.isAuthenticated
}
