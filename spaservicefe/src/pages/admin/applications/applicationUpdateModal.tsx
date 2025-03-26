import React, { useEffect } from 'react'
import { Dialog, DialogContent } from 'src/components/ui/dialog'
import { FieldConfig, generateZodSchema } from '../modal.util'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Button } from 'src/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'
import { Input } from 'src/components/ui/input'
import { ToastContainer } from 'react-toastify'
import { handleUpdateSubmit } from './application.util'
import { applicatonConfig } from '../modal.util'
import { jwtDecode } from 'jwt-decode'

interface UpdateApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  application: any
}

export default function UpdateApplicationModal({ isOpen, onClose, application }: UpdateApplicationModalProps) {
  const fieldsToUse = applicatonConfig.updatefields.filter((field) => field.name !== 'resolvedBy') // Remove resolvedBy
  const formSchema = generateZodSchema(fieldsToUse)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(fieldsToUse.map((field: FieldConfig) => [field.name, '']))
  })

  const handleSubmit = async (data: any) => {
    try {
      // Decode the token to get `resolvedBy` (manager ID or similar)
      const token = sessionStorage.getItem('token') // Replace with your token retrieval logic
      const decodedToken: any = jwtDecode(token || '') // Adjust the token structure type if needed
      const resolvedBy = decodedToken.UserId // Replace `managerId` with the correct field name from the token

      // Set `resolvedBy` in the form data
      data.resolvedBy = resolvedBy

      // Call the update submit function
      await handleUpdateSubmit(application, data)
      console.log(data)
    } catch (error) {
      console.error('Error during submission:', error)
    }
  }

  useEffect(() => {
    if (application) {
      Object.keys(application).forEach((key: string) => {
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
                        {field.type === 'select' && field.name === 'status' ? (
                          <Select
                            onValueChange={formField.onChange}
                            defaultValue={formField.value}
                            disabled={field.readonly}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='Accepted'>Accepted</SelectItem>
                              <SelectItem value='Pending'>Pending</SelectItem>
                              <SelectItem value='Denied'>Denied</SelectItem>
                            </SelectContent>
                          </Select>
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
