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
import { jwtDecode } from 'jwt-decode'
import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

const checkInSchema = z.object({
  accountId: z.string().nonempty('Account ID is required'),
  fullName: z.string().nonempty('Full Name is required'),
  checkInTime: z.string().nonempty('Check-in Time is required')
})

interface CheckInModalProps {
  onCheckInSuccess: (time: string) => void
  onCheckOutSuccess: (time: string) => void
}

export default function CheckInModal({ onCheckInSuccess, onCheckOutSuccess }: CheckInModalProps) {
  const [action, setAction] = useState<string>('checkin')
  const form = useForm<z.infer<typeof checkInSchema>>({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      accountId: '',
      fullName: '',
      checkInTime: format(new Date(), 'yyyy-MM-dd\'T\'HH:mm')
    }
  })

  useEffect(() => {
    const fetchAccountDetails = async () => {
      const token = sessionStorage.getItem('token')
      if (token) {
        const decodedToken: any = jwtDecode(token)
        const accountId = decodedToken.UserId
        console.log(accountId)
        form.setValue('accountId', accountId)

        const employees = await getAllEmployees()
        const employee = employees.find(emp => emp.accountId === accountId)
        if (employee) {
          form.setValue('fullName', employee.fullName)
        }
      }
    }
    fetchAccountDetails()
  }, [form])

  const handleAction = async (action: string) => {
    const data = form.getValues()
    const { accountId } = data
    const latitude = 10.88931964301905
    const longtitude = 106.79658776930619

    await checkInCheckOut(accountId, action, latitude, longtitude)

    if (action === 'checkin') {
      onCheckInSuccess(data.checkInTime)
    } else if (action === 'checkout') {
      onCheckOutSuccess(data.checkInTime)
    }
  }

  const handleOpen = () => {
    const now = new Date()
    const timeZone = 'Asia/Ho_Chi_Minh' // Thay thế bằng múi giờ mong muốn
    const zonedDate = toZonedTime(now, timeZone)
    const formattedDate = format(zonedDate, "yyyy-MM-dd'T'HH:mm")
    form.setValue('checkInTime', formattedDate)
  }

  return (
    <Dialog onOpenChange={handleOpen}>
      <DialogTrigger>
        <Button variant='outline'>Check In</Button>
      </DialogTrigger>
      <DialogContent className='px-10'>
        <DialogTitle className='flex justify-center'>Employee Check-In</DialogTitle>
        <Form {...form}>
          <form className='space-y-4'>
            <FormField
              control={form.control}
              name='fullName'
              render={({ field }) => (
                <FormItem className='mt-2 grid grid-cols-4 items-center gap-4'>
                  <FormLabel className='text-md text-right'>Full Name</FormLabel>
                  <div className='col-span-3 space-y-1'>
                    <FormControl>
                      <Input {...field} placeholder='Enter Full Name' readOnly />
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
            <div className='mt-10 flex justify-end gap-2'>
              <Button type='button' onClick={() => handleAction('checkin')}>Check In</Button>
              <Button type='button' onClick={() => handleAction('checkout')}>Check Out</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  )
}