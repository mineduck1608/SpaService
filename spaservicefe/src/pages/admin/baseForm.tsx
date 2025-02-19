import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { toast, ToastContainer } from 'react-toastify'
import { getToken } from '../../types/constants'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'
import { BaseFormProps, generateZodSchema } from './modal.util'
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from 'src/components/ui/calendar'
import { format } from 'date-fns'

export const BaseForm = ({ config, type, initialData } : BaseFormProps) => {
  const fieldsToUse = type === 'Create' ? config.fields : config.updatefields || config.fields
  const formSchema = generateZodSchema(config)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      fieldsToUse.map((field) => [field.name, ""])
    ),
  })

  const handleSubmit = async (data: any) => {
    try {
      if (type === 'Create') {
        const response = await fetch('https://localhost:7205/' + config.api.create , {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

        if (response.ok) {
          toast.success(`${config.entityName} created successfully`)
        } else {
          toast.error(`Failed to create ${config.entityName}`)
        }
      } else if (type === 'Update') {
        // const response = await fetch('https://localhost:7205/' + config.api.update, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data)
        // })
        // if (response.ok) {
        //   toast.success('Thank you for your message.')
              
        // } else {
        //   toast.error('Failed! Please try again.')
        // }
      }
    } catch (error) {
      console.error('Form submitted error: ', error)
    }
  }

  useEffect(() => {
    if (type === 'Update' && initialData) {
      Object.keys(initialData).forEach((key) => {
        if (form.getValues(key) !== undefined) {
          form.setValue(key, initialData[key].toString())
        }
      })
    }
  }, [initialData, form, type, fieldsToUse])
    
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        {fieldsToUse.map((field) => (
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
                              <SelectItem value='active'>Active</SelectItem>
                              <SelectItem value='inactive'>Inactive</SelectItem>
                            </>
                          ) : field.name === 'position' ? (
                            <>
                              <SelectItem value='employee'>Employee</SelectItem>
                              <SelectItem value='manager'>Manager</SelectItem>
                              <SelectItem value='admin'>Admin</SelectItem>
                            </>
                          ) : field.name === 'gender' ? (
                            <>
                              <SelectItem value='male'>Male</SelectItem>
                              <SelectItem value='female'>Female</SelectItem>
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
  )
}
