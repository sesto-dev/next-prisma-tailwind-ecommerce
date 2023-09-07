import { cn } from '@/lib/utils'

export function Separator({ className }: { className?: string }) {
   return (
      <hr
         className={cn(
            'h-px my-4 bg-neutral-200 dark:bg-neutral-800 border-0',
            className
         )}
      />
   )
}
