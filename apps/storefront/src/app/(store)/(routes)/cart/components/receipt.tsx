import { Separator } from '@/components/native/separator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { isVariableValid } from '@/lib/utils'
import { useCartContext } from '@/state/Cart'

export function Receipt() {
   const { loading, cart, refreshCart, dispatchCart } = useCartContext()

   function calculatePayableCost() {
      let payableCost = 0

      if (isVariableValid(cart?.items)) {
         for (const item of cart?.items) {
            payableCost += item.count * item?.product?.price
         }
      }

      return payableCost
   }

   return (
      <Card className={loading && 'animate-pulse'}>
         <CardHeader className="p-4 pb-0">
            <h2 className="font-bold tracking-tight">Receipt</h2>
         </CardHeader>
         <CardContent className="grid gap-4 p-4">
            <div className="flex justify-between">
               <h2>Payable Amount:</h2>
               <h3>${calculatePayableCost()}</h3>
            </div>
         </CardContent>
         <Separator />
         <CardFooter>
            <Button
               disabled={
                  !isVariableValid(cart?.items) || cart['items'].length === 0
               }
               className="w-full"
            >
               Checkout
            </Button>
         </CardFooter>
      </Card>
   )
}
