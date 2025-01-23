import React from 'react'
import { CCarousel, CCarouselItem, CImage } from '@coreui/react'
import login from '../../images/loginBg.jpg'
export const CarouselControl = () => {
  return (
    <CCarousel controls indicators>
      <CCarouselItem>
        <CImage className='w-100' src={login} alt='slide 1' />
      </CCarouselItem>
      <CCarouselItem>
        <CImage className='d-block w-100' src='../../images/vue.jpg' alt='slide 2' />
      </CCarouselItem>
      <CCarouselItem>
        <CImage className='d-block w-100' src='../../images/angular.jpg' alt='slide 3' />
      </CCarouselItem>
    </CCarousel>
  )
}
