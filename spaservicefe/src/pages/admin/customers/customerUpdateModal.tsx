import React, { useEffect } from 'react'
import { Dialog, DialogContent } from 'src/components/ui/dialog'
import { FieldConfig, generateZodSchema } from '../modal.util'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Button } from 'src/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { ToastContainer } from 'react-toastify'
import { handleUpdateSubmit } from './customer.util'
import { customerConfig } from '../modal.util'
import { DatePicker } from 'antd'

interface UpdateCustomerModalProps {
  isOpen: boolean
  onClose: () => void
  customer: any
}

export default function UpdateCustomerModal({ isOpen, onClose, customer }: UpdateCustomerModalProps) {
  const fieldsToUse = customerConfig.updatefields
  const formSchema = generateZodSchema(fieldsToUse)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(fieldsToUse.map((field: FieldConfig) => [field.name, '']))
  })

  const handleSubmit = async (data: any) => {
    handleUpdateSubmit(customer.customerId, data)
  }

  useEffect(() => {
    if (customer) {
      Object.keys(customer).forEach((key: string) => {
        if (form.getValues(key) !== undefined) {
          form.setValue(key, customer[key])
        }
      })
    }
  }, [customer, form])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='px-10'>
        <DialogTitle className='flex justify-center'>Update Customer</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            {fieldsToUse.map((field: FieldConfig) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem className='mt-2 grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-md text-right'>{field.label}</FormLabel>
                    <div className='col-span-3 space-y-1'>
                      <FormControl>
                        {field.type === 'select' ? (
                          <Select
                            onValueChange={formField.onChange}
                            defaultValue={formField.value}
                            disabled={field.readonly}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='Male'>Active</SelectItem>
                              <SelectItem value='Female'>Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : field.type === 'datetime-local' ? (
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={`w-[240px] pl-3 text-left font-normal ${
                                    !formField.value ? 'text-muted-foreground' : ''
                                  }`}
                                  disabled={field.readonly}
                                >
                                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className='w-auto p-0' align='start'>
                              <div className='ml-3 flex w-full items-center gap-4'>
                                <DatePicker
                                  step={1800}
                                  showTime
                                  showHour
                                  showMinute
                                  showSecond={false}
                                  minuteStep={30}
                                  className='w-75 border-[1px] p-2'
                                />
                              </div>
                            </PopoverContent>
                          </Popover>
                        ) : (
                          <Input
                            {...formField}
                            type={field.type}
                            placeholder={field.placeholder}
                            disabled={field.readonly}
                          />
                        )}
                      </FormControl>
                      <FormMessage className='text-sm' />
                    </div>
                  </FormItem>
                )}
              />
            ))}
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
