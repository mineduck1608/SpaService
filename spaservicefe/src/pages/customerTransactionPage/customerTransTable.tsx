import { useState, useEffect, useContext } from 'react'
import { columnsForProduct, columnsForService } from './columns'
import { DataTable } from './data-table'
import { TransactionBase } from '../../types/type' // Updated to CustomerRequest type

import { getTransactionsOfCustomerId } from './customerTransPage.util'
import { TransTypeContext } from './context/transTypeContext'
import { getAllProducts } from '../admin/products/product.util'

export default function CustomerTransTable() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [map, setMap] = useState<Map<boolean, TransactionBase[]>>(
    new Map<boolean, TransactionBase[]>([
      [true, []],
      [false, []]
    ])
  )
  const context = useContext(TransTypeContext)
  useEffect(() => {
    const fetchData = async () => {
      var c = sessionStorage.getItem('customerId') ?? ''
      try {
        const services = await getTransactionsOfCustomerId(c, true)
        setMap((v) => {
          v.set(true, services)
          return v
        })
        const product = await getTransactionsOfCustomerId(c, false)
        setMap((v) => {
          v.set(false, product)
          return v
        })
        const products = await getAllProducts()
        context.setProducts(products)
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
    <div className='container mx-auto w-[96%] rounded-md border bg-slate-50'>
      <DataTable
        columns={context.showServiceTrans ? columnsForService : columnsForProduct}
        data={map.get(context.showServiceTrans) ?? []}
      />
    </div>
  )
}
