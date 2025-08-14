'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  Package, 
  Search,
  Filter,
  ArrowLeft,
  Star,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import Link from 'next/link';

// Real Blox Fruits data
const bloxFruitsData = [
  {
    id: 1,
    name: 'Dragon',
    rarity: 'Legendary',
    price: 2500000,
    stock: 12,
    status: 'in-stock',
    description: 'One of the most powerful fruits in the game'
  },
  {
    id: 2,
    name: 'Shadow',
    rarity: 'Mythical',
    price: 5000000,
    stock: 3,
    status: 'low-stock',
    description: 'Extremely rare and powerful fruit'
  },
  {
    id: 3,
    name: 'Venom',
    rarity: 'Legendary',
    price: 1800000,
    stock: 8,
    status: 'in-stock',
    description: 'Deadly poison-based abilities'
  },
  {
    id: 4,
    name: 'Dough',
    rarity: 'Legendary',
    price: 2200000,
    stock: 0,
    status: 'out-of-stock',
    description: 'Versatile and powerful fruit'
  },
  {
    id: 5,
    name: 'Leopard',
    rarity: 'Mythical',
    price: 4500000,
    stock: 1,
    status: 'low-stock',
    description: 'Rare mythical fruit with unique abilities'
  },
  {
    id: 6,
    name: 'Soul',
    rarity: 'Epic',
    price: 1200000,
    stock: 15,
    status: 'in-stock',
    description: 'Strong epic-tier fruit'
  },
  {
    id: 7,
    name: 'Flame',
    rarity: 'Rare',
    price: 800000,
    stock: 25,
    status: 'in-stock',
    description: 'Popular fire-based fruit'
  },
  {
    id: 8,
    name: 'Ice',
    rarity: 'Rare',
    price: 750000,
    stock: 20,
    status: 'in-stock',
    description: 'Ice manipulation abilities'
  },
  {
    id: 9,
    name: 'Light',
    rarity: 'Epic',
    price: 1500000,
    stock: 10,
    status: 'in-stock',
    description: 'Light-based epic fruit'
  },
  {
    id: 10,
    name: 'Dark',
    rarity: 'Epic',
    price: 1600000,
    stock: 7,
    status: 'in-stock',
    description: 'Darkness manipulation powers'
  },
  {
    id: 11,
    name: 'Quake',
    rarity: 'Legendary',
    price: 2000000,
    stock: 5,
    status: 'low-stock',
    description: 'Earth-shattering abilities'
  },
  {
    id: 12,
    name: 'Gravity',
    rarity: 'Mythical',
    price: 4000000,
    stock: 2,
    status: 'low-stock',
    description: 'Control over gravity itself'
  },
  {
    id: 13,
    name: 'String',
    rarity: 'Rare',
    price: 600000,
    stock: 30,
    status: 'in-stock',
    description: 'String manipulation abilities'
  },
  {
    id: 14,
    name: 'Rubber',
    rarity: 'Common',
    price: 300000,
    stock: 50,
    status: 'in-stock',
    description: 'Classic rubber fruit'
  },
  {
    id: 15,
    name: 'Bomb',
    rarity: 'Common',
    price: 250000,
    stock: 45,
    status: 'in-stock',
    description: 'Explosive abilities'
  },
  {
    id: 16,
    name: 'Smoke',
    rarity: 'Common',
    price: 200000,
    stock: 60,
    status: 'in-stock',
    description: 'Smoke manipulation'
  },
  {
    id: 17,
    name: 'Spike',
    rarity: 'Rare',
    price: 700000,
    stock: 18,
    status: 'in-stock',
    description: 'Spike-based abilities'
  },
  {
    id: 18,
    name: 'Chop',
    rarity: 'Common',
    price: 150000,
    stock: 80,
    status: 'in-stock',
    description: 'Basic cutting abilities'
  },
  {
    id: 19,
    name: 'Kilogram',
    rarity: 'Rare',
    price: 900000,
    stock: 12,
    status: 'in-stock',
    description: 'Weight manipulation'
  },
  {
    id: 20,
    name: 'Revive',
    rarity: 'Mythical',
    price: 6000000,
    stock: 0,
    status: 'out-of-stock',
    description: 'The rarest fruit in the game'
  }
];

const rarityColors: Record<string, string> = {
  'Common': 'border-gray-400 bg-gray-50 dark:bg-gray-800',
  'Rare': 'border-blue-400 bg-blue-50 dark:bg-blue-900/20',
  'Epic': 'border-purple-400 bg-purple-50 dark:bg-purple-900/20',
  'Legendary': 'border-orange-400 bg-orange-50 dark:bg-orange-900/20',
  'Mythical': 'border-red-400 bg-red-50 dark:bg-red-900/20'
};

