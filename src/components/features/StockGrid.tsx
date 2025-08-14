'use client'

import React from 'react';
import { FruitItem } from '@/types';
import FruitCard from './FruitCard';
import { Loader2 } from 'lucide-react';

interface StockGridProps {
  fruits: FruitItem[];
  loading?: boolean;
  onAddToCart?: (fruit: FruitItem) => void;
  onToggleFavorite?: (fruit: FruitItem) => void;
  getFavoriteStatus?: (fruitId: string) => boolean;
  className?: string;
}

const StockGrid: React.FC<StockGridProps> = ({ 
  fruits, 
  loading = false, 
  onAddToCart, 
  onToggleFavorite,
  getFavoriteStatus,
  className 
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading fruits...</p>
        </div>
      </div>
    );
  }

  if (fruits.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🍎</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No fruits found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {fruits.map((fruit) => (
          <FruitCard
            key={fruit.id}
            fruit={fruit}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
            isFavorite={getFavoriteStatus ? getFavoriteStatus(fruit.id) : false}
            className="h-full"
          />
        ))}
      </div>
      
      {/* Grid Info */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        Showing {fruits.length} fruit{fruits.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default StockGrid;
