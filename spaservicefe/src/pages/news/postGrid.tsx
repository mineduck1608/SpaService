import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { News } from '@/types/news'
import { getAllBlog, getAllEvent, getAllPromotion } from './newsPage.util'

interface PostGridProps {
  activeTab: string
}

const PostGrid: React.FC<PostGridProps> = ({ activeTab }) => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPosts = async () => {
    try {
      let response: News[] | null = null
      if (activeTab === 'blog') {
        response = await getAllBlog()
      } else if (activeTab === 'promotion') {
        response = await getAllPromotion()
      } else if (activeTab === 'event') {
        response = await getAllEvent()
      }
      if (response != null) {
        setPosts(response)
      } else {
        throw new Error('Failed to fetch posts')
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [activeTab])

  if (loading) return <div className='flex justify-center'>Loading...</div>
  if (error) return <div className='flex justify-center'>Error: {error}</div>
  if (!posts.length) return <div className='flex justify-center'>No news available.</div>

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0') // Đảm bảo luôn có 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0, vì vậy cộng thêm 1
    const year = date.getFullYear()

    return `${day}.${month}.${year}`
  }

  const handleClick = (postId: string) => {
    navigate(`/news/${activeTab}/${postId}`) // Điều hướng tới trang chi tiết của bài viết
  }

  return (
    <div className='mx-auto max-w-7xl p-4'>
      {/* First row: 1 large post on the left, 2 smaller posts on the right */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        {/* Large post on the left (spans 2 columns on medium screens and above) */}
        <div
          className='relative transform cursor-pointer overflow-hidden rounded-lg shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl md:col-span-2'
          onClick={() => handleClick(posts[0].newsId)}
        >
          <img src={posts[0].image} alt={posts[0].header} className='h-[524px] w-full object-cover' />
          <div className='bgblur absolute inset-0 flex flex-col justify-end p-4'>
            <p className='text-light my-1 text-lg font-bold'>{formatDate(new Date(posts[0].createdAt))}</p>
            <h3 className='text-light text-2xl font-bold'>{posts[0].header}</h3>
          </div>
        </div>

        {/* Two smaller posts on the right */}
        <div className='grid grid-rows-2 gap-4'>
          {posts.slice(1, 3).map((post) => (
            <div
              key={post.newsId}
              className='relative transform cursor-pointer overflow-hidden rounded-lg shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl'
              onClick={() => handleClick(post.newsId)}
            >
              <img src={post.image} alt={post.header} className='h-[250px] w-full object-cover' />
              <div className='bgblur absolute inset-0  flex flex-col justify-end p-4'>
                <p className='text-light my-1 text-sm font-bold'>{formatDate(new Date(post.createdAt))}</p>
                <h3 className='text-light text-lg font-bold'>{post.header}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Remaining posts in a 3-column grid */}
      <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {posts.slice(3).map((post) => (
          <div
            key={post.newsId}
            className='transform cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl'
            onClick={() => handleClick(post.newsId)}
          >
            {/* Image on top */}
            <img src={post.image} alt={post.header} className='h-[200px] w-full object-cover' />

            {/* Content below */}
            <div className='p-4'>
              <p className='text-sm text-gray-500'>{formatDate(new Date(post.createdAt))}</p>
              <h3 className='mt-1 text-lg font-semibold text-gray-800'>{post.header}</h3>
              <a href='/news/detail/:id' className='text-[#8B3A8B] transition-colors duration-300 hover:text-[#a040a0]'>
                Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostGrid
