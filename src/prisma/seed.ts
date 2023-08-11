import prisma from '../lib/prisma'
import { users, blogPosts, discounts, products, docs } from './seed.data'
import { slugify } from '../lib/slug'

async function main() {
    for (let user of users) {
        const { email, referralCode, isAdmin, discordId } = user

        await prisma.user.create({
            data: {
                email,
                referralCode,
                discordId: discordId ? discordId : null,
                isAdmin,
            },
        })
    }

    console.log('Created Users...')

    const { id: authorId } = await prisma.user.findFirst()

    for (let blogPost of blogPosts) {
        const { title, description, image, categories, content } = blogPost

        await prisma.blogPost.create({
            data: {
                authorId,
                title,
                description,
                slug: slugify(title),
                image,
                content,
                categories,
            },
        })
    }

    console.log('Created Blog Posts...')

    for (let doc of docs) {
        const { title, index, category, categoryIndex, content } = doc

        await prisma.documentPage.create({
            data: {
                authorId,
                title,
                index,
                category,
                categoryIndex,
                slug: slugify(title),
                content,
            },
        })
    }

    console.log('Created Documentation Pages...')
}

try {
    main()
    prisma.$disconnect()
} catch (error) {
    console.log(error)
    process.exit(1)
}
