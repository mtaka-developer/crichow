import { HouseholdCategoryData } from '@/types/data';

interface HouseholdCategorizationProps {
  data: HouseholdCategoryData;
}

export default function HouseholdCategorization({ data }: HouseholdCategorizationProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 font-anton">
        Household Categorization
      </h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Domestic Households */}
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 font-anton flex items-center">
              <svg className="w-5 h-5 text-mtaka-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Avg weekly Generation for households with only domestic waste
            </h4>
            
            <div className="text-sm text-gray-600 font-poppins mb-4">
              Based on {data.domestic.totalHouseholds} households across {data.domestic.totalWeeks} weeks
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-white p-3 rounded border border-green-300">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 font-poppins">Average Wet Waste</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-blue-600 font-anton">
                      {data.domestic.avgWeeklyWetWaste.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">kg</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-3 rounded border border-green-300">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 font-poppins">Average Dry Waste</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-practical-orange font-anton">
                      {data.domestic.avgWeeklyDryWaste.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">kg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Households */}
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 font-anton flex items-center">
              <svg className="w-5 h-5 text-practical-orange mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Avg weekly generation for households with domestic waste and business waste
            </h4>
            
            <div className="text-sm text-gray-600 font-poppins mb-4">
              Based on {data.business.totalHouseholds} households across {data.business.totalWeeks} weeks
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-white p-3 rounded border border-orange-300">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 font-poppins">Average Wet Waste</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-blue-600 font-anton">
                      {data.business.avgWeeklyWetWaste.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">kg</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-3 rounded border border-orange-300">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 font-poppins">Average Dry Waste</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-practical-orange font-anton">
                      {data.business.avgWeeklyDryWaste.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">kg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary comparison */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h5 className="text-md font-semibold text-gray-900 mb-3 font-anton">
          Summary Comparison
        </h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-600 font-poppins">Domestic Households</div>
            <div className="text-lg font-bold text-mtaka-green font-anton">{data.domestic.totalHouseholds}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 font-poppins">Business Households</div>
            <div className="text-lg font-bold text-practical-orange font-anton">{data.business.totalHouseholds}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 font-poppins">Domestic Avg/Week</div>
            <div className="text-lg font-bold text-blue-600 font-anton">
              {(data.domestic.avgWeeklyWetWaste + data.domestic.avgWeeklyDryWaste).toFixed(1)} kg
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 font-poppins">Business Avg/Week</div>
            <div className="text-lg font-bold text-purple-600 font-anton">
              {(data.business.avgWeeklyWetWaste + data.business.avgWeeklyDryWaste).toFixed(1)} kg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}