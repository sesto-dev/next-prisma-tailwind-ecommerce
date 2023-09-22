import { Separator } from '@/components/native/separator'
import config from '@/config/site'
import { GithubIcon, InstagramIcon, TwitterIcon } from 'lucide-react'
import Link from 'next/link'

const data = [
   {
      label: 'LEGAL',
      links: [
         {
            label: 'Privacy Policy',
            url: '/privacy',
         },
         {
            label: 'Terms & Conditions',
            url: '/terms',
         },
      ],
   },
   {
      label: 'RESOURCES',
      links: [
         {
            label: 'Blog',
            url: '/blog',
         },
         {
            label: 'About',
            url: '/about',
         },
         {
            label: 'Contact',
            url: '/contact',
         },
      ],
   },
   {
      label: 'SUPPORT',
      links: [
         {
            label: 'Telegram',
            url: '/telegram',
         },
         {
            label: 'FAQ',
            url: '/faq',
         },
      ],
   },
]

export default function Footer() {
   return (
      <footer className="w-full">
         <Separator className="my-12" />
         <div className="flex justify-between px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]">
            <Trademark />
            <Links />
         </div>
         <Separator className="mt-8 mb-6" />
         <Socials />
      </footer>
   )
}

function Links() {
   return (
      <div className="text-end justify-evenly grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
         {data.map(({ label, links }) => (
            <div key={label}>
               <h2 className="mb-3 text-sm uppercase">{label}</h2>
               <ul className="block space-y-1">
                  {links.map(({ label, url }) => (
                     <li key={label}>
                        <Link
                           href={url}
                           className="text-sm transition duration-300 text-muted-foreground hover:text-foreground"
                        >
                           {label}
                        </Link>
                     </li>
                  ))}
               </ul>
            </div>
         ))}
      </div>
   )
}

function Trademark() {
   return (
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
   )
}

function Socials() {
   return (
      <div className="mb-6 flex justify-center space-x-6 text-muted-foreground">
         <a
            href="https://instagram.com/accretence"
            target="_blank"
            rel="noreferrer"
         >
            <InstagramIcon className="h-4" />
            <span className="sr-only">Instagram page</span>
         </a>
         <a
            href="https://twitter.com/accretence"
            target="_blank"
            rel="noreferrer"
         >
            <TwitterIcon className="h-4" />
            <span className="sr-only">Twitter page</span>
         </a>
         <a
            href="https://github.com/accretence"
            target="_blank"
            rel="noreferrer"
         >
            <GithubIcon className="h-4" />
            <span className="sr-only">GitHub account</span>
         </a>
      </div>
   )
}
