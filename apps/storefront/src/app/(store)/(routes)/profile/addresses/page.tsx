'use client'

import { usePathname } from 'next/navigation'
import { UserForm } from '../edit/components/user-form'
import { Heading } from '@/components/native/heading'

import { useAuthenticated } from '@/hooks/useAuthentication'
import type { AddressColumn } from './components/columns'
import { AddressClient } from './components/client'

import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { UserCombobox } from '../components/switcher'
import { Loader } from '@/components/ui/loader'
import { Card, CardContent } from '@/components/ui/card'
import { useUserContext } from '@/state/User'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PlusIcon } from 'lucide-react'

export default function AddressesPage() {
   const { authenticated } = useAuthenticated()
   const [addresses, setAddresses] = useState(null)
   const pathname = usePathname()

   useEffect(() => {
      async function getOrder() {
         try {
            const response = await fetch(`/api/addresses`, {
               cache: 'no-store',
            })

            const json = await response.json()
            setAddresses(json)
         } catch (error) {
            console.error({ error })
         }
      }

      if (authenticated) getOrder()
   }, [authenticated])

   return (
      <div className="flex-col">
         <div className="flex-1 ">
            <div className="flex items-center justify-between">
               <UserCombobox initialValue={pathname} />
               <Link href="/profile/addresses/new">
                  <Button>
                     <PlusIcon className="mr-2 h-4" /> Add New
                  </Button>
               </Link>
            </div>
            {addresses ? (
               <AddressSection addresses={addresses} />
            ) : (
               <Card className="my-2">
                  <CardContent>
                     <div className="h-[20vh]">
                        <div className="h-full my-4 flex items-center justify-center">
                           <Loader />
                        </div>
                     </div>
                  </CardContent>
               </Card>
            )}
         </div>
      </div>
   )
}

function AddressSection({ addresses }) {
   const formattedAddresses: AddressColumn[] = addresses.map((address) => ({
      id: address.id,
      city: address.city,
      address: address.address,
      phone: address.phone,
      postal: address.postalCode,
   }))

   return <AddressClient data={formattedAddresses} />
}
