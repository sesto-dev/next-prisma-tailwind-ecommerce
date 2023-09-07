import { ProductGrid, ProductSkeletonGrid } from '@/components/native/Product'
import { isVariableValid } from '@/lib/utils'
import prisma from '@/lib/prisma'

import { Heading } from '@/components/native/heading'
import {
   AvailableToggle,
   BrandCombobox,
   CategoriesCombobox,
} from './components/filter'

export default async function Products({ searchParams }) {
   const { isAvailable, brand, category, page = 1 } = searchParams ?? null

   const brands = await prisma.brand.findMany()
   const categories = await prisma.category.findMany()

   const products = await prisma.product.findMany({
      where: {
         isAvailable: isAvailable == 'true' ? true : undefined,
         brand: {
            title: {
               contains: brand,
               mode: 'insensitive',
            },
         },
         categories: {
            some: {
               title: {
                  contains: category,
                  mode: 'insensitive',
               },
            },
         },
      },
      skip: (page - 1) * 12,
      take: 12,
      include: {
         brand: true,
         categories: true,
      },
   })

   return (
      <>
         <Heading
            title="Products"
            description="Below is a list of products you have in your cart."
         />
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
            <CategoriesCombobox categories={categories} />
            <BrandCombobox brands={brands} />
            <AvailableToggle />
         </div>
         {isVariableValid(products) ? (
            <ProductGrid products={products} />
         ) : (
            <ProductSkeletonGrid />
         )}
      </>
   )
}
