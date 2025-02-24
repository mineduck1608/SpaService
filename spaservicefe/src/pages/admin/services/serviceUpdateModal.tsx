import React, { useEffect, useState } from 'react'
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
import { ToastContainer } from 'react-toastify' 
import { handleUpdateSubmit, getAllServiceCategories } from './service.util'
import { spaServiceConfig } from '../modal.util'
import { ServiceCategory } from 'src/types/type'

interface UpdateServiceModalProps {
  isOpen: boolean
  onClose: () => void
  service: any
}

export default function UpdateServiceModal({isOpen, onClose, service} : UpdateServiceModalProps) {
  const fieldsToUse = spaServiceConfig.updatefields
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const formSchema = generateZodSchema(fieldsToUse)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      fieldsToUse.map((field : FieldConfig) => [field.name, ""])
    ),
  })

  const handleSubmit = async (data: any) => {
    const selectedCategory = categories.find(category => category.categoryName === data.categoryName)
    if (selectedCategory) 
      data.categoryId = selectedCategory.categoryId
    data.price = parseFloat(data.price) || 0
    handleUpdateSubmit(service.serviceId ,data)
  }

  useEffect(() => {
    async function fetchCategories() {
      const data = await getAllServiceCategories()
      setCategories(data)
      if (service) {
        Object.keys(service).forEach((key : string) => {
          if (form.getValues(key) !== undefined) {
            if (key === 'price') {
              service[key] = String(service[key])
              form.setValue(key, service[key])
            }
            else if (key === 'categoryId') {
              const categoryName = data.find(category => category.categoryId === service.categoryId)?.categoryId
              form.setValue('categoryId', categoryName || '')
            }
            else 
              form.setValue(key, service[key])
          }
        })
      }

    }
    fetchCategories()
  }, [service, form])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='px-10'>
        <DialogTitle className='flex justify-center'>Update Service</DialogTitle>
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
                              value={form.watch('categoryId') || ''}
                              onValueChange={(value) => {
                                form.setValue('categoryId', value) 
                              }}
                              disabled={field.readonly}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.categoryId} value={category.categoryId}>
                                    {category.categoryName}
                                  </SelectItem>
                                ))}
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