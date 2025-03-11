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
import { ToastContainer, toast } from 'react-toastify'
import { getAllCosmeticCategories, handleUpdateSubmit } from './product.util'
import { cosmeticProductConfig } from '../modal.util'
import { CosmeticCategory } from 'src/types/type'
import { storage } from '../../../firebaseConfig'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

interface UpdateProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: any
}

export default function UpdateProductModal({ isOpen, onClose, product }: UpdateProductModalProps) {
  const fieldsToUse = cosmeticProductConfig.updatefields
  const [categories, setCategories] = useState<CosmeticCategory[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(product?.productImage || null)
  const [uploading, setUploading] = useState<boolean>(false)

  const formSchema = generateZodSchema(fieldsToUse)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(fieldsToUse.map((field: FieldConfig) => [field.name, '']))
  })

  useEffect(() => {
    async function fetchCategories() {
      const data = await getAllCosmeticCategories()
      setCategories(data)
      if (product) {
        Object.keys(product).forEach((key: string) => {
          if (form.getValues(key) !== undefined) {
            let value = product[key]
            if (key === 'quantity') value = String(value)
            if (key === 'price') value = String(value)
            if (key === 'status') value = value ? 'true' : 'false'
            if (key === 'isSelling') value = value ? 'true' : 'false'
            form.setValue(key, value)
          }
        })
      }
    }
    fetchCategories()
  }, [product, form])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

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

  const handleSubmit = async (data: any) => {
    let imageUrl = product.productImage

    if (imageFile) {
      try {
        imageUrl = await uploadImage(imageFile)
      } catch (error) {
        return
      }
    }

    const selectedCategory = categories.find((category) => category.categoryName === data.categoryName)
    if (selectedCategory) data.categoryId = selectedCategory.categoryId
    data.price = parseFloat(data.price) || 0
    data.quantity = parseInt(data.quantity) || 0
    data.status = data.status === 'true'
    data.isSelling = data.isSelling === 'true'
    data.image = imageUrl

    console.log('Submitting updated data:', data)
    await handleUpdateSubmit(product.productId, product, data)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='px-10'>
        <DialogTitle className='flex justify-center'>Update Product</DialogTitle>
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
                          field.name === 'categoryId' ? (
                            <Select
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
                            <Select
                              onValueChange={formField.onChange}
                              defaultValue={formField.value}
                              disabled={field.readonly}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value='true'>Yes</SelectItem>
                                <SelectItem value='false'>No</SelectItem>
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
      <ToastContainer />
    </Dialog>
  )
}
