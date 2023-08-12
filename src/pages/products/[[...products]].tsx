import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Link from 'next/link'

import fetcher from 'lib/fetcher'
import { ProductsList } from 'lib/types'
import Image from 'next/image'
import { ImageSkeleton } from 'components/icons'
import Config from 'config/site'
import Meta from 'components/Meta'
import { Icons } from 'components/icons'
import { Button } from 'components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from 'components/ui/card'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'

export default function Products({ currentPage, category, tags, sort }) {
    const { data } = useSWR(`/api/products/list`, fetcher) as any

    console.log({ data })

    const products = data?.products
    const totalPages = data?.totalPages

    const [keyword, setKeyword] = useState(null)
    const [loading, setLoading] = useState(false)

    return (
        <>
            <Meta
                title="Pasargad"
                description="Home Page"
                image={Config.ogImage}
                canonical={process.env.NEXT_PUBLIC_URL}
            />
            <ProductGrid products={products} />
        </>
    )
}

const ProductGrid = ({ products }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
            {products
                ? products.map((product) => (
                      <Product product={product} key={product.id} />
                  ))
                : [...Array(15)].map(() => (
                      <ProductSkeleton key={Math.random()} />
                  ))}
        </div>
    )
}

const Product = ({ product }) => {
    return (
        <Link className="" href={`/product/${product.id}`}>
            <Card>
                <CardHeader className="p-0">
                    <div className="relative h-40 w-full">
                        <Image
                            className="rounded-t-lg"
                            src={product.images[0]}
                            alt="product image"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </CardHeader>
                <CardContent className="grid gap-4 p-4">
                    <h2>{product.title}</h2>
                    <p className="text-sm">{product.description}</p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">
                        $ {product.variants[0]['price']}
                    </Button>
                </CardFooter>
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

const Paginated = ({ totalPages, currentPage }) => {
    const router = useRouter()

    return <div></div>
}

const Filters = () => {
    return <div></div>
}

export async function getServerSideProps(ctx) {
    const { page = 1, category = '', tags = [], sort = '' } = ctx.query

    return {
        props: { currentPage: parseInt(page), category, tags, sort },
    }
}
