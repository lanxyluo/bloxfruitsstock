import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MultiSelectOption {
  value: string;
  label: string;
  count?: number;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  maxSelections?: number;
  showCount?: boolean;
  disabled?: boolean;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Select options...',
  label,
  className,
  maxSelections,
  showCount = true,
  disabled = false
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search query
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle option selection/deselection
  const handleOptionToggle = (optionValue: string) => {
    if (disabled) return;
    
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    
    if (!maxSelections || newValue.length <= maxSelections) {
      onChange(newValue);
    }
  };

  // Remove selected option
  const handleRemoveOption = (optionValue: string) => {
    if (disabled) return;
    onChange(value.filter(v => v !== optionValue));
  };

  // Clear all selections
  const handleClearAll = () => {
    if (disabled) return;
    onChange([]);
  };

  // Get selected options
  const selectedOptions = options.filter(option => value.includes(option.value));

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          'disabled:bg-gray-100 disabled:cursor-not-allowed',
          isOpen && 'ring-2 ring-primary border-transparent'
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          {value.length === 0 ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            <div className="flex items-center gap-1 flex-wrap">
              {selectedOptions.slice(0, 2).map(option => (
                <span
                  key={option.value}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                >
                  {option.label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveOption(option.value);
                    }}
                    className="hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {value.length > 2 && (
                <span className="text-sm text-gray-600">
                  +{value.length - 2} more
                </span>
              )}
            </div>
          )}
        </div>
        <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search options..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
              autoFocus
            />
          </div>

          {/* Options */}
          <div className="py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">No options found</div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = value.includes(option.value);
                const isDisabled = option.disabled || (maxSelections && !isSelected && value.length >= maxSelections);

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleOptionToggle(option.value)}
                    disabled={!!isDisabled}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 text-left text-sm',
                      'hover:bg-gray-100 focus:bg-gray-100 focus:outline-none',
                      isSelected && 'bg-primary/10 text-primary',
                      isDisabled && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        'w-4 h-4 border-2 rounded flex items-center justify-center',
                        isSelected ? 'border-primary bg-primary' : 'border-gray-300'
                      )}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span>{option.label}</span>
                    </div>
                    {showCount && option.count !== undefined && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {option.count}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Actions */}
          {value.length > 0 && (
            <div className="p-2 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClearAll}
                className="w-full px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
