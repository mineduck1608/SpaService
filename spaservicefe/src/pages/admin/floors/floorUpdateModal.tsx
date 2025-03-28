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
import { handleUpdateSubmit } from './floor.util'
import { floorConfig } from '../modal.util'
import { getAllServiceCategories } from '../servicecategories/servicecategory.util'
import { ServiceCategory } from 'src/types/type'

interface UpdateFloorModalProps {
  isOpen: boolean
  onClose: () => void
  floor: any
}

export default function UpdateFloorModal({ isOpen, onClose, floor }: UpdateFloorModalProps) {
  const fieldsToUse = floorConfig.updatefields
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const formSchema = generateZodSchema(fieldsToUse)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(fieldsToUse.map((field: FieldConfig) => [field.name, '']))
  })

  const handleSubmit = async (data: any) => {
    const selectedCategory = categories.find((category) => category.categoryName === data.categoryName)
    if (selectedCategory) data.categoryId = selectedCategory.categoryId
    data.floorNum = parseInt(data.floorNum) || 0
    handleUpdateSubmit(floor.floorId, data)
  }

  useEffect(() => {
    async function fetchCategories() {
      const data = await getAllServiceCategories()
      setCategories(data)
      if (floor) {
        Object.keys(floor).forEach((key: string) => {
          if (form.getValues(key) !== undefined) {
            if (key === 'floorNum') {
              floor[key] = String(floor[key])
              form.setValue(key, floor[key])
            } else if (key === 'categoryId') {
              const categoryName = data.find((category) => category.categoryId === floor.categoryId)?.categoryId
              form.setValue('categoryId', categoryName || '')
            } else form.setValue(key, floor[key])
          }
        })
      }
    }
    fetchCategories()
  }, [floor, form])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='px-10'>
        <DialogTitle className='flex justify-center'>Update Floor</DialogTitle>
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
    </Dialog>
  )
}
