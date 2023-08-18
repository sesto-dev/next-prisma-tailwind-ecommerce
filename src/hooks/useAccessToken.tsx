import jwt from 'jsonwebtoken'
import { isVariableValid } from 'lib/utils'
import { useEffect, useState, useRef } from 'react'

export function useValidAccessToken() {
    const Authenticated = useRef(false)
    const AccessToken = useRef(null)
    const RefreshToken = useRef(null)

    useEffect(() => {
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                AccessToken.current = window.localStorage.getItem('AccessToken')
                RefreshToken.current =
                    window.localStorage.getItem('RefreshToken')

                if (
                    isVariableValid(AccessToken.current) &&
                    isVariableValid(RefreshToken.current)
                ) {
                    const { exp, iat } = jwt.decode(AccessToken.current)

                    async function fetchData() {
                        if (exp < Math.floor(new Date().getTime() / 1000)) {
                            const response = await fetch(`/api/auth/refresh`, {
                                headers: {
                                    Authorization: `Bearer ${RefreshToken.current}`,
                                },
                            })

                            const json = await response.json()

                            const RefreshedAccessToken = json?.AccessToken

                            if (isVariableValid(RefreshedAccessToken)) {
                                window.localStorage.setItem(
                                    'AccessToken',
                                    RefreshedAccessToken
                                )
                                Authenticated.current = true
                                AccessToken.current = RefreshedAccessToken
                            }
                        } else {
                            Authenticated.current = true
                        }
                    }

                    fetchData()
                }
            }
        } catch (error) {
            console.error({ error })
        }
    }, [])

    return {
        Authenticated: Authenticated.current,
        AccessToken: AccessToken.current,
    }
}
