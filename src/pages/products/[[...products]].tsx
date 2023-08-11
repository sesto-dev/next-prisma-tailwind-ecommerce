import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Link from 'next/link'

import fetcher from 'lib/fetcher'
import { ProductsList } from 'lib/types'
import Image from 'next/image'
import { ImageSkeleton } from 'components/icons'
import Config from 'main.config'
import Meta from 'components/Meta'

export default function Products({ currentPage, category, tags, sort }) {
    const { data } = useSWR<ProductsList>(`/api/products/list`, fetcher)

    const products = data?.products
    const totalPages = data?.totalPages

    const [keyword, setKeyword] = useState(null)
    const [loading, setLoading] = useState(false)

    return (
        <>
            <Meta
                title="Pasargad"
                description="Home Page"
                image={Config.image}
                canonical={process.env.NEXT_PUBLIC_URL}
            />
            <ProductGrid products={products} />
        </>
    )
}

const ProductGrid = ({ products }) => {
    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
            <div className="h-full w-full rounded-lg bg-white dark:border-neutral-700 dark:bg-neutral-800">
                <div className="relative h-40 w-full">
                    <Image
                        className="rounded-t-lg"
                        src={product.images[0]['url']}
                        alt="product image"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className="p-5">
                    <h5 className="text-xl font-medium tracking-tight text-neutral-900 dark:text-white">
                        {product.title}
                    </h5>
                    <div className="mt-5 flex items-center justify-between">
                        <span className="text-3xl font-bold text-neutral-900 dark:text-white">
                            ${product.listings[0]['price']}
                        </span>
                        <button className="rounded-lg bg-purple-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-black">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
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
