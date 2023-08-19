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
import type { CartItemWithVendorVariant } from 'types/prisma'
import { isVariableValid } from 'lib/utils'

export const CartGrid = ({ items }: { items: CartItemWithVendorVariant[] }) => {
    return (
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
                {isVariableValid(items)
                    ? items.map(({ count, vendorVariant, vendorVariantId }) => (
                          <CartVendorVariant
                              count={count}
                              vendorVariant={vendorVariant}
                              key={vendorVariantId}
                          />
                      ))
                    : [...Array(5)].map(() => (
                          <CartVendorVariantSkeleton key={Math.random()} />
                      ))}
            </div>
            <Receipt />
        </div>
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
            <hr className="my-4 w-[80%] border-neutral-200 dark:border-neutral-800 sm:mx-auto" />

            <CardFooter>
                <Button className="w-full">Checkout</Button>
            </CardFooter>
        </Card>
    )
}

export const CartVendorVariant = ({ count, vendorVariant }) => {
    return (
        <Link
            className=""
            href={`/product/${vendorVariant?.productVariant?.product?.id}`}
        >
            <Card className="">
                <CardHeader className="p-0 md:hidden">
                    <div className="relative h-32 w-full">
                        <Image
                            className="rounded-t-lg"
                            src={vendorVariant.productVariant.images[0]}
                            alt="product image"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-6 gap-4 p-3">
                    <div className="relative w-full col-span-1 hidden md:inline-flex">
                        <Image
                            className="rounded-lg"
                            src={vendorVariant?.productVariant?.images[0]}
                            alt="item image"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className="col-span-5">
                        <div className="flex flex-1 items-center justify-between">
                            <h2>{vendorVariant?.productVariant?.title}</h2>
                            <Button size="icon" variant="outline">
                                <CloseIcon />
                            </Button>
                        </div>
                        <p className="my-2 text-xs text-neutral-500 text-justify w-2/3">
                            {vendorVariant?.productVariant?.description}
                        </p>
                        <h2 className="text-lg">${vendorVariant?.price}</h2>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export function CartVendorVariantSkeleton() {
    return (
        <Link href="#">
            <div className="animate-pulse rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800 mb-4">
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
