import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent } from 'src/components/ui/dialog'
import { Service } from '@/types/services'
import { IoIosStar } from 'react-icons/io'
import { getFeedbackByServiceAndCus, handleUpdateSubmit } from '../serviceDetailPage/detailPage.util'
import { getCustomerIdByAcc } from '../checkout/checkoutPage.util'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  service?: Service
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
          className='focus:outline-none p-1'
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(null)}
          onClick={() => onChange(star)}
        >
          <IoIosStar
            size={32}
            color={star <= (hoverValue || value) ? '#FFD700' : '#D1D5DB'}
          />
        </button>
      ))}
    </div>
  )
}

export default function UpdateFeedbackModal({ isOpen, onClose, service }: FeedbackModalProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [feedbackId, setFeedbackId] = useState<string | null>(null)

  async function handleSubmit (e: React.FormEvent) {
    e.preventDefault()
    const customerId = await getCustomerIdByAcc()
    const feedbackData = {
      feedbackId: feedbackId,
      feedbackMessage: comment,
      rating: rating,
      createdBy: customerId,
      serviceId: service?.serviceId
    }

    console.log(feedbackData)
    handleUpdateSubmit(feedbackData)
  }

  useEffect(() => {
    const fetchFeedback = async () => {
      const data = {
        createdBy: await getCustomerIdByAcc(),
        serviceId: service?.serviceId
      }
      const previousData = await getFeedbackByServiceAndCus(data)
      if (isOpen && previousData) {
        setRating(previousData.rating)
        setComment(previousData.feedbackMessage)
        setFeedbackId(previousData.feedbackId)
      }
    }
    fetchFeedback()
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white border-none shadow-none max-w-lg w-auto mx-auto px-12 font-montserrat'>
        <div className='max-w-md mx-auto p-6'>
          <h2 className='text-2xl font-bold text-center mb-6'>How was your experience?</h2>
          <div className='flex justify-center mb-6'>
            <StarRating value={rating} onChange={setRating} />
          </div>
          <h3 className='text-xl text-center mb-8 -mt-3'>
            {rating > 0 ? 'Thank You!' : ''}
          </h3>
          <div className='mb-4'>
            <label htmlFor='comment' className='block text-lg font-medium mb-2'>Comment</label>
            <textarea
              id='comment'
              rows={5}
              className='w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div className='flex justify-center'>
            <button
              type='button'
              onClick={handleSubmit}
              disabled={rating === 0}
              className={`w-1/2 py-2 text-md font-semibold rounded-md transition-colors ${
                rating > 0
                  ? 'bg-yellow-400 hover:bg-yellow-600 text-black'
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
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
