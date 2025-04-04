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
import { handleUpdateSubmit } from './promotion.util'
import { promotionConfig } from '../modal.util'

interface UpdatePromotionModalProps {
  isOpen: boolean
  onClose: () => void
  promotion: any
}

export default function UpdatePromotionModal({ isOpen, onClose, promotion }: UpdatePromotionModalProps) {
  const fieldsToUse = promotionConfig.updatefields
  const formSchema = generateZodSchema(fieldsToUse)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(fieldsToUse.map((field: FieldConfig) => [field.name, '']))
  })

  const handleSubmit = async (data: any) => {
    data.discountValue = parseFloat(data.discountValue) || 0
    data.isActive = data.isActive === 'true'
    handleUpdateSubmit(promotion.promotionId, data)
  }

  useEffect(() => {
    if (promotion) {
      Object.keys(promotion).forEach((key: string) => {
        if (form.getValues(key) !== undefined) {
          let value = promotion[key]
          if (key === 'discountValue') value = String(value)
          if (key === 'isActive') value = value ? 'true' : 'false'
          form.setValue(key, value)
        }
      })
    }
  }, [promotion, form])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='px-10'>
        <DialogTitle className='flex justify-center'>Update Promotion</DialogTitle>
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
                            onValueChange={formField.onChange}
                            defaultValue={formField.value}
                            disabled={field.readonly}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='true'>Available</SelectItem>
                              <SelectItem value='false'>Unavailable</SelectItem>
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
    </Dialog>
  )
}
