import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { Appointment } from '@/types/type';
import { MoreHorizontal } from 'lucide-react';
import { EditAppointmentModal } from './UpdateAppointmentModal';
import { handleCheckInAPI, handleCheckOutAPI, UpdateAppoitment } from './appointments.util';

interface AppointmentActionsProps {
  appointment: Appointment;
}

const AppointmentActions: React.FC<AppointmentActionsProps> = ({ appointment }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const handleCheckIn = async () => {
    try {
      await handleCheckInAPI(appointment.appointmentId);
    } catch (error) {
      console.error('Error during check-in:', error);
    }
  };

  const handleCheckOut = async () => {
    try {
      await handleCheckOutAPI(appointment.appointmentId);
    } catch (error) {
      console.error('Error during check-out:', error);
    }
  };

  const handleSave = (updatedAppointment: Appointment, roomId: string) => {
    UpdateAppoitment(updatedAppointment, roomId);
  };

  const renderAction = () => {
    if (appointment.status === 'Pending') {
      return (
        <DropdownMenuItem onClick={handleCheckIn}>
          Check-in
        </DropdownMenuItem>
      );
    } else if (appointment.status === 'Processing') {
      return (
        <DropdownMenuItem onClick={handleCheckOut}>
          Check-out
        </DropdownMenuItem>
      );
    } else {
      return (
        <DropdownMenuItem onClick={handleCheckIn}>
          Check-in
        </DropdownMenuItem>
      );
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(appointment.appointmentId)}>
            Copy appointment ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={openEditModal}>Update</DropdownMenuItem>
          <DropdownMenuSeparator />
          {renderAction()}
        </DropdownMenuContent>
      </DropdownMenu>

      <EditAppointmentModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        appointment={appointment}
        onSave={handleSave}
      />
    </>
  );
};

export default AppointmentActions;
