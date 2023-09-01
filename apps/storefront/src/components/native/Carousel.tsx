'use client'

import { Card, CardContent } from 'components/ui/card'
import { Carousel as CarouselImport } from 'flowbite-react'

export default function Carousel({ images }) {
    return (
        <Card>
            <CardContent className="p-2">
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
            </CardContent>
        </Card>
    )
}
