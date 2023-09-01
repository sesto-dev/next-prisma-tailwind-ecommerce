import { format } from 'date-fns'

import prisma from '@/lib/prisma'

import { CategoryColumn } from './components/columns'
import { CategoriesClient } from './components/client'

const CategoriesPage = async () => {
   const categories = await prisma.category.findMany({})

   const formattedCategories: CategoryColumn[] = categories.map((category) => ({
      id: category.id,
      title: category.title,
      createdAt: format(category.createdAt, 'MMMM do, yyyy'),
   }))

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem] pt-6">
            <CategoriesClient data={formattedCategories} />
         </div>
      </div>
   )
}

export default CategoriesPage
