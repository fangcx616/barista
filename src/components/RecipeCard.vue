<template>
    <div class="recipe-card bg-white border-2 border-[#0A0910] overflow-hidden shadow-xl">
        <div class="bg-[#542D0A] text-white p-4 md:p-6 border-b-2 border-[#0A0910]">
            <div class="flex items-start justify-between gap-2">
                <div class="flex-1 min-w-0">
                    <h3 class="text-lg md:text-xl font-black mb-2 tracking-tight uppercase">{{ recipe.name }}</h3>
                    
                    <div class="flex flex-col gap-1 md:hidden">
                        <div class="flex items-center gap-2">
                            <span class="bg-white/10 px-2 py-1 rounded text-[10px] font-bold border border-white/20 whitespace-nowrap uppercase"> ☕ {{ recipe.cuisine }} </span>
                            <span class="text-[10px] whitespace-nowrap">📊 Skill: {{ difficultyText }}</span>
                        </div>
                        <div class="text-[10px]">
                            <span>⏱️ {{ formatTotalTime(recipe.cookingTime) }} Total</span>
                        </div>
                    </div>
                    
                    <div class="hidden md:flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                        <span class="bg-white/10 px-2 py-1 rounded border border-white/20 whitespace-nowrap"> ☕ {{ recipe.cuisine }} </span>
                        <span class="whitespace-nowrap">⏱️ {{ formatTotalTime(recipe.cookingTime) }} Brew Time</span>
                        <span class="whitespace-nowrap">📊 Skill Level: {{ difficultyText }}</span>
                    </div>
                </div>
                <div class="flex items-center gap-2 flex-shrink-0">
                    <FavoriteButton v-if="showFavoriteButton" :recipe="recipe" @favorite-changed="onFavoriteChanged" />
                </div>
            </div>
        </div>

        <div class="p-4 md:p-6 bg-[#FDFBF9]">
            <div class="mb-6">
                <h4 class="text-sm font-black text-[#542D0A] mb-3 flex items-center gap-1 uppercase tracking-tighter">🫘 Ingredients & Dose</h4>
                <div class="flex flex-wrap gap-2">
                    <span v-for="ingredient in recipe.ingredients" :key="ingredient" class="bg-[#F1E3D3] text-[#542D0A] px-3 py-1.5 rounded-md text-xs font-bold border border-[#542D0A]/20">
                        {{ ingredient }}
                    </span>
                </div>
            </div>

            <div class="mb-6">
                <div class="flex items-center justify-between mb-3">
                    <h4 class="text-sm font-black text-[#542D0A] flex items-center gap-1 uppercase tracking-tighter">⚖️ Brewing Guide</h4>
                    <button @click="toggleExpanded" class="bg-white hover:bg-gray-50 text-[#542D0A] text-[10px] font-bold px-3 py-1 rounded border-2 border-[#0A0910] transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
                        {{ isExpanded ? 'COLLAPSE' : 'EXPAND FULL GUIDE' }}
                    </button>
                </div>

                <div v-if="!isExpanded" class="space-y-2">
                    <div v-for="step in recipe.steps.slice(0, 2)" :key="step.step" class="flex gap-3 p-3 bg-white rounded border-2 border-[#0A0910] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                        <div class="flex-shrink-0 w-5 h-5 bg-[#542D0A] text-white rounded flex items-center justify-center font-bold text-[10px]">
                            {{ step.step }}
                        </div>
                        <p class="text-[#542D0A] text-xs font-medium line-clamp-2 italic">{{ step.description }}</p>
                    </div>
                </div>

                <div v-else class="space-y-3">
                    <div v-for="step in recipe.steps" :key="step.step" class="flex gap-4 p-4 bg-white rounded-lg border-2 border-[#0A0910] shadow-[4px_4px_0px_0px_rgba(84,45,10,0.1)]">
                        <div class="flex-shrink-0 w-8 h-8 bg-[#542D0A] text-white rounded-full flex items-center justify-center font-black text-sm">
                            {{ step.step }}
                        </div>
                        <div class="flex-1">
                            <p class="text-[#542D0A] mb-2 text-sm font-bold leading-relaxed">{{ step.description }}</p>
                            <div v-if="step.time || step.temperature" class="flex gap-2">
                                <span v-if="step.time" class="bg-[#F8F5F2] px-2 py-1 rounded text-[10px] font-bold text-gray-600 border border-gray-200"> ⏱️ {{ formatStepTime(step.time) }} </span>
                                <span v-if="step.temperature" class="bg-[#F8F5F2] px-2 py-1 rounded text-[10px] font-bold text-gray-600 border border-gray-200"> 🌡️ {{ step.temperature }} </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="recipe.tips && recipe.tips.length > 0 && isExpanded" class="mb-6">
                <h4 class="text-sm font-black text-[#542D0A] mb-3 flex items-center gap-1 uppercase tracking-tighter">💡 Barista Tips</h4>
                <div class="bg-[#FDF8F3] border-l-4 border-[#D4A373] p-4 rounded-r-lg">
                    <ul class="space-y-2">
                        <li v-for="tip in recipe.tips" :key="tip" class="flex items-start gap-2 text-[#542D0A]">
                            <span class="text-[#D4A373] mt-1 text-xs">★</span>
                            <span class="text-xs font-medium leading-relaxed">{{ tip }}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div v-if="isExpanded" class="mb-6">
                <h4 class="text-sm font-black text-[#542D0A] mb-3 flex items-center gap-1 uppercase tracking-tighter">📊 Coffee Profile</h4>
                
                <div v-if="isFetchingNutrition" class="bg-white border-2 border-[#0A0910] rounded-lg p-8 text-center">
                    <div class="w-10 h-10 border-4 border-gray-200 border-t-[#542D0A] rounded-full animate-spin mx-auto mb-4"></div>
                    <h5 class="text-[10px] font-black text-[#542D0A] uppercase tracking-widest">{{ nutritionLoadingText }}</h5>
                </div>

                <div v-else-if="nutritionError" class="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs font-bold mb-4">
                    {{ nutritionError }}
                </div>

                <NutritionAnalysis v-if="recipe.nutritionAnalysis" :nutritionAnalysis="recipe.nutritionAnalysis" />

                <div v-else-if="!isFetchingNutrition" class="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4 italic text-center">Data not analyzed yet</p>
                    <button @click="fetchNutritionAnalysis" class="bg-[#542D0A] hover:bg-[#3E2108] text-white px-6 py-2 rounded font-black text-[10px] border-2 border-[#0A0910] transition-all uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
                        ✨ Analyze Roast & Caffeine
                    </button>
                </div>
            </div>

            <div v-if="isExpanded" class="mb-6">
                <h4 class="text-sm font-black text-[#542D0A] mb-3 flex items-center gap-1 uppercase tracking-tighter">🥐 Pastry Pairing</h4>

                <div v-if="isFetchingWine" class="bg-white border-2 border-[#0A0910] rounded-lg p-8 text-center shadow-inner">
                    <div class="w-10 h-10 border-4 border-gray-200 border-t-[#D4A373] rounded-full animate-spin mx-auto mb-4"></div>
                    <h5 class="text-[10px] font-black text-[#542D0A] uppercase tracking-widest">{{ wineLoadingText }}</h5>
                </div>

                <WinePairing v-if="recipe.winePairing" :winePairing="recipe.winePairing" />

                <div v-else-if="!isFetchingWine" class="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4 italic text-center">Looking for a perfect snack?</p>
                    <button @click="fetchWinePairing" class="bg-[#D4A373] hover:bg-[#B5895B] text-white px-6 py-2 rounded font-black text-[10px] border-2 border-[#0A0910] transition-all uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
                        🥐 Get Bakery Pairing
                    </button>
                </div>
            </div>

            <div class="mt-6 pt-6 border-t-2 border-[#542D0A]/10 text-center">
                <h4 class="text-sm font-black text-[#542D0A] mb-4 flex items-center gap-1 uppercase tracking-tighter text-left">
                    📷 Brewing Visual
                </h4>
                
                <div v-if="isGeneratingImage" class="bg-white border-2 border-[#0A0910] rounded-lg p-10 text-center max-w-[800px] mx-auto">
                    <div class="w-12 h-12 border-4 border-gray-100 border-t-[#542D0A] rounded-full animate-spin mx-auto mb-4"></div>
                    <h5 class="text-[10px] font-black text-[#542D0A] uppercase tracking-widest">{{ imageLoadingText }}</h5>
                </div>

                <div v-else-if="generatedImage" class="relative group mx-auto max-w-[800px]">
                    <img 
                        :src="generatedImage.url" 
                        class="w-full h-auto block rounded-xl border-4 border-[#0A0910] cursor-pointer shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl" 
                        @click="openImageModal" 
                        alt="Artkoff Brew Result"
                    />
                    <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <span class="bg-black/70 text-white font-black text-[10px] px-3 py-1.5 rounded uppercase tracking-widest border border-white/20 shadow-lg">
                            Click to Expand
                        </span>
                    </div>
                </div>

                <div v-else class="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-10 text-center max-w-[800px] mx-auto">
                    <div class="mb-4 text-4xl opacity-20 text-[#542D0A]">☕</div>
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 font-sans">Visual presentation pending</p>
                    <button 
                        @click="generateImage" 
                        class="bg-white hover:bg-gray-50 text-[#542D0A] px-8 py-3 rounded font-black text-xs border-2 border-[#0A0910] transition-all uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                    >
                        ✨ Generate AI Visual
                    </button>
                </div>
            </div>
        </div>
    </div>

    <ImageModal v-if="showImageModal && generatedImage" :image="getModalImageData()!" @close="closeImageModal" />
</template>

<script setup lang="ts">
import { computed, ref, onUnmounted } from 'vue'
import type { Recipe } from '@/types'
import { generateRecipeImage, type GeneratedImage } from '@/services/imageService'
import { getNutritionAnalysis, getWinePairing } from '@/services/aiService'
import type { GalleryImage } from '@/services/galleryService'
import FavoriteButton from './FavoriteButton.vue'
import NutritionAnalysis from './NutritionAnalysis.vue'
import WinePairing from './WinePairing.vue'
import ImageModal from './ImageModal.vue'

interface Props {
    recipe: Recipe
    showFavoriteButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    showFavoriteButton: true
})

