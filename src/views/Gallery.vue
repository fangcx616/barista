<template>
    <div class="min-h-screen bg-[#F8F5F2] px-2 md:px-4 py-6 font-sans text-[#0A0910]">
        <GlobalNavigation />

        <div class="max-w-7xl mx-auto">
            <div class="mb-10 mt-8">
                <div class="bg-[#542D0A] text-white px-5 py-2 rounded-t-xl border-2 border-[#0A0910] border-b-0 inline-block">
                    <span class="font-black uppercase tracking-widest text-xs">Visual Archive</span>
                </div>
                <div class="bg-white border-4 border-[#0A0910] rounded-xl rounded-tl-none p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(84,45,10,1)] relative overflow-hidden">
                    <div class="absolute right-[-20px] top-[-20px] opacity-[0.03] rotate-12 pointer-events-none text-8xl font-black italic">ARTKOFF</div>
                    
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                        <div class="flex items-center gap-4">
                            <div class="w-16 h-16 bg-[#D4A373] border-4 border-[#0A0910] rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white text-3xl">
                                🖼️
                            </div>
                            <div>
                                <h1 class="text-3xl font-black text-[#542D0A] uppercase tracking-tighter italic">Brew Portfolio</h1>
                                <p class="text-gray-500 font-bold text-xs uppercase tracking-widest">{{ images.length }} High-Fidelity Visuals Rendered</p>
                            </div>
                        </div>

                        <div class="flex items-center gap-2">
                            <button
                                v-if="images.length > 0"
                                @click="showClearConfirm = true"
                                class="px-6 py-3 bg-white hover:bg-red-50 text-red-500 rounded-xl text-xs font-black border-4 border-[#0A0910] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all uppercase tracking-widest"
                            >
                                🗑️ Purge Gallery
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="images.length > 0" class="mb-8">
                <div class="bg-white border-4 border-[#0A0910] rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(212,163,115,0.2)]">
                    <div class="flex flex-col lg:flex-row gap-4">
                        <div class="flex-1 relative">
                            <input
                                v-model="searchQuery"
                                placeholder="Search by brew name, beans or tags..."
                                class="w-full p-4 border-4 border-[#0A0910] rounded-xl text-sm font-bold focus:outline-none focus:ring-8 focus:ring-[#D4A373]/20 transition-all"
                            />
                            <span class="absolute right-4 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
                        </div>

                        <div class="lg:w-56">
                            <select v-model="selectedCuisine" class="w-full p-4 border-4 border-[#0A0910] rounded-xl text-sm font-black uppercase tracking-tight appearance-none bg-white focus:outline-none cursor-pointer">
                                <option value="">All Methods</option>
                                <option v-for="cuisine in availableCuisines" :key="cuisine" :value="cuisine">
                                    {{ cuisine }}
                                </option>
                            </select>
                        </div>

                        <div class="lg:w-56">
                            <select v-model="sortBy" class="w-full p-4 border-4 border-[#0A0910] rounded-xl text-sm font-black uppercase tracking-tight appearance-none bg-white focus:outline-none cursor-pointer">
                                <option value="date-desc">Newest First</option>
                                <option value="date-asc">Oldest First</option>
                                <option value="name-asc">Name A-Z</option>
                                <option value="name-desc">Name Z-A</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="filteredImages.length > 0" class="animate-fade-in">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div
                        v-for="image in filteredImages"
                        :key="image.id"
                        class="bg-white border-4 border-[#0A0910] rounded-2xl overflow-hidden hover:shadow-[12px_12px_0px_0px_rgba(212,163,115,0.4)] transition-all duration-300 group"
                    >
                        <div class="relative aspect-square overflow-hidden cursor-pointer bg-[#FDFBF9]" @click="openImageModal(image)">
                            <img
                                :src="image.url"
                                :alt="image.recipeName"
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                @error="handleImageError(image.id)"
                            />

                            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                                <div class="flex justify-end gap-3 pointer-events-auto">
                                    <button
                                        @click.stop="downloadImage(image)"
                                        class="w-10 h-10 bg-white hover:bg-[#D4A373] text-black rounded-lg border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all"
                                    >
                                        🔍
                                    </button>
                                    <button
                                        @click.stop="confirmDeleteImage(image.id)"
                                        class="w-10 h-10 bg-white hover:bg-red-500 hover:text-white text-black rounded-lg border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all"
                                    >
                                        🗑️
                                    </button>
                                </div>
                                <div class="pointer-events-none">
                                    <span class="inline-block bg-[#D4A373] text-black text-[8px] font-black px-2 py-0.5 mb-2 uppercase rounded border border-black">
                                        {{ image.cuisine }}
                                    </span>
                                    <h3 class="font-black text-white text-xl uppercase tracking-tighter italic leading-tight">{{ image.recipeName }}</h3>
                                </div>
                            </div>
                        </div>

                        <div class="p-5 border-t-4 border-[#0A0910]">
                            <div class="flex items-center justify-between mb-4">
                                <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">{{ formatDate(image.generatedAt) }}</span>
                                <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            </div>
                            <div class="flex flex-wrap gap-1.5">
                                <span
                                    v-for="ingredient in image.ingredients.slice(0, 3)"
                                    :key="ingredient"
                                    class="bg-gray-50 text-[9px] font-bold text-gray-500 px-2 py-1 rounded border border-gray-200 uppercase tracking-tight"
                                >
                                    {{ ingredient }}
                                </span>
                                <span v-if="image.ingredients.length > 3" class="text-[9px] font-black text-[#D4A373] mt-1 ml-1 uppercase">
                                    +{{ image.ingredients.length - 3 }} More
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else-if="images.length > 0" class="text-center py-24 grayscale">
                <div class="bg-white border-4 border-[#0A0910] rounded-3xl p-12 shadow-xl inline-block">
                    <div class="text-6xl mb-6">🔍</div>
                    <h3 class="text-2xl font-black text-gray-400 mb-4 uppercase tracking-tighter italic">No Matches Found</h3>
                    <button @click="searchQuery = ''; selectedCuisine = ''" class="px-8 py-4 bg-gray-100 text-[#0A0910] rounded-xl font-black border-4 border-[#0A0910] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none uppercase tracking-widest text-xs">
                        Reset Filters
                    </button>
                </div>
            </div>

            <div v-else class="text-center py-24 animate-fade-in">
                <div class="bg-white border-4 border-[#0A0910] rounded-3xl p-12 shadow-xl inline-block max-w-lg">
                    <div class="text-8xl mb-8 grayscale opacity-20">🎞️</div>
                    <h3 class="text-3xl font-black text-[#542D0A] mb-4 uppercase tracking-tighter italic">Portfolio Empty</h3>
                    <p class="text-gray-500 font-bold mb-10 italic">"No AI-generated brewing visuals captured yet. Bring your formulas to life in the lab."</p>
                    <router-link
                        to="/"
                        class="inline-flex items-center gap-4 px-10 py-5 bg-[#542D0A] hover:bg-black text-white rounded-2xl font-black text-lg border-4 border-[#0A0910] transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 uppercase tracking-widest"
                    >
                        <span>✨</span>
                        <span>Start Brewing</span>
                    </router-link>
                </div>
            </div>
        </div>

        <ImageModal v-if="selectedImage" :image="selectedImage" @close="selectedImage = null" />
        <ConfirmModal v-if="deletingImageId" title="Discard Visual?" message="Are you sure you want to permanently remove this image from your portfolio?" @confirm="deleteImage" @cancel="deletingImageId = null" />
        <ConfirmModal v-if="showClearConfirm" title="Purge Archive?" message="This protocol will delete every rendered visual in your laboratory gallery. Continue?" @confirm="clearAllImages" @cancel="showClearConfirm = false" />

        <GlobalFooter />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { GalleryService, type GalleryImage } from '@/services/galleryService'
