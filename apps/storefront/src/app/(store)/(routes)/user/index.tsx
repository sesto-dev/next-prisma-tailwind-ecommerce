import { useEffect, useState } from 'react'

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { useValidAccessToken } from '@/hooks/useAccessToken'
import { isVariableValid } from '@/lib/utils'
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table'
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion'
import { Spinner } from '@/components/native/icons'
import { useRouter } from 'next/navigation'
import { useUserContext } from '@/state/User'

export default function User({}) {
   const { AccessToken } = useValidAccessToken()
   const { user, loading } = useUserContext()

   const router = useRouter()

   return (
      <>
         {isVariableValid(user) ? (
            <Accordion type="single" collapsible className="w-full">
               <AccordionItem value="item-1">
                  <AccordionTrigger>
                     <h2 className="text-lg">Wishlist</h2>
                  </AccordionTrigger>
                  <AccordionContent>
                     Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-2">
                  <AccordionTrigger>
                     <h2 className="text-lg">Orders</h2>
                  </AccordionTrigger>
                  <AccordionContent>
                     Yes. It comes with default styles that matches the other
                     components&apos; aesthetic.
                  </AccordionContent>
               </AccordionItem>
            </Accordion>
         ) : (
            <Accordion type="single" collapsible className="w-full">
               <AccordionItem value="item-1">
                  <AccordionTrigger>
                     <h2 className="text-lg">
                        <Spinner />
                     </h2>
                  </AccordionTrigger>
                  <AccordionContent>
                     Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-2">
                  <AccordionTrigger>
                     <h2 className="text-lg">
                        <Spinner />
                     </h2>
                  </AccordionTrigger>
                  <AccordionContent>
                     Yes. It comes with default styles that matches the other
                     components&apos; aesthetic.
                  </AccordionContent>
               </AccordionItem>
            </Accordion>
         )}
      </>
   )
}

function UserInfo({ user }) {
   const [visibility, setVisibility] = useState(false)

   return (
      <div>
         <button
            type="button"
            className="flex w-full items-center justify-between rounded-t-lg border border-neutral-200 p-5 text-left text-xl text-black hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700"
            onClick={() => setVisibility(!visibility)}
         >
            <span className="flex flex-col">
               <h1>User Info</h1>
               <small className="text-neutral-300">
                  Your personal information.
               </small>
            </span>
            {visibility ? (
               <ChevronUpIcon className="h-5 w-5" />
            ) : (
               <ChevronDownIcon className="h-5 w-5" />
            )}
         </button>
         <div className={!visibility && 'hidden'}>
            <div className="border border-neutral-200 p-5 font-light dark:border-neutral-700 "></div>
         </div>
      </div>
   )
}

function Payments({ user }) {
   const [visibility, setVisibility] = useState(false)

   return (
      <div>
         <button
            type="button"
            className="flex w-full items-center justify-between border border-neutral-200 p-5 text-left text-xl text-black transition-all ease-in-out hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700"
            onClick={() => setVisibility(!visibility)}
         >
            <span className="flex flex-col">
               <h1>Payments</h1>
               <small className="text-neutral-300">Your order history.</small>
            </span>
            {visibility ? (
               <ChevronUpIcon className="h-5 w-5" />
            ) : (
               <ChevronDownIcon className="h-5 w-5" />
            )}
         </button>
         <div className={!visibility && 'hidden'}>
            <div className="border border-neutral-200 p-8 font-light dark:border-neutral-700">
               {isVariableValid(user.payments) && (
                  <Table>
                     <TableCaption>
                        A list of your recent invoices.
                     </TableCaption>
                     <TableHeader>
                        <TableRow>
                           <TableHead className="w-[100px]">Invoice</TableHead>
                           <TableHead>Status</TableHead>
                           <TableHead>Method</TableHead>
                           <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        <TableRow>
                           <TableCell className="font-medium">INV001</TableCell>
                           <TableCell>Paid</TableCell>
                           <TableCell>Credit Card</TableCell>
                           <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>
               )}
            </div>
         </div>
      </div>
   )
}

function Referrals({ userObject }) {
   const [visibility, setVisibility] = useState(false)

   return (
      <div>
         <button
            type="button"
            className="flex w-full items-center justify-between border border-neutral-200 p-5 text-left text-xl text-black transition-all ease-in-out hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700"
            onClick={() => setVisibility(!visibility)}
         >
            <span className="flex flex-col">
               <h1>Referrals</h1>
               <small className="text-neutral-300">
                  Your referral history.
               </small>
            </span>
            {visibility ? (
               <ChevronUpIcon className="h-5 w-5" />
            ) : (
               <ChevronDownIcon className="h-5 w-5" />
            )}
         </button>
         <div className={!visibility && 'hidden'}>
            <div className=" border border-neutral-200 p-5 font-light dark:border-neutral-700"></div>
         </div>
      </div>
   )
}
