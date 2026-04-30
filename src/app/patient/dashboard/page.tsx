import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/server-auth';
import SymptomChecker from '@/components/features/ai/SymptomChecker';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PatientDashboardClient from './client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function PatientDashboard() {
  const session = await getSession();

  const patient = await prisma.patient.findUnique({
    where: { userId: session.id },
    include: {
      appointments: {
        include: { doctor: { include: { user: true } } },
        orderBy: { scheduledAt: 'desc' },
        take: 10,
      },
      symptomChecks: {
        orderBy: { checkedAt: 'desc' },
        take: 5,
      },
      user: true,
    },
  });

  if (!patient) {
    return <div className="p-8 text-center text-muted-foreground">Patient profile not found.</div>;
  }

  return (
    <DashboardLayout role="patient" userName={patient.user.name}>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-foreground">Welcome, {patient.user.name}</h1>
          <p className="text-muted-foreground mt-1">Patient Dashboard</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>AI Symptom Checker</CardTitle>
              </CardHeader>
              <CardContent>
                <SymptomChecker />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <PatientDashboardClient
                  appointments={JSON.parse(JSON.stringify(patient.appointments))}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Checks</CardTitle>
              </CardHeader>
              <CardContent>
                {patient.symptomChecks.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No recent symptom checks.</p>
                ) : (
                  <div className="space-y-3">
                    {patient.symptomChecks.map((check) => (
                      <div key={check.id} className="p-3 bg-muted rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <Badge variant="secondary" className={
                            check.aiUrgency === 'HIGH' || check.aiUrgency === 'EMERGENCY'
                              ? 'bg-red-100 text-red-700 hover:bg-red-100'
                              : check.aiUrgency === 'MEDIUM'
                              ? 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                              : 'bg-green-100 text-green-700 hover:bg-green-100'
                          }>
                            {check.aiUrgency}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground">
                            {new Date(check.checkedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{check.symptoms}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
