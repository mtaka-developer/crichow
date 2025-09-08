import DashboardPageWrapper from "@/components/dashboard/DashboardPageWrapper";

export default function CumulativeGroupDataPage() {
  return (
    <DashboardPageWrapper title="Cumulative Group Data">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-practical-orange/10 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-practical-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 font-anton">
              Cumulative Group Data
            </h2>
            <p className="text-gray-600 font-poppins text-sm">
              Consolidated data from all waste management groups
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2 font-anton">Group Performance</h3>
            <p className="text-gray-600 font-poppins text-sm">
              Overview of all 13 waste management groups and their collective performance metrics.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibent text-gray-900 mb-2 font-anton">Collection Trends</h3>
            <p className="text-gray-600 font-poppins text-sm">
              Trends and patterns in waste collection across different groups and time periods.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2 font-anton">Comparative Analysis</h3>
            <p className="text-gray-600 font-poppins text-sm">
              Comparison of group performance and identification of best practices.
            </p>
          </div>
        </div>
      </div>
    </DashboardPageWrapper>
  );
}