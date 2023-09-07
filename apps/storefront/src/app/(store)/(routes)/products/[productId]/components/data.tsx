import { Separator } from '@/components/native/separator'
import { Badge } from '@/components/ui/badge'
import { useAuthenticated } from '@/hooks/useAuthentication'

import type { ProductWithAllVariants } from '@/types/prisma'
import CartButton from './cart_button'
import WishlistButton from './wishlist_button'

export const DataSection = async ({
   product,
}: {
   product: ProductWithAllVariants
}) => {
   return (
      <div className="col-span-2 w-full rounded-lg bg-neutral-100 p-6 dark:bg-neutral-900">
         <h3 className="mb-4 text-xl font-medium text-black dark:text-white">
            {product.title}
         </h3>
         <Separator />
         <div className="flex gap-2 mb-2">
            <p className="text-sm">Brand:</p>
            <Badge variant="outline">{product.brand.title}</Badge>
         </div>
         <div className="flex gap-2">
            <p className="text-sm">Categories:</p>
            {product.categories.map(({ title }, index) => (
               <Badge variant="outline" key={index}>
                  {title}
               </Badge>
            ))}
         </div>
         <Separator />
         <small className="text-black dark:text-white">
            {product.description}
         </small>
         <Separator />
         <div className="flex gap-2">
            <CartButton product={product} />
            <WishlistButton product={product} />
         </div>
      </div>
   )
}
