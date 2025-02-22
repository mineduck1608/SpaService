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
import { ToastContainer } from 'react-toastify' 
import { handleUpdateSubmit } from './application.util'
import { applicatonConfig } from '../modal.util'
import { DatePicker } from 'antd'

interface UpdateApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  application: any
}

export default function UpdateApplicationModal({isOpen, onClose, application} : UpdateApplicationModalProps) {
  const fieldsToUse = applicatonConfig.updatefields
  const formSchema = generateZodSchema(fieldsToUse)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      fieldsToUse.map((field : FieldConfig) => [field.name, ""])
    ),
  })

  const handleSubmit = async (data: any) => {
    handleUpdateSubmit(application.applicationId ,data)
  }

  const handleChange = (field: string, value: string) => {
    form.setValue(field, value)
  }

  useEffect(() => {
    if (application) {
      Object.keys(application).forEach((key : string) => {
        if (form.getValues(key) !== undefined) {
          form.setValue(key, application[key])
        }
      })
    }
  }, [application, form])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='px-10'>
        <DialogTitle className='flex justify-center'>Update Application</DialogTitle>
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
                          {field.type === 'datetime-local' ? (
                            <DatePicker
                              step={1800}
                              showTime
                              showHour
                              showMinute
                              showSecond={false}
                              minuteStep={30}
                              className='border-[1px] p-2 w-75'
                              onChange={(date) => handleChange(field.name, date ? date.format('YYYY-MM-DDTHH:mm:ss') : '')}
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