import React, { useRef } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { sampleService } from './detailPage.util'
import { ServiceCard } from '../servicesPage/serviceList'
export default function DetailPageCarousel() {
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
    }
    else {
      carouselRef.current?.previous(1)
    }
  }
  return (
    <div>
      <Carousel
        ref={carouselRef}
        responsive={responsive}
        autoPlay={true}
        swipeable={true}
        draggable={false}
        infinite={true}
        arrows={false}
      >
        {
          Array.from({ length: 5 }).map((v, i) => {
            const x = { ...sampleService }
            x.serviceName = x.serviceName + ' ' + i
            return x
          }).map(v => (
            <div className='p-1'>
              <ServiceCard s={v} />
            </div>
          ))
        }
      </Carousel>
    </div>
  )
}
