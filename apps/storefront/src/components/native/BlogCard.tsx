import { ImageSkeleton } from '@/components/native/icons'
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

export function BlogPostGrid({ blogs }) {
   return (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
         {blogs.map((post: any) => (
            <BlogPostCard key={post.slug} post={post} />
         ))}
      </div>
   )
}

export function BlogPostSkeletonGrid() {
   return (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
         {[...Array(3)].map(() => (
            <BlogPostSkeleton key={Math.random()} />
         ))}
      </div>
   )
}

export function BlogPostCard({ post }) {
   const { title, description, image, slug, createdAt, author } = post

   return (
      <Link href={`/blog/${slug}`}>
         <Card className="h-full">
            <CardHeader className="p-0">
               <div className="relative h-60 w-full">
                  <Image
                     className="rounded-t-lg"
                     src={image}
                     alt="product image"
                     fill
                     sizes="(min-width: 1000px) 30vw, 50vw"
                     style={{ objectFit: 'cover' }}
                  />
               </div>
            </CardHeader>
            <CardContent className="grid gap-4 p-4">
               <h5 className="">{title}</h5>
            </CardContent>
            <CardFooter>
               <p className="block text-sm text-neutral-700 dark:text-neutral-400">
                  <span>{author?.name}</span>
               </p>
            </CardFooter>
         </Card>
      </Link>
   )
}

export const BlogPostSkeleton = () => {
   return (
      <Link href="#">
         <div className="animate-pulse rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
            <div className="relative h-full w-full">
               <div className="flex h-40 w-full items-center justify-center rounded bg-neutral-300 dark:bg-neutral-700 ">
                  <ImageSkeleton />
               </div>
            </div>
            <div className="p-5">
               <div className="w-full">
                  <div className="mb-4 h-2.5 w-48 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="mb-2.5 h-2 max-w-[480px] rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="mb-2.5 h-2 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="mb-2.5 h-2 max-w-[440px] rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="mb-2.5 h-2 max-w-[460px] rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                  <div className="h-2 max-w-[360px] rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
               </div>
            </div>
         </div>
      </Link>
   )
}
