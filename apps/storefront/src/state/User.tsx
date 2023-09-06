import { isVariableValid, validateBoolean } from '@/lib/utils'
import React, { createContext, useState, useEffect, useContext } from 'react'
import { useAuthenticated } from '@/hooks/useAccessToken'

const UserContext = createContext({
   user: null,
   loading: true,
   refreshUser: () => {},
})

export const useUserContext = () => {
   return useContext(UserContext)
}

export const UserContextProvider = ({ children }) => {
   const { authenticated } = useAuthenticated()

   const [user, setUser] = useState(null)
   const [loading, setLoading] = useState(true)

   const refreshUser = async () => {
      try {
         if (validateBoolean(authenticated, true)) {
            setLoading(true)

            const response = await fetch(`/api/user`, {
               cache: 'no-store',
            })

            const json = await response.json()

            if (isVariableValid(json?.user)) {
               setUser(json?.user)
               setLoading(false)
            }

            setLoading(false)
         }
      } catch (error) {
         console.error({ error })
      }
   }

   useEffect(() => {
      try {
         async function fetchData() {
            console.error('Hitting USER API')

            const response = await fetch(`/api/user`, {
               cache: 'no-store',
            })

            const json = await response.json()

            if (isVariableValid(json?.user)) {
               setUser(json?.user)
               setLoading(false)
            }
         }

         if (validateBoolean(authenticated, true)) fetchData()
         if (!validateBoolean(authenticated, true)) setLoading(false)
      } catch (error) {
         console.error({ error })
      }
   }, [authenticated])

   return (
      <UserContext.Provider value={{ user, loading, refreshUser }}>
         {children}
      </UserContext.Provider>
   )
}
