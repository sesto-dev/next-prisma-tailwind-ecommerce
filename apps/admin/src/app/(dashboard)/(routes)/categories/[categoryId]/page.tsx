import prisma from '@/lib/prisma'

import { CategoryForm } from './components/category-form'

const CategoryPage = async ({
   params,
}: {
   params: { categoryId: string; id: string }
}) => {
   const category = await prisma.category.findUnique({
      where: {
         id: params.categoryId,
      },
   })

   const banners = await prisma.banner.findMany({
      where: {
         id: params.id,
      },
   })

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 p-8 pt-6">
            <CategoryForm banners={banners} initialData={category} />
         </div>
      </div>
   )
}

export default CategoryPage
