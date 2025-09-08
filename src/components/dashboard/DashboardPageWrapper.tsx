import { ReactNode } from "react";

interface DashboardPageWrapperProps {
  title: string;
  children: ReactNode;
}

export default function DashboardPageWrapper({ title, children }: DashboardPageWrapperProps) {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 font-anton">{title}</h1>
      </div>

      {/* Page Content */}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}