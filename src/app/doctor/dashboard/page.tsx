import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/server-auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DoctorDashboardClient from './client';
import SmartSearch from '@/components/features/doctor/SmartSearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
            { label: "Today's Appointments", value: todayAppointments.length },
            { label: 'Upcoming', value: upcomingAppointments.length },
            { label: 'Pending Confirmation', value: doctor.appointments.filter((a) => a.status === 'PENDING').length },
            { label: 'Completed', value: doctor.appointments.filter((a) => a.status === 'COMPLETED').length },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
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
