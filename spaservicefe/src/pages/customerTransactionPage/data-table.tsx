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
import { TransTypeContext } from './context/transTypeContext'

interface DataTableProps<TData> {
  columns: any[]
  data: TData[]
  filterKey1?: string // Key để lọc dữ liệu\
  filterKey2?: string
}

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const context = React.useContext(TransTypeContext)
  if (sessionStorage.getItem('autoProduct') === '1') {
    context.setShowServiceTrans(false)
    sessionStorage.removeItem('autoProduct')
  }
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
      <h1 className='py-4 text-center text-2xl font-bold'>Transactions</h1>
      <div className='flex justify-end'>
        <button
          className='my-2 rounded-sm bg-purple1 p-1 text-white'
          onClick={(e) => {
            context.setShowServiceTrans(!context.showServiceTrans)
          }}
        >
          {context.showServiceTrans ? 'Product' : 'Service'} Transactions
        </button>
      </div>
      <div className='rounded-md border bg-slate-50'>
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
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}
