<template>
    <div class="nutrition-analysis bg-[#FDFBF9] border-2 border-[#0A0910] rounded-xl p-6 shadow-sm">
        <div class="flex flex-wrap gap-2 mb-6">
            <span v-for="tag in nutritionAnalysis.dietaryTags" :key="tag" class="px-3 py-1 bg-[#542D0A] text-white text-[10px] font-black rounded-full uppercase border-2 border-[#0A0910]">
                {{ tag }}
            </span>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-white border-2 border-[#0A0910] p-4 rounded-lg text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span class="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Caffeine</span>
                <span class="text-lg font-black text-[#542D0A]">{{ nutritionAnalysis.nutrition.caffeine || 120 }}<small class="text-[10px] ml-0.5">mg</small></span>
            </div>
            
            <div class="bg-white border-2 border-[#0A0910] p-4 rounded-lg text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span class="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Energy</span>
                <span class="text-lg font-black text-[#542D0A]">{{ nutritionAnalysis.nutrition.calories }}<small class="text-[10px] ml-0.5">kcal</small></span>
            </div>

            <div class="bg-white border-2 border-[#0A0910] p-4 rounded-lg text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span class="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Roast Level</span>
                <span class="text-xs font-black text-[#542D0A] uppercase">{{ nutritionAnalysis.nutrition.roastLevel || 'Medium' }}</span>
            </div>

            <div class="bg-white border-2 border-[#0A0910] p-4 rounded-lg text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span class="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Acidity</span>
                <span class="text-xs font-black text-[#542D0A] uppercase">{{ nutritionAnalysis.nutrition.acidity || 'Bright' }}</span>
            </div>

            <div class="bg-white border-2 border-[#0A0910] p-4 rounded-lg text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span class="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Body</span>
                <span class="text-xs font-black text-[#542D0A] uppercase">{{ nutritionAnalysis.nutrition.body || 'Silky' }}</span>
            </div>

            <div class="bg-white border-2 border-[#0A0910] p-4 rounded-lg text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span class="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Serving</span>
                <span class="text-xs font-black text-[#542D0A] uppercase">{{ nutritionAnalysis.servingSize || '8 oz' }}</span>
            </div>
        </div>

        <div class="border-t-2 border-dashed border-gray-200 pt-5">
            <h5 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 italic">Barista's Tasting Notes</h5>
            <div class="space-y-2">
                <div v-for="advice in nutritionAnalysis.balanceAdvice" :key="advice" class="flex items-start gap-3 text-xs font-bold text-[#542D0A] leading-tight">
                    <div class="w-1.5 h-1.5 rounded-full bg-[#D4A373] mt-1 flex-shrink-0"></div>
                    {{ advice }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { NutritionAnalysis } from '@/types'

defineProps<{
    nutritionAnalysis: NutritionAnalysis
}>()
</script>