import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { fetcher } from 'lib/fetcher'
import Config from 'config/site'
import Meta from 'components/native/Meta'

import { ProductGrid } from 'components/native/Product'

export default function Products({ currentPage, category, tags, sort }) {
    const { data } = useSWR(`/api/products/list`, fetcher) as any

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
