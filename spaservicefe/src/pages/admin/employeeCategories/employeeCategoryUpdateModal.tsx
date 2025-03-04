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
import { ToastContainer } from 'react-toastify'
import { handleUpdateSubmit } from './employeeCategory.util'
import { employeeCategoryConfig } from '../modal.util'
import { ServiceCategory, Employee } from 'src/types/type'
import { getAllServiceCategories } from '../servicecategories/servicecategory.util'
import { getAllEmployees } from '../employees/employee.util'

interface UpdateEmployeeCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  employeeCategory: any
}

export default function UpdateEmployeeCategoryModal({ isOpen, onClose, employeeCategory }: UpdateEmployeeCategoryModalProps) {
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const fieldsToUse = employeeCategoryConfig.updatefields
  const formSchema = generateZodSchema(fieldsToUse)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(fieldsToUse.map((field: FieldConfig) => [field.name, '']))
  })

  const handleSubmit = async (data: any) => {
    const selectedCategory = categories.find((category) => category.categoryId === data.categoryId)
    const selectedEmployee = employees.find((employee) => employee.employeeId === data.employeeId)
    if (selectedCategory) data.categoryId = selectedCategory.categoryId
    if (selectedEmployee) data.employeeId = selectedEmployee.employeeId
    handleUpdateSubmit(employeeCategory.employeCategoryId, data)
  }

  useEffect(() => {
    async function fetchData() {
      const data1 = await getAllServiceCategories()
      setCategories(data1)
      const data2 = await getAllEmployees()
      setEmployees(data2)

      if (employeeCategory) {
        Object.keys(employeeCategory).forEach((key: string) => {
          if (form.getValues(key) !== undefined) {
            if (key === 'categoryId') {
              const categoryName = data1.find((category) => category.categoryId === employeeCategory.categoryId)?.categoryId
              form.setValue('categoryId', categoryName || '')
            } else if (key === 'employeeId') {
              const employeeName = data2.find((employee) => employee.employeeId === employeeCategory.employeeId)?.employeeId
              form.setValue('employeeId', employeeName || '')
            } else form.setValue(key, employeeCategory[key])
          }
        })
      }
    }
    fetchData()
  }, [employeeCategory, form])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='px-10'>
        <DialogTitle className='flex justify-center'>Update Employee Category</DialogTitle>
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
                        {field.name === 'categoryId' ? (
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
                          <Select
                            value={form.watch('employeeId') || ''}
                            onValueChange={(value) => form.setValue('employeeId', value)}
                            disabled={field.readonly}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {employees.map((employee) => (
                                <SelectItem key={employee.employeeId} value={employee.employeeId}>
                                  {employee.fullName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
      <ToastContainer />
    </Dialog>
  )
}
