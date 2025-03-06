import React, { useState } from 'react'
import { Dialog, DialogContent } from 'src/components/ui/dialog'
import { Service } from '@/types/services'
import { IoIosStar } from 'react-icons/io'
import { handleCreateSubmit } from '../serviceDetailPage/detailPage.util'
import { getCustomerIdByAcc } from '../checkout/checkoutPage.util'
import { Appointment } from '@/types/type'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  appointment?: Appointment
}

type StarRatingProps = {
  value: number
  onChange: (rating: number) => void
}

const StarRating: React.FC<StarRatingProps> = ({ value, onChange }) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null)

  return (
    <div className='flex'>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type='button'
          className='p-1 focus:outline-none'
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(null)}
          onClick={() => onChange(star)}
        >
          <IoIosStar size={32} color={star <= (hoverValue || value) ? '#FFD700' : '#D1D5DB'} />
        </button>
      ))}
    </div>
  )
}

export default function FeedbackModal({ isOpen, onClose, appointment }: FeedbackModalProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const customerId = sessionStorage.getItem('customerId')
    const feedbackData = {
      feedbackMessage: comment,
      rating: rating,
      createdBy: customerId,
      serviceId: appointment?.service?.serviceId,
      appointmentId: appointment?.appointmentId
    }
    handleCreateSubmit(feedbackData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='mx-auto w-auto max-w-lg border-none bg-white px-12 font-montserrat shadow-none'>
        <div className='mx-auto max-w-md p-6'>
          <h2 className='mb-6 text-center text-2xl font-bold'>How was your experience?</h2>
          <div className='mb-6 flex justify-center'>
            <StarRating value={rating} onChange={setRating} />
          </div>
          <h3 className='-mt-3 mb-8 text-center text-xl'>{rating > 0 ? 'Thank You!' : ''}</h3>
          <div className='mb-4'>
            <label htmlFor='comment' className='mb-2 block text-lg font-medium'>
              Comment
            </label>
            <textarea
              id='comment'
              rows={5}
              className='w-full rounded-md border border-gray-600 p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div className='flex justify-center'>
            <button
              type='button'
              onClick={handleSubmit}
              disabled={rating === 0}
              className={`text-md w-1/2 rounded-md py-2 font-semibold transition-colors ${
                rating > 0
                  ? 'bg-yellow-400 text-black hover:bg-yellow-600'
                  : 'cursor-not-allowed bg-gray-300 text-gray-500'
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
