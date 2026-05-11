'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { type ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { roleColors, activeStatusColors } from '@/lib/status-colors';

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

  const columns: ColumnDef<User, unknown>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
      cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span>,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
      cell: ({ row }) => <span className="text-muted-foreground">{row.getValue('email')}</span>,
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        const role = row.getValue('role') as string;
        return (
          <Badge variant="secondary" className={roleColors[role]}>
            {role}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ row }) => {
        const isActive = row.getValue('isActive') as boolean;
        return (
          <Badge variant="secondary" className={isActive ? activeStatusColors.active : activeStatusColors.inactive}>
            {isActive ? 'Active' : 'Inactive'}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const user = row.original;
        return (
          <Button
            onClick={() => toggleActive(user.id, user.isActive)}
            variant="outline"
            size="sm"
            className={
              user.isActive
                ? 'text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-700'
                : 'text-green-600 border-green-200 hover:bg-green-50 dark:hover:bg-green-950/30 hover:text-green-700'
            }
          >
            {user.isActive ? 'Deactivate' : 'Activate'}
          </Button>
        );
      },
    },
  ];

  const filtered = filter ? users.filter((u) => u.role === filter) : users;

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

      <DataTable
        columns={columns}
        data={filtered}
        pageSize={10}
        searchKey="name"
        searchPlaceholder="Search by name..."
      />
    </div>
  );
}
