import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent } from 'src/components/ui/dialog'
import { FieldConfig, generateZodSchema } from '../modal.util'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Button } from 'src/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'
import { Input } from 'src/components/ui/input'
import { handleUpdateSubmit } from './room.util'
import { roomConfig } from '../modal.util'
import { Floor } from 'src/types/type'
import { getAllFloors } from '../floors/floor.util'

interface UpdateRoomModalProps {
  isOpen: boolean
  onClose: () => void
  room: any
}

export default function UpdateRoomModal({ isOpen, onClose, room }: UpdateRoomModalProps) {
  const fieldsToUse = roomConfig.updatefields
  const [floors, setFloors] = useState<Floor[]>([])
  const formSchema = generateZodSchema(fieldsToUse)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(fieldsToUse.map((field: FieldConfig) => [field.name, '']))
  })

  const handleSubmit = async (data: any) => {
    const selectedFloor = floors.find((floor) => floor.floorId === data.floorId)
    if (selectedFloor) data.floorId = selectedFloor.floorId
    data.roomNum = parseInt(data.roomNum) || 0
    handleUpdateSubmit(room.roomId, data)
  }

  useEffect(() => {
    async function fetchFloors() {
      const data = await getAllFloors()
      setFloors(data)
      if (room) {
        Object.keys(room).forEach((key: string) => {
          if (form.getValues(key) !== undefined) {
            form.setValue(key, room[key])
          }
        })
      }
    }
    fetchFloors()
  }, [room, form])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='px-10'>
        <DialogTitle className='flex justify-center'>Update Room</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            {fieldsToUse.map((field: FieldConfig) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem className='mt-2 grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-md text-right'>{field.label}</FormLabel>
                    <div className='col-span-3 space-y-1'>
                      <FormControl>
                        {field.type === 'select' ? (
                          <Select
                            value={form.watch('floorId') || ''}
                            onValueChange={(value) => {
                              form.setValue('floorId', value)
                            }}
                            disabled={field.readonly}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {floors.map((floor) => (
                                <SelectItem key={floor.floorId} value={floor.floorId}>
                                  {floor.floorNum}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            {...formField}
                            type={field.type}
                            placeholder={field.placeholder}
                            disabled={field.readonly}
                          />
                        )}
                      </FormControl>
                      <FormMessage className='text-sm' />
                    </div>
                  </FormItem>
                )}
              />
            ))}
            <div className='mt-10 flex justify-end'>
              <Button type='submit'>Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
