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
import { getToken } from '../../../types/constants'
import BaseModal from '../baseModal'
import { useToast } from 'src/hooks/use-toast'

interface AccountActionsProps {
  account: Account
}

const AccountActions: React.FC<AccountActionsProps> = ({ account }) => {
  const { toast } = useToast()
  const [isModalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`https://localhost:7205/api/accounts/Delete/${account.accountId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        toast({
          title: "Success!",
          description: 'Delete successfully.'
        })
        window.location.reload()
      } else {
        toast({
          title: "Error",
          description: 'Failed to delete.',
          variant: "destructive"
        })
      }

    } catch (error) {
      console.error('Error deleting account:', error)
    }
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
          <DropdownMenuItem>Update</DropdownMenuItem>
          <DropdownMenuItem>Block</DropdownMenuItem>
          <DropdownMenuItem onClick={openModal}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDeleteModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleConfirmDelete} />
    </>
  )
}

export default AccountActions
