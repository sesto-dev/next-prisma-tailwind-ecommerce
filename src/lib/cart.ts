export function writeLocalCart(items) {
    window.localStorage.setItem('Cart', JSON.stringify(items))
}

export function getLocalCart() {
    if (typeof window !== 'undefined' && window.localStorage) {
        console.log({
            cartReadLocal: JSON.parse(window.localStorage.getItem('Cart')),
        })
        return JSON.parse(window.localStorage.getItem('Cart'))
    }
}
