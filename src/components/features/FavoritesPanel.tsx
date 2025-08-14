import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@/components/ui';
import { FavoriteItem, FruitItem } from '@/types';
import { Heart, Star, AlertTriangle, Edit3, Trash2, Download, Upload, X } from 'lucide-react';

export interface FavoritesPanelProps {
  favorites: FavoriteItem[];
  fruits: FruitItem[];
  onRemoveFavorite: (fruitId: string) => void;
  onUpdateNotes: (fruitId: string, notes: string) => void;
  onSetPriceAlert: (fruitId: string, price: number) => void;
  onRemovePriceAlert: (fruitId: string) => void;
  onClearAll: () => void;
  onExport: () => string;
  onImport: (data: string) => boolean;
  className?: string;
}

export function FavoritesPanel({
  favorites,
  fruits,
  onRemoveFavorite,
  onUpdateNotes,
  onSetPriceAlert,
  onRemovePriceAlert,
  onClearAll,
  onExport,
  onImport,
  className
}: FavoritesPanelProps) {
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [editingNotesValue, setEditingNotesValue] = useState('');
  const [showPriceAlertDialog, setShowPriceAlertDialog] = useState<string | null>(null);
  const [priceAlertValue, setPriceAlertValue] = useState('');
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importData, setImportData] = useState('');

  // Get fruit data for each favorite
  const favoritesWithData = favorites.map(favorite => {
    const fruit = fruits.find(f => f.id === favorite.fruitId);
    return { ...favorite, fruit };
  }).filter(fav => fav.fruit);

  // Handle edit notes
  const handleEditNotes = (favorite: FavoriteItem) => {
    setEditingNotes(favorite.fruitId);
    setEditingNotesValue(favorite.notes || '');
  };

  const handleSaveNotes = (fruitId: string) => {
    onUpdateNotes(fruitId, editingNotesValue);
    setEditingNotes(null);
    setEditingNotesValue('');
  };

  const handleCancelNotes = () => {
    setEditingNotes(null);
    setEditingNotesValue('');
  };

  // Handle price alert
  const handleSetPriceAlert = (fruitId: string) => {
    const favorite = favorites.find(f => f.fruitId === fruitId);
    if (favorite?.priceAlert) {
      setPriceAlertValue(favorite.priceAlert.toString());
    } else {
      setPriceAlertValue('');
    }
    setShowPriceAlertDialog(fruitId);
  };

  const handleSavePriceAlert = (fruitId: string) => {
    const price = parseFloat(priceAlertValue);
    if (!isNaN(price) && price > 0) {
      onSetPriceAlert(fruitId, price);
    }
    setShowPriceAlertDialog(null);
    setPriceAlertValue('');
  };

  const handleRemovePriceAlert = (fruitId: string) => {
    onRemovePriceAlert(fruitId);
    setShowPriceAlertDialog(null);
  };

  // Handle export
  const handleExport = () => {
    const data = onExport();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bloxfruits-favorites.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle import
  const handleImport = () => {
    if (importData.trim()) {
      const success = onImport(importData);
      if (success) {
        setImportData('');
        setShowImportDialog(false);
      }
    }
  };

  if (favorites.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Favorites
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">No favorites yet</p>
            <p className="text-sm">Add fruits to your favorites to track them here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Favorites ({favorites.length})
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowImportDialog(true)}
            >
              <Upload className="w-4 h-4 mr-1" />
              Import
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {favoritesWithData.map(({ fruit, ...favorite }) => {
            if (!fruit) return null;

            const hasPriceAlert = favorite.priceAlert !== undefined;
            const isPriceBelowAlert = hasPriceAlert && fruit.price <= favorite.priceAlert!;

            return (
              <div
                key={favorite.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-lg">{fruit.name}</h4>
                      <Badge variant="default">{fruit.rarity}</Badge>
                      {hasPriceAlert && (
                        <Badge 
                          variant={isPriceBelowAlert ? "status" : "default"}
                          className="flex items-center gap-1"
                        >
                          <AlertTriangle className="w-3 h-3" />
                          Price Alert
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Price:</span> ${fruit.price.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Stock:</span> {fruit.stock}
                      </div>
                      <div>
                        <span className="font-medium">Status:</span> {fruit.status}
                      </div>
                      <div>
                        <span className="font-medium">Added:</span> {favorite.addedAt.toLocaleDateString()}
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="mb-3">
                      {editingNotes === favorite.fruitId ? (
                        <div className="space-y-2">
                          <textarea
                            value={editingNotesValue}
                            onChange={(e) => setEditingNotesValue(e.target.value)}
                            placeholder="Add notes..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            rows={2}
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleSaveNotes(favorite.fruitId)}
                            >
                              Save
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancelNotes}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-2">
                          <span className="font-medium text-sm">Notes:</span>
                          <span className="text-sm text-gray-600 flex-1">
                            {favorite.notes || 'No notes added'}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditNotes(favorite)}
                            className="h-6 px-2"
                          >
                            <Edit3 className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Price Alert */}
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">Price Alert:</span>
                      {hasPriceAlert ? (
                        <div className="flex items-center gap-2">
                          <Badge variant="default">
                            ${favorite.priceAlert!.toLocaleString()}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSetPriceAlert(favorite.fruitId)}
                            className="h-6 px-2"
                          >
                            <Edit3 className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemovePriceAlert(favorite.fruitId)}
                            className="h-6 px-2 text-destructive hover:text-destructive"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetPriceAlert(favorite.fruitId)}
                          className="h-6 px-2"
                        >
                          <Star className="w-3 h-3 mr-1" />
                          Set Alert
                        </Button>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveFavorite(favorite.fruitId)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>

      {/* Price Alert Dialog */}
      {showPriceAlertDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[90]">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Set Price Alert</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alert when price drops below:
                </label>
                <input
                  type="number"
                  placeholder="Enter price..."
                  value={priceAlertValue}
                  onChange={(e) => setPriceAlertValue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleSavePriceAlert(showPriceAlertDialog)}
                  disabled={!priceAlertValue.trim()}
                  className="flex-1"
                >
                  Save Alert
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPriceAlertDialog(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import Dialog */}
      {showImportDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[90]">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Import Favorites</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Paste JSON data:
                </label>
                <textarea
                  placeholder="Paste your favorites JSON data here..."
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={6}
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleImport}
                  disabled={!importData.trim()}
                  className="flex-1"
                >
                  Import
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowImportDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
