import { faker } from '@faker-js/faker'

function getRandomIntInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
}

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const categories = [
        'Electronics',
        'Clothing',
        'Books',
        'Home & Kitchen',
        'Toys',
    ]

    for (const categoryName of categories) {
        await prisma.category.create({
            data: {
                name: categoryName,
            },
        })
    }

    for (let i = 0; i < 10; i++) {
        const product = await prisma.product.create({
            data: {
                title: faker.commerce.product(),
                description: faker.commerce.productDescription(),
                images: [faker.image.url(), faker.image.url()],
                categories: {
                    connect: {
                        name: categories[
                            getRandomIntInRange(0, categories.length - 1)
                        ],
                    },
                },
                variants: {
                    create: {
                        title: faker.commerce.productName(),
                        description: faker.commerce.productDescription(),
                        price: getRandomIntInRange(0, 100),
                        images: [faker.image.url(), faker.image.url()],
                        stock: getRandomIntInRange(2, 10),
                        reserved: getRandomIntInRange(0, 1),
                    },
                },
            },
            include: {
                categories: true,
                variants: true,
            },
        })

        console.log({ product })
    }

    console.log('Created Products...')

    for (let i = 0; i < 4; i++) {
        await prisma.user.create({
            data: {
                email: faker.internet.email(),
                name: faker.person.fullName(),
            },
        })
    }

    console.log('Created Users...')
}

try {
    main()
    prisma.$disconnect()
} catch (error) {
    console.log(error)
    process.exit(1)
}
