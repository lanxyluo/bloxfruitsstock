'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  Package, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  DollarSign,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function StockOverviewPage() {
  const stats = {
    totalItems: 21,
    inStock: 18,
    lowStock: 1,
    outOfStock: 2,
    totalValue: 96600000
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* 导航栏 */}
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
            <Link href="/stock" className="text-primary font-medium border-b-2 border-primary pb-2">
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

        {/* 返回按钮 */}
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
            Stock Overview
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive view of all Blox Fruits stock levels and availability status
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-muted-foreground">
                <Package className="h-5 w-5 text-primary" />
                Total Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{stats.totalItems}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-5 w-5 text-success" />
                In Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-success">{stats.inStock}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5 text-warning" />
                Low Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-warning">{stats.lowStock}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-muted-foreground">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Out of Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-destructive">{stats.outOfStock}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="h-6 w-6 text-success" />
              Total Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-success">${stats.totalValue.toLocaleString()}</p>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Stock overview page - Navigation working correctly
          </p>
        </div>
      </div>
    </div>
  );
}
