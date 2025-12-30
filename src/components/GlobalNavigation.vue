<template>
    <nav class="bg-white border-2 border-[#0A0910] max-w-7xl mx-auto rounded-lg mb-4 shadow-lg overflow-visible">
        <div class="px-4 py-6 md:px-6">
            <div class="hidden md:flex items-center justify-between">
                <router-link to="/" class="flex items-center gap-4 transition-transform duration-200" @click="rotateLogo">
                    <div
                        class="flex items-center justify-center"
                        :class="{ 'rotate-logo': isLogoRotating }"
                    >
                        <img 
                            src="https://artkoff.com/wp-content/uploads/2025/07/artkoff_logo.svg" 
                            alt="Artkoff Logo" 
                            class="h-10 md:h-12 w-auto object-contain"
                        />
                    </div>
                    <div class="border-l-2 border-[#0A0910] pl-4">
                        <div class="text-2xl font-black text-[#542D0A] tracking-wider uppercase leading-none mb-1">
                            {{ pageTitle }}
                        </div>
                        <div class="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{{ pageSubtitle }}</div>
                    </div>
                </router-link>

                <div class="flex items-center gap-2">
                    <router-link
                        to="/"
                        class="flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold border-2 border-[#0A0910] transition-all duration-200 transform hover:scale-105 text-sm"
                        :class="$route.path === '/' ? 'bg-[#542D0A] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                    >
                        <span>☕</span>
                        <span>HOME</span>
                    </router-link>

                    <router-link
                        to="/fortune-cooking"
                        class="flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold border-2 border-[#0A0910] transition-all duration-200 transform hover:scale-105 text-sm"
                        :class="$route.path === '/fortune-cooking' ? 'bg-[#542D0A] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                    >
                        <span>🧿</span>
                        <span>FORTUNE</span>
                    </router-link>

                    <router-link
                        to="/sauce-design"
                        class="flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold border-2 border-[#0A0910] transition-all duration-200 transform hover:scale-105 text-sm"
                        :class="$route.path === '/sauce-design' ? 'bg-[#542D0A] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                    >
                        <span>🍯</span>
                        <span>SYRUP MASTER</span>
                    </router-link>

                    <div class="relative" @mouseleave="handleMouseLeave">
                        <button
                            @mouseenter="handleMouseEnter"
                            @click="showMoreMenu = !showMoreMenu"
                            :class="[
                                'flex items-center gap-1 px-3 py-2 rounded-lg font-bold border-2 border-[#0A0910] transition-all duration-200 transform hover:scale-105 text-sm',
                                isMoreMenuActive ? 'bg-[#D4A373] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            ]"
                        >
                            <span>⋯</span>
                            <span>MORE</span>
                        </button>

                        <div
                            v-if="showMoreMenu"
                            @mouseenter="handleMouseEnter"
                            class="absolute right-0 top-full mt-1 w-48 bg-white border-2 border-[#0A0910] rounded-lg shadow-xl z-50 overflow-hidden animate-drop-down"
                        >
                            <router-link
                                to="/favorites"
                                @click="showMoreMenu = false"
                                class="flex items-center gap-3 px-4 py-4 text-sm font-bold transition-colors duration-200 hover:bg-gray-100 border-b-2 border-gray-100"
                                :class="$route.path === '/favorites' ? 'bg-orange-50 text-[#542D0A]' : 'text-gray-700'"
                            >
                                <span>🔖</span>
                                <span>SAVED BREWS</span>
                            </router-link>
                            <router-link
                                to="/gallery"
                                @click="showMoreMenu = false"
                                class="flex items-center gap-3 px-4 py-4 text-sm font-bold transition-colors duration-200 hover:bg-gray-100 border-b-2 border-gray-100"
                                :class="$route.path === '/gallery' ? 'bg-orange-50 text-[#542D0A]' : 'text-gray-700'"
                            >
                                <span>📸</span>
                                <span>GALLERY</span>
                            </router-link>
                            <a
                                href="https://artkoff.com/about-us/"
                                target="_blank"
                                @click="showMoreMenu = false"
                                class="flex items-center gap-3 px-4 py-4 text-sm font-bold transition-colors duration-200 hover:bg-gray-100 text-gray-700"
                            >
                                <span>💡</span>
                                <span>ABOUT US</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="md:hidden">
                <div class="flex items-center justify-between">
                    <router-link to="/" class="flex items-center gap-3" @click="rotateLogo">
                        <img 
                            src="https://artkoff.com/wp-content/uploads/2025/07/artkoff_logo.svg" 
                            alt="Artkoff Logo" 
                            class="h-8 w-auto object-contain"
                            :class="{ 'rotate-logo': isLogoRotating }"
                        />
                        <div class="text-lg font-black text-[#542D0A] tracking-wider uppercase border-l-2 border-[#0A0910] pl-3 leading-none">
                            {{ pageTitle }}
                        </div>
                    </router-link>
                    <button @click="showMobileMenu = !showMobileMenu" class="p-2 bg-gray-50 hover:bg-gray-200 rounded-lg border-2 border-[#0A0910]">
                        <svg class="w-5 h-5 text-[#542D0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>

                <div v-if="showMobileMenu" class="border-t-2 border-gray-100 pt-3 mt-3">
                    <div class="overflow-x-auto scrollbar-hide">
                        <div class="flex gap-2 pb-2 min-w-max">
                            <template v-for="item in navItems" :key="item.name">
                                <router-link
                                    v-if="!item.isExternal"
                                    :to="item.path"
                                    @click="showMobileMenu = false"
                                    class="flex items-center gap-1.5 px-3 py-2 rounded-full font-bold border-2 border-[#0A0910] text-sm transition-all"
                                    :class="$route.path === item.path ? 'bg-[#542D0A] text-white shadow-md' : 'bg-white text-gray-700'"
                                >
                                    <span>{{ item.icon }}</span>
                                    <span>{{ item.name }}</span>
                                </router-link>
                                <a
                                    v-else
                                    :href="item.path"
                                    target="_blank"
                                    @click="showMobileMenu = false"
                                    class="flex items-center gap-1.5 px-3 py-2 rounded-full font-bold border-2 border-[#0A0910] text-sm transition-all bg-white text-gray-700"
                                >
                                    <span>{{ item.icon }}</span>
                                    <span>{{ item.name }}</span>
                                </a>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const showMobileMenu = ref(false)
