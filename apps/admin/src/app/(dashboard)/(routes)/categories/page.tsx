import { format } from 'date-fns'

import prisma from '@/lib/prisma'

import { CategoryColumn } from './components/table'
import { CategoriesClient } from './components/table'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

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

   return (
      <div className="block space-y-4 my-6">
         <div className="flex items-center justify-between">
            <Heading
               title={`Categories (${categories.length})`}
               description="Manage categories for your store"
            />
            <Link href="/categories/new">
               <Button>
                  <Plus className="mr-2 h-4" /> Add New
               </Button>
            </Link>
         </div>
         <Separator />
         <CategoriesClient data={formattedCategories} />
      </div>
   )
}
