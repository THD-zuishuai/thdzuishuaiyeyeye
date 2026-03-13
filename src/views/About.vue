<template>
  <div :class="['app root', theme]" @mousemove="handleParallax">
    <!-- 背景动画层 -->
    <div class="bg-layer" aria-hidden="true">
      <div class="orb orb--one"></div>
      <div class="orb orb--two"></div>
      <div class="grid-lines"></div>
    </div>

    <header class="site-header">
      <nav class="nav container">
        <div class="brand" @click="scrollTo('#hero')" tabindex="0">{{ name }}</div>
        <ul class="nav-links" role="list">
          <li><button @click="scrollTo('#about')">About</button></li>
          <li><button @click="scrollTo('#skills')">Skills</button></li>
          <li><button @click="scrollTo('#projects')">Projects</button></li>
          <li><button @click="scrollTo('#contact')">Contact</button></li>
        </ul>
        <div class="controls">
          <button class="btn" @click="toggleTheme" :aria-pressed="theme === 'dark'">{{
            theme === 'dark' ? '🌙' : '☀️'
          }}</button>
          <button class="hamburger" @click="open = !open" :aria-expanded="open">
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <transition name="mobile-menu">
        <div v-if="open" class="mobile-nav" role="dialog" aria-label="mobile navigation">
          <ul>
            <li v-for="i in ['#hero','#about','#skills','#projects','#contact']" :key="i">
              <button @click="scrollTo(i); open=false">{{ i.replace('#','').toUpperCase() }}</button>
            </li>
          </ul>
        </div>
      </transition>
    </header>

    <main>
      <!-- Hero -->
      <section id="hero" class="hero container">
        <div class="hero-left card" ref="cardRef">
          <div class="avatar-wrap" @pointerenter="hover=true" @pointerleave="hover=false">
            <!-- 占位 SVG 头像 -->
            <svg class="avatar" viewBox="0 0 200 200" role="img" aria-label="profile picture">
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0%" stop-color="#6EE7B7" />
                  <stop offset="100%" stop-color="#3B82F6" />
                </linearGradient>
              </defs>
              <rect width="200" height="200" rx="20" fill="url(#g)" />
              <g transform="translate(30,30) scale(1)">
                <circle cx="70" cy="50" r="28" fill="#fff" opacity="0.12" />
                <circle cx="70" cy="62" r="28" fill="#fff" opacity="0.06" />
              </g>
            </svg>
          </div>

          <div class="hero-info">
            <h1 class="name">{{ name }}</h1>
            <p class="tagline">{{ tagline }}</p>
            <p class="intro">{{ intro }}</p>
            <div class="cta">
              <a class="btn" @click.prevent="scrollTo('#projects')">查看作品</a>
              <a class="btn ghost" @click.prevent="scrollTo('#contact')">联系我</a>
            </div>

            <div class="meta">
              <div class="meta-item">
                <strong>{{ yearsExperience }}</strong>
                <span>Years Experience</span>
              </div>
              <div class="meta-item">
                <strong>{{ projects.length }}</strong>
                <span>Projects</span>
              </div>
            </div>
          </div>
        </div>

        <div class="hero-right">
          <div class="glass card">
            <h3>Contact</h3>
            <p>想快速聊项目？发邮件或在下面留信息，我会在工作日内回复。</p>

            <ul class="social">
              <li v-for="s in socials" :key="s.name">
                <a :href="s.href" target="_blank" rel="noopener noreferrer">{{ s.icon }} <span>{{ s.name }}</span></a>
              </li>
            </ul>

            <div class="skill-tags">
              <span v-for="t in topTech" :key="t">{{ t }}</span>
            </div>
          </div>

          <div class="floating-widgets">
            <div class="widget" v-for="(w, idx) in widgets" :key="idx">
              <strong>{{ w.title }}</strong>
              <p>{{ w.value }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- About -->
      <section id="about" class="section container about">
        <div class="about-grid">
          <article class="about-card card">
            <h2>关于我</h2>
            <p>{{ about }}</p>
            <ul class="facts">
              <li><strong>Location</strong><span>{{ location }}</span></li>
              <li><strong>Role</strong><span>{{ role }}</span></li>
              <li><strong>Email</strong><span>{{ email }}</span></li>
            </ul>
          </article>

          <article class="timeline card">
            <h2>经历</h2>
            <ol>
              <li v-for="(t, i) in timeline" :key="i">
                <strong>{{ t.period }}</strong>
                <p>{{ t.title }} — {{ t.desc }}</p>
              </li>
            </ol>
          </article>
        </div>
      </section>

      <!-- Skills -->
      <section id="skills" class="section container skills">
        <h2 class="section-title">技能矩阵</h2>
        <div class="skill-grid">
          <div v-for="skill in skills" :key="skill.name" class="skill-card card">
            <div class="skill-head">
              <div class="skill-name">{{ skill.name }}</div>
              <div class="skill-level">{{ skill.level }}</div>
            </div>
            <div class="skill-bar" aria-hidden>
              <div class="progress" :style="{ width: skill.pct + '%' }"></div>
            </div>
            <p class="skill-desc">{{ skill.desc }}</p>
          </div>
        </div>
      </section>

      <!-- Projects -->
      <section id="projects" class="section container projects">
        <h2 class="section-title">精选项目</h2>
        <div class="projects-carousel" ref="carousel">
          <button class="carousel-nav prev" @click="prev()" aria-label="previous project">‹</button>
          <ul class="carousel-track">
            <li v-for="(p, i) in projects" :key="p.title" :class="['project', { active: i === current }]">
              <div class="project-card card">
                <div class="project-media" :style="{ backgroundImage: `url(${p.image})` }" role="img" :aria-label="p.title"></div>
                <div class="project-body">
                  <h3>{{ p.title }}</h3>
                  <p>{{ p.summary }}</p>
                  <div class="project-tags"><span v-for="tag in p.tags" :key="tag">{{ tag }}</span></div>
                  <a class="btn ghost" :href="p.link" target="_blank" rel="noopener">查看</a>
                </div>
              </div>
            </li>
          </ul>
          <button class="carousel-nav next" @click="next()" aria-label="next project">›</button>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" class="section container contact">
        <div class="contact-grid">
          <form class="contact-form card" @submit.prevent="submitContact" novalidate>
            <h2>联系我</h2>
            <label>
              <span>名字</span>
              <input v-model="form.name" required minlength="2" />
            </label>
            <label>
              <span>邮箱</span>
              <input v-model="form.email" type="email" required />
            </label>
            <label>
              <span>信息</span>
              <textarea v-model="form.message" required minlength="10"></textarea>
            </label>
            <div class="form-actions">
              <button class="btn" type="submit" :disabled="sending">发送</button>
              <button class="btn ghost" type="button" @click="resetForm">重置</button>
            </div>
            <p v-if="status" class="status">{{ status }}</p>
          </form>

          <aside class="contact-info card">
            <h3>更多方式</h3>
            <p>可以把简历发到 <a :href="`mailto:${email}`">{{ email }}</a></p>
            <dl>
              <dt>可用时间</dt>
              <dd>工作日 09:00 - 18:00</dd>
              <dt>语言</dt>
              <dd>中文（母语），英语（流利）</dd>
            </dl>
          </aside>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="container footer-inner">
        <p>© {{ new Date().getFullYear() }} {{ name }} · Built with Vue 3</p>
        <p class="small">This page is responsive and keyboard accessible. Built with focus on modern H5 UX.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'

// ------------ 基本信息（请按需修改） ------------
const name = '你的名字'
const tagline = '前端工程师 · Vue 专家 · 交互设计'
const intro = '我擅长构建高质量的前端产品，关注性能与用户体验。欢迎查看我的项目或联系我开展合作。'
const location = '北京, 中国'
const role = 'Senior Frontend Engineer'
const email = 'your.email@example.com'
const yearsExperience = 6

// 主题控制
const theme = ref((localStorage.getItem('theme') as string) || 'light')
function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  localStorage.setItem('theme', theme.value)
}

