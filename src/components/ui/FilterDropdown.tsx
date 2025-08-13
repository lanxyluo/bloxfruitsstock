import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  variant?: 'default' | 'outlined';
}

const FilterDropdown = React.forwardRef<HTMLDivElement, FilterDropdownProps>(
  ({ label, options, value, onValueChange, placeholder = "Select option", className, variant = 'default' }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    const selectedOption = options.find(option => option.value === value);
    
    const baseClasses = "relative w-full";
    const triggerClasses = "flex items-center justify-between w-full px-4 py-3 rounded-lg border border-border bg-background transition-all duration-200 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20";
    
    const variantClasses = {
      default: "bg-background/50",
      outlined: "bg-transparent border-2"
    };
    
    return (
      <div ref={dropdownRef} className={cn(baseClasses, className)}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(triggerClasses, variantClasses[variant])}
        >
          <span className={cn("text-left", selectedOption ? "text-white" : "text-muted-foreground")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown 
            className={cn(
              "w-4 h-4 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )} 
          />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-card border border-border rounded-lg shadow-lg shadow-black/20 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onValueChange?.(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors",
                  value === option.value && "bg-primary/20 text-primary"
                )}
              >
                <span className="flex items-center gap-2">
                  {value === option.value && <Check className="w-4 h-4" />}
                  <span className={value === option.value ? "ml-4" : "ml-8"}>
                    {option.label}
                  </span>
                </span>
                {option.count !== undefined && (
                  <span className="text-xs text-muted-foreground bg-muted/20 px-2 py-1 rounded-full">
                    {option.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

FilterDropdown.displayName = 'FilterDropdown';

export { FilterDropdown };
