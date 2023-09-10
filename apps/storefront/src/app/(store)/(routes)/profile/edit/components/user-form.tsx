'use client'

import * as z from 'zod'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { useParams, useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import type { UserWithIncludes } from '@/types/prisma'

const formSchema = z.object({
   name: z.string().min(1),
   email: z.string().min(1),
   phone: z.string().min(1),
})

type UserFormValues = z.infer<typeof formSchema>

interface UserFormProps {
   initialData: UserWithIncludes | null
}

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
   const params = useParams()
   const router = useRouter()

   const [loading, setLoading] = useState(false)

   const toastMessage = 'User updated.'
   const action = 'Save changes'

   const defaultValues = initialData
      ? {
           ...initialData,
        }
      : {
           name: '---',
           phone: '---',
           email: '---',
        }

   const form = useForm<UserFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues,
   })

   const onSubmit = async (data: UserFormValues) => {
      try {
         setLoading(true)

         if (initialData) {
            await fetch(`/api/products/${params.productId}`, {
               method: 'PATCH',
               body: JSON.stringify({ data }),
               cache: 'no-store',
            })
         } else {
            await fetch(`/api/products`, {
               method: 'POST',
               body: JSON.stringify({ data }),
               cache: 'no-store',
            })
         }

         router.refresh()
         router.push(`/products`)
         toast.success(toastMessage)
      } catch (error: any) {
         toast.error('Something went wrong.')
      } finally {
         setLoading(false)
      }
   }

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 w-full"
         >
            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Name</FormLabel>
                     <FormControl>
                        <Input
                           disabled={loading}
                           placeholder="Full Name"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input
                           disabled={loading}
                           placeholder="Email"
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
                           placeholder="Phone"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button disabled={loading} className="ml-auto" type="submit">
               {action}
            </Button>
         </form>
      </Form>
   )
}
