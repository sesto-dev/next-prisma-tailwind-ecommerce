import { format } from 'date-fns'

import prisma from '@/lib/prisma'
import { formatter } from '@/lib/utils'

import { ProductsClient } from './components/client'
import { ProductColumn } from './components/columns'

const ProductsPage = async () => {
   const products = await prisma.product.findMany({
      include: {
         categories: true,
         brand: true,
      },
      orderBy: {
         createdAt: 'desc',
      },
   })

   const formattedProducts: ProductColumn[] = products.map((product) => ({
      id: product.id,
      title: product.title,
      price: formatter.format(product.price),
      discount: formatter.format(product.discount),
      category: product.categories[0].title,
      createdAt: format(product.createdAt, 'MMMM do, yyyy'),
   }))

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 pt-6">
            <ProductsClient data={formattedProducts} />
         </div>
      </div>
   )
}

export default ProductsPage
