import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../../../components/ui/dropdown-menu'
import { ConfirmDeleteModal } from '../components/deleteModal'
import { Contact } from '../../../types/type' // Updated to Contact type
import { MoreHorizontal } from 'lucide-react'

interface ContactActionsProps {
  contact: Contact
}

const ContactActions: React.FC<ContactActionsProps> = ({ contact }) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const handleConfirmDelete = () => {
    console.log(`Deleting contact with ID: ${contact.contactId}`)
    closeModal()
  }

  const handleUpdate = () => {
    // Redirect to an update page or open a modal for updating the contact
    console.log(`Updating contact with ID: ${contact.contactId}`)
  }

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
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(contact.contactId)}>
            Copy Contact ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleUpdate}>Update</DropdownMenuItem> {/* Update action */}
          <DropdownMenuItem onClick={openModal}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDeleteModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleConfirmDelete} />
    </>
  )
}

export default ContactActions