import GlobalNavigation from '@/components/GlobalNavigation.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import ImageModal from '@/components/ImageModal.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

const images = ref<GalleryImage[]>([])
const searchQuery = ref('')
const selectedCuisine = ref('')
const sortBy = ref('date-desc')
const selectedImage = ref<GalleryImage | null>(null)
const deletingImageId = ref<string | null>(null)
const showClearConfirm = ref(false)

// 修复：此属性现在在模板的 select 元素中被循环使用
const availableCuisines = computed(() => {
    const cuisines = new Set(images.value.map(img => img.cuisine))
    return Array.from(cuisines).sort()
})

const filteredImages = computed(() => {
    let filtered = [...images.value]
    if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(img =>
            img.recipeName.toLowerCase().includes(query) ||
            img.cuisine.toLowerCase().includes(query) ||
            img.ingredients.some(ing => ing.toLowerCase().includes(query))
        )
    }
    if (selectedCuisine.value) {
        filtered = filtered.filter(img => img.cuisine === selectedCuisine.value)
    }
    filtered.sort((a, b) => {
        if (sortBy.value === 'date-desc') return new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()
        if (sortBy.value === 'date-asc') return new Date(a.generatedAt).getTime() - new Date(b.generatedAt).getTime()
        if (sortBy.value === 'name-asc') return a.recipeName.localeCompare(b.recipeName)
        if (sortBy.value === 'name-desc') return b.recipeName.localeCompare(a.recipeName)
        return 0
    })
    return filtered
})

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}

const refreshGallery = () => {
    images.value = GalleryService.getGalleryImages()
}

const openImageModal = (image: GalleryImage) => {
    selectedImage.value = image
}

const confirmDeleteImage = (imageId: string) => {
    deletingImageId.value = imageId
}

const deleteImage = () => {
    if (!deletingImageId.value) return
    if (GalleryService.removeFromGallery(deletingImageId.value)) {
        refreshGallery()
    }
    deletingImageId.value = null
}

const clearAllImages = () => {
    if (GalleryService.clearGallery()) {
        refreshGallery()
    }
    showClearConfirm.value = false
}

const downloadImage = (image: GalleryImage) => {
    window.open(image.url, '_blank')
}

const handleImageError = (imageId: string) => {
    console.warn(`Asset load failed: ${imageId}`)
}

onMounted(() => {
    refreshGallery()
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