// 导航 / 移动菜单
const open = ref(false)
function scrollTo(sel: string) {
  const el = document.querySelector(sel)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// 个人信息和社交
const socials = [
  { name: 'GitHub', href: 'https://github.com/', icon: '🐙' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/', icon: '💼' },
  { name: '微博', href: 'https://weibo.com', icon: '微博' }
]

const topTech = ['Vue 3', 'TypeScript', 'Vite', 'Tailwind', 'Node.js']

const widgets = [
  { title: 'Availability', value: 'Freelance · Contract' },
  { title: 'Rate', value: '面议' }
]

const about = `我拥有多年的前端工程经验，曾在多家互联网公司负责核心业务的研发和优化。兴趣包括：性能优化、动画设计与前端工程化。`;

const timeline = [
  { period: '2023 - 现在', title: 'Senior Frontend', desc: '某互联网公司 — 负责核心产品前端架构' },
  { period: '2020 - 2023', title: 'Frontend', desc: '电商平台 — 性能优化与组件库搭建' },
]

// 技能
const skills = reactive([
  { name: 'Vue 3 / Composition', level: 'Expert', pct: 95, desc: '组件化、组合式API、性能调优' },
  { name: 'TypeScript', level: 'Advanced', pct: 88, desc: '类型设计、泛型、声明合约' },
  { name: 'CSS / Animation', level: 'Advanced', pct: 82, desc: '复杂布局与交互动效' },
  { name: 'Testing / E2E', level: 'Intermediate', pct: 70, desc: '单元测试与端到端测试经验' },
])

// 项目轮播
const projects = reactive([
  {
    title: '高级交互挑战页',
    summary: '一个结合动画、SVG 和复杂响应式布局的H5演示页。',
    tags: ['Vue', 'Animation', 'SVG'],
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500"><rect width="100%" height="100%" fill="%233b82f6"/></svg>',
    link: '#'
  },
  {
    title: '数据可视化仪表板',
    summary: '复杂图表和交互的中后台界面样例。',
    tags: ['D3', 'Canvas'],
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="900" height="500"><rect width="100%" height="100%" fill="%236ee7b7"/></svg>',
    link: '#'
  }
])

const current = ref(0)
let carouselTimer: number | undefined
function next() {
  current.value = (current.value + 1) % projects.length
}
function prev() {
  current.value = (current.value - 1 + projects.length) % projects.length
}
function startCarousel() {
  carouselTimer = window.setInterval(next, 5000)
}
function stopCarousel() {
  if (carouselTimer) window.clearInterval(carouselTimer)
}

// contact 表单（演示：不会真的发送）
const form = reactive({ name: '', email: '', message: '' })
const sending = ref(false)
const status = ref('')
function validateEmail(mail: string) {
  return /\S+@\S+\.\S+/.test(mail)
}
async function submitContact() {
  if (!form.name || !validateEmail(form.email) || form.message.length < 10) {
    status.value = '请填写有效信息，信息至少10字。'
    return
  }
  sending.value = true
  status.value = '发送中...'
  // 模拟延迟
  await new Promise((r) => setTimeout(r, 900))
  sending.value = false
  status.value = '已发送（演示）！我会尽快回复。'
  resetForm(false)
}
function resetForm(clear = true) {
  if (clear) {
    form.name = ''
    form.email = ''
    form.message = ''
  }
}

// 交互 / 视差效果
const cardRef = ref<HTMLElement | null>(null)
const hover = ref(false)
const parallax = ref({ x: 0, y: 0 })
function handleParallax(e: PointerEvent) {
  const w = window.innerWidth
  const h = window.innerHeight
  parallax.value.x = (e.clientX - w / 2) / w
  parallax.value.y = (e.clientY - h / 2) / h
}

// 轮播自动播放
onMounted(() => {
  startCarousel()
  // restore theme
  document.documentElement.setAttribute('data-theme', theme.value)
  watch(theme, (t) => document.documentElement.setAttribute('data-theme', t))
})

// 简单响应式计算
const projectsCount = computed(() => projects.length)
</script>

<style scoped>
/* ------------- 设计语言变量 ------------- */
:root {
  --bg: #0f172a;
  --card: rgba(255,255,255,0.04);
  --glass: rgba(255,255,255,0.03);
  --muted: rgba(255,255,255,0.65);
  --accent: linear-gradient(90deg,#6ee7b7,#3b82f6);
}
.root.light {
  --bg: #f8fafc;
  --card: rgba(2,6,23,0.03);
  --glass: rgba(255,255,255,0.6);
  --muted: rgba(15,23,42,0.75);
}
.root.dark { background: radial-gradient(ellipse at 10% 10%, rgba(59,130,246,0.06), transparent 10%), var(--bg); color: #e6eef8 }
.root.light { color: #0b1220 }

.app { min-height: 100vh; font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Helvetica Neue', 'Noto Sans', 'PingFang SC'; }
.container { max-width: 1100px; margin: 0 auto; padding: 1.25rem; }

/* 背景动画 */
.bg-layer { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
.orb { position: absolute; filter: blur(60px); opacity: 0.7; transform: translateZ(0); }
.orb--one { width: 520px; height: 520px; left: 5%; top: -10%; background: radial-gradient(circle,#6EE7B7 0%, rgba(59,130,246,0.2) 60%, transparent 100%); }
.orb--two { width: 420px; height: 420px; right: 5%; bottom: -5%; background: radial-gradient(circle,#a78bfa 0%, rgba(59,130,246,0.15) 60%, transparent 100%); }
.grid-lines { position: absolute; inset: 0; background-image: linear-gradient(0deg, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 120px 120px; mix-blend-mode: overlay; }

/* header */
.site-header { position: sticky; top: 0; z-index: 40; backdrop-filter: blur(6px); }
.nav { display:flex; align-items:center; gap:1rem; justify-content:space-between; padding:0.5rem 0; }
.brand { font-weight:700; letter-spacing:0.6px; cursor:pointer }
.nav-links { display:flex; gap:0.75rem; list-style:none; margin:0; }
.nav-links button { background:none; border:none; padding:0.5rem; cursor:pointer }
.controls { display:flex; gap:0.5rem; align-items:center }
.hamburger { display:none; width:38px; height:38px; border-radius:8px; background:var(--card); border:none; padding:6px; }
.hamburger span { display:block; height:2px; background:currentColor; margin:5px 0; }

.mobile-nav { position:fixed; inset:60px 16px auto 16px; background:var(--card); padding:1rem; border-radius:12px; box-shadow:0 10px 30px rgba(2,6,23,0.5); }

/* hero */
.hero { display:grid; grid-template-columns: 1fr 380px; gap:1.25rem; align-items:start; padding:3rem 0; position:relative; z-index:5 }
.card { background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); border-radius:16px; padding:1rem; box-shadow: 0 6px 30px rgba(2,6,23,0.4); }
.hero-left { display:flex; gap:1rem; align-items:flex-start }
.avatar-wrap { width:120px; height:120px; border-radius:14px; overflow:hidden; flex-shrink:0; transition:transform 0.35s ease; }
.avatar { width:120px; height:120px; display:block }
.hero-info .name { font-size:1.6rem; margin:0.25rem 0 }
.tagline { color:var(--muted); margin:0 }
.cta { margin-top:0.75rem; display:flex; gap:0.6rem }
.btn { background:var(--accent); color:white; border:none; padding:0.5rem 0.9rem; border-radius:10px; cursor:pointer; text-decoration:none }
.btn.ghost { background:transparent; border:1px solid rgba(255,255,255,0.06) }
.meta { display:flex; gap:1rem; margin-top:1rem }
.meta-item strong { display:block }

.hero-right { display:flex; flex-direction:column; gap:1rem }
.glass { background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)); padding:1rem }
.social { display:flex; gap:0.5rem; list-style:none; padding:0; }
.social a { display:flex; gap:0.5rem; align-items:center; text-decoration:none }
.skill-tags span { display:inline-block; background:rgba(255,255,255,0.03); padding:0.25rem 0.4rem; border-radius:8px; margin:0.2rem }
.floating-widgets { display:flex; gap:0.6rem; margin-top:0.9rem }
.widget { background:var(--card); padding:0.6rem; border-radius:10px; min-width:120px }

/* about/timeline */
.about-grid { display:grid; grid-template-columns: 1fr 1fr; gap:1rem; }
.facts { list-style:none; padding:0; margin:1rem 0 0 0 }
.facts li { display:flex; justify-content:space-between; padding:0.2rem 0 }
.timeline ol { list-style:none; padding:0; margin:0 }
.timeline li { padding:0.6rem 0; border-bottom:1px dashed rgba(255,255,255,0.03) }

/* skills */
.skill-grid { display:grid; grid-template-columns: repeat(2, 1fr); gap:0.75rem }
.skill-card .skill-bar { height:10px; background:rgba(255,255,255,0.04); border-radius:999px; margin:0.6rem 0 }
.skill-card .progress { height:100%; border-radius:999px; background-image:var(--accent) }

/* projects carousel */
.projects-carousel { position:relative; display:flex; align-items:center }
.carousel-track { display:flex; gap:1rem; list-style:none; padding:0; margin:0; width:100%; overflow:hidden }
.project { min-width:68%; transition:transform 0.6s cubic-bezier(.2,.9,.2,1), opacity 0.4s }
.project:not(.active) { opacity:0.45; transform:scale(0.98) }
.project-card { display:flex; gap:1rem; align-items:stretch }
.project-media { width:40%; background-size:cover; background-position:center; border-radius:12px }
.project-body { padding:0.5rem }
.carousel-nav { background:none; border:none; font-size:2rem; cursor:pointer; padding:0.4rem }

/* contact */
.contact-grid { display:grid; grid-template-columns: 1fr 320px; gap:1rem }
.contact-form label { display:block; margin-bottom:0.6rem }
.contact-form input, .contact-form textarea { width:100%; padding:0.6rem; border-radius:8px; border:none; background:rgba(255,255,255,0.02) }
.form-actions { display:flex; gap:0.6rem; margin-top:0.6rem }
.status { margin-top:0.6rem }

/* footer */
.site-footer { padding:2rem 0; text-align:center }
.footer-inner { display:flex; justify-content:space-between; gap:1rem; align-items:center }
.small { opacity:0.6; font-size:0.85rem }

/* responsive */
@media (max-width: 900px) {
  .hero { grid-template-columns: 1fr; }
  .hero-right { order:-1 }
  .about-grid { grid-template-columns: 1fr }
  .skill-grid { grid-template-columns: 1fr }
  .contact-grid { grid-template-columns: 1fr }
  .nav-links { display:none }
  .hamburger { display:block }
  .project { min-width:88% }
}

/* 动画 */
@keyframes floaty { 0%{transform:translateY(0)} 50%{transform:translateY(-8px)} 100%{transform:translateY(0)} }
.widget { animation: floaty 6s ease-in-out infinite }

/* 微交互 focus */
button:focus, a:focus, input:focus { outline:3px solid rgba(59,130,246,0.18); outline-offset:3px }
</style>
