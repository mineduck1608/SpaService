// pages/CalculateDatePage.tsx
import React from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/vi' // Đăng ký locale tiếng Việt
import { calculateStartAndEndDate } from './calculateDate'

const CalculateDatePage: React.FC = () => {
  const result = calculateStartAndEndDate(36, ['Tue', 'Thu', 'Sat'], [1, 1, 1], '01/04/2025', [
    //'08/04/2025',
    //'10/04/2025',
    //'12/04/2025',
    //  '05/07/2025',
    //'13/04/2025',
    // '21/06/2025',
    // '22/06/2025',
  ])

  // Chuyển đổi ngày kết thúc sang đối tượng dayjs
  const resultDate = dayjs(result.endDate, 'DD/MM/YYYY').locale('vi')
  const dayOfWeek = resultDate.format('dddd') // lấy thứ bằng tiếng Việt
  const formattedDate = resultDate.format('DD/MM/YYYY')

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold'>Kết quả tính ngày kết thúc</h1>
      <p className='mt-2'>
        Ngày kết thúc: <strong>{`${dayOfWeek}, ${formattedDate}`}</strong>
      </p>
    </div>
  )
}

export default CalculateDatePage
