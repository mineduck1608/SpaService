import React from 'react'
import RegisterForm from './registerForm'
import mainBg from '../../images/registerBg/mainBg.jpg'
import { GalleryVerticalEnd } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../../components/ui/carousel'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip'
import Autoplay from 'embla-carousel-autoplay'
import bg1 from '../../images/registerBg/bg1.jpg'
import bg2 from '../../images/registerBg/bg2.jpg'
import bg3 from '../../images/registerBg/bg3.jpg'

export default function RegisterPage() {
  const images = [bg1, bg2, bg3]
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='relative hidden bg-muted lg:inline'>
        <Carousel
          className='flex min-h-full'
          opts={{
            align: 'start',
            loop: true
          }}
          plugins={[
            Autoplay({
              delay: 5000
            })
          ]}
        >
          <CarouselContent className='min-h-full'>
            {images.map((v, i) => (
              <CarouselItem key={i} className='min-h-full'>
                <img src={v} className='min-h-full w-full md:max-h-[600px]' />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='translate-x-14' />
          <CarouselNext className='-translate-x-14' />
        </Carousel>
      </div>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start self-end'>
          <a
            href='/login'
            className='flex items-center gap-2 rounded border-2 border-[#a7a7ab] bg-[#a7a7ab] p-2 font-medium text-white hover:bg-black hover:text-white hover:border-black'
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>Log in</TooltipTrigger>
                <TooltipContent>
                  <p>Click here to sign in</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </a>
        </div>
        <div className='flex h-full items-center justify-center'>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
