/* eslint-disable react-hooks/exhaustive-deps */
import jwt from 'jsonwebtoken'
import { isVariableValid } from 'lib/utils'
import { useEffect, useState } from 'react'

export function useValidAccessToken() {
    const [returnAccessToken, setReturnAccessToken] = useState(null)
    const [Authenticated, setAuthenticated] = useState(null)
    let AccessToken: string, RefreshToken: string

    useEffect(() => {
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                AccessToken = window.localStorage.getItem('AccessToken')
                RefreshToken = window.localStorage.getItem('RefreshToken')

                if (
                    isVariableValid(AccessToken) &&
                    isVariableValid(RefreshToken)
                ) {
                    const { exp, iat } = jwt.decode(AccessToken)

                    async function fetchData() {
                        if (exp < Math.floor(new Date().getTime() / 1000)) {
                            const response = await fetch(`/api/auth/refresh`, {
                                headers: {
                                    Authorization: `Bearer ${RefreshToken}`,
                                },
                            })

                            const json = await response.json()

                            const RefreshedAccessToken = json?.AccessToken

                            if (isVariableValid(RefreshedAccessToken)) {
                                window.localStorage.setItem(
                                    'AccessToken',
                                    RefreshedAccessToken
                                )
                                setAuthenticated(true)
                                setReturnAccessToken(RefreshedAccessToken)
                            } else {
                                setAuthenticated(false)
                            }
                        } else {
                            setAuthenticated(true)
                            setReturnAccessToken(AccessToken)
                        }
                    }

                    fetchData()
                } else {
                    setAuthenticated(false)
                }
            }
        } catch (error) {
            console.error({ error })
        }
    }, [])

    return { Authenticated, AccessToken: returnAccessToken }
}
