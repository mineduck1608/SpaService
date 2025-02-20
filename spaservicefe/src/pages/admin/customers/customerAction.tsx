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
import { Customer } from '@/types/type'
import { MoreHorizontal } from 'lucide-react'
import BaseModal from '../baseModal'
import { getToken } from '../../../types/constants'
import { useToast } from 'src/hooks/use-toast'

interface CustomerActionsProps {
  customer: Customer
}

const CustomerActions: React.FC<CustomerActionsProps> = ({ customer }) => {
  const { toast } = useToast()
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)

  const openDeleteModal = () => setDeleteModalOpen(true)
  const closeDeleteModal = () => setDeleteModalOpen(false)

  const openUpdateModal = () => setUpdateModalOpen(true)
  const closeUpdateModal = () => setUpdateModalOpen(false)

  const handleConfirmDelete = async () => {
    console.log(`Deleting customer with id: ${customer.customerId}`)
    try {
      const response = await fetch(`https://localhost:7205/api/customers/Delete/${customer.customerId}`, {
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
    closeDeleteModal()
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
          <DropdownMenuItem 
            onClick={() => navigator.clipboard.writeText(customer.customerId)} 
            className='cursor-pointer'>
            Copy customer ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={openUpdateModal} className='cursor-pointer'>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openDeleteModal} className='cursor-pointer'>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <BaseModal 
        isOpen={isUpdateModalOpen} 
        onClose={closeUpdateModal} 
        entity='Customer' 
        type='Update' 
        rowData={customer}
      />
      
      <ConfirmDeleteModal 
        isOpen={isDeleteModalOpen} 
        onClose={closeDeleteModal} 
        onConfirm={handleConfirmDelete} 
      />
    </>
  )
}

export default CustomerActions
