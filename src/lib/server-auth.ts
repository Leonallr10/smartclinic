import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';

const secretKey = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-secret-key-for-development'
);

export interface Session {
  id: string;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
}

export async function getSession(): Promise<Session> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  try {
    const { payload } = await jwtVerify(token, secretKey);
    return { id: payload.id as string, role: payload.role as Session['role'] };
  } catch {
    redirect('/auth/login');
  }
}
