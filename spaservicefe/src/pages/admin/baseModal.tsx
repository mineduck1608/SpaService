import React, { useEffect } from 'react'
import { Dialog, DialogContent, DialogTrigger } from 'src/components/ui/dialog'
import { entityConfigMap, BaseModalProps, FieldConfig } from './modal.util'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Button } from 'src/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { getToken } from '../../types/constants'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'
import { generateZodSchema } from './modal.util'
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from 'src/components/ui/calendar'
import { format } from 'date-fns'
import { toast, ToastContainer } from 'react-toastify' 

export default function BaseModal({isOpen, onClose, type, entity, rowData} : BaseModalProps) {
  const config = entityConfigMap[entity]
  const isCreate = type === 'Create'
  const fieldsToUse = type === 'Create' ? config.fields : config.updatefields || config.fields
  const formSchema = generateZodSchema(config)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      fieldsToUse.map((field : FieldConfig) => [field.name, ""])
    ),
  })

  const handleSubmit = async (data: any) => {
    try {
      console.log('Submitting form with data:', data)

      const baseUrl = 'https://localhost:7205/'
      const endpoint = type === 'Create' 
        ? config.api.create
        : config.api.update.replace('{id}', rowData?.customerId)

      const response = await fetch(baseUrl + endpoint, {
        method: type === 'Create' ? 'POST' : 'PUT',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.status === 200 || response.status === 204) {
        toast.success('Success!', {
          autoClose: 2000,
          onClose: () => window.location.reload()
        })
      } else {
        toast.error('Failed. Try again.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  useEffect(() => {
    if (type === 'Update' && rowData) {
      Object.keys(rowData).forEach((key) => {
        if (form.getValues(key) !== undefined) {
          form.setValue(key, rowData[key].toString())
        }
      })
    }
  }, [rowData, form, type, fieldsToUse])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
      {isCreate ? (
        <Button variant='outline'>{type}</Button>
      ):(
        <></>
      )}
      </DialogTrigger>
      <DialogContent className='px-10'>
        <DialogTitle className='flex justify-center'>{type} {entity}</DialogTitle>
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
                                <SelectTrigger>
                                  <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                                </SelectTrigger>
                                <SelectContent>
                                  {field.name === 'status' ? (
                                    <>
                                      <SelectItem value='Active'>Active</SelectItem>
                                      <SelectItem value='Inactive'>Inactive</SelectItem>
                                    </>
                                  ) : field.name === 'position' ? (
                                    <>
                                      <SelectItem value='Employee'>Employee</SelectItem>
                                      <SelectItem value='Manager'>Manager</SelectItem>
                                      <SelectItem value='Admin System'>Admin System</SelectItem>
                                    </>
                                  ) : field.name === 'gender' ? (
                                    <>
                                      <SelectItem value='Male'>Male</SelectItem>
                                      <SelectItem value='Female'>Female</SelectItem>
                                    </>
                                  ) : null}
                                </SelectContent>
                              </Select>
                            ) : field.type === 'datetime-local' ? (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={'outline'}
                                      className={`w-[240px] pl-3 text-left font-normal ${
                                        !formField.value ? "text-muted-foreground" : ""
                                      }`}
                                    >
                                      {formField.value ? (
                                        format(new Date(formField.value), "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className='w-auto p-0' align='start'>
                                  <Calendar
                                    mode='single'
                                    selected={formField.value ? new Date(formField.value) : undefined}
                                    onSelect={(date) => formField.onChange(date?.toISOString())}
                                    disabled={(date) =>
                                      date > new Date() || date < new Date('1900-01-01')
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            ) : (
                              <Input
                                {...formField}
                                type={field.type}
                                placeholder={field.placeholder}
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