<template>
    <div class="min-h-screen bg-[#F8F5F2] px-2 md:px-4 py-6 font-sans text-[#0A0910]">
        <GlobalNavigation />

        <div class="max-w-7xl mx-auto">
            <div class="mb-8">
                <div class="bg-[#542D0A] text-white px-5 py-2 rounded-t-xl border-2 border-[#0A0910] border-b-0 inline-block">
                    <span class="font-black uppercase tracking-widest text-xs">Your Collection</span>
                </div>
                <div class="bg-white border-4 border-[#0A0910] rounded-xl rounded-tl-none p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(84,45,10,1)]">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div class="flex items-center gap-4">
                            <div class="w-16 h-16 bg-[#D4A373] border-4 border-[#0A0910] rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <span class="text-white text-3xl">☕</span>
                            </div>
                            <div>
                                <h1 class="text-2xl font-black text-[#542D0A] uppercase tracking-tighter italic">Saved Brews</h1>
                                <p class="text-gray-500 font-bold text-xs uppercase tracking-widest">{{ favorites.length }} Professional Guides Collected</p>
                            </div>
                        </div>

                        <div class="flex items-center gap-3">
                            <button
                                v-if="favorites.length > 0"
                                @click="showClearConfirm = true"
                                class="px-6 py-3 bg-white hover:bg-red-50 text-red-500 rounded-xl text-xs font-black border-4 border-[#0A0910] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all uppercase tracking-widest"
                            >
                                🗑️ Wipe Memory
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="favorites.length > 0" class="mb-8">
                <div class="bg-white border-4 border-[#0A0910] rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(212,163,115,0.2)]">
                    <div class="flex flex-col lg:flex-row gap-4">
                        <div class="flex-1 relative">
                            <input
                                v-model="searchQuery"
                                placeholder="Search by brew name, beans or notes..."
                                class="w-full p-4 border-4 border-[#0A0910] rounded-xl text-sm font-bold focus:outline-none focus:ring-8 focus:ring-[#D4A373]/20 transition-all"
                            />
                            <span class="absolute right-4 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
                        </div>

                        <div class="lg:w-56">
                            <select v-model="selectedCuisine" class="w-full p-4 border-4 border-[#0A0910] rounded-xl text-sm font-black uppercase tracking-tight appearance-none bg-white focus:outline-none">
                                <option value="">All Methods</option>
                                <option v-for="cuisine in availableCuisines" :key="cuisine" :value="cuisine">
                                    {{ cuisine }}
                                </option>
                            </select>
                        </div>

                        <div class="lg:w-56">
                            <select v-model="sortBy" class="w-full p-4 border-4 border-[#0A0910] rounded-xl text-sm font-black uppercase tracking-tight appearance-none bg-white focus:outline-none">
                                <option value="date-desc">Newest First</option>
                                <option value="date-asc">Oldest First</option>
                                <option value="name-asc">Name A-Z</option>
                                <option value="name-desc">Name Z-A</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="filteredFavorites.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div
                    v-for="favorite in filteredFavorites"
                    :key="favorite.id"
                    class="bg-white border-4 border-[#0A0910] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                    <div class="bg-[#FDF8F3] border-b-4 border-[#0A0910] p-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="text-[#D4A373] text-lg">✦</span>
                                <span class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Logged on {{ formatDate(favorite.favoriteDate) }}</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <button @click="editNotes(favorite)" class="w-8 h-8 flex items-center justify-center bg-white border-2 border-black rounded-lg hover:bg-blue-50 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none" title="Edit Barista Notes">📝</button>
                                <button @click="confirmRemoveFavorite(favorite.recipe.id)" class="w-8 h-8 flex items-center justify-center bg-white border-2 border-black rounded-lg hover:bg-red-50 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none" title="Remove Brew">🗑️</button>
                            </div>
                        </div>

                        <div v-if="favorite.notes" class="mt-3 p-3 bg-white border-2 border-[#D4A373]/30 rounded-xl italic shadow-inner">
                            <div class="text-[8px] font-black text-[#D4A373] mb-1 uppercase tracking-widest">Personal Notes:</div>
                            <div class="text-xs font-bold text-[#542D0A]">{{ favorite.notes }}</div>
                        </div>
                    </div>

                    <div class="p-1">
                        <RecipeCard :recipe="favorite.recipe" :showFavoriteButton="false" />
                    </div>
                </div>
            </div>

            <div v-else-if="favorites.length === 0" class="text-center py-20 animate-fade-in">
                <div class="bg-white border-4 border-[#0A0910] rounded-3xl p-12 shadow-xl inline-block max-w-lg">
                    <div class="text-8xl mb-8 grayscale opacity-20">☕</div>
                    <h3 class="text-3xl font-black text-[#542D0A] mb-4 uppercase tracking-tighter italic">Laboratory Empty</h3>
                    <p class="text-gray-500 font-bold mb-8 italic">"Your private collection is currently void of formulas. Start brewing to build your legacy."</p>
                    <router-link
                        to="/"
                        class="inline-flex items-center gap-4 px-10 py-5 bg-[#542D0A] hover:bg-black text-white rounded-2xl font-black text-lg border-4 border-[#0A0910] transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 uppercase tracking-widest"
                    >
                        <span>✨</span>
                        <span>Generate First Brew</span>
                    </router-link>
                </div>
            </div>

            <div v-else class="text-center py-20 grayscale">
                <div class="bg-white border-4 border-[#0A0910] rounded-3xl p-12 shadow-xl inline-block">
                    <div class="text-6xl mb-6">🔍</div>
                    <h3 class="text-2xl font-black text-gray-400 mb-4 uppercase tracking-tighter italic">No Matches Found</h3>
                    <p class="text-gray-400 font-bold mb-8">Try adjusting your lab search parameters</p>
                    <button
                        @click="clearFilters"
                        class="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-[#0A0910] rounded-xl font-black border-4 border-[#0A0910] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none uppercase tracking-widest text-xs"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>
        </div>

        <NotesModal v-if="editingFavorite" :favorite="editingFavorite" @close="editingFavorite = null" @save="saveNotes" />

        <ConfirmModal
            v-if="showClearConfirm"
            title="Wipe Entire Library?"
            message="Are you sure you want to delete all saved brewing formulas? This protocol cannot be undone."
            @confirm="clearAllFavorites"
            @cancel="showClearConfirm = false"
        />

        <ConfirmModal 
            v-if="removingRecipeId" 
            title="Discard Formula?" 
            message="Do you want to permanently remove this brewing guide from your collection?" 
            @confirm="removeFavorite" 
            @cancel="removingRecipeId = null" 
        />

        <GlobalFooter />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { FavoriteRecipe } from '@/types'
import { FavoriteService } from '@/services/favoriteService'
import RecipeCard from '@/components/RecipeCard.vue'
import GlobalNavigation from '@/components/GlobalNavigation.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'

import NotesModal from '@/components/NotesModal.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

// 响应式数据
const favorites = ref<FavoriteRecipe[]>([])
const searchQuery = ref('')
const selectedCuisine = ref('')
const sortBy = ref('date-desc')

const editingFavorite = ref<FavoriteRecipe | null>(null)
const showClearConfirm = ref(false)

// 可用冲煮方法列表
const availableCuisines = computed(() => {
    const cuisines = new Set(favorites.value.map(fav => fav.recipe.cuisine))
    return Array.from(cuisines).sort()
})

// 筛选后的列表
const filteredFavorites = computed(() => {
    let filtered = [...favorites.value]

    if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(
            fav =>
                fav.recipe.name.toLowerCase().includes(query) ||
                fav.recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query)) ||
                (fav.notes && fav.notes.toLowerCase().includes(query))
        )
    }

    if (selectedCuisine.value) {
        filtered = filtered.filter(fav => fav.recipe.cuisine === selectedCuisine.value)
    }

    filtered.sort((a, b) => {
        switch (sortBy.value) {
            case 'date-desc':
                return new Date(b.favoriteDate).getTime() - new Date(a.favoriteDate).getTime()
            case 'date-asc':
                return new Date(a.favoriteDate).getTime() - new Date(b.favoriteDate).getTime()
            case 'name-asc':
                return a.recipe.name.localeCompare(b.recipe.name)
            case 'name-desc':
                return b.recipe.name.localeCompare(a.recipe.name)
            default:
                return 0
        }
    })

    return filtered
})

// 格式化日期
const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

const refreshFavorites = () => {
    favorites.value = FavoriteService.getFavorites()
}

const editNotes = (favorite: FavoriteRecipe) => {
    editingFavorite.value = favorite
}

const saveNotes = (notes: string) => {
    if (editingFavorite.value) {
        const success = FavoriteService.updateFavoriteNotes(editingFavorite.value.recipe.id, notes)
        if (success) {
            refreshFavorites()
        }
    }
    editingFavorite.value = null
}

const removingRecipeId = ref<string | null>(null)
const confirmRemoveFavorite = (recipeId: string) => {
    removingRecipeId.value = recipeId
}

const removeFavorite = () => {
    if (!removingRecipeId.value) return
    const success = FavoriteService.removeFavorite(removingRecipeId.value)
    if (success) refreshFavorites()
    removingRecipeId.value = null
}

const clearAllFavorites = () => {
    const success = FavoriteService.clearAllFavorites()
    if (success) refreshFavorites()
    showClearConfirm.value = false
}

const clearFilters = () => {
    searchQuery.value = ''
    selectedCuisine.value = ''
    sortBy.value = 'date-desc'
}

onMounted(() => {
    refreshFavorites()
})
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.8s ease-out forwards;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>