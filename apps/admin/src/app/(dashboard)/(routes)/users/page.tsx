import { format } from 'date-fns'

import prisma from '@/lib/prisma'
import { formatter } from '@/lib/utils'

import { UsersClient } from './components/client'
import { UserColumn } from './components/columns'

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

   return <UsersClient data={formattedUsers} />
}
