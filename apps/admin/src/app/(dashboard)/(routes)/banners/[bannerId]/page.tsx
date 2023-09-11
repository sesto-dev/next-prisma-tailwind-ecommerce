import prisma from '@/lib/prisma'

import { BannerForm } from './components/banner-form'

const Page = async ({ params }: { params: { bannerId: string } }) => {
   const banner = await prisma.banner.findUnique({
      where: {
         id: params.bannerId,
      },
   })

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 pt-6">
            <BannerForm initialData={banner} />
         </div>
      </div>
   )
}

export default Page
