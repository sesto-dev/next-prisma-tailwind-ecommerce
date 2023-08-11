import bcrypt from 'bcryptjs'

export const users = [
    {
        name: 'Admin User',
        email: 'accretence@gmail.com',
        referralCode: 'ABCDE-FGHIJ-KLMNO',
        discordId: '586796765651533835',
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'unbuildables@gmail.com',
        referralCode: 'PQRST-UVWXY-ZABCD',
        isAdmin: true,
    },
    {
        name: 'Jane Doe',
        email: 'iqoror@gmail.com',
        referralCode: 'EFGHI-JKLMN-OPQRS',
        isAdmin: true,
    },
]

export const blogPosts = [
    {
        title: 'How can AI be used to generate revenue in the cryptocurrency space',
        description: 'In this article, young and...',
        image: 'https://cdn.dribbble.com/users/1358460/screenshots/14313986/media/cf14d4ef432f3a05078df0ac1d1e7387.jpg',
        categories: ['technology', 'architecture'],
        content:
            "In this blog post we'll go over how AI can be used to generate revenue in the cryptocurrency space. For example in spaces like DAOs ( Decentralized autonomous organizations ). Decentralized autonomous organizations, or DAOs, are using AI to manage and automate their processes in order to save on costs. This increased efficiency can lead to more revenue for the organization. <MDXImage alt='Artificial Intelligence' src='https://cdn.dribbble.com/users/1358460/screenshots/14313986/media/cf14d4ef432f3a05078df0ac1d1e7387.jpg' /> To provide a clear real-world example of how AI tools like OpenAI's GPT-3 or DALL·E 2 can be used in the DAO ( Decentralized Autonomous Organizations ) space, let's take a look at the example of a digital marketing campaign: In the past, a typical digital marketing campaign might have required hiring an external agency or consultants to manage various aspects of the project including content creation, graphic design, website development, and social media outreach. With AI tools like GPT-3 and DALL·E 2 now available, however, it's possible for DAOs to automate many of these tasks internally without needing to hire outside help. This can lead to significant cost savings for the organization while still maintaining high-quality standards. Additionally, by using AI-powered tools like GPT-3 or DALL·E 2 , DAOs can scale their operations much more easily and reach a larger audience with less effort than traditional methods require.",
    },
    {
        title: 'How AI-Generated Content Will Impact the Future of Architectural Engineering',
        description: 'AI-powered software Midjourney...',
        image: 'https://cdn.80.lv/api/upload/content/ef/62ab0fc526d9a.jpeg',
        categories: ['technology', 'design', 'academic'],
        content:
            "With the increased use of artificial intelligence (AI) in content generation, it is important to consider how this technology will impact the future of architectural engineering. For example, OpenAI's GPT3 or DALL·E 2 can be used to generate realistic 3D models of buildings or structures. This could potentially reduce the need for architects to create these models by hand. Additionally, AI-generated content could be used to create realistic simulations of proposed buildings or structures, and to render them in very realistic manners. <MDXImage alt='AI Generated Content' src='vhttps://cdn.80.lv/api/upload/content/ef/62ab0fc526d9a.jpeg' /> This could help architects to better assess the feasibility of a project before construction begins. It is important to note that AI-generated content is not perfect and there may be some errors. However, as the technology improves, it is likely that these error rates will decrease. Additionally, AI-generated content can be customized to meet the specific needs of a project. For example, if an architect wants to see how a building will look in different lighting conditions, they can use an AI program to generate multiple versions of the same model. They can change the design of the model to make it look more original. Overall, AI-generated content has the potential to greatly impact the field of architectural engineering. As technology improves, it is likely that more and more architects will begin to use AI-generated content in their work. In conclusion, AI-generated content has the potential to revolutionize architectural engineering. It can help reduce the workload of architects and provide them with more accurate information about proposed projects.",
    },
    {
        title: 'Sci-Fi Environmental Concept Art with Midjourney',
        description:
            'Examples AI Generated Images can be used to enhance concept design.',
        image: 'https://cdnb.artstation.com/p/assets/images/images/050/712/571/large/gleb-alexandrov-midjourney-aiart-gleb-alexandrov-10.jpg',
        categories: ['technology', 'design', 'game-design'],
        content:
            "In this blog post we'll go over how AI can be used to generate revenue in the cryptocurrency space. For example in spaces like DAOs ( Decentralized autonomous organizations ). Decentralized autonomous organizations, or DAOs, are using AI to manage and automate their processes in order to save on costs. This increased efficiency can lead to more revenue for the organization. <MDXImage alt='Artificial Intelligence' src='https://cdn.dribbble.com/users/1358460/screenshots/14313986/media/cf14d4ef432f3a05078df0ac1d1e7387.jpg' /> To provide a clear real-world example of how AI tools like OpenAI's GPT-3 or DALL·E 2 can be used in the DAO ( Decentralized Autonomous Organizations ) space, let's take a look at the example of a digital marketing campaign: In the past, a typical digital marketing campaign might have required hiring an external agency or consultants to manage various aspects of the project including content creation, graphic design, website development, and social media outreach. With AI tools like GPT-3 and DALL·E 2 now available, however, it's possible for DAOs to automate many of these tasks internally without needing to hire outside help. This can lead to significant cost savings for the organization while still maintaining high-quality standards. Additionally, by using AI-powered tools like GPT-3 or DALL·E 2 , DAOs can scale their operations much more easily and reach a larger audience with less effort than traditional methods require.",
    },
]

