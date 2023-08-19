import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

function getRandomFloat(min, max, precision) {
    if (min >= max || precision < 0) {
        throw new Error(
            'Invalid input: min should be less than max and precision should be non-negative.'
        )
    }

    const range = max - min
    const randomValue = Math.random() * range + min

    return parseFloat(randomValue.toFixed(precision))
}

function getRandomIntInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
}

const prisma = new PrismaClient()

async function main() {
    let createdProducts = []

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
            brand: 'BKID',
            categories: ['Accessories'],
            tags: ['pipe', 'brushed', 'wood'],
            price: 69.99,
            images: ['https://lemanoosh.com/app/uploads/bkid-pipe-01.jpg'],
        },
        {
            title: 'Bang and Olufsen Speaker',
            brand: 'Bang and Olufsen',
            categories: ['Electronics'],
            tags: ['speaker', 'brushed', 'mechanical'],
            price: 9.99,
            images: [
                'https://lemanoosh.com/app/uploads/BO_2019_A1_Natural_Brushed_05-768x1156.jpg',
            ],
        },
        {
            title: 'Audio Technica Turn-table',
            brand: 'Audio Technica',

            categories: ['Electronics'],
            tags: ['music', 'brushed', 'mechanical'],
            price: 12.99,
            images: [
                'https://lemanoosh.com/app/uploads/gerhardt-kellermann-zeitmagazin-10.jpg',
            ],
        },
        {
            title: 'Monocle Sneakers',
            brand: '',

            categories: ['Electronics'],
            tags: ['shoes', 'brushed', 'mechanical'],
            price: 1.99,
            images: [
                'https://lemanoosh.com/app/uploads/plp-women-footwear-sneakers-04-07-768x1246.jpg',
            ],
        },
        {
            title: 'Zone2 Mens Watch',
            brand: '',

            categories: ['Electronics'],
            tags: ['shoes', 'brushed', 'mechanical'],
            price: 129.99,
            images: ['https://lemanoosh.com/app/uploads/0055-768x1023.jpg'],
        },
        {
            title: 'Carl Hauser L1 Phone',
            brand: 'Carl Hauser',
            categories: ['Electronics'],
            tags: ['shoes', 'brushed', 'mechanical'],
            price: 5.99,
            images: [
                'https://lemanoosh.com/app/uploads/carl-hauser-0121-768x993.jpg',
            ],
        },
        {
            title: 'Carl Hauser Scanner',
            brand: 'Carl Hauser',
            categories: ['Electronics'],
            tags: ['shoes', 'brushed', 'mechanical'],
            price: 22.99,
            images: [
                'https://lemanoosh.com/app/uploads/carl-hauser-020-768x973.jpg',
            ],
        },
        {
            title: 'Bright Neon Helmet',
            brand: 'Bright',
            categories: ['Electronics'],
            tags: ['shoes', 'brushed', 'mechanical'],
            price: 17.99,
            images: [
                'https://lemanoosh.com/app/uploads/Orange_white-_Helmet_01.jpg',
            ],
        },
    ]

    const blogPosts = [
        {
            slug: 'how-can-ai',
            title: 'How can AI be used to generate revenue in the cryptocurrency space',
            description: 'In this article, young and...',
            image: 'https://media.product.which.co.uk/prod/images/original/3cc919e52b08-apple-wwcd23-vision-pro-lifestyle-working-230605.jpg',
            categories: ['technology', 'architecture'],
            content:
                "In this blog post we'll go over how AI can be used to generate revenue in the cryptocurrency space. For example in spaces like DAOs ( Decentralized autonomous organizations ). Decentralized autonomous organizations, or DAOs, are using AI to manage and automate their processes in order to save on costs. This increased efficiency can lead to more revenue for the organization. <MDXImage alt='Artificial Intelligence' src='https://cdn.dribbble.com/users/1358460/screenshots/14313986/media/cf14d4ef432f3a05078df0ac1d1e7387.jpg' /> To provide a clear real-world example of how AI tools like OpenAI's GPT-3 or DALL·E 2 can be used in the DAO ( Decentralized Autonomous Organizations ) space, let's take a look at the example of a digital marketing campaign: In the past, a typical digital marketing campaign might have required hiring an external agency or consultants to manage various aspects of the project including content creation, graphic design, website development, and social media outreach. With AI tools like GPT-3 and DALL·E 2 now available, however, it's possible for DAOs to automate many of these tasks internally without needing to hire outside help. This can lead to significant cost savings for the organization while still maintaining high-quality standards. Additionally, by using AI-powered tools like GPT-3 or DALL·E 2 , DAOs can scale their operations much more easily and reach a larger audience with less effort than traditional methods require.",
        },
        {
            slug: 'how-ai-generated',
            title: 'How AI-Generated Content Will Impact the Future of Architectural Engineering',
            description: 'AI-powered software Midjourney...',
            image: 'https://pbs.twimg.com/media/Fx5CjjBWcAEEte0.jpg',
            categories: ['technology', 'design', 'academic'],
            content:
                "With the increased use of artificial intelligence (AI) in content generation, it is important to consider how this technology will impact the future of architectural engineering. For example, OpenAI's GPT3 or DALL·E 2 can be used to generate realistic 3D models of buildings or structures. This could potentially reduce the need for architects to create these models by hand. Additionally, AI-generated content could be used to create realistic simulations of proposed buildings or structures, and to render them in very realistic manners. <MDXImage alt='AI Generated Content' src='vhttps://cdn.80.lv/api/upload/content/ef/62ab0fc526d9a.jpeg' /> This could help architects to better assess the feasibility of a project before construction begins. It is important to note that AI-generated content is not perfect and there may be some errors. However, as the technology improves, it is likely that these error rates will decrease. Additionally, AI-generated content can be customized to meet the specific needs of a project. For example, if an architect wants to see how a building will look in different lighting conditions, they can use an AI program to generate multiple versions of the same model. They can change the design of the model to make it look more original. Overall, AI-generated content has the potential to greatly impact the field of architectural engineering. As technology improves, it is likely that more and more architects will begin to use AI-generated content in their work. In conclusion, AI-generated content has the potential to revolutionize architectural engineering. It can help reduce the workload of architects and provide them with more accurate information about proposed projects.",
        },
        {
            slug: 'sci-fi-environmental',
            title: 'Sci-Fi Environmental Concept Art with Midjourney',
            description:
                'Examples AI Generated Images can be used to enhance concept design.',
            image: 'https://intl.nothing.tech/cdn/shop/files/PC2_2160x.jpg?v=1680179311',
            categories: ['technology', 'design', 'game-design'],
            content:
                "In this blog post we'll go over how AI can be used to generate revenue in the cryptocurrency space. For example in spaces like DAOs ( Decentralized autonomous organizations ). Decentralized autonomous organizations, or DAOs, are using AI to manage and automate their processes in order to save on costs. This increased efficiency can lead to more revenue for the organization. <MDXImage alt='Artificial Intelligence' src='https://cdn.dribbble.com/users/1358460/screenshots/14313986/media/cf14d4ef432f3a05078df0ac1d1e7387.jpg' /> To provide a clear real-world example of how AI tools like OpenAI's GPT-3 or DALL·E 2 can be used in the DAO ( Decentralized Autonomous Organizations ) space, let's take a look at the example of a digital marketing campaign: In the past, a typical digital marketing campaign might have required hiring an external agency or consultants to manage various aspects of the project including content creation, graphic design, website development, and social media outreach. With AI tools like GPT-3 and DALL·E 2 now available, however, it's possible for DAOs to automate many of these tasks internally without needing to hire outside help. This can lead to significant cost savings for the organization while still maintaining high-quality standards. Additionally, by using AI-powered tools like GPT-3 or DALL·E 2 , DAOs can scale their operations much more easily and reach a larger audience with less effort than traditional methods require.",
        },
    ]

    for (const category of categories) {
        await prisma.category.create({
            data: {
                title: category,
            },
        })
    }

    console.log('Created Categories...')

    for (const product of products) {
        const createdProduct = await prisma.product.create({
            data: {
                title: product.title,
                brand: {
                    connectOrCreate: {
                        where: {
                            title: product.brand,
                        },
                        create: {
                            title: product.brand,
                            description: faker.commerce.productDescription(),
                            logo: 'https://cdn.logojoy.com/wp-content/uploads/20221122125557/morridge-coffee-vintage-logo-600x392.png',
                        },
                    },
                },
                description: faker.commerce.productDescription(),
                images: product.images,
                tags: product.tags,
                categories: {
                    connect: {
                        title: product.categories[0],
                    },
                },
                variants: {
                    create: {
                        title: product.title,
                        description: faker.commerce.productDescription(),
                        images: product.images,
                    },
                },
            },
            include: {
                categories: true,
                variants: true,
            },
        })

        createdProducts.push(createdProduct)
    }

    console.log('Created Products...')

    await prisma.user.create({
        data: {
            email: 'accretence@gmail.com',
            name: 'Amirhossein Mohammadi',
            isVendor: true,
            cart: {
                create: {},
            },
            vendor: {
                create: {
                    title: 'Pasargad Vendor',
                    description: 'We are a vendor.',
                    logo: 'https://cdn.logojoy.com/wp-content/uploads/20221122125557/morridge-coffee-vintage-logo-600x392.png',
                    vendorVariants: {
                        create: {
                            price: getRandomFloat(4, 100, 2),
                            stock: getRandomIntInRange(1, 20),
                            productVariantId:
                                createdProducts[0]['variants'][0]['id'],
                        },
                    },
                },
            },
            blogPost: {
                create: blogPosts,
            },
            wishlist: {
                create: {
                    items: {
                        connect: {
                            id: createdProducts[0]['id'],
                        },
                    },
                },
            },
        },
    })

    console.log('Created Users...')
}

try {
    main()
    prisma.$disconnect()
} catch (error) {
    console.log(error)
    process.exit(1)
}
