'use client'

import { Button } from '@/components/ui/button'
import { LogInIcon } from 'lucide-react'
import Link from 'next/link'

export default function LoginDialog() {
   return (
      <Link href="/login">
         <Button className="font-medium flex gap-2">
            <LogInIcon className="h-4" />
            <p>Login</p>
         </Button>
      </Link>
   )
}
