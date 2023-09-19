'use client'

import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

export function ThemeToggle() {
   const { resolvedTheme, setTheme } = useTheme()

   return (
      <Button
         variant="outline"
         size="icon"
         onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
         {resolvedTheme === 'dark' ? (
            <SunIcon className="h-4" />
         ) : (
            <MoonIcon className="h-4" />
         )}
      </Button>
   )
}
