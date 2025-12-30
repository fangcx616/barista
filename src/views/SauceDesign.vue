<template>
    <div class="min-h-screen bg-[#F8F5F2] px-2 md:px-4 py-6 font-sans text-[#0A0910]">
        <GlobalNavigation />

        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-12 mt-8">
                <div class="inline-block relative">
                    <div class="w-24 h-24 bg-[#542D0A] border-4 border-[#0A0910] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-bounce-slow">
                        <span class="text-5xl">🍯</span>
                    </div>
                    <h1 class="text-4xl md:text-5xl font-black text-[#542D0A] mb-4 uppercase tracking-tighter italic">Syrup Master</h1>
                    <p class="text-gray-500 font-bold italic text-sm md:text-base px-6">"Craft your signature flavor infusions. Precision science for the perfect pour."</p>
                </div>
            </div>

            <div class="mb-10">
                <div class="bg-[#542D0A] text-white px-5 py-2 rounded-t-xl border-2 border-[#0A0910] border-b-0 inline-block">
                    <span class="font-black uppercase tracking-widest text-xs">1. Smart Formulation</span>
                </div>
                <div class="bg-white border-4 border-[#0A0910] rounded-xl rounded-tl-none p-6 md:p-10 shadow-[10px_10px_0px_0px_rgba(84,45,10,1)] relative overflow-hidden">
                    <div class="absolute right-[-30px] top-[-30px] opacity-[0.03] rotate-12 pointer-events-none text-9xl font-black italic">LAB</div>

                    <div class="grid md:grid-cols-2 gap-10 relative z-10">
                        <div class="space-y-8">
                            <h3 class="font-black text-xl mb-6 text-[#542D0A] uppercase tracking-tighter flex items-center gap-2">
                                <span>⚖️</span> Profile Parameters
                            </h3>
                            
                            <div class="space-y-6">
                                <div>
                                    <label class="block text-xs font-black text-gray-500 mb-3 uppercase tracking-widest flex items-center justify-between">
                                        <span>🍯 Sweetness Intensity</span>
                                        <span class="bg-[#D4A373] text-white px-2 py-0.5 rounded border border-black">{{ preferences.sweetLevel }}</span>
                                    </label>
                                    <input v-model="preferences.sweetLevel" type="range" min="1" max="5" class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#542D0A] border-2 border-black" />
                                </div>
                                <div>
                                    <label class="block text-xs font-black text-gray-500 mb-3 uppercase tracking-widest flex items-center justify-between">
                                        <span>🌸 Aromatic Balance</span>
                                        <span class="bg-[#542D0A] text-white px-2 py-0.5 rounded border border-black">{{ preferences.spiceLevel }}</span>
                                    </label>
                                    <input v-model="preferences.spiceLevel" type="range" min="1" max="5" class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D4A373] border-2 border-black" />
                                </div>
                                <div>
                                    <label class="block text-xs font-black text-gray-500 mb-3 uppercase tracking-widest flex items-center justify-between">
                                        <span>💧 Viscosity / Thickness</span>
                                        <span class="bg-blue-600 text-white px-2 py-0.5 rounded border border-black">{{ preferences.saltLevel }}</span>
                                    </label>
                                    <input v-model="preferences.saltLevel" type="range" min="1" max="5" class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 border-2 border-black" />
                                </div>
                                <div>
                                    <label class="block text-xs font-black text-gray-500 mb-3 uppercase tracking-widest flex items-center justify-between">
                                        <span>🍋 Brightness / Acidity</span>
                                        <span class="bg-green-600 text-white px-2 py-0.5 rounded border border-black">{{ preferences.sourLevel }}</span>
                                    </label>
                                    <input v-model="preferences.sourLevel" type="range" min="1" max="5" class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600 border-2 border-black" />
                                </div>
                            </div>
                        </div>

                        <div class="space-y-8">
                            <h3 class="font-black text-xl mb-6 text-[#542D0A] uppercase tracking-tighter flex items-center gap-2">
                                <span>🎯</span> Brewing Application
                            </h3>
                            <div class="grid grid-cols-2 gap-3 mb-6">
                                <button
                                    v-for="useCase in useCaseOptions"
                                    :key="useCase.id"
                                    @click="toggleUseCase(useCase.id)"
                                    :class="[
                                        'p-4 rounded-xl border-4 border-[#0A0910] text-[10px] font-black uppercase tracking-widest transition-all duration-200 flex flex-col items-center gap-2',
                                        preferences.useCase.includes(useCase.id) 
                                            ? 'bg-[#542D0A] text-white shadow-none translate-x-1 translate-y-1' 
                                            : 'bg-white text-[#542D0A] hover:bg-[#FDF8F3] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none'
                                    ]"
                                >
                                    <span class="text-2xl">{{ useCase.icon }}</span>
                                    {{ useCase.name }}
                                </button>
                            </div>

                            <h3 class="font-black text-xl mb-4 text-[#542D0A] uppercase tracking-tighter flex items-center gap-2">
                                <span>🧪</span> Pantry Staples
                            </h3>
                            <div class="relative">
                                <input
                                    v-model="ingredientInput"
                                    @keyup.enter="addIngredient"
                                    placeholder="Add base (e.g., Brown Sugar, Vanilla Bean)..."
                                    class="w-full p-4 border-4 border-[#0A0910] rounded-xl text-sm font-bold focus:outline-none focus:ring-8 focus:ring-[#D4A373]/20 transition-all placeholder:text-gray-300"
                                />
                                <button @click="addIngredient" class="absolute right-4 top-1/2 -translate-y-1/2 text-[#542D0A] font-black uppercase text-[10px] hover:scale-110">Add</button>
                            </div>
                            <div class="flex flex-wrap gap-2 mt-4">
                                <span
                                    v-for="ingredient in preferences.availableIngredients"
                                    :key="ingredient"
                                    class="inline-flex items-center gap-2 px-4 py-2 bg-[#FDF8F3] text-[#542D0A] text-[10px] font-black rounded-full border-2 border-[#0A0910] uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] animate-fade-in"
                                >
                                    {{ ingredient }}
                                    <button @click="removeIngredient(ingredient)" class="hover:text-red-600 font-black">✕</button>
                                </span>
                            </div>

                            <button
                                @click="getRecommendations"
                                :disabled="isLoadingRecommendations"
                                class="w-full mt-6 bg-[#D4A373] hover:bg-black disabled:bg-gray-200 text-white px-8 py-5 rounded-2xl font-black text-lg border-4 border-[#0A0910] transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] disabled:cursor-not-allowed uppercase tracking-widest active:scale-95"
                            >
                                <span class="flex items-center gap-3 justify-center">
                                    <template v-if="isLoadingRecommendations">
                                        <div class="animate-spin w-6 h-6 border-4 border-white border-t-transparent rounded-full"></div>
                                        <span>Analyzing Profiles...</span>
                                    </template>
                                    <template v-else>
                                        <span>🤖</span>
                                        <span>Generate Lab Recommendations</span>
                                    </template>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Transition name="fade-slide">
                <div v-if="isLoadingRecommendations || (isLoadingSearch && !currentSauce)" class="mb-12 py-10 bg-white border-4 border-[#0A0910] rounded-2xl shadow-xl text-center overflow-hidden">
                    <div class="flex flex-col items-center gap-6">
                        <div class="w-12 h-12 bg-[#D4A373] rounded-full animate-ping border-2 border-black flex items-center justify-center">
                            <span class="text-white">🧪</span>
                        </div>
                        <h4 class="text-xl md:text-2xl font-black italic text-[#542D0A] uppercase tracking-tighter transition-all duration-500">
                            {{ currentProcessingText }}
                        </h4>
                        <div class="flex gap-2">
                             <div class="w-2 h-2 bg-[#542D0A] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                             <div class="w-2 h-2 bg-[#542D0A] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                             <div class="w-2 h-2 bg-[#542D0A] rounded-full animate-bounce"></div>
                        </div>
                        <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Artkoff Laboratory in Session</p>
                    </div>
                </div>
            </Transition>

            <div v-if="recommendations.length > 0 && !isLoadingRecommendations" class="mb-12 animate-fade-in" data-recommendations>
                <div class="bg-[#A0522D] text-white px-5 py-2 rounded-t-xl border-2 border-[#0A0910] border-b-0 inline-block">
                    <span class="font-black uppercase tracking-widest text-xs">✨ Curated Formulas</span>
                </div>
                <div class="bg-white border-4 border-[#0A0910] rounded-xl rounded-tl-none p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <button
                            v-for="(sauceName, index) in recommendations"
                            :key="sauceName"
                            @click="selectRecommendedSauce(sauceName)"
                            class="group p-6 bg-[#FDFBF9] border-4 border-[#0A0910] rounded-2xl hover:bg-[#F1E3D3] transition-all duration-300 text-left shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 relative overflow-hidden"
                        >
                            <div class="absolute top-0 right-0 p-2 opacity-5 text-6xl font-black italic">{{ index + 1 }}</div>
                            <div class="font-black text-xl text-[#542D0A] mb-3 uppercase tracking-tighter pr-8">{{ sauceName }}</div>
                            <div class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Click to unlock lab tutorial</div>
                            <div class="flex items-center text-[10px] font-black text-[#D4A373] uppercase tracking-widest group-hover:text-black">
                                <span class="mr-2">🧪</span>
                                <span>Master Recommendation</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div class="mb-12">
                <div class="bg-[#0A0910] text-white px-5 py-2 rounded-t-xl border-2 border-[#0A0910] border-b-0 inline-block">
                    <span class="font-black uppercase tracking-widest text-xs">2. Manual Formula Search</span>
                </div>
                <div class="bg-white border-4 border-[#0A0910] rounded-xl rounded-tl-none p-6 md:p-10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex-1 relative group">
                            <input
                                v-model="searchQuery"
                                @keyup.enter="searchSauce()"
                                placeholder="Search e.g., 'Aged Vanilla Syrup' or 'Salty Caramel Foam'..."
                                class="w-full p-5 bg-[#FDFBF9] border-4 border-[#0A0910] rounded-xl text-xl font-black placeholder:text-gray-300 focus:outline-none focus:bg-white transition-all shadow-inner"
                            />
                            <div class="absolute right-5 top-1/2 -translate-y-1/2 text-2xl group-focus-within:animate-bounce">🔍</div>
                        </div>
                        <button
                            @click="searchSauce()"
                            :disabled="!searchQuery.trim() || isLoadingSearch"
                            class="bg-[#542D0A] hover:bg-black disabled:bg-gray-200 text-white px-10 py-5 rounded-xl font-black text-xl border-4 border-[#0A0910] transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] disabled:cursor-not-allowed uppercase tracking-widest"
                        >
                            <span v-if="isLoadingSearch" class="flex items-center gap-3">
                                <div class="animate-spin w-6 h-6 border-4 border-white border-t-transparent rounded-full"></div>
                            </span>
                            <span v-else>EXPLORE</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="mb-16" data-results>
                <div class="bg-[#D4A373] text-white px-8 py-3 rounded-t-2xl inline-block border-2 border-[#0A0910] border-b-0 translate-y-0.5 relative z-10">
                    <span class="font-black uppercase tracking-[0.2em] text-xs">3. Crafting Laboratory Guide</span>
                </div>
                <div class="bg-white border-4 border-[#0A0910] rounded-2xl rounded-tl-none p-8 md:p-12 min-h-[400px] shadow-2xl relative overflow-hidden">
                    <div class="absolute right-[-80px] bottom-[-80px] opacity-[0.02] rotate-12 pointer-events-none text-[400px] font-black italic">S</div>

                    <div v-if="isLoadingSearch" class="flex flex-col items-center justify-center py-24">
                        <div class="flex flex-col items-center gap-6">
                            <div class="w-16 h-16 border-8 border-[#D4A373]/20 border-t-[#542D0A] rounded-full animate-spin"></div>
                            <h3 class="text-2xl font-black text-[#542D0A] uppercase tracking-tighter italic">Infusing Flavor Molecules...</h3>
                            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] animate-pulse">Consulting the Artkoff Archive</p>
                        </div>
                    </div>

                    <div v-else-if="currentSauce" class="animate-fade-in relative z-10">
                        <SauceRecipeComponent :sauce="currentSauce" />
                    </div>

                    <div v-else class="flex flex-col items-center justify-center py-24 text-gray-300">
                         <div class="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-8 border-4 border-dashed border-gray-200">
                             <span class="text-6xl opacity-30">🥄</span>
                         </div>
                         <h4 class="font-black uppercase tracking-[0.3em] text-sm">Station Standby</h4>
                         <p class="text-[10px] mt-4 font-bold uppercase tracking-widest italic">Awaiting formula selection for crafting...</p>
                    </div>
                </div>
            </div>

            <div v-if="searchHistory.length > 0" class="mb-20">
                <div class="bg-[#F8F5F2] text-[#0A0910]/40 px-5 py-2 font-black uppercase tracking-widest text-[10px]">
                    Recent Lab Sessions
                </div>
                <div class="flex flex-wrap gap-3 mt-4">
                    <button
                        v-for="historyItem in searchHistory.slice(0, 8)"
                        :key="historyItem"
                        @click="selectHistoryItem(historyItem)"
                        class="px-4 py-2 bg-white border-2 border-[#0A0910]/10 rounded-lg text-[11px] font-black text-[#542D0A] hover:border-[#542D0A] hover:bg-white transition-all uppercase tracking-tight"
                    >
                        {{ historyItem }}
                    </button>
                    <button @click="clearHistory" class="px-4 py-2 text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest">Wipe Memory</button>
                </div>
            </div>
        </div>

        <GlobalFooter />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { generateSauceRecipe, recommendSauces } from '@/services/aiService'
