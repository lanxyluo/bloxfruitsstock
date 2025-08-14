import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TrendingUp, TrendingDown, Package, DollarSign, Star, AlertTriangle } from 'lucide-react';
import { FruitItem, RarityLevel, StockStatus } from '@/types';

interface StockStatsProps {
  fruits: FruitItem[];
  className?: string;
}

const StockStats: React.FC<StockStatsProps> = ({ fruits, className }) => {
  // Calculate statistics
  const totalFruits = fruits.length;
  const totalStock = fruits.reduce((sum, fruit) => sum + fruit.stock, 0);
  const totalValue = fruits.reduce((sum, fruit) => sum + (fruit.price * fruit.stock), 0);
  
  const inStockCount = fruits.filter(fruit => fruit.status === StockStatus.IN_STOCK).length;
  const lowStockCount = fruits.filter(fruit => fruit.status === StockStatus.LOW_STOCK).length;
  const outOfStockCount = fruits.filter(fruit => fruit.status === StockStatus.OUT_OF_STOCK).length;
  const comingSoonCount = fruits.filter(fruit => fruit.status === StockStatus.COMING_SOON).length;
  
  const rarityCounts = {
    [RarityLevel.COMMON]: fruits.filter(fruit => fruit.rarity === RarityLevel.COMMON).length,
    [RarityLevel.RARE]: fruits.filter(fruit => fruit.rarity === RarityLevel.RARE).length,
    [RarityLevel.EPIC]: fruits.filter(fruit => fruit.rarity === RarityLevel.EPIC).length,
    [RarityLevel.LEGENDARY]: fruits.filter(fruit => fruit.rarity === RarityLevel.LEGENDARY).length,
    [RarityLevel.MYTHICAL]: fruits.filter(fruit => fruit.rarity === RarityLevel.MYTHICAL).length
  };
  
  const averagePrice = totalFruits > 0 ? totalValue / totalStock : 0;
  const stockUtilization = totalFruits > 0 ? (inStockCount / totalFruits) * 100 : 0;

  const stats = [
    {
      title: 'Total Fruits',
      value: totalFruits,
      icon: Package,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: 'Total Stock',
      value: totalStock.toLocaleString(),
      icon: Package,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: 'Total Value',
      value: `$${totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20'
    },
    {
      title: 'Avg. Price',
      value: `$${averagePrice.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    }
  ];

  const statusStats = [
    {
      label: 'In Stock',
      count: inStockCount,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      icon: Package
    },
    {
      label: 'Low Stock',
      count: lowStockCount,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      icon: AlertTriangle
    },
    {
      label: 'Out of Stock',
      count: outOfStockCount,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      icon: AlertTriangle
    },
    {
      label: 'Coming Soon',
      count: comingSoonCount,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      icon: Star
    }
  ];

  return (
    <div className={className}>
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.borderColor} border`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Overview */}
        <Card className="card">
          <CardHeader>
            <CardTitle className="text-lg">Stock Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {statusStats.map((status, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${status.bgColor}`}>
                      <status.icon className={`w-4 h-4 ${status.color}`} />
                    </div>
                    <span className="text-sm text-muted-foreground">{status.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{status.count}</span>
                    <span className="text-xs text-muted-foreground">
                      ({((status.count / totalFruits) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Stock Utilization Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Stock Utilization</span>
                <span>{stockUtilization.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-muted/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${stockUtilization}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rarity Distribution */}
        <Card className="card">
          <CardHeader>
            <CardTitle className="text-lg">Rarity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(rarityCounts).map(([rarity, count]) => (
                <div key={rarity} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant={rarity as any} size="sm">
                      {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {rarity === RarityLevel.COMMON && '⭐'}
                      {rarity === RarityLevel.RARE && '⭐⭐'}
                      {rarity === RarityLevel.EPIC && '⭐⭐⭐'}
                      {rarity === RarityLevel.LEGENDARY && '⭐⭐⭐⭐'}
                      {rarity === RarityLevel.MYTHICAL && '⭐⭐⭐⭐⭐'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{count}</span>
                    <span className="text-xs text-muted-foreground">
                      ({((count / totalFruits) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Rarity Chart */}
            <div className="mt-4">
              <div className="flex h-2 rounded-full overflow-hidden">
                {Object.entries(rarityCounts).map(([rarity, count]) => {
                  const percentage = totalFruits > 0 ? (count / totalFruits) * 100 : 0;
                  const colors = {
                    [RarityLevel.COMMON]: 'bg-gray-500',
                    [RarityLevel.RARE]: 'bg-blue-500',
                    [RarityLevel.EPIC]: 'bg-purple-500',
                    [RarityLevel.LEGENDARY]: 'bg-yellow-500',
                    [RarityLevel.MYTHICAL]: 'bg-red-500'
                  };
                  
                  return (
                    <div
                      key={rarity}
                      className={`${colors[rarity as keyof typeof colors]} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StockStats;
