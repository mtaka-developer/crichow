import DashboardPageWrapper from "@/components/dashboard/DashboardPageWrapper";

export default function ExtrapolationPage() {
  return (
    <DashboardPageWrapper title="Extrapolation">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-practical-orange/10 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-practical-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 font-anton">
              Extrapolation
            </h2>
            <p className="text-gray-600 font-poppins text-sm">
              Predictive analysis and future projections
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-gray-900 mb-2 font-anton flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Future Projections
            </h3>
            <p className="text-gray-600 font-poppins text-sm">
              Based on current trends, predict future waste collection volumes and expansion potential to all 14 wards.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2 font-anton">Scaling Analysis</h3>
            <p className="text-gray-600 font-poppins text-sm">
              Model the impact of expanding the program to additional households and communities.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2 font-anton">Resource Planning</h3>
            <p className="text-gray-600 font-poppins text-sm">
              Estimate resource requirements for program expansion and sustainability.
            </p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-gray-900 mb-2 font-anton flex items-center">
              <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              Economic Impact
            </h3>
            <p className="text-gray-600 font-poppins text-sm">
              Calculate potential economic benefits and cost savings from expanded waste management programs.
            </p>
          </div>
        </div>
      </div>
    </DashboardPageWrapper>
  );
}