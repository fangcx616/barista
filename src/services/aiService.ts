/**
 * src/services/aiService.ts
 * Artkoff AI Barista Service Layer
 */

import axios from 'axios'
import type {
    Recipe,
    CuisineType,
    NutritionAnalysis,
    WinePairing,
    SauceRecipe,
    SaucePreference,
    CustomSauceRequest,
    FortuneResult,
    DailyFortuneParams,
    MoodFortuneParams,
    CoupleFortuneParams,
    NumberFortuneParams
} from '@/types'
import { getTextGenerationConfig } from '@/utils/apiConfig'

/**
 * 区块 1：基础配置与初始化
 */
const createAiClient = () => {
    const config = getTextGenerationConfig()
    return axios.create({
        baseURL: config.baseUrl,
        timeout: config.timeout,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${config.apiKey}`
        }
    })
}

/**
 * 区块 2：核心咖啡配方生成 (AI Barista)
 */
export const generateRecipe = async (coffeeStyle: string[], brewingMethod: CuisineType, customPrompt?: string): Promise<Recipe> => {
    try {
        const aiClient = createAiClient()
        const apiConfig = getTextGenerationConfig()

        let prompt = `You are a World-Class Barista at Artkoff. 
        Your mission is to provide a professional, precise brewing guide for "${coffeeStyle[0]}" using the "${brewingMethod.name}" method.
        
        Guidelines:
        1. Units: Always use US Standard units (oz for liquid, grams for coffee, °F for temperature).
        2. Bean Details: Suggest a specific roast level (Light/Medium/Dark) and ideal origin.
        3. Precision: Specify grind size (Fine/Medium/Coarse) and exact brewing time.
        4. Artkoff Style: Emphasize quality and a professional workflow.

        Equipment Specialty: ${brewingMethod.specialty}
        Base Prompt: ${brewingMethod.prompt}
        Requested Style: ${coffeeStyle.join(', ')}`

        if (customPrompt) {
            prompt += `\n\nUser's Personal Preferences: ${customPrompt}`
        }

        prompt += `\n\nReturn the response ONLY in English and strictly follow this JSON format:
{
  "name": "Professional Drink Name",
  "ingredients": ["Dose of coffee beans", "Volume of water/milk", "Syrups/Toppings"],
  "steps": [
    {
      "step": 1,
      "description": "Clear instruction",
      "time": 30,
      "temperature": "195°F"
    }
  ],
  "cookingTime": 5,
  "difficulty": "medium",
  "tips": ["Pro barista tip", "Maintenance or serving tip"]
}`

        const response = await aiClient.post('/chat/completions', {
            model: apiConfig.model,
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional coffee expert for Artkoff. Only output valid JSON. No conversational text. Language: English.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: apiConfig.temperature,
            stream: false
        })

        const aiResponse = response.data.choices[0].message.content
        const cleanResponse = aiResponse.trim().replace(/```json\s*|```/g, '')
        const recipeData = JSON.parse(cleanResponse)

        return {
            id: `coffee-${brewingMethod.id}-${Date.now()}`,
            name: recipeData.name || coffeeStyle[0],
            cuisine: brewingMethod.name,
            ingredients: recipeData.ingredients || coffeeStyle,
            steps: recipeData.steps || [
                { step: 1, description: 'Prepare beans and Artkoff machine', time: 2 },
                { step: 2, description: 'Brew according to standard parameters', time: 3 }
            ],
            cookingTime: recipeData.cookingTime || 5,
            difficulty: recipeData.difficulty || 'medium',
            tips: recipeData.tips || ['Keep equipment clean', 'Use filtered water'],
            nutritionAnalysis: undefined,
            winePairing: undefined
        }
    } catch (error) {
        console.error(`Brewing Error:`, error)
        throw new Error(`The Barista is busy dialing in the espresso. Please try again soon.`)
    }
}

/**
 * 区块 3：菜单与品鉴组合设计 (Menu Flight)
 */
export const generateTableMenu = async (config: {
    dishCount: number
    flexibleCount: boolean
    tastes: string[]
    cuisineStyle: string
    diningScene: string
    nutritionFocus: string
    customRequirement: string
    customDishes: string[]
}): Promise<
    Array<{
        name: string
        description: string
        category: string
        tags: string[]
    }>
