import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from 'src/components/ui/dialog'
import { BaseForm } from './baseForm'
import { entityConfigMap, BaseModalProps } from './modal.util'
import { DialogTitle, DialogDescription } from '@radix-ui/react-dialog'
import { Button } from 'src/components/ui/button'
import { DropdownMenuItem } from 'src/components/ui/dropdown-menu'

export default function BaseModal({type, entity, rowData} : BaseModalProps) {
  const config = entityConfigMap[entity]
  const isCreate = type === 'Create'
  const [open, setOpen] = useState(false)
  const handleOpenChange = (open: boolean) => { setOpen(open) }
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpen(true)
  }
    
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {isCreate ? (
          <Button variant='outline'>{type}</Button>
        ) : (
          <DropdownMenuItem onSelect={(e) => {
            e.preventDefault()
          }}>
            <div onClick={handleClick}>{type}</div>
          </DropdownMenuItem>
        )}
      </DialogTrigger>
      <DialogContent className={isCreate ? 'px-10' : ''}>
        <DialogTitle className={isCreate ? 'flex justify-center' : ''}>{type} {entity}</DialogTitle>
        <BaseForm config={config} type={type} initialData={isCreate ? undefined : rowData} />
      </DialogContent>
    </Dialog>
  )
}