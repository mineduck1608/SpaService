import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '../../components/ui/card'
import { Avatar } from '../../components/ui/avatar'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import male from '../../images/user/male.png'
import female from '../../images/user/female.png'
import { GetCustomerByAccountId, FindNewestByCustomerId, GetMemberShipId, handleUpdateSubmit } from './profile.uitl'
import { Customer, Membership } from '@/types/type'
import { getToken } from '../../types/constants'
import { jwtDecode } from 'jwt-decode'

const membershipLevels = {
  Silver: 'bg-gray-400 text-white',
  Platinum: 'bg-blue-400 text-white',
  Gold: 'bg-yellow-500 text-white',
  Diamond: 'bg-purple-600 text-white'
}

const UserProfile = () => {
  const [user, setUser] = useState<Customer[]>([])
  const [membership, setMembership] = useState<Membership[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [updatedUser, setUpdatedUser] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: ''
  })

  const getAvatar = (gender: string) => {
    return gender === 'Male' ? male : female
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getToken()
      if (token) {
        var jwtData: { UserId: string } = jwtDecode(token)
        const data = await GetCustomerByAccountId(jwtData.UserId)
        setUser(data)
        setUpdatedUser({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          dateOfBirth: data.dateOfBirth || '',
          gender: data.gender
        })
        if (data) {
          console.log(data)
          const membershipData = await FindNewestByCustomerId(data.customerId)
          if (membershipData) {
            const membershipType = await GetMemberShipId(membershipData.membershipId)
            setMembership(membershipType)
          }
        }
      }
    }
    fetchUserData()
  }, [])

  // Generalized change handler for both input and select elements
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setUpdatedUser((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = () => {
    handleUpdateSubmit(user.customerId, updatedUser)
    console.log('Updated User Info:', updatedUser)
    setIsOpen(false)
  }

  return (
    <div
      className='flex justify-center bg-slate-400 bg-cover bg-no-repeat'
      style={{
        background: 'url(https://senspa.com.vn/wp-content/uploads/2021/01/2-3.png)'
      }}
    >
      <div className='mb-20 mt-40 flex items-center justify-center'>
        <Card className='w-full max-w-md rounded-2xl bg-white p-6 shadow-lg'>
          <CardContent className='flex flex-col items-center gap-4'>
            <Avatar className='h-24 w-24 rounded-full border-2 border-gray-300'>
              <img src={getAvatar(user.gender || 'Male')} alt='User Avatar' className='h-full w-full rounded-full' />
            </Avatar>
            <div className='text-center'>
              <h2 className='text-xl font-semibold'>{user.fullName}</h2>
              <p className='text-gray-600'>Email: {user.email}</p>
              <p className='text-gray-600'>Phone: {user.phone}</p>
              <div className='flex justify-center gap-4 text-gray-600'>
                <p>Born: {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('en-GB') : ''}</p>
                <p>Gender: {user.gender}</p>
              </div>
              {membership?.type && (
                <p className={`mt-2 rounded-full px-4 py-1 font-bold ${membershipLevels[membership.type]}`}>
                  {membership.type} Member
                </p>
              )}
            </div>
            <Button
              onClick={() => setIsOpen(true)}
              className='w-full rounded-lg bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600'
            >
              Update Info
            </Button>
          </CardContent>
        </Card>

        {/* Modal for updating user info */}
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update User Info</DialogTitle>
            </DialogHeader>
            <div className='space-y-4'>
              <div>
                <Label htmlFor='fullName'>Full Name</Label>
                <Input id='fullName' name='fullName' value={updatedUser.fullName} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' name='email' value={updatedUser.email} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor='phone'>Phone</Label>
                <Input id='phone' name='phone' value={updatedUser.phone} onChange={handleInputChange} />
              </div>
              {/* Grouping Gender and Date of Birth in the same row */}
              <div className='flex gap-4'>
                <div className='w-1/2'>
                  <Label htmlFor='dateOfBirth'>Date of Birth</Label>
                  <Input
                    id='dateOfBirth'
                    name='dateOfBirth'
                    type='date'
                    value={updatedUser.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='w-1/2'>
                  <Label htmlFor='gender'>Gender</Label>
                  <select
                    id='gender'
                    name='gender'
                    value={updatedUser.gender}
                    onChange={handleInputChange}
                    className='w-full rounded-md border p-2'
                  >
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='mt-4'>
              <Button onClick={handleSubmit} className='w-full bg-blue-500 text-white hover:bg-blue-600'>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default UserProfile
