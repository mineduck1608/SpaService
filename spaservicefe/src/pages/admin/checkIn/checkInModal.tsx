import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from 'src/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Button } from 'src/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { ToastContainer, toast } from 'react-toastify'
import { checkInCheckOut, getAllEmployees } from './record.util'
import { getAllAccounts } from '../accounts/account.util'
import { jwtDecode } from 'jwt-decode'

const checkInSchema = z.object({
  accountId: z.string().nonempty('Account ID is required'),
  checkInTime: z.string().nonempty('Check-in Time is required')
})

export default function CheckInModal() {
  const form = useForm<z.infer<typeof checkInSchema>>({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      accountId: '',
      checkInTime: new Date().toISOString().slice(0, 16)
    }
  })

  useEffect(() => {
    const fetchAccountId = async () => {
      const token = sessionStorage.getItem('token')
      if (token) {
        const decodedToken: any = jwtDecode(token)
        const accountId = decodedToken.UserId
        console.log(accountId)
        form.setValue('accountId', accountId)
      }
    }
    fetchAccountId()
  }, [form])

  const handleSubmit = async () => {
    const token = sessionStorage.getItem('token')
    if (token) {
      const decodedToken: any = jwtDecode(token)
      const accountId = decodedToken.UserId
      await checkInCheckOut(accountId)
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant='outline'>Check In</Button>
      </DialogTrigger>
      <DialogContent className='px-10'>
        <DialogTitle className='flex justify-center'>Employee Check-In</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='accountId'
              render={({ field }) => (
                <FormItem className='mt-2 grid grid-cols-4 items-center gap-4'>
                  <FormLabel className='text-md text-right'>Account ID</FormLabel>
                  <div className='col-span-3 space-y-1'>
                    <FormControl>
                      <Input {...field} placeholder='Enter Account ID' readOnly />
                    </FormControl>
                    <FormMessage className='text-sm' />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='checkInTime'
              render={({ field }) => (
                <FormItem className='mt-2 grid grid-cols-4 items-center gap-4'>
                  <FormLabel className='text-md text-right'>Check-in Time</FormLabel>
                  <div className='col-span-3 space-y-1'>
                    <FormControl>
                      <Input {...field} type='datetime-local' placeholder='Enter Check-in Time' readOnly />
                    </FormControl>
                    <FormMessage className='text-sm' />
                  </div>
                </FormItem>
              )}
            />
            <div className='mt-10 flex justify-end'>
              <Button type='submit'>Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  )
}