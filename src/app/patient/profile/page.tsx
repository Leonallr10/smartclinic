import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/server-auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProfileForm from '@/components/features/patient/ProfileForm';

export default async function PatientProfilePage() {
  const session = await getSession();

  const patient = await prisma.patient.findUnique({
    where: { userId: session.id },
    include: { user: true },
  });

  if (!patient) return <div className="p-8 text-gray-500">Profile not found.</div>;

  return (
    <DashboardLayout role="patient" userName={patient.user.name}>
      <div className="max-w-2xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-1">Update your personal and health information</p>
        </header>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <ProfileForm
            patientId={patient.id}
            initialData={{
              phone: patient.phone || '',
              dateOfBirth: patient.dateOfBirth?.toISOString().split('T')[0] || '',
              bloodGroup: patient.bloodGroup || '',
              address: patient.address || '',
            }}
          />
        </section>
      </div>
    </DashboardLayout>
  );
}
