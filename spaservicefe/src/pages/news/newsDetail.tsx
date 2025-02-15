import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useParams } from 'react-router-dom'
import { News } from '@/types/news'
import { getNewsById } from './newsPage.util'
import { toast } from 'react-toastify'

const NewsDetail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [posts, setPosts] = useState<News[]>([])
  const [loading, setLoading] = useState(true) // Thêm trạng thái loading

  const { id } = useParams()

  console.log(id)

  const fetchPosts = async () => {
    let response: News[] | null = null
    if (id) {
      response = await getNewsById(id.toString())
      console.log(response)
      if (response) {
        setPosts(response)
      } else {
        toast.error('Loading news failed.')
      }
      setLoading(false) // Dữ liệu đã được tải, cập nhật trạng thái loading
    }
  }

  useEffect(() => {
    fetchPosts()
    console.log(posts)
  }, [id]) // Thêm `id` vào dependency array

  // Xác định tab hiện tại dựa vào URL
  let activeTab = 'blog'
  if (location.pathname.includes('promotion')) activeTab = 'promotion'
  if (location.pathname.includes('event')) activeTab = 'event'

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0') // Đảm bảo luôn có 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0, vì vậy cộng thêm 1
    const year = date.getFullYear()

    return `${day}.${month}.${year}`
  }

  useEffect(() => {
    AOS.init({
      offset: 0,
      delay: 200,
      duration: 1200,
      once: true
    })
  }, [])

  return (
    <>
      {/* Ảnh Header */}
      <img src='https://senspa.com.vn/wp-content/uploads/2020/11/DSC5622.jpg' alt='Header Picture' />

      {/* Đường dẫn điều hướng */}
      <div className='w-full' data-aos='fade-right' data-aos-delay='400'>
        <div className='container mx-auto flex justify-center px-1 py-3 md:justify-start'>
          <div className='text-md text-gray-400'>
            <a className='text-md text-gray-400 no-underline' href='/'>
              Home
            </a>
            <span className='mx-1'>&gt;</span>
            <a
              className='text-md text-gray-400 no-underline'
              href={activeTab === 'blog' ? '/news/blog' : activeTab === 'promotion' ? '/news/promotion' : '/news/event'}
            >
              {activeTab === 'blog' ? 'Blog' : activeTab === 'promotion' ? 'Promotion' : 'Event'}
            </a>
            <span className='mx-1'>&gt;</span>
            <span className='mx-1'>{posts.header}</span>
          </div>
        </div>
      </div>

      {/* Chỉ hiển thị khi dữ liệu đã được tải xong */}
      {loading ? (
        <div className='mb-10 flex justify-center'>Loading...</div> // Hoặc có thể dùng một spinner ở đây
      ) : (
        <div className='flex justify-center py-10 text-center'>
          {/* Nội dung bài viết hoặc các phần khác sẽ được render ở đây */}
          <div className='w-[60%] max-w-[60%] text-left'>
            <p>{formatDate(new Date(posts.createAt))}</p>
            <h1 className='font-bold text-purple1'>{posts.header}</h1>
            <hr className='border-t-1 my-4 border-gray-500' />
            <div>{posts.content}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default NewsDetail
