import { Sidebar } from "@/components/sidebar";
import { TopHeader } from "@/components/top-header";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen healthcare-grid">
      <Sidebar />
      <div className="lg:pl-72">
        <TopHeader />
        <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}