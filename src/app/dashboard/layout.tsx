import { ReactNode } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader />

      {/* Main Content Area */}
      <div className="w-full">

        {/* Page Content */}
        <main className="pt-24 p-6">{children}</main>
      </div>
    </div>
  );
}
