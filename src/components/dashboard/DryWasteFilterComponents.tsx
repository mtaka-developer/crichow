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
      selectedGroups: value === 'all' ? [] : [value]
    });
  };

  const handleHouseholdChange = (value: string) => {
    onFiltersChange({
      ...filters,
      selectedHouseholds: value === 'all' ? [] : [value]
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
    <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-300 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 font-sans">Filters</h3>
        <button
          onClick={() => onFiltersChange({
            dateRange: { start: null, end: null },
            selectedGroups: [],
            selectedHouseholds: [],
            selectedMaterialTypes: MATERIAL_TYPE_OPTIONS.map(option => option.value)
          })}
          className="text-sm text-mtaka-green hover:text-green-700 font-medium font-poppins"
        >
          Clear All Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2 font-poppins">
            Date Range
          </label>
          <div className="space-y-2">
            <input
              type="date"
              value={formatDateForInput(filters.dateRange.start)}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-mtaka-green focus:border-mtaka-green font-poppins text-sm bg-white shadow-sm text-gray-700"
              placeholder="Start Date"
            />
            <input
              type="date"
              value={formatDateForInput(filters.dateRange.end)}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-mtaka-green focus:border-mtaka-green font-poppins text-sm bg-white shadow-sm text-gray-700"
              placeholder="End Date"
            />
          </div>
        </div>

        {/* Group Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2 font-poppins">
            Group
          </label>
          <select
            value={filters.selectedGroups.length === 0 ? 'all' : filters.selectedGroups[0]}
            onChange={(e) => handleGroupChange(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-mtaka-green focus:border-mtaka-green font-poppins text-sm bg-white shadow-sm text-gray-700"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23374151' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
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
          <label className="block text-sm font-medium text-gray-800 mb-2 font-poppins">
            Household Name
          </label>
          <select
            value={filters.selectedHouseholds.length === 0 ? 'all' : filters.selectedHouseholds[0]}
            onChange={(e) => handleHouseholdChange(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-mtaka-green focus:border-mtaka-green font-poppins text-sm bg-white shadow-sm text-gray-700"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23374151' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
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
          <label className="block text-sm font-medium text-gray-800 mb-2 font-poppins">
            Material Type
          </label>
          <div className="border-2 border-gray-400 rounded-md p-3 bg-white max-h-40 overflow-y-auto shadow-sm">
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

    </div>
  );
}