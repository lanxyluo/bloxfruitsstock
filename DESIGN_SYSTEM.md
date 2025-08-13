# Blox Fruits Stock Monitor - Enhanced Design System

## 🎨 Enhanced Color Palette

### Primary Colors
```css
/* Background Colors - Deeper and More Contrast */
--background: #0f1119        /* Deeper blue-gray main background */
--card: #191c28              /* Deeper elevated surface background */
--secondary: #232632         /* Deeper secondary background */

/* Text Colors - Pure White for Maximum Contrast */
--foreground: #ffffff        /* Pure white text for maximum contrast */
--muted-foreground: #9ca3af  /* Soft gray for secondary text */

/* Accent Colors - More Vibrant */
--primary: #3b82f6           /* Blue primary color */
--success: #10b981           /* Green for success states */
--warning: #f59e0b           /* Yellow for warnings */
--destructive: #ef4444       /* Red for errors */
```

### Enhanced Rarity Colors
```css
/* Rarity System - More Vibrant and Saturated */
--rarity-common: #64748b     /* Gray for Common */
--rarity-rare: #3b82f6       /* Blue for Rare */
--rarity-epic: #8b5cf6       /* Purple for Epic */
--rarity-legendary: #f59e0b  /* Orange for Legendary */
--rarity-mythical: #ef4444   /* Red for Mythical */
```

### Enhanced Stock Status Colors
```css
/* Stock Status - More Vibrant */
--stock-in: #10b981          /* Green for in stock */
--stock-out: #ef4444         /* Red for out of stock */
--stock-low: #f59e0b         /* Yellow for low stock */
```

## 🧩 Enhanced Component System

### Enhanced Card Components
```css
/* Base Card - Stronger Shadows and Effects */
.card {
  background: linear-gradient(145deg, hsl(var(--card)) 0%, hsl(25 28 40 / 0.9) 100%);
  border-radius: 12px;
  border: 1px solid hsl(var(--border) / 0.5);
  box-shadow: 
    0 8px 32px -8px hsl(0 0 0 / 0.3),
    0 4px 16px -4px hsl(0 0 0 / 0.2),
    inset 0 1px 0 hsl(255 255 255 / 0.1);
}

/* Enhanced Hover Effect */
.card-hover:hover {
  transform: scale(1.03);
  box-shadow: 
    0 25px 50px -12px hsl(0 0 0 / 0.4),
    0 12px 24px -6px hsl(0 0 0 / 0.3),
    0 0 0 1px hsl(255 255 255 / 0.15),
    inset 0 1px 0 hsl(255 255 255 / 0.15);
}
```

### Enhanced Rarity Card Variants with Glow Effects
```css
/* Rarity-specific borders with glow effects */
.card-common { 
  border-left: 4px solid #64748b;
  box-shadow: 
    0 8px 32px -8px hsl(0 0 0 / 0.3),
    0 4px 16px -4px hsl(0 0 0 / 0.2),
    0 0 0 1px hsl(100 116 139 / 0.2),
    inset 0 1px 0 hsl(255 255 255 / 0.1);
}

.card-rare { 
  border-left: 4px solid #3b82f6;
  box-shadow: 
    0 8px 32px -8px hsl(0 0 0 / 0.3),
    0 4px 16px -4px hsl(0 0 0 / 0.2),
    0 0 0 1px hsl(59 130 246 / 0.2),
    inset 0 1px 0 hsl(255 255 255 / 0.1);
}

.card-epic { 
  border-left: 4px solid #8b5cf6;
  box-shadow: 
    0 8px 32px -8px hsl(0 0 0 / 0.3),
    0 4px 16px -4px hsl(0 0 0 / 0.2),
    0 0 0 1px hsl(139 92 246 / 0.2),
    inset 0 1px 0 hsl(255 255 255 / 0.1);
}

.card-legendary { 
  border-left: 4px solid #f59e0b;
  box-shadow: 
    0 8px 32px -8px hsl(0 0 0 / 0.3),
    0 4px 16px -4px hsl(0 0 0 / 0.2),
    0 0 0 1px hsl(245 158 11 / 0.2),
    inset 0 1px 0 hsl(255 255 255 / 0.1);
}

.card-mythical { 
  border-left: 4px solid #ef4444;
  box-shadow: 
    0 8px 32px -8px hsl(0 0 0 / 0.3),
    0 4px 16px -4px hsl(0 0 0 / 0.2),
    0 0 0 1px hsl(239 68 68 / 0.2),
    inset 0 1px 0 hsl(255 255 255 / 0.1);
}
```

