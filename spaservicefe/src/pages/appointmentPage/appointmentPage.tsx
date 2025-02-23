import React from 'react'
import AppointmentTable from './appointmentTable'
import bg from '../../images/customerHistory/bg.jpg'

export default function AppointmentPage() {
  return (
    <div
      className='flex justify-center bg-slate-400 bg-cover bg-no-repeat'
      style={{
        background: 'url(https://www.vilabaroviczlatibor.com/media/gallery/gt-zlatibor-apartmani/spa-centar-4031.webp)'
      }}
    >
      <div className='mb-40 mt-60 w-full p-5 '>
        <AppointmentTable />
      </div>
    </div>
  )
}
