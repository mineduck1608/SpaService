import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from 'src/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Button } from 'src/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { ToastContainer, toast } from 'react-toastify'
import { checkInCheckOut, getAllEmployees, getCurrentLocation } from './record.util'
import { jwtDecode } from 'jwt-decode'
import { format } from 'date-fns'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const checkInSchema = z.object({
  accountId: z.string().nonempty('Account ID is required'),
  fullName: z.string().nonempty('Full Name is required'),
  checkInTime: z.string().nonempty('Check-in Time is required')
})

interface CheckInModalProps {
  onCheckInSuccess: (time: string) => void
  onCheckOutSuccess: (time: string) => void
}

export default function CheckInModal({ onCheckInSuccess, onCheckOutSuccess }: CheckInModalProps) {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const updateLocation = async () => {
      try {
        const position = await getCurrentLocation()
        setLocation(position)
      } catch (error) {
        toast.error('Unable to get location. Please enable location services.')
      }
    }
    updateLocation()
  })

  const form = useForm<z.infer<typeof checkInSchema>>({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      accountId: '',
      fullName: '',
      checkInTime: format(new Date(), "yyyy-MM-dd'T'HH:mm")
    }
  })

  useEffect(() => {
    const fetchAccountDetails = async () => {
      const token = sessionStorage.getItem('token')
      if (token) {
        const decodedToken: any = jwtDecode(token)
        const accountId = decodedToken.UserId
        console.log(accountId)
        form.setValue('accountId', accountId)

        const employees = await getAllEmployees()
        const employee = employees.find((emp) => emp.accountId === accountId)
        if (employee) {
          form.setValue('fullName', employee.fullName)
        }
      }
    }
    fetchAccountDetails()
  }, [form])

  const handleAction = async (action: string) => {
    try {
      const data = form.getValues()
      const { accountId } = data

      const position = await getCurrentLocation()

      await checkInCheckOut(accountId, action, position.latitude, position.longitude)

      if (action === 'checkin') {
        onCheckInSuccess(data.checkInTime)
      } else if (action === 'checkout') {
        onCheckOutSuccess(data.checkInTime)
      }

      setOpen(false)
    } catch (error) {
      toast.error('Unable to get location. Please enable location services.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className='bg-green-500 text-white hover:bg-green-600'>Check In</Button>
      </DialogTrigger>
      <DialogContent className='px-10'>
        <DialogTitle className='flex justify-center'>Employee Check-In</DialogTitle>
        <Form {...form}>
          <form className='space-y-4'>
            <FormField
              control={form.control}
              name='fullName'
              render={({ field }) => (
                <FormItem className='mt-2 grid grid-cols-4 items-center gap-4'>
                  <FormLabel className='text-md text-right'>Full Name</FormLabel>
                  <div className='col-span-3 space-y-1'>
                    <FormControl>
                      <Input {...field} placeholder='Enter Full Name' readOnly />
                    </FormControl>
                    <FormMessage className='text-sm' />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='checkInTime'
              render={({ field }) => (
                <FormItem className='mt-2 grid grid-cols-4 items-center gap-4'>
                  <FormLabel className='text-md text-right'>Check-in Time</FormLabel>
                  <div className='col-span-3 space-y-1'>
                    <FormControl>
                      <Input {...field} type='datetime-local' placeholder='Enter Check-in Time' readOnly />
                    </FormControl>
                    <FormMessage className='text-sm' />
                  </div>
                </FormItem>
              )}
            />

            <div className='mt-2 grid grid-cols-4 items-center gap-4'>
              <span className='text-md text-right font-medium'>Location</span>
              <div className='col-span-3 space-y-1'>
                {location ? (
                  <>
                    <div style={{ height: '200px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                      <MapContainer
                        center={[location.latitude, location.longitude]}
                        zoom={15}
                        style={{ height: '100%', width: '100%' }}
                      >
                        <TileLayer
                          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[location.latitude, location.longitude]}>
                          <Popup>Current location</Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                  </>
                ) : (
                  <p className='text-sm text-gray-500'>Fetching location...</p>
                )}
              </div>
            </div>

            <div className='mt-10 flex justify-end gap-2'>
              <Button type='button' onClick={() => handleAction('checkin')}>
                Check In
              </Button>
              <Button type='button' onClick={() => handleAction('checkout')}>
                Check Out
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  )
}
