<template>
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in" @click.self="$emit('close')">
        <div class="bg-white border-4 border-[#0A0910] rounded-2xl max-w-md w-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div class="bg-[#542D0A] text-white border-b-4 border-black p-5">
                <h3 class="text-xl font-black uppercase tracking-widest italic">Barista Notes</h3>
            </div>

            <div class="p-6">
                <div class="mb-6">
                    <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Target Brew: {{ favorite.recipe.name }}</label>
                    <textarea
                        v-model="notes"
                        placeholder="Log your extraction experience or flavor adjustments..."
                        class="w-full p-4 bg-[#FDFBF9] border-4 border-[#0A0910] rounded-xl resize-none focus:outline-none focus:ring-8 focus:ring-[#D4A373]/20 font-bold text-sm placeholder:text-gray-300"
                        rows="4"
                        maxlength="200"
                    ></textarea>
                    <div class="flex justify-end mt-2">
                        <span class="text-[10px] font-black text-[#D4A373] uppercase">{{ notes.length }}/200 Characters</span>
                    </div>
                </div>

                <div class="flex gap-4">
                    <button
                        @click="$emit('close')"
                        class="flex-1 px-4 py-3 bg-white text-black rounded-xl font-black border-4 border-[#0A0910] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all uppercase text-xs tracking-widest"
                    >
                        Discard
                    </button>
                    <button
                        @click="$emit('save', notes)"
                        class="flex-1 px-4 py-3 bg-[#542D0A] text-white rounded-xl font-black border-4 border-[#0A0910] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all uppercase text-xs tracking-widest"
                    >
                        Commit Note
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FavoriteRecipe } from '@/types'

const props = defineProps<{ favorite: FavoriteRecipe }>()

// 修复：移除 'const emit =' 赋值，直接调用 defineEmits
defineEmits<{ close: [], save: [notes: string] }>()

const notes = ref(props.favorite?.notes || '')
watch(() => props.favorite, (newFav) => { notes.value = newFav?.notes || '' }, { immediate: true })
</script>