import { useState, useEffect } from 'react'
import { DataTable } from './data-table'
import { getRecords, getAllEmployees  } from './record.util'
import {Employee, Record} from '../../../types/type'

const columns = [
  {
    accessorKey: 'attendanceId',
    header: 'Attendance ID'
  },
  {
    accessorKey: 'checkInTime',
    header: 'Check-in Time',
    cell: ({ getValue }: { getValue: () => string }) => new Date(getValue()).toLocaleString()
  },
  {
    accessorKey: 'checkOutTime',
    header: 'Check-out Time',
    cell: ({ getValue }: { getValue: () => string }) => getValue() ? new Date(getValue()).toLocaleString() : 'N/A'
  },
  {
    accessorKey: 'employeeName',
    header: 'Employee Name'
  }
]

export default function CheckInPage() {
  const [data, setData] = useState<Record[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const records = await getRecords()
        const employees = await getAllEmployees()
        const employeeMap = employees.reduce((map: { [key: string]: string }, employee: Employee) => {
          map[employee.employeeId] = employee.fullName
          return map
        }, {})
        const recordsWithEmployeeNames = records.map((record: Record) => ({
          ...record,
          employeeName: employeeMap[record.employeeId] || 'Unknown'
        }))
        setData(recordsWithEmployeeNames || [])
      } catch (err) {
        setError("Can't load the data.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className='ml-5'>Loading...</div>
  if (error) return <div className='ml-5'>{error}</div>

  return (
    <div className='h-[96%] items-center justify-center'>
      <h2 className='container mx-auto my-4 ml-11'>Check-In Records</h2>
      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}