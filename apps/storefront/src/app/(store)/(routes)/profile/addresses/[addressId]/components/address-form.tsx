'use client'

import { AlertModal } from '@/components/modals/alert-modal'
import { Heading } from '@/components/native/heading'
import { Button } from '@/components/ui/button'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Address } from '@prisma/client'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as z from 'zod'

const formSchema = z.object({
   city: z.string().min(1),
   address: z.string().min(1),
   phone: z.string().min(1),
   postalCode: z.string().min(1),
})

type AddressFormValues = z.infer<typeof formSchema>

interface AddressFormProps {
   initialData: Address | null
}

export const AddressForm: React.FC<AddressFormProps> = ({ initialData }) => {
   const params = useParams()
   const router = useRouter()

   const [open, setOpen] = useState(false)
   const [loading, setLoading] = useState(false)

   const title = initialData ? 'Edit address' : 'Create address'
   const description = initialData ? 'Edit a address.' : 'Add a new address'
   const toastMessage = initialData ? 'Address updated.' : 'Address created.'
   const action = initialData ? 'Save changes' : 'Create'

   const form = useForm<AddressFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: initialData || {
         phone: '',
         city: '',
         address: '',
         postalCode: '',
      },
   })

   const onSubmit = async (data: AddressFormValues) => {
      try {
         setLoading(true)

         await fetch(`/api/addresses`, {
            method: 'POST',
            body: JSON.stringify(data),
            cache: 'no-store',
         })

         router.refresh()
         router.push(`/profile/addresses`)
         toast.success(toastMessage)
      } catch (error: any) {
         toast.error('Something went wrong.')
      } finally {
         setLoading(false)
      }
   }

   const onDelete = async () => {
      try {
         setLoading(true)

         await fetch(`/api/address/${params.addressId}`, {
            method: 'DELETE',
            cache: 'no-store',
         })

         router.refresh()
         router.push(`/addresses`)
         toast.success('Address deleted.')
      } catch (error: any) {
         toast.error(
            'Make sure you removed all categories using this address first.'
         )
      } finally {
         setLoading(false)
         setOpen(false)
      }
   }

   return (
      <>
         <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
         />
         <div className="flex items-center justify-between">
            <Heading title={title} description={description} />
            {initialData && (
               <Button
                  disabled={loading}
                  variant="destructive"
                  size="sm"
                  onClick={() => setOpen(true)}
               >
                  <Trash className="h-4" />
               </Button>
            )}
         </div>
         <Separator />
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-8 w-full"
            >
               <div className="md:grid md:grid-cols-3 gap-8">
                  <FormField
                     control={form.control}
                     name="city"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Label</FormLabel>
                           <FormControl>
                              <Input
                                 disabled={loading}
                                 placeholder="Tehran"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="phone"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Phone</FormLabel>
                           <FormControl>
                              <Input
                                 disabled={loading}
                                 placeholder="09123456789"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="postalCode"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Postal Code</FormLabel>
                           <FormControl>
                              <Input
                                 disabled={loading}
                                 placeholder="1234567890"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <div className="col-span-2">
                     <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                 <Textarea
                                    disabled={loading}
                                    placeholder="Street - Building Number"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
               </div>
               <Button disabled={loading} className="ml-auto" type="submit">
                  {action}
               </Button>
            </form>
         </Form>
      </>
   )
}
