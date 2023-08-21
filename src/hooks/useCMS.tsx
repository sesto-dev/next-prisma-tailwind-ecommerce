/* eslint-disable react-hooks/exhaustive-deps */
import { set } from 'date-fns'
import jwt from 'jsonwebtoken'
import { isVariableValid } from 'lib/utils'
import { useEffect, useState } from 'react'

export function useCMS() {
    const [vendor, setVendor] = useState(null)
    const [isAdmin, setIsAdmin] = useState(null)
    const [isVendor, setIsVendor] = useState(null)

    useEffect(() => {
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                const AccessToken = window.localStorage.getItem('AccessToken')

                async function fetchData() {
                    const response = await fetch(`/api/user/cms`, {
                        headers: {
                            Authorization: `Bearer ${AccessToken}`,
                        },
                    })

                    const json = await response.json()

                    const user = json?.user

                    if (isVariableValid(user)) {
                        if (isVariableValid(user.vendor)) {
                            setVendor(user.vendor)
                            setIsVendor(true)
                        }

                        if (!isVariableValid(user.vendor)) setIsVendor(false)

                        if (user.isAdmin) setIsAdmin(true)

                        if (!user.isAdmin) setIsAdmin(false)
                    }
                }

                if (isVariableValid(AccessToken)) fetchData()
            }
        } catch (error) {
            console.error({ error })
        }
    }, [])

    return { vendor, isAdmin, isVendor }
}
