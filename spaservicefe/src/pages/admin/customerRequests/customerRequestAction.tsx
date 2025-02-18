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
import { Account } from '@/types/type'
import { MoreHorizontal } from 'lucide-react'

interface AccountActionsProps {
  account: Account
}

const AccountActions: React.FC<AccountActionsProps> = ({ account }) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const handleConfirmDelete = () => {
    console.log(`Deleting account with id: ${account.accountId}`)
    closeModal()
  }

  const handleUpdate = () => {
    // Redirect to an update page or open a modal for updating the account
    console.log(`Updating account with id: ${account.accountId}`)
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
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(account.accountId)}>
            Copy account ID
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

export default AccountActions
