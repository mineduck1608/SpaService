import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '../../../components/ui/dropdown-menu'
import { GuestApplication } from '../../../types/type'
import { MoreHorizontal } from 'lucide-react'
import { handleDelete } from './guestApplication.util'

interface GuestContactActionsProps {
  guestApplication: GuestApplication
}

const GuestApplicationActions: React.FC<GuestContactActionsProps> = ({ guestApplication }) => {

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(guestApplication.guestApplicationId)}>
            Copy Contact ID
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator /> */}
          {/* <DropdownMenuItem onClick={openModal} className='cursor-pointer'>Delete</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <ConfirmDeleteModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleConfirmDelete} /> */}
    </>
  )
}

export default GuestApplicationActions
