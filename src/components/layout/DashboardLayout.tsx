'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { type ReactNode } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface NavItem {
  label: string;
  href: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'patient' | 'doctor' | 'admin';
  userName: string;
}

const navItems: Record<string, NavItem[]> = {
  patient: [
    { label: 'Dashboard', href: '/patient/dashboard' },
    { label: 'Records', href: '/patient/records' },
    { label: 'Prescriptions', href: '/patient/prescriptions' },
    { label: 'Profile', href: '/patient/profile' },
  ],
  doctor: [
    { label: 'Dashboard', href: '/doctor/dashboard' },
    { label: 'Profile', href: '/doctor/profile' },
  ],
  admin: [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Users', href: '/admin/users' },
    { label: 'Doctors', href: '/admin/doctors' },
  ],
};

export default function DashboardLayout({ children, role, userName }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const items = navItems[role];

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/auth/login');
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-5 border-b">
          <Link href="/" className="text-lg font-bold text-primary">SmartClinic</Link>
          <p className="text-xs text-muted-foreground mt-1 capitalize">{role} Portal</p>
        </SidebarHeader>

        <SidebarContent className="p-2">
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                >
                  <Link href={item.href}>
                    {item.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t">
          <p className="text-sm font-medium text-foreground truncate">{userName}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="mt-1 w-full justify-start text-muted-foreground hover:text-destructive"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-2 border-b bg-background/95 backdrop-blur px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <Separator orientation="vertical" className="h-6 md:hidden" />
            <span className="text-sm font-bold text-primary md:hidden">SmartClinic</span>
          </div>
          <ThemeToggle />
        </header>
        <main className="p-6 md:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
