<template>
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-2 md:p-4" @click.self="$emit('close')">
        <div class="bg-white border-4 border-[#0A0910] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col scale-100">
            <div class="sticky top-0 z-20 bg-white border-b-4 border-black p-5 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <span class="text-2xl">📋</span>
                    <h3 class="text-xl font-black uppercase tracking-tighter italic text-[#542D0A]">Brewing Protocol</h3>
                </div>
                <button @click="$emit('close')" class="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full text-xl transition-all">✕</button>
            </div>
            
            <div class="p-4 md:p-8 overflow-y-auto bg-[#FDFBF9]">
                <RecipeCard :recipe="recipe" :showFavoriteButton="false" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Recipe } from '@/types'
import RecipeCard from './RecipeCard.vue'

defineProps<{ recipe: Recipe }>()
defineEmits<{ close: [] }>()
</script>