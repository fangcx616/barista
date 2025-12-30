<template>
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in" @click.self="$emit('cancel')">
        <div class="bg-white border-4 border-[#0A0910] rounded-2xl max-w-md w-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-all transform scale-100">
            <div class="bg-[#542D0A] text-white border-b-4 border-black p-5">
                <h3 class="text-xl font-black uppercase tracking-widest italic">{{ title }}</h3>
            </div>
            
            <div class="p-6">
                <p class="text-[#542D0A] font-bold text-sm leading-relaxed mb-8 italic">"{{ message }}"</p>
                
                <div class="flex gap-4">
                    <button
                        @click="$emit('cancel')"
                        class="flex-1 px-4 py-3 bg-white hover:bg-gray-100 text-black rounded-xl font-black border-4 border-[#0A0910] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all uppercase text-xs tracking-widest"
                    >
                        Abort
                    </button>
                    <button
                        @click="$emit('confirm')"
                        class="flex-1 px-4 py-3 bg-[#D4A373] hover:bg-black hover:text-white text-black rounded-xl font-black border-4 border-[#0A0910] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all uppercase text-xs tracking-widest"
                    >
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    title: string
    message: string
}
defineProps<Props>()
defineEmits<{
    confirm: []
    cancel: []
}>()
</script>