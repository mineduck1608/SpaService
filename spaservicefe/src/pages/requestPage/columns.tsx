import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Checkbox } from '../../components/ui/checkbox'
import { SpaRequest } from '@/types/type' // Assuming `Request` is the correct type based on the entity
import { formatNumber } from '../servicesPage/servicesPage.util'
import RequestActions from '../admin/customerRequests/customerRequestAction'
import { useContext, useState } from 'react'
import { PastBookingContext } from './context/pastBookingContext'
export const columns: ColumnDef<SpaRequest>[] = [
  {
    accessorKey: 'serviceName',
    header: 'Service',
    cell: (r) => r.row.original.service?.serviceName
  },
  {
    accessorKey: 'startTime',
    header: 'Start Time',
    cell: (r) => new Date(r.row.original.startTime).toLocaleString()
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue<string>('status')
      let statusColor = ''
      // Set the color based on the status value
      if (status === 'Completed') {
        statusColor = 'text-green-500'
      } else if (status === 'Cancelled') {
        statusColor = 'text-red-500'
      } else if (status === 'Pending') {
        statusColor = 'text-gray-500'
      }

      return <span className={statusColor}>{status}</span>
    }
  },
  {
    accessorKey: 'requestedId',
    header: 'Requested Employee',
    cell: (r) => r.row.original.employee?.fullName ?? 'Did not request'
  },
  {
    accessorKey: 'price',
    header: 'Total Price',
    cell: (r) => formatNumber(r.row.original.service?.price ?? 0)
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <>
        <button className='bg-blue-600 p-2 rounded-md text-white hover:bg-blue-500'>View Detail</button>
      </>
    }
  }
]