### Enhanced Badge Components
```css
/* Enhanced Status Badges with Glow */
.status-in-stock {
  background: hsl(16 185 129 / 0.3);
  color: hsl(16 185 129);
  border: 1px solid hsl(16 185 129 / 0.4);
  box-shadow: 0 2px 8px -2px hsl(16 185 129 / 0.3);
}

.status-out-of-stock {
  background: hsl(239 68 68 / 0.3);
  color: hsl(239 68 68);
  border: 1px solid hsl(239 68 68 / 0.4);
  box-shadow: 0 2px 8px -2px hsl(239 68 68 / 0.3);
}

.status-low-stock {
  background: hsl(245 158 11 / 0.3);
  color: hsl(245 158 11);
  border: 1px solid hsl(245 158 11 / 0.4);
  box-shadow: 0 2px 8px -2px hsl(245 158 11 / 0.3);
}

/* Enhanced Rarity Badges with Glow */
.rarity-common {
  background: hsl(100 116 139 / 0.3);
  color: hsl(100 116 139);
  border: 1px solid hsl(100 116 139 / 0.4);
  box-shadow: 0 2px 8px -2px hsl(100 116 139 / 0.3);
}

.rarity-rare {
  background: hsl(59 130 246 / 0.3);
  color: hsl(59 130 246);
  border: 1px solid hsl(59 130 246 / 0.4);
  box-shadow: 0 2px 8px -2px hsl(59 130 246 / 0.3);
}

.rarity-epic {
  background: hsl(139 92 246 / 0.3);
  color: hsl(139 92 246);
  border: 1px solid hsl(139 92 246 / 0.4);
  box-shadow: 0 2px 8px -2px hsl(139 92 246 / 0.3);
}

.rarity-legendary {
  background: hsl(245 158 11 / 0.3);
  color: hsl(245 158 11);
  border: 1px solid hsl(245 158 11 / 0.4);
  box-shadow: 0 2px 8px -2px hsl(245 158 11 / 0.3);
}

.rarity-mythical {
  background: hsl(239 68 68 / 0.3);
  color: hsl(239 68 68);
  border: 1px solid hsl(239 68 68 / 0.4);
  box-shadow: 0 2px 8px -2px hsl(239 68 68 / 0.3);
}
```

## 🎭 Enhanced Glass Effects

### Enhanced Glass Morphism
```css
.glass-effect {
  backdrop-filter: blur(12px);
  background: linear-gradient(145deg, hsl(var(--card) / 0.4) 0%, hsl(25 28 40 / 0.3) 100%);
  border: 1px solid hsl(var(--border) / 0.4);
  border-radius: 12px;
}
```

### Enhanced Input Fields
```css
.input-field {
  background: linear-gradient(145deg, hsl(var(--background) / 0.6) 0%, hsl(15 17 25 / 0.4) 100%);
  backdrop-filter: blur(8px);
  border: 1px solid hsl(var(--input));
  border-radius: 12px;
  padding: 12px 16px;
  transition: all 200ms ease;
}

.input-field:focus {
  outline: none;
  ring: 2px;
  ring-color: hsl(var(--ring));
  border-color: transparent;
}
```

## 🎨 Enhanced Typography

### Font Weights
- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700
- **Extrabold**: 800

### Enhanced Text Sizes
```css
/* Headings - Larger and More Impactful */
h1 { font-size: 3.75rem; font-weight: 700; }  /* 60px */
h2 { font-size: 1.875rem; font-weight: 600; } /* 30px */
h3 { font-size: 1.5rem; font-weight: 600; }   /* 24px */

/* Body Text */
.text-lg { font-size: 1.125rem; }  /* 18px */
.text-base { font-size: 1rem; }    /* 16px */
.text-sm { font-size: 0.875rem; }  /* 14px */
.text-xs { font-size: 0.75rem; }   /* 12px */
```

