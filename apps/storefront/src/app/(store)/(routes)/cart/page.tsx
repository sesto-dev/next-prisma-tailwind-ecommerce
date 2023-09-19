'use client'

import { Heading } from '@/components/native/heading'
import { CartContextProvider } from '@/state/Cart'

import { CartGrid } from './components/grid'

export default function Cart() {
   return (
      <CartContextProvider>
         <Heading
            title="Cart"
            description="Below is a list of products you have in your cart."
         />
         <CartGrid />
      </CartContextProvider>
   )
}
