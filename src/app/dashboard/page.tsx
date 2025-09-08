import DashboardPageWrapper from "@/components/dashboard/DashboardPageWrapper";

export default function SummaryPage() {
  return (
    <DashboardPageWrapper title="Summary">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 font-anton">
          CRICHOW Project Summary
        </h2>
        <p className="text-gray-600 font-poppins">
          Welcome to the CRICHOW dashboard. This section will display key project metrics and overview data.
        </p>
        
        {/* Placeholder for future content */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
            <h3 className="font-semibold text-gray-900 mb-2 font-anton">Households</h3>
            <p className="text-2xl font-bold text-mtaka-green font-anton">138</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
            <h3 className="font-semibold text-gray-900 mb-2 font-anton">Groups</h3>
            <p className="text-2xl font-bold text-practical-orange font-anton">13</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
            <h3 className="font-semibold text-gray-900 mb-2 font-anton">Wards</h3>
            <p className="text-2xl font-bold text-mtaka-green font-anton">13</p>
          </div>
        </div>
      </div>
    </DashboardPageWrapper>
  );
}