import type { SauceRecipe, SaucePreference } from '@/types'
import { useCaseOptions } from '@/config/sauces'
import SauceRecipeComponent from '@/components/SauceRecipe.vue'
import GlobalNavigation from '@/components/GlobalNavigation.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'

// 轮播文字配置
const labProcessingTexts = [
    'Sterilizing infusion vessels...',
    'Calibrating sugar-to-solute ratios...',
    'Extracting aromatic flavor molecules...',
    'Calculating molecular viscosity...',
    'Optimizing brightness parameters...',
    'Stabilizing suspension dynamics...',
    'Finalizing Artkoff Lab formulation...'
]

// 响应式状态
const searchQuery = ref('')
const ingredientInput = ref('')
const currentSauce = ref<SauceRecipe | null>(null)
const recommendations = ref<string[]>([])
const searchHistory = ref<string[]>([])
const isLoadingSearch = ref(false)
const isLoadingRecommendations = ref(false)
const currentProcessingText = ref(labProcessingTexts[0])
let textRotationInterval: NodeJS.Timeout | null = null

const preferences = ref<SaucePreference>({
    spiceLevel: 3, sweetLevel: 4, saltLevel: 3, sourLevel: 2,
    useCase: [],
    availableIngredients: ['Vanilla Bean', 'Cane Sugar']
})

