import { useEffect, useState } from 'react'
import Link from 'next/link'

import { BlogPostCard } from 'components/native/BlogPostCard'

import prisma from 'lib/prisma'

export default function Index({ users, products }) {
    if (users && products) {
        users = JSON.parse(users)
        products = JSON.parse(products)

        return (
            <div className="flex flex-col border-neutral-200 dark:border-neutral-700">
                <h3 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
                    Recent Blog Posts
                </h3>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3"></div>
            </div>
        )
    }
}

export async function getServerSideProps() {
    try {
        return {
            props: {
                users: JSON.stringify(await prisma.user.findMany({ take: 6 })),
            },
        }
    } catch (error) {
        return { props: {} }
    }
}
