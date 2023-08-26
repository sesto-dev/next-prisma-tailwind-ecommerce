import { isVariableValid } from './utils'

export function writeLocalCart(items) {
    window.localStorage.setItem('Cart', JSON.stringify(items))
}

export function getLocalCart() {
    if (typeof window !== 'undefined' && window.localStorage) {
        try {
            return JSON.parse(window.localStorage.getItem('Cart'))
        } catch (error) {
            writeLocalCart([])
            return []
        }
    }
}

export function getCountInCart({ cartItems, listingId }) {
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i]?.listingId === listingId) {
            return cartItems[i]['count']
        }
    }
    return 0
}
