import { format } from 'date-fns'

import prisma from '@/lib/prisma'
import { formatter } from '@/lib/utils'

import { ProductsClient } from './components/client'
import { ProductColumn } from './components/columns'

const ProductsPage = async () => {
   const products = await prisma.product.findMany({
      include: {
         orders: true,
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
      sales: product.orders.length,
      isAvailable: product.isAvailable ? 'Yes.' : 'No.',
   }))

   return <ProductsClient data={formattedProducts} />
}

export default ProductsPage
