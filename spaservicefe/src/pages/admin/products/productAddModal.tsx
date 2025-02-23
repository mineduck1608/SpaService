import React, { useState, useEffect } from 'react'
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
import { handleCreateSubmit, getAllCosmeticCategories } from './product.util'
import { cosmeticProductConfig } from '../modal.util'
import { CosmeticCategory } from 'src/types/type'

export default function AddProductModal() {
  const [categories, setCategories] = useState<CosmeticCategory[]>([])
  const fieldsToUse = cosmeticProductConfig.fields
  const formSchema = generateZodSchema(fieldsToUse)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      fieldsToUse.map((field: FieldConfig) => {
        if (field.name === 'price' || field.name === 'quantity') return [field.name, 0]
        return [field.name, '']
      })
    ),
  })

  const handleSubmit = async (data: any) => {
    const selectedCategory = categories.find(category => category.categoryName === data.categoryName)
    if (selectedCategory) 
      data.categoryId = selectedCategory.categoryId
    data.price = parseFloat(data.price) || 0
    data.quantity = parseInt(data.quantity) || 0
    data.status = data.status === 'true'
    data.isSelling = data.isSelling === 'true'
    handleCreateSubmit(data)
  }

  useEffect(() => {
    async function fetchCategories() {
      const data = await getAllCosmeticCategories()
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
        <DialogTitle className='flex justify-center'>Create Product</DialogTitle>
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
                            field.name === 'categoryId' ? (
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
                              <Select 
                                onValueChange={formField.onChange} 
                                defaultValue={formField.value}
                                disabled={field.readonly}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value='true'>Active</SelectItem>
                                  <SelectItem value='false'>Locked</SelectItem>
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