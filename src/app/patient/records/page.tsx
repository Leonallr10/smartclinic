import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/server-auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default async function PatientRecordsPage() {
  const session = await getSession();

  const patient = await prisma.patient.findUnique({
    where: { userId: session.id },
    include: { user: true },
  });

  if (!patient) return <div className="p-8 text-gray-500">Profile not found.</div>;

  const records = await prisma.medicalRecord.findMany({
    where: { patientId: patient.id },
    include: {
      doctor: { include: { user: { select: { name: true } } } },
      appointment: { select: { scheduledAt: true } },
    },
    orderBy: { recordedAt: 'desc' },
  });

  return (
    <DashboardLayout role="patient" userName={patient.user.name}>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-500 mt-1">Your visit history and AI summaries</p>
        </header>

        {records.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <p className="text-gray-500">No medical records yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {records.map((record) => (
              <div key={record.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{record.diagnosis}</p>
                    <p className="text-sm text-gray-500">Dr. {record.doctor.user.name}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(record.recordedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Symptoms</p>
                    <p className="text-sm text-gray-700">{record.symptoms}</p>
                  </div>

                  {record.aiSummary && (
                    <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 mt-2">
                      <p className="text-xs font-medium text-purple-600 uppercase mb-1">AI Summary</p>
                      <p className="text-sm text-purple-900 whitespace-pre-wrap">{record.aiSummary}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
