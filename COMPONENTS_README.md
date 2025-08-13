# Blox Fruits Stock - UI Components

This document describes the new UI components created for the Blox Fruits Stock application.

## 🎨 Design Philosophy

The components are designed with the following principles:
- **Dark Theme**: Inherits the deep, modern aesthetic from bloxfruitsvalues.com
- **Responsive**: Mobile-first design with responsive breakpoints
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Consistent**: Unified design language across all components
- **Interactive**: Subtle animations and hover effects

## 🧩 Core UI Components

### Card Component
A versatile card container with multiple variants and hover effects.

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

<Card variant="elevated" hover={true}>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

**Variants:**
- `default`: Standard card with subtle background
- `elevated`: Enhanced shadows and depth
- `outlined`: Transparent background with border
- `glass`: Glass-morphism effect

**Props:**
- `variant`: Card style variant
- `hover`: Enable hover animations
- `className`: Additional CSS classes

### Badge Component
Displays rarity levels and status with color-coded variants.

```tsx
import { Badge } from '@/components/ui';

<Badge variant="legendary" size="lg">
  Legendary
</Badge>
```

**Variants:**
- `common`: Gray (Common rarity)
- `rare`: Blue (Rare rarity)
- `epic`: Purple (Epic rarity)
- `legendary`: Yellow (Legendary rarity)
- `mythical`: Red (Mythical rarity)
- `status`: Green (Status indicators)

**Sizes:**
- `sm`: Small (xs text, px-2 py-0.5)
- `md`: Medium (sm text, px-3 py-1)
- `lg`: Large (base text, px-4 py-2)

### StatusIndicator Component
Shows stock status with animated dots and text.

```tsx
import { StatusIndicator } from '@/components/ui';

<StatusIndicator status="in-stock" size="md" showText={true} />
```

**Status Types:**
- `in-stock`: Green dot + "In Stock"
- `low-stock`: Yellow dot + "Low Stock"
- `out-of-stock`: Red dot + "Out of Stock"
- `coming-soon`: Blue dot + "Coming Soon"

**Props:**
- `status`: Stock status value
- `showText`: Display status text (default: true)
- `size`: Indicator size (sm/md/lg)

### SearchBar Component
Interactive search input with clear functionality.

```tsx
import { SearchBar } from '@/components/ui';

<SearchBar 
  placeholder="Search fruits..."
  onSearch={(query) => handleSearch(query)}
  variant="filled"
/>
```

**Variants:**
- `default`: Standard background
- `filled`: Card-like background
- `outlined`: Transparent with border

**Features:**
- Search icon
- Clear button (appears when text is entered)
- Form submission handling
- Focus states and animations

### FilterDropdown Component
Dropdown selector for filtering options with counts.

```tsx
import { FilterDropdown } from '@/components/ui';

<FilterDropdown
  label="Rarity"
  options={rarityOptions}
  value={selectedRarity}
  onValueChange={setSelectedRarity}
  placeholder="Select rarity"
/>
```

**Features:**
- Click outside to close
- Option counts display
- Selected state indication
- Smooth animations

## 🚀 Business Components

### FruitCard Component
Individual fruit display card with rarity styling and actions.

```tsx
import { FruitCard } from '@/components/features';

<FruitCard
  fruit={fruitData}
  onAddToCart={handleAddToCart}
  className="h-full"
/>
```

**Features:**
- Rarity-based color borders
- Hover effects and animations
- Stock status indicator
- Add to cart functionality
- Responsive design

### StockGrid Component
Grid layout for displaying multiple fruit cards.

```tsx
import { StockGrid } from '@/components/features';

<StockGrid
  fruits={fruitsArray}
  loading={isLoading}
  onAddToCart={handleAddToCart}
/>
```

**Features:**
- Responsive grid layout
- Loading states
- Empty state handling
- Item count display

### StockStats Component
Comprehensive statistics dashboard.

```tsx
import { StockStats } from '@/components/features';

<StockStats fruits={fruitsArray} />
```

**Statistics Displayed:**
- Total fruits, stock, and value
- Stock status breakdown
- Rarity distribution
- Visual charts and progress bars

## 🎨 Color Scheme

### Rarity Colors
- **Common**: Gray (#6b7280)
- **Rare**: Blue (#3b82f6)
- **Epic**: Purple (#8b5cf6)
- **Legendary**: Yellow (#f59e0b)
- **Mythical**: Red (#ef4444)

### Status Colors
- **In Stock**: Green (#22c55e)
- **Low Stock**: Yellow (#f59e0b)
- **Out of Stock**: Red (#ef4444)
- **Coming Soon**: Blue (#3b82f6)

## 📱 Responsive Design

All components are built with mobile-first responsive design:
- **Mobile**: Single column layouts
- **Tablet**: Two column grids
- **Desktop**: Multi-column layouts with hover effects

## 🎭 Animations

Subtle animations enhance user experience:
- **Hover Effects**: Scale, shadow, and color transitions
- **Loading States**: Spinner animations
- **Transitions**: Smooth color and size changes
- **Micro-interactions**: Button states and form feedback

## 🔧 Usage Examples

### Complete Fruit List Page
```tsx
import { SearchBar, FilterDropdown, StockGrid } from '@/components/ui';
import { StockStats } from '@/components/features';

export default function FruitsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('');
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <SearchBar 
          placeholder="Search fruits..."
          onSearch={setSearchQuery}
          className="md:col-span-2"
        />
        <FilterDropdown
          options={rarityOptions}
          value={selectedRarity}
          onValueChange={setSelectedRarity}
        />
      </div>
      
      {/* Statistics */}
      <StockStats fruits={filteredFruits} className="mb-8" />
      
      {/* Fruit Grid */}
      <StockGrid 
        fruits={filteredFruits}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
```

### Custom Card Layout
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

<Card variant="glass" hover={true} className="max-w-md">
  <CardHeader>
    <CardTitle className="text-center">Special Offer</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-center text-muted-foreground">
      Limited time deal on legendary fruits!
    </p>
  </CardContent>
</Card>
```

## 🚀 Getting Started

1. **Import Components**:
   ```tsx
   import { Card, Badge, StatusIndicator } from '@/components/ui';
   import { FruitCard, StockGrid } from '@/components/features';
   ```

2. **Use in Your Pages**:
   ```tsx
   <Card variant="elevated">
     <CardHeader>
       <CardTitle>Welcome</CardTitle>
     </CardHeader>
     <CardContent>
       <p>Start building your fruit inventory!</p>
     </CardContent>
   </Card>
   ```

3. **Customize with Props**:
   ```tsx
   <Badge variant="mythical" size="lg" className="custom-class">
     Mythical
   </Badge>
   ```

## 🎯 Best Practices

- Use consistent spacing with Tailwind's spacing scale
- Maintain color consistency across components
- Test responsive behavior on different screen sizes
- Ensure proper contrast ratios for accessibility
- Use semantic HTML elements for better SEO

## 🔍 Demo Page

Visit `/components-demo` to see all components in action with live examples and usage code.

---

For more information, check the component source files in `src/components/ui/` and `src/components/features/`.
