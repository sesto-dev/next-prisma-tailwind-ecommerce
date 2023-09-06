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

   return (
      <div className="flex flex-col border-neutral-200 dark:border-neutral-700">
         <Carousel
            images={[
               'https://i0.wp.com/allhomecinema.com/storage/2020/01/1580026175_review-bang-olufsen-beoplay-a9-wireless-speaker.jpg',
               'https://globaltv.es/wp-content/uploads/2022/10/bang-olufsen-salon.webp',
               'https://thevinylfactory.com/wp-content/uploads/2023/06/2.webp',
            ]}
         />
         <hr className="h-px my-8 bg-neutral-200 dark:bg-neutral-800 border-0" />
         <Heading
            title="Products"
            description="Below is a list of products we have available for you."
         />
         {isVariableValid(products) ? (
            <ProductGrid products={products} />
         ) : (
            <ProductSkeletonGrid />
         )}
         <hr className="h-px my-8 bg-neutral-200 dark:bg-neutral-800 border-0" />
         {isVariableValid(blogs) ? (
            <BlogPostGrid blogs={blogs} />
         ) : (
            <BlogPostSkeletonGrid />
         )}
      </div>
   )
}
