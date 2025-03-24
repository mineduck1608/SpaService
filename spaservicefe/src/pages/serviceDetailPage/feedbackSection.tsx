import React, { useState, useEffect } from 'react'
import { Feedback } from '@/types/type'
import { getFeedbacksByServiceId } from '../admin/feedbacks/feedback.util'
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
        const filteredFeedbacks = await getFeedbacksByServiceId(service?.serviceId)
        console.log('filteredFeedbacks: ', filteredFeedbacks)
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

  if (loading) return <div className='flex h-full w-full items-center justify-center'>Loading...</div>
  if (error) return <div className='flex h-full w-full items-center justify-center'>{error}</div>

  return (
    <div className='mx-auto max-w-3xl p-4'>
      <div className='mb-8 rounded-lg bg-white p-6 shadow'>
        <div className='flex items-center'>
          <div className='mr-6'>
            <div className='text-5xl font-bold text-gray-800'>{stats.average}</div>
            <div className='mt-1 flex text-yellow-400'>
              {[...Array(5)].map((_, i) => (
                <IoIosStar key={i} className='h-4 w-4' fill='currentColor' />
              ))}
            </div>
            <div className='mt-1 text-sm text-gray-500'>({stats.total} Reviews)</div>
          </div>
          <div className='flex-1'>
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className='mb-1 flex items-center'>
                <span className='mr-2 w-4 text-gray-600'>{rating}</span>
                <span className='mr-2 text-yellow-400'>★</span>
                <div className='h-3 flex-1 overflow-hidden rounded-full bg-gray-200'>
                  <div
                    className='h-full rounded-full bg-yellow-400'
                    style={{
                      width: `${stats.total ? (stats.counts[rating - 1] / stats.total) * 100 : 0}%`
                    }}
                  ></div>
                </div>
                <span className='ml-2 w-6 text-right text-gray-600'>{stats.counts[rating - 1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 className='mb-4 text-xl font-semibold'>Reviews</h2>

      <div className='space-y-6'>
        {feedbacks.slice(0, visibleCount).map((feedback) => (
          <div key={feedback.feedbackId} className='rounded-lg bg-white p-6 shadow'>
            <div className='mb-4 flex items-start'>
              <div className='mr-4'>
                <div className='h-12 w-12 overflow-hidden rounded-full bg-gray-200'>
                  <div className='flex h-full w-full items-center justify-center bg-gray-200'>
                    <img src={avatar} className='h-full w-full object-cover' />
                  </div>
                </div>
              </div>
              <div className='flex-1'>
                <div className='flex items-center'>
                  <div className='font-medium'>{feedback.createdByNavigation?.fullName || '?'}</div>
                  <div className='ml-2 text-sm text-gray-500'>
                    {new Date(feedback.createdAt).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false // 24-hour format
                    })}
                  </div>
                </div>
                <div className='flex items-center'>
                  {[...Array(5)].map((_, i) => (
                    <IoIosStar
                      key={i}
                      className={`h-4 w-4 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <div className='mt-1 italic text-gray-600'>"{feedback.feedbackMessage}"</div>
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
              className='cursor-pointer text-gray-500'
            >
              Show More
            </a>
          </div>
        )}

        {feedbacks.length === 0 && (
          <div className='rounded-lg bg-white p-8 text-center shadow'>
            <p className='text-gray-500'>No reviews available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FeedbackSection
