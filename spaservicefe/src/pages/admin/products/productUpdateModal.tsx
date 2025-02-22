import React, { useEffect } from 'react'
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
import { handleUpdateSubmit } from './product.util'
import { cosmeticProductConfig } from '../modal.util'

interface UpdateProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: any
}

export default function UpdatePromotionModal({isOpen, onClose, product} : UpdateProductModalProps) {
  const fieldsToUse = cosmeticProductConfig.updatefields
  const formSchema = generateZodSchema(fieldsToUse)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      fieldsToUse.map((field : FieldConfig) => [field.name, ""])
    ),
  })

  const handleSubmit = async (data: any) => {
    data.price = parseFloat(data.price) || 0
    data.status = data.status === "true"
    data.isSelling = data.isSelling === "true"
    handleUpdateSubmit(product.productId ,data)
  }

  useEffect(() => {
    if (product) {
      Object.keys(product).forEach((key : string) => {
        if (form.getValues(key) !== undefined) {
          let value = product[key];

          if (key === "price") value = String(value)
          if (key === "status") value = value ? "true" : "false"
          if (key === "isSelling") value = value ? "true" : "false" 

          form.setValue(key, value)
        }
      })
    }
  }, [product, form])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='px-10'>
        <DialogTitle className='flex justify-center'>Update Product</DialogTitle>
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