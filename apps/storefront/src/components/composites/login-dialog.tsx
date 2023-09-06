'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LogInIcon } from 'lucide-react'

export default function LoginDialog() {
   return (
      <Link href="/login">
         <Button className="font-medium flex gap-2">
            <LogInIcon className="h-4" /> Login
         </Button>
      </Link>
   )
}
