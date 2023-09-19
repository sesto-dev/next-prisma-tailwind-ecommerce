import { getGraphRevenue } from '@/actions/get-graph-revenue'
import { getSalesCount } from '@/actions/get-sales-count'
import { getStockCount } from '@/actions/get-stock-count'
import { getTotalRevenue } from '@/actions/get-total-revenue'
import { Overview } from '@/components/overview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { formatter } from '@/lib/utils'
import { CreditCard, DollarSign, Package } from 'lucide-react'

export default async function DashboardPage() {
   const totalRevenue = await getTotalRevenue()
   const graphRevenue = await getGraphRevenue()
   const salesCount = await getSalesCount()
   const stockCount = await getStockCount()

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 pt-4">
            <Heading title="Dashboard" description="Overview of your store" />
            <Separator />
            <div className="grid gap-4 grid-cols-3">
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">
                        Total Revenue
                     </CardTitle>
                     <DollarSign className="h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">
                        {formatter.format(totalRevenue)}
                     </div>
                  </CardContent>
               </Card>
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">
                        Sales
                     </CardTitle>
                     <CreditCard className="h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">+{salesCount}</div>
                  </CardContent>
               </Card>
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                     <CardTitle className="text-sm font-medium">
                        Products In Stock
                     </CardTitle>
                     <Package className="h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{stockCount}</div>
                  </CardContent>
               </Card>
            </div>
            <Card className="col-span-4">
               <CardHeader>
                  <CardTitle>Overview</CardTitle>
               </CardHeader>
               <CardContent className="pl-2">
                  <Overview data={graphRevenue} />
               </CardContent>
            </Card>
         </div>
      </div>
   )
}
