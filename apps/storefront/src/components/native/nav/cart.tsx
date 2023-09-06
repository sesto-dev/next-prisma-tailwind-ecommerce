import { LockClosedIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

import Link from 'next/link'

export function CartNav() {
   return (
      <Link href="/cart">
         <Button size="icon" variant="outline" className="h-9">
            <LockClosedIcon />
         </Button>
      </Link>
   )
}
