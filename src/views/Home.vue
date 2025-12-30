<template>
    <div class="min-h-screen bg-[#F8F5F2] px-2 md:px-4 py-6">
        <GlobalNavigation />

        <div class="max-w-7xl mx-auto">
            <div class="mb-6">
                <div class="bg-[#542D0A] text-white px-4 py-2 rounded-t-lg border-2 border-[#0A0910] border-b-0 inline-block">
                    <span class="font-bold">1. Select Coffee Style</span>
                </div>
                <div class="bg-white border-2 border-[#0A0910] rounded-lg rounded-tl-none p-4 md:p-6 md:pb-10">
                    <div class="text-center mb-6">
                        <div class="w-16 h-16 bg-[#542D0A] rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span class="text-white text-2xl">☕</span>
                        </div>
                        <h2 class="text-2xl font-bold text-[#542D0A] mb-2">What's your craving?</h2>
                        <p class="text-gray-600">Type or select a coffee style to start</p>
                    </div>

                    <div class="space-y-4">
                        <div v-if="ingredients.length > 0" class="flex flex-wrap gap-2">
                            <div
                                v-for="ingredient in ingredients"
                                :key="ingredient"
                                class="inline-flex items-center gap-2 bg-[#D4A373] text-white px-3 py-2 rounded-full text-sm font-medium border-2 border-[#0A0910]"
                            >
                                {{ ingredient }}
                                <button @click="removeIngredient(ingredient)" class="hover:bg-[#542D0A] rounded-full p-1 transition-colors">
                                    <span class="text-xs">✕</span>
                                </button>
                            </div>
                        </div>

                        <div class="flex gap-2">
                            <input
                                v-model="currentIngredient"
                                @keyup.enter="addIngredient"
                                placeholder="E.g. Iced Latte, Cortado..."
                                class="flex-1 p-3 md:p-4 border-2 border-[#0A0910] rounded-lg text-sm md:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                            />
                        </div>

                        <div class="mt-4">
                            <button
                                @click="toggleIngredientPicker"
                                class="flex items-center justify-between w-full p-2 text-sm text-[#542D0A] hover:bg-[#F1E3D3] rounded-lg border border-[#542D0A]/20 transition-all duration-200"
                            >
                                <span class="flex items-center gap-2">
                                    <span class="text-base">📋</span>
                                    <span class="font-medium">Explore Coffee Menu</span>
                                </span>
                                <span class="transform transition-transform duration-200 text-gray-400" :class="{ 'rotate-180': showIngredientPicker }">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </span>
                            </button>

                            <div v-if="showIngredientPicker" class="mt-2 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                                <div class="p-3 max-h-80 overflow-y-auto scrollbar-hide">
                                    <div class="space-y-4">
                                        <div v-for="category in ingredientCategories" :key="category.id">
                                            <div class="flex items-center gap-2 mb-2">
                                                <span class="text-sm font-bold text-[#542D0A]">{{ category.name }}</span>
                                                <div class="flex-1 h-px bg-gray-200"></div>
                                            </div>
                                            <div class="flex flex-wrap gap-1.5">
                                                <button
                                                    v-for="item in category.items"
                                                    :key="item"
                                                    @click="quickAddIngredient(item)"
                                                    :disabled="ingredients.includes(item)"
                                                    class="px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 hover:border-[#542D0A] hover:bg-[#FDF8F3] transition-all duration-200"
                                                    :class="{ 'bg-[#542D0A] text-white border-[#542D0A] shadow-sm': ingredients.includes(item) }"
                                                >
                                                    {{ item }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                    <div class="bg-[#8B4513] text-white px-4 py-2 rounded-t-lg border-2 border-[#0A0910] border-b-0 inline-block">
                        <span class="font-bold">2. Brewing Method</span>
                    </div>
                    <div class="bg-white border-2 border-[#0A0910] rounded-lg rounded-tl-none p-4 md:p-6 h-full shadow-sm">
                        <div class="grid grid-cols-2 gap-3">
                            <button
                                v-for="cuisine in cuisines"
                                :key="cuisine.id"
                                @click="selectCuisine(cuisine)"
                                :class="[
                                    'p-4 rounded-lg border-2 border-[#0A0910] font-black text-xs transition-all duration-200 flex flex-col items-center gap-2 uppercase tracking-tighter shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]',
                                    selectedCuisines.includes(cuisine.id) ? 'bg-[#542D0A] text-white' : 'bg-gray-50 text-[#542D0A] hover:bg-[#FDF8F3]'
                                ]"
                            >
                                <span class="text-3xl">{{ cuisine.avatar }}</span>
                                <span>{{ cuisine.name }}</span>
                            </button>
                        </div>

                        <div class="mt-6 border-t pt-6">
                             <label class="block text-[10px] font-black text-[#542D0A] mb-2 uppercase tracking-[0.2em]">Flavor Preferences:</label>
                             <textarea
                                v-model="customPrompt"
                                placeholder="E.g. Extra creamy, less sugar, use oat milk..."
                                class="w-full p-3 border-2 border-gray-100 rounded-lg text-sm focus:border-[#542D0A] outline-none transition-colors min-h-[100px]"
                                maxlength="200"
                             ></textarea>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="bg-[#A0522D] text-white px-4 py-2 rounded-t-lg border-2 border-[#0A0910] border-b-0 inline-block">
                        <span class="font-bold">3. Hand over to AI</span>
                    </div>
                    <div class="bg-white border-2 border-[#0A0910] rounded-lg rounded-tl-none p-4 md:p-6 h-full text-center flex flex-col shadow-sm">
                        <div class="w-20 h-20 bg-gradient-to-br from-[#542D0A] to-[#8B4513] rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-4xl shadow-xl border-4 border-white/20 animate-pulse">🤖</div>
                        <h2 class="text-2xl font-black text-[#542D0A] mb-2 uppercase tracking-tight">Artkoff AI Barista</h2>
                        <p class="text-gray-500 mb-6 text-sm italic font-medium">"Ready to create your perfect cup?"</p>

                        <div class="bg-[#FDF8F3] rounded-xl p-5 mb-8 text-left flex-1 border-2 border-[#542D0A]/5 shadow-inner">
                            <h3 class="font-black text-[10px] text-[#542D0A]/40 mb-4 uppercase tracking-[0.3em]">Current Setup</h3>
                            <div class="text-sm text-gray-700 space-y-4 font-bold">
                                <p class="flex justify-between border-b border-[#542D0A]/5 pb-2">
                                    <span class="opacity-40 uppercase">Style:</span>
                                    <span class="text-[#542D0A]">{{ ingredients[0] || '---' }}</span>
                                </p>
                                <p class="flex justify-between border-b border-[#542D0A]/5 pb-2">
                                    <span class="opacity-40 uppercase">Equipment:</span>
                                    <span class="text-[#542D0A]">{{ selectedCuisines.length > 0 ? cuisines.find(c => c.id === selectedCuisines[0])?.name : 'Expert Choice' }}</span>
                                </p>
                            </div>
                        </div>

                        <button
                            @click="generateRecipes"
                            :disabled="ingredients.length === 0 || isLoading"
                            class="w-full bg-[#542D0A] hover:bg-black disabled:bg-gray-300 text-white px-8 py-5 rounded-xl font-black text-xl border-4 border-[#0A0910] transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] disabled:cursor-not-allowed uppercase tracking-widest"
                        >
                            <span v-if="isLoading" class="flex items-center justify-center gap-3">
                                <div class="animate-spin w-6 h-6 border-4 border-white border-t-transparent rounded-full"></div>
                                Extracting...
                            </span>
                            <span v-else>✨ Start Brewing</span>
                        </button>
                    </div>
                </div>
            </div>

            <div ref="resultsSection" class="mt-16 mb-20">
                <div class="bg-[#0A0910] text-white px-6 py-3 rounded-t-xl inline-block border-2 border-[#0A0910] border-b-0 translate-y-0.5 relative z-10">
                    <span class="font-black uppercase tracking-widest text-sm">4. Your Professional Brewing Guide</span>
                </div>
                
                <div class="bg-white border-2 border-[#0A0910] rounded-lg rounded-tl-none p-4 md:p-6 min-h-[300px] shadow-lg relative overflow-hidden">
                    <div v-if="isLoading" class="py-12 flex justify-center">
                        <CookingLoader />
                    </div>

                    <div v-else-if="recipes.length > 0" class="grid grid-cols-1 gap-10 animate-fade-in relative z-10">
                        <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
                    </div>

                    <div v-else class="flex flex-col items-center justify-center py-24 text-gray-300 relative z-10">
                         <div class="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6 border-4 border-dashed border-gray-200">
                             <span class="text-6xl opacity-40">☕</span>
                         </div>
                         <p class="font-black uppercase tracking-widest text-xs">Awaiting your selection above</p>
                         <p class="text-[10px] mt-2 italic">Select a coffee style to unlock the guide</p>
                    </div>
                </div>
            </div>
        </div>
        <GlobalFooter />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { cuisines } from '@/config/cuisines'
