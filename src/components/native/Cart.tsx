import Link from 'next/link'

import Image from 'next/image'
import { CloseIcon, ImageSkeleton } from 'components/native/icons'
import { Button } from 'components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from 'components/ui/card'
import { Badge } from 'components/ui/badge'

export const CartGrid = ({ items }) => {
    return (
        <>
            <h3 className="mb-1 text-xl font-bold tracking-tight md:text-4xl">
                Cart
            </h3>
            <p className="mb-4 text-xs text-neutral-500 text-justify">
                Below is a list of products you have in your cart.
            </p>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                    {items
                        ? items.map((item) => (
                              <Variant item={item} key={item.id} />
                          ))
                        : [...Array(15)].map(() => (
                              <ProductSkeleton key={Math.random()} />
                          ))}
                </div>
                <Receipt />
            </div>
        </>
    )
}

function Receipt() {
    return (
        <Card>
            <CardHeader className="p-4 pb-0">
                <h2 className="font-bold tracking-tight">Receipt</h2>
            </CardHeader>
            <CardContent className="grid gap-4 p-4">
                <div className="flex justify-between">
                    <h2>Payable Amount:</h2>
                    <h3>$19.99 </h3>
                </div>
            </CardContent>
            <CardFooter></CardFooter>
        </Card>
    )
}

export const Variant = ({ item }) => {
    return (
        <Link className="" href={`/product/${item.productId}`}>
            <Card className="">
                <CardContent className="grid grid-cols-6 gap-4 p-3">
                    <div className="relative w-full col-span-1">
                        <Image
                            className="rounded-lg"
                            src={item['variant']['images'][0]}
                            alt="item image"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className="col-span-5">
                        <div className="flex flex-1 items-center justify-between">
                            <h2>{item.title}</h2>
                            <Button size="icon" variant="outline">
                                <CloseIcon />
                            </Button>
                        </div>
                        <p className="my-2 text-xs text-neutral-500 text-justify w-2/3">
                            {item.description}
                        </p>
                        <h2 className="text-lg">${item['price']}</h2>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export function ProductSkeleton() {
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
