import Link from 'next/link'

import { BlogPostCard } from 'components/native/BlogPostCard'

import Meta from 'components/native/Meta'
import Config from 'config/site'
import prisma from 'lib/prisma'

import { ProductGrid } from 'components/native/Product'
import { isVariableValid } from 'lib/utils'

export default function Index({ products, blogs }) {
    return (
        <div className="flex flex-col border-neutral-200 dark:border-neutral-700">
            <Meta
                title="Pasargad"
                description="Home Page"
                image={Config.ogImage}
                canonical={process.env.NEXT_PUBLIC_URL}
            />
            {isVariableValid(products) && (
                <ProductGrid products={JSON.parse(products)} />
            )}
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            {isVariableValid(blogs) && <Blogs blogs={JSON.parse(blogs)} />}
        </div>
    )
}

function Blogs({ blogs }) {
    return (
        <>
            <h3 className="mb-1 text-xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
                Recent Blog Posts
            </h3>
            <p className="mb-4 text-xs text-neutral-500 text-justify">
                Below is our latest blog posts available for you.
            </p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {blogs.map((post: any) => (
                    <BlogPostCard key={post.slug} post={post} />
                ))}
            </div>
            <Link
                className="mt-4 flex h-6 rounded-lg leading-7 text-neutral-600 transition-all hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                href="/blog"
            >
                Read all posts...
            </Link>
        </>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query

    try {
        const products = await prisma.product.findMany({
            take: 8,
            where: { id },
            include: {
                variants: true,
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
