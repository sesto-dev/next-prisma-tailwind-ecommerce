import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export type Post = {
    id: string
    content: MDXRemoteSerializeResult
    title: string
    date: string
    excerpt: string
    coverImage: string
    tweets: any[]
}

export type ProductsList = {
    products: any[]
    totalPages: number
}

export type Subscribers = {
    count: number
}

export type YouTube = {
    subscriberCount: number
    viewCount: number
}

export type GitHub = {
    stars: number
}
