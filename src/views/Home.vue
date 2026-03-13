<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 个人资料数据
const profile = {
  name: "滕昊达",
  tags: ["创意开发者", "资深前端开发师", "数字游民"],
  intro: "我热衷于在代码与美学之间寻找平衡。目前专注于构建高性能、易用的 Web 应用，用技术为创意赋能。",
  stats: [
    { label: '项目经验', value: '50+' },
    { label: '开源贡献', value: '120+' },
    { label: '专注领域', value: 'Vue / 设计' }
  ],
  skills: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Figma', 'Three.js']
}

onMounted(() => {
  // 简单的文字浮现效果
  gsap.from(".animate-up", {
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out"
  })

  // 滚动时卡片轻微浮现
  gsap.utils.toArray('.scroll-reveal').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8
    })
  })
})
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-blue-500/30 font-sans">
    
    <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[100px] rounded-full"></div>
      <div class="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full"></div>
    </div>

    <main class="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-24">
      
      <nav class="flex justify-between items-center mb-20 animate-up">
        <div class="text-xl font-bold tracking-tighter">THD.</div>
        <div class="flex gap-6 text-sm text-zinc-400">
          <a href="#" class="hover:text-white transition-colors">关于</a>
          <a href="#" class="hover:text-white transition-colors">作品</a>
          <a href="#" class="hover:text-white transition-colors">联系</a>
        </div>
      </nav>

      <section class="mb-32">
        <!-- <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 mb-8 animate-up">
          <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span>现可承接新项目</span>
        </div> -->
        
        <h1 class="text-5xl md:text-8xl font-bold tracking-tight mb-8 animate-up">
          你好，我是 <span class="text-blue-500">{{ profile.name }}</span>
        </h1>
        
        <div class="flex flex-wrap gap-3 mb-10 animate-up mt-3">
          <span v-for="tag in profile.tags" :key="tag" 
            class="px-4 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm">
            {{ tag }}
          </span>
        </div>

        <p class="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed animate-up">
          {{ profile.intro }}
        </p>
      </section>

      <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 scroll-reveal">
        <div v-for="stat in profile.stats" :key="stat.label" 
          class="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors group">
          <p class="text-zinc-500 text-sm mb-2">{{ stat.label }}</p>
          <p class="text-3xl font-bold group-hover:text-blue-400 transition-colors">{{ stat.value }}</p>
        </div>
      </section>

      <section class="mb-32 scroll-reveal">
        <h2 class="text-2xl font-bold mb-10">技术栈 / Stack</h2>
        <div class="flex flex-wrap gap-4">
          <div v-for="skill in profile.skills" :key="skill" 
            class="px-6 py-4 rounded-xl bg-zinc-900/30 border border-zinc-800 text-lg font-medium hover:bg-zinc-800 transition-all cursor-default">
            {{ skill }}
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style>

/* 针对全站的流畅滚动 */
html {
  scroll-behavior: smooth;
}

/* 简单的文字平滑过渡 */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>