## 🎯 Enhanced Spacing System

### Padding & Margins
```css
/* Component Spacing */
.p-2 { padding: 0.5rem; }   /* 8px */
.p-4 { padding: 1rem; }     /* 16px */
.p-6 { padding: 1.5rem; }   /* 24px */
.p-8 { padding: 2rem; }     /* 32px */

/* Gap Spacing */
.gap-4 { gap: 1rem; }       /* 16px */
.gap-6 { gap: 1.5rem; }     /* 24px */
.gap-8 { gap: 2rem; }       /* 32px */
.gap-12 { gap: 3rem; }      /* 48px */
```

## 🎪 Enhanced Animations

### Enhanced Transitions
```css
/* Standard Transition */
transition: all 200ms ease-out;

/* Hover Transitions */
transition: all 300ms ease-out;

/* Enhanced Transform Animations */
transform: scale(1.03);
transform: translateY(-2px);
```

### Enhanced Keyframe Animations
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    transform: translateY(10px);
    opacity: 0;
  }
  to { 
    transform: translateY(0);
    opacity: 1;
  }
}
```

## 🎨 Enhanced Usage Examples

### Creating an Enhanced Rarity Card
```tsx
<div className={cn(
  "card card-hover p-6 relative overflow-hidden group",
  getRarityCardClass(fruit.rarity)
)}>
  {/* Background Glow Effect */}
  <div className={cn(
    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
    fruit.rarity === 'Mythical' && "shadow-[#ef4444]/10"
  )} />
  
  <div className="relative z-10">
    <div className={cn(
      "rarity-badge inline-flex items-center transition-all duration-300 group-hover:scale-105",
      getRarityBgColor(fruit.rarity)
    )}>
      {fruit.rarity}
    </div>
  </div>
  
  {/* Subtle gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 pointer-events-none" />
</div>
```

### Creating an Enhanced Status Badge
```tsx
<div className={cn(
  "status-badge transition-all duration-300 group-hover:scale-105",
  getStatusBgColor(fruit.status)
)}>
  {fruit.status === 'in-stock' && 'In Stock'}
</div>
```

### Enhanced Glass Effect Container
```tsx
<div className="glass-effect p-6">
  <h2 className="text-2xl font-bold text-foreground">
    Glass Container
  </h2>
</div>
```

## 🎯 Enhanced Design Principles

1. **Maximum Contrast**: Pure white text on deep backgrounds for excellent readability
2. **Vibrant Colors**: More saturated colors for better visual impact
3. **Enhanced Shadows**: Stronger shadows and glow effects for depth
4. **Smooth Animations**: 300ms transitions with ease-out timing
5. **Glass Morphism**: Enhanced backdrop blur and transparency effects
6. **Gaming Aesthetics**: Bold colors, strong contrasts, and modern effects
7. **Interactive Feedback**: Hover effects, scaling, and color transitions
8. **Visual Hierarchy**: Clear information organization with enhanced typography

## 🚀 Key Improvements Made

### Color Enhancements
- **Deeper Backgrounds**: More contrast with pure white text
- **Vibrant Accents**: Higher saturation for better visual impact
- **Enhanced Glow Effects**: Stronger shadows and color-specific glows

### Visual Effects
- **Stronger Shadows**: 32px blur radius for more depth
- **Enhanced Hover States**: Scale to 1.03 with stronger shadows
- **Gradient Overlays**: Subtle white gradients for premium feel
- **Background Glows**: Color-specific glow effects on hover

### Typography
- **Larger Headings**: 60px main title for maximum impact
- **Pure White Text**: Maximum contrast for readability
- **Enhanced Gradients**: Multi-color text gradients

### Interactive Elements
- **Enhanced Buttons**: Gradient backgrounds with glow effects
- **Improved Hover States**: Scale, color, and shadow transitions
- **Better Feedback**: Clear visual feedback on all interactions
