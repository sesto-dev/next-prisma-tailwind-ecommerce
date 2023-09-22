'use client'

import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

export default function Carousel({ images }: { images: string[] }) {
   return (
      <Card>
         <CardContent className="p-2">
               {images.map((image: any) => (
                  <img
                     className="rounded-lg h-full"
                     key={image}
                     alt="..."
                     src={image}
                     style={{ objectFit: 'cover' }}
                  />
               ))}
         </CardContent>
      </Card>
   )
}
