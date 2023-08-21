import Meta from 'components/native/Meta'
import Config from 'config/site'

import { CartGrid } from 'components/native/Cart'

export default function Cart() {
    return (
        <>
            <Meta
                title="Pasargad"
                description="Home Page"
                image={Config.ogImage}
            />
            <h3 className="mb-1 text-xl font-bold tracking-tight md:text-4xl">
                Cart
            </h3>
            <p className="mb-4 text-xs text-neutral-500 text-justify">
                Below is a list of products you have in your cart.
            </p>
            <CartGrid />
        </>
    )
}
