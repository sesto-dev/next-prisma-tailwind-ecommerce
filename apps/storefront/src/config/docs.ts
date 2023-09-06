import { MainNavItem, SidebarNavItem } from '@/types/nav'

interface DocsConfig {
   mainNav: MainNavItem[]
   sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
   mainNav: [
      {
         title: 'Documentation',
         href: '/docs',
      },

      {
         title: 'GitHub',
         href: 'https://github.com/shadcn/ui',
         external: true,
      },
   ],
   sidebarNav: [
      {
         title: 'Getting Started',
         items: [
            {
               title: 'Introduction',
               href: '/docs',
               items: [],
            },
         ],
      },
      {
         title: 'Installation',
         items: [
            {
               title: 'Next.js',
               href: '/docs/installation/next',
               items: [],
            },
         ],
      },
      {
         title: 'Dark Mode',
         items: [
            {
               title: 'Next.js',
               href: '/docs/dark-mode/next',
               items: [],
            },
            {
               title: 'Vite',
               href: '/docs/dark-mode/vite',
               items: [],
            },
         ],
      },
      {
         title: 'Components',
         items: [
            {
               title: 'Accordion',
               href: '/docs/components/accordion',
               items: [],
            },
         ],
      },
   ],
}
