"use client";

import { useState, useEffect, useMemo } from 'react';
import DashboardPageWrapper from "@/components/dashboard/DashboardPageWrapper";
import KPICard from "@/components/dashboard/KPICard";
import { ExtrapolationData } from '@/types/data';

export default function ExtrapolationPage() {
  const [loading, setLoading] = useState(true);
  const [extrapolationData] = useState<ExtrapolationData>({
    avgWeeklyWetWastePerHousehold: 23.73,
    avgWeeklyDryWastePerHousehold: 15.42,
    avgWeeklyTotalWeightPerHousehold: 39.15,
    avgDailyWetWastePerHousehold: 3.39,
    avgDailyDryWastePerHousehold: 2.2,
    avgDailyTotalWeightPerHousehold: 5.59,
    avgMonthlyWetWastePerHousehold: 94.92,
    avgMonthlyDryWastePerHousehold: 61.67,
    avgMonthlyTotalWeightPerHousehold: 156.59,
    extrapolatedTotalWetWaste: 762000,
    extrapolatedTotalDryWaste: 489000,
    extrapolatedTotalWeight: 1251000
  });

  // Project targets - hardcoded as per requirements
  const projectTargets = useMemo(() => ({
    numberOfGroups: 15,
    numberOfHouseholds: 2000,
    numberOfWeeks: 31
  }), []);

  // Simulate loading since values are hardcoded
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  if (loading) {
    return (
      <DashboardPageWrapper>
        <div className="flex items-center justify-center min-h-64">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mtaka-green"></div>
            <span className="text-gray-600 font-poppins">Loading extrapolation data...</span>
          </div>
        </div>
      </DashboardPageWrapper>
    );
  }

  return (
    <DashboardPageWrapper>

      <div className="space-y-8">
        {/* Row 1: Project Target Inputs */}
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-4 font-sans">
            Project Target Inputs
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KPICard
              title="Number of Groups"
              value={projectTargets.numberOfGroups}
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              }
              colorClass="text-mtaka-green"
            />
            <KPICard
              title="Number of Households"
              value={projectTargets.numberOfHouseholds.toLocaleString()}
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              }
              colorClass="text-practical-orange"
            />
            <KPICard
              title="Number of Weeks"
              value={projectTargets.numberOfWeeks}
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              }
              colorClass="text-gray-600"
            />
          </div>
        </div>

        {/* Row 2: Average Weekly Generation Per Household */}
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-4 font-sans">
            Average Weekly Generation Per Household
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KPICard
              title="Avg Wet Waste"
              value={extrapolationData.avgWeeklyWetWastePerHousehold}
              unit="kg"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              }
              colorClass="text-mtaka-green"
            />
            <KPICard
              title="Avg Dry Waste"
              value={extrapolationData.avgWeeklyDryWastePerHousehold}
              unit="kg"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              }
              colorClass="text-practical-orange"
            />
            <KPICard
              title="Avg Total Weight"
              value={extrapolationData.avgWeeklyTotalWeightPerHousehold}
              unit="kg"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              }
              colorClass="text-gray-600"
            />
          </div>
        </div>

        {/* Row 3: Average Daily Generation Per Household */}
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-4 font-sans">
            Average Daily Generation Per Household
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KPICard
              title="Avg Wet Waste"
              value={extrapolationData.avgDailyWetWastePerHousehold}
              unit="kg"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              }
              colorClass="text-mtaka-green"
            />
            <KPICard
              title="Avg Dry Waste"
              value={extrapolationData.avgDailyDryWastePerHousehold}
              unit="kg"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              }
              colorClass="text-practical-orange"
            />
            <KPICard
              title="Avg Total Weight"
              value={extrapolationData.avgDailyTotalWeightPerHousehold}
              unit="kg"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              }
              colorClass="text-gray-600"
            />
          </div>
        </div>

        {/* Row 4: Average Monthly Generation Per Household */}
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-4 font-sans">
            Average Monthly Generation Per Household
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KPICard
              title="Avg Wet Waste"
              value={extrapolationData.avgMonthlyWetWastePerHousehold}
              unit="kg"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              }
              colorClass="text-mtaka-green"
            />
            <KPICard
              title="Avg Dry Waste"
              value={extrapolationData.avgMonthlyDryWastePerHousehold}
              unit="kg"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              }
              colorClass="text-practical-orange"
            />
            <KPICard
              title="Avg Total Weight"
              value={extrapolationData.avgMonthlyTotalWeightPerHousehold}
              unit="kg"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              }
              colorClass="text-gray-600"
            />
          </div>
        </div>

        {/* Row 5: Extrapolated Total Weight */}
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-4 font-sans">
            Extrapolated Total Weight Projections
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KPICard
              title="Total Wet Waste"
              value={extrapolationData.extrapolatedTotalWetWaste}
              unit="kg"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              }
              colorClass="text-mtaka-green"
            />
            <KPICard
              title="Total Dry Waste"
              value={extrapolationData.extrapolatedTotalDryWaste}
              unit="kg"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              }
              colorClass="text-practical-orange"
            />
            <KPICard
              title="Total Weight"
              value={extrapolationData.extrapolatedTotalWeight}
              unit="kg"
              icon={
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              }
              colorClass="text-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-600 font-poppins">
          <strong>Note:</strong> All calculations are based on the complete
          historical dataset. Weekly averages are calculated per household
          across all unique weeks in the data. Daily values are weekly averages
          ÷ 7, monthly values are weekly averages × 4. Final projections use the
          target values of 2,000 households over 31 weeks.
        </p>
      </div>
    </DashboardPageWrapper>
  );
}