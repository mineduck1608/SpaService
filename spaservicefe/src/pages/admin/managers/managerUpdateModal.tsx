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
import { handleUpdateSubmit } from './manager.util'
import { managerConfig } from '../modal.util'
import dayjs from 'dayjs'

interface UpdateManagerModalProps {
  isOpen: boolean
  onClose: () => void
  manager: any
}

export default function UpdateManagerModal({ isOpen, onClose, manager }: UpdateManagerModalProps) {
  const fieldsToUse = managerConfig.updatefields
  const formSchema = generateZodSchema(fieldsToUse)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(fieldsToUse.map((field: FieldConfig) => [field.name, '']))
  })

  const handleSubmit = async (data: any) => {
    handleUpdateSubmit(manager, data)

    console.log(manager)
  }

  useEffect(() => {
    if (manager) {
      Object.keys(manager).forEach((key: string) => {
        if (form.getValues(key) !== undefined) {
          if (key === 'hireDate' && manager[key]) {
            const parsedDate = dayjs(manager[key], 'DD/MM/YYYY')
            form.setValue(key, parsedDate.format('YYYY-MM-DDTHH:mm:ss'))
          } else form.setValue(key, manager[key])
        }
      })
    }
  }, [manager, form])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='px-10'>
        <DialogTitle className='flex justify-center'>Update Manager</DialogTitle>
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
                          field.name === 'position' ? (
                            <Select
                              onValueChange={formField.onChange}
                              defaultValue={formField.value}
                              disabled={field.readonly}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value='System Manager'>System Manager</SelectItem>
                                <SelectItem value='Cosmetic Manager'>Cosmetic Manager</SelectItem>
                                <SelectItem value='Service Manager'>Service Manager</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Select
                              onValueChange={formField.onChange}
                              defaultValue={formField.value}
                              disabled={field.readonly}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value='Working'>Working</SelectItem>
                                <SelectItem value='Retired'>Retired</SelectItem>
                              </SelectContent>
                            </Select>
                          )
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
    </Dialog>
  )
}
