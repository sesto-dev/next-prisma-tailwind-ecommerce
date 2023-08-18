import { Prisma } from '@prisma/client'

export type CartItemWithVendorVariant = Prisma.CartItemGetPayload<{
    include: {
        vendorVariant: {
            include: { productVariant: { include: { product: true } } }
        }
    }
}>

export type ProductWithAllVariants = Prisma.ProductGetPayload<{
    include: {
        categories: true
        brand: true
        variants: {
            include: { vendorVariants: true }
        }
    }
}>
