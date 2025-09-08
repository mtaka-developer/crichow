"use client";

import { FilterState } from '@/types/data';

interface FilterComponentsProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  groups: string[];
  households: string[];
}

export default function FilterComponents({ filters, onFiltersChange, groups, households }: FilterComponentsProps) {
  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    const date = value ? new Date(value) : null;
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: date
      }
    });
  };

  const handleGroupChange = (value: string) => {
    onFiltersChange({
      ...filters,
      selectedGroup: value
    });
  };

  const handleHouseholdChange = (value: string) => {
    onFiltersChange({
      ...filters,
      selectedHousehold: value
    });
  };

  const formatDateForInput = (date: Date | null): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h3 className="text-lg text-gray-900 mb-4 font-anton">Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range Filter */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
            Date Range
          </label>
          <div className="flex space-x-2">
            <div className="flex-1">
              <input
                type="date"
                value={formatDateForInput(filters.dateRange.start)}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-mtaka-green focus:border-mtaka-green font-poppins text-sm"
                placeholder="Start Date"
              />
            </div>
            <div className="flex-1">
              <input
                type="date"
                value={formatDateForInput(filters.dateRange.end)}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-mtaka-green focus:border-mtaka-green font-poppins text-sm"
                placeholder="End Date"
              />
            </div>
          </div>
        </div>

        {/* Group Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
            Group
          </label>
          <select
            value={filters.selectedGroup}
            onChange={(e) => handleGroupChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-mtaka-green focus:border-mtaka-green font-poppins text-sm"
          >
            <option value="all">All Groups</option>
            {groups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {/* Household Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
            Household
          </label>
          <select
            value={filters.selectedHousehold}
            onChange={(e) => handleHouseholdChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-mtaka-green focus:border-mtaka-green font-poppins text-sm"
          >
            <option value="all">All Households</option>
            {households.map((household) => (
              <option key={household} value={household}>
                {household}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => onFiltersChange({
            dateRange: { start: null, end: null },
            selectedGroup: 'all',
            selectedHousehold: 'all'
          })}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-mtaka-green focus:ring-offset-2 font-poppins"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}