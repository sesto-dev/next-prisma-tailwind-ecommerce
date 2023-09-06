import prisma from '@/lib/prisma'

export const getSalesCount = async () => {
   const salesCount = await prisma.order.count({
      where: {
         isPaid: true,
      },
   })

   return salesCount
}
