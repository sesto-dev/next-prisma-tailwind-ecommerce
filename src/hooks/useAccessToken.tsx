import jwt from 'jsonwebtoken'
import { useEffect, useState } from 'react'

export function useValidAccessToken() {
    const [returnAccessToken, setReturnAccessToken] = useState(null)
    const [Authenticated, setAuthenticated] = useState(false)
    let AccessToken: string, RefreshToken: string

    useEffect(() => {
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                AccessToken = window.localStorage.getItem('AccessToken')
                RefreshToken = window.localStorage.getItem('RefreshToken')

                if (
                    AccessToken &&
                    RefreshToken &&
                    AccessToken !== undefined &&
                    RefreshToken !== undefined
                ) {
                    const { exp, iat } = jwt.decode(AccessToken)

                    async function fetchData() {
                        if (exp < Math.floor(new Date().getTime() / 1000)) {
                            const response = await fetch(`/api/auth/refresh`, {
                                headers: {
                                    Authorization: `Bearer ${RefreshToken}`,
                                },
                            })

                            const { AccessToken: RefreshedAccessToken } =
                                await response.json()

                            if (
                                RefreshedAccessToken &&
                                RefreshedAccessToken !== undefined
                            ) {
                                window.localStorage.setItem(
                                    'AccessToken',
                                    RefreshedAccessToken
                                )
                                setAuthenticated(true)
                                setReturnAccessToken(RefreshedAccessToken)
                            }
                        } else {
                            setAuthenticated(true)
                            setReturnAccessToken(AccessToken)
                        }
                    }

                    fetchData()
                }
            }
        } catch (error) {
            console.log({ error })
        }
    }, [])

    return { Authenticated, AccessToken: returnAccessToken }
}