const emit = defineEmits<{
    favoriteChanged: [isFavorited: boolean]
}>()

const isExpanded = ref(false)
const isGeneratingImage = ref(false)
const generatedImage = ref<GeneratedImage | null>(null)
const imageError = ref<string>('')
const imageLoadingText = ref('Framing the perfect crema...')
const nutritionLoadingText = ref('Measuring roast levels...')
const wineLoadingText = ref('Selecting fresh bakery snacks...')
const isFetchingNutrition = ref(false)
const nutritionError = ref('')
const isFetchingWine = ref(false)
const wineError = ref('')
const showImageModal = ref(false)

const imageLoadingTexts = ['Capturing crema...', 'Adjusting lights...', 'Barista is plating...', 'Almost there...']
// 修复：移除未使用的 LoadingTexts 数组以消除 TS6133 错误
// const nutritionLoadingTexts = [...] 
// const wineLoadingTexts = [...]

let imageLoadingInterval: ReturnType<typeof setTimeout> | null = null

const difficultyText = computed(() => {
    const difficultyMap = {
        easy: 'Novice Barista',
        medium: 'Expert Barista',
        hard: 'Master Roaster'
    }
    return difficultyMap[props.recipe.difficulty] || 'Expert'
})

const formatTotalTime = (minutes: number): string => {
    if (!minutes || minutes <= 0) return '5 min'
    if (minutes < 60) return `${minutes} min`
    return `${Math.floor(minutes / 60)} hr ${minutes % 60} min`
}

