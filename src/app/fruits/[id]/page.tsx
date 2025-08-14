'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { mockFruits } from '@/data/mockFruits';
import { FruitItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import { ArrowLeft, Package, DollarSign, Scale, Calendar, Star } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function FruitDetailPage() {
  const params = useParams();
  const fruitId = params.id as string;
  const [fruit, setFruit] = useState<FruitItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟API调用
    const foundFruit = mockFruits.find(f => f.id === fruitId);
    if (foundFruit) {
      setFruit(foundFruit);
    }
    setLoading(false);
  }, [fruitId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-muted-foreground">加载中...</div>
        </div>
      </div>
    );
  }

  if (!fruit) {
    notFound();
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

  function getStatusText(status: string): string {
    switch (status) {
      case 'in-stock': return '有库存';
      case 'low-stock': return '库存不足';
      case 'out-of-stock': return '缺货';
      case 'coming-soon': return '即将到货';
      default: return '未知状态';
    }
  }

  function getRarityText(rarity: string): string {
    switch (rarity) {
      case 'common': return '普通';
      case 'rare': return '稀有';
      case 'epic': return '史诗';
      case 'legendary': return '传说';
      case 'mythical': return '神话';
      default: return rarity;
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
      {/* 返回按钮 */}
      <div className="mb-6">
        <Link href="/fruits">
          <Button variant="ghost" className="text-muted-foreground hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回水果列表
          </Button>
        </Link>
      </div>

      {/* 水果详情卡片 */}
      <Card className="card">
        <CardHeader className="pb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge className={`rarity-badge rarity-${fruit.rarity}`}>
                  {getRarityText(fruit.rarity)}
                </Badge>
                <Badge className={`status-badge ${getStatusColor(fruit.status)}`}>
                  {getStatusText(fruit.status)}
                </Badge>
              </div>
              <CardTitle className="text-3xl font-bold text-white mb-2">
                {fruit.name}
              </CardTitle>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {fruit.description}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-right">
                <div className="text-2xl font-bold text-white">${fruit.price}</div>
                <div className="text-muted-foreground text-sm">单价</div>
              </div>
              <Button 
                className="btn-primary"
                disabled={fruit.status === 'out-of-stock'}
              >
                {fruit.status === 'out-of-stock' ? '暂时缺货' : '添加到购物车'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 主要信息 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border">
              <Package className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">库存数量</div>
                <div className="text-lg font-semibold text-white">{fruit.stock}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border">
              <Scale className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">需求</div>
                <div className="text-lg font-semibold text-white">{fruit.demand}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border">
              <Star className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">稀有度</div>
                <div className="text-lg font-semibold text-white">{getRarityText(fruit.rarity)}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <div className="text-sm text-muted-foreground">状态</div>
                <div className="text-lg font-semibold text-white">{getStatusText(fruit.status)}</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* 详细信息 */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">详细信息</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">水果ID</span>
                  <span className="text-white font-mono">{fruit.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">稀有度</span>
                  <Badge className={`rarity-badge rarity-${fruit.rarity}`}>
                    {getRarityText(fruit.rarity)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">库存状态</span>
                  <Badge className={`status-badge ${getStatusColor(fruit.status)}`}>
                    {getStatusText(fruit.status)}
                  </Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">价格</span>
                  <span className="text-white font-semibold">${fruit.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">库存数量</span>
                  <span className="text-white font-semibold">{fruit.stock}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">供应</span>
                  <span className="text-white font-semibold">{fruit.supply}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="btn-primary flex-1">
              {fruit.status === 'out-of-stock' ? '通知到货' : '添加到购物车'}
            </Button>
            <Button variant="outline" className="flex-1">
              收藏
            </Button>
            <Button variant="outline" className="flex-1">
              分享
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
