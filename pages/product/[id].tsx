import { memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import Image from 'next/image'
import { ChevronRight, HomeIcon } from 'components/Icons'

export default function Product({ unserialized }) {
    const [product, setProduct] = useState(JSON.parse(unserialized) || null)

    return (
        <>
            <NextSeo
                title={product.title || 'Product'}
                description={product.description || 'Product Page'}
                openGraph={{
                    images: [{ url: product.images[0]['url'] }],
                }}
            />
            <Breadcrumbs product={product} />
            <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-3">
                <div className="col-span-2 h-full w-full rounded-lg bg-gray-100 p-6 dark:bg-gray-900">
                    <h3 className="mb-4 text-xl font-medium text-black dark:text-white">
                        {product.title}
                    </h3>
                    <small className="text-black dark:text-white">
                        {product.description}
                    </small>
                    <hr className="my-4 h-px w-64 border-0 bg-neutral-300 dark:bg-gray-600" />
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Select an option
                    </label>
                    <select
                        id="countries"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                        <option selected>Choose a country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                    </select>
                </div>
                <div className="col-span-1 h-full w-full rounded-lg bg-gray-100 p-8 dark:bg-gray-900">
                    <Image
                        src="https://flowbite.com/docs/images/products/apple-watch.png"
                        alt="Product Image"
                        width="100"
                        height="100"
                        className="h-full w-full rounded-lg"
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            </div>
        </>
    )
}

const Breadcrumbs = ({ product }) => {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        <HomeIcon />
                        Home
                    </Link>
                </li>
                <li>
                    <div className="flex items-center">
                        <ChevronRight />
                        <Link
                            className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:ml-2"
                            href="/products"
                        >
                            Products
                        </Link>
                    </div>
                </li>
                <li aria-current="page">
                    <div className="flex items-center">
                        <ChevronRight />
                        <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2">
                            {product.title || '---'}
                        </span>
                    </div>
                </li>
            </ol>
        </nav>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query

    try {
        return {
            props: {},
        }
    } catch (error) {
        return { props: {} }
    }
}
