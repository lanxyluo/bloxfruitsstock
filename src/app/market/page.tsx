'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  TrendingUp, 
  BarChart3,
  DollarSign,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function MarketAnalysisPage() {
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
            <Link href="/stock" className="text-muted-foreground hover:text-foreground pb-2">
              Stock Overview
            </Link>
            <Link href="/items" className="text-muted-foreground hover:text-foreground pb-2">
              All Items
            </Link>
            <Link href="/market" className="text-primary font-medium border-b-2 border-primary pb-2">
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
            Market Analysis
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Analyze market trends, price movements, and trading opportunities
          </p>
        </div>

        {/* 市场统计 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-5 w-5 text-success" />
                Market Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-success">+15.2%</p>
              <p className="text-sm text-muted-foreground">vs last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-muted-foreground">
                <BarChart3 className="h-5 w-5 text-primary" />
                Trading Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">$2.4M</p>
              <p className="text-sm text-muted-foreground">24h volume</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-5 w-5 text-warning" />
                Avg Price
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-warning">$4,600</p>
              <p className="text-sm text-muted-foreground">per item</p>
            </CardContent>
          </Card>
        </div>

        {/* 市场图表 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Price Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Chart placeholder - Market data visualization</p>
            </div>
          </CardContent>
        </Card>

        {/* 热门项目 */}
        <Card>
          <CardHeader>
            <CardTitle>Top Trading Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Dragon Fruit", price: "$8,500", change: "+12.5%" },
                { name: "Leopard Fruit", price: "$6,200", change: "+8.3%" },
                { name: "Venom Fruit", price: "$5,800", change: "+15.7%" },
                { name: "Quake Fruit", price: "$4,900", change: "-2.1%" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="font-medium">{item.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">{item.price}</span>
                    <span className={`text-sm ${item.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Market Analysis page - Navigation working correctly
          </p>
        </div>
      </div>
    </div>
  );
}
