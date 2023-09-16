import { format } from 'date-fns'

import prisma from '@/lib/prisma'

import { BannersColumn } from './components/columns'
import { BannersClient } from './components/client'

export default async function BannersPage() {
   const banners = await prisma.banner.findMany({
      orderBy: {
         createdAt: 'desc',
      },
   })

   const formattedBanners: BannersColumn[] = banners.map((item) => ({
      id: item.id,
      label: item.label,
      createdAt: format(item.createdAt, 'MMMM do, yyyy'),
   }))

   return <BannersClient data={formattedBanners} />
}
