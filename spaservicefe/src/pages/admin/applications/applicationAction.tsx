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
import { Application } from '@/types/type'
import { MoreHorizontal } from 'lucide-react'
import UpdateApplicationModal from './applicationUpdateModal'

interface ApplicationActionsProps {
  application: Application
}

const ApplicationActions: React.FC<ApplicationActionsProps> = ({ application }) => {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)

  const openUpdateModal = () => setUpdateModalOpen(true)
  const closeUpdateModal = () => setUpdateModalOpen(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(application.applicationId)}>
            Copy application ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={openUpdateModal} className='cursor-pointer'>
            Update
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateApplicationModal isOpen={isUpdateModalOpen} onClose={closeUpdateModal} application={application} />
    </>
  )
}

export default ApplicationActions
