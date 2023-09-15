'use client'

import { Separator } from '@/components/native/separator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useAuthenticated } from '@/hooks/useAuthentication'
import { isVariableValid } from '@/lib/utils'
import { useCartContext } from '@/state/Cart'
import Link from 'next/link'

export function Receipt() {
   const { authenticated } = useAuthenticated()
   const { loading, cart, refreshCart, dispatchCart } = useCartContext()

   function calculatePayableCost() {
      let totalAmount = 0,
         discountAmount = 0

      if (isVariableValid(cart?.items)) {
         for (const item of cart?.items) {
            totalAmount += item?.count * item?.product?.price
            discountAmount += item?.count * item?.product?.discount
         }
      }

      const afterDiscountAmount = totalAmount - discountAmount
      const taxAmount = afterDiscountAmount * 0.09
      const payableAmount = afterDiscountAmount + taxAmount

      return {
         totalAmount: totalAmount.toFixed(2),
         discountAmount: discountAmount.toFixed(2),
         afterDiscountAmount: afterDiscountAmount.toFixed(2),
         taxAmount: taxAmount.toFixed(2),
         payableAmount: payableAmount.toFixed(2),
      }
   }

   return (
      <Card className={loading && 'animate-pulse'}>
         <CardHeader className="p-4 pb-0">
            <h2 className="font-bold tracking-tight">Receipt</h2>
         </CardHeader>
         <CardContent className="p-4 text-sm">
            <div className="block space-y-[1vh]">
               <div className="flex justify-between">
                  <p>Total Amount</p>
                  <h3>${calculatePayableCost().totalAmount}</h3>
               </div>
               <div className="flex justify-between">
                  <p>Discount Amount</p>
                  <h3>${calculatePayableCost().discountAmount}</h3>
               </div>
               <div className="flex justify-between">
                  <p>Tax Amount</p>
                  <h3>${calculatePayableCost().taxAmount}</h3>
               </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between">
               <p>Payable Amount</p>
               <h3>${calculatePayableCost().payableAmount}</h3>
            </div>
         </CardContent>
         <Separator />
         <CardFooter>
            <Link
               href={authenticated ? '/checkout' : '/login'}
               className="w-full"
            >
               <Button
                  disabled={
                     !isVariableValid(cart?.items) || cart['items'].length === 0
                  }
                  className="w-full"
               >
                  Checkout
               </Button>
            </Link>
         </CardFooter>
      </Card>
   )
}
