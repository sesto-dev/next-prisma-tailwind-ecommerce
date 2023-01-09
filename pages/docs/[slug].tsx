import prisma from 'lib/prisma'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import MDXComponents from 'components/mdx/MDXComponents'
import { parseISO, format } from 'date-fns'
import Link from 'next/link'
import Meta from 'components/Meta'
import Config from 'main.config'

export default function Doc({ nav, doc, mdx }) {
    if (doc && nav)
        return (
            <>
                <Meta
                    title="Pasargad"
                    description="Home Page"
                    image={Config.image}
                    canonical={process.env.NEXT_PUBLIC_URL}
                />
                <div className="grid grid-cols-7 gap-4">
                    <Sidebar nav={nav} />
                    <Body doc={JSON.parse(doc)} mdx={mdx} />
                </div>
            </>
        )
}

function Body({ doc, mdx }) {
    const { title, updatedAt } = doc
    return (
        <div className="col-span-6 rounded-lg bg-neutral-100 p-6 dark:bg-neutral-800/30 md:col-span-5">
            <h1 className="text-4xl font-medium text-neutral-600 dark:text-neutral-200">
                {title}
            </h1>
            <p className="mt-2 text-sm font-medium text-neutral-400">
                Last Updated @ {format(parseISO(updatedAt), 'MMMM dd, yyyy')}
            </p>
            <hr className="border-1 mt-4 mb-10 w-full border-neutral-200 dark:border-neutral-800" />
            <MDXRemote lazy {...mdx} components={MDXComponents} />
        </div>
    )
}

function Sidebar({ nav }) {
    return (
        <div className="no-scrollbar col-span-1 h-full w-full overflow-x-auto rounded-lg bg-neutral-100 p-6 dark:bg-neutral-800/30  md:col-span-2">
            {Object.keys(nav).map((category) => (
                <div key={category} className="">
                    <p className="text-sm font-bold text-neutral-400">
                        {category.toUpperCase()}
                    </p>
                    <hr className="border-1 my-2 w-full border-neutral-200 dark:border-neutral-800" />
                    <ul className="my-3 ml-3 mb-6">
                        {nav[category].map((page) => (
                            <li className="mb-2" key={page.title}>
                                <Link
                                    href={page.route}
                                    className="whitespace-nowrap rounded-md py-2 px-4 text-sm text-neutral-800 
                                    hover:bg-purple-600
                                    hover:text-white
                                    dark:text-neutral-200/80 hover:dark:text-white"
                                >
                                    {page.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export async function getStaticProps({ params }) {
    const { slug } = params
    const docs = await prisma.documentPage.findMany()
    const categories = new Set(docs.map((doc) => doc.category))

    let nav = {}
    categories.forEach((category) => {
        nav[category] = []

        docs.forEach((doc) => {
            if (doc.category == category) {
                nav[category].push({
                    title: doc.title,
                    route: doc.slug,
                })
            }
        })
    })

    const doc = await prisma.documentPage.findUnique({
        where: { slug },
        include: { author: true },
    })

    const mdx = await serialize(doc.content)

    return { props: { nav, doc: JSON.stringify(doc), mdx } }
}

export async function getStaticPaths() {
    const docs = await prisma.documentPage.findMany()
    const slugs = docs.map((doc) => doc.slug)
    const paths = slugs.map((slug) => ({ params: { slug } }))

    return { paths, fallback: false }
}
