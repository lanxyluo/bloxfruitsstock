import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui';
import { PriceRangeSlider, MultiSelect } from '@/components/ui';
import { AdvancedFilters as AdvancedFiltersType, RarityLevel, StockStatus, FruitItem } from '@/types';
import { Save, Filter, X, Download, Upload } from 'lucide-react';

export interface AdvancedFiltersProps {
  filters: AdvancedFiltersType;
  onFiltersChange: (filters: AdvancedFiltersType) => void;
  onSaveFilter: (name: string) => void;
  onLoadFilter: (filterId: string) => void;
  onDeleteFilter: (filterId: string) => void;
  onSetDefaultFilter: (filterId: string) => void;
  savedFilters: Array<{
    id: string;
    name: string;
    createdAt: Date;
    isDefault: boolean;
  }>;
  onExportFilters: () => string;
  onImportFilters: (data: string) => boolean;
  fruits: FruitItem[];
  className?: string;
}

export function AdvancedFilters({
  filters,
  onFiltersChange,
  onSaveFilter,
  onLoadFilter,
  onDeleteFilter,
  onSetDefaultFilter,
  savedFilters,
  onExportFilters,
  onImportFilters,
  fruits,
  className
}: AdvancedFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [importData, setImportData] = useState('');

  // Get unique values for filter options
  const categories = Array.from(new Set(fruits.map(f => f.category)));
  const demandLevels = Array.from(new Set(fruits.map(f => f.demand)));
  const supplyLevels = Array.from(new Set(fruits.map(f => f.supply)));

  // Update specific filter
  const updateFilter = (key: keyof AdvancedFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  // Reset all filters
  const resetFilters = () => {
    onFiltersChange({
      priceRange: [0, 10000],
      rarities: [],
      statuses: [],
      categories: [],
      tradeable: null,
      demand: [],
      supply: [],
      customFilters: {}
    });
  };

  // Handle save filter
  const handleSaveFilter = () => {
    if (filterName.trim()) {
      onSaveFilter(filterName.trim());
      setFilterName('');
      setShowSaveDialog(false);
    }
  };

  // Handle export filters
  const handleExportFilters = () => {
    const data = onExportFilters();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bloxfruits-filters.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle import filters
  const handleImportFilters = () => {
    if (importData.trim()) {
      const success = onImportFilters(importData);
      if (success) {
        setImportData('');
        // Show success message
      } else {
        // Show error message
      }
    }
  };

  // Count active filters
  const activeFiltersCount = [
    filters.priceRange[0] > 0 || filters.priceRange[1] < 10000,
    filters.rarities.length > 0,
    filters.statuses.length > 0,
    filters.categories.length > 0,
    filters.tradeable !== null,
    filters.demand.length > 0,
    filters.supply.length > 0,
    Object.keys(filters.customFilters).length > 0
  ].filter(Boolean).length;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <CardTitle>Advanced Filters</CardTitle>
            {activeFiltersCount > 0 && (
              <Badge variant="default">{activeFiltersCount} active</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 mr-1" />
                Reset
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Price Range</h4>
            <PriceRangeSlider
              min={0}
              max={10000}
              value={filters.priceRange}
              onChange={(value) => updateFilter('priceRange', value)}
              step={100}
              formatValue={(val) => `$${val.toLocaleString()}`}
            />
          </div>

          {/* Rarity Filter */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Rarity</h4>
            <MultiSelect
              options={Object.values(RarityLevel).map(rarity => ({
                value: rarity,
                label: rarity,
                count: fruits.filter(f => f.rarity === rarity).length
              }))}
              value={filters.rarities}
              onChange={(value) => updateFilter('rarities', value)}
              placeholder="Select rarities..."
              maxSelections={6}
            />
          </div>

          {/* Status Filter */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Stock Status</h4>
            <MultiSelect
              options={Object.values(StockStatus).map(status => ({
                value: status,
                label: status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
                count: fruits.filter(f => f.status === status).length
              }))}
              value={filters.statuses}
              onChange={(value) => updateFilter('statuses', value)}
              placeholder="Select statuses..."
              maxSelections={4}
            />
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Category</h4>
            <MultiSelect
              options={categories.map(category => ({
                value: category,
                label: category,
                count: fruits.filter(f => f.category === category).length
              }))}
              value={filters.categories}
              onChange={(value) => updateFilter('categories', value)}
              placeholder="Select categories..."
            />
          </div>

          {/* Tradeable Filter */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Tradeable</h4>
            <div className="flex gap-2">
              <Button
                variant={filters.tradeable === true ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateFilter('tradeable', filters.tradeable === true ? null : true)}
              >
                Tradeable
              </Button>
              <Button
                variant={filters.tradeable === false ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateFilter('tradeable', filters.tradeable === false ? null : false)}
              >
                Not Tradeable
              </Button>
            </div>
          </div>

          {/* Demand Filter */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Demand Level</h4>
            <MultiSelect
              options={demandLevels.map(demand => ({
                value: demand,
                label: demand,
                count: fruits.filter(f => f.demand === demand).length
              }))}
              value={filters.demand}
              onChange={(value) => updateFilter('demand', value)}
              placeholder="Select demand levels..."
            />
          </div>

          {/* Supply Filter */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Supply Level</h4>
            <MultiSelect
              options={supplyLevels.map(supply => ({
                value: supply,
                label: supply,
                count: fruits.filter(f => f.supply === supply).length
              }))}
              value={filters.supply}
              onChange={(value) => updateFilter('supply', value)}
              placeholder="Select supply levels..."
            />
          </div>

          {/* Saved Filters */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Saved Filters</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSaveDialog(true)}
              >
                <Save className="w-4 h-4 mr-1" />
                Save Current
              </Button>
            </div>
            
            {savedFilters.length > 0 ? (
              <div className="space-y-2">
                {savedFilters.map(filter => (
                  <div
                    key={filter.id}
                    className="flex items-center justify-between p-2 border border-gray-200 rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{filter.name}</span>
                      {filter.isDefault && (
                        <Badge variant="default" className="text-xs">Default</Badge>
                      )}
                      <span className="text-xs text-gray-500">
                        {filter.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onLoadFilter(filter.id)}
                        className="h-7 px-2"
                      >
                        Load
                      </Button>
                      {!filter.isDefault && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onSetDefaultFilter(filter.id)}
                          className="h-7 px-2"
                        >
                          Set Default
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteFilter(filter.id)}
                        className="h-7 px-2 text-destructive hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No saved filters yet</p>
            )}
          </div>

          {/* Import/Export */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Import/Export</h4>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportFilters}
              >
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setImportData('')}
              >
                <Upload className="w-4 h-4 mr-1" />
                Import
              </Button>
            </div>
          </div>
        </CardContent>
      )}

      {/* Save Filter Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Save Filter</h3>
            <input
              type="text"
              placeholder="Enter filter name..."
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
            <div className="flex gap-2 mt-4">
              <Button
                onClick={handleSaveFilter}
                disabled={!filterName.trim()}
                className="flex-1"
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSaveDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
