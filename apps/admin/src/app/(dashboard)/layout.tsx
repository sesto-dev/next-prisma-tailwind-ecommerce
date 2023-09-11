import Navbar from '@/components/navbar'

export default async function DashboardLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <>
         <Navbar />
         <div className="px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]">
            {children}
         </div>
      </>
   )
}
