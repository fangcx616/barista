// src/config/ingredients.ts
export interface IngredientCategory {
    id: string
    name: string // 类别名称
    icon: string
    color: string
    items: string[] // 具体的咖啡款式
}

export const ingredientCategories: IngredientCategory[] = [
    {
        id: 'basic_espresso',
        name: 'Basic Espresso',
        icon: '☕',
        color: 'bg-stone-100 border-stone-300 text-stone-800',
        items: ['Single Espresso', 'Double Espresso (Doppio)', 'Ristretto', 'Lungo']
    },
    {
        id: 'water_based',
        name: 'Water Based',
        icon: '💧',
        color: 'bg-blue-50 border-blue-200 text-blue-700',
        items: ['Caffè Americano', 'Long Black', 'Red Eye']
    },
    {
        id: 'milk_based',
        name: 'Milk Based',
        icon: '🥛',
        color: 'bg-orange-50 border-orange-200 text-orange-800',
        items: ['Caffè Latte', 'Cappuccino', 'Flat White', 'Cortado', 'Macchiato', 'Piccolo Latte']
    },
    {
        id: 'sweetened',
        name: 'Sweetened & Dessert',
        icon: '🍯',
        color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        items: ['Caffè Mocha', 'Caramel Macchiato', 'Vanilla Latte', 'Affogato', 'White Mocha']
    },
    {
        id: 'cold_drinks',
        name: 'Cold & Refreshing',
        icon: '❄️',
        color: 'bg-cyan-50 border-cyan-200 text-cyan-800',
        items: ['Cold Brew', 'Nitro Cold Brew', 'Iced Espresso Tonic', 'Iced Americano', 'Iced Latte']
    },
    {
        id: 'creative',
        name: 'Creative Mix',
        icon: '🧪',
        color: 'bg-purple-50 border-purple-200 text-purple-800',
        items: ['Dirty Coffee', 'Einspanner', 'Spanish Latte', 'Sea Salt Cream Coffee']
    },
    {
        id: 'fruity',
        name: 'Fruity Coffee',
        icon: '🍋',
        color: 'bg-green-50 border-green-200 text-green-800',
        items: ['Orange Espresso', 'Lemon Cold Brew', 'Coconut Milk Latte', 'Grapefruit Americano']
    },
    {
        id: 'regional',
        name: 'Regional Specialties',
        icon: '🌍',
        color: 'bg-amber-100 border-amber-300 text-amber-900',
        items: ['Turkish Coffee', 'Vietnamese Egg Coffee', 'Mazagran (Algerian)', 'Cuban Espresso']
    }
]