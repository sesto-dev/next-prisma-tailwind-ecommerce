import { isVariableValid } from 'lib/utils'
import React, { createContext, useState, useEffect, useContext } from 'react'
import { useValidAccessToken } from 'hooks/useAccessToken'

const UserContext = createContext({
    user: null,
    loading: true,
    refreshUser: () => {},
})

export const useUserContext = () => {
    return useContext(UserContext)
}

export const UserContextProvider = ({ children }) => {
    const { AccessToken } = useValidAccessToken()

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const refreshUser = async () => {
        if (isVariableValid(AccessToken)) {
            setLoading(true)

            const response = await fetch(`/api/user`, {
                headers: {
                    Authorization: `Bearer ${AccessToken}`,
                },
            })

            const json = await response.json()

            if (isVariableValid(json?.user)) {
                setUser(json?.user)
                setLoading(false)
            }

            setLoading(false)
        }
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/user`, {
                headers: {
                    Authorization: `Bearer ${AccessToken}`,
                },
            })

            const json = await response.json()

            if (isVariableValid(json?.user)) {
                setUser(json?.user)
                setLoading(false)
            }
        }

        if (isVariableValid(AccessToken)) fetchData()
        if (!isVariableValid(AccessToken)) setLoading(false)
    }, [AccessToken])

    return (
        <UserContext.Provider value={{ user, loading, refreshUser }}>
            {children}
        </UserContext.Provider>
    )
}
