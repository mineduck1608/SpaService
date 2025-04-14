// calculateDate.ts
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isoWeek)
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrBefore)
dayjs.extend(customParseFormat)

const dayMap: { [key: string]: number } = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6
}

export function calculateStartAndEndDate(
  totalSessions: number,
  studyDays: string[],
  sessionsPerDay: number[], // Mảng số buổi học mỗi ngày
  startDateStr: string,
  holidayDatesStr: string[]
): { startDate: string; endDate: string } {
  const studyDayNumbers = studyDays.map((day) => dayMap[day]) // [1, 3, 5]
  const startDate = dayjs(startDateStr, 'DD/MM/YYYY')
  const holidays = holidayDatesStr.map((d) => dayjs(d, 'DD/MM/YYYY'))

  const missedSessionsByDay: { [day: number]: number } = {}

  let currentDate = startDate // Bắt đầu trực tiếp với ngày bắt đầu thực tế
  let sessionCount = 0
  let missSessionCount = 0
  let lastStudyDate = startDate

  console.log('--- Bắt đầu tính lịch ---')
  console.log('Tổng số buổi cần:', totalSessions)
  console.log('Ngày bắt đầu:', startDate.format('DD/MM/YYYY'))
  console.log('Lịch học:', studyDayNumbers)
  console.log(
    'Ngày nghỉ:',
    holidays.map((d) => d.format('DD/MM/YYYY'))
  )

  while (sessionCount < totalSessions) {
    for (let i = 0; i < studyDayNumbers.length; i++) {
      const studyDay = studyDayNumbers[i]
      const studyDate = currentDate.isoWeekday(studyDay)

      // Kiểm tra nếu ngày học đã qua ngày bắt đầu, không cho phép chọn ngày trước đó
      if (studyDate.isBefore(startDate)) continue

      console.log('Ngày học:', studyDate.format('DD/MM/YYYY'))
      const studyDateStr = studyDate.format('dddd, DD/MM/YYYY')
      const isHoliday = holidays.some((h) => h.isSame(studyDate, 'day'))

      if (isHoliday) {
        missedSessionsByDay[studyDay] = (missedSessionsByDay[studyDay] || 0) + sessionsPerDay[i]
        sessionCount += sessionsPerDay[i]
        missSessionCount += sessionsPerDay[i]
        console.log(`❌ ${studyDateStr} là ngày nghỉ. Ghi nhớ cần bù vào đúng thứ ${studyDay + 1} tuần sau`)
        continue
      }

      // Ngày học bình thường
      sessionCount += sessionsPerDay[i]
      lastStudyDate = studyDate
      console.log(`✅ Học bình thường vào ${studyDateStr}. Tổng buổi đã học: ${sessionCount}/${totalSessions}`)

      if (sessionCount >= totalSessions) break
    }

    console.log('📌 Còn buổi cần bù:', missedSessionsByDay)
    if (sessionCount < totalSessions) {
      currentDate = currentDate.add(1, 'week')
    }
  }

  while (missSessionCount > 0) {
    for (let i = 0; i < studyDayNumbers.length; i++) {
      const studyDay = studyDayNumbers[i]
      const studyDate = currentDate.isoWeekday(studyDay)

      console.log('Ngày học:', studyDate.format('DD/MM/YYYY'))

      // ❌ Bỏ qua nếu ngày học bù <= ngày học cuối cùng đã học
      if (studyDate.isSameOrBefore(lastStudyDate)) continue

      const studyDateStr = studyDate.format('dddd, DD/MM/YYYY')
      const isHoliday = holidays.some((h) => h.isSame(studyDate, 'day'))

      if (missedSessionsByDay[studyDay] > 0) {
        if (isHoliday) {
          console.log(`❌ ${studyDateStr} là ngày nghỉ. Ghi nhớ cần bù vào đúng thứ ${studyDay + 1} tuần sau`)
          continue
        }

        missedSessionsByDay[studyDay] -= sessionsPerDay[i]
        missSessionCount -= sessionsPerDay[i]
        lastStudyDate = studyDate
        console.log(
          `🟠 Học bù vào ${studyDateStr} cho buổi nghỉ trước. Tổng buổi đã học: ${sessionCount}/${totalSessions}`
        )
      }

      if (missSessionCount == 0) break
    }

    if (missSessionCount > 0) {
      currentDate = currentDate.add(1, 'week')
    }
  }

  console.log('\n✅ Kết thúc tại:', lastStudyDate.format('dddd, DD/MM/YYYY'))

  console.log('\n✅ Kết thúc tại:', lastStudyDate.format('dddd, DD/MM/YYYY'))

  return {
    startDate: startDate.format('DD/MM/YYYY'),
    endDate: lastStudyDate.format('DD/MM/YYYY')
  }
}
