import { format } from 'date-fns'

import prisma from '@/lib/prisma'

import { CategoryColumn } from './components/columns'
import { CategoriesClient } from './components/client'

export default async function CategoriesPage() {
   const categories = await prisma.category.findMany({
      include: {
         products: true,
      },
   })

   const formattedCategories: CategoryColumn[] = categories.map((category) => ({
      id: category.id,
      title: category.title,
      products: category.products.length,
   }))

   return <CategoriesClient data={formattedCategories} />
}
