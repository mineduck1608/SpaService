import { useState } from 'react'
import { SpaRequest, TransactionBase } from '@/types/type' // Đổi từ Account sang Request
import { DetailModal } from './detailModal'

interface RequestActionsProps {
  request: TransactionBase // Cập nhật type từ Account thành Request
}

const Details: React.FC<RequestActionsProps> = ({ request }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const closeModal = () => setModalOpen(false)

  const handleConfirmDelete = () => {
    closeModal()
  }

  return (
    <div>
      <button
        className='rounded-md bg-purple1 p-2 text-white'
        onClick={(e) => {
          setModalOpen(true)
        }}
      >
        View Detail
      </button>
      <DetailModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleConfirmDelete} data={request} />
    </div>
  )
}

export default Details