onMounted(() => {
    const saved = localStorage.getItem('sauceDesign_history')
    if (saved) {
        try { searchHistory.value = JSON.parse(saved) } catch (e) { console.error(e) }
    }
})

const startLabAnimation = () => {
    let textIndex = 0
    textRotationInterval = setInterval(() => {
        textIndex = (textIndex + 1) % labProcessingTexts.length
        currentProcessingText.value = labProcessingTexts[textIndex]
    }, 1500)
}

const stopLabAnimation = () => { if (textRotationInterval) clearInterval(textRotationInterval) }

const toggleUseCase = (id: string) => {
    const idx = preferences.value.useCase.indexOf(id)
    if (idx > -1) preferences.value.useCase.splice(idx, 1)
    else preferences.value.useCase.push(id)
}

const addIngredient = () => {
    const val = ingredientInput.value.trim()
    if (val && !preferences.value.availableIngredients.includes(val)) {
        preferences.value.availableIngredients.push(val); ingredientInput.value = ''
    }
}

const removeIngredient = (ing: string) => {
    preferences.value.availableIngredients = preferences.value.availableIngredients.filter(i => i !== ing)
}

const getRecommendations = async () => {
    isLoadingRecommendations.value = true
    recommendations.value = [] 
    currentSauce.value = null
    startLabAnimation()
    try {
        const result = await recommendSauces(preferences.value)
        recommendations.value = Array.isArray(result) ? result : []
        // 人为增加仪式感等待
        await new Promise(r => setTimeout(r, 1500))
        setTimeout(() => {
            document.querySelector('[data-recommendations]')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
    } catch (error) {
        console.error(error)
    } finally {
        isLoadingRecommendations.value = false
        stopLabAnimation()
    }
}

const searchSauce = async (isSelection = false) => {
    if (!searchQuery.value.trim() || isLoadingSearch.value) return;
    
    // 1. 立即清除旧配方，解决“乱”的核心逻辑
    currentSauce.value = null; 
    isLoadingSearch.value = true;
    
    const sauceName = searchQuery.value.trim();
    addToHistory(sauceName);
    
    if (!isSelection) recommendations.value = [];
    
    startLabAnimation();
    try {
        const result = await generateSauceRecipe(sauceName);
        // 2. 只有成功后才重新赋值
        currentSauce.value = result;
        
        setTimeout(() => {
            document.querySelector('[data-results]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    } catch (error) {
        console.error(error);
    } finally {
        isLoadingSearch.value = false;
        stopLabAnimation();
    }
};

const selectRecommendedSauce = async (name: string) => {
    searchQuery.value = name
    await searchSauce(true) // 传入 true 表示点击推荐项，保留列表
}

const selectHistoryItem = (name: string) => {
    searchQuery.value = name
    searchSauce()
}

const addToHistory = (name: string) => {
    if (!searchHistory.value.includes(name)) {
        searchHistory.value.unshift(name)
        if (searchHistory.value.length > 20) searchHistory.value.pop()
        localStorage.setItem('sauceDesign_history', JSON.stringify(searchHistory.value))
    }
}

const clearHistory = () => { searchHistory.value = []; localStorage.removeItem('sauceDesign_history') }
onUnmounted(() => stopLabAnimation())
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
.animate-bounce-slow { animation: bounce 4s infinite ease-in-out; }
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.5s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(15px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-15px); }

input[type=range]::-webkit-slider-thumb {
    appearance: none; height: 28px; width: 28px; border-radius: 8px;
    background: #542D0A; cursor: pointer; border: 3px solid #0A0910;
    box-shadow: 3px 3px 0px 0px rgba(0,0,0,1); transition: all 0.1s;
}
input[type=range]::-webkit-slider-thumb:active { box-shadow: none; transform: translate(2px, 2px); }
</style>