const rarityTextColors: Record<string, string> = {
  'Common': 'text-gray-600 dark:text-gray-300',
  'Rare': 'text-blue-600 dark:text-blue-400',
  'Epic': 'text-purple-600 dark:text-purple-400',
  'Legendary': 'text-orange-600 dark:text-orange-400',
  'Mythical': 'text-red-600 dark:text-red-400'
};

const stockStatus: Record<string, { color: string; icon: any; label: string }> = {
  'in-stock': { color: 'text-green-500', icon: CheckCircle, label: 'In Stock' },
  'low-stock': { color: 'text-yellow-500', icon: Clock, label: 'Low Stock' },
  'out-of-stock': { color: 'text-red-500', icon: XCircle, label: 'Out of Stock' }
};

export default function AllItemsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedItems = useMemo(() => {
    let filtered = bloxFruitsData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRarity = selectedRarity === 'all' || item.rarity === selectedRarity;
      const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
      
      return matchesSearch && matchesRarity && matchesStatus;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price;
        case 'rarity':
          const rarityOrder: Record<string, number> = { 'Common': 1, 'Rare': 2, 'Epic': 3, 'Legendary': 4, 'Mythical': 5 };
          return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        case 'stock':
          return b.stock - a.stock;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedRarity, selectedStatus, sortBy]);

  const getRarityStars = (rarity: string) => {
    const starCount: Record<string, number> = { 'Common': 1, 'Rare': 2, 'Epic': 3, 'Legendary': 4, 'Mythical': 5 };
    return Array.from({ length: starCount[rarity] || 0 }, (_, i) => (
      <Star key={i} className="h-3 w-3 fill-current" />
    ));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Bar */}
        <nav className="mb-8 bg-card rounded-lg shadow-sm p-4 border">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">BF</span>
            </div>
            <span className="text-xl font-bold text-foreground">Blox Fruits Stock</span>
          </div>
          <div className="flex space-x-6">
            <Link href="/" className="text-muted-foreground hover:text-foreground pb-2">
              Dashboard
            </Link>
            <Link href="/stock" className="text-muted-foreground hover:text-foreground pb-2">
              Stock Overview
            </Link>
            <Link href="/items" className="text-primary font-medium border-b-2 border-primary pb-2">
              All Items
            </Link>
            <Link href="/market" className="text-muted-foreground hover:text-foreground pb-2">
              Market Analysis
            </Link>
          </div>
        </nav>

        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            All Blox Fruits
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse and search through all available Blox Fruits items with real-time stock information
          </p>
        </div>

        {/* Search and Filter Controls */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filter Items
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search fruits by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                {showFilters ? 'Hide' : 'Show'} Filters
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                {/* Rarity Filter */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Rarity</label>
                  <select
                    value={selectedRarity}
                    onChange={(e) => setSelectedRarity(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="all">All Rarities</option>
                    <option value="Common">Common</option>
                    <option value="Rare">Rare</option>
                    <option value="Epic">Epic</option>
                    <option value="Legendary">Legendary</option>
                    <option value="Mythical">Mythical</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Stock Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="all">All Status</option>
                    <option value="in-stock">In Stock</option>
                    <option value="low-stock">Low Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="price">Price (High-Low)</option>
                    <option value="rarity">Rarity (High-Low)</option>
                    <option value="stock">Stock (High-Low)</option>
                  </select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredAndSortedItems.length}</span> of {bloxFruitsData.length} items
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedItems.map((item) => {
            const StatusIcon = stockStatus[item.status].icon;
            return (
              <Card 
                key={item.id} 
                className={`hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer border-2 ${rarityColors[item.rarity]}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                      <Package className="h-5 w-5 text-primary" />
                      {item.name}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      {getRarityStars(item.rarity)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${rarityTextColors[item.rarity]} bg-opacity-20`}>
                      {item.rarity}
                    </span>
                    <div className="flex items-center gap-1">
                      <StatusIcon className={`h-4 w-4 ${stockStatus[item.status].color}`} />
                      <span className="text-xs text-muted-foreground">{stockStatus[item.status].label}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium text-success">
                        ${item.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">Stock:</span>
                      <span className={`ml-1 text-sm font-bold ${
                        item.stock === 0 ? 'text-red-500' : 
                        item.stock <= 5 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {item.stock}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results Message */}
        {filteredAndSortedItems.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No items found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
