import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prisma'

import { UsersTable } from './components/table'
import { UserColumn } from './components/table'

export default async function UsersPage() {
   const users = await prisma.user.findMany({
      include: {
         orders: true,
      },
      take: 10,
      orderBy: {
         updatedAt: 'desc',
      },
   })

   const formattedUsers: UserColumn[] = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      orders: user.orders.length,
   }))

   return (
      <div className="block space-y-4 my-6">
         <Heading title="Users" description="Manage products for your store" />
         <Separator />
         <UsersTable data={formattedUsers} />
      </div>
   )
}
