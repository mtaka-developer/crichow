// components/Filters.tsx
"use client";

import { useState, useEffect } from 'react';
import { WasteRecord, FilterOptions, getUniqueValues, getHouseholdsForGroups, parseDate, formatDateForInput } from '../utils/dataUtils';

interface FiltersProps {
  data: WasteRecord[];
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  showMaterialFilter?: boolean;
}

export default function Filters({ data, filters, onFiltersChange, showMaterialFilter = false }: FiltersProps) {
  const [availableHouseholds, setAvailableHouseholds] = useState<string[]>([]);

  // Get all unique values for filters
  const allGroups = getUniqueValues(data.map(r => r.Group));
  const allMaterials = ['HDPE', 'PET', 'PP', 'PAPER WASTE', 'METAL', 'GLASS'];
  
  // Get date range from data
  const allDates = data.map(r => parseDate(r.DATE));
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));

  // Update available households when groups change
  useEffect(() => {
    const households = getHouseholdsForGroups(data, filters.groups);
    setAvailableHouseholds(households);
    
    // If selected households are not available in new groups, clear them
    const validHouseholds = filters.households.filter(h => households.includes(h));
    if (validHouseholds.length !== filters.households.length) {
      onFiltersChange({
        ...filters,
        households: validHouseholds,
      });
    }
  }, [filters.groups, data]);

  const handleGroupChange = (group: string, checked: boolean) => {
    const newGroups = checked 
      ? [...filters.groups, group]
      : filters.groups.filter(g => g !== group);
    
    onFiltersChange({
      ...filters,
      groups: newGroups,
    });
  };

  const handleHouseholdChange = (household: string, checked: boolean) => {
    const newHouseholds = checked
      ? [...filters.households, household]
      : filters.households.filter(h => h !== household);
    
    onFiltersChange({
      ...filters,
      households: newHouseholds,
    });
  };

  const handleMaterialChange = (material: string, checked: boolean) => {
    const newMaterials = checked
      ? [...filters.materials, material]
      : filters.materials.filter(m => m !== material);
    
    onFiltersChange({
      ...filters,
      materials: newMaterials,
    });
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value,
      },
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      dateRange: {
        start: formatDateForInput(minDate),
        end: formatDateForInput(maxDate),
      },
      groups: [],
      households: [],
      materials: [],
    });
  };

  const selectAllGroups = () => {
    onFiltersChange({
      ...filters,
      groups: [...allGroups],
    });
  };

  const selectAllHouseholds = () => {
    onFiltersChange({
      ...filters,
      households: [...availableHouseholds],
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Clear All Filters
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <div className="space-y-2">
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
              min={formatDateForInput(minDate)}
              max={formatDateForInput(maxDate)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
              min={formatDateForInput(minDate)}
              max={formatDateForInput(maxDate)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Groups */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Groups ({filters.groups.length}/{allGroups.length})
            </label>
            <button
              onClick={selectAllGroups}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Select All
            </button>
          </div>
          <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md p-2">
            {allGroups.map((group) => (
              <label key={group} className="flex items-center py-1">
                <input
                  type="checkbox"
                  checked={filters.groups.includes(group)}
                  onChange={(e) => handleGroupChange(group, e.target.checked)}
                  className="mr-2 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{group}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Households */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              Households ({filters.households.length}/{availableHouseholds.length})
            </label>
            <button
              onClick={selectAllHouseholds}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Select All
            </button>
          </div>
          <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md p-2">
            {availableHouseholds.map((household) => (
              <label key={household} className="flex items-center py-1">
                <input
                  type="checkbox"
                  checked={filters.households.includes(household)}
                  onChange={(e) => handleHouseholdChange(household, e.target.checked)}
                  className="mr-2 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{household}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Materials (optional) */}
        {showMaterialFilter && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Materials ({filters.materials.length}/{allMaterials.length})
            </label>
            <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md p-2">
              {allMaterials.map((material) => (
                <label key={material} className="flex items-center py-1">
                  <input
                    type="checkbox"
                    checked={filters.materials.includes(material)}
                    onChange={(e) => handleMaterialChange(material, e.target.checked)}
                    className="mr-2 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{material}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Active filters summary */}
      {(filters.groups.length > 0 || filters.households.length > 0 || filters.materials.length > 0) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {filters.groups.map((group) => (
              <span key={`group-${group}`} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Group: {group}
                <button
                  onClick={() => handleGroupChange(group, false)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
            {filters.households.map((household) => (
              <span key={`household-${household}`} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Household: {household}
                <button
                  onClick={() => handleHouseholdChange(household, false)}
                  className="ml-1 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            ))}
            {filters.materials.map((material) => (
              <span key={`material-${material}`} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Material: {material}
                <button
                  onClick={() => handleMaterialChange(material, false)}
                  className="ml-1 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}