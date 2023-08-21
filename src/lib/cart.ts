export function writeLocalCart(items) {
    window.localStorage.setItem('Cart', JSON.stringify(items))
}

export function getLocalCart() {
    if (typeof window !== 'undefined' && window.localStorage) {
        return JSON.parse(window.localStorage.getItem('Cart'))
    }
}

export function getCountInCart({ cartItems, vendorVariantId }) {
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i]?.vendorVariantId === vendorVariantId) {
            return cartItems[i]['count']
        }
    }
    return 0
}
