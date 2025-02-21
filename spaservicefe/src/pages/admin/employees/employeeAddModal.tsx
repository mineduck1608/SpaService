import React, { useEffect } from 'react'
import { Dialog, DialogContent, DialogTrigger } from 'src/components/ui/dialog'
import { employeeConfig, FieldConfig, generateZodSchema } from '../modal.util'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Button } from 'src/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'
import { ToastContainer } from 'react-toastify' 
import { handleCreateSubmit } from './employee.util'
import { DatePicker } from 'antd'

export default function AddEmployeeModal() {
  const fieldsToUse = employeeConfig.fields
  const formSchema = generateZodSchema(fieldsToUse)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      fieldsToUse.map((field : FieldConfig) => [field.name, ""])
    ),
  })

  const handleSubmit = async (data: any) => {
    handleCreateSubmit(data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Create</Button>
      </DialogTrigger>
      <DialogContent className='px-10'>
        <DialogTitle className='flex justify-center'>Update Customer</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
              {fieldsToUse.map((field : FieldConfig) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: formField }) => (
                    <FormItem className='grid grid-cols-4 items-center gap-4 mt-2'>
                      <FormLabel className='text-right text-md'>{field.label}</FormLabel>
                      <div className='col-span-3 space-y-1'>
                        <FormControl>
                        {field.type === 'select' ? (
                          <Select 
                            onValueChange={formField.onChange} 
                            defaultValue={formField.value}
                          >
                            <SelectTrigger asChild>
                              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                            </SelectTrigger>
                            <SelectContent>
                              
                            </SelectContent>
                          </Select>
                        ) : field.type === 'datetime-local' ? (
                          <DatePicker
                            step={1800}
                            showTime
                            showHour
                            showMinute
                            showSecond={false}
                            minuteStep={30}
                            className='border-[1px] p-2 w-75'
                          />
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
              <div className='flex justify-end mt-10'>
                  <Button type='submit'>Submit</Button>
              </div>
            </form>
          </Form>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  )
}