<template>
    <div class="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100] p-2 md:p-8" @click="$emit('close')">
        <div class="bg-white border-4 border-black rounded-3xl w-full max-w-5xl max-h-[95vh] overflow-hidden shadow-2xl flex flex-col" @click.stop>
            <div class="bg-[#542D0A] text-white p-6 border-b-4 border-black flex items-center justify-between">
                <div>
                    <h3 class="font-black text-2xl uppercase tracking-tighter italic leading-none mb-2">{{ image.recipeName }}</h3>
                    <p class="text-[#D4A373] text-[10px] font-black uppercase tracking-[0.2em] opacity-80">
                        {{ image.cuisine }} • RENDERED ON {{ formatDate(image.generatedAt) }}
                    </p>
                </div>
                <button @click="$emit('close')" class="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-2xl transition-all">×</button>
            </div>

            <div class="relative bg-[#0A0910] flex-1 flex items-center justify-center overflow-hidden">
                <img :src="image.url" :alt="image.recipeName" class="max-w-full max-h-full object-contain shadow-2xl" />
                <div class="absolute bottom-6 right-6 opacity-20 pointer-events-none">
                    <span class="text-white font-black italic tracking-widest text-xs uppercase">Artkoff AI Barista</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { GalleryImage } from '@/services/galleryService'

defineProps<{ image: GalleryImage }>()
defineEmits<{ close: [] }>()

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).toUpperCase()
}
</script>