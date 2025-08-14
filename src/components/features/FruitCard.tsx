import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { Button } from '@/components/ui/Button';
import { ShoppingCart, Star, Package, Heart } from 'lucide-react';
import { FruitItem, RarityLevel } from '@/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface FruitCardProps {
  fruit: FruitItem;
  onAddToCart?: (fruit: FruitItem) => void;
  onToggleFavorite?: (fruit: FruitItem) => void;
  isFavorite?: boolean;
  className?: string;
}

const FruitCard: React.FC<FruitCardProps> = ({ fruit, onAddToCart, onToggleFavorite, isFavorite = false, className }) => {
  const getRarityColor = (rarity: RarityLevel): string => {
    switch (rarity) {
      case RarityLevel.COMMON: return 'border-gray-500/30';
      case RarityLevel.RARE: return 'border-blue-500/50';
      case RarityLevel.EPIC: return 'border-purple-500/50';
      case RarityLevel.LEGENDARY: return 'border-yellow-500/50';
      case RarityLevel.MYTHICAL: return 'border-red-500/50';
      default: return 'border-gray-500/30';
    }
  };

  const getRarityGradient = (rarity: RarityLevel): string => {
    switch (rarity) {
      case RarityLevel.COMMON: return 'from-gray-500/20 to-gray-600/20';
      case RarityLevel.RARE: return 'from-blue-500/20 to-blue-600/20';
      case RarityLevel.EPIC: return 'from-purple-500/20 to-purple-600/20';
      case RarityLevel.LEGENDARY: return 'from-yellow-500/20 to-yellow-600/20';
      case RarityLevel.MYTHICAL: return 'from-red-500/20 to-red-600/20';
      default: return 'from-gray-500/20 to-gray-600/20';
    }
  };

  const getRarityIcon = (rarity: RarityLevel): string => {
    switch (rarity) {
      case RarityLevel.COMMON: return '⭐';
      case RarityLevel.RARE: return '⭐⭐';
      case RarityLevel.EPIC: return '⭐⭐⭐';
      case RarityLevel.LEGENDARY: return '⭐⭐⭐⭐';
      case RarityLevel.MYTHICAL: return '⭐⭐⭐⭐⭐';
      default: return '⭐';
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(fruit);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(fruit);
  };

  return (
    <Link href={`/fruits/${fruit.id}`} className="block">
      <Card 
        className={`group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/30 ${getRarityColor(fruit.rarity)} ${className}`}
        hover={true}
      >
        {/* Rarity Border Effect */}
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${getRarityGradient(fruit.rarity)} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
        
        <CardHeader className="relative pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={fruit.rarity.toLowerCase() as 'common' | 'rare' | 'epic' | 'legendary' | 'mythical'} size="sm">
                  {fruit.rarity}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {getRarityIcon(fruit.rarity)}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors duration-200">
                {fruit.name}
              </h3>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white mb-1">
                ${fruit.price}
              </div>
              <div className="text-xs text-muted-foreground">
                per unit
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-4">
          {/* Fruit Icon Placeholder */}
          <div className="flex justify-center relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-2xl">
              🍎
            </div>
            
            {/* Favorite Button */}
            {onToggleFavorite && (
              <button
                onClick={handleToggleFavorite}
                className={cn(
                  "absolute -top-2 -right-2 p-1.5 rounded-full transition-all duration-200",
                  "hover:scale-110 hover:shadow-lg",
                  isFavorite
                    ? "bg-red-500 text-white shadow-md"
                    : "bg-white/20 text-white hover:bg-white/30"
                )}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={cn("w-4 h-4", isFavorite ? "fill-current" : "")} />
              </button>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 text-center">
            {fruit.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Package className="w-3 h-3" />
              <span>Stock: {fruit.stock}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="w-3 h-3" />
              <span>{fruit.demand}</span>
            </div>
          </div>

          {/* Status and Action */}
          <div className="flex items-center justify-between">
            <StatusIndicator status={fruit.status} size="sm" />
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={fruit.status === 'out-of-stock'}
              className="bg-primary hover:bg-primary/80 text-white"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              {fruit.status === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default FruitCard;
