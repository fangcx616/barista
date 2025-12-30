// src/types/index.ts

// 咖啡专家/冲煮流派类型
export interface CuisineType {
    id: string
    name: string
    description: string
    avatar: string
    specialty: string
    prompt: string
}

// 组分/食材类型
export interface Ingredient {
    id: string
    name: string
    category: string
}

// 咖啡配方类型
export interface Recipe {
    id: string
    name: string
    cuisine: string
    ingredients: string[]
    steps: RecipeStep[]
    cookingTime: number
    difficulty: 'easy' | 'medium' | 'hard'
    tips: string[]
    nutritionAnalysis?: NutritionAnalysis // 营养与感官分析
    winePairing?: WinePairing // 配餐建议
}

// 萃取/制作步骤
export interface RecipeStep {
    step: number
    description: string
    time?: number
    temperature?: string
    image?: string
}

// 感官与营养信息 (修复了 caffeine, roastLevel, acidity, body 缺失的问题)
export interface NutritionInfo {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
    sodium: number
    sugar: number
    // --- 新增咖啡专用参数 ---
    caffeine?: number    // 咖啡因 (mg)
    roastLevel?: string  // 烘焙度
    acidity?: string     // 酸度描述
    body?: string        // 醇厚度描述
    vitaminC?: number
    calcium?: number
    iron?: number
}

// 营养分析
export interface NutritionAnalysis {
    nutrition: NutritionInfo
    healthScore: number
    balanceAdvice: string[]
    dietaryTags: string[]
    servingSize: string
}

// 点心/饮品搭配
export interface WinePairing {
    name: string
    type: 'red_wine' | 'white_wine' | 'beer' | 'sake' | 'tea' | 'cocktail' | 'spirits' | 'non_alcoholic' | 'soft_drink' | 'juice' | 'dairy' | 'Pastry' | 'other'
    reason: string
    servingTemperature: string
    glassType?: string
    alcoholContent?: string
    flavor: string
    origin?: string
}

// 收藏记录
export interface FavoriteRecipe {
    id: string
    recipe: Recipe
    favoriteDate: string
    notes?: string
}

// AI 响应
export interface AIResponse {
    success: boolean
    data: Recipe
    message?: string
}

// 糖浆/风味液分类 (已更新为 Artkoff 专业分类，修复了 TS2322 错误)
export type SauceCategory = 'classic' | 'spiced' | 'fruity' | 'floral' | 'rich' | 'experimental' | 'fusion'

// 糖浆合成步骤
export interface SauceStep {
    step: number
    description: string
    time?: number
    temperature?: string
    technique?: string
}

// 实验室保存协议
export interface StorageInfo {
    method: string
    duration: string
    temperature: string
}

// 糖浆配方
export interface SauceRecipe {
    id: string
    name: string
    category: SauceCategory
    ingredients: string[]
    steps: SauceStep[]
    makingTime: number
    difficulty: 'easy' | 'medium' | 'hard'
    tips: string[]
    storage: StorageInfo
    pairings: string[]
    tags: string[]
    spiceLevel: number      // 辣度
    sweetLevel: number      // 甜度
    saltLevel: number       // 咸度
    sourLevel: number       // 酸度 (对应 UI 的 Brightness)
    aromaLevel: number      // 香气 (对应 UI 的 Aroma Balance)
    viscosityLevel: number  // 粘稠度 (对应 UI 的 Viscosity)
    description: string     // 必须是必填或带有默认值
}

// 糖浆实验室偏好
export interface SaucePreference {
    spiceLevel: number
    sweetLevel: number
    saltLevel: number
    sourLevel: number
    useCase: string[]
    availableIngredients: string[]
}

// 自定义风味创作
export interface CustomSauceRequest {
    baseType: 'oil' | 'water' | 'paste' | 'granular'
    flavorDirection: 'spicy' | 'sweet' | 'sour' | 'umami' | 'aromatic'
    specialIngredients: string[]
    expectedTexture: string
    intendedUse: string
    customRequirements?: string
}

// 糖浆分类配置
export interface SauceCategoryConfig {
    id: SauceCategory
    name: string
    description: string
    icon: string
    color: string
    examples: string[]
}

// 收藏糖浆
export interface FavoriteSauce {
    id: string
    sauce: SauceRecipe
    favoriteDate: string
    notes?: string
}

// --- 占卜模块 ---
export type FortuneType = 'daily' | 'mood' | 'couple' | 'number'

export interface DailyFortuneParams {
    zodiac: string
    animal: string
    date: string
}

export interface MoodFortuneParams {
    moods: string[]
    intensity: number
}

export interface PersonInfo {
    zodiac: string
    animal: string
    personality: string[]
}

export interface CoupleFortuneParams {
    user1: PersonInfo
    user2: PersonInfo
}

export interface NumberFortuneParams {
    number: number
    isRandom: boolean
}

export interface FortuneResult {
    id: string
    type: FortuneType
    date: string
    dishName: string
    reason: string
    luckyIndex: number
    description: string
    tips: string[]
    difficulty: 'easy' | 'medium' | 'hard'
    cookingTime: number
    mysticalMessage: string
    ingredients?: string[]
    steps?: string[]
}

export interface FortuneTeller {
    name: string
    avatar: string
    greetings: string[]
    phrases: {
        [key in FortuneType]: {
            opening: string[]
            closing: string[]
            processing: string[]
        }
    }
    mysticalWords: string[]
}

export interface ZodiacConfig {
    id: string
    name: string
    symbol: string
    element: string
    traits: string[]
    luckyColors: string[]
    dates: string
}

export interface AnimalConfig {
    id: string
    name: string
    symbol: string
    element: string
    traits: string[]
    luckyNumbers: number[]
    years: number[]
}

export interface MoodConfig {
    id: string
    name: string
    emoji: string
    color: string
    cookingStyle: string[]
    description: string
}

export interface FortuneStorage {
    history: FortuneResult[]
    userPreferences: {
        defaultZodiac?: string
        defaultAnimal?: string
        favoriteFortuneType?: FortuneType
    }
    feedback: {
        [fortuneId: string]: 'accurate' | 'inaccurate'
    }
}