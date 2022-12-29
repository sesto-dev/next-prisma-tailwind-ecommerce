import { useEffect, useState } from 'react'
import Link from 'next/link'

import { BlogPostCard, BlogPostCardSkeleton } from 'components/BlogPostCard'

import prisma from 'lib/prisma'

export default function Index({ blogs, users, products }) {
    if (blogs && users && products) {
        blogs = JSON.parse(blogs)
        users = JSON.parse(users)
        products = JSON.parse(products)

        return (
            <div className="flex flex-col border-gray-200 dark:border-gray-700">
                <h3 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
                    Recent Blog Posts
                </h3>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    {blogs
                        ? blogs.map((post: any) => (
                              <BlogPostCard key={post.id} post={post} />
                          ))
                        : [...Array(6)].map(() => (
                              <BlogPostCardSkeleton key={Math.random()} />
                          ))}
                </div>
            </div>
        )
    }
}

export async function getServerSideProps() {
    try {
        return {
            props: {
                blogs: JSON.stringify(
                    await prisma.blogPost.findMany({ take: 6 })
                ),
                users: JSON.stringify(await prisma.user.findMany({ take: 6 })),
            },
        }
    } catch (error) {
        return { props: {} }
    }
}
