import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { jwtDecode } from 'jwt-decode' // Use this to decode the token
import { Button } from '../../../components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import { handleCreateSubmit } from './application.util' // Import your function to handle submission
import { getToken } from '../../../types/constants'
import { ToastContainer } from 'react-toastify'


const formSchema = z.object({
  content: z.string().min(2, {
    message: 'Content must be at least 2 characters.'
  })
})

export function ApplicationForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: ''
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Get the token and decode it to extract the userId
      const token = getToken()
      if (!token) {
        throw new Error('Token is null or undefined.')
      }
      const decodedToken: any = jwtDecode(token)
      const accountId = decodedToken?.UserId

      if (!accountId) {
        throw new Error('Failed to extract userId from token.')
      }

      // Add userId to the form values
      const dataToSubmit = {
        ...values,
        accountId
      }

      // Call your handleCreateSubmit function
      await handleCreateSubmit(dataToSubmit)
    } catch (e) {
      console.error('Error submitting form:', e)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Content</FormLabel>
              <FormControl>
                <Input placeholder='Input your content here...' {...field} />
              </FormControl>
              <FormDescription>This is your message.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
      <ToastContainer/>
    </Form>
  )
}