export const discounts = [
    {
        code: 'OFF',
        maxUses: 10,
        burntUses: 9,
        maxAmount: 100000,
        percentage: 15,
    },
    {
        code: 'CHRISTMAS',
        maxUses: 10,
        burntUses: 7,
        maxAmount: 200000,
        percentage: 10,
    },
]

export const products = [
    {
        id: 1,
        title: 'Elden Ring Definitive Edition',
        description:
            'THE NEW FANTASY ACTION-adventure RPG. Rise, Tarnished, and be guided by grace to publisherish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Bandai Namco',
        category: 'games',
        images: [
            'https://image.api.playstation.com/vulcan/img/rnd/202201/1918/0P25Aw0mnLS1AwPYEUb6kIYC.png',
        ],
    },
    {
        id: 2,
        title: 'Stray',
        description:
            'Lost, alone and separated from family, a stray cat must untangle an ancient mystery to escape a long-forgotten cybercity and find their way home.',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Bandai Namco',
        category: 'games',
        images: [
            'https://gameluster.com/wp-content/uploads/2022/07/Stray-Cover-Image-scaled.jpg',
        ],
    },
    {
        id: 3,
        title: 'Elden Ring Definitive Edition',
        description:
            'THE NEW FANTASY ACTION-adventure RPG. Rise, Tarnished, and be guided by grace to publisherish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Bandai Namco',
        category: 'games',
        images: [
            'https://image.api.playstation.com/vulcan/img/rnd/202201/1918/0P25Aw0mnLS1AwPYEUb6kIYC.png',
        ],
    },
    {
        id: 4,
        title: 'Stray',
        description:
            'Lost, alone and separated from family, a stray cat must untangle an ancient mystery to escape a long-forgotten cybercity and find their way home.',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Bandai Namco',
        category: 'games',
        images: [
            'https://gameluster.com/wp-content/uploads/2022/07/Stray-Cover-Image-scaled.jpg',
        ],
    },
    {
        id: 5,
        title: 'Elden Ring Definitive Edition',
        description:
            'THE NEW FANTASY ACTION-adventure RPG. Rise, Tarnished, and be guided by grace to publisherish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Bandai Namco',
        category: 'games',
        images: [
            'https://image.api.playstation.com/vulcan/img/rnd/202201/1918/0P25Aw0mnLS1AwPYEUb6kIYC.png',
        ],
    },
    {
        id: 6,
        title: 'Stray',
        description:
            'Lost, alone and separated from family, a stray cat must untangle an ancient mystery to escape a long-forgotten cybercity and find their way home.',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Bandai Namco',
        category: 'games',
        images: [
            'https://gameluster.com/wp-content/uploads/2022/07/Stray-Cover-Image-scaled.jpg',
        ],
    },
    {
        id: 7,
        title: 'Elden Ring Definitive Edition',
        description:
            'THE NEW FANTASY ACTION-adventure RPG. Rise, Tarnished, and be guided by grace to publisherish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Bandai Namco',
        category: 'games',
        images: [
            'https://image.api.playstation.com/vulcan/img/rnd/202201/1918/0P25Aw0mnLS1AwPYEUb6kIYC.png',
        ],
    },
    {
        id: 8,
        title: 'Stray',
        description:
            'Lost, alone and separated from family, a stray cat must untangle an ancient mystery to escape a long-forgotten cybercity and find their way home.',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: 'Bandai Namco',
        category: 'games',
        images: [
            'https://gameluster.com/wp-content/uploads/2022/07/Stray-Cover-Image-scaled.jpg',
        ],
    },
]

export const docs = [
    {
        title: 'Welcome',
        index: 0,
        category: 'Getting Started',
        categoryIndex: 0,
        content:
            '<Header title="Welcome!"/> Some **mdx** text, with a component',
    },
    {
        title: 'How to create an account?',
        index: 1,
        category: 'Getting Started',
        categoryIndex: 0,
        content:
            '<Header title="Welcome!"/> Some **mdx** text, with a component',
    },
    {
        title: 'What is a wallet?',
        index: 2,
        category: 'Getting Started',
        categoryIndex: 0,
        content:
            '<Header title="Welcome!"/> Some **mdx** text, with a component',
    },
    {
        title: 'What is $COIN?',
        index: 0,
        category: '$COIN',
        categoryIndex: 1,
        content:
            '<Header title="Welcome!"/> Some **mdx** text, with a component',
    },
    {
        title: 'What is $COIN used for?',
        index: 1,
        category: '$COIN',
        categoryIndex: 1,
        content:
            '<Header title="Welcome!"/> Some **mdx** text, with a component',
    },
    {
        title: 'Buying and selling $COIN?',
        index: 2,
        category: '$COIN',
        categoryIndex: 1,
        content:
            '<Header title="Welcome!"/> Some **mdx** text, with a component',
    },
]
