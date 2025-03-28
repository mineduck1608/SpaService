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
import { handleUpdateSubmit, getAllServiceCategories } from './new.util'
import { newsConfig } from '../modal.util'
import { ServiceCategory } from 'src/types/type'
import { storage } from '../../../firebaseConfig'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { toast } from 'react-toastify'

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

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState<boolean>(false) // Trạng thái upload ảnh

  // Danh sách loại tin tức
  const newsTypes = [
    { id: 'Event', name: 'Event' },
    { id: 'Promotion', name: 'Promotion' },
    { id: 'Blog', name: 'Blog' }
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
        newsType: news.type || ''
      })
      setImagePreview(news.image || null)
    }
  }, [news, categories, form])

  const handleSubmit = async (data: any) => {
    let imageUrl = news?.image || ''
    if (imageFile) {
      try {
        imageUrl = await uploadImage(imageFile)
      } catch (error) {
        return
      }
    }
    const selectedCategory = categories.find((category) => category.categoryId === data.categoryId)
    if (selectedCategory) {
      data.categoryId = selectedCategory.categoryId
    }

    // Cập nhật newsType
    const selectedType = newsTypes.find((type) => type.id === form.watch('newsType'))
    if (selectedType) {
      data.type = selectedType.id
      data.image = imageUrl
    } else {
      console.warn('Invalid newsType:', form.watch('newsType'))
      data.type = ''
    }
    console.log(data)
    await handleUpdateSubmit(news.newsId, data)
    onClose()
  }

  // Xử lý chọn ảnh và tạo preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  // Xử lý upload ảnh lên Firebase Storage
  const uploadImage = async (file: File) => {
    return new Promise<string>((resolve, reject) => {
      setUploading(true)
      const storageRef = ref(storage, `cosmetic-products/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`Upload is ${progress}% done`)
        },
        (error) => {
          setUploading(false)
          toast.error('Image upload failed')
          reject(error)
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          setUploading(false)
          resolve(downloadURL)
        }
      )
    })
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
                                <SelectItem disabled value=''>
                                  Loading...
                                </SelectItem>
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

            {/* Thêm phần Upload Image */}
            <FormItem className='mt-2 grid grid-cols-4 items-center gap-4'>
              <FormLabel className='text-md text-right'>Upload Image</FormLabel>
              <div className='col-span-3 space-y-2'>
                <input type='file' accept='image/*' onChange={handleImageChange} />
                {imagePreview && <img src={imagePreview} alt='Preview' className='h-20 w-40 rounded object-cover' />}
              </div>
            </FormItem>

            <div className='mt-10 flex justify-end'>
              <Button type='submit' disabled={uploading}>
                {uploading ? 'Uploading...' : 'Submit'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
