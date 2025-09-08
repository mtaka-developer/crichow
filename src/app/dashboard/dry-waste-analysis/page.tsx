import DashboardPageWrapper from "@/components/dashboard/DashboardPageWrapper";

export default function DryWasteAnalysisPage() {
  return (
    <DashboardPageWrapper >
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-mtaka-green/10 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-mtaka-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 font-anton">
              Dry Waste Analysis
            </h2>
            <p className="text-gray-600 font-poppins text-sm">
              Analysis of dry waste collection and segregation data
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2 font-anton">Data Visualization</h3>
            <p className="text-gray-600 font-poppins text-sm">
              Charts and graphs showing dry waste collection patterns, types, and volumes will be displayed here.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2 font-anton">Key Metrics</h3>
            <p className="text-gray-600 font-poppins text-sm">
              Important statistics related to dry waste management across the project areas.
            </p>
          </div>
        </div>
      </div>
    </DashboardPageWrapper>
  );
}