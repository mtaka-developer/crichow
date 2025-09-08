import { ReactNode } from "react";

interface DashboardPageWrapperProps {
  children: ReactNode;
}

export default function DashboardPageWrapper({ children }: DashboardPageWrapperProps) {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Content */}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}