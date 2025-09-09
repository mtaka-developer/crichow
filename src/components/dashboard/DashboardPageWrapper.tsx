import { ReactNode } from "react";

interface DashboardPageWrapperProps {
  children: ReactNode;
  title?: string;
}

export default function DashboardPageWrapper({ children, title }: DashboardPageWrapperProps) {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      {title && (
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-gray-900 font-sans">{title}</h2>
        </div>
      )}
      
      {/* Page Content */}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}