import { FruitItem, RarityLevel, StockStatus } from '@/types';

// Complete Blox Fruits data based on bloxfruitsvalues.com
export const mockFruits: FruitItem[] = [
  // Mythical Fruits (Highest Tier)
  {
    id: 'dragon',
    name: 'dragon',
    displayName: 'Dragon',
    rarity: RarityLevel.MYTHICAL,
    price: 2500000,
    stock: 5,
    status: StockStatus.IN_STOCK,
    icon: '🐉',
    description: 'The most powerful fruit in the game. Grants incredible fire and flight abilities.',
    lastUpdated: new Date().toISOString(),
    category: 'Fruit',
    tradeable: true,
    demand: 'Very High',
    supply: 'Low'
  },
  {
    id: 'leopard',
    name: 'leopard',
    displayName: 'Leopard',
    rarity: RarityLevel.MYTHICAL,
    price: 1800000,
    stock: 0,
    status: StockStatus.OUT_OF_STOCK,
    icon: '🐆',
    description: 'A legendary fruit that grants incredible speed and agility.',
    lastUpdated: new Date().toISOString(),
    category: 'Fruit',
    tradeable: true,
    demand: 'Very High',
    supply: 'Low'
  },
  {
    id: 'dough',
    name: 'dough',
    displayName: 'Dough',
    rarity: RarityLevel.MYTHICAL,
    price: 1200000,
    stock: 2,
    status: StockStatus.LOW_STOCK,
    icon: '🍞',
    description: 'A powerful fruit that grants control over dough and bread.',
    lastUpdated: new Date().toISOString(),
    category: 'Fruit',
    tradeable: true,
    demand: 'High',
    supply: 'Low'
  },
  {
    id: 'shadow',
    name: 'shadow',
    displayName: 'Shadow',
    rarity: RarityLevel.MYTHICAL,
    price: 800000,
    stock: 8,
    status: StockStatus.IN_STOCK,
    icon: '👤',
    description: 'Grants the ability to control shadows and darkness.',
    lastUpdated: new Date().toISOString(),
    category: 'Fruit',
    tradeable: true,
    demand: 'High',
    supply: 'Medium'
  },
  {
    id: 'control',
    name: 'control',
    displayName: 'Control',
    rarity: RarityLevel.MYTHICAL,
    price: 700000,
    stock: 0,
    status: StockStatus.OUT_OF_STOCK,
    icon: '🎮',
    description: 'Allows control over various elements and objects.',
    lastUpdated: new Date().toISOString(),
    category: 'Fruit',
    tradeable: true,
    demand: 'High',
    supply: 'Low'
  },
  {
    id: 'venom',
    name: 'venom',
    displayName: 'Venom',
    rarity: RarityLevel.MYTHICAL,
    price: 600000,
    stock: 12,
    status: StockStatus.IN_STOCK,
    icon: '☠️',
    description: 'Grants the power to create and control deadly venom.',
    lastUpdated: new Date().toISOString(),
    category: 'Fruit',
    tradeable: true,
    demand: 'Medium',
    supply: 'High'
  },

  // Legendary Fruits
  {
    id: 'soul',
    name: 'soul',
    displayName: 'Soul',
    rarity: RarityLevel.LEGENDARY,
    price: 450000,
    stock: 15,
    status: StockStatus.IN_STOCK,
    icon: '💀',
    description: 'Grants the ability to manipulate souls and spirits.',
    lastUpdated: new Date().toISOString(),
    category: 'Fruit',
    tradeable: true,
    demand: 'Medium',
    supply: 'High'
  },
  {
    id: 'gravity',
    name: 'gravity',
    displayName: 'Gravity',
    rarity: RarityLevel.LEGENDARY,
    price: 400000,
    stock: 20,
    status: StockStatus.IN_STOCK,
    icon: '⚫',
    description: 'Allows control over gravity and gravitational forces.',
    lastUpdated: new Date().toISOString(),
    category: 'Fruit',
    tradeable: true,
    demand: 'Medium',
    supply: 'High'
  },
  {
    id: 'quake',
    name: 'quake',
    displayName: 'Quake',
    rarity: RarityLevel.LEGENDARY,
    price: 350000,
    stock: 18,
    status: StockStatus.IN_STOCK,
    icon: '🌋',
    description: 'Grants the power to create earthquakes and seismic waves.',
    lastUpdated: new Date().toISOString(),
    category: 'Fruit',
    tradeable: true,
    demand: 'Medium',
    supply: 'High'
  },

  // Epic Fruits
  {
    id: 'light',
    name: 'light',
    displayName: 'Light',
    rarity: RarityLevel.EPIC,
    price: 250000,
    stock: 25,
    status: StockStatus.IN_STOCK,
    icon: '☀️',
    description: 'Grants the ability to control and manipulate light.',
    lastUpdated: new Date().toISOString(),
    category: 'Fruit',
    tradeable: true,
    demand: 'Medium',
    supply: 'High'
  },
  {
    id: 'dark',
    name: 'dark',
    displayName: 'Dark',
    rarity: RarityLevel.EPIC,
    price: 200000,
    stock: 30,
    status: StockStatus.IN_STOCK,
    icon: '🌙',
    description: 'Grants control over darkness and shadow abilities.',
    lastUpdated: new Date().toISOString(),
    category: 'Fruit',
    tradeable: true,
    demand: 'Medium',
    supply: 'High'
  },
  {
    id: 'ice',
    name: 'ice',
    displayName: 'Ice',
    rarity: RarityLevel.EPIC,
    price: 180000,
    stock: 35,
    status: StockStatus.IN_STOCK,
    icon: '❄️',
    description: 'Allows the user to create and control ice.',
    lastUpdated: new Date().toISOString(),
    category: 'Fruit',
    tradeable: true,
    demand: 'Medium',
    supply: 'High'
  },

  // Rare Fruits
  {
    id: 'flame',
    name: 'flame',
    displayName: 'Flame',
    rarity: RarityLevel.RARE,
    price: 120000,
    stock: 40,
    status: StockStatus.IN_STOCK,
    icon: '🔥',
    description: 'Grants the ability to control fire and flames.',
    lastUpdated: new Date().toISOString(),
    category: 'Fruit',
    tradeable: true,
    demand: 'Medium',
    supply: 'High'
  },
  {
    id: 'smoke',
    name: 'smoke',
    displayName: 'Smoke',
    rarity: RarityLevel.RARE,
    price: 100000,
    stock: 45,
    status: StockStatus.IN_STOCK,
    icon: '💨',
    description: 'Allows the user to transform into and control smoke.',
    lastUpdated: new Date().toISOString(),
    category: 'Fruit',
    tradeable: true,
    demand: 'Medium',
    supply: 'High'
  },
  {
    id: 'sand',
    name: 'sand',
    displayName: 'Sand',
    rarity: RarityLevel.RARE,
    price: 90000,
    stock: 50,
    status: StockStatus.IN_STOCK,
    icon: '🏜️',
    description: 'Grants control over sand and desert abilities.',
    lastUpdated: new Date().toISOString(),
    category: 'Fruit',
    tradeable: true,
    demand: 'Medium',
    supply: 'High'
  },

  // Uncommon Fruits
  {
    id: 'bomb',
    name: 'bomb',
    displayName: 'Bomb',
    rarity: RarityLevel.UNCOMMON,
    price: 60000,
    stock: 60,
    status: StockStatus.IN_STOCK,
    icon: '💣',
    description: 'Allows the user to create and control explosions.',
    lastUpdated: new Date().toISOString(),
    category: 'Fruit',
    tradeable: true,
    demand: 'Low',
    supply: 'High'
  },
  {
    id: 'spike',
    name: 'spike',
    displayName: 'Spike',
    rarity: RarityLevel.UNCOMMON,
    price: 50000,
    stock: 65,
    status: StockStatus.IN_STOCK,
    icon: '🌵',
    description: 'Grants the ability to create and control spikes.',
    lastUpdated: new Date().toISOString(),
    category: 'Fruit',
    tradeable: true,
    demand: 'Low',
    supply: 'High'
  },
  {
    id: 'chop',
    name: 'chop',
    displayName: 'Chop',
    rarity: RarityLevel.UNCOMMON,
    price: 40000,
    stock: 70,
    status: StockStatus.IN_STOCK,
    icon: '⚔️',
    description: 'Grants enhanced cutting and slicing abilities.',
    lastUpdated: new Date().toISOString(),
    category: 'Fruit',
    tradeable: true,
    demand: 'Low',
    supply: 'High'
  },

  // Common Fruits
  {
    id: 'rubber',
    name: 'rubber',
    displayName: 'Rubber',
    rarity: RarityLevel.COMMON,
    price: 25000,
    stock: 80,
    status: StockStatus.IN_STOCK,
    icon: '🔄',
    description: 'Grants rubber-like properties and stretching abilities.',
    lastUpdated: new Date().toISOString(),
    category: 'Fruit',
    tradeable: true,
    demand: 'Low',
    supply: 'Very High'
  },
  {
    id: 'barrier',
    name: 'barrier',
    displayName: 'Barrier',
    rarity: RarityLevel.COMMON,
    price: 20000,
    stock: 85,
    status: StockStatus.IN_STOCK,
    icon: '🛡️',
    description: 'Allows the user to create protective barriers.',
    lastUpdated: new Date().toISOString(),
    category: 'Fruit',
    tradeable: true,
    demand: 'Low',
    supply: 'Very High'
  },
  {
    id: 'kilogram',
    name: 'kilogram',
    displayName: 'Kilogram',
    rarity: RarityLevel.COMMON,
    price: 15000,
    stock: 90,
    status: StockStatus.IN_STOCK,
    icon: '⚖️',
    description: 'Grants the ability to manipulate weight and mass.',
    lastUpdated: new Date().toISOString(),
    category: 'Fruit',
    tradeable: true,
    demand: 'Low',
    supply: 'Very High'
  }
];

