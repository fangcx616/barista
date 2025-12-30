<template>
    <div class="fortune-card mx-auto max-w-5xl bg-white border-4 border-[#0A0910] rounded-2xl overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div class="bg-[#542D0A] text-white p-6 md:p-8 border-b-4 border-[#0A0910]">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 class="text-4xl font-black mb-3 tracking-tighter uppercase">{{ fortune.dishName }}</h2>
                    <div class="flex flex-wrap items-center gap-4 text-[10px] font-black tracking-widest uppercase">
                        <span class="flex items-center gap-1 bg-white/10 px-2 py-1 rounded border border-white/20">
                            <span>🧿</span>
                            <span>{{ getFortuneTypeName(fortune.type) }}</span>
                        </span>
                        <span class="flex items-center gap-1 bg-white/10 px-2 py-1 rounded border border-white/20">
                            <span>⏱️</span>
                            <span>{{ fortune.cookingTime }} MIN BREW</span>
                        </span>
                        <span :class="['px-2 py-1 rounded border uppercase font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]', getDifficultyStyle(fortune.difficulty)]">
                            {{ getDifficultyName(fortune.difficulty) }}
                        </span>
                    </div>
                </div>

                <div class="bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm min-w-[180px]">
                    <div class="text-[8px] font-black text-white/60 uppercase tracking-[0.2em] mb-1">Oracle Score</div>
                    <div class="flex items-center gap-1">
                        <div class="flex gap-0.5">
                            <span v-for="i in 10" :key="i" class="text-sm" :class="i <= fortune.luckyIndex ? 'text-[#D4A373]' : 'text-white/20'">✦</span>
                        </div>
                        <span class="ml-2 text-2xl font-black text-[#D4A373]">{{ fortune.luckyIndex }}/10</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-6 md:p-10 space-y-8">
            <div class="flex flex-col gap-6">
                <div class="p-6 bg-[#FDF8F3] rounded-xl border-2 border-[#0A0910] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <h3 class="font-black text-[#542D0A] mb-3 flex items-center gap-2 uppercase text-xs tracking-widest">
                        <span>🌌</span> Celestial Alignment
                    </h3>
                    <p class="text-base md:text-lg text-gray-700 font-bold leading-relaxed italic">"{{ fortune.reason }}"</p>
                </div>

                <div class="p-6 md:p-8 bg-[#F8F5F2] rounded-xl border-2 border-[#0A0910] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <h3 class="font-black text-[#542D0A] mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
                        <span>✨</span> Mystical Analysis
                    </h3>
                    <p class="text-sm md:text-base text-gray-600 font-medium leading-relaxed whitespace-pre-line">
                        {{ fortune.description }}
                    </p>
                </div>
            </div>

            <div v-if="fortune.ingredients && fortune.ingredients.length > 0">
                <h3 class="font-black text-sm text-[#542D0A] mb-5 flex items-center gap-2 uppercase tracking-[0.2em]">
                    <span>🫘</span> Spirit Components
                </h3>
                <div class="flex flex-wrap gap-3">
                    <div v-for="(ingredient, index) in fortune.ingredients" :key="index" class="flex items-center gap-2 px-5 py-3 bg-white border-2 border-[#0A0910] rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1">
                        <span class="w-2 h-2 bg-[#D4A373] rounded-full"></span>
                        <span class="text-xs font-black text-[#542D0A] uppercase tracking-wider">{{ ingredient }}</span>
                    </div>
                </div>
            </div>

            <div v-if="fortune.steps && fortune.steps.length > 0">
                <h3 class="font-black text-sm text-[#542D0A] mb-5 flex items-center gap-2 uppercase tracking-[0.2em]">
                    <span>⚖️</span> Sacred Ritual Steps
                </h3>
                <div class="grid grid-cols-1 gap-4">
                    <div v-for="(step, index) in fortune.steps" :key="index" class="flex gap-5 p-5 bg-[#FDFBF9] border-2 border-[#0A0910] rounded-xl transition-all hover:bg-white hover:translate-x-2">
                        <div class="flex-shrink-0">
                            <div class="w-10 h-10 bg-[#542D0A] text-white rounded-full flex items-center justify-center font-black text-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                {{ index + 1 }}
                            </div>
                        </div>
                        <div class="flex-1 flex items-center">
                            <p class="text-sm md:text-base font-bold text-[#542D0A] leading-relaxed">{{ step }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="fortune.tips && fortune.tips.length > 0">
                <h3 class="font-black text-sm text-[#542D0A] mb-5 flex items-center gap-2 uppercase tracking-[0.2em]">
                    <span>💡</span> Oracle's Guidance
                </h3>
                <div class="grid md:grid-cols-2 gap-4">
                    <div v-for="(tip, index) in fortune.tips" :key="index" class="flex items-start gap-4 p-5 bg-white border-2 border-[#D4A373] rounded-xl shadow-[4px_4px_0px_0px_#D4A373]">
                        <span class="text-[#D4A373] text-xl">✦</span>
                        <span class="text-xs md:text-sm font-bold text-gray-700 leading-snug">{{ tip }}</span>
                    </div>
                </div>
            </div>

            <div class="relative p-10 bg-[#0A0910] text-white rounded-2xl text-center overflow-hidden border-4 border-[#542D0A]">
                <div class="absolute -right-6 -bottom-6 opacity-20 text-8xl rotate-12 select-none">☕</div>
                
                <h3 class="relative z-10 font-black text-[12px] text-[#D4A373] uppercase tracking-[0.5em] mb-6 italic">
                    — The Barista's Prophecy —
                </h3>
                <p class="relative z-10 text-xl md:text-2xl font-black italic tracking-tight text-white leading-relaxed max-w-3xl mx-auto">
                    "{{ fortune.mysticalMessage }}"
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FortuneResult, FortuneType } from '@/types'

interface Props {
    fortune: FortuneResult
}

defineProps<Props>()

const getFortuneTypeName = (type: FortuneType): string => {
    const typeNames = {
        daily: 'Daily Brew Reading',
        mood: 'Caffeine Aura',
        couple: 'Harmony Pairing',
        number: 'Extraction Seed'
    }
    return typeNames[type] || 'Mystical Reading'
}

const getDifficultyStyle = (difficulty: 'easy' | 'medium' | 'hard'): string => {
    const styles = {
        easy: 'bg-[#ECFDF5] text-[#065F46] border-[#065F46]',
        medium: 'bg-[#FFFBEB] text-[#92400E] border-[#92400E]',
        hard: 'bg-[#FEF2F2] text-[#991B1B] border-[#991B1B]'
    }
    return styles[difficulty] || styles.medium
}

const getDifficultyName = (difficulty: 'easy' | 'medium' | 'hard'): string => {
    const names = {
        easy: 'Novice Barista',
        medium: 'Expert Barista',
        hard: 'Master Roaster'
    }
    return names[difficulty] || 'Expert'
}
</script>

<style scoped>
.fortune-card {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fortune-card:hover {
    transform: translateY(-6px);
    /* 已修复：使用标准 CSS 语法，不再引起 Vite/PostCSS 报错 */
    box-shadow: 16px 16px 0px 0px rgba(0,0,0,1);
}

@media (max-width: 768px) {
    .fortune-card {
        border-width: 2px;
        box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
    }
}
</style>