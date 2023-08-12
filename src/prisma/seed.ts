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
        'Jewelery',
        'Accessories',
    ]

    const products = [
        {
            title: 'BKID Pipe',
            categories: ['Accessories'],
            tags: ['pipe', 'brushed', 'wood'],
            images: ['https://lemanoosh.com/app/uploads/bkid-pipe-01.jpg'],
        },
        {
            title: 'Bang and Olufsen Speaker',
            categories: ['Electronics'],
            tags: ['speaker', 'brushed', 'mechanical'],
            images: [
                'https://lemanoosh.com/app/uploads/BO_2019_A1_Natural_Brushed_05-768x1156.jpg',
            ],
        },
        {
            title: 'Audio Technical Turn-table',
            categories: ['Electronics'],
            tags: ['music', 'brushed', 'mechanical'],
            images: [
                'https://lemanoosh.com/app/uploads/gerhardt-kellermann-zeitmagazin-10.jpg',
            ],
        },
        {
            title: 'Monocle Sneakers',
            categories: ['Electronics'],
            tags: ['shoes', 'brushed', 'mechanical'],
            images: [
                'https://lemanoosh.com/app/uploads/plp-women-footwear-sneakers-04-07-768x1246.jpg',
            ],
        },
        {
            title: 'Zone2 Mens Watch',
            categories: ['Electronics'],
            tags: ['shoes', 'brushed', 'mechanical'],
            images: ['https://lemanoosh.com/app/uploads/0055-768x1023.jpg'],
        },
        {
            title: 'Carl Hauser L1 Phone',
            categories: ['Electronics'],
            tags: ['shoes', 'brushed', 'mechanical'],
            images: [
                'https://lemanoosh.com/app/uploads/carl-hauser-0121-768x993.jpg',
            ],
        },
        {
            title: 'Carl Hauser Scanner',
            categories: ['Electronics'],
            tags: ['shoes', 'brushed', 'mechanical'],
            images: [
                'https://lemanoosh.com/app/uploads/carl-hauser-020-768x973.jpg',
            ],
        },
        {
            title: 'Bright Neon Helmet',
            categories: ['Electronics'],
            tags: ['shoes', 'brushed', 'mechanical'],
            images: [
                'https://lemanoosh.com/app/uploads/Orange_white-_Helmet_01.jpg',
            ],
        },
    ]

    for (const category of categories) {
        await prisma.category.create({
            data: {
                name: category,
            },
        })
    }

    for (const product of products) {
        await prisma.product.create({
            data: {
                title: product.title,
                description: faker.commerce.productDescription(),
                images: product.images,
                tags: product.tags,
                categories: {
                    connect: {
                        name: product.categories[0],
                    },
                },
                variants: {
                    create: {
                        title: product.title,
                        description: faker.commerce.productDescription(),
                        price: getRandomIntInRange(0, 100),
                        images: product.images,
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
