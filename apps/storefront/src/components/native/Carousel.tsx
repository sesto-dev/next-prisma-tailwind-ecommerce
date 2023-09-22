'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Carousel as CarouselImport } from 'flowbite-react'
import { Suspense } from 'react'

import { Loader } from '../ui/loader'

export default function Carousel({ images }) {
   return (
      <Card>
         <CardContent className="p-0">
            <Suspense fallback={<Loading />}>
               <CarouselImport className="h-[70vh]">
                  {images.map((image: any) => (
                     <img
                        className="rounded-lg h-full"
                        key={image}
                        alt="..."
                        src={image}
                        style={{ objectFit: 'cover' }}
                     />
                  ))}
               </CarouselImport>
            </Suspense>
         </CardContent>
      </Card>
   )
}

function Loading() {
   return (
      <div className="h-[70vh]">
         <div className="h-full">
            <Loader />
         </div>
      </div>
   )
}
