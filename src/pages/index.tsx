import Link from 'next/link'

import {
    BlogPostCard,
    BlogPostGrid,
    BlogPostSkeletonGrid,
} from 'components/native/BlogPostCard'

import Meta from 'components/native/Meta'
import Config from 'config/site'
import prisma from 'lib/prisma'

import { ProductGrid, ProductSkeletonGrid } from 'components/native/Product'
import { isVariableValid } from 'lib/utils'
import Carousel from 'components/native/Carousel'

export default function Index({ products, blogs }) {
    return (
        <div className="flex flex-col border-neutral-200 dark:border-neutral-700">
            <Meta
                title="Pasargad"
                description="Home Page"
                image={Config.ogImage}
                canonical={process.env.NEXT_PUBLIC_URL}
            />
            <Carousel
                images={[
                    'https://i0.wp.com/allhomecinema.com/storage/2020/01/1580026175_review-bang-olufsen-beoplay-a9-wireless-speaker.jpg?fit=1320%2C759&ssl=1',
                    'https://globaltv.es/wp-content/uploads/2022/10/bang-olufsen-salon.webp',
                    'https://thevinylfactory.com/wp-content/uploads/2023/06/2.webp',
                ]}
            />
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <h3 className="mb-1 text-xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
                Products
            </h3>
            <p className="mb-4 text-xs text-neutral-500 text-justify">
                Below is a list of products we have available for you.
            </p>
            {isVariableValid(products) ? (
                <ProductGrid products={JSON.parse(products)} />
            ) : (
                <ProductSkeletonGrid />
            )}
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <h3 className="mb-1 text-xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
                Recent Blog Posts
            </h3>
            <p className="mb-4 text-xs text-neutral-500 text-justify">
                Below is our latest blog posts available for you.
            </p>
            {isVariableValid(blogs) ? (
                <BlogPostGrid blogs={JSON.parse(blogs)} />
            ) : (
                <BlogPostSkeletonGrid />
            )}
        </div>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query

    try {
        const products = await prisma.product.findMany({
            take: 8,
            where: { id },
            include: {
                variants: { include: { vendorVariants: true } },
                categories: true,
            },
        })

        return {
            props: {
                products: JSON.stringify(products),
                blogs: JSON.stringify(
                    await prisma.blogPost.findMany({ take: 3 })
                ),
            },
        }
    } catch (error) {
        return { props: {} }
    }
}
