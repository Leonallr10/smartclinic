import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/server-auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DoctorDashboardClient from './client';
import SmartSearch from '@/components/features/doctor/SmartSearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

export default async function DoctorDashboard() {
  const session = await getSession();

  const doctor = await prisma.doctor.findUnique({
    where: { userId: session.id },
    include: {
      appointments: {
        include: { patient: { include: { user: true } } },
        orderBy: { scheduledAt: 'asc' },
      },
      user: true,
    },
  });

  if (!doctor) {
    return <div className="p-8 text-center text-muted-foreground">Doctor profile not found.</div>;
  }

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const todayAppointments = doctor.appointments.filter(
    (a) => new Date(a.scheduledAt) >= todayStart && new Date(a.scheduledAt) <= todayEnd
  );

  const upcomingAppointments = doctor.appointments.filter(
    (a) => new Date(a.scheduledAt) > todayEnd && a.status !== 'CANCELLED'
  );

  return (
    <DashboardLayout role="doctor" userName={doctor.user.name}>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-foreground">Dr. {doctor.user.name}</h1>
          <p className="text-muted-foreground mt-1">{doctor.specialisation || 'General Practice'}</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Today's Appointments", value: todayAppointments.length, icon: CalendarCheck, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
            { label: 'Upcoming', value: upcomingAppointments.length, icon: Clock, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30' },
            { label: 'Pending', value: doctor.appointments.filter((a) => a.status === 'PENDING').length, icon: AlertCircle, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30' },
            { label: 'Completed', value: doctor.appointments.filter((a) => a.status === 'COMPLETED').length, icon: CheckCircle2, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`rounded-lg p-2.5 ${stat.bg}`}>
                  <stat.icon className={`size-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Today&apos;s Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <DoctorDashboardClient
                  appointments={JSON.parse(JSON.stringify(todayAppointments))}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <DoctorDashboardClient
                  appointments={JSON.parse(JSON.stringify(upcomingAppointments))}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Smart Search</CardTitle>
              </CardHeader>
              <CardContent>
                <SmartSearch />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
