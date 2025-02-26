'use client'

import * as React from 'react'
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Button } from '../../components/ui/button'
import { SelectedContext } from './context/selectedContext'
import { SessionItem } from '@/types/sessionItem'
import { getAmount } from './cartPage.util'
import { formatNumber } from '../servicesPage/servicesPage.util'
import { Link } from 'react-router-dom'

interface DataTableProps {
  columns: any[]
  data: SessionItem[]
  filterKey1?: string // Key để lọc dữ liệu\
  filterKey2?: string
}

export function DataTable({ columns, data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div className=''>
      <div className='mt-2 rounded-md border bg-slate-50'>
        <Table className=''>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody id='body'>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} id={row.original.product.productId}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end gap-2'>
        <span className='text-lg font-medium'>Total amount is:</span>
        <p className='mt-3 text-lg font-bold text-red-500'>{formatNumber(getAmount())} VND</p>
      </div>

      <div className='flex items-center justify-end space-x-2 pb-4'>
        <Link className='bg-purple1 no-underline text-white p-2 rounded-sm'
        to={'/cosmetics-check-out'}>
          Check Out
        </Link>
      </div>
    </div>
  )
}
