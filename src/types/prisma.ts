import { Prisma } from '@prisma/client'

export type CartItemWithListing = Prisma.CartItemGetPayload<{
    include: {
        listing: {
            include: { subproduct: { include: { product: true } } }
        }
    }
}>

export type ProductWithAllVariants = Prisma.ProductGetPayload<{
    include: {
        categories: true
        brand: true
        subproducts: {
            include: { listings: true }
        }
    }
}>
