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
import { handleUpdateSubmit } from './service.util'
import { getAllServiceCategories } from '../servicecategories/servicecategory.util'
import { spaServiceConfig } from '../modal.util'
import { ServiceCategory } from 'src/types/type'
import { storage } from '../../../firebaseConfig'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'

interface UpdateServiceModalProps {
  isOpen: boolean
  onClose: () => void
  service: any
}

export default function UpdateServiceModal({ isOpen, onClose, service }: UpdateServiceModalProps) {
  const fieldsToUse = spaServiceConfig.updatefields
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(service?.serviceImage || null)
  const [uploading, setUploading] = useState<boolean>(false)
  const [duration, setDuration] = useState<string | null>(service?.duration || '00:30')

  const formSchema = generateZodSchema(fieldsToUse)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(fieldsToUse.map((field: FieldConfig) => [field.name, '']))
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (data: any) => {
    let imageUrl = service?.serviceImage || ''

    if (imageFile) {
      setUploading(true)
      const storageRef = ref(storage, `spaservices/${imageFile.name}`)
      const uploadTask = uploadBytesResumable(storageRef, imageFile)

      try {
        await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            null,
            (error) => reject(error),
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref)
              resolve(imageUrl)
            }
          )
        })
      } catch (error) {
        toast.error('Image upload failed')
        setUploading(false)
        return
      }
    }

    const selectedCategory = categories.find((category) => category.categoryName === data.categoryName)
    if (selectedCategory) data.categoryId = selectedCategory.categoryId
    data.price = parseFloat(data.price) || 0
    data.serviceImage = imageUrl
    data.duration = duration

    console.log('Updating Data:', data)
    await handleUpdateSubmit(service.serviceId, data)
    setUploading(false)
  }

  useEffect(() => {
    async function fetchCategories() {
      const data = await getAllServiceCategories()
      setCategories(data)
      if (service) {
        Object.keys(service).forEach((key: string) => {
          if (form.getValues(key) !== undefined) {
            if (key === 'price') {
              form.setValue(key, String(service[key]))
            } else if (key === 'categoryId') {
              const categoryName = data.find((category) => category.categoryId === service.categoryId)?.categoryId
              form.setValue('categoryId', categoryName || '')
            } else {
              form.setValue(key, service[key])
            }
          }
        })
        setDuration(service?.duration || '00:30')
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

            {/* Time Picker (Update Duration) */}
            <FormItem className='mt-2 grid grid-cols-4 items-center gap-4'>
              <FormLabel className='text-md text-right'>Update Duration</FormLabel>
              <div className='col-span-3'>
                <TimePicker onChange={setDuration} value={duration} disableClock format='HH:mm' clearIcon={null} />
              </div>
            </FormItem>

            {/* Input chọn ảnh */}
            <FormItem className='mt-2 grid grid-cols-4 items-center gap-4'>
              <FormLabel className='text-md text-right'>Update Image</FormLabel>
              <div className='col-span-3 space-y-2'>
                <input type='file' accept='image/*' onChange={handleImageChange} className='' />
                {imagePreview && <img src={imagePreview} alt='Preview' className='h-32 w-32 rounded object-cover' />}
              </div>
            </FormItem>

            <div className='mt-10 flex justify-end'>
              <Button type='submit' disabled={uploading}>
                {uploading ? 'Updating...' : 'Submit'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}