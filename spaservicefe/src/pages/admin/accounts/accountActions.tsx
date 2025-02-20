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
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)

  const openUpdateModal = () => setUpdateModalOpen(true)
  const closeUpdateModal = () => setUpdateModalOpen(false)

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
          <DropdownMenuItem onClick={openUpdateModal} className='cursor-pointer'>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openUpdateModal} className='cursor-pointer'>
            Block
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <BaseModal 
        isOpen={isUpdateModalOpen} 
        onClose={closeUpdateModal} 
        entity='Customer' 
        type='Update' 
        rowData={account}
      />
    </>
  )
}

export default AccountActions
