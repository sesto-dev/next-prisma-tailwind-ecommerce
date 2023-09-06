import { ProductGrid, ProductSkeletonGrid } from '@/components/native/Product'
import { isVariableValid } from '@/lib/utils'
import prisma from '@/lib/prisma'
import { Heading } from '@/components/native/heading'

export default async function Products() {
   const products = await prisma.product.findMany({
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
         {isVariableValid(products) ? (
            <ProductGrid products={products} />
         ) : (
            <ProductSkeletonGrid />
         )}
      </>
   )
}
