import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../ui/sheet'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom' // For navigation

export function ProfileButton() {
  const navigate = useNavigate()

  // Check if token exists (can be in localStorage or state)
  const token = sessionStorage.getItem('token')

  // Navigate to login page
  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='none' className='flex items-center justify-center'>
          {token ? (
            // If token exists, show the hamburger menu icon
            <FontAwesomeIcon icon={faBars} className='text-2xl' />
          ) : (
            // If token doesn't exist, show the Login button
            <Button variant='login' onClick={handleLoginClick} className='text-lg'>
              Login
            </Button>
          )}
        </Button>
      </SheetTrigger>

      {token && (
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Explore</SheetTitle>
            <SheetDescription>
              We hope you have a rejuvenating experience with our tailored spa treatments, designed to refresh your mind
              and body.
            </SheetDescription>
          </SheetHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input id='name' value='Pedro Duarte' className='col-span-3' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                Username
              </Label>
              <Input id='username' value='@peduarte' className='col-span-3' />
            </div>
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button type='submit'>Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      )}
    </Sheet>
  )
}
