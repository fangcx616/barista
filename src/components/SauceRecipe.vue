<template>
    <div v-if="sauce" class="bg-white rounded-2xl border-4 border-[#0A0910] overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-fade-in">
        <div class="bg-[#542D0A] text-white p-6 md:p-8 border-b-4 border-[#0A0910]">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div class="inline-block bg-[#D4A373] text-black text-[10px] font-black px-2 py-0.5 mb-3 uppercase tracking-widest rounded border border-black">
                        {{ getCategoryName(sauce.category) }}
                    </div>
                    <h2 class="text-3xl md:text-4xl font-black mb-4 uppercase tracking-tighter italic leading-none">{{ sauce.name }}</h2>
                    <div class="flex flex-wrap items-center gap-4 text-[10px] font-black tracking-[0.2em] uppercase">
                        <span class="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-full border border-white/10">
                            <span>⏱️</span>
                            <span>{{ sauce.makingTime || 15 }} MIN PROCESS</span>
                        </span>
                        <span :class="['px-3 py-1.5 rounded-full border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]', getDifficultyStyle(sauce.difficulty)]">
                            {{ getDifficultyName(sauce.difficulty) }}
                        </span>
                    </div>
                </div>
                
                <div class="hidden lg:block opacity-10">
                    <span class="text-7xl font-black italic">ARTKOFF-LAB</span>
                </div>
            </div>

            <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="bg-white/5 border border-white/20 p-4 rounded-xl text-center backdrop-blur-sm">
                    <div class="text-[8px] font-black text-white/50 mb-2 uppercase tracking-widest">🌸 Aroma Balance</div>
                    <div class="text-2xl font-black text-[#D4A373]">{{ sauce.aromaLevel || 0 }}<span class="text-[10px] text-white/30 ml-1">/5</span></div>
                </div>
                <div class="bg-white/5 border border-white/20 p-4 rounded-xl text-center backdrop-blur-sm">
                    <div class="text-[8px] font-black text-white/50 mb-2 uppercase tracking-widest">🍯 Sweetness</div>
                    <div class="text-2xl font-black text-yellow-400">{{ sauce.sweetLevel || 0 }}<span class="text-[10px] text-white/30 ml-1">/5</span></div>
                </div>
                <div class="bg-white/5 border border-white/20 p-4 rounded-xl text-center backdrop-blur-sm">
                    <div class="text-[8px] font-black text-white/50 mb-2 uppercase tracking-widest">💧 Viscosity</div>
                    <div class="text-2xl font-black text-blue-300">{{ sauce.viscosityLevel || 0 }}<span class="text-[10px] text-white/30 ml-1">/5</span></div>
                </div>
                <div class="bg-white/5 border border-white/20 p-4 rounded-xl text-center backdrop-blur-sm">
                    <div class="text-[8px] font-black text-white/50 mb-2 uppercase tracking-widest">🍋 Brightness</div>
                    <div class="text-2xl font-black text-green-400">{{ sauce.sourLevel || 0 }}<span class="text-[10px] text-white/30 ml-1">/5</span></div>
                </div>
            </div>
        </div>

        <div class="p-6 md:p-10 space-y-10">
            <div v-if="sauce.description" class="p-6 bg-[#FDF8F3] rounded-2xl border-2 border-[#0A0910] shadow-[6px_6px_0px_0px_rgba(212,163,115,1)]">
                <h3 class="font-black text-[#542D0A] mb-3 flex items-center gap-2 uppercase text-xs tracking-widest">
                    <span>📝</span> Flavor Profile Notes
                </h3>
                <p class="text-sm text-gray-700 font-bold leading-relaxed italic">"{{ sauce.description }}"</p>
            </div>

            <div v-if="sauce.ingredients && sauce.ingredients.length > 0">
                <h3 class="font-black text-sm text-[#542D0A] mb-6 flex items-center gap-2 uppercase tracking-[0.3em]">
                    <span>🧪</span> Formulation Components
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div v-for="(ingredient, index) in sauce.ingredients" :key="index" class="flex items-center gap-3 p-4 bg-white border-2 border-[#0A0910] rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
                        <span class="w-2 h-2 bg-[#D4A373] rounded-full"></span>
                        <span class="text-sm font-black text-[#542D0A] uppercase tracking-tight">{{ ingredient }}</span>
                    </div>
                </div>
            </div>

            <div v-if="sauce.steps && sauce.steps.length > 0">
                <h3 class="font-black text-sm text-[#542D0A] mb-6 flex items-center gap-2 uppercase tracking-[0.3em]">
                    <span>⚖️</span> Synthesis Process
                </h3>
                <div class="space-y-4">
                    <div v-for="step in sauce.steps" :key="step.step" class="flex gap-6 p-6 bg-[#FDFBF9] border-2 border-[#0A0910] rounded-2xl relative overflow-hidden group hover:bg-white transition-colors">
                        <div class="flex-shrink-0 relative z-10">
                            <div class="w-10 h-10 bg-[#0A0910] text-white rounded-lg flex items-center justify-center font-black text-sm shadow-[3px_3px_0px_0px_rgba(212,163,115,1)] group-hover:scale-110 transition-transform">
                                {{ step.step }}
                            </div>
                        </div>
                        <div class="flex-1 relative z-10">
                            <p class="text-md font-bold text-[#542D0A] mb-4 leading-relaxed">
                                {{ typeof step.description === 'string' ? step.description : 'Formulation data pending...' }}
                            </p>
                            <div class="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                <span v-if="step.time" class="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded">
                                    <span>⏱️</span> {{ step.time }} MIN
                                </span>
                                <span v-if="step.temperature" class="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded">
                                    <span>🔥</span> {{ step.temperature }}
                                </span>
                                <span v-if="step.technique" class="flex items-center gap-1.5 bg-[#D4A373]/10 text-[#542D0A] px-2 py-1 rounded border border-[#D4A373]/20">
                                    <span>⚙️</span> {{ step.technique }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-8">
                <div v-if="sauce.tips && sauce.tips.length > 0">
                    <h3 class="font-black text-sm text-[#542D0A] mb-4 flex items-center gap-2 uppercase tracking-[0.2em]">
                        <span>💡</span> Lab Techniques
                    </h3>
                    <div class="space-y-3">
                        <div v-for="(tip, index) in sauce.tips" :key="index" class="flex items-start gap-3 p-4 bg-yellow-50/50 border-2 border-yellow-200 rounded-xl">
                            <span class="text-yellow-600 text-lg">✦</span>
                            <span class="text-xs font-bold text-gray-700 leading-tight">{{ tip }}</span>
                        </div>
                    </div>
                </div>

                <div v-if="sauce.storage">
                    <h3 class="font-black text-sm text-[#542D0A] mb-4 flex items-center gap-2 uppercase tracking-[0.2em]">
                        <span>📦</span> Preservation Protocol
                    </h3>
                    <div class="p-6 bg-[#0A0910] text-white rounded-2xl border-4 border-[#542D0A] shadow-lg">
                        <div class="space-y-4">
                            <div class="flex items-center justify-between border-b border-white/10 pb-3">
                                <span class="text-[9px] font-black text-white/40 uppercase">Method</span>
                                <span class="text-xs font-black tracking-tight">{{ sauce.storage.method || 'Airtight' }}</span>
                            </div>
                            <div class="flex items-center justify-between border-b border-white/10 pb-3">
                                <span class="text-[9px] font-black text-white/40 uppercase">Shelf Life</span>
                                <span class="text-xs font-black tracking-tight text-[#D4A373]">{{ sauce.storage.duration || '14 Days' }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-[9px] font-black text-white/40 uppercase">Temp</span>
                                <span class="text-xs font-black tracking-tight">{{ sauce.storage.temperature || '38°F' }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="sauce.pairings && sauce.pairings.length > 0">
                <h3 class="font-black text-sm text-[#542D0A] mb-4 flex items-center gap-2 uppercase tracking-[0.2em]">
                    <span>☕</span> Optimal Brewing Pairings
                </h3>
                <div class="flex flex-wrap gap-2">
                    <span v-for="pairing in sauce.pairings" :key="pairing" class="px-4 py-2 bg-white border-2 border-[#0A0910] rounded-lg text-xs font-black text-[#542D0A] uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-default">
                        {{ pairing }}
                    </span>
                </div>
            </div>

            <div v-if="sauce.tags && sauce.tags.length > 0" class="pt-6 border-t-2 border-gray-100 flex flex-wrap gap-2 justify-center">
                <span v-for="tag in sauce.tags" :key="tag" class="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">
                    #{{ tag }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SauceRecipe } from '@/types';

/**
 * 辅助函数：根据分类 ID 获取显示名称
 */
const getCategoryName = (category: string) => {
    const map: Record<string, string> = {
        classic: 'Core Syrup',
        spiced: 'Botanical Infusion',
        fruity: 'Fruit Reduction',
        floral: 'Floral Essence',
        rich: 'Velvet Base',
        experimental: 'Lab Prototype'
    };
    return map[category] || 'Special Formulation';
};

/**
 * 辅助函数：获取难度名称
 */
const getDifficultyName = (diff: string) => {
    const map: Record<string, string> = {
        easy: 'Novice Tech',
        medium: 'Specialist',
        hard: 'Master Chemist'
    };
    return map[diff] || 'Specialist';
};

/**
 * 辅助函数：获取难度样式类
 */
const getDifficultyStyle = (diff: string) => {
    const map: Record<string, string> = {
        easy: 'bg-green-100 border-green-600 text-green-700',
        medium: 'bg-[#D4A373]/10 border-[#D4A373] text-[#542D0A]',
        hard: 'bg-red-100 border-red-600 text-red-700'
    };
    return map[diff] || 'bg-gray-100 border-gray-600 text-gray-700';
};

interface Props {
    sauce: SauceRecipe;
}

defineProps<Props>();
</script>

<style scoped>
/* 渐入动画 */
.animate-fade-in {
    animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

/* 兼容滑块样式（如果有的话） */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #542D0A;
    border-radius: 10px;
}
</style>