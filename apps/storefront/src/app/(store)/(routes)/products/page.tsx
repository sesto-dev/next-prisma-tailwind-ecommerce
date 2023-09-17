import { ProductGrid, ProductSkeletonGrid } from '@/components/native/Product'
import { isVariableValid } from '@/lib/utils'
import prisma from '@/lib/prisma'

import { Heading } from '@/components/native/heading'
import {
   AvailableToggle,
   BrandCombobox,
   CategoriesCombobox,
   SortBy,
} from './components/options'
import { Separator } from '@/components/native/separator'

export default async function Products({ searchParams }) {
   const { sort, isAvailable, brand, category, page = 1 } = searchParams ?? null

   const orderBy = getOrderBy(sort)

   const brands = await prisma.brand.findMany()
   const categories = await prisma.category.findMany()

   const products = await prisma.product.findMany({
      where: {
         isAvailable: isAvailable == 'true' || sort ? true : undefined,
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
      orderBy,
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
            <SortBy initialData={sort} />
            <CategoriesCombobox
               initialCategory={category}
               categories={categories}
            />
            <BrandCombobox initialBrand={brand} brands={brands} />
            <AvailableToggle initialData={isAvailable} />
         </div>
         <Separator />
         {isVariableValid(products) ? (
            <ProductGrid products={products} />
         ) : (
            <ProductSkeletonGrid />
         )}
      </>
   )
}

function getOrderBy(sort) {
   let orderBy

   switch (sort) {
      case 'featured':
         orderBy = {
            orders: {
               _count: 'desc',
            },
         }
         break
      case 'most_expensive':
         orderBy = {
            price: 'desc',
         }
         break
      case 'least_expensive':
         orderBy = {
            price: 'asc',
         }
         break

      default:
         orderBy = {
            orders: {
               _count: 'desc',
            },
         }
         break
   }

   return orderBy
}
