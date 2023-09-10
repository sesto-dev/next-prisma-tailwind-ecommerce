import Link from 'next/link'
import { getLinkStyles } from '@/lib/styles'

import config from '@/config/site'
import { Separator } from '@/components/native/separator'
import { GithubIcon, InstagramIcon, TwitterIcon } from 'lucide-react'

export default function Footer() {
   return (
      <footer>
         <Separator className="my-12" />
         <div className="md:flex md:justify-between px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]">
            <div className="mb-6 hidden md:mb-0 md:block">
               <span className="flex flex-col">
                  <h2 className="whitespace-nowrap text-sm font-semibold uppercase">
                     {config.name}
                  </h2>
                  <span className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                     © {new Date().getFullYear()} {config.name}™ . All Rights
                     Reserved.
                  </span>
               </span>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
               <div>
                  <h2 className="mb-3 text-sm font-semibold uppercase text-neutral-900 dark:text-white">
                     Resources
                  </h2>
                  <ul className="text-muted-foreground text-sm block space-y-2">
                     <li>
                        <Link href="/blog" className={getLinkStyles()}>
                           Blog
                        </Link>
                     </li>
                     <li>
                        <Link href="/about" className={getLinkStyles()}>
                           About
                        </Link>
                     </li>
                     <li>
                        <Link href="/contact" className={getLinkStyles()}>
                           Contact
                        </Link>
                     </li>
                  </ul>
               </div>
               <div>
                  <h2 className="mb-3 text-sm font-semibold uppercase text-neutral-900 dark:text-white">
                     Follow us
                  </h2>
                  <ul className="text-muted-foreground text-sm block space-y-2">
                     <li>
                        <a
                           href="https://instagram.com/accretence"
                           target="_blank"
                           rel="noreferrer"
                           className={getLinkStyles()}
                        >
                           Instagram
                        </a>
                     </li>
                     <li>
                        <a
                           href="https://tiktok.com"
                           target="_blank"
                           rel="noreferrer"
                           className={getLinkStyles()}
                        >
                           Tiktok
                        </a>
                     </li>
                  </ul>
               </div>
               <div>
                  <h2 className="mb-3 text-sm font-semibold uppercase text-neutral-900 dark:text-white">
                     Legal
                  </h2>
                  <ul className="text-muted-foreground text-sm block space-y-2">
                     <li>
                        <Link href="/privacy" className={getLinkStyles()}>
                           Privacy Policy
                        </Link>
                     </li>
                     <li>
                        <Link href="/terms" className={getLinkStyles()}>
                           Terms &amp; Conditions
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <Separator className="mt-8 mb-6" />
         <div className="mb-12 flex justify-center space-x-6">
            <a
               href="https://instagram.com/accretence"
               target="_blank"
               rel="noreferrer"
               className={`${getLinkStyles()} + text-neutral-500`}
            >
               <InstagramIcon className="h-4" />
               <span className="sr-only">Instagram page</span>
            </a>
            <a
               href="https://twitter.com/accretence"
               target="_blank"
               rel="noreferrer"
               className={`${getLinkStyles()} + text-neutral-500`}
            >
               <TwitterIcon className="h-4" />
               <span className="sr-only">Twitter page</span>
            </a>
            <a
               href="https://github.com/accretence"
               target="_blank"
               rel="noreferrer"
               className={`${getLinkStyles()} + text-neutral-500`}
            >
               <GithubIcon className="h-4" />
               <span className="sr-only">GitHub account</span>
            </a>
         </div>
      </footer>
   )
}