// Gamepass Items
export const mockGamepasses: FruitItem[] = [
  {
    id: '2x-mastery',
    name: '2x-mastery',
    displayName: '2x Mastery',
    rarity: RarityLevel.LEGENDARY,
    price: 1000000,
    stock: 999,
    status: StockStatus.IN_STOCK,
    icon: '⭐',
    description: 'Doubles mastery gain for all fruits and fighting styles.',
    lastUpdated: new Date().toISOString(),
    category: 'Gamepass',
    tradeable: false,
    demand: 'Very High',
    supply: 'Very High'
  },
  {
    id: '2x-exp',
    name: '2x-exp',
    displayName: '2x Experience',
    rarity: RarityLevel.EPIC,
    price: 500000,
    stock: 999,
    status: StockStatus.IN_STOCK,
    icon: '📈',
    description: 'Doubles experience gain from all sources.',
    lastUpdated: new Date().toISOString(),
    category: 'Gamepass',
    tradeable: false,
    demand: 'High',
    supply: 'Very High'
  },
  {
    id: 'more-inventory',
    name: 'more-inventory',
    displayName: 'More Inventory',
    rarity: RarityLevel.RARE,
    price: 250000,
    stock: 999,
    status: StockStatus.IN_STOCK,
    icon: '🎒',
    description: 'Increases inventory capacity.',
    lastUpdated: new Date().toISOString(),
    category: 'Gamepass',
    tradeable: false,
    demand: 'Medium',
    supply: 'Very High'
  }
];

