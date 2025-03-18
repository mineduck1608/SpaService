import React, { useEffect, useState} from 'react'
import { Dialog, DialogContent, DialogTrigger } from 'src/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Button } from 'src/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { ToastContainer } from 'react-toastify'
import { handleCheckInSubmit, getAllEmployees } from './record.util'
import { getToken } from '../../../types/constants'

const checkInSchema = z.object({
    employeeId: z.string().nonempty('Employee ID is required'),
    fullName: z.string().nonempty('Full Name is required'),
    checkInTime: z.string().nonempty('Check-in Time is required')
})

export default function CheckInModal() {
    const [fullName, setFullName] = useState('')
    const form = useForm<z.infer<typeof checkInSchema>>({
        resolver: zodResolver(checkInSchema),
        defaultValues: {
            employeeId: '',
            fullName: '',
            checkInTime: new Date().toISOString().slice(0,16)
        }
    })

    useEffect(() => {
        const fetchEmployeeName = async () => {
            const token = getToken()
            const employees = await getAllEmployees()
            const employee = employees.find(emp => emp.accountId === token)
            if (employee) {
                setFullName(employee.fullName)
                form.setValue('fullName', employee.fullName)
                form.setValue('employeeId', employee.employeeId)
            }
        }
        fetchEmployeeName()
    }, [form])

    const handleSubmit = async (data: any) => {
        await handleCheckInSubmit(data)
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
                            name='employeeId'
                            render={({ field }) => (
                                <FormItem className='mt-2 grid grid-cols-4 items-center gap-4'>
                                    <FormLabel className='text-md text-right'>Employee ID</FormLabel>
                                    <div className='col-span-3 space-y-1'>
                                        <FormControl>
                                            <Input {...field} placeholder='Enter Employee ID' readOnly/>
                                        </FormControl>
                                        <FormMessage className='text-sm' />
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='fullName'
                            render={({ field }) => (
                                <FormItem className='mt-2 grid grid-cols-4 items-center gap-4'>
                                    <FormLabel className='text-md text-right'>Full Name</FormLabel>
                                    <div className='col-span-3 space-y-1'>
                                        <FormControl>
                                            <Input {...field} placeholder='Full Name' readOnly />
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
                                            <Input {...field} type='date-time local' placeholder='Enter Check-in Time' readOnly />
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