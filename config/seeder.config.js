const bcrypt = require('bcryptjs')

const products = [
    {
        name: 'Elden Ring',
        image: 'https://static.techspot.com/images2/news/bigimage/2022/03/2022-03-17-image-37.jpg',
        description:
            'THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to publisherish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
        publisher: 'Bandai Namco',
        category: 'Games',
        price: 59.99,
        countInStock: 3,
        rating: 0,
        numReviews: 0,
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
        countInStock: 10,
        rating: 0,
        numReviews: 0,
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
        countInStock: 10,
        rating: 0,
        numReviews: 0,
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
        countInStock: 10,
        rating: 0,
        numReviews: 0,
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
        countInStock: 10,
        rating: 0,
        numReviews: 0,
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
        countInStock: 10,
        rating: 0,
        numReviews: 0,
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
        countInStock: 10,
        rating: 0,
        numReviews: 0,
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
        countInStock: 10,
        rating: 0,
        numReviews: 0,
    },
]

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('12345678', 10),
        referral_code: 'ABCDE-FGHIJ-KLMNO',
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('12345678', 10),
        referral_code: 'PQRST-UVWXY-ZABCD',
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: bcrypt.hashSync('12345678', 10),
        referral_code: 'EFGHI-JKLMN-OPQRS',
    },
]

module.exports = {
    products,
    users,
}
