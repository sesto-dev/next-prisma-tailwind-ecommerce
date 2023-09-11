import { format } from 'date-fns'

import prisma from '@/lib/prisma'
import { formatter } from '@/lib/utils'

import { UsersClient } from './components/client'
import { UserColumn } from './components/columns'

const UsersPage = async () => {
   const users = await prisma.user.findMany({
      orderBy: {
         updatedAt: 'desc',
      },
   })

   const formattedUsers: UserColumn[] = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
   }))

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 pt-6">
            <UsersClient data={formattedUsers} />
         </div>
      </div>
   )
}

export default UsersPage
