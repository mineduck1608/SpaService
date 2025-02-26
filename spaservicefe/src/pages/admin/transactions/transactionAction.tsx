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
import { TransactionBase } from '@/types/type'
import { MoreHorizontal } from 'lucide-react'
import { ToastContainer } from 'react-toastify'
import { handleDelete } from './transaction.util'
import UpdateTransactionModal from './transactionUpdateModal'

interface TransactionActionsProps {
  transaction: TransactionBase
}

const TransactionActions: React.FC<TransactionActionsProps> = ({ transaction }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)

  const openDeleteModal = () => setDeleteModalOpen(true)
  const closeDeleteModal = () => setDeleteModalOpen(false)

  const openUpdateModal = () => setUpdateModalOpen(true)
  const closeUpdateModal = () => setUpdateModalOpen(false)

  const handleConfirmDelete = async () => {
    handleDelete(transaction.transactionId)
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
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(transaction.transactionId)} className='cursor-pointer'>
            Copy transaction ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='cursor-pointer'>View Detail</DropdownMenuItem>
          <DropdownMenuItem onClick={openUpdateModal} className='cursor-pointer'>Update</DropdownMenuItem>
          {/* <DropdownMenuItem onClick={openDeleteModal} className='cursor-pointer'>Delete</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
      <ToastContainer />
      <UpdateTransactionModal isOpen={isUpdateModalOpen} onClose={closeUpdateModal} transaction={transaction} />
      {/* <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={handleConfirmDelete} /> */}
    </>
  )
}

export default TransactionActions
