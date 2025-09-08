"use client";

import { DryWasteFilterState } from '@/types/data';

interface DryWasteFilterComponentsProps {
  filters: DryWasteFilterState;
  onFiltersChange: (filters: DryWasteFilterState) => void;
  groups: string[];
  households: string[];
}

const MATERIAL_TYPE_OPTIONS = [
  { value: 'HDPE', label: 'HDPE' },
  { value: 'PET', label: 'PET' },
  { value: 'PP', label: 'PP' },
  { value: 'Glass', label: 'Glass' },
  { value: 'Paper', label: 'Paper' },
  { value: 'Metal', label: 'Metal' }
];

export default function DryWasteFilterComponents({ filters, onFiltersChange, groups, households }: DryWasteFilterComponentsProps) {
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

  const handleMaterialTypeToggle = (materialType: string) => {
    const newSelectedTypes = filters.selectedMaterialTypes.includes(materialType)
      ? filters.selectedMaterialTypes.filter(type => type !== materialType)
      : [...filters.selectedMaterialTypes, materialType];
    
    onFiltersChange({
      ...filters,
      selectedMaterialTypes: newSelectedTypes
    });
  };

  const handleSelectAllMaterials = () => {
    onFiltersChange({
      ...filters,
      selectedMaterialTypes: MATERIAL_TYPE_OPTIONS.map(option => option.value)
    });
  };

  const handleDeselectAllMaterials = () => {
    onFiltersChange({
      ...filters,
      selectedMaterialTypes: []
    });
  };

  const formatDateForInput = (date: Date | null): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 font-anton">Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
            Date Range
          </label>
          <div className="space-y-2">
            <input
              type="date"
              value={formatDateForInput(filters.dateRange.start)}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-mtaka-green focus:border-mtaka-green font-poppins text-sm"
              placeholder="Start Date"
            />
            <input
              type="date"
              value={formatDateForInput(filters.dateRange.end)}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-mtaka-green focus:border-mtaka-green font-poppins text-sm"
              placeholder="End Date"
            />
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
            Household Name
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

        {/* Material Type Multi-Select Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
            Material Type
          </label>
          <div className="border border-gray-300 rounded-md p-3 bg-white max-h-40 overflow-y-auto">
            <div className="flex justify-between mb-2">
              <button
                type="button"
                onClick={handleSelectAllMaterials}
                className="text-xs text-mtaka-green hover:text-mtaka-green/80 font-poppins"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={handleDeselectAllMaterials}
                className="text-xs text-gray-500 hover:text-gray-700 font-poppins"
              >
                Clear All
              </button>
            </div>
            <div className="space-y-1">
              {MATERIAL_TYPE_OPTIONS.map((option) => (
                <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.selectedMaterialTypes.includes(option.value)}
                    onChange={() => handleMaterialTypeToggle(option.value)}
                    className="rounded border-gray-300 text-mtaka-green focus:ring-mtaka-green"
                  />
                  <span className="text-sm font-poppins text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mt-1 text-xs text-gray-500 font-poppins">
            {filters.selectedMaterialTypes.length} of {MATERIAL_TYPE_OPTIONS.length} selected
          </div>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => onFiltersChange({
            dateRange: { start: null, end: null },
            selectedGroup: 'all',
            selectedHousehold: 'all',
            selectedMaterialTypes: MATERIAL_TYPE_OPTIONS.map(option => option.value)
          })}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-mtaka-green focus:ring-offset-2 font-poppins"
        >
          Reset All Filters
        </button>
      </div>
    </div>
  );
}