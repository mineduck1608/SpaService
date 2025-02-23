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
import { ToastContainer } from 'react-toastify' 
import { handleUpdateSubmit, getAllRoles } from './account.util'
import { accountConfig } from '../modal.util'

interface UpdateAccountModalProps {
  isOpen: boolean
  onClose: () => void
  account: any
}

export default function UpdateAccountModal({isOpen, onClose, account} : UpdateAccountModalProps) {
  const fieldsToUse = accountConfig.updatefields
  const formSchema = generateZodSchema(fieldsToUse)
  const [roles, setRoles] = useState<{ roleId: string, roleName: string }[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      fieldsToUse.map((field : FieldConfig) => [field.name, ""])
    )
  })

  const handleSubmit = async (data: any) => {
    const selectedRole = roles.find(role => role.roleName === data.role)
    if (selectedRole) 
      data.role = selectedRole.roleId
    data.status = data.status === 'Active'
    handleUpdateSubmit(account.accountId ,data)
  }

  useEffect(() => {
    async function fetchRoles() {
      const data = await getAllRoles()
      setRoles(data)
      if (account) {
        Object.keys(account).forEach((key: string) => {
          if (form.getValues(key) !== undefined) {
            if (key === 'roleId') {
              const roleName = data.find(role => role.roleId === account.roleId)?.roleId
              form.setValue('roleId', roleName || '')
            }
            else if (key === 'status') 
              form.setValue('status', account.status ? 'Active' : 'Locked')
            else 
              form.setValue(key, account[key])
          }
        })
      }
    }
  
    fetchRoles()
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
                            field.name === 'roleId' ? (
                              <Select
                                value={form.watch('roleId') || ''}
                                onValueChange={(value) => {
                                  form.setValue('roleId', value) 
                                }}
                                disabled={field.readonly}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                                </SelectTrigger>
                                <SelectContent>
                                  {roles.map((role) => (
                                    <SelectItem key={role.roleId} value={role.roleId}>
                                      {role.roleName}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Select
                                value={form.watch('status') || ''}
                                onValueChange={(value) => form.setValue('status', value)}
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
                          )) : (
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