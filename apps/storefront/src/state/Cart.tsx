import { isVariableValid } from '@/lib/utils'
import React, { createContext, useState, useEffect, useContext } from 'react'
import { useUserContext } from '@/state/User'
import { getLocalCart, writeLocalCart } from '@/lib/cart'

const CartContext = createContext({
   cart: null,
   loading: true,
   refreshCart: () => {},
   dispatchCart: (object) => {},
})

export const useCartContext = () => {
   return useContext(CartContext)
}

export const CartContextProvider = ({ children }) => {
   console.log('Creating cart context')
   const { refreshUser, user } = useUserContext()

   const [cart, setCart] = useState(null)
   const [loading, setLoading] = useState(true)

   const dispatchCart = async (cart) => {
      setCart(cart)
      writeLocalCart(cart)
   }

   const refreshCart = async () => {
      setLoading(true)

      if (isVariableValid(user)) setCart(user?.cart)
      if (!isVariableValid(user)) setCart(getLocalCart())

      setLoading(false)
   }

   useEffect(() => {
      if (isVariableValid(user)) setCart(user?.cart)
      if (!isVariableValid(getLocalCart())) writeLocalCart({ items: [] })
      if (!isVariableValid(user)) setCart(getLocalCart())

      setLoading(false)
   }, [user])

   return (
      <CartContext.Provider
         value={{ cart, loading, refreshCart, dispatchCart }}
      >
         {children}
      </CartContext.Provider>
   )
}
