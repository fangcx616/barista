import type { Recipe } from '@/types'
import { getImageGenerationConfig } from '@/utils/apiConfig'

export interface GeneratedImage {
    url: string
    id: string
}

/**
 * Artkoff AI: Generate Professional Coffee Visuals
 */
export const generateRecipeImage = async (recipe: Recipe): Promise<GeneratedImage> => {
    const config = getImageGenerationConfig()

    // 构建针对咖啡的专业提示词
    const prompt = buildImagePrompt(recipe)

    // 使用适合横屏展示的比例 (DALL-E 3 常用比例)
    const sizeToUse = { width: 1024, height: 1024 }

    try {
        const response = await fetch(config.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: config.model,
                prompt: prompt,
                size: `${sizeToUse.width}x${sizeToUse.height}`,
                n: 1,
                style: 'vivid',
                quality: 'hd'
            })
        })

        if (!response.ok) {
            throw new Error(`API Request Failed: ${response.status}`)
        }

        const data = await response.json()

        if (data.data && data.data.length > 0) {
            return {
                url: data.data[0].url,
                id: `${recipe.id}-${Date.now()}`
            }
        } else {
            throw new Error('Invalid API response format')
        }
    } catch (error) {
        console.error('Image generation failed:', error)
        throw error
    }
}

/**
 * 构建专业咖啡生图提示词
 */
const buildImagePrompt = (recipe: Recipe): string => {
    const ingredients = recipe.ingredients.join(', ')
    // 移除“大师”字样，保留纯粹的设备/方法名
    const brewingMethod = recipe.cuisine.replace('Specialist', '').replace('Artist', '').trim()

    // 针对咖啡优化的英文提示词
    return `High-end commercial food photography of a professional "${recipe.name}". 
    The beverage is prepared using ${brewingMethod} method, containing ${ingredients}. 
    Visual details: rich silky crema on top, delicate latte art if milk-based, beautiful condensation on glass if iced, elegant glassware. 
    Setting: Minimalist modern cafe background, soft cinematic morning sunlight, bokeh effect, 8k resolution, sharp focus on the coffee texture. 
    Professional lighting to highlight the deep coffee colors and steam. 
    Artkoff brand style, premium and sophisticated.`
}