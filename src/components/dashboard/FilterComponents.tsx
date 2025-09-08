"use client";

import { useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { DayPicker, DateRange } from 'react-day-picker';
import { FilterState } from '@/types/data';

interface OptionType {
  value: string;
  label: string;
}

interface FilterComponentsProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  groups: string[];
  households: string[];
}

export default function FilterComponents({ filters, onFiltersChange, groups, households }: FilterComponentsProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Transform arrays to react-select format
  const groupOptions: OptionType[] = groups.map(group => ({
    value: group,
    label: group
  }));

  const householdOptions: OptionType[] = households.map(household => ({
    value: household,
    label: household
  }));

  // Transform selected values to react-select format
  const selectedGroupOptions = filters.selectedGroups.map(group => ({
    value: group,
    label: group
  }));

  const selectedHouseholdOptions = filters.selectedHouseholds.map(household => ({
    value: household,
    label: household
  }));

  // Handle date range changes
  const handleDateRangeSelect = (range: DateRange | undefined) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        start: range?.from || null,
        end: range?.to || null
      }
    });
  };

  // Handle group changes
  const handleGroupChange = (newValue: MultiValue<OptionType>) => {
    const selectedValues = newValue.map(option => option.value);
    onFiltersChange({
      ...filters,
      selectedGroups: selectedValues
    });
  };

  // Handle household changes
  const handleHouseholdChange = (newValue: MultiValue<OptionType>) => {
    const selectedValues = newValue.map(option => option.value);
    onFiltersChange({
      ...filters,
      selectedHouseholds: selectedValues
    });
  };

  // Custom formatting for multi-select display
  const formatGroupDisplay = (value: readonly OptionType[]) => {
    if (value.length === 0) return 'Select groups...';
    if (value.length === 1) return value[0].label;
    return `${value[0].label} + ${value.length - 1} more`;
  };

  const formatHouseholdDisplay = (value: readonly OptionType[]) => {
    if (value.length === 0) return 'Select households...';
    if (value.length === 1) return value[0].label;
    return `${value[0].label} + ${value.length - 1} more`;
  };

  // Format date range display
  const formatDateRangeDisplay = () => {
    if (!filters.dateRange.start && !filters.dateRange.end) {
      return 'Select date range';
    }
    if (filters.dateRange.start && !filters.dateRange.end) {
      return `From ${filters.dateRange.start.toLocaleDateString()}`;
    }
    if (!filters.dateRange.start && filters.dateRange.end) {
      return `Until ${filters.dateRange.end.toLocaleDateString()}`;
    }
    return `${filters.dateRange.start?.toLocaleDateString()} - ${filters.dateRange.end?.toLocaleDateString()}`;
  };

  // Clear all filters
  const clearAllFilters = () => {
    onFiltersChange({
      dateRange: { start: null, end: null },
      selectedGroups: [],
      selectedHouseholds: []
    });
  };

  // React-select custom styles
  const selectStyles = {
    control: (base: object) => ({
      ...base,
      borderColor: '#9ca3af',
      borderWidth: '2px',
      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      backgroundColor: '#ffffff',
      '&:hover': {
        borderColor: '#24B81C',
      },
      '&:focus-within': {
        borderColor: '#24B81C',
        boxShadow: '0 0 0 2px rgba(36, 184, 28, 0.2)',
      },
    }),
    menu: (base: object) => ({
      ...base,
      backgroundColor: '#f9fafb',
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    }),
    menuList: (base: object) => ({
      ...base,
      padding: '4px',
      backgroundColor: '#f9fafb',
    }),
    option: (base: object, state: { isSelected: boolean; isFocused: boolean }) => ({
      ...base,
      backgroundColor: state.isSelected ? '#24B81C' : state.isFocused ? '#e5f3e4' : '#ffffff',
      color: state.isSelected ? '#ffffff' : '#374151',
      borderRadius: '6px',
      margin: '2px 0',
      padding: '8px 12px',
      fontFamily: 'Poppins, sans-serif',
      fontSize: '14px',
      '&:hover': {
        backgroundColor: state.isSelected ? '#24B81C' : '#e5f3e4',
      },
    }),
    multiValue: (base: object) => ({
      ...base,
      backgroundColor: '#f3f4f6',
      borderRadius: '4px',
      border: '1px solid #d1d5db',
    }),
    multiValueLabel: (base: object) => ({
      ...base,
      fontSize: '14px',
      fontFamily: 'Poppins, sans-serif',
      color: '#374151',
    }),
    multiValueRemove: (base: object) => ({
      ...base,
      '&:hover': {
        backgroundColor: '#ef4444',
        color: 'white',
      },
    }),
    placeholder: (base: object) => ({
      ...base,
      color: '#6b7280 !important',
      fontFamily: 'Poppins, sans-serif',
    }),
    singleValue: (base: object) => ({
      ...base,
      color: '#374151 !important',
      fontFamily: 'Poppins, sans-serif',
    }),
    input: (base: object) => ({
      ...base,
      color: '#374151 !important',
      fontFamily: 'Poppins, sans-serif',
    }),
    valueContainer: (base: object) => ({
      ...base,
      color: '#374151 !important',
    }),
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-300 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 font-sans">Filters</h3>
        <button
          onClick={clearAllFilters}
          className="text-sm text-mtaka-green hover:text-green-700 font-medium font-poppins"
        >
          Clear All Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Date Range Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-800 mb-2 font-poppins">
            Date Range
          </label>
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="w-full px-3 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-mtaka-green focus:border-mtaka-green font-poppins text-sm text-left bg-white hover:border-mtaka-green shadow-sm text-gray-700"
          >
            {formatDateRangeDisplay()}
          </button>
          {showDatePicker && (
            <div className="absolute top-full left-0 z-10 mt-1 bg-gray-50 border-2 border-gray-300 rounded-lg shadow-xl p-4">
              <DayPicker
                mode="range"
                selected={{
                  from: filters.dateRange.start || undefined,
                  to: filters.dateRange.end || undefined
                }}
                onSelect={handleDateRangeSelect}
                className="font-poppins"
                classNames={{
                  day_selected: 'bg-mtaka-green text-white font-semibold',
                  day_range_middle: 'bg-green-100',
                  day_today: 'text-mtaka-green font-bold bg-green-50 border border-mtaka-green',
                  day: 'hover:bg-gray-200 text-gray-900 font-medium',
                  nav_button: 'hover:bg-gray-200 text-gray-700',
                  head_cell: 'text-gray-700 font-semibold',
                  caption: 'text-gray-900 font-bold'
                }}
              />
              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="px-3 py-1 text-xs text-mtaka-green hover:text-green-700 font-poppins"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Groups Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2 font-poppins">
            Groups
          </label>
          <Select
            isMulti
            options={groupOptions}
            value={selectedGroupOptions}
            onChange={handleGroupChange}
            placeholder="Select groups..."
            isClearable
            isSearchable
            styles={selectStyles}
            formatOptionLabel={(option) => (
              <span className="font-poppins text-sm">{option.label}</span>
            )}
            className="font-poppins text-sm"
          />
        </div>

        {/* Households Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2 font-poppins">
            Households
          </label>
          <Select
            isMulti
            options={householdOptions}
            value={selectedHouseholdOptions}
            onChange={handleHouseholdChange}
            placeholder="Select households..."
            isClearable
            isSearchable
            styles={selectStyles}
            formatOptionLabel={(option) => (
              <span className="font-poppins text-sm">{option.label}</span>
            )}
            className="font-poppins text-sm"
          />
        </div>
      </div>

      {/* Active filters summary */}
      {(filters.selectedGroups.length > 0 || filters.selectedHouseholds.length > 0 || filters.dateRange.start || filters.dateRange.end) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {filters.selectedGroups.map((group) => (
              <span key={`group-${group}`} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-mtaka-green/10 text-mtaka-green font-poppins">
                Group: {group}
                <button
                  onClick={() => handleGroupChange(selectedGroupOptions.filter(opt => opt.value !== group))}
                  className="ml-1 text-mtaka-green hover:text-green-700"
                >
                  ×
                </button>
              </span>
            ))}
            {filters.selectedHouseholds.map((household) => (
              <span key={`household-${household}`} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-practical-orange/10 text-practical-orange font-poppins">
                Household: {household}
                <button
                  onClick={() => handleHouseholdChange(selectedHouseholdOptions.filter(opt => opt.value !== household))}
                  className="ml-1 text-practical-orange hover:text-orange-700"
                >
                  ×
                </button>
              </span>
            ))}
            {(filters.dateRange.start || filters.dateRange.end) && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 font-poppins">
                Date: {formatDateRangeDisplay()}
                <button
                  onClick={() => handleDateRangeSelect(undefined)}
                  className="ml-1 text-gray-600 hover:text-gray-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}