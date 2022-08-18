const bcrypt = require('bcryptjs')

const products = [
    {
        name: 'Elden Ring Definitive Edition',
        image: 'https://image.api.playstation.com/vulcan/img/rnd/202201/1918/0P25Aw0mnLS1AwPYEUb6kIYC.png',
        description:
            'THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to publisherish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
        publisher: 'Bandai Namco',
        category: 'Games',
        price: 59.99,
        stock: 3,
    },
    {
        name: 'Stray',
        image: 'https://gameluster.com/wp-content/uploads/2022/07/Stray-Cover-Image-scaled.jpg',
        description:
            'Lost, alone and separated from family, a stray cat must untangle an ancient mystery to escape a long-forgotten cybercity and find their way home.',
        publisher: 'Annapurna Interactive',
        developer: 'BlueTwelve Studio',
        category: 'Games',
        price: 29.99,
        stock: 10,
    },
    {
        name: 'The Last of Us Part II',
        image: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2618/w48z6bzefZPrRcJHc7L8SO66.png',
        description:
            'Lost, alone and separated from family, a stray cat must untangle an ancient mystery to escape a long-forgotten cybercity and find their way home.',
        publisher: 'Annapurna Interactive',
        developer: 'BlueTwelve Studio',
        category: 'Games',
        price: 29.99,
        stock: 10,
    },
    {
        name: 'Hades',
        image: 'https://gamerofpassion.com/wp-content/uploads/2020/10/Hades-Cover-Picture-alternative.jpg',
        description:
            'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.',
        publisher: 'Annapurna Interactive',
        developer: 'BlueTwelve Studio',
        category: 'Games',
        price: 29.99,
        stock: 10,
    },
    {
        name: 'Dishonored',
        image: 'https://e.snmc.io/lk/fv/x/d7668e54654c0d238775ac227b26b76f/5285613',
        description:
            'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.',
        publisher: 'Annapurna Interactive',
        developer: 'BlueTwelve Studio',
        category: 'Games',
        price: 29.99,
        stock: 10,
    },
    {
        name: 'Metro Last Light',
        image: 'http://s01.riotpixels.net/data/9d/67/9d672c2a-0f42-4b21-93d3-fc5576b0c29d.jpg/cover.metro-last-light.1024x1024.2014-04-24.148.jpg',
        description:
            'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.',
        publisher: 'Annapurna Interactive',
        developer: 'BlueTwelve Studio',
        category: 'Games',
        price: 29.99,
        stock: 10,
    },
    {
        name: 'The Last of Us Remastered',
        image: 'http://www.brashgames.co.uk/wp-content/uploads/2014/08/The-Last-of-Us-Remastered.jpg',
        description:
            'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.',
        publisher: 'Annapurna Interactive',
        developer: 'BlueTwelve Studio',
        category: 'Games',
        price: 29.99,
        stock: 10,
    },
    {
        name: 'Halo Infinite',
        image: 'https://assets-prd.ignimgs.com/2020/07/24/halo-infinite-button-2020-1595617876660.jpg',
        description:
            'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.',
        publisher: 'Microsoft Studios',
        developer: 'BlueTwelve Studio',
        category: 'Games',
        price: 29.99,
        stock: 10,
    },
    {
        name: 'GTFO',
        image: 'https://images10.newegg.com/BizIntell/item/Digital%20Games/Downloadable%20Software%20-%20Games/32-968-023/ch1.jpg',
        description:
            'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.',
        publisher: 'Microsoft Studios',
        developer: 'BlueTwelve Studio',
        category: 'Games',
        price: 29.99,
        stock: 10,
    },
    {
        name: 'Ori and the Blind Forest Definitive Edition',
        image: 'https://f4.bcbits.com/img/a1402023301_10.jpg',
        description:
            'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.',
        publisher: 'Microsoft Studios',
        developer: 'BlueTwelve Studio',
        category: 'Games',
        price: 29.99,
        stock: 10,
    },
    {
        name: 'Call of Duty Modern Warfare II',
        image: 'https://www.global-esports.news/wp-content/uploads/2022/05/CoD-Modern-Warfare-2-2022-2.jpg',
        description:
            'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.',
        publisher: 'Annapurna Interactive',
        developer: 'BlueTwelve Studio',
        category: 'Games',
        price: 29.99,
        stock: 10,
    },
    {
        name: 'Dishonored 2',
        image: 'https://image.api.playstation.com/vulcan/ap/rnd/202009/2918/1UfdyQmXpeSdoFE104sNkLd4.png',
        description:
            'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.',
        publisher: 'Annapurna Interactive',
        developer: 'BlueTwelve Studio',
        category: 'Games',
        price: 29.99,
        stock: 10,
    },
    {
        name: 'Rainbow Six: Siege',
        image: 'https://cdn1.epicgames.com/carnation/offer/r6s-y6-epic-std-store-portrait-1200x1600-1200x1600-8ecd88137e14-1200x1600-05e68a0aed3dc068b9b4186997b97317.jpeg',
        description:
            'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.',
        publisher: 'Annapurna Interactive',
        developer: 'BlueTwelve Studio',
        category: 'Games',
        price: 29.99,
        stock: 10,
    },
    {
        name: 'Dishonored The Death of The Outsider',
        image: 'https://image.api.playstation.com/vulcan/ap/rnd/202009/2920/mUjmWOusNIcAENORucmAnj1k.png',
        description:
            'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.',
        publisher: 'Annapurna Interactive',
        developer: 'BlueTwelve Studio',
        category: 'Games',
        price: 29.99,
        stock: 10,
    },
    {
        name: 'God of War Ragnarok',
        image: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png',
        description:
            'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.',
        publisher: 'Annapurna Interactive',
        developer: 'BlueTwelve Studio',
        category: 'Games',
        price: 69.99,
        stock: 10,
    },
    {
        name: 'Final Fantasy VII Remake',
        image: 'https://image.api.playstation.com/vulcan/img/cfn/113075PxnarzRek4cRpjrRWSpLfrcBd23B5e_Yj2azms6nWYKmySv4h3a22G5_R1CM4BQUmSRD6oOArDROKv041NUkgun78-.png',
        description:
            'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.',
        publisher: 'Annapurna Interactive',
        developer: 'BlueTwelve Studio',
        category: 'Games',
        price: 29.99,
        stock: 10,
    },
    {
        name: 'Spider-Man',
        image: 'https://image.api.playstation.com/vulcan/ap/rnd/202011/0402/C784xeOFo2wViCf4m5bxgoeH.png',
        description:
            'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.',
        publisher: 'Annapurna Interactive',
        developer: 'BlueTwelve Studio',
        category: 'Games',
        price: 29.99,
        stock: 10,
    },
    {
        name: 'Elden Ring',
        image: 'https://image.api.playstation.com/vulcan/ap/rnd/202108/0410/0Jz6uJLxOK7JOMMfcfHFBi1D.png',
        description:
            'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.',
        publisher: 'Annapurna Interactive',
        developer: 'BlueTwelve Studio',
        category: 'Games',
        price: 29.99,
        stock: 10,
    },
    {
        name: 'Spider-Man Miles Morales',
        image: 'https://image.api.playstation.com/vulcan/ap/rnd/202008/1020/T45iRN1bhiWcJUzST6UFGBvO.png',
        description:
            'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.',
        publisher: 'Annapurna Interactive',
        developer: 'BlueTwelve Studio',
        category: 'Games',
        price: 29.99,
        stock: 10,
    },
    {
        name: 'God of War',
        image: 'https://image.api.playstation.com/cdn/UP9000/CUSA07408_00/9zb3GbJG9h7AbP94R56l7DfqEpoBzljO.png',
        description:
            'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre.',
        publisher: 'Annapurna Interactive',
        developer: 'BlueTwelve Studio',
        category: 'Games',
        price: 29.99,
        stock: 10,
    },
]

const users = [
    {
        name: 'Admin User',
        email: 'admin@test.com',
        password: bcrypt.hashSync('12345678', 10),
        referral_code: 'ABCDE-FGHIJ-KLMNO',
        isAdmin: true,
        isEmailVerified: true,
    },
    {
        name: 'John Doe',
        email: 'test@test.com',
        password: bcrypt.hashSync('12345678', 10),
        referral_code: 'PQRST-UVWXY-ZABCD',
        isEmailVerified: true,
    },
    {
        name: 'Jane Doe',
        email: 'test2@test.com',
        password: bcrypt.hashSync('12345678', 10),
        referral_code: 'EFGHI-JKLMN-OPQRS',
        isEmailVerified: true,
    },
]

module.exports = {
    products,
    users,
}