const formatStepTime = (val: number): string => {
    if (!val) return ''
    if (val < 60) return `${val} sec`
    return `${Math.floor(val / 60)} min ${val % 60} sec`
}

const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value
}

const onFavoriteChanged = (isFavorited: boolean) => {
    emit('favoriteChanged', isFavorited)
}

const generateImage = async () => {
    if (isGeneratingImage.value) return
    isGeneratingImage.value = true
    imageError.value = ''
    let textIndex = 0
    imageLoadingInterval = setInterval(() => {
        imageLoadingText.value = imageLoadingTexts[textIndex]
        textIndex = (textIndex + 1) % imageLoadingTexts.length
    }, 2000)

    try {
        const image = await generateRecipeImage(props.recipe)
        generatedImage.value = image
        const { GalleryService } = await import('@/services/galleryService')
        GalleryService.addToGallery(props.recipe, image.url, image.id, `Premium Artkoff ${props.recipe.name}`)
    } catch (error) {
        imageError.value = 'Failed to capture visual.'
    } finally {
        isGeneratingImage.value = false
        if (imageLoadingInterval) clearInterval(imageLoadingInterval)
    }
}

const fetchNutritionAnalysis = async () => {
    if (isFetchingNutrition.value) return
    isFetchingNutrition.value = true
    nutritionError.value = ''
    try {
        const analysis = await getNutritionAnalysis(props.recipe)
        // 这里的 props 修改在 Vue3 中是合法的，因为 props 对象是响应式的
        props.recipe.nutritionAnalysis = analysis
    } catch (error) {
        nutritionError.value = 'Oracle analysis failed.'
    } finally {
        isFetchingNutrition.value = false
    }
}

const fetchWinePairing = async () => {
    if (isFetchingWine.value) return
    isFetchingWine.value = true
    try {
        const pairing = await getWinePairing(props.recipe)
        props.recipe.winePairing = pairing
    } catch (error) {
        wineError.value = 'No pastry match found.'
    } finally {
        isFetchingWine.value = false
    }
}

const openImageModal = () => { if (generatedImage.value) showImageModal.value = true }
const closeImageModal = () => { showImageModal.value = false }

const getModalImageData = (): GalleryImage | null => {
    if (!generatedImage.value) return null
    return {
        id: generatedImage.value.id,
        url: generatedImage.value.url,
        recipeName: props.recipe.name,
        recipeId: props.recipe.id,
        cuisine: props.recipe.cuisine,
        ingredients: props.recipe.ingredients,
        prompt: `Artkoff Official: ${props.recipe.name}`,
        generatedAt: new Date().toISOString()
    }
}

onUnmounted(() => { if (imageLoadingInterval) clearInterval(imageLoadingInterval) })
</script>

<style scoped>
.recipe-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>