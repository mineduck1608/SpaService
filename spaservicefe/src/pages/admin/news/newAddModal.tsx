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
import { handleCreateSubmit, getAllServiceCategories } from './new.util'
import { newsConfig } from '../modal.util'
import { ServiceCategory } from 'src/types/type'
import { storage } from '../../../firebaseConfig'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { toast } from 'react-toastify'

export default function AddNewsModal() {
  const fieldsToUse = newsConfig.fields
  const [categories, setCategories] = useState<ServiceCategory[]>([])
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

  // Fetch danh mục dịch vụ khi component mount
  useEffect(() => {
    async function fetchCategories() {
      const data = await getAllServiceCategories()
      setCategories(data)
    }
    fetchCategories()
  }, [])

  const handleSubmit = async (data: any) => {
    let imageUrl = ''
    if (imageFile) {
      try {
        imageUrl = await uploadImage(imageFile)
      } catch (error) {
        return
      }
    }
    const selectedCategory = categories.find((category) => category.categoryId === data.categoryId)
    if (selectedCategory) data.categoryId = selectedCategory.categoryId

    // Lấy type từ newsType
    const selectedType = newsTypes.find((type) => type.id === form.watch('newsType'))
    if (selectedType) {
      data.type = selectedType.id
      data.image = imageUrl
    } else {
      console.warn('Invalid newsType:', data.newsType)
      data.type = ''
      data.image = imageUrl
    }
    console.log(data)
    handleCreateSubmit(data)
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
    <Dialog>
      <DialogTrigger>
        <Button variant='outline'>Create</Button>
      </DialogTrigger>
      <DialogContent className='px-10'>
        <DialogTitle className='flex justify-center'>Create News</DialogTitle>
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
                              form.setValue(field.name, value, { shouldValidate: true })
                            }}
                            value={form.watch(field.name)}
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
                        onValueChange={(value) => {
                          form.setValue('newsType', value, { shouldValidate: true })
                        }}
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
                {imagePreview && <img src={imagePreview} alt='Preview' className='h-32 w-32 rounded object-cover' />}
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
