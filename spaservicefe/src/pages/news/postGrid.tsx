import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PostGrid = ({ activeTab }) => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Function to fetch data based on the active tab
  const fetchPosts = async () => {
    try {
      let response
      if (activeTab === 'blog') {
        response = await fetch('/api/getAllBlogs')
      } else if (activeTab === 'promotion') {
        response = await fetch('/api/getAllPromotions')
      } else if (activeTab === 'event') {
        response = await fetch('/api/getAllEvents')
      }

      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      } else {
        throw new Error('Failed to fetch posts')
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [activeTab]) // Fetch data whenever the activeTab changes

  const handleClick = (id) => {
    navigate(`/news/${activeTab}/${id}`)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className='mx-auto max-w-7xl p-4' data-aos='zoom-in' data-aos-delay='1000' data-aos-offset='-500'>
      {/* Hàng đầu tiên: 1 khung to bên trái, 2 khung nhỏ bên phải */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {/* Khung lớn bên trái */}
        <div
          className='md:col-span-2 relative rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl'
          onClick={() => handleClick(posts[0].id)}
        >
          <img src={posts[0].image} alt={posts[0].title} className='w-full h-[500px] object-cover' />
          <div className='absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4'>
            <p className='text-sm text-gray-300'>{posts[0].date}</p>
            <h3 className='text-xl font-semibold text-white'>{posts[0].title}</h3>
          </div>
        </div>

        {/* Hai khung nhỏ bên phải */}
        <div className='grid grid-rows-2 gap-4'>
          {posts.slice(1, 3).map((post) => (
            <div
              key={post.id}
              className='relative rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl'
              onClick={() => handleClick(post.id)}
            >
              <img src={post.image} alt={post.title} className='w-full h-[250px] object-cover' />
              <div className='absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4'>
                <p className='text-sm text-gray-300'>{post.date}</p>
                <h3 className='text-lg font-semibold text-white'>{post.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Các bài viết còn lại xếp thành hàng 3, có bố cục khác */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
        {posts.slice(3).map((post) => (
          <div
            key={post.id}
            className='rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl'
            onClick={() => handleClick(post.id)}
          >
            {/* Ảnh trên cùng */}
            <img src={post.image} alt={post.title} className='w-full h-[200px] object-cover' />

            {/* Nội dung bên dưới */}
            <div className='p-4'>
              <p className='text-gray-500 text-sm'>{post.date}</p>
              <h3 className='text-lg font-semibold text-gray-800 mt-1'>{post.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostGrid
