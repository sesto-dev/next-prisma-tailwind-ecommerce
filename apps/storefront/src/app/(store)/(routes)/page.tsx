import {
   BlogPostCard,
   BlogPostGrid,
   BlogPostSkeletonGrid,
} from '@/components/native/BlogPostCard'

import prisma from '@/lib/prisma'

import { ProductGrid, ProductSkeletonGrid } from '@/components/native/Product'
import { isVariableValid } from '@/lib/utils'
import Carousel from '@/components/native/Carousel'
import { Heading } from '@/components/native/heading'
import { Separator } from '@/components/native/separator'

export default async function Index() {
   const products = await prisma.product.findMany({
      include: {
         brand: true,
         categories: true,
      },
   })

   const blogs = await prisma.blogPost.findMany({
      take: 3,
   })

   const billboards = await prisma.billboard.findMany()

   return (
      <div className="flex flex-col border-neutral-200 dark:border-neutral-700">
         <Carousel images={billboards.map((obj) => obj.image)} />
         <Separator className="my-8" />
         <Heading
            title="Products"
            description="Below is a list of products we have available for you."
         />
         {isVariableValid(products) ? (
            <ProductGrid products={products} />
         ) : (
            <ProductSkeletonGrid />
         )}
         <Separator className="my-8" />
         {isVariableValid(blogs) ? (
            <BlogPostGrid blogs={blogs} />
         ) : (
            <BlogPostSkeletonGrid />
         )}
      </div>
   )
}
