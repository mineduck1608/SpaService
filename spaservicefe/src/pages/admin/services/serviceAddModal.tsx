import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from 'src/components/ui/dialog'
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
import { handleCreateSubmit } from './service.util'
import { getAllServiceCategories } from '../servicecategories/servicecategory.util'
import { spaServiceConfig } from '../modal.util'
import { ServiceCategory } from 'src/types/type'

export default function AddServiceModal() {
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const fieldsToUse = spaServiceConfig.fields
  const formSchema = generateZodSchema(fieldsToUse)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      fieldsToUse.map((field: FieldConfig) => {
        if (field.name === 'price') return [field.name, '0']
        return [field.name, '']
      })
    )
  })

  const handleSubmit = async (data: any) => {
    const selectedCategory = categories.find((category) => category.categoryName === data.categoryName)
    if (selectedCategory) data.categoryId = selectedCategory.categoryId
    data.price = parseFloat(data.price) || 0
    handleCreateSubmit(data)
  }

  useEffect(() => {
    async function fetchCategories() {
      const data = await getAllServiceCategories()
      setCategories(data)
    }
    fetchCategories()
  }, [form])

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant='outline'>Create</Button>
      </DialogTrigger>
      <DialogContent className='px-10'>
        <DialogTitle className='flex justify-center'>Create Service</DialogTitle>
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
