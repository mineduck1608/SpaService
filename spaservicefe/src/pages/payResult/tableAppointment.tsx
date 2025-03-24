import React from 'react'

export default function TableAppointment(params: { map: Map<string, string> }) {
  return (
    <table className='w-4/5 border-[1px]'>
      <tbody>
        <tr>
          <td className='border-[1px black solid] p-2'>Service</td>
          <td>{params.map.get('serviceName')}</td>
        </tr>
        <tr>
          <td className='p-2'>Requested Employee</td>
          <td>{params.map.get('empName')}</td>
        </tr>
        <tr>
          <td className='p-2'>Start Time</td>
          <td>{params.map.get('startTime')}</td>
        </tr>
        <tr>
          <td className='p-2'>End Time</td>
          <td>{params.map.get('endTime')}</td>
        </tr>
      </tbody>
    </table>
  )
}