// Limited Items
export const mockLimited: FruitItem[] = [
  {
    id: 'halloween-event',
    name: 'halloween-event',
    displayName: 'Halloween Event',
    rarity: RarityLevel.MYTHICAL,
    price: 5000000,
    stock: 1,
    status: StockStatus.LOW_STOCK,
    icon: '🎃',
    description: 'Limited Halloween event exclusive item.',
    lastUpdated: new Date().toISOString(),
    category: 'Limited',
    tradeable: true,
    demand: 'Very High',
    supply: 'Low'
  }
];

// Combine all items
export const allItems: FruitItem[] = [
  ...mockFruits,
  ...mockGamepasses,
  ...mockLimited
];

// Helper functions
export const getFruitsByRarity = (rarity: RarityLevel): FruitItem[] => {
  return allItems.filter(item => item.rarity === rarity);
};

export const getFruitsByStatus = (status: StockStatus): FruitItem[] => {
  return allItems.filter(item => item.status === status);
};

export const getFruitsByCategory = (category: string): FruitItem[] => {
  return allItems.filter(item => item.category === category);
};

export const searchFruits = (searchTerm: string): FruitItem[] => {
  const term = searchTerm.toLowerCase();
  return allItems.filter(item => 
    item.displayName.toLowerCase().includes(term) ||
    item.description.toLowerCase().includes(term)
  );
};
