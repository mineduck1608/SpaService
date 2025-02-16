import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from 'src/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
  
type FieldConfig = {
  name: string,
  label: string,
  placeholder?: string,
  type: string,
  required?: boolean,
  minLength?: number,
  maxLength?: number,

}

type ApiConfig = {
  create: string,
  update: string,
  delete: string
}

const generateZodSchema = (config: {entityName: string, fields: FieldConfig[]}) => {
  const schemaObject: Record<string, any> = {}
  config.fields.forEach((field) => {
    let fieldSchema = z.string()
    
    switch (field.type) {
      case 'number':
        break
      case 'tel':
        fieldSchema = z.string().regex(/^[0-9]{10}$/, 'Please enter a valid phone number')
        break
      case 'email':
        fieldSchema = z.string().email('Please enter a valid email')
        break
      default:
        fieldSchema = z.string()
        if (field.minLength) fieldSchema = fieldSchema.min(field.minLength, `Must be at least ${field.minLength} characters`)
        if (field.maxLength) fieldSchema = fieldSchema.max(field.maxLength, `Must be less than ${field.maxLength} characters`)
    }
    schemaObject[field.name] = field.required ? fieldSchema : fieldSchema.optional()
  })
  return z.object(schemaObject)
}

export const BaseForm = ({ config, type } : {config: {entityName: string, fields: FieldConfig[], api: ApiConfig}; type: 'Create' | 'Update'}) => {
  const formSchema = generateZodSchema(config)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      config.fields.map((field) => [field.name, ""])
    ),
  })
  const handleSubmit = async (data: any) => {
    try {
      if (type === 'Create') {
        const response = await fetch('https://localhost:7205/' + config.api.create, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        // if (response.ok) {
        //   toast.success('Thank you for your message.')
              
        // } else {
        //   toast.error('Failed! Please try again.')
        // }
      } else if (type === 'Update') {
        // const response = await fetch('https://localhost:7205/' + config.api.update, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data)
        // })
        // if (response.ok) {
        //   toast.success('Thank you for your message.')
              
        // } else {
        //   toast.error('Failed! Please try again.')
        // }
      }
    } catch (error) {
      console.error('Form submitted error: ', error)
    }
  }
    
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
        {config.fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem >
                <FormLabel className='text-[1.1rem]'>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    {...formField}
                    type={field.type}
                    placeholder={field.placeholder}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className='flex justify-end'>
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </Form>
  )
}
