'use client';

import { useState } from 'react';
import BookAppointmentModal from '@/components/features/appointments/BookAppointmentModal';
import AppointmentActions from '@/components/features/appointments/AppointmentActions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Appointment {
  id: string;
  scheduledAt: string;
  status: string;
  notes: string | null;
  doctor: {
    specialisation: string | null;
    user: { name: string };
  };
}

const statusVariant: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-700 hover:bg-amber-100',
  CONFIRMED: 'bg-green-100 text-green-700 hover:bg-green-100',
  COMPLETED: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
  CANCELLED: 'bg-gray-100 text-gray-500 hover:bg-gray-100',
};

export default function PatientDashboardClient({ appointments }: { appointments: Appointment[] }) {
  const [bookOpen, setBookOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">My Appointments</h2>
        <Button onClick={() => setBookOpen(true)} size="sm">
          Book New
        </Button>
      </div>

      {appointments.length === 0 ? (
        <p className="text-sm text-muted-foreground">No appointments yet. Book your first one!</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((app) => (
            <Card key={app.id} className="hover:border-primary/30 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Dr. {app.doctor.user.name}</p>
                    <p className="text-sm text-muted-foreground">{app.doctor.specialisation || 'General'}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className={statusVariant[app.status]}>
                      {app.status}
                    </Badge>
                    <p className="text-sm font-medium text-foreground mt-1">
                      {new Date(app.scheduledAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(app.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <AppointmentActions appointmentId={app.id} status={app.status} role="PATIENT" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <BookAppointmentModal open={bookOpen} onClose={() => setBookOpen(false)} />
    </>
  );
}
