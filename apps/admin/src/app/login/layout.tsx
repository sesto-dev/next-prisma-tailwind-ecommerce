import { Fragment } from 'react'

export default async function DashboardLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return <Fragment>{children}</Fragment>
}
