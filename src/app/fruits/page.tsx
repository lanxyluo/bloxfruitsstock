'use client';

import { useState, useEffect } from 'react';
import { mockFruits } from '@/data/mockFruits';
import { FruitItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Search, Filter, Grid, List } from 'lucide-react';
import Link from 'next/link';

export default function FruitsPage() {
  const [fruits, setFruits] = useState<FruitItem[]>(mockFruits);
  const [searchTerm, setSearchTerm] = useState('');
  const [rarityFilter, setRarityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('name');

  // 过滤和搜索逻辑
  const filteredFruits = fruits.filter(fruit => {
    const matchesSearch = fruit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fruit.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRarity = rarityFilter === 'all' || fruit.rarity === rarityFilter;
    const matchesStatus = statusFilter === 'all' || fruit.status === rarityFilter;
    
    return matchesSearch && matchesRarity && matchesStatus;
  });

  // 排序逻辑
  const sortedFruits = [...filteredFruits].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rarity':
        return getRarityValue(b.rarity) - getRarityValue(a.rarity);
      case 'price':
        return b.price - a.price;
      case 'stock':
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  function getRarityValue(rarity: string): number {
    const rarityMap: { [key: string]: number } = {
      'common': 1,
      'rare': 2,
      'epic': 3,
      'legendary': 4,
      'mythical': 5
    };
    return rarityMap[rarity] || 0;
  }

  function getStatusColor(status: string): string {
    switch (status) {
      case 'in-stock': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'out-of-stock': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'low-stock': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'coming-soon': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  }

  function getRarityColor(rarity: string): string {
    switch (rarity) {
      case 'common': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      case 'rare': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'epic': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'legendary': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'mythical': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">水果库存</h1>
        <p className="text-muted-foreground">探索所有可用的水果，找到最适合你的选择</p>
      </div>

      {/* 搜索和过滤栏 */}
      <div className="card p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* 搜索框 */}
          <div className="relative flex-1 w-full lg:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="搜索水果名称或描述..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input-field w-full"
            />
          </div>

          {/* 稀有度过滤 */}
          <Select value={rarityFilter} onValueChange={setRarityFilter}>
            <SelectTrigger className="w-full lg:w-40 input-field">
              <SelectValue placeholder="稀有度" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有稀有度</SelectItem>
              <SelectItem value="common">普通</SelectItem>
              <SelectItem value="rare">稀有</SelectItem>
              <SelectItem value="epic">史诗</SelectItem>
              <SelectItem value="legendary">传说</SelectItem>
              <SelectItem value="mythical">神话</SelectItem>
            </SelectContent>
          </Select>

          {/* 状态过滤 */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full lg:w-40 input-field">
              <SelectValue placeholder="库存状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有状态</SelectItem>
              <SelectItem value="in-stock">有库存</SelectItem>
              <SelectItem value="low-stock">库存不足</SelectItem>
              <SelectItem value="out-of-stock">缺货</SelectItem>
              <SelectItem value="coming-soon">即将到货</SelectItem>
            </SelectContent>
          </Select>

          {/* 排序 */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-40 input-field">
              <SelectValue placeholder="排序方式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">按名称</SelectItem>
              <SelectItem value="rarity">按稀有度</SelectItem>
              <SelectItem value="price">按价格</SelectItem>
              <SelectItem value="stock">按库存</SelectItem>
            </SelectContent>
          </Select>

          {/* 视图模式切换 */}
          <div className="flex border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 结果统计 */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          找到 <span className="text-white font-semibold">{sortedFruits.length}</span> 个水果
        </p>
      </div>

      {/* 水果列表 */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedFruits.map((fruit) => (
            <Card key={fruit.id} className="card card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-white mb-2">{fruit.name}</CardTitle>
                    <div className="flex gap-2 mb-3">
                      <Badge className={`rarity-badge rarity-${fruit.rarity}`}>
                        {fruit.rarity}
                      </Badge>
                      <Badge className={`status-badge ${getStatusColor(fruit.status)}`}>
                        {fruit.status === 'in-stock' ? '有库存' :
                         fruit.status === 'low-stock' ? '库存不足' :
                         fruit.status === 'out-of-stock' ? '缺货' : '即将到货'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {fruit.description}
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">价格:</span>
                    <span className="text-white font-semibold">${fruit.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">库存:</span>
                    <span className="text-white font-semibold">{fruit.stock}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">重量:</span>
                    <span className="text-white font-semibold">{fruit.weight}g</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <Link href={`/fruits/${fruit.id}`}>
                    <Button className="w-full btn-primary">
                      查看详情
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedFruits.map((fruit) => (
            <Card key={fruit.id} className="card card-hover">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{fruit.name}</h3>
                      <Badge className={`rarity-badge rarity-${fruit.rarity}`}>
                        {fruit.rarity}
                      </Badge>
                      <Badge className={`status-badge ${getStatusColor(fruit.status)}`}>
                        {fruit.status === 'in-stock' ? '有库存' :
                         fruit.status === 'low-stock' ? '库存不足' :
                         fruit.status === 'out-of-stock' ? '缺货' : '即将到货'}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{fruit.description}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <span className="text-muted-foreground">价格: <span className="text-white font-semibold">${fruit.price}</span></span>
                      <span className="text-muted-foreground">库存: <span className="text-white font-semibold">{fruit.stock}</span></span>
                      <span className="text-muted-foreground">重量: <span className="text-white font-semibold">{fruit.weight}g</span></span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href={`/fruits/${fruit.id}`}>
                      <Button className="btn-primary">
                        查看详情
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 空状态 */}
      {sortedFruits.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground text-lg mb-4">
            没有找到匹配的水果
          </div>
          <Button 
            onClick={() => {
              setSearchTerm('');
              setRarityFilter('all');
              setStatusFilter('all');
            }}
            className="btn-primary"
          >
            清除所有过滤条件
          </Button>
        </div>
      )}
    </div>
  );
}
