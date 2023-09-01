import { Prisma } from '@prisma/client'

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
    include: {
        product: true
    }
}>

export type ProductWithAllVariants = Prisma.ProductGetPayload<{
    include: {
        categories: true
        brand: true
    }
}>
