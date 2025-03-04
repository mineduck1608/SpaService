import React, { useState, useEffect } from 'react'
import { Feedback, Customer } from '@/types/type'
import { getAllFeedbacks } from '../admin/feedbacks/feedback.util'
import { Service } from '@/types/services'
import { IoIosStar } from 'react-icons/io'
import avatar from 'src/images/user/male.png'

interface FeedbackProps {
  service?: Service
}

const FeedbackSection = ({ service }: FeedbackProps) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({ average: 0, counts: [0, 0, 0, 0, 0], total: 0 })
  const [visibleCount, setVisibleCount] = useState(2)

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, feedbacks.length))
  }

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const selectedService = await getAllFeedbacks()
        const filteredFeedbacks = selectedService.filter(
          (feedback) => feedback.serviceId === service.serviceId || feedback.serviceId === service.serviceId
        )

        if (filteredFeedbacks.length > 0) {
          const counts = [0, 0, 0, 0, 0]
          let sum = 0

          filteredFeedbacks.forEach((feedback) => {
            const rating = feedback.rating
            counts[rating - 1]++
            sum += rating
          })

          setStats({
            average: Number((sum / filteredFeedbacks.length).toFixed(1)),
            counts,
            total: filteredFeedbacks.length
          })
        }
        setFeedbacks(filteredFeedbacks)
      } catch (err) {
        setError("Can't load the data.")
      } finally {
        setLoading(false)
      }
    }
    fetchFeedbacks()
  }, [])

  if (loading) return <div className='flex items-center justify-center w-full h-full'>Loading...</div>
  if (error) return <div className='flex items-center justify-center w-full h-full'>{error}</div>

  return (
    <div className='max-w-3xl mx-auto p-4'>
      <div className='bg-white rounded-lg shadow p-6 mb-8'>
        <div className='flex items-center'>
          <div className='mr-6'>
            <div className='text-5xl font-bold text-gray-800'>{stats.average}</div>
            <div className='flex text-yellow-400 mt-1'>
              {[...Array(5)].map((_, i) => (
                <IoIosStar key={i} className='w-4 h-4' fill='currentColor' />
              ))}
            </div>
            <div className='text-sm text-gray-500 mt-1'>({stats.total} Reviews)</div>
          </div>
          <div className='flex-1'>
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className='flex items-center mb-1'>
                <span className='w-4 text-gray-600 mr-2'>{rating}</span>
                <span className='text-yellow-400 mr-2'>★</span>
                <div className='flex-1 h-3 bg-gray-200 rounded-full overflow-hidden'>
                  <div
                    className='h-full bg-yellow-400 rounded-full'
                    style={{
                      width: `${stats.total ? (stats.counts[rating - 1] / stats.total) * 100 : 0}%`
                    }}
                  ></div>
                </div>
                <span className='ml-2 text-gray-600 w-6 text-right'>{stats.counts[rating - 1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 className='text-xl font-semibold mb-4'>Reviews</h2>

      <div className='space-y-6'>
        {feedbacks.slice(0, visibleCount).map((feedback) => (
          <div key={feedback.feedbackId} className='bg-white rounded-lg shadow p-6'>
            <div className='flex items-start mb-4'>
              <div className='mr-4'>
                <div className='w-12 h-12 rounded-full bg-gray-200 overflow-hidden'>
                  <div className='w-full h-full flex items-center justify-center bg-gray-200'>
                    <img src={avatar} className='w-full h-full object-cover' />
                  </div>
                </div>
              </div>
              <div className='flex-1'>
                <div className='flex items-center'>
                  <div className='font-medium'>{feedback.createdByNavigation?.fullName || '?'}</div>
                  <div className='text-sm text-gray-500 ml-2'>{new Date(feedback.createdAt).toLocaleDateString()}</div>
                </div>
                <div className='flex items-center'>
                  {[...Array(5)].map((_, i) => (
                    <IoIosStar
                      key={i}
                      className={`w-4 h-4 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <div className='text-gray-600 italic mt-1'>"{feedback.feedbackMessage}"</div>
              </div>
            </div>
          </div>
        ))}

        {visibleCount < feedbacks.length && (
          <div className='text-center'>
            <a
              href='#'
              onClick={(e) => {
                e.preventDefault()
                handleShowMore()
              }}
              className='text-gray-500 cursor-pointer'
            >
              Show More
            </a>
          </div>
        )}

        {feedbacks.length === 0 && (
          <div className='text-center p-8 bg-white rounded-lg shadow'>
            <p className='text-gray-500'>No reviews available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FeedbackSection