> => {
    try {
        const prompt = `Design a professional "Coffee Tasting Flight" or "Coffee Menu" for Artkoff.
        Scenario: ${config.diningScene}
        Flavor Profile: ${config.tastes.length > 0 ? config.tastes.join(', ') : 'Balanced'}
        Target Selection: ${config.dishCount} beverages.
        
        Requirements:
        1. Focus on US market preferences.
        2. Mix different categories (Espresso, Milk-based, Signature Drinks).
        3. Provide a short professional description for each.

        Please return strictly in JSON:
        {
          "dishes": [
            {
              "name": "Beverage Name",
              "description": "Flavor notes and why it fits the scene",
              "category": "Espresso/Cold Brew/Signature",
              "tags": ["Low Caffeine", "Refreshing", "Artkoff Classic"]
            }
          ]
        }`

        const aiClient = createAiClient()
        const apiConfig = getTextGenerationConfig()

        const response = await aiClient.post('/chat/completions', {
            model: apiConfig.model,
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional coffee menu designer for Artkoff. Only output JSON. Use English.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.8,
            stream: false
        })

        const aiResponse = response.data.choices[0].message.content
        const cleanResponse = aiResponse.trim().replace(/```json\s*|```/g, '')
        const menuData = JSON.parse(cleanResponse)
        return menuData.dishes || []
    } catch (error) {
        console.error('Menu Design Error:', error)
        throw new Error('Our menu designer is taking a coffee break. Please try again.')
    }
}

export const generateDishRecipe = async (dishName: string, dishDescription: string, category: string): Promise<Recipe> => {
    try {
        const prompt = `Generate a professional brewing guide for this coffee beverage:
        Name: ${dishName}
        Description: ${dishDescription}
        Category: ${category}

        Return strictly in JSON:
        {
          "name": "Beverage Name",
          "ingredients": ["Ingredient 1", "Ingredient 2"],
          "steps": [
            { "step": 1, "description": "Instructions", "time": 30, "temperature": "195°F" }
          ],
          "cookingTime": 5,
          "difficulty": "medium",
          "tips": ["Barista tip 1", "Tip 2"]
        }`

        const aiClient = createAiClient()
        const apiConfig = getTextGenerationConfig()

        const response = await aiClient.post('/chat/completions', {
            model: apiConfig.model,
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional Artkoff Barista. Output JSON only. Use English.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: apiConfig.temperature,
            stream: false
        })

        const aiResponse = response.data.choices[0].message.content
        const cleanResponse = aiResponse.trim().replace(/```json\s*|```/g, '')
        const recipeData = JSON.parse(cleanResponse)

        return {
            id: `coffee-item-${Date.now()}`,
            name: recipeData.name || dishName,
            cuisine: category,
            ingredients: recipeData.ingredients || [],
            steps: recipeData.steps || [],
            cookingTime: recipeData.cookingTime || 5,
            difficulty: recipeData.difficulty || 'medium',
            tips: recipeData.tips || []
        }
    } catch (error) {
        console.error('Brewing Guide Error:', error)
        throw new Error('The Barista is busy. Please try again later.')
    }
}

/**
 * 区块 4：自定义与流式生成
 */
export const generateCustomRecipe = async (ingredients: string[], customPrompt: string): Promise<Recipe> => {
    try {
        const prompt = `You are a professional Artkoff Barista. Create a custom coffee recipe based on these inputs:
        Base Style: ${ingredients.join(', ')}
        Special Request: ${customPrompt}

        Return strictly in JSON format (English, US Units):
        {
          "name": "Custom Drink Name",
          "ingredients": ["Item 1", "Item 2"],
          "steps": [
            { "step": 1, "description": "Step detail", "time": 30, "temperature": "195°F" }
          ],
          "cookingTime": 5,
          "difficulty": "medium",
          "tips": ["Pro tip"]
        }`

        const aiClient = createAiClient()
        const apiConfig = getTextGenerationConfig()

        const response = await aiClient.post('/chat/completions', {
            model: apiConfig.model,
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional coffee expert. Output JSON only. Language: English.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: apiConfig.temperature,
            max_tokens: 2000,
            stream: false
        })

        const aiResponse = response.data.choices[0].message.content
        const cleanResponse = aiResponse.trim().replace(/```json\s*|```/g, '')
        const recipeData = JSON.parse(cleanResponse)

        return {
            id: `custom-coffee-${Date.now()}`,
            name: recipeData.name || 'Custom Artkoff Brew',
            cuisine: 'Custom',
            ingredients: recipeData.ingredients || ingredients,
            steps: recipeData.steps || [],
            cookingTime: recipeData.cookingTime || 5,
            difficulty: recipeData.difficulty || 'medium',
            tips: recipeData.tips || []
        }
    } catch (error) {
        console.error('Custom Brew Error:', error)
        throw new Error('The Barista could not process your special request. Please try again.')
    }
}

