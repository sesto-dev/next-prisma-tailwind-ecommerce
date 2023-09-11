import prisma from '@/lib/prisma'

import { ProductForm } from './components/product-form'

const ProductPage = async ({ params }: { params: { productId: string } }) => {
   const product = await prisma.product.findUnique({
      where: {
         id: params.productId,
      },
      include: {
         categories: true,
         brand: true,
      },
   })

   const categories = await prisma.category.findMany()

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 pt-6 pb-12">
            <ProductForm categories={categories} initialData={product} />
         </div>
      </div>
   )
}

export default ProductPage
