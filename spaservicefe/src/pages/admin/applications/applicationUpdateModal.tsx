import React, { useEffect, useState } from 'react'
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
import { Manager } from '@/types/type'
import { getAllManagers } from '../managers/manager.util'

interface UpdateApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  application: any
}

export default function UpdateApplicationModal({ isOpen, onClose, application }: UpdateApplicationModalProps) {
  const fieldsToUse = applicatonConfig.updatefields
  const [managers, setManagers] = useState<Manager[]>([])
  const formSchema = generateZodSchema(fieldsToUse)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(fieldsToUse.map((field: FieldConfig) => [field.name, '']))
  })

  const handleSubmit = async (data: any) => {
    const selectedManager = managers.find(manager => manager.managerId === data.resolvedBy)
    if (selectedManager) data.resolvedBy = selectedManager.managerId
    handleUpdateSubmit(application, data)
  }

  useEffect(() => {
    async function fetchManagers() {
      const data = await getAllManagers()
      setManagers(data)
      if (application) {
        Object.keys(application).forEach((key : string) => {
          if (form.getValues(key) !== undefined) {
            if (key === 'resolvedBy') {
              const managerName = data.find(manager => manager.managerId === application.resolvedBy)?.managerId
              form.setValue('resolvedBy', managerName || '')
            }
            else form.setValue(key, application[key])
          }
        })
      }
    }
    fetchManagers()
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
                        {field.type === 'select' ? (
                          field.name === 'status' ? (
                            <Select
                              onValueChange={formField.onChange}
                              defaultValue={formField.value}
                              disabled={field.readonly}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value='Resolved'>Resolved</SelectItem>
                                <SelectItem value='Pending'>Pending</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Select
                              value={form.watch('resolvedBy') || ''}
                              onValueChange={(value) => {
                                form.setValue('resolvedBy', value)
                              }}
                              disabled={field.readonly}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                              </SelectTrigger>
                              <SelectContent>
                                {managers.map((manager) => (
                                  <SelectItem key={manager.managerId} value={manager.managerId}>
                                    {manager.fullName}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                        )) : (
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
