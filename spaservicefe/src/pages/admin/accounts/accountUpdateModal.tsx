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
import { handleUpdateSubmit } from './account.util'
import { accountConfig } from '../modal.util'
import { DatePicker } from 'antd'

interface UpdateAccountModalProps {
  isOpen: boolean
  onClose: () => void
  account: any
}

export default function UpdateAccountModal({isOpen, onClose, account} : UpdateAccountModalProps) {
  const fieldsToUse = accountConfig.updatefields
  const formSchema = generateZodSchema(fieldsToUse)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      fieldsToUse.map((field : FieldConfig) => [field.name, ""])
    ),
  })

  const handleSubmit = async (data: any) => {
    handleUpdateSubmit(account.accountId ,data)
  }

  useEffect(() => {
    if (account) {
      Object.keys(account).forEach((key : string) => {
        if (form.getValues(key) !== undefined) {
          form.setValue(key, account[key])
        }
      })
    }
  }, [account, form])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='px-10'>
        <DialogTitle className='flex justify-center'>Update Account</DialogTitle>
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
                              <SelectItem value='Active'>Active</SelectItem>
                              <SelectItem value='Locked'>Locked</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : field.type === 'datetime-local' ? (
                          <DatePicker
                            step={1800}
                            showTime
                            showHour
                            showMinute
                            showSecond={false}
                            minuteStep={30}
                            className='border-[1px] p-2 w-75'
                          />
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