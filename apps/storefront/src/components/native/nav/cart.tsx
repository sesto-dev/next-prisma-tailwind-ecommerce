import { ShoppingBasketIcon as Icon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CartNav() {
   return (
      <Link href="/cart">
         <Button size="icon" variant="outline" className="h-9">
            <Icon className="h-4" />
         </Button>
      </Link>
   )
}
