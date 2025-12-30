<template>
    <footer class="bg-white border-2 border-[#0A0910] max-w-7xl mx-auto px-4 rounded-lg p-6 text-center mt-8 shadow-sm">
        <div class="space-y-4">
            <div class="flex flex-col items-center justify-center gap-2">
                <p class="text-sm font-black text-[#542D0A] uppercase tracking-wider">
                    © 2026 
                    <a 
                        href="https://artkoff.com/" 
                        target="_blank" 
                        class="underline decoration-2 underline-offset-4 hover:text-black transition-colors"
                    >
                        ARTKOFF
                    </a> 
                    | PROFESSIONAL AI BARISTA
                </p>
                
                <div class="flex gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    <span>USA MARKET</span>
                    <span>•</span>
                    <span>THE ART OF PRECISION BREWING</span>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
// Footer component
</script>

<style scoped>
footer {
    transition: transform 0.2s ease;
}
/* 鼠标悬停在页脚上有个轻微的抬升效果，增加精致感 */
footer:hover {
    transform: translateY(-2px);
}
</style>