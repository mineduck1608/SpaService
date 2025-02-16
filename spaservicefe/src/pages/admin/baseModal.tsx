import { Dialog, DialogContent, DialogTrigger } from 'src/components/ui/dialog'
import { BaseForm } from './baseForm'
import { customerConfig, appointmentConfig } from './modal.util'
import { DialogTitle } from '@radix-ui/react-dialog'

const entityConfigMap: Record<string, any> = {
    Customer: customerConfig,
    Appointment: appointmentConfig,
    
}
export default function BaseModal({type, entity} : {type: 'Create' | 'Update', entity: string}) {
    const config = entityConfigMap[entity]
    return (
        <Dialog>
            <DialogTrigger>{type}</DialogTrigger>
            <DialogContent>
                <DialogTitle/>
                <BaseForm 
                    config={config} 
                    type={type}
                />
            </DialogContent>
        </Dialog>
    )
  }