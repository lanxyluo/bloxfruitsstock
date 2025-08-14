'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Navigation } from '@/components/layout/Navigation'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Badge,
  StatusIndicator,
  SearchBar,
  FilterDropdown,
  Button,
  Separator,
  ToastContainer
} from '@/components/ui'
import { 
  FruitCard, 
  StockGrid, 
  StockStats,
  AdvancedFilters,
  FavoritesPanel
} from '@/components/features'
import { 
  RefreshCw, 
  Package, 
  Filter, 
  SortAsc, 
  SortDesc,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Clock,
  Search,
  X,
  Heart,
  Settings
} from 'lucide-react'
import { mockFruits } from '@/data/mockFruits'
import { FruitItem, RarityLevel, StockStatus, StockUpdate } from '@/types'
import { cn } from '@/lib/utils'
import { useStockUpdater, useNotifications, useFavorites, useAdvancedFilters } from '@/hooks'

// Debounce hook for search optimization
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function HomePage() {
  // State management
  const [fruits, setFruits] = useState<FruitItem[]>(mockFruits)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRarity, setSelectedRarity] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 10000 })
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock' | 'rarity'>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)
  
  // Advanced features state
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [activeTab, setActiveTab] = useState<'inventory' | 'favorites' | 'settings'>('inventory')

  // Debounced search query
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Advanced hooks
  const {
    data: realTimeFruits,
    isRefreshing: isAutoRefreshing,
    lastRefresh: autoLastRefresh,
    nextRefresh,
    networkStatus,
    refresh: autoRefresh,
    startAutoRefresh,
    stopAutoRefresh,
    updateConfig,
    config
  } = useStockUpdater({
    initialData: mockFruits,
    refreshInterval: 30000, // 30 seconds
    enableAutoRefresh: true,
    onDataUpdate: (updates: StockUpdate[]) => {
      // Handle stock updates
      console.log('Stock updates:', updates);
    },
    onError: (error: Error) => {
      console.error('Stock update error:', error);
    }
  });

  const {
    notifications,
    addNotification,
    addStockChangeNotification,
    removeNotification,
    clearAllNotifications,
    markAsRead,
    markAllAsRead,
    unreadCount
  } = useNotifications({
    maxNotifications: 10,
    defaultDuration: 5000,
    enableSound: true,
    enableDesktopNotifications: true
  });

  const {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    updateFavoriteNotes,
    setPriceAlert,
    removePriceAlert,
    getPriceAlert,
    clearAllFavorites,
    exportFavorites,
    importFavorites,
    favoritesCount
  } = useFavorites();

  const {
    filters: advancedFilters,
    updateFilters: updateAdvancedFilters,
    resetFilters: resetAdvancedFilters,
    savedFilters,
    saveCurrentFilter,
    loadFilter,
    deleteFilter,
    setDefaultFilter,
    exportFilters,
    importFilters,
    filteredItems: advancedFilteredItems,
    activeFiltersCount,
    hasActiveFilters
  } = useAdvancedFilters(realTimeFruits);

  // Set initial time on client side to avoid hydration mismatch
  useEffect(() => {
    setLastRefresh(new Date())
  }, [])

  // Filter options
  const rarityOptions = useMemo(() => [
    { value: RarityLevel.COMMON, label: 'Common', count: mockFruits.filter(f => f.rarity === RarityLevel.COMMON).length },
    { value: RarityLevel.RARE, label: 'Rare', count: mockFruits.filter(f => f.rarity === RarityLevel.RARE).length },
    { value: RarityLevel.EPIC, label: 'Epic', count: mockFruits.filter(f => f.rarity === RarityLevel.EPIC).length },
    { value: RarityLevel.LEGENDARY, label: 'Legendary', count: mockFruits.filter(f => f.rarity === RarityLevel.LEGENDARY).length },
    { value: RarityLevel.MYTHICAL, label: 'Mythical', count: mockFruits.filter(f => f.rarity === RarityLevel.MYTHICAL).length }
  ], [])

  const statusOptions = useMemo(() => [
    { value: StockStatus.IN_STOCK, label: 'In Stock', count: mockFruits.filter(f => f.status === StockStatus.IN_STOCK).length },
    { value: StockStatus.LOW_STOCK, label: 'Low Stock', count: mockFruits.filter(f => f.status === StockStatus.LOW_STOCK).length },
    { value: StockStatus.OUT_OF_STOCK, label: 'Out of Stock', count: mockFruits.filter(f => f.status === StockStatus.OUT_OF_STOCK).length },
    { value: StockStatus.COMING_SOON, label: 'Coming Soon', count: mockFruits.filter(f => f.status === StockStatus.COMING_SOON).length }
  ], [])

  // Calculate statistics
  const stats = useMemo(() => {
    const totalFruits = mockFruits.length
    const inStockCount = mockFruits.filter(fruit => fruit.status === StockStatus.IN_STOCK).length
    const outOfStockCount = mockFruits.filter(fruit => fruit.status === StockStatus.OUT_OF_STOCK).length
    const lowStockCount = mockFruits.filter(fruit => fruit.status === StockStatus.LOW_STOCK).length
    const totalValue = mockFruits.reduce((sum, fruit) => sum + (fruit.price * fruit.stock), 0)

    return {
      totalFruits,
      inStockCount,
      outOfStockCount,
      lowStockCount,
      totalValue
    }
  }, [])

  // Filter and sort fruits
  const filteredAndSortedFruits = useMemo(() => {
    let filtered = [...mockFruits]

    // Apply search filter
    if (debouncedSearchQuery) {
      filtered = filtered.filter(fruit =>
        fruit.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        fruit.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      )
    }

    // Apply rarity filter
    if (selectedRarity) {
      filtered = filtered.filter(fruit => fruit.rarity === selectedRarity)
    }

    // Apply status filter
    if (selectedStatus) {
      filtered = filtered.filter(fruit => fruit.status === selectedStatus)
    }

    // Apply price range filter
    filtered = filtered.filter(fruit => 
      fruit.price >= priceRange.min && fruit.price <= priceRange.max
    )

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case 'price':
          aValue = a.price
          bValue = b.price
          break
        case 'stock':
          aValue = a.stock
          bValue = b.stock
          break
        case 'rarity':
          aValue = Object.values(RarityLevel).indexOf(a.rarity)
          bValue = Object.values(RarityLevel).indexOf(b.rarity)
          break
        default:
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [debouncedSearchQuery, selectedRarity, selectedStatus, priceRange, sortBy, sortDirection])

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setLastRefresh(new Date())
      // In a real app, you would fetch fresh data here
    } catch (error) {
      console.error('Failed to refresh data:', error)
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  // Handle add to cart
  const handleAddToCart = useCallback((fruit: FruitItem) => {
    console.log('Added to cart:', fruit.name)
    // Implement cart functionality here
  }, [])

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedRarity('')
    setSelectedStatus('')
    setPriceRange({ min: 0, max: 10000 })
    setSortBy('name')
    setSortDirection('asc')
  }, [])

  // Check if any filters are active
  const hasBasicFilters = searchQuery || selectedRarity || selectedStatus || 
    priceRange.min > 0 || priceRange.max < 10000 || sortBy !== 'name' || sortDirection !== 'asc'

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Blox Fruits Stock Monitor
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time monitoring of Blox Fruits stock availability and market trends. 
            Track item availability and get your maximum price instantly.
          </p>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Items</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalFruits}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <Package className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">In Stock</p>
                <p className="text-2xl font-bold text-success">{stats.inStockCount}</p>
              </div>
              <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Low Stock</p>
                <p className="text-2xl font-bold text-warning">{stats.lowStockCount}</p>
              </div>
              <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                <Clock className="w-6 h-6 text-warning" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Out of Stock</p>
                <p className="text-2xl font-bold text-destructive">{stats.outOfStockCount}</p>
              </div>
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Value</p>
                <p className="text-2xl font-bold text-foreground">${stats.totalValue.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg mb-6">
          <button
            onClick={() => setActiveTab('inventory')}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              activeTab === 'inventory'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              activeTab === 'favorites'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            <Heart className="w-4 h-4 mr-1 inline" />
            Favorites ({favoritesCount})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              activeTab === 'settings'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            <Settings className="w-4 h-4 mr-1 inline" />
            Settings
          </button>
        </div>

        {/* Search and Filter Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search & Filter
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Find specific fruits by name, rarity, status, or price range
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
                  {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </Button>
                            {hasBasicFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </Button>
            )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <SearchBar
                  placeholder="Search fruits by name or description..."
                  onSearch={setSearchQuery}
                  value={searchQuery}
                />
              </div>
              <div className="flex items-center gap-2">
                <FilterDropdown
                  label="Rarity"
                  options={rarityOptions}
                  value={selectedRarity}
                  onValueChange={setSelectedRarity}
                  placeholder="All Rarities"
                />
              </div>
            </div>

            {/* Additional Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FilterDropdown
                label="Status"
                options={statusOptions}
                value={selectedStatus}
                onValueChange={setSelectedStatus}
                placeholder="All Statuses"
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Price Range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) || 0 }))}
                    className="flex-1 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <span className="text-muted-foreground">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) || 10000 }))}
                    className="flex-1 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Sort By</label>
                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="flex-1 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="stock">Stock</option>
                    <option value="rarity">Rarity</option>
                  </select>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                    className="px-2"
                  >
                    {sortDirection === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {hasBasicFilters && (
              <div className="pt-4 border-t border-border">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {searchQuery && (
                    <Badge variant="default" className="flex items-center gap-1">
                      Search: "{searchQuery}"
                      <button
                        onClick={() => setSearchQuery('')}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {selectedRarity && (
                    <Badge variant="default" className="flex items-center gap-1">
                      Rarity: {selectedRarity}
                      <button
                        onClick={() => setSelectedRarity('')}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {selectedStatus && (
                    <Badge variant="default" className="flex items-center gap-1">
                      Status: {selectedStatus}
                      <button
                        onClick={() => setSelectedStatus('')}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {(priceRange.min > 0 || priceRange.max < 10000) && (
                    <Badge variant="default" className="flex items-center gap-1">
                      Price: ${priceRange.min} - ${priceRange.max}
                      <button
                        onClick={() => setPriceRange({ min: 0, max: 10000 })}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content based on active tab */}
        {activeTab === 'inventory' && (
          <>
            {/* Advanced Filters */}
            <AdvancedFilters
              filters={advancedFilters}
              onFiltersChange={updateAdvancedFilters}
              onSaveFilter={saveCurrentFilter}
              onLoadFilter={loadFilter}
              onDeleteFilter={deleteFilter}
              onSetDefaultFilter={setDefaultFilter}
              savedFilters={savedFilters}
              onExportFilters={exportFilters}
              onImportFilters={importFilters}
              fruits={realTimeFruits}
              className="mb-8"
            />

            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-foreground">
                  Inventory Results
                </h2>
                <Badge variant="default">
                  {filteredAndSortedFruits.length} of {realTimeFruits.length} items
                </Badge>
                {hasActiveFilters && (
                  <Badge variant="default">
                    Advanced filters: {activeFiltersCount}
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {autoLastRefresh ? `Last updated: ${autoLastRefresh.toLocaleTimeString()}` : 'Loading...'}
                {nextRefresh && (
                  <span className="ml-2">• Next update: {nextRefresh.toLocaleTimeString()}</span>
                )}
              </div>
            </div>

            {/* Stock Grid */}
            <StockGrid
              fruits={filteredAndSortedFruits}
              onAddToCart={handleAddToCart}
              onToggleFavorite={(fruit) => {
                if (isFavorite(fruit.id)) {
                  removeFromFavorites(fruit.id);
                  addNotification({
                    type: 'info',
                    title: 'Removed from favorites',
                    message: `${fruit.name} has been removed from your favorites.`,
                    isRead: false
                  });
                } else {
                  try {
                    addToFavorites(fruit);
                    addNotification({
                      type: 'success',
                      title: 'Added to favorites',
                      message: `${fruit.name} has been added to your favorites!`,
                      isRead: false
                    });
                  } catch (error) {
                                          addNotification({
                        type: 'error',
                        title: 'Error',
                        message: error instanceof Error ? error.message : 'Failed to add to favorites',
                        isRead: false
                      });
                  }
                }
              }}
              getFavoriteStatus={isFavorite}
              className="mb-8"
            />

            {/* Stock Statistics */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Detailed Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <StockStats fruits={realTimeFruits} />
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'favorites' && (
          <FavoritesPanel
            favorites={favorites}
            fruits={realTimeFruits}
            onRemoveFavorite={removeFromFavorites}
            onUpdateNotes={updateFavoriteNotes}
            onSetPriceAlert={setPriceAlert}
            onRemovePriceAlert={removePriceAlert}
            onClearAll={clearAllFavorites}
            onExport={exportFavorites}
            onImport={importFavorites}
            className="mb-8"
          />
        )}

        {activeTab === 'settings' && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Settings & Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Auto-refresh Settings */}
              <div className="space-y-3">
                <h4 className="font-medium">Auto-refresh Settings</h4>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={config.autoRefresh}
                      onChange={(e) => updateConfig({ autoRefresh: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    Enable auto-refresh
                  </label>
                  <select
                    value={config.refreshInterval / 1000}
                    onChange={(e) => updateConfig({ refreshInterval: parseInt(e.target.value) * 1000 })}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value={15}>15 seconds</option>
                    <option value={30}>30 seconds</option>
                    <option value={60}>1 minute</option>
                    <option value={300}>5 minutes</option>
                  </select>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="space-y-3">
                <h4 className="font-medium">Notification Settings</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={config.enableNotifications}
                      onChange={(e) => updateConfig({ enableNotifications: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    Enable notifications
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={config.enableSound}
                      onChange={(e) => updateConfig({ enableSound: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    Enable sound alerts
                  </label>
                </div>
              </div>

              {/* Network Status */}
              <div className="space-y-3">
                <h4 className="font-medium">Network Status</h4>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    networkStatus.isOnline ? "bg-green-500" : "bg-red-500"
                  )} />
                  <span className="text-sm">
                    {networkStatus.isOnline ? 'Online' : 'Offline'}
                  </span>
                  {networkStatus.retryCount > 0 && (
                    <span className="text-sm text-gray-500">
                      • Retry count: {networkStatus.retryCount}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Auto-refresh Status */}
        <div className="text-center py-4 border-t border-border">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className={cn(
              "w-2 h-2 rounded-full",
              isAutoRefreshing ? "bg-yellow-500 animate-pulse" : "bg-green-500"
            )} />
            <span>
              {isAutoRefreshing ? 'Refreshing data...' : 'Data is up to date'}
            </span>
            <span>•</span>
            <span>Auto-refresh every {config.refreshInterval / 1000} seconds</span>
            {!config.autoRefresh && (
              <span>• Auto-refresh disabled</span>
            )}
          </div>
        </div>
      </main>

      {/* Toast Notifications */}
      <ToastContainer
        notifications={notifications}
        onRemove={removeNotification}
        onAction={(action) => action?.onClick?.()}
        position="top-right"
      />
    </div>
  )
}

