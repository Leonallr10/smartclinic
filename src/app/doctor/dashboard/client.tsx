'use client';

import Link from 'next/link';
import AppointmentActions from '@/components/features/appointments/AppointmentActions';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Appointment {
  id: string;
  scheduledAt: string;
  status: string;
  notes: string | null;
  patient: {
    user: { name: string };
  };
}

import { appointmentStatusColors } from '@/lib/status-colors';

export default function DoctorDashboardClient({ appointments }: { appointments: Appointment[] }) {
  if (appointments.length === 0) {
    return <p className="text-sm text-muted-foreground">No appointments.</p>;
  }

  return (
    <div className="space-y-4">
      {appointments.map((app) => (
        <Card key={app.id} className="hover:border-primary/30 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{app.patient.user.name}</p>
                {app.notes && <p className="text-xs text-muted-foreground mt-0.5">{app.notes}</p>}
              </div>
              <div className="text-right">
                <Badge variant="secondary" className={appointmentStatusColors[app.status]}>
                  {app.status}
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(app.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <AppointmentActions appointmentId={app.id} status={app.status} role="DOCTOR" />
              {app.status === 'CONFIRMED' && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/doctor/session/${app.id}`}>
                    Start Session
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
