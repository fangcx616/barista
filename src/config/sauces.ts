import type { SauceCategoryConfig, SauceCategory } from '@/types'

// 1. Artkoff Lab: Flavor Category Configuration
export const sauceCategories: SauceCategoryConfig[] = [
    {
        id: 'classic' as SauceCategory,
        name: 'The Classics',
        description: 'Fundamental syrups: Vanilla, Caramel, and Cane sugar bases.',
        icon: '🍯',
        color: 'bg-[#542D0A]',
        examples: ['Vanilla Bean', 'Salted Caramel', 'Classic Simple', 'Brown Sugar', 'Cane Syrup']
    },
    {
        id: 'spiced' as SauceCategory,
        name: 'Spiced & Nutty',
        description: 'Warm, earthy infusions with nuts and aromatic spices.',
        icon: '🥜',
        color: 'bg-[#8B4513]',
        examples: ['Toasted Hazelnut', 'Cinnamon Bark', 'Pumpkin Spice', 'Nutmeg Infusion', 'Almond Extract']
    },
    {
        id: 'fruity' as SauceCategory,
        name: 'Fruity Infusions',
        description: 'Bright, vibrant fruit reductions and citrus zests.',
        icon: '🍓',
        color: 'bg-[#D4A373]',
        examples: ['Summer Berry', 'Zesty Lemon', 'White Peach', 'Passion Fruit', 'Blood Orange']
    },
    {
        id: 'floral' as SauceCategory,
        name: 'Botanical & Floral',
        description: 'Elegant, light-weight syrups made from edible flowers.',
        icon: '🌸',
        color: 'bg-[#E1C699]',
        examples: ['Wild Lavender', 'Rose Petal', 'Elderflower', 'Hibiscus', 'Jasmine Bloom']
    },
    {
        id: 'rich' as SauceCategory,
        name: 'Rich & Creamy',
        description: 'Heavy viscosity bases, chocolates, and dairy-rich additives.',
        icon: '🍫',
        color: 'bg-[#3E2108]',
        examples: ['Dark Chocolate', 'White Mocha', 'Butterscotch', 'Condensed Milk', 'Ganache']
    },
    {
        id: 'experimental' as SauceCategory,
        name: 'Lab Originals',
        description: 'Modern fusion and avant-garde flavor experiments.',
        icon: '🧪',
        color: 'bg-[#0A0910]',
        examples: ['Sea Salt Foam', 'Earl Grey Reduction', 'Matcha Cream', 'Charcoal Vanilla']
    }
]

// 2. Brewing Application Contexts
export const useCaseOptions = [
    { id: 'iced_coffee', name: 'Cold Brews', icon: '❄️' },
    { id: 'latte', name: 'Hot Lattes', icon: '☕' },
    { id: 'foams', name: 'Milk Foams', icon: '☁️' },
    { id: 'shakerato', name: 'Shakeratos', icon: '🍸' },
    { id: 'desserts', name: 'Toppings', icon: '🍦' }
]

// 3. Preset Formula Templates
export const sauceTemplates = [
    {
        name: 'Madagascar Vanilla Bean',
        category: 'classic' as SauceCategory,
        tags: ['Aromatic', 'Versatile', 'House Favorite'],
        spiceLevel: 1, // Represents Aroma
        sweetLevel: 4,
        saltLevel: 2, // Represents Viscosity
        sourLevel: 0  // Represents Brightness
    },
    {
        name: 'Artkoff Salted Caramel',
        category: 'classic' as SauceCategory,
        tags: ['Savory-Sweet', 'Buttery', 'Rich'],
        spiceLevel: 2,
        sweetLevel: 5,
        saltLevel: 4,
        sourLevel: 1
    },
    {
        name: 'Provence Lavender Honey',
        category: 'floral' as SauceCategory,
        tags: ['Floral', 'Soothing', 'Elegant'],
        spiceLevel: 5,
        sweetLevel: 3,
        saltLevel: 1,
        sourLevel: 2
    },
    {
        name: 'Midnight Dark Mocha',
        category: 'rich' as SauceCategory,
        tags: ['Decadent', 'Bittersweet', 'Velvety'],
        spiceLevel: 3,
        sweetLevel: 3,
        saltLevel: 5,
        sourLevel: 1
    },
    {
        name: 'Cinnamon Spiced Oat',
        category: 'spiced' as SauceCategory,
        tags: ['Warm', 'Earthy', 'Seasonal'],
        spiceLevel: 5,
        sweetLevel: 2,
        saltLevel: 3,
        sourLevel: 1
    }
]

// 4. Flavor Dimension Descriptions
export const tasteDescriptions = {
    spice: ['Mild Aroma', 'Noticeable', 'Strong', 'Intense', 'Pungent'], // Mapped to Aromatic Balance
    sweet: ['Low Sugar', 'Balanced', 'Sweet', 'Richly Sweet', 'Dessert Grade'],
    salt: ['Thin/Watery', 'Smooth', 'Medium Body', 'Syrupy', 'High Viscosity'], // Mapped to Viscosity
    sour: ['Neutral', 'Subtle Brightness', 'Citrusy', 'Tangy', 'Sharp Zest'] // Mapped to Brightness
}

// 5. Expertise Levels
export const difficultyDescriptions = {
    easy: { name: 'Novice Mixologist', color: 'text-green-600', description: 'Simple mixing, no heat control required.' },
    medium: { name: 'Flavor Specialist', color: 'text-[#D4A373]', description: 'Requires precise reduction and temperature management.' },
    hard: { name: 'Master Lab Chemist', color: 'text-[#542D0A]', description: 'Complex infusions and advanced textural manipulation.' }
}

/**
 * Helper Functions
 */
export const getSauceCategoryById = (id: SauceCategory): SauceCategoryConfig | undefined => {
    return sauceCategories.find(category => category.id === id)
}

export const getCategoryColor = (category: SauceCategory): string => {
    const config = getSauceCategoryById(category)
    return config?.color || 'bg-gray-500'
}

export const getCategoryIcon = (category: SauceCategory): string => {
    const config = getSauceCategoryById(category)
    return config?.icon || '🧪'
}