<template>
    <div class="cooking-loader flex flex-col items-center justify-center p-10 border-4 border-[#0A0910] shadow-[12px_12px_0px_0px_rgba(84,45,10,1)] bg-white rounded-xl">
        <div class="relative mb-10">
            <div class="brewing-icon text-8xl filter drop-shadow-lg">☕</div>
            <div class="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1">
                <span class="steam-wave opacity-60 text-2xl">💨</span>
                <span class="steam-wave opacity-40 text-xl" style="animation-delay: 0.5s">💨</span>
            </div>
            <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#542D0A] text-white px-3 py-1 rounded text-[10px] font-black tracking-widest border-2 border-black animate-pulse uppercase">
                Artkoff System Active
            </div>
        </div>

        <div class="text-center h-16 flex flex-col items-center justify-center mb-6">
            <Transition name="slide-up" mode="out-in">
                <h3 :key="currentText" class="text-xl md:text-2xl font-black text-[#542D0A] uppercase tracking-tighter italic">
                    {{ currentText }}
                </h3>
            </Transition>
            
            <div class="flex items-center gap-1.5 mt-3">
                <div v-for="i in 3" :key="i" class="w-3 h-3 bg-[#D4A373] rounded-full animate-bounce" :style="{ animationDelay: `${i * 0.15}s` }"></div>
            </div>
        </div>

        <div class="w-80 bg-gray-100 rounded-none border-4 border-[#0A0910] h-6 overflow-hidden p-1 shadow-inner relative">
            <div 
                class="bg-[#542D0A] h-full transition-all duration-1000 ease-out flex items-center justify-end px-2" 
                :style="{ width: `${progress}%` }"
            >
                <span v-if="progress > 30" class="text-[8px] text-white font-bold tracking-widest uppercase">Brewing...</span>
            </div>
        </div>
        
        <div class="mt-3 text-xs font-black text-[#542D0A]/40 uppercase tracking-[0.2em]">
            Processing Recipe: {{ Math.round(progress) }}%
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 通用咖啡冲煮阶段 (适用于任何设备)
 */
const brewingTexts = [
    'Analyzing coffee bean profile...',
    'Calculating optimal grind size...',
    'Preparing brewing equipment...',
    'Calibrating water temperature...',
    'Initiating extraction process...',
    'Capturing aromatic compounds...',
    'Balancing flavor complexity...',
    'Finalizing your masterpiece...'
]

const currentText = ref(brewingTexts[0])
const progress = ref(0)
let textInterval: NodeJS.Timeout | null = null
let progressInterval: NodeJS.Timeout | null = null

onMounted(() => {
    let textIndex = 0
    let currentProgress = 0

    textInterval = setInterval(() => {
        textIndex = (textIndex + 1) % brewingTexts.length
        currentText.value = brewingTexts[textIndex]
    }, 2500)

    progressInterval = setInterval(() => {
        if (currentProgress < 99) {
            const jump = Math.random() * 8 + 2
            currentProgress += jump
            progress.value = Math.min(currentProgress, 99)
        }
    }, 1200)
})

onUnmounted(() => {
    if (textInterval) clearInterval(textInterval)
    if (progressInterval) clearInterval(progressInterval)
})
</script>

<style scoped>
@keyframes vibrate {
    0% { transform: translate(0,0); }
    20% { transform: translate(1px, -1px); }
    40% { transform: translate(-1px, 1px); }
    100% { transform: translate(0,0); }
}
.brewing-icon {
    display: inline-block;
    animation: vibrate 0.3s infinite linear;
}

@keyframes steamUp {
    0% { transform: translateY(0) scale(1); opacity: 0; }
    50% { opacity: 0.6; }
    100% { transform: translateY(-40px) scale(2); opacity: 0; }
}
.steam-wave {
    display: inline-block;
    animation: steamUp 2s infinite ease-out;
}

.slide-up-enter-active, .slide-up-leave-active {
    transition: all 0.4s ease;
}
.slide-up-enter-from { opacity: 0; transform: translateY(15px); }
.slide-up-leave-to { opacity: 0; transform: translateY(-15px); }
</style>