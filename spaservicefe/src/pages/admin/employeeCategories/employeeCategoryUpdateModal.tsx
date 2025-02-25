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
import { handleUpdateSubmit } from './employeeCategory.util'
import { spaServiceConfig } from '../modal.util'


interface UpdateEmployeeCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  employeeCategory: any
}

export default function UpdateEmployeeCategoryModal({
  isOpen,
  onClose,
  employeeCategory
}: UpdateEmployeeCategoryModalProps) {
  const fieldsToUse = spaServiceConfig.updatefields
  const formSchema = generateZodSchema(fieldsToUse)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(fieldsToUse.map((field: FieldConfig) => [field.name, '']))
  })

  const handleSubmit = async (data: any) => {
    data.price = parseFloat(data.price) || 0
    handleUpdateSubmit(employeeCategory.employeCategoryId, data)
  }

  useEffect(() => {
    if (employeeCategory) {
      Object.keys(employeeCategory).forEach((key: string) => {
        if (form.getValues(key) !== undefined) {
          if (key === 'price') employeeCategory[key] = String(employeeCategory[key])
          form.setValue(key, employeeCategory[key])
        }
      })
    }
  }, [employeeCategory, form])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='px-10'>
        <DialogTitle className='flex justify-center'>Update Employee Category</DialogTitle>
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
                        <Input
                          {...formField}
                          type={field.type}
                          placeholder={field.placeholder}
                          disabled={field.readonly}
                        />
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
