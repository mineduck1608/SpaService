import { useState, useEffect } from 'react'
import { DataTable } from './data-table'
import { getRecords, getAllEmployees } from './record.util'
import { Employee, Record } from '../../../types/type'
import CheckInTable from './checkInTable'
import { jwtDecode } from 'jwt-decode'

const columns = [
  {
    accessorKey: 'index',
    header: 'No.',
    cell: ({ row }: { row: any }) => {
      return row.original.index
    },
    enableSorting: false
  },
  {
    accessorKey: 'checkInTime',
    header: 'Check-in Time',
    cell: ({ getValue }: { getValue: () => string }) => new Date(getValue()).toLocaleString(),
    sortingFn: 'datetime'
  },
  {
    accessorKey: 'checkOutTime',
    header: 'Check-out Time',
    cell: ({ getValue }: { getValue: () => string }) => (getValue() ? new Date(getValue()).toLocaleString() : 'N/A'),
    sortingFn: 'datetime'
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
  const [checkInTime, setCheckInTime] = useState<string | null>(null)
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token')
        if (!token) {
          setError('User is not authenticated.')
          return
        }

        const decodedToken: any = jwtDecode(token)
        const userId = decodedToken.UserId

        const employees = await getAllEmployees()
        const employee = employees.find((emp) => emp.accountId === userId)

        if (!employee) {
          setError('Employee not found.')
          return
        }

        const records = await getRecords()
        const filteredRecords = records.filter((record) => record.employeeId === employee.employeeId) 

        const sortedRecords = [...filteredRecords].sort(
          (a,b) => new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime()
        )

        const recordsWithEmployeeNames = sortedRecords.map((record: Record, idx: number) => ({
          ...record,
          employeeName: employee.fullName,
          index: idx + 1
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

  const handleCheckInSuccess = (time: string) => {
    setCheckInTime(time)
  }

  const handleCheckOutSuccess = (time: string) => {
    setCheckOutTime(time)
  }

  if (loading) return <div className='ml-5'>Loading...</div>
  if (error) return <div className='ml-5'>{error}</div>

  return (
    <div className='h-[96%] items-center justify-center'>
      <h2 className='container mx-auto my-4 ml-11'>Check-In Records</h2>
      <CheckInTable
        checkInTime={checkInTime}
        checkOutTime={checkOutTime}
        onCheckInSuccess={handleCheckInSuccess}
        onCheckOutSuccess={handleCheckOutSuccess}
      />

      <div className='container mx-auto w-[96%] rounded-md border'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