const showMoreMenu = ref(false)
const isLogoRotating = ref(false)
let hideMenuTimer: NodeJS.Timeout | null = null

const rotateLogo = () => {
    isLogoRotating.value = true
    setTimeout(() => {
        isLogoRotating.value = false
    }, 500)
}
const route = useRoute()

// 移动端菜单配置
const navItems = [
    { path: '/', icon: '☕', name: 'HOME', isExternal: false },
    { path: '/fortune-cooking', icon: '🧿', name: 'FORTUNE', isExternal: false },
    { path: '/sauce-design', icon: '🍯', name: 'SYRUPS', isExternal: false },
    { path: '/favorites', icon: '🔖', name: 'SAVED', isExternal: false },
    { path: '/gallery', icon: '📸', name: 'GALLERY', isExternal: false },
    { path: 'https://artkoff.com/about-us/', icon: '💡', name: 'ABOUT', isExternal: true }
]

const pageTitle = computed(() => {
    switch (route.path) {
        case '/': return 'AI BARISTA'
        case '/sauce-design': return 'SYRUP MASTER'
        case '/fortune-cooking': return 'COFFEE ORACLE'
        case '/favorites': return 'SAVED BREWS'
        case '/gallery': return 'GALLERY'
        default: return 'AI BARISTA'
    }
})

const pageSubtitle = computed(() => {
    switch (route.path) {
        case '/': return 'YOUR PRIVATE AI COFFEE EXPERT'
        case '/sauce-design': return 'CRAFT SIGNATURE FLAVORS'
        case '/fortune-cooking': return 'BREW YOUR DESTINY'
        case '/favorites': return 'LEGENDARY COLLECTION'
        case '/gallery': return 'EXTRACTION SHOWCASE'
        default: return 'ARTKOFF PRECISION BREWING'
    }
})

const isMoreMenuActive = computed(() => {
    // 移除 /about 的激活状态检测
    return ['/favorites', '/gallery'].includes(route.path)
})

const handleMouseEnter = () => {
    if (hideMenuTimer) {
        clearTimeout(hideMenuTimer)
        hideMenuTimer = null
    }
    showMoreMenu.value = true
}

const handleMouseLeave = () => {
    hideMenuTimer = setTimeout(() => {
        showMoreMenu.value = false
    }, 150)
}
</script>

<style scoped>
@keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
.rotate-logo { animation: rotate 0.5s ease-out; }

@keyframes dropDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-drop-down { animation: dropDown 0.2s ease-out; }

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar { display: none; }
</style>