import React, { useRef } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { CosmeticProduct } from '@/types/type'
import { CosmeticCard } from '../cosmeticPage/cosmeticList'
export default function DetailPageCarousel(params: { list: CosmeticProduct[] }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  }
  const carouselRef = useRef<Carousel>(null)
  function swipe(forward: boolean) {
    if (forward) {
      carouselRef.current?.next(1)
    } else {
      carouselRef.current?.previous(1)
    }
  }
  return (
    <div>
      <div className='relative'>
        <Carousel
          ref={carouselRef}
          responsive={responsive}
          autoPlay={true}
          swipeable={true}
          draggable={false}
          infinite={true}
          arrows={false}
        >
          {(params.list ?? []).map((v, i) => (
            <div className='p-1' key={i}>
              <CosmeticCard s={v} />
            </div>
          ))}
        </Carousel>

        <>
          {/* Left button */}
          <button
            className={`absolute -left-[7.5%] top-1/2 -translate-y-1/2 transform rounded-bl-2xl rounded-tr-2xl border-[1px] border-purple1 bg-white px-4 py-2 font-bold text-purple1
            duration-300 hover:-translate-x-1 hover:shadow-[1px_1px_#8D388A,2px_2px_#8D388A]
            `}
            aria-label='Previous'
            onClick={(e) => swipe(false)}
          >
            &lt; {/* Left arrow */}
          </button>

          {/* Right button */}
          <button
            className={`absolute -right-[7.5%] top-1/2 -translate-y-1/2 transform rounded-br-2xl rounded-tl-2xl border-[1px] border-purple1 bg-white px-4 py-2 font-bold text-purple1
            duration-300 hover:translate-x-1 hover:shadow-[1px_1px_#8D388A,2px_2px_#8D388A]
            `}
            onClick={(e) => swipe(true)}
            aria-label='Next'
          >
            &gt; {/* Right arrow */}
          </button>
        </>
      </div>
    </div>
  )
}
