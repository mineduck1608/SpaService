import { useState, useEffect } from 'react'
import { Appointment, SpaRequest } from '@/types/type'
import { DetailModal } from './detailModal'
import { getCustomerIdByAcc } from '../checkout/checkoutPage.util'
import { hasSendFeedback } from '../serviceDetailPage/detailPage.util'
import FeedbackModal from './feedbackModal'
import UpdateFeedbackModal from './updateFeedbackModal'
import { Service } from '@/types/services'

interface RequestActionsProps {
  request: Appointment
  isPast: boolean
}

const Details: React.FC<RequestActionsProps> = ({ request, isPast }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false)
  const [isUpdateFeedbackModalOpen, setUpdateFeedbackModalOpen] = useState(false)
  const [hasFeedback, setHasFeedback] = useState<boolean>(false)
  const openUpdateFeedbackModal = () => setUpdateFeedbackModalOpen(true)
  const closeUpdateFeedbackModal = () => setUpdateFeedbackModalOpen(false)
  const openFeedbackModal = () => setFeedbackModalOpen(true)
  const closeFeedbackModal = () => setFeedbackModalOpen(false)
  const closeModal = () => setModalOpen(false)

  useEffect(() => {
    const checkEligibility = async () => {
      const customerId = await getCustomerIdByAcc()
      if (customerId && request.appointmentId) {
        const feedbackExists = await hasSendFeedback(request.appointmentId)
        console.log("This feedback exists: ",feedbackExists)
        setHasFeedback(feedbackExists)
      }
    }
    checkEligibility()
  }, [request.appointmentId])

  return (
    <div>
      {!isPast && (
        <>
          <button className='rounded-md bg-purple1 p-2 text-white cursor-pointer' onClick={() => setModalOpen(true)}>
            View Detail
          </button>
          <DetailModal isOpen={isModalOpen} onClose={closeModal} onConfirm={closeModal} data={request}
          />
        </>
      )}
      {isPast && (
        <>
          {!hasFeedback ? (
            <>
              <button onClick={openFeedbackModal} className='rounded-md bg-purple1 p-1.5 text-white cursor-pointer'>
                Leave a Review
              </button>
              <FeedbackModal isOpen={isFeedbackModalOpen} onClose={closeFeedbackModal} appointment={request}/>
            </>
          ) : (
            <>
              <button onClick={openUpdateFeedbackModal} className='rounded-md bg-purple1 p-1.5 text-white cursor-pointer'>
                Update Review
              </button>
              <UpdateFeedbackModal isOpen={isUpdateFeedbackModalOpen} onClose={closeUpdateFeedbackModal} appointment={request} />
            </>
          )}
        </>
      )}
    </div>
  )
}
export default Details
