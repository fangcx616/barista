<template>
    <div class="min-h-screen bg-[#F8F5F2] px-2 md:px-4 py-6 font-sans text-[#0A0910]">
        <GlobalNavigation />

        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-12 mt-8">
                <div class="inline-block relative">
                    <div class="w-24 h-24 bg-[#542D0A] border-4 border-[#0A0910] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-bounce-slow">
                        <span class="text-5xl">🧿</span>
                    </div>
                    <h1 class="text-4xl md:text-5xl font-black text-[#542D0A] mb-4 uppercase tracking-tighter">Coffee Oracle</h1>
                    <p class="text-gray-500 font-bold italic text-sm md:text-base">"Let the beans reveal your destiny, one extraction at a time."</p>
                </div>
            </div>

            <div class="mb-8">
                <div class="bg-[#542D0A] text-white px-5 py-2 rounded-t-xl border-2 border-[#0A0910] border-b-0 inline-block">
                    <span class="font-black uppercase tracking-widest text-xs">1. Choose Your Reading</span>
                </div>
                <div class="bg-white border-4 border-[#0A0910] rounded-xl rounded-tl-none p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(84,45,10,1)]">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <button
                            v-for="type in fortuneTypes"
                            :key="type.id"
                            @click="selectFortuneType(type.id)"
                            :class="[
                                'p-6 rounded-2xl border-4 border-[#0A0910] transition-all duration-300 flex flex-col items-center text-center group min-h-[160px] justify-center',
                                selectedType === type.id 
                                    ? 'bg-[#542D0A] text-white shadow-none translate-x-[4px] translate-y-[4px]' 
                                    : 'bg-[#FDFBF9] text-[#542D0A] hover:bg-[#F1E3D3] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]'
                            ]"
                        >
                            <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">{{ type.icon }}</div>
                            <div class="font-black text-lg mb-2 uppercase tracking-tight">{{ type.name }}</div>
                            <div class="text-[10px] font-bold opacity-70 tracking-widest leading-tight uppercase">{{ type.description }}</div>
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="selectedType" class="mb-8 animate-fade-in">
                <div class="bg-[#D4A373] text-white px-5 py-2 rounded-t-xl border-2 border-[#0A0910] border-b-0 inline-block">
                    <span class="font-black uppercase tracking-widest text-xs">2. Set the Aura</span>
                </div>
                <div class="bg-white border-4 border-[#0A0910] rounded-xl rounded-tl-none p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(212,163,115,1)]">
                    
                    <div v-if="selectedType === 'daily'" class="space-y-8">
                        <div>
                            <h3 class="text-xl font-black text-[#542D0A] mb-6 uppercase tracking-tighter flex items-center gap-2">
                                <span>✨</span> Select Your Star Sign
                            </h3>
                            <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                <button
                                    v-for="zodiac in zodiacConfigs"
                                    :key="zodiac.id"
                                    @click="dailyParams.zodiac = zodiac.id"
                                    :class="[
                                        'p-4 rounded-xl border-2 border-[#0A0910] transition-all duration-200 text-center uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]',
                                        dailyParams.zodiac === zodiac.id ? 'bg-[#542D0A] text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 font-bold'
                                    ]"
                                >
                                    <div class="text-2xl mb-1">{{ zodiac.symbol }}</div>
                                    <div class="text-[10px] font-black">{{ zodiac.name }}</div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div v-if="selectedType === 'mood'" class="space-y-10">
                        <div>
                            <h3 class="text-xl font-black text-[#542D0A] mb-6 uppercase tracking-tighter flex items-center gap-2">
                                <span>🎭</span> Current Vibration
                            </h3>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <button
                                    v-for="mood in moodConfigs"
                                    :key="mood.id"
                                    @click="toggleMood(mood.id)"
                                    :class="[
                                        'p-5 rounded-xl border-4 border-[#0A0910] transition-all duration-200 flex flex-col items-center',
                                        moodParams.moods.includes(mood.id) 
                                            ? 'bg-[#542D0A] text-white shadow-none translate-x-[2px] translate-y-[2px]' 
                                            : 'bg-white text-[#542D0A] font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                                    ]"
                                >
                                    <div class="text-3xl mb-2">{{ mood.emoji }}</div>
                                    <div class="text-[11px] uppercase tracking-widest">{{ mood.name }}</div>
                                </button>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-sm font-black text-[#542D0A] mb-4 uppercase tracking-[0.2em]">Intensity: {{ intensityLabels[moodParams.intensity - 1] }}</h3>
                            <input
                                v-model="moodParams.intensity"
                                type="range"
                                min="1"
                                max="5"
                                class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#542D0A]"
                            />
                        </div>
                    </div>

                    <div v-if="selectedType === 'number'" class="py-10 text-center">
                        <h3 class="text-xl font-black text-[#542D0A] mb-8 uppercase tracking-tighter">Input Your Lucky Digits</h3>
                        <div class="flex flex-col md:flex-row items-center justify-center gap-6">
                            <input
                                v-model="numberParams.number"
                                type="number"
                                min="1"
                                max="99"
                                class="w-32 h-20 text-4xl font-black text-center bg-[#FDFBF9] border-4 border-[#0A0910] rounded-2xl text-[#542D0A] focus:outline-none focus:ring-4 focus:ring-[#D4A373]/20"
                            />
                            <button
                                @click="generateRandomNumber"
                                class="px-8 py-4 bg-white text-[#542D0A] rounded-xl font-black uppercase tracking-widest hover:bg-gray-50 border-4 border-[#0A0910] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
                            >
                                🎲 Random Seed
                            </button>
                        </div>
                    </div>

                    <div class="mt-12 text-center pt-8 border-t-4 border-dashed border-gray-100">
                        <Transition name="fade-slide">
                            <div v-if="isLoading" class="mb-8 py-6">
                                <div class="flex flex-col items-center gap-4">
                                    <div class="w-6 h-6 bg-[#D4A373] rounded-full animate-ping opacity-75"></div>
                                    <h4 class="text-xl md:text-2xl font-black italic text-[#542D0A] uppercase tracking-tighter animate-mystic-pulse">
                                        {{ currentProcessingText }}
                                    </h4>
                                    <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Artkoff Oracle is Channeling</p>
                                </div>
                            </div>
                        </Transition>

                        <button
                            v-if="!isLoading"
                            @click="startFortune"
                            :disabled="!canStartFortune"
                            class="w-full max-w-md px-10 py-6 bg-[#542D0A] hover:bg-black disabled:bg-gray-200 text-white font-black text-xl rounded-2xl border-4 border-[#0A0910] transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] disabled:cursor-not-allowed uppercase tracking-[0.2em]"
                        >
                            <span class="flex items-center gap-4 justify-center">
                                <span>🧿</span>
                                <span>CONSULT ORACLE</span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="fortuneResult" class="mb-16 animate-fade-in" data-fortune-result>
                <div class="bg-[#0A0910] text-white px-6 py-3 rounded-t-xl border-2 border-[#0A0910] border-b-0 inline-block">
                    <span class="font-black uppercase tracking-widest text-xs">3. The Oracle's Decree</span>
                </div>
                <div class="bg-white border-4 border-[#0A0910] rounded-xl rounded-tl-none p-6 md:p-10 shadow-2xl relative overflow-hidden">
                    <div class="absolute right-[-50px] bottom-[-50px] opacity-[0.03] rotate-12 pointer-events-none">
                        <span class="text-[300px] font-black italic uppercase">Oracle</span>
                    </div>
                    <FortuneCard class="max-w-3xl mx-auto relative z-10" :fortune="fortuneResult" :show-actions="true" />
                </div>
            </div>
        </div>
        <GlobalFooter />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { generateDailyFortune, generateMoodCooking, generateNumberFortune } from '@/services/aiService'
import type { FortuneType, FortuneResult, DailyFortuneParams, MoodFortuneParams, NumberFortuneParams } from '@/types'
import { zodiacConfigs, moodConfigs } from '@/config/fortune'
import FortuneCard from '@/components/FortuneCard.vue'
import GlobalNavigation from '@/components/GlobalNavigation.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'

const fortuneTypes = [
    {
        id: 'daily' as FortuneType,
        name: 'Daily Brew Reading',
        icon: '✨',
        description: 'Sync your cup with the stars and planets.'
    },
    {
        id: 'mood' as FortuneType,
        name: 'Caffeine Aura',
        icon: '🎭',
        description: 'Match your vibration to the perfect roast.'
    },
    {
        id: 'number' as FortuneType,
        name: 'Extraction Seed',
        icon: '🎲',
        description: 'Let numerical extraction reveal destiny.'
    }
]

const oracleProcessingTexts = [
    'Reading the cosmic steam...',
    'Consulting planetary roast levels...',
    'Decoding the patterns in the crema...',
    'Aligning your vibration with the beans...',
    'Interpreting the sacred grind size...'
]

const currentProcessingText = ref(oracleProcessingTexts[0])
const selectedType = ref<FortuneType>('daily')
const isLoading = ref(false)
const fortuneResult = ref<FortuneResult | null>(null)
let oracleInterval: NodeJS.Timeout | null = null

const dailyParams = ref<DailyFortuneParams>({ zodiac: '', animal: 'none', date: new Date().toISOString().split('T')[0] })
const moodParams = ref<MoodFortuneParams>({ moods: [], intensity: 3 })
const numberParams = ref<NumberFortuneParams>({ number: 7, isRandom: false })
const intensityLabels = ['Low Vibe', 'Mellow', 'Balanced', 'High Voltage', 'Overdrive']

const canStartFortune = computed(() => {
    if (selectedType.value === 'daily') return dailyParams.value.zodiac !== ''
    if (selectedType.value === 'mood') return moodParams.value.moods.length > 0
    if (selectedType.value === 'number') return numberParams.value.number >= 1
    return false
})

const selectFortuneType = (type: FortuneType) => {
    selectedType.value = type
    fortuneResult.value = null
}

/**
 * 修复情绪多选 Bug
 * 将之前的多选逻辑改为单选逻辑：
 * 如果点击已选中的则取消，如果点击未选中的则直接覆盖原有选择。
 */
const toggleMood = (moodId: string) => {
    if (moodParams.value.moods.includes(moodId)) {
        moodParams.value.moods = []
    } else {
        moodParams.value.moods = [moodId]
    }
}

const generateRandomNumber = () => {
    numberParams.value.number = Math.floor(Math.random() * 99) + 1
    numberParams.value.isRandom = true
}

const startFortune = async () => {
    if (!selectedType.value || isLoading.value) return
    isLoading.value = true
    fortuneResult.value = null

    let textIndex = 0
    oracleInterval = setInterval(() => {
        textIndex = (textIndex + 1) % oracleProcessingTexts.length
        currentProcessingText.value = oracleProcessingTexts[textIndex]
    }, 1800)

    try {
        let result: FortuneResult
        if (selectedType.value === 'daily') result = await generateDailyFortune(dailyParams.value)
        else if (selectedType.value === 'mood') result = await generateMoodCooking(moodParams.value)
        else result = await generateNumberFortune(numberParams.value)

        // 模拟占卜过程的延迟
        await new Promise(resolve => setTimeout(resolve, 3500))
        fortuneResult.value = result

        setTimeout(() => {
            document.querySelector('[data-fortune-result]')?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
    } catch (error) {
        console.error('Oracle failure:', error)
    } finally {
        isLoading.value = false
        if (oracleInterval) clearInterval(oracleInterval)
    }
}

onUnmounted(() => { if (oracleInterval) clearInterval(oracleInterval) })
</script>

<style scoped>
.animate-bounce-slow { animation: bounce 4s infinite ease-in-out; }
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
.animate-fade-in { animation: fadeIn 0.8s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes mystic-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.98); } }
.animate-mystic-pulse { animation: mystic-pulse 2s infinite ease-in-out; }
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.5s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(10px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }
input[type=range]::-webkit-slider-thumb {
    appearance: none; height: 28px; width: 28px; border-radius: 8px;
    background: #542D0A; cursor: pointer; border: 3px solid #0A0910;
    box-shadow: 3px 3px 0px 0px rgba(0,0,0,1);
}
</style>