import { ingredientCategories } from '@/config/ingredients'
import RecipeCard from '@/components/RecipeCard.vue'
import CookingLoader from '@/components/CookingLoader.vue'
import GlobalNavigation from '@/components/GlobalNavigation.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import { generateRecipe } from '@/services/aiService'
import type { Recipe, CuisineType } from '@/types'

// 核心数据
const ingredients = ref<string[]>([])
const currentIngredient = ref('')
const selectedCuisines = ref<string[]>([])
const customPrompt = ref('')
const recipes = ref<Recipe[]>([])
const isLoading = ref(false)
const showIngredientPicker = ref(false)
const resultsSection = ref<HTMLElement | null>(null)

/**
 * 添加咖啡款式
 */
const addIngredient = () => {
    const item = currentIngredient.value.trim()
    if (item) {
        ingredients.value = [item] // 强制单选模式
        currentIngredient.value = ''
    }
}

const quickAddIngredient = (item: string) => {
    ingredients.value = [item] // 强制单选模式
}

/**
 * 修复：现在接收参数，以解决 TypeScript 构建报错
 */
const removeIngredient = (_item: string) => {
    ingredients.value = []
}

const selectCuisine = (cuisine: CuisineType) => {
    selectedCuisines.value = [cuisine.id]
}

const toggleIngredientPicker = () => {
    showIngredientPicker.value = !showIngredientPicker.value
}

/**
 * 生成冲煮指南
 */
const generateRecipes = async () => {
    if (ingredients.value.length === 0) return
    
    isLoading.value = true
    recipes.value = []

    // 自动滚动到结果区
    if (resultsSection.value) {
        resultsSection.value.scrollIntoView({ behavior: 'smooth' })
    }

    try {
        const method = cuisines.find(c => c.id === selectedCuisines.value[0]) || cuisines[0]
        const result = await generateRecipe(ingredients.value, method, customPrompt.value)
        recipes.value = [result]
    } catch (error) {
        console.error(error)
        alert('Your AI Barista had a hiccup! Please try again.')
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>