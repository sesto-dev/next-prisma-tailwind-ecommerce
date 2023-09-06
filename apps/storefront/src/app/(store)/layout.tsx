import Container from '@/components/native/Container'
import Footer from '@/components/native/Footer'
import Header from '@/components/native/Header'

export default async function DashboardLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <>
         <Header />
         <Container>{children}</Container>
         <Footer />
      </>
   )
}
