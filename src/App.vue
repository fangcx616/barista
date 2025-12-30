<template>
    <div id="app" class="min-h-screen bg-[#F8F5F2]">
        <router-view />
    </div>
</template>

<script setup>
/**
 * Artkoff AI Barista - Main Entry
 * 已移除全局公告弹窗和设置按钮入口
 */
</script>

<style>
/* 基础样式重置 */
body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #0A0910;
}

/* 自定义滚动条样式（可选，让页面看起来更精致） */
::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-track {
    background: #F8F5F2;
}
::-webkit-scrollbar-thumb {
    background: #542D0A;
    border-radius: 4px;
}
</style>