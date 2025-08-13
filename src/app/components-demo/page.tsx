'use client';

import React, { useState } from 'react';
import { mockFruits } from '@/data/mockFruits';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Badge,
  StatusIndicator,
  SearchBar,
  FilterDropdown
} from '@/components/ui';
import { 
  FruitCard, 
  StockGrid, 
  StockStats 
} from '@/components/features';

export default function ComponentsDemoPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const rarityOptions = [
    { value: 'common', label: 'Common', count: mockFruits.filter(f => f.rarity === 'Common').length },
    { value: 'rare', label: 'Rare', count: mockFruits.filter(f => f.rarity === 'Rare').length },
    { value: 'epic', label: 'Epic', count: mockFruits.filter(f => f.rarity === 'Epic').length },
    { value: 'legendary', label: 'Legendary', count: mockFruits.filter(f => f.rarity === 'Legendary').length },
    { value: 'mythical', label: 'Mythical', count: mockFruits.filter(f => f.rarity === 'Mythical').length }
  ];

  const statusOptions = [
    { value: 'in-stock', label: 'In Stock', count: mockFruits.filter(f => f.status === 'in-stock').length },
    { value: 'low-stock', label: 'Low Stock', count: mockFruits.filter(f => f.status === 'low-stock').length },
    { value: 'out-of-stock', label: 'Out of Stock', count: mockFruits.filter(f => f.status === 'out-of-stock').length },
    { value: 'coming-soon', label: 'Coming Soon', count: mockFruits.filter(f => f.status === 'coming-soon').length }
  ];

  const handleAddToCart = (fruit: any) => {
    console.log('Added to cart:', fruit.name);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">UI Components Demo</h1>
        <p className="text-muted-foreground text-lg">
          Showcase of all the new UI components built for the Blox Fruits Stock application
        </p>
      </div>

      {/* Basic UI Components */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Basic UI Components</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card Variants */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Card Variants</h3>
            <Card variant="default" className="mb-4">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">This is a default card with standard styling.</p>
              </CardContent>
            </Card>

            <Card variant="elevated" className="mb-4">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">This card has elevated shadows and effects.</p>
              </CardContent>
            </Card>

            <Card variant="glass" className="mb-4">
              <CardHeader>
                <CardTitle>Glass Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">This card has a glass-morphism effect.</p>
              </CardContent>
            </Card>
          </div>

          {/* Badge Variants */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Badge Variants</h3>
            <div className="space-y-2">
              <Badge variant="common">Common</Badge>
              <Badge variant="rare">Rare</Badge>
              <Badge variant="epic">Epic</Badge>
              <Badge variant="legendary">Legendary</Badge>
              <Badge variant="mythical">Mythical</Badge>
            </div>
            
            <h4 className="text-md font-semibold text-white mt-4">Badge Sizes</h4>
            <div className="space-y-2">
              <Badge size="sm">Small Badge</Badge>
              <Badge size="md">Medium Badge</Badge>
              <Badge size="lg">Large Badge</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Status Indicators */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Status Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusIndicator status="in-stock" />
          <StatusIndicator status="low-stock" />
          <StatusIndicator status="out-of-stock" />
          <StatusIndicator status="coming-soon" />
        </div>
      </section>

      {/* Search and Filter Components */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Search & Filter Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SearchBar 
            placeholder="Search fruits..."
            onSearch={setSearchQuery}
            className="md:col-span-2"
          />
          <FilterDropdown
            label="Rarity"
            options={rarityOptions}
            value={selectedRarity}
            onValueChange={setSelectedRarity}
            placeholder="Select rarity"
          />
        </div>
        <div className="mt-4">
          <FilterDropdown
            label="Status"
            options={statusOptions}
            value={selectedStatus}
            onValueChange={setSelectedStatus}
            placeholder="Select status"
          />
        </div>
      </section>

      {/* Fruit Card Component */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Fruit Card Component</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockFruits.slice(0, 3).map((fruit) => (
            <FruitCard
              key={fruit.id}
              fruit={fruit}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>

      {/* Stock Grid Component */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Stock Grid Component</h2>
        <StockGrid
          fruits={mockFruits.slice(0, 8)}
          onAddToCart={handleAddToCart}
        />
      </section>

      {/* Stock Stats Component */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Stock Statistics</h2>
        <StockStats fruits={mockFruits} />
      </section>

      {/* Component Usage Examples */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Component Usage Examples</h2>
        <Card className="card">
          <CardHeader>
            <CardTitle>How to Use These Components</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Import Components</h4>
              <pre className="bg-muted/20 p-4 rounded-lg text-sm text-muted-foreground overflow-x-auto">
{`import { 
  Card, 
  Badge, 
  StatusIndicator,
  SearchBar,
  FilterDropdown 
} from '@/components/ui';

import { 
  FruitCard, 
  StockGrid, 
  StockStats 
} from '@/components/features';`}
              </pre>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Basic Usage</h4>
              <pre className="bg-muted/20 p-4 rounded-lg text-sm text-muted-foreground overflow-x-auto">
{`// Card with different variants
<Card variant="elevated" hover={true}>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>

// Badge with rarity
<Badge variant="legendary" size="lg">
  Legendary
</Badge>

// Status indicator
<StatusIndicator status="in-stock" size="md" />

// Search bar
<SearchBar 
  placeholder="Search..."
  onSearch={(query) => console.log(query)}
/>

// Filter dropdown
<FilterDropdown
  options={options}
  value={selectedValue}
  onValueChange={setSelectedValue}
/>`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
