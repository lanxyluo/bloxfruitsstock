'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  Package, 
  Search,
  Filter,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function AllItemsPage() {
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
            <Link href="/items" className="text-primary font-medium border-b-2 border-primary pb-2">
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
            All Items
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse and search through all available Blox Fruits items
          </p>
        </div>

        {/* 搜索和过滤 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filter Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search items..."
                  className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                <Filter className="h-4 w-4 mr-2 inline" />
                Filter
              </button>
            </div>
          </CardContent>
        </Card>

        {/* 项目列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Item {item}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">
                  Sample item description for testing navigation
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Stock: 5</span>
                  <span className="text-sm font-medium text-success">$1,000</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            All Items page - Navigation working correctly
          </p>
        </div>
      </div>
    </div>
  );
}
