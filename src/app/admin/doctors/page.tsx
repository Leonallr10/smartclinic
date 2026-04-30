import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/server-auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DoctorVerificationList from '@/components/features/admin/DoctorVerificationList';

export default async function AdminDoctorsPage() {
  const session = await getSession();
  const admin = await prisma.user.findUnique({ where: { id: session.id } });
  if (!admin) return null;

  const doctors = await prisma.doctor.findMany({
    include: {
      user: { select: { name: true, email: true, createdAt: true } },
    },
    orderBy: { user: { createdAt: 'desc' } },
  });

  return (
    <DashboardLayout role="admin" userName={admin.name}>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-gray-900">Doctor Verification</h1>
          <p className="text-gray-500 mt-1">Review and verify doctor registrations</p>
        </header>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <DoctorVerificationList doctors={JSON.parse(JSON.stringify(doctors))} />
        </section>
      </div>
    </DashboardLayout>
  );
}
