<template>
    <div class="min-h-screen bg-[#F8F5F2] px-2 md:px-4 py-6 font-sans text-[#0A0910]">
        <GlobalNavigation />

        <div class="max-w-4xl mx-auto space-y-12 py-10">
            <section class="text-center space-y-6">
                <div class="inline-block">
                    <div class="w-24 h-24 bg-[#542D0A] border-4 border-[#0A0910] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <span class="text-white text-4xl">☕</span>
                    </div>
                </div>
                <h1 class="text-4xl md:text-6xl font-black text-[#542D0A] uppercase tracking-tighter italic">About Artkoff</h1>
                <p class="text-lg md:text-xl font-bold text-gray-500 italic max-w-2xl mx-auto">
                    "Bridging the gap between laboratory precision and the perfect morning cup."
                </p>
            </section>

            <hr class="border-2 border-[#0A0910] opacity-10" />

            <section class="grid md:grid-cols-2 gap-12 items-center">
                <div class="space-y-6">
                    <h2 class="text-2xl font-black text-[#542D0A] uppercase tracking-widest flex items-center gap-3">
                        <span class="bg-[#D4A373] text-white p-1 rounded">01</span> Our Mission
                    </h2>
                    <p class="text-gray-600 font-medium leading-relaxed">
                        At **Artkoff**, we believe brewing coffee is an exact science. Our mission is to empower baristas and enthusiasts with AI-driven insights, ensuring every extraction meets the highest standards of flavor, body, and aroma.
                    </p>
                    <p class="text-gray-600 font-medium leading-relaxed">
                        From analyzing roast profiles to formulating custom syrups, our tools are designed for those who refuse to compromise on quality.
                    </p>
                </div>
                <div class="bg-white border-4 border-[#0A0910] p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div class="space-y-4">
                        <div class="flex items-center gap-4">
                            <span class="text-2xl">🔬</span>
                            <span class="font-black uppercase text-xs tracking-widest">Lab-Tested Protocols</span>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="text-2xl">🤖</span>
                            <span class="font-black uppercase text-xs tracking-widest">AI Extraction Guides</span>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="text-2xl">🌍</span>
                            <span class="font-black uppercase text-xs tracking-widest">Global Bean Archive</span>
                        </div>
                    </div>
                </div>
            </section>

            <section class="bg-[#0A0910] text-white p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden text-center">
                <div class="absolute right-[-20px] top-[-20px] opacity-10 rotate-12 text-9xl font-black italic select-none">LAB</div>
                
                <h2 class="text-3xl font-black uppercase italic mb-6 relative z-10">Get in Touch</h2>
                <p class="text-gray-400 font-bold mb-10 relative z-10 max-w-lg mx-auto">
                    Whether you are looking for equipment support or want to discuss flavor chemistry, the Artkoff team is here to assist your brewing journey.
                </p>

                <div class="flex flex-col md:flex-row justify-center gap-6 relative z-10">
                    <a href="mailto:support@artkoff.com" class="px-8 py-4 bg-white text-black rounded-xl font-black uppercase tracking-widest hover:bg-[#D4A373] transition-colors border-2 border-white">
                        Email Support
                    </a>
                    <a href="https://artkoff.com" target="_blank" class="px-8 py-4 bg-transparent text-white rounded-xl font-black uppercase tracking-widest border-2 border-white/30 hover:border-white transition-all">
                        Official Site
                    </a>
                </div>
            </section>
        </div>

        <GlobalFooter />
    </div>
</template>

<script setup lang="ts">
import GlobalNavigation from '@/components/GlobalNavigation.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.8s ease-out forwards;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>