<template>
    <div class="wine-pairing-card bg-white border-2 border-[#0A0910] rounded-xl p-8 shadow-sm text-center">
        <div class="inline-block bg-[#D4A373] text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-[0.2em] mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            Perfect Pairing
        </div>

        <div class="max-w-xl mx-auto">
            <h3 class="text-2xl font-black text-[#542D0A] mb-3 uppercase tracking-tighter">
                {{ winePairing.name }}
            </h3>
            
            <p class="text-sm text-gray-600 font-bold italic leading-relaxed mb-8 px-4">
                "{{ winePairing.reason }}"
            </p>

            <div class="flex justify-center gap-6">
                <div class="flex flex-col items-center">
                    <span class="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Category</span>
                    <span class="text-[11px] font-black text-[#542D0A] border-b-2 border-[#D4A373]/30 uppercase">
                        {{ winePairing.type }}
                    </span>
                </div>
                <div class="w-px h-8 bg-gray-100"></div>
                <div class="flex flex-col items-center">
                    <span class="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Flavor Notes</span>
                    <span class="text-[11px] font-black text-[#542D0A] border-b-2 border-[#D4A373]/30 uppercase">
                        {{ winePairing.flavor }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { WinePairing } from '@/types'

defineProps<{
    winePairing: WinePairing
}>()
</script>

<style scoped>
.wine-pairing-card {
    transition: transform 0.2s ease;
}
.wine-pairing-card:hover {
    transform: translateY(-2px);
}
</style>