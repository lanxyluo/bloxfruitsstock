import React, { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
  className?: string;
  showInputs?: boolean;
  formatValue?: (value: number) => string;
}

export function PriceRangeSlider({
  min,
  max,
  value,
  onChange,
  step = 1,
  className,
  showInputs = true,
  formatValue = (val) => `$${val.toLocaleString()}`
}: PriceRangeSliderProps) {
  const [localValue, setLocalValue] = useState<[number, number]>(value);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);

  // Update local value when prop changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Calculate slider positions
  const getSliderPosition = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  const minPosition = getSliderPosition(localValue[0]);
  const maxPosition = getSliderPosition(localValue[1]);

  // Handle slider drag start
  const handleMouseDown = useCallback((slider: 'min' | 'max') => {
    setIsDragging(slider);
  }, []);

  // Handle mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const newValue = Math.round((percentage / 100) * (max - min) + min);

    if (isDragging === 'min') {
      const newMin = Math.max(min, Math.min(newValue, localValue[1] - step));
      setLocalValue([newMin, localValue[1]]);
    } else {
      const newMax = Math.min(max, Math.max(newValue, localValue[0] + step));
      setLocalValue([localValue[0], newMax]);
    }
  }, [isDragging, min, max, localValue, step]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(null);
      onChange(localValue);
    }
  }, [isDragging, localValue, onChange]);

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Handle input changes
  const handleInputChange = useCallback((index: 0 | 1, newValue: string) => {
    const numValue = parseInt(newValue) || 0;
    const clampedValue = Math.max(min, Math.min(max, numValue));
    
    if (index === 0) {
      const newMin = Math.min(clampedValue, localValue[1] - step);
      setLocalValue([newMin, localValue[1]]);
    } else {
      const newMax = Math.max(clampedValue, localValue[0] + step);
      setLocalValue([localValue[0], newMax]);
    }
  }, [min, max, localValue, step]);

  // Handle input blur (commit changes)
  const handleInputBlur = useCallback(() => {
    onChange(localValue);
  }, [localValue, onChange]);

  return (
    <div className={cn('w-full space-y-4', className)}>
      {/* Slider Track */}
      <div className="relative h-2 bg-gray-200 rounded-full">
        {/* Selected Range */}
        <div
          className="absolute h-full bg-primary rounded-full"
          style={{
            left: `${minPosition}%`,
            width: `${maxPosition - minPosition}%`
          }}
        />
        
        {/* Min Slider */}
        <button
          type="button"
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary border-2 border-white rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"
          style={{ left: `${minPosition}%` }}
          onMouseDown={() => handleMouseDown('min')}
          aria-label="Minimum price"
        />
        
        {/* Max Slider */}
        <button
          type="button"
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary border-2 border-white rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"
          style={{ left: `${maxPosition}%` }}
          onMouseDown={() => handleMouseDown('max')}
          aria-label="Maximum price"
        />
      </div>

      {/* Input Fields */}
      {showInputs && (
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Price
            </label>
            <input
              type="number"
              min={min}
              max={localValue[1] - step}
              step={step}
              value={localValue[0]}
              onChange={(e) => handleInputChange(0, e.target.value)}
              onBlur={handleInputBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="text-gray-500">to</div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Price
            </label>
            <input
              type="number"
              min={localValue[0] + step}
              max={max}
              step={step}
              value={localValue[1]}
              onChange={(e) => handleInputChange(1, e.target.value)}
              onBlur={handleInputBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Value Display */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>{formatValue(localValue[0])}</span>
        <span>{formatValue(localValue[1])}</span>
      </div>
    </div>
  );
}
