import { format } from 'date-fns'

import prisma from '@/lib/prisma'
import { formatter } from '@/lib/utils'

import { ProductsClient } from './components/client'
import { ProductColumn } from './components/columns'

const ProductsPage = async () => {
    const products = await prisma.product.findMany({
        include: {
            categories: true,
            brand: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    const formattedProducts: ProductColumn[] = products.map((product) => ({
        id: product.id,
        title: product.title,
        price: formatter.format(product.price),
        category: product.categories[0].title,
        createdAt: format(product.createdAt, 'MMMM do, yyyy'),
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem] pt-6">
                <ProductsClient data={formattedProducts} />
            </div>
        </div>
    )
}

export default ProductsPage
