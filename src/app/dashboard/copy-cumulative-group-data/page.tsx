import DashboardPageWrapper from "@/components/dashboard/DashboardPageWrapper";

export default function CopyCumulativeGroupDataPage() {
  return (
    <DashboardPageWrapper title="Copy of Cumulative Group Data">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-mtaka-green/10 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-mtaka-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 font-anton">
              Copy of Cumulative Group Data
            </h2>
            <p className="text-gray-600 font-poppins text-sm">
              Duplicate view of cumulative group data for comparison
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-2 font-anton flex items-center">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Duplicate Dataset View
            </h3>
            <p className="text-gray-600 font-poppins text-sm">
              This page contains a copy of the cumulative group data for backup analysis or comparison purposes.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2 font-anton">Secondary Analysis</h3>
            <p className="text-gray-600 font-poppins text-sm">
              Alternative views and analysis of the same cumulative group data with different perspectives.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2 font-anton">Historical Comparison</h3>
            <p className="text-gray-600 font-poppins text-sm">
              Compare current data with historical baselines or previous reporting periods.
            </p>
          </div>
        </div>
      </div>
    </DashboardPageWrapper>
  );
}