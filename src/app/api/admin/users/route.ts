import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const user = await verifyToken(req);
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const role = req.nextUrl.searchParams.get('role');
  const search = req.nextUrl.searchParams.get('search');

  const users = await prisma.user.findMany({
    where: {
      ...(role && { role: role as any }),
      ...(search && { name: { contains: search, mode: 'insensitive' } }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return NextResponse.json(users);
}
