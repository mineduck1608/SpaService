import React from 'react'
import { useNavigate } from 'react-router-dom' // Nếu dùng React Router

const posts = [
  {
    id: 1,
    title: 'Chăm sóc da mặt giúp da mịn giúp sáng da',
    date: '17/11/2020',
    image: '/images/post1.jpg'
  },
  {
    id: 2,
    title: 'Những lợi ích của foot massage mà bạn nên biết',
    date: '17/11/2020',
    image: '/images/post2.jpg'
  },
  {
    id: 3,
    title: 'Những loại mặt nạ trị mụn cực hiệu quả các nàng nên nhớ',
    date: '17/11/2020',
    image: '/images/post3.jpg'
  },
  {
    id: 4,
    title: 'Bí quyết chăm sóc da từ thiên nhiên',
    date: '17/11/2020',
    image: '/images/post4.jpg'
  },
  {
    id: 5,
    title: 'Tác dụng của massage toàn thân',
    date: '17/11/2020',
    image: '/images/post5.jpg'
  },
  {
    id: 6,
    title: 'Mặt nạ dưỡng da tự nhiên',
    date: '17/11/2020',
    image: '/images/post6.jpg'
  }
]

const PostGrid = () => {
  const navigate = useNavigate() // Nếu dùng React Router

  const handleClick = (id: any) => {
    navigate(`${id}`) // React Router
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
