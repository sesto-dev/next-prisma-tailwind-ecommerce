import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { fetcher } from 'lib/fetcher'
import Config from 'config/site'
import Meta from 'components/native/Meta'

import { ProductGrid, ProductSkeletonGrid } from 'components/native/Product'
import { ProductWithAllVariants } from 'types/prisma'
import { isVariableValid } from 'lib/utils'

export default function Products() {
    const [products, setProduct] = useState<ProductWithAllVariants[] | null>(
        null
    )

    useEffect(() => {
        async function getProducts() {
            const response = await fetch(`/api/products`)

            const json = await response.json()
            setProduct(json?.products)
        }

        getProducts()
    }, [])

    return (
        <>
            <Meta
                title="Pasargad"
                description="Home Page"
                image={Config.ogImage}
            />
            {isVariableValid(products) ? (
                <ProductGrid products={products} />
            ) : (
                <ProductSkeletonGrid />
            )}
        </>
    )
}
