import { BlogPostCard } from 'components/native/BlogPostCard'
import Meta from 'components/native/Meta'

import prisma from 'lib/prisma'
import Config from 'config/site'

export default function Index({ blogs }) {
    if (blogs) {
        blogs = JSON.parse(blogs)

        return (
            <div className="flex flex-col border-neutral-200 dark:border-neutral-700">
                <Meta
                    title="Pasargad"
                    description="Home Page"
                    image={Config.ogImage}
                />
                <h3 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
                    Blog Posts
                </h3>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    {blogs.map((post) => (
                        <BlogPostCard key={post.slug} post={post} />
                    ))}
                </div>
            </div>
        )
    }
}

export async function getStaticProps() {
    return {
        props: {
            blogs: JSON.stringify(await prisma.blogPost.findMany()),
        },
    }
}
