import { ShoppingBasketIcon as Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'

import Link from 'next/link'

export function CartNav() {
   return (
      <Link href="/cart">
         <Button size="icon" variant="outline" className="h-9">
            <Icon className="h-4" />
         </Button>
      </Link>
   )
}
