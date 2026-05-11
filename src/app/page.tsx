import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const features = [
  {
    icon: "👤",
    title: "Patients",
    desc: "Register, manage your profile, medical history, and delete your account.",
  },
  {
    icon: "🩺",
    title: "Doctors",
    desc: "Create profiles, set availability, and manage your specialisation.",
  },
  {
    icon: "📅",
    title: "Appointments",
    desc: "Book, reschedule, cancel appointments with real-time status tracking.",
  },
  {
    icon: "💊",
    title: "Prescriptions",
    desc: "Create, update, download as PDF, and archive prescriptions.",
  },
  {
    icon: "📋",
    title: "Records",
    desc: "Upload notes, view history, and manage access control.",
  },
];

const aiFeatures = [
  {
    step: "01",
    title: "Symptom Checker",
    desc: "Describe your symptoms — AI suggests urgency level and possible specialisation.",
  },
  {
    step: "02",
    title: "Appointment Summary",
    desc: "AI auto-generates a visit summary after a doctor closes a session.",
  },
  {
    step: "03",
    title: "Prescription Assistant",
    desc: "Doctor types notes — AI drafts a structured prescription for review.",
  },
  {
    step: "04",
    title: "Smart Search",
    desc: "Semantic search over patient records using embeddings.",
  },
];

const roles = [
  {
    role: "Patient",
    color: "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    perks: ["Book & view appointments", "Access your medical records", "AI symptom checker"],
  },
  {
    role: "Doctor",
    color: "bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-800",
    badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
    perks: ["Manage your schedule", "Write & draft prescriptions", "AI-generated visit summaries"],
  },
  {
    role: "Admin",
    color: "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
    perks: ["Full CRUD access", "User management", "Platform oversight"],
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight text-primary">SmartClinic</span>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#ai" className="hover:text-foreground transition">AI</a>
            <a href="#roles" className="hover:text-foreground transition">Roles</a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/auth/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full uppercase tracking-wide">
          AI-assisted · Multi-role · Full-stack
        </span>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight mb-6">
          Healthcare, <span className="text-primary">smarter.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed mb-10">
          SmartClinic is a multi-role healthcare platform where patients book appointments,
          doctors manage schedules, and an AI assistant handles symptom triage, follow-up
          summaries, and prescription drafting.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/auth/register"
            className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition shadow-sm"
          >
            Create an account
          </Link>
          <Link
            href="/auth/login"
            className="px-8 py-3 border text-foreground font-medium rounded-xl hover:bg-muted transition"
          >
            Sign in
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-muted/50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-3">Core modules</h2>
          <p className="text-center text-muted-foreground mb-12">Everything a modern clinic needs, in one platform.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-card rounded-2xl border p-6 hover:shadow-md transition"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section id="ai" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-3">AI touchpoints</h2>
          <p className="text-center text-muted-foreground mb-12">Built-in AI that feels essential, not bolted-on.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {aiFeatures.map((a) => (
              <div
                key={a.step}
                className="flex gap-5 bg-muted/50 rounded-2xl border p-6 hover:shadow-md transition"
              >
                <span className="text-2xl font-bold text-primary/30 shrink-0">{a.step}</span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{a.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="bg-muted/50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-3">Built for every role</h2>
          <p className="text-center text-muted-foreground mb-12">Distinct flows with role-based access control.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {roles.map((r) => (
              <div
                key={r.role}
                className={`rounded-2xl border p-6 ${r.color}`}
              >
                <span className={`inline-block mb-4 px-3 py-1 text-xs font-semibold rounded-full ${r.badge}`}>
                  {r.role}
                </span>
                <ul className="space-y-2">
                  {r.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="mt-0.5 text-primary">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8">Join SmartClinic and experience AI-powered healthcare management.</p>
          <Link
            href="/auth/register"
            className="inline-block px-10 py-3.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition shadow-sm"
          >
            Create your free account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-2">Built by Leonal Robin D</p>
        <div className="flex items-center justify-center gap-4 mb-3">
          <a
            href="https://github.com/Leonallr10"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            GitHub
          </a>
          <span className="text-muted-foreground/50">|</span>
          <a
            href="https://www.linkedin.com/in/leonal-robin-47b681284/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            LinkedIn
          </a>
        </div>
        <p className="text-muted-foreground/60">© {new Date().getFullYear()} SmartClinic. All rights reserved.</p>
      </footer>
    </div>
  );
}
