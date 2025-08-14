'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  Package, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  DollarSign 
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  // 静态数据，避免任何 hooks 和状态管理
  const stats = {
    totalItems: 21,
    inStock: 18,
    lowStock: 1,
    outOfStock: 2,
    totalValue: 96600000
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 简单导航 - 使用英文文本，避免任何组件导入 */}
        <nav className="mb-8 bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">BF</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Blox Fruits Stock</span>
          </div>
          <div className="flex space-x-6">
            <Link href="/" className="text-primary font-medium border-b-2 border-primary pb-2">
              Dashboard
            </Link>
            <Link href="/stock" className="text-muted-foreground hover:text-foreground pb-2">
              Stock Overview
            </Link>
            <Link href="/items" className="text-muted-foreground hover:text-foreground pb-2">
              All Items
            </Link>
            <Link href="/market" className="text-muted-foreground hover:text-foreground pb-2">
              Market Analysis
            </Link>
          </div>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blox Fruits Stock Monitor
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time monitoring of Blox Fruits stock availability and market trends. 
            Track item availability and get your maximum price instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <Package className="h-5 w-5 text-blue-600" />
                Total Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">{stats.totalItems}</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <TrendingUp className="h-5 w-5 text-green-600" />
                In Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{stats.inStock}</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <Clock className="h-5 w-5 text-gray-600" />
                Low Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-600">{stats.lowStock}</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Out of Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">{stats.outOfStock}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-700">
              <DollarSign className="h-6 w-6 text-green-600" />
              Total Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">${stats.totalValue.toLocaleString()}</p>
          </CardContent>
        </Card>

        {/* 底部导航 */}
        <div className="mt-8 bg-card rounded-lg shadow-sm p-4 border">
          <div className="flex justify-center space-x-8">
            <Link href="/inventory" className="text-primary font-medium">
              Inventory
            </Link>
            <Link href="/favorites" className="text-muted-foreground hover:text-foreground">
              Favorites (0)
            </Link>
            <Link href="/settings" className="text-muted-foreground hover:text-foreground">
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

