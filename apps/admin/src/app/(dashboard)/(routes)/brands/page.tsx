import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prisma'
import { Plus } from 'lucide-react'
import Link from 'next/link'

import { BrandColumn, BrandsClient } from './components/table'

export default async function BrandsPage() {
   const brands = await prisma.brand.findMany({
      include: {
         products: true,
      },
   })

   const formattedBrands: BrandColumn[] = brands.map((brand) => ({
      id: brand.id,
      title: brand.title,
      products: brand.products.length,
   }))

   return (
      <div className="my-6 block space-y-4">
         <div className="flex items-center justify-between">
            <Heading
               title={`Brands (${brands.length})`}
               description="Manage brands for your store"
            />
            <Link href="/brands/new">
               <Button>
                  <Plus className="mr-2 h-4" /> Add New
               </Button>
            </Link>
         </div>
         <Separator />
         <BrandsClient data={formattedBrands} />
      </div>
   )
}
