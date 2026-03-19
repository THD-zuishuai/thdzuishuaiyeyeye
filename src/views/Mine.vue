<template>
  <div class="min-h-screen bg-[#05050a] text-white font-sans">
    <!-- Neon background glows -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute -top-[12%] -left-[8%] w-[420px] h-[420px] bg-pink-500/20 rounded-full blur-[110px] animate-pulse"></div>
      <div class="absolute top-[10%] right-[-6%] w-[360px] h-[360px] bg-cyan-400/15 rounded-full blur-[90px] animate-bounce-slow"></div>
      <div class="absolute bottom-[-10%] left-[12%] w-[520px] h-[520px] bg-purple-600/12 rounded-full blur-[140px]"></div>
      <div class="absolute inset-0 bg-[repeating-linear-gradient(90deg,#0b0b0b20_0_1px,transparent_1px_20px)] mix-blend-overlay opacity-10"></div>
    </div>

    <main class="relative z-10 container mx-auto px-4 py-8 lg:py-12">
      <div class="max-w-5xl mx-auto bg-white/4 border border-white/6 rounded-3xl backdrop-blur-md overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.6)]">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <!-- LEFT: Sidebar -->
          <aside class="p-6 lg:p-8 border-r border-white/6 lg:col-span-1 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]">
            <div class="flex items-center space-x-4">
              <div class="w-20 h-20 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                <!-- Avatar placeholder -->
                <img src="../assets/photo.png" alt="avatar" class="w-full h-full object-cover" />
              </div>
              <div>
                <div class="text-2xl font-extrabold tracking-tight">{{ resume.name }}</div>
                <div class="text-sm text-gray-300 mt-1">{{ resume.title }}</div>
              </div>
            </div>

            <div class="mt-5 text-sm text-gray-300">
              <p class="leading-relaxed">{{ resume.summary }}</p>
            </div>

            <div class="mt-6">
              <div class="text-xs text-gray-400 uppercase tracking-wide mb-2">联系方式</div>
              <ul class="text-sm space-y-1 text-gray-300">
                <li class="flex items-center"><span class="w-4">📧</span><span class="ml-2">{{ resume.email }}</span></li>
                <li class="flex items-center"><span class="w-4">🔗</span><a :href="resume.website" target="_blank" class="ml-2 hover:text-white">{{ resume.websiteDisplay }}</a></li>
                <li class="flex items-center"><span class="w-4">📱</span><span class="ml-2">{{ resume.phone }}</span></li>
                <li class="flex items-center"><span class="w-4">📍</span><span class="ml-2">{{ resume.location }}</span></li>
              </ul>
            </div>

            <div class="mt-6">
              <div class="text-xs text-gray-400 uppercase tracking-wide mb-2">技能</div>
              <div class="space-y-3">
                <!-- <div v-for="(s, i) in resume.skills" :key="i">
                  <div class="flex justify-between text-sm text-gray-300 mb-1"><span>{{ s.name }}</span><span>{{ s.level }}%</span></div>
                  <div class="w-full h-2 bg-white/6 rounded-full overflow-hidden">
                    <div :style="{ width: s.level + '%' }" class="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-inner transition-all"></div>
                  </div>
                </div> -->
                 <span v-for="(l,i) in resume.skills" :key="i" class="px-2 py-1 rounded-md bg-white/6">{{ l.name }}</span>
              </div>
            </div>

            <div class="mt-6">
              <div class="text-xs text-gray-400 uppercase tracking-wide mb-2">语言</div>
              <div class="flex space-x-2 text-sm">
                <span v-for="(l,i) in resume.languages" :key="i" class="px-2 py-1 rounded-md bg-white/6">{{ l }}</span>
              </div>
            </div>

            <div class="mt-6">
              <button @click="printResume" class="w-full px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold">打印 / 导出 PDF</button>
            </div>
          </aside>

          <!-- RIGHT: Main content -->
          <section class="p-6 lg:col-span-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <!-- <div class="px-3 py-1 rounded-md bg-white/5 text-xs text-cyan-300">赛博朋克 · 简历</div> -->
                <div class="text-sm text-gray-300">最后更新：{{ resume.updated }}</div>
              </div>

              <div class="flex items-center space-x-3">
                <!-- <button @click="toggleTheme" class="px-3 py-1 rounded-md bg-white/5 text-sm">切换暗色/弱光</button> -->
                <!-- <a :href="resume.linkedin" target="_blank" class="px-3 py-1 rounded-md bg-white/5 text-sm">LinkedIn</a> -->
              </div>
            </div>

            <!-- Experience timeline -->
            <div class="mt-6">
              <h3 class="text-lg font-bold">工作经历</h3>

              <div class="mt-4 space-y-4">
                <div v-for="(exp,i) in resume.experience" :key="i" class="p-4 rounded-xl bg-white/5 border border-white/6">
                  <div class="flex items-start justify-between">
                    <div>
                      <div class="flex items-center space-x-2">
                        <div class="text-xl font-semibold">{{ exp.role }}</div>
                        <div class="text-sm text-gray-400">@ {{ exp.company }}</div>
                      </div>
                      <div class="text-xs text-gray-400">{{ exp.range }} · {{ exp.location }}</div>
                    </div>
                    <div class="text-sm text-cyan-400 font-medium">{{ exp.type }}</div>
                  </div>
                  <ul class="mt-3 list-disc list-inside text-gray-300 text-sm">
                    <li v-for="(d, idx) in exp.points" :key="idx">{{ d }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Projects -->
            <div class="mt-6">
              <h3 class="text-lg font-bold">项目</h3>
              <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="(p,i) in resume.projects" :key="i" class="p-4 rounded-lg bg-white/5 border border-white/6">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-semibold">{{ p.name }}</div>
                      <div class="text-xs text-gray-400">{{ p.tech }}</div>
                    </div>
                    <a :href="p.link" target="_blank" class="text-cyan-300 text-sm">查看</a>
                  </div>
                  <p class="text-sm text-gray-300 mt-2">{{ p.desc }}</p>
                </div>
              </div>
            </div>

            <!-- Education & certifications -->
            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 rounded-xl bg-white/5 border border-white/6">
                <h4 class="font-semibold">教育</h4>
                <div class="mt-2 text-sm text-gray-300">
                  <div v-for="(e,i) in resume.education" :key="i" class="mb-3">
                    <div class="font-medium">{{ e.school }}</div>
                    <div class="text-xs text-gray-400">{{ e.range }} · {{ e.degree }}</div>
                  </div>
                </div>
              </div>

              <div class="p-4 rounded-xl bg-white/5 border border-white/6">
                <h4 class="font-semibold">证书 / 奖项</h4>
                <ul class="mt-2 text-sm text-gray-300 list-disc list-inside">
                  <li v-for="(c,i) in resume.certs" :key="i">{{ c }}</li>
                </ul>
              </div>
            </div>

            <!-- Footer: short bio & tags -->
            <div class="mt-6 p-4 rounded-lg bg-gradient-to-r from-cyan-500/6 to-purple-500/6 border border-white/6">
              <div class="flex items-center justify-between">
                <div class="text-sm text-gray-300">{{ resume.footer }}</div>
                <div class="text-xs text-gray-400">生成于 THD 简历生成器</div>
              </div>
            </div>

          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const resume = ref({
  name: '滕昊达',
  title: '资深Vue前端工程师',
  // photo: '../../assets/photo.png',
  email: '461587751@qq.com',
  website: 'https://thd-zuishuai.github.io/vueDemo/',
  websiteDisplay: 'THD的博客',
  phone: '+86 13069041031',
  location: '长春',
  summary: '专注于前端工程化、交互动效与性能优化。热衷于把复杂的问题用简洁的 UI 与稳定的代码解决。',
  updated: new Date().toLocaleDateString(),
  skills: [
    { name: 'Vue 3', level: 92 },
    { name: 'TypeScript', level: 86 },
    { name: 'CSS / WindiCSS', level: 88 },
    { name: 'ECharts / D3', level: 72 }
  ],
  languages: ['英语六级'],
  experience: [
    {
      role: '高级前端工程师',
      company: '未来科技',
      range: '2022 - 至今',
      location: 'Remote / 新加坡',
      type: '全职',
      points: [
        '负责核心交互组件库设计与维护，提升团队复用率 40%。',
        '主导性能优化项目，首屏时间缩短 45%。',
        '与后端协作完成高并发场景下的数据可视化方案。'
      ]
    },
    
    {
      role: '前端工程师',
      company: '创意工作室',
      range: '2019 - 2022',
      location: '上海',
      type: '全职',
      points: [
        '构建多套营销活动落地页，参与从设计到部署的全流程。',
        '实现无刷新表单验证与渐进式增强体验，提高转化率。'
      ]
    }
  ],
  projects: [
    { name: 'THD 实验室', tech: 'Vue3 · WindiCSS · ECharts', link: '#', desc: '个人实验项目集合：CSS 特效、数据可视化与 AI 工具集成。' },
    { name: '实时数据大屏', tech: 'Vue3 · WebSocket · ECharts', link: '#', desc: '用于监控与告警的可视化面板，支持大规模数据流展示。' }
  ],
  education: [
    { school: '某理工大学', range: '2015 - 2019', degree: '计算机科学学士' }
  ],
  certs: ['前端性能优化工程师证书', '高级交互设计师奖'],
  footer: '喜欢把代码写成小工具箱，也喜欢在空闲时间做摄影与音乐。'
})

const printResume = () => {
  // 简单实现：触发浏览器打印（用户可选择保存为 PDF）
  window.print()
}

const toggleTheme = () => {
  // a lightweight theme toggle: switch subtle accent (示例，不持久化)
  const root = document.documentElement
  if (root.style.getPropertyValue('--accent') === 'bright') {
    root.style.setProperty('--accent','dim')
    // for demo, we can flip a class or tweak CSS variables
    document.body.classList.toggle('weak-accent')
  } else {
    root.style.setProperty('--accent','bright')
    document.body.classList.toggle('weak-accent')
  }
}
</script>

<style scoped>
@keyframes pulse { 0%{ opacity:0.6 } 50%{ opacity:1 } 100%{ opacity:0.6 } }
.animate-pulse { animation: pulse 3s infinite }
@keyframes bounce { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-18px) } }
.animate-bounce-slow { animation: bounce 6s infinite }

/* Print styles: make it printer-friendly (B/W friendly fallback) */
@media print {
  body { background: white; color: black }
  .container, .bg-white\/4 { background: white !important }
  img { max-width: 120px }
  .pointer-events-none { display: none }
}

/* weak accent example */
.weak-accent .bg-gradient-to-r\ from-cyan-500\ to-purple-600 { background: linear-gradient(90deg,#4dd0e1,#7c3aed) !important }
</style>
