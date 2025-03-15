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
import { handleUpdateSubmit, getAllServiceCategories } from './new.util'
import { newsConfig } from '../modal.util'
import { ServiceCategory } from 'src/types/type'

interface UpdateNewsModalProps {
  isOpen: boolean
  onClose: () => void
  news: any
}

export default function UpdateNewsModal({ isOpen, onClose, news }: UpdateNewsModalProps) {
  const fieldsToUse = newsConfig.updatefields
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const formSchema = generateZodSchema(fieldsToUse)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(fieldsToUse.map((field: FieldConfig) => [field.name, '']))
  })

  // Danh sách loại tin tức
  const newsTypes = [
    { id: 'Event', name: 'Event' },
    { id: 'Promotion', name: 'Promotion' },
    { id: 'Blog', name: 'Blog' },
  ]

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getAllServiceCategories()
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    if (news && categories.length > 0) {
      form.reset({
        ...news,
        categoryId: categories.find((c) => c.categoryId === news.categoryId)?.categoryId || '',
        newsType: news.type || '',
      })
    }
  }, [news, categories, form])

  const handleSubmit = async (data: any) => {
    const selectedCategory = categories.find((category) => category.categoryId === data.categoryId)
    if (selectedCategory) {
      data.categoryId = selectedCategory.categoryId
    }

    // Cập nhật newsType
    const selectedType = newsTypes.find((type) => type.id === form.watch('newsType'))
    if (selectedType) {
      data.type = selectedType.id
    } else {
      console.warn('Invalid newsType:', form.watch('newsType'))
      data.type = ''
    }
  console.log(data)
    await handleUpdateSubmit(news.newsId, data)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='px-10'>
        <DialogTitle className='flex justify-center'>Update News</DialogTitle>
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
                            value={form.watch('categoryId') || ''}
                            onValueChange={(value) => form.setValue('categoryId', value)}
                            disabled={field.readonly}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {isLoading ? (
                                <SelectItem disabled value="">Loading...</SelectItem>
                              ) : (
                                categories.map((category) => (
                                  <SelectItem key={category.categoryId} value={category.categoryId}>
                                    {category.categoryName}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input {...formField} type={field.type} placeholder={field.placeholder} disabled={field.readonly} />
                        )}
                      </FormControl>
                      <FormMessage className='text-sm' />
                    </div>
                  </FormItem>
                )}
              />
            ))}

            {/* Select News Type */}
            <FormField
              control={form.control}
              name='newsType'
              render={({ field }) => (
                <FormItem className='mt-2 grid grid-cols-4 items-center gap-4'>
                  <FormLabel className='text-md text-right'>News Type</FormLabel>
                  <div className='col-span-3 space-y-1'>
                    <FormControl>
                      <Select
                        onValueChange={(value) => form.setValue('newsType', value, { shouldValidate: true })}
                        value={form.watch('newsType')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select News Type' />
                        </SelectTrigger>
                        <SelectContent>
                          {newsTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className='text-sm' />
                  </div>
                </FormItem>
              )}
            />

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
