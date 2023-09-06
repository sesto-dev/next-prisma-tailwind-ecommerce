import Link from 'next/link'

import Image from 'next/image'

import prisma from '@/lib/prisma'
import { ChevronRightIcon } from '@radix-ui/react-icons'

import { isVariableValid } from '@/lib/utils'

import { DataSection } from './components/data'

export default async function Product({
   params,
}: {
   params: { productId: string }
}) {
   const product = await prisma.product.findUnique({
      where: {
         id: params.productId,
      },
      include: {
         brand: true,
         categories: true,
      },
   })

   if (isVariableValid(product)) {
      return (
         <>
            <Breadcrumbs product={product} />
            <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-3">
               <ImageColumn product={product} />
               <DataSection product={product} />
            </div>
         </>
      )
   }
}

const ImageColumn = ({ product }) => {
   return (
      <div className="relative min-h-[50vh] w-full col-span-1">
         <Image
            src={product?.images[0]}
            alt="Product Image"
            fill
            className="rounded-lg"
            style={{ objectFit: 'cover' }}
         />
      </div>
   )
}

const Breadcrumbs = ({ product }) => {
   return (
      <nav className="flex" aria-label="Breadcrumb">
         <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
               <Link
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
               >
                  Home
               </Link>
            </li>
            <li>
               <div className="flex items-center">
                  <ChevronRightIcon />
                  <Link
                     className="ml-1 text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white md:ml-2"
                     href="/products"
                  >
                     Products
                  </Link>
               </div>
            </li>
            <li aria-current="page">
               <div className="flex items-center">
                  <ChevronRightIcon />
                  <span className="ml-1 text-sm font-medium text-neutral-500 dark:text-neutral-400 md:ml-2">
                     {product?.title}
                  </span>
               </div>
            </li>
         </ol>
      </nav>
   )
}