export const generateMultipleRecipesStream = async (
    ingredients: string[],
    cuisines: CuisineType[],
    onRecipeGenerated: (recipe: Recipe, index: number, total: number) => void,
    onRecipeError?: (error: Error, index: number, cuisine: CuisineType, total: number) => void,
    customPrompt?: string
): Promise<void> => {
    const total = cuisines.length
    let completedCount = 0

    for (let index = 0; index < cuisines.length; index++) {
        const cuisine = cuisines[index]
        try {
            const delay = 1000 + Math.random() * 2000
            await new Promise(resolve => setTimeout(resolve, delay))

            const recipe = await generateRecipe(ingredients, cuisine, customPrompt)
            completedCount++
            onRecipeGenerated(recipe, index, total)
        } catch (error) {
            console.error(`Failed to generate ${cuisine.name} guide:`, error)
            if (onRecipeError) {
                const friendlyError = new Error(`The ${cuisine.name} specialist is unavailable.`)
                onRecipeError(friendlyError, index, cuisine, total)
            }
            continue
        }
    }

    if (completedCount === 0) {
        throw new Error('All baristas are currently busy. Please try again shortly.')
    }
}

/**
 * 区块 5：咖啡参数深度分析 (Coffee Profile)
 */
export const getNutritionAnalysis = async (recipe: Recipe): Promise<NutritionAnalysis> => {
    try {
        const aiClient = createAiClient()
        const apiConfig = getTextGenerationConfig()

        const prompt = `You are a professional Artkoff Coffee Lab Analyst. 
        Provide a professional flavor and chemical profile for the following coffee brew:
        Name: ${recipe.name}
        Brewing Method: ${recipe.cuisine}
        Ingredients: ${recipe.ingredients.join(', ')}

        Analyze the following parameters based on coffee science:
        1. Caffeine content (in mg).
        2. Roast level (Light, Medium, Medium-Dark, or Dark).
        3. Acidity profile (e.g., Bright, Low, Citrusy, or Balanced).
        4. Body/Mouthfeel (e.g., Silky, Heavy, Light, or Creamy).
        5. Approximate calories.

        Please return strictly in JSON format (English):
        {
          "nutrition": {
            "calories": 5, 
            "caffeine": 120, 
            "roastLevel": "Medium-Dark",
            "acidity": "Balanced",
            "body": "Silky",
            "protein": 0,
            "carbs": 1,
            "fat": 0
          },
          "healthScore": 9,
          "balanceAdvice": ["Tasting note 1", "Health or brewing benefit"],
          "dietaryTags": ["Keto-Friendly", "High Antioxidants"],
          "servingSize": "8 oz"
        }`

        const response = await aiClient.post('/chat/completions', {
            model: apiConfig.model,
            messages: [
                {
                    role: 'system',
                    content: 'You are a coffee lab specialist. Analyze coffee parameters. Output JSON only. Use English.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.5,
            stream: false
        })

        const aiResponse = response.data.choices[0].message.content
        const cleanResponse = aiResponse.trim().replace(/```json\s*|```/g, '')
        return JSON.parse(cleanResponse)
    } catch (error) {
        console.error('Coffee analysis failed:', error)
        return generateFallbackNutrition(recipe.ingredients)
    }
}

/**
 * 修正后的后备数据生成：补全缺失的 fiber, sodium, sugar 字段以通过构建检查
 */
const generateFallbackNutrition = (ingredients: string[]): NutritionAnalysis => {
    // 简单的关键词逻辑：如果包含 milk 或 latte，热量高一点，咖啡因中等
    const isMilkBased = ingredients.some(ing => 
        ['milk', 'latte', 'cappuccino', 'cream', 'mocha'].some(m => ing.toLowerCase().includes(m))
    )
    
    return {
        nutrition: {
            calories: isMilkBased ? 120 : 5,
            caffeine: isMilkBased ? 85 : 125,
            roastLevel: "Medium",
            acidity: "Balanced",
            body: isMilkBased ? "Creamy" : "Clean",
            protein: isMilkBased ? 6 : 0,
            carbs: isMilkBased ? 9 : 1,
            fat: isMilkBased ? 5 : 0,
            // --- 补全缺失的必填字段 ---
            fiber: 0, 
            sodium: isMilkBased ? 45 : 2, // 毫克 (mg)
            sugar: isMilkBased ? 8 : 0    // 克 (g)
        },
        healthScore: 9,
        balanceAdvice: ["Natural antioxidants active", "Perfect balance of flavor and energy"],
        dietaryTags: isMilkBased ? ["Contains Dairy"] : ["Keto-Friendly", "Zero Sugar"],
        servingSize: "8 oz"
    }
}

/**
 * 区块 6：全球糕点配餐建议 (Pastry Pairing)
 */
export const getWinePairing = async (recipe: Recipe): Promise<WinePairing> => {
    try {
        const prompt = `You are a professional Artkoff Flavor Sommelier. 
        Analyze the coffee profile of "${recipe.name}" (${recipe.cuisine}) and recommend a unique, specific pastry or snack.
        Return strictly in JSON format (English):
        {
          "name": "Specific Pastry Name",
          "type": "bakery/dessert/savory",
          "reason": "Detailed explanation.",
          "flavor": "Flavor profile"
        }`

        const aiClient = createAiClient()
        const apiConfig = getTextGenerationConfig()

        const response = await aiClient.post('/chat/completions', {
            model: apiConfig.model,
            messages: [
                { role: 'system', content: 'You are a professional pastry pairing expert. Output JSON only.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.85,
            stream: false
        })

        const aiResponse = response.data.choices[0].message.content
        const cleanResponse = aiResponse.trim().replace(/```json\s*|```/g, '')
        const wineData = JSON.parse(cleanResponse)
        return Array.isArray(wineData) ? wineData[0] : wineData
    } catch (error) {
        console.error('Pairing failed:', error)
        return generateFallbackWinePairing(recipe)
    }
}

/**
 * 修复：将参数改为 _recipe 解决 TS6133 报错
 */
const generateFallbackWinePairing = (_recipe: Recipe): WinePairing => {
    const pairings = [
        { name: 'Blueberry Scone', type: 'other', flavor: 'Fruity & Crumbly', reason: 'The tart berries complement medium roasts.', servingTemperature: 'Room Temp' },
        { name: 'Glazed Donut', type: 'other', flavor: 'Sweet & Airy', reason: 'A classic American companion for black coffee.', servingTemperature: 'Room Temp' }
    ]
    return pairings[Math.floor(Math.random() * pairings.length)] as WinePairing
}

/**
 * 区块 7：系统测试与单品搜索
 */
export const testAIConnection = async (): Promise<boolean> => {
    try {
        const aiClient = createAiClient()
        const apiConfig = getTextGenerationConfig()
        const response = await aiClient.post('/chat/completions', {
            model: apiConfig.model,
            messages: [{ role: 'user', content: 'Hello!' }],
            max_tokens: 10
        })
        return response.status === 200
    } catch (error) {
        return false
    }
}

export const generateDishRecipeByName = async (drinkName: string): Promise<Recipe> => {
    try {
        const prompt = `Create a professional Artkoff brewing tutorial for "${drinkName}". 
        Output JSON only.`
        const aiClient = createAiClient()
        const apiConfig = getTextGenerationConfig()
        const response = await aiClient.post('/chat/completions', {
            model: apiConfig.model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7
        })
        const aiResponse = response.data.choices[0].message.content
        const cleanResponse = aiResponse.trim().replace(/```json\s*|```/g, '')
        const recipeData = JSON.parse(cleanResponse)

        return {
            id: `coffee-search-${Date.now()}`,
            name: recipeData.name || drinkName,
            cuisine: 'Coffee Masterclass',
            ingredients: recipeData.ingredients || [],
            steps: recipeData.steps || [],
            cookingTime: recipeData.cookingTime || 5,
            difficulty: recipeData.difficulty || 'medium',
            tips: recipeData.tips || []
        }
    } catch (error) {
        throw new Error(`Barista doesn't recognize "${drinkName}".`)
    }
}


/**
 * 辅助函数：从 AI 响应中安全提取 JSON 字符串
 */
const extractJson = (text: string) => {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
        return text.substring(start, end + 1);
    }
    return text.trim().replace(/```json\s*|```/g, '');
};

/**
 * 区块 8：糖浆与风味大师 (Syrup Master)
 */
export const generateSauceRecipe = async (flavorName: string): Promise<SauceRecipe> => {
    try {
        const aiClient = createAiClient();
        const apiConfig = getTextGenerationConfig();

        const prompt = `You are a Chief Flavor Chemist. Formulate a professional laboratory-grade molecular syrup/sauce recipe for: "${flavorName}".
        
        STRICT RULES:
        1. ANALYZE the chemistry of "${flavorName}". Focus on its molecular essence.
        2. NO COFFEE MENTIONS. Do not use terms like "coffee acidity", "espresso notes", or "bitter caffeine finish".
        3. DYNAMIC SCALING: Calculate all levels (0-5) based on real flavor chemistry. DO NOT use default/fixed values like 4 or 2.

        STRICT JSON STRUCTURE REQUIRED:
        {
          "name": "${flavorName}",
          "category": "fruity/floral/spiced/rich/experimental",
          "ingredients": ["12oz Component A", "0.5oz Component B"],
          "steps": [{"step": 1, "description": "Chemical action details", "time": 10, "temperature": "185°F"}],
          "makingTime": 20,
          "difficulty": "medium",
          "tips": ["Technical pro tip"],
          "storage": {"method": "Airtight Glass", "duration": "14 Days", "temperature": "38°F"},
          "pairings": ["Pairing A", "Pairing B"],
          "tags": ["Lab-Tested"],
          "spiceLevel": 0,
          "sweetLevel": 0,
          "saltLevel": 0,
          "sourLevel": 0,
          "aromaLevel": 0,
          "viscosityLevel": 0,
          "description": "A sensory description of the pure flavor essence (viscosity, aromatic volatiles, chemical balance). STRICTLY NO COFFEE NOTES."
        }

        Return ONLY pure JSON. Use US Standard units.`;

        const response = await aiClient.post('/chat/completions', {
            model: apiConfig.model,
            messages: [
                { role: 'system', content: 'You are the Artkoff Chief Flavor Chemist. You focus on the science of flavor independent of beverages.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.8 // 提高随机性以获得更动态的数值
        });

        const sauceData = JSON.parse(extractJson(response.data.choices[0].message.content));

        return {
            id: `flavor-lab-${Date.now()}`,
            name: sauceData.name || flavorName,
            category: (sauceData.category || 'fruity') as any,
            ingredients: Array.isArray(sauceData.ingredients) ? sauceData.ingredients : [],
            steps: Array.isArray(sauceData.steps) ? sauceData.steps : [],
            makingTime: Number(sauceData.makingTime) || 15,
            difficulty: (sauceData.difficulty || 'medium') as any,
            tips: Array.isArray(sauceData.tips) ? sauceData.tips : [],
            storage: sauceData.storage || { method: 'Refrigerated', duration: '14 Days', temperature: '38°F' },
            pairings: Array.isArray(sauceData.pairings) ? sauceData.pairings : [],
            tags: Array.isArray(sauceData.tags) ? sauceData.tags : ['Lab-Tested'],
            // 修复 Build 报错并接收 AI 动态生成的数值
            spiceLevel: Number(sauceData.spiceLevel) || 0,
            sweetLevel: Number(sauceData.sweetLevel) || 0,
            saltLevel: Number(sauceData.saltLevel) || 0,
            sourLevel: Number(sauceData.sourLevel) || 0,
            aromaLevel: Number(sauceData.aromaLevel) || 0,
            viscosityLevel: Number(sauceData.viscosityLevel) || 0,
            description: sauceData.description || 'A precision-crafted flavor infusion.'
        };
    } catch (error) {
        throw new Error('Flavor synthesis failed.');
    }
};

/**
 * 创作实验性自定义风味 - 同步修复数值逻辑
 */
export const createCustomSauce = async (request: CustomSauceRequest): Promise<SauceRecipe> => {
    try {
        const aiClient = createAiClient();
        const apiConfig = getTextGenerationConfig();

        const prompt = `Synthesize an experimental flavor extract:
        - Direction: ${request.flavorDirection}
        - Base: ${request.baseType}
        - Reactants: ${request.specialIngredients.join(', ')}
        - Targeted Viscosity: ${request.expectedTexture}
        
        REQUIREMENT: Calculate 0-5 levels for spice, sweet, salt, sour, aroma, and viscosity based on the molecular synergy. 
        DO NOT include coffee notes. Return JSON only.`;

        const response = await aiClient.post('/chat/completions', {
            model: apiConfig.model,
            messages: [
                { role: 'system', content: 'You are a professional flavor chemist. Output JSON only.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.9
        });

        const cleanResponse = extractJson(response.data.choices[0].message.content);
        const sauceData = JSON.parse(cleanResponse);

        return {
            id: `custom-lab-${Date.now()}`,
            name: sauceData.name || 'Experimental Infusion',
            category: 'fusion' as any,
            ingredients: sauceData.ingredients || [],
            steps: sauceData.steps || [],
            makingTime: sauceData.makingTime || 20,
            difficulty: 'hard',
            tips: sauceData.tips || [],
            storage: sauceData.storage || { method: 'Vacuum Sealed', duration: '10 days', temperature: '38°F' },
            pairings: sauceData.pairings || [],
            tags: ['Experimental'],
            spiceLevel: Number(sauceData.spiceLevel) || 0,
            sweetLevel: Number(sauceData.sweetLevel) || 0,
            saltLevel: Number(sauceData.saltLevel) || 0,
            sourLevel: Number(sauceData.sourLevel) || 0,
            aromaLevel: Number(sauceData.aromaLevel) || 0,
            viscosityLevel: Number(sauceData.viscosityLevel) || 0,
            description: sauceData.description
        };
    } catch (error) {
        throw new Error('Custom lab failure.');
    }
};

/**
 * 其余辅助功能映射保持一致
 */
export const recommendSauces = async (preferences: SaucePreference): Promise<string[]> => {
    try {
        const aiClient = createAiClient();
        const apiConfig = getTextGenerationConfig();
        const prompt = `Based on Sweetness:${preferences.sweetLevel}/5 and Viscosity:${preferences.saltLevel}/5, recommend 5 professional flavoring essences. Return ONLY: {"recommendations": ["Name 1", "Name 2", "Name 3", "Name 4", "Name 5"]}`;
        const response = await aiClient.post('/chat/completions', {
            model: apiConfig.model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.8
        });
        const cleanResponse = extractJson(response.data.choices[0].message.content);
        const data = JSON.parse(cleanResponse);
        return data.recommendations || [];
    } catch (error) {
        return [];
    }
};

export const getSaucePairings = async (flavorName: string): Promise<string[]> => {
    try {
        const aiClient = createAiClient();
        const apiConfig = getTextGenerationConfig();
        const prompt = `Suggest 5 beverages that act in synergy with: "${flavorName}". Return JSON with a "pairings" key.`;
        const response = await aiClient.post('/chat/completions', {
            model: apiConfig.model,
            messages: [{ role: 'system', content: 'You are a flavor pairing specialist. Output pure JSON.' }, { role: 'user', content: prompt }],
            temperature: 0.7
        });
        const cleanResponse = extractJson(response.data.choices[0].message.content);
        const pairingData = JSON.parse(cleanResponse);
        return pairingData.pairings || [];
    } catch (error) {
        return ['Artkoff Reserve Latte', 'Nitro Cold Brew'];
    }
};
/**
 * 区块 9：咖啡神谕 (Coffee Oracle) - 深度解析增强版
 */

/**
 * 1. 每日星象占卜 - 强化宇宙能量与风味关联
 */
export const generateDailyFortune = async (params: DailyFortuneParams): Promise<FortuneResult> => {
    try {
        const aiClient = createAiClient();
        const apiConfig = getTextGenerationConfig();

        const prompt = `You are the Mystical Artkoff Coffee Oracle. Provide a high-end, DEEP "Daily Coffee Destiny" reading for the ${params.zodiac} zodiac sign on ${params.date}.
        
        STRICT CONTENT REQUIREMENTS:
        1. "description": Must be a multi-paragraph mystical analysis (at least 150 words). Analyze how the current alignment of planets for ${params.zodiac} interacts with coffee molecular structures. 
        2. "reason": Provide a sophisticated 2-3 sentence technical and spiritual justification for the choice.
        3. Tone: Artistic, profound, and professional (like a boutique coffee laboratory).

        Return strictly in JSON format:
        {
          "dishName": "A creative, specific coffee beverage",
          "reason": "Detailed alignment reasoning...",
          "luckyIndex": 9,
          "description": "A long, deep analysis covering spiritual energy, flavor psychology, and daily outlook...",
          "tips": ["Ritualistic brewing tip", "Mindfulness advice", "Equipment energy tip"],
          "difficulty": "medium",
          "cookingTime": 5,
          "mysticalMessage": "A cryptic, wise prophecy for the soul.",
          "ingredients": ["Spirit-matching bean origin", "Precise water temperature", "Mystical additive"],
          "steps": ["Step 1 with intention", "Step 2 for the perfect cup"]
        }`;

        const response = await aiClient.post('/chat/completions', {
            model: apiConfig.model,
            messages: [
                { role: 'system', content: 'You are a professional coffee oracle. You provide long, poetic, and meaningful JSON responses.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.8
        });

        const cleanResponse = extractJson(response.data.choices[0].message.content);
        const data = JSON.parse(cleanResponse);

        return {
            id: `daily-oracle-${Date.now()}`,
            type: 'daily',
            date: params.date,
            dishName: data.dishName || 'Celestial Espresso',
            reason: data.reason || 'Planetary alignment confirmed.',
            luckyIndex: data.luckyIndex || 8,
            description: data.description || 'The celestial currents are moving through your cup.',
            tips: data.tips || [],
            difficulty: (data.difficulty || 'medium') as 'easy' | 'medium' | 'hard',
            cookingTime: data.cookingTime || 5,
            mysticalMessage: data.mysticalMessage || 'Your destiny is swirling in the crema.',
            ingredients: data.ingredients || [],
            steps: data.steps || []
        };
    } catch (error) {
        console.error('Oracle Error:', error);
        throw new Error('The Oracle is currently reading the coffee grounds.');
    }
};

/**
 * 2. 情绪能量冲煮 - 修复：支持多成分、多指教生成
 */
export const generateMoodCooking = async (params: MoodFortuneParams): Promise<FortuneResult> => {
    try {
        // 即使前端没改，这里我们也只取第一个情绪确保逻辑准确
        const primaryMood = params.moods[0] || 'Neutral';
        const prompt = `You are the Artkoff Emotional Alchemist. 
        User's current emotional state: [${primaryMood}].
        
        STRICT JSON STRUCTURE REQUIRED:
        {
          "dishName": "A unique name",
          "caffeineAura": "1-sentence on alignment",
          "description": "150+ words analysis",
          "mysticalMessage": "A short prophecy",
          "ingredients": [
            "Specific bean type & origin",
            "Water temperature requirement",
            "Grind size setting (e.g. 1.1mm)",
            "Brewing ratio (e.g. 1:15)"
          ],
          "oracleGuidance": [
            "Actionable tip 1 about pouring technique",
            "Actionable tip 2 about sensory focus"
          ]
        }

        Return JSON only. Language: English. Please ensure 'ingredients' and 'oracleGuidance' are arrays with multiple items.`;

        const aiClient = createAiClient();
        const response = await aiClient.post('/chat/completions', {
            model: getTextGenerationConfig().model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.8
        });

        const data = JSON.parse(extractJson(response.data.choices[0].message.content));

        return {
            id: `mood-oracle-${Date.now()}`,
            type: 'mood',
            date: new Date().toISOString().split('T')[0],
            dishName: data.dishName || 'Alchemy Brew',
            reason: data.caffeineAura || 'Calibrating your aura.',
            luckyIndex: 9,
            description: data.description,
            // 修复：直接使用返回的数组
            tips: data.oracleGuidance || [], 
            difficulty: 'medium',
            cookingTime: 5,
            mysticalMessage: data.mysticalMessage || 'Trust the process.',
            ingredients: data.ingredients || [], 
            steps: data.steps || []
        };
    } catch (error) {
        throw new Error('The Alchemist is busy.');
    }
};

/**
 * 3. 关系共鸣配方 - 修复：强化配方成分
 */
export const generateCoupleCooking = async (params: CoupleFortuneParams): Promise<FortuneResult> => {
    try {
        const prompt = `Analyze synergy between ${params.user1.zodiac} and ${params.user2.zodiac}.
        
        STRICT JSON STRUCTURE REQUIRED:
        {
          "dishName": "Fusion name",
          "caffeineAura": "Shared vibration description",
          "description": "150+ words chemistry analysis",
          "ingredients": ["Component 1", "Component 2", "Component 3", "Component 4"],
          "oracleGuidance": ["Guidance 1", "Guidance 2"],
          "mysticalMessage": "Prophecy for two"
        }

        Return JSON only. Ensure arrays have multiple specific items.`;

        const aiClient = createAiClient();
        const response = await aiClient.post('/chat/completions', {
            model: getTextGenerationConfig().model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.8
        });

        const data = JSON.parse(extractJson(response.data.choices[0].message.content));

        return {
            id: `couple-oracle-${Date.now()}`,
            type: 'couple',
            date: new Date().toISOString().split('T')[0],
            dishName: data.dishName || 'Unity Roast',
            reason: data.caffeineAura || 'Harmonized extraction.',
            luckyIndex: 10,
            description: data.description,
            tips: data.oracleGuidance || [],
            difficulty: 'medium',
            cookingTime: 10,
            mysticalMessage: data.mysticalMessage || 'Unity in every drop.',
            ingredients: data.ingredients || [],
            steps: data.steps || []
        };
    } catch (error) {
        throw new Error('Harmony error.');
    }
};

/**
 * 4. 数字频率冲煮 - 修复：多维度提取种子
 */
export const generateNumberFortune = async (params: NumberFortuneParams): Promise<FortuneResult> => {
    try {
        const prompt = `As a Coffee Numerologist, interpret the sacred frequency of ${params.number}.
        
        STRICT JSON STRUCTURE REQUIRED:
        {
          "dishName": "Mathematical Brew",
          "caffeineAura": "1-sentence on numerical resonance",
          "description": "150+ words on the geometry of ${params.number}",
          "ingredients": [
            "Technical parameter based on ${params.number}", 
            "Bean recommendation", 
            "Water spec",
            "Vessel type"
          ],
          "oracleGuidance": [
            "Mathematical tip 1", 
            "Mathematical tip 2"
          ],
          "mysticalMessage": "The prophecy"
        }

        Return JSON only. Ensure 'ingredients' and 'oracleGuidance' are arrays with multiple elements.`;

        const aiClient = createAiClient();
        const response = await aiClient.post('/chat/completions', {
            model: getTextGenerationConfig().model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7
        });

        const data = JSON.parse(extractJson(response.data.choices[0].message.content));

        return {
            id: `num-oracle-${Date.now()}`,
            type: 'number',
            date: new Date().toISOString().split('T')[0],
            dishName: data.dishName || 'Calculated Extraction',
            reason: data.caffeineAura || `Frequency ${params.number} aligned.`,
            luckyIndex: 9,
            description: data.description,
            tips: data.oracleGuidance || [],
            difficulty: 'medium',
            cookingTime: 5,
            mysticalMessage: data.mysticalMessage || 'Numbers don\'t lie.',
            ingredients: data.ingredients || [],
            steps: data.steps || []
        };
    } catch (error) {
        throw new Error('Numerology error.');
    }
};
/**
 * 区块 10：底层通讯协议 (Chat Stream)
 */
export const chatStream = async (
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
    onDelta: (deltaText: string) => void,
    onComplete?: (fullText: string) => void,
    onError?: (err: unknown) => void
): Promise<void> => {
    const config = getTextGenerationConfig()
    const url = config.baseUrl.replace(/\/$/, '') + '/chat/completions'
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`
    }

    const body = JSON.stringify({
        model: config.model,
        messages,
        temperature: config.temperature,
        stream: true
    })

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body
        })

        if (!response.ok || !response.body) {
            throw new Error(`Request failed: ${response.status}`)
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder('utf-8')
        let buffer = ''
        let fullText = ''

        while (true) {
            const { value, done } = await reader.read()
            if (done) break
            buffer += decoder.decode(value, { stream: true })

            const parts = buffer.split(/\n\n/)
            buffer = parts.pop() || ''

            for (const part of parts) {
                const lines = part.split('\n').map(l => l.trim()).filter(Boolean)
                for (const line of lines) {
                    if (!line.startsWith('data:')) continue
                    const data = line.slice(5).trim()
                    if (data === '[DONE]') {
                        if (onComplete) onComplete(fullText)
                        return
                    }
                    try {
                        const json = JSON.parse(data)
                        const delta = json.choices?.[0]?.delta?.content ?? ''
                        if (delta) {
                            fullText += delta
                            onDelta(delta)
                        }
                    } catch (e) {
                        continue
                    }
                }
            }
        }
        if (onComplete) onComplete(fullText)
    } catch (err) {
        if (onError) onError(err)
        throw err
    }
}