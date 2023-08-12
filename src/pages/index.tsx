import Link from 'next/link'

import { BlogPostCard } from 'components/native/BlogPostCard'
import VideoCard from 'components/native/VideoCard'
import useSWR from 'swr'

import fetcher from 'lib/fetcher'
import Meta from 'components/native/Meta'
import Config from 'config/site'
import prisma from 'lib/prisma'

import { ProductGrid } from 'components/native/Product'

export default function Index({ unserialized }) {
    const { data } = useSWR(`/api/products/list`, fetcher) as any

    const products = data?.products

    return (
        <div className="flex flex-col border-neutral-200 dark:border-neutral-700">
            <Meta
                title="Pasargad"
                description="Home Page"
                image={Config.ogImage}
                canonical={process.env.NEXT_PUBLIC_URL}
            />
            <ProductGrid products={products} />
            <h3 className="mb-4 mt-16 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
                Learn React & Next.js
            </h3>
            <p className="mb-4 text-neutral-600 dark:text-neutral-400">
                Build and deploy a modern SaaS application using the most
                popular open-source software. This course is 12 hours long and
                is completely live streamed.
            </p>
            <VideoCard
                index="01"
                href="https://www.youtube.com/watch?v=MxR5I5_hOKk&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=2"
                length="1:02:45"
                title="Introduction to React 2025"
            />
            <VideoCard
                index="02"
                href="https://www.youtube.com/watch?v=AGl52moyISU&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=3"
                length="54:22"
                title="Firestore, Chakra UI, Absolute Imports"
            />
            <VideoCard
                index="03"
                href="https://www.youtube.com/watch?v=3g6-v3_BNbM&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=4"
                length="1:08:30"
                title="Designing & Building the Dashboard"
            />
            <VideoCard
                index="04"
                href="https://www.youtube.com/watch?v=u8iv_yhSRI8&list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1&index=5"
                length="1:13:45"
                title="Firebase Admin with Next.js + SWR"
            />
            <a
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com/playlist?list=PL6bwFJ82M6FXgctyoWXqj7H0GK8_YIeF1"
                className="mt-4 flex h-6 rounded-lg leading-7 text-neutral-600 transition-all hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
            >
                Watch all videos...
            </a>
        </div>
    )
}

function Blogs({ blogs }) {
    return (
        <>
            <h3 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
                Recent Blog Posts
            </h3>
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
        const product = await prisma.product.findMany({
            take: 6,
            where: { id },
            include: {
                variants: true,
                categories: true,
            },
        })
        return {
            props: { unserialized: JSON.stringify(product) },
        }
    } catch (error) {
        return { props: {} }
    }
}
