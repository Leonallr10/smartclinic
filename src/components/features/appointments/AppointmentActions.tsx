'use client';

import { useAppointmentActions } from '@/hooks/useAppointments';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface Props {
  appointmentId: string;
  status: string;
  role: 'PATIENT' | 'DOCTOR';
}

export default function AppointmentActions({ appointmentId, status, role }: Props) {
  const { updateStatus, cancelAppointment, loading } = useAppointmentActions();
  const router = useRouter();

  async function handle(action: string) {
    let success = false;
    if (action === 'cancel') {
      success = await cancelAppointment(appointmentId);
    } else {
      success = await updateStatus(appointmentId, action);
    }
    if (success) {
      toast.success(`Appointment ${action.toLowerCase()}ed`);
      router.refresh();
    } else {
      toast.error('Action failed');
    }
  }

  if (status === 'COMPLETED' || status === 'CANCELLED') return null;

  return (
    <div className="flex gap-2 mt-2">
      {role === 'DOCTOR' && status === 'PENDING' && (
        <Button
          onClick={() => handle('CONFIRMED')}
          disabled={loading}
          variant="outline"
          size="sm"
          className="border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800"
        >
          Confirm
        </Button>
      )}
      {role === 'DOCTOR' && status === 'CONFIRMED' && (
        <Button
          onClick={() => handle('COMPLETED')}
          disabled={loading}
          variant="outline"
          size="sm"
          className="border-blue-200 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
        >
          Complete
        </Button>
      )}
      <Button
        onClick={() => handle('cancel')}
        disabled={loading}
        variant="destructive"
        size="sm"
      >
        Cancel
      </Button>
    </div>
  );
}
