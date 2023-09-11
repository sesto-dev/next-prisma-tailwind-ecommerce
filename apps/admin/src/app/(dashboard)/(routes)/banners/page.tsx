import { format } from 'date-fns'

import prisma from '@/lib/prisma'

import { Column } from './components/columns'
import { Client } from './components/client'

const Page = async () => {
   const banners = await prisma.banner.findMany({
      orderBy: {
         createdAt: 'desc',
      },
   })

   const formatted: Column[] = banners.map((item) => ({
      id: item.id,
      label: item.label,
      createdAt: format(item.createdAt, 'MMMM do, yyyy'),
   }))

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem] pt-6">
            <Client data={formatted} />
         </div>
      </div>
   )
}

export default Page
