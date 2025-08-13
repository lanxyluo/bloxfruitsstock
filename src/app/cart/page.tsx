'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingCart, Package, Truck } from 'lucide-react';
import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  rarity: string;
  status: string;
  weight: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟从localStorage或API获取购物车数据
    const mockCartItems: CartItem[] = [
      {
        id: 'fruit-1',
        name: '火焰果',
        price: 150,
        quantity: 2,
        rarity: 'legendary',
        status: 'in-stock',
        weight: 500
      },
      {
        id: 'fruit-2',
        name: '冰霜果',
        price: 120,
        quantity: 1,
        rarity: 'epic',
        status: 'in-stock',
        weight: 400
      },
      {
        id: 'fruit-3',
        name: '闪电果',
        price: 200,
        quantity: 3,
        rarity: 'mythical',
        status: 'low-stock',
        weight: 600
      }
    ];
    
    setCartItems(mockCartItems);
    setLoading(false);
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalWeight = cartItems.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = totalWeight > 1000 ? 15 : 10;
  const total = subtotal + shipping;

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-muted-foreground">加载中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">购物车</h1>
        <p className="text-muted-foreground">查看和管理你的水果订单</p>
      </div>

      {cartItems.length === 0 ? (
        /* 空购物车状态 */
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">购物车是空的</h2>
          <p className="text-muted-foreground mb-6">
            看起来你还没有添加任何水果到购物车
          </p>
          <Link href="/fruits">
            <Button className="btn-primary">
              去挑选水果
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 购物车商品列表 */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="card">
              <CardHeader>
                <CardTitle className="text-white">购物车商品 ({totalItems} 件)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg border border-border">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                        <Badge className={`rarity-badge rarity-${item.rarity}`}>
                          {getRarityText(item.rarity)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>重量: {item.weight}g</span>
                        <span>单价: ${item.price}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 h-8"
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                          className="w-16 text-center border-0 h-8"
                          min="1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 h-8"
                        >
                          +
                        </Button>
                      </div>
                      <div className="text-right min-w-[80px]">
                        <div className="text-lg font-semibold text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 购物车操作 */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-red-500 border-red-500/20 hover:bg-red-500/10"
              >
                清空购物车
              </Button>
              <Link href="/fruits">
                <Button variant="outline">
                  继续购物
                </Button>
              </Link>
            </div>
          </div>

          {/* 订单摘要 */}
          <div className="lg:col-span-1">
            <Card className="card sticky top-8">
              <CardHeader>
                <CardTitle className="text-white">订单摘要</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 订单统计 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border">
                    <Package className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">商品总数</div>
                      <div className="text-lg font-semibold text-white">{totalItems} 件</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border">
                    <Truck className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">总重量</div>
                      <div className="text-lg font-semibold text-white">{(totalWeight / 1000).toFixed(1)} kg</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* 价格明细 */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">商品小计</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">运费</span>
                    <span className="text-white">${shipping.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="text-white">总计</span>
                    <span className="text-white">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* 结账按钮 */}
                <Button className="btn-primary w-full" size="lg">
                  去结账
                </Button>

                {/* 优惠券 */}
                <div className="space-y-2">
                  <Input placeholder="输入优惠券代码" className="input-field" />
                  <Button variant="outline" className="w-full">
                    应用优惠券
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
