import { ImageSkeleton } from 'components/native/icons'
import Image from 'next/image'
import Link from 'next/link'
import { parseISO, format } from 'date-fns'

export function BlogPostCard({ post }) {
    const { title, description, image, slug, createdAt, author } = post

    return (
        <Link href={`/blog/${slug}`}>
            <div className="h-full w-full rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
                <div className="relative h-40 w-full">
                    <Image
                        className="rounded-t-lg"
                        src={image}
                        alt="Blog Post Cover"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className="p-5">
                    <div className="w-full">
                        <h5 className="mb-3 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                            {title}
                        </h5>
                        <p className="block text-neutral-700 dark:text-neutral-400">
                            {author && author.name && (
                                <span>{author.name}, </span>
                            )}
                            {format(parseISO(createdAt), 'MMMM dd, yyyy')}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export const BlogPostCardSkeleton = () => {
    return (
        <Link href="#">
            <div className="animate-pulse rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
                <div className="relative h-full w-full">
                    <div className="flex h-40 w-full items-center justify-center rounded bg-neutral-300 dark:bg-neutral-700 ">
                        <ImageSkeleton />
                    </div>
                </div>
                <div className="p-5">
                    <div className="w-full">
                        <div className="mb-4 h-2.5 w-48 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                        <div className="mb-2.5 h-2 max-w-[480px] rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                        <div className="mb-2.5 h-2 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                        <div className="mb-2.5 h-2 max-w-[440px] rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                        <div className="mb-2.5 h-2 max-w-[460px] rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                        <div className="h-2 max-w-[360px] rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
