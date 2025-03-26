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
import { SessionContext } from './context/selectedContext'
import { SessionItem } from '@/types/sessionItem'
import { formatNumber } from '../servicesPage/servicesPage.util'
import { useNavigate } from 'react-router-dom'

interface DataTableProps {
  columns: any[]
  data: SessionItem[]
  filterKey1?: string // Key để lọc dữ liệu\
  filterKey2?: string
}

export function DataTable({ columns, data }: DataTableProps) {
  const nav = useNavigate()
  const context = React.useContext(SessionContext)
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

  function getAmount() {
    var cart = context.items
    var amount = 0
    cart.forEach((v) => {
      if (v.included) {
        amount += parseFloat((v.product.price * v.amount).toFixed(1))
      }
    })
    return amount
  }
  return (
    <div className='mt-10'>
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
              <TableRow key={row.id} id={row.original.product?.productId}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end gap-2'>
        <span className='text-lg font-medium' >Total amount is:</span>
        <p className='mt-3 text-lg font-bold text-red-500' >
          <span id='total-amount'>{formatNumber(getAmount())} </span>
          VND
          </p>
      </div>

      <div className='flex items-center justify-end space-x-2 pb-4'>
        <button
          className='rounded-sm bg-purple1 p-2 text-white no-underline disabled:bg-gray-400 disabled:text-white'
          onClick={() => {
            nav('/cosmetics-check-out')
          }}
          disabled={context.items.filter((x) => x.included).length === 0}
        >
          Check Out
        </button>
      </div>
    </div>
  )
}
