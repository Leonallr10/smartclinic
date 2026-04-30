'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export default function UserTable({ users: initialUsers }: { users: User[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [filter, setFilter] = useState('');
  const router = useRouter();

  async function toggleActive(id: string, currentState: boolean) {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !currentState }),
    });
    if (res.ok) {
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, isActive: !currentState } : u))
      );
      toast.success(`User ${!currentState ? 'activated' : 'deactivated'}`);
      router.refresh();
    } else {
      toast.error('Action failed');
    }
  }

  const filtered = filter
    ? users.filter((u) => u.role === filter)
    : users;

  const roleColors: Record<string, string> = {
    PATIENT: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
    DOCTOR: 'bg-purple-100 text-purple-700 hover:bg-purple-100',
    ADMIN: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {['', 'PATIENT', 'DOCTOR', 'ADMIN'].map((r) => (
          <Button
            key={r}
            onClick={() => setFilter(r)}
            variant={filter === r ? 'default' : 'outline'}
            size="sm"
            className="rounded-full"
          >
            {r || 'All'}
          </Button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell className="text-muted-foreground">{u.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={roleColors[u.role]}>
                    {u.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={u.isActive ? 'secondary' : 'destructive'} className={
                    u.isActive ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''
                  }>
                    {u.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => toggleActive(u.id, u.isActive)}
                    variant="outline"
                    size="sm"
                    className={
                      u.isActive
                        ? 'text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700'
                        : 'text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700'
                    }
                  >
                    {u.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
