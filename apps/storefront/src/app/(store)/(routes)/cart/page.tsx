'use client'

import { CartGrid } from './components/grid'
import { Heading } from '@/components/native/heading'
import { CartContextProvider } from '@/state/Cart'

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
