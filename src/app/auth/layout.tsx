import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Activity } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-primary p-12 text-primary-foreground">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="size-8" />
            <span className="text-2xl font-bold">SmartClinic</span>
          </div>
          <p className="mt-2 text-sm text-primary-foreground/70">AI-Powered Healthcare Platform</p>
        </div>

        <div className="space-y-6">
          <blockquote className="text-lg font-medium leading-relaxed">
            &ldquo;SmartClinic transformed how we manage patient care. The AI symptom checker
            alone has saved us countless hours of initial triage.&rdquo;
          </blockquote>
          {/* <div>
            <p className="font-semibold">Dr. Sarah Mitchell</p>
            <p className="text-sm text-primary-foreground/70">General Practitioner</p>
          </div> */}
        </div>

        <p className="text-xs text-primary-foreground/50">
          &copy; {new Date().getFullYear()} SmartClinic. All rights reserved.
        </p>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-4 lg:justify-end">
          <div className="flex items-center gap-2 lg:hidden">
            <Activity className="size-5 text-primary" />
            <span className="text-lg font-bold text-primary">SmartClinic</span>
          </div>
          <ThemeToggle />
        </div>
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}
