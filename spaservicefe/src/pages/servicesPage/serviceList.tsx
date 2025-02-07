import { Service } from '@/types/services'
import React from 'react'

export default function ServiceList(prams?: { service: Service[] }) {
  return (
    <div className='bg-slate-300'>
      <div className='flex justify-evenly'>
        <ServiceCard/>
        <ServiceCard/>
      </div>
    </div>
  )
}
export function ServiceCard(params?: { s: Service }) {
  return (
    <div className='bg-green-200 w-[45%]'>
      Card placeholder
    </div>
  )
}