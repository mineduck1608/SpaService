import React, { useEffect } from 'react'
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
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { ToastContainer } from 'react-toastify'
import { handleUpdateSubmit } from './new.util'
import { newsConfig } from '../modal.util'
import { DatePicker } from 'antd'

interface UpdateNewsModalProps {
  isOpen: boolean
  onClose: () => void
  news: any
}

export default function UpdateNewsModal({ isOpen, onClose, news }: UpdateNewsModalProps) {
  const fieldsToUse = newsConfig.updatefields
  const formSchema = generateZodSchema(fieldsToUse)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(fieldsToUse.map((field: FieldConfig) => [field.name, '']))
  })

  const handleSubmit = async (data: any) => {
    handleUpdateSubmit(news.newsId, data)
  }

  useEffect(() => {
    if (news) {
      Object.keys(news).forEach((key: string) => {
        if (form.getValues(key) !== undefined) {
          form.setValue(key, news[key])
        }
      })
    }
  }, [news, form])

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
                        <Input
                          {...formField}
                          type={field.type}
                          placeholder={field.placeholder}
                          disabled={field.readonly}
                        />
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
