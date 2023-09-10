import prisma from '@/lib/prisma'

import { AddressForm } from './components/address-form'

const Page = async ({ params }: { params: { addressId: string } }) => {
   const address = await prisma.address.findUnique({
      where: {
         id: params.addressId,
      },
   })

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 p-8 pt-6">
            <AddressForm initialData={address} />
         </div>
      </div>
   )
}

export default Page
