<template>
  <div class="min-h-screen w-full bg-[#07070a] text-white font-sans relative overflow-x-hidden">
    <!-- Background glows (cyberpunk) -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute -top-[8%] -left-[8%] w-[380px] h-[380px] bg-purple-600/30 rounded-full blur-[100px] animate-pulse"></div>
      <div class="absolute top-[18%] -right-[6%] w-[320px] h-[320px] bg-blue-600/20 rounded-full blur-[90px] animate-bounce-slow"></div>
      <div class="absolute -bottom-[8%] left-[16%] w-[520px] h-[520px] bg-pink-600/15 rounded-full blur-[140px]"></div>
    </div>

    <main class="relative z-10 container mx-auto px-5 py-8 md:py-14 lg:py-20">
      <header class="text-center mb-10 md:mb-14">
        <div class="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider uppercase border border-white/20 rounded-full bg-white/5 backdrop-blur-md">
          未来趋势 — THD 实验室
        </div>
        <h1 class="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-3 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          趋势分析仪表盘
        </h1>

      </header>

      <!-- Controls: Tabs  activeTab = tab  -->
      <div class="flex justify-center mb-8">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="clickTab(tab)"
          :class="[ 'px-4 py-2 rounded-full mr-3 text-sm md:text-base font-semibold transition-all', activeTab === tab ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg' : 'bg-white/5 text-gray-300 border border-white/5 hover:bg-white/8' ]"
        >
          {{ tab }}
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left column: modules list -->
        <section class="lg:col-span-1 order-2 lg:order-1">
          <div class="grid grid-cols-1 gap-4">
            <template v-if="activeTab === '金融'">
              <div
                v-for="(m, idx) in financeModules"
                :key="m.key"
                @click="selectModule(m.key)"
                :class="[ 'relative p-5 rounded-2xl cursor-pointer transition-transform duration-300', selectedModule === m.key ? 'bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/10 shadow-[0_10px_30px_rgba(79,70,229,0.18)]' : 'bg-white/5 border border-white/6 hover:translate-y-[-6px]' ]"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-xl font-bold mb-1 flex items-center">
                      <span class="mr-3 text-2xl">{{ m.icon }}</span>
                      <span>{{ m.title }}</span>
                    </div>
                    <p class="text-gray-400 text-sm">{{ m.desc }}</p>
                  </div>
                  <div class="text-cyan-400 font-semibold text-sm">查看 →</div>
                </div>
              </div>
            </template>

            <template v-else>
              <div
                v-for="(m, idx) in frontendModules"
                :key="m.key"
                @click="selectModule(m.key)"
                :class="[ 'relative p-5 rounded-2xl cursor-pointer transition-transform duration-300', selectedModule === m.key ? 'bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/10 shadow-[0_10px_30px_rgba(79,70,229,0.18)]' : 'bg-white/5 border border-white/6 hover:translate-y-[-6px]' ]"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-xl font-bold mb-1 flex items-center">
                      <span class="mr-3 text-2xl">{{ m.icon }}</span>
                      <span>{{ m.title }}</span>
                    </div>
                    <p class="text-gray-400 text-sm">{{ m.desc }}</p>
                  </div>
                  <div class="text-cyan-400 font-semibold text-sm">查看 →</div>
                </div>
              </div>
            </template>
          </div>

          <!-- quick actions -->
          <!-- <div class="mt-6 p-4 rounded-xl bg-white/3 border border-white/5 text-gray-300 text-sm">
            <div class="font-medium mb-2">快速操作</div>
            <div class="flex flex-wrap gap-2">
              <button class="px-3 py-1 rounded-md bg-white/5 hover:bg-white/10">导出数据</button>
              <button class="px-3 py-1 rounded-md bg-white/5 hover:bg-white/10" @click="resetView">重置视图</button>
              <button class="px-3 py-1 rounded-md bg-white/5 hover:bg-white/10" @click="toggleRealtime">{{ realtime ? '关闭实时' : '开启实时' }}</button>
            </div>
          </div> -->
        </section>

        <!-- Middle & Right: details & charts -->
        <section class="lg:col-span-2 order-1 lg:order-2">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Big card: selected item details -->
            <div class="col-span-1 md:col-span-2 p-6 rounded-2xl bg-white/6 border border-white/6">
              <div class="flex items-start justify-between">
                <div>
                  <div class="text-sm text-gray-400">模块</div>
                  <h2 class="text-2xl md:text-3xl font-bold mt-1">{{ currentDetail.title }}</h2>
                  <p class="text-gray-300 mt-2 text-sm md:text-base max-w-2xl">{{ currentDetail.summary }}</p>
                </div>
                <div class="text-right">
                  <div class="text-xs text-gray-400">最后更新</div>
                  <div class="font-semibold">{{ lastUpdated }}</div>
                </div>
              </div>

              <div class="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="p-4 rounded-lg bg-white/5">
                  <div class="text-xs text-gray-400">当前指数</div>
                  <div class="text-2xl font-bold mt-1">{{ currentMetrics.index }}</div>
                  <div class="text-sm text-gray-400 mt-1">变化：{{ currentMetrics.change }}</div>
                </div>
                <div class="p-4 rounded-lg bg-white/5">
                  <div class="text-xs text-gray-400">短期方向 (3-6m)</div>
                  <div class="text-2xl font-bold mt-1">{{ currentMetrics.shortTerm }}</div>
                  <div class="text-sm text-gray-400 mt-1">置信度：{{ currentMetrics.shortConf }}%</div>
                </div>
                <div class="p-4 rounded-lg bg-white/5">
                  <div class="text-xs text-gray-400">中期方向 (6-18m)</div>
                  <div class="text-2xl font-bold mt-1">{{ currentMetrics.midTerm }}</div>
                  <div class="text-sm text-gray-400 mt-1">置信度：{{ currentMetrics.midConf }}%</div>
                </div>
              </div>

              <!-- simple svg chart (placeholder) -->
              <div class="mt-6">
                <svg class="w-full h-36 md:h-48" viewBox="0 0 100 30" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline :points="chartPath" fill="none" stroke="url(#g)" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" />
                  <defs>
                    <linearGradient id="g" x1="0" x2="1">
                      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.9" />
                      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0.9" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                <div>
                  <div class="font-medium mb-1">关键驱动因素</div>
                  <ul class="list-disc list-inside text-gray-400 leading-6">
                    <li v-for="(f, i) in currentDetail.drivers" :key="i">{{ f }}</li>
                  </ul>
                </div>
                <div>
                  <div class="font-medium mb-1">风险提示</div>
                  <ul class="list-disc list-inside text-gray-400 leading-6">
                    <li v-for="(r, i) in currentDetail.risks" :key="i">{{ r }}</li>
                  </ul>
                </div>
                <div>
                  <div class="font-medium mb-1">策略建议</div>
                  <ol class="list-decimal list-inside text-gray-400 leading-6">
                    <li v-for="(s, i) in currentDetail.advice" :key="i">{{ s }}</li>
                  </ol>
                </div>
              </div>
            </div>

            <!-- smaller cards: quick stats or notes -->
            <div class="p-4 rounded-2xl bg-white/5 border border-white/6">
              <div class="text-sm text-gray-400">简要结论</div>
              <div class="text-lg font-semibold mt-2">{{ currentDetail.conclusion }}</div>
              <div class="text-xs text-gray-400 mt-3">来源：模拟数据 · 仅供参考</div>
            </div>

            <div class="p-4 rounded-2xl bg-white/5 border border-white/6">
              <div class="text-sm text-gray-400">交互控制</div>
              <div class="mt-3 flex items-center space-x-3">
                <label class="text-sm text-gray-300">时间粒度</label>
                <select v-model="granularity" class="ml-2 bg-white/3 px-2 py-1 rounded-md">
                  <option value="monthly">月</option>
                  <option value="quarterly">季度</option>
                  <option value="yearly">年</option>
                </select>
              </div>

              <div class="mt-3">
                <label class="text-sm text-gray-300">日期</label>
                <input type="date" v-model="selectedDate" class="w-full mt-2 bg-white/5 px-3 py-2 rounded-md" />
              </div>
            </div>

          </div>
        </section>
      </div>

      <footer class="mt-10 text-center text-gray-500 text-xs">
        © THD 实验室 — 本页面使用 WindiCSS 类名（Tailwind 兼容）。
      </footer>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'

// Tabs and modules
const tabs = ['金融', '前端']
const activeTab = ref('金融')

const financeModules = [
    { key: 'recession', title: '经济衰退', desc: '衰退概率、领先指标与政策弹性测算。', icon: '📉' },
  { key: 'house', title: '房价', desc: '全国与热点城市的房价趋势与泡沫风险分析。', icon: '🏠' },
  // { key: 'inflation', title: '通货膨胀', desc: 'CPI、PPI 与商品价格压力。', icon: '💹' },
  { key: 'rates', title: '现金', desc: '央行政策路径与利率曲线。', icon: '🏦' }
]

const frontendModules = [
  { key: 'perf', title: '前端趋势', desc: '前端的讨论已经在ai的时代意义不大了。', icon: '⚡' },
  // { key: 'frameworks', title: '框架热度', desc: '框架生态与招聘市场热度。', icon: '🧩' },
  // { key: 'tools', title: '工具链', desc: '构建工具与工程化趋势。', icon: '🛠️' }
]

const selectedModule = ref('recession')
const realtime = ref(false)
const granularity = ref('monthly')
const selectedDate = ref(new Date().toISOString().slice(0,10))

const lastUpdated = ref(new Date().toLocaleString())

const clickTab = (tab) => {
  activeTab.value = tab;
  if(tab === '金融'){
    selectedModule.value = `recession`
  }else{
    selectedModule.value = `perf`
  }
 
}

// Mock dataset for each module (示例数据，可替换为真实 API 数据)
const mockData = reactive({
  recession: {
    title: '经济衰退 (介于通缩和滞涨之间)',
    summary: 'THD认为底层和中层会进入衰退和滞涨阶段，而顶层则会进入通胀阶段。',
    drivers: ['老龄化', '地方政府负债', '房地产泡沫'],
    risks: ['内外需下行', '金融风险传导'],
    advice: ['请保持资产配置安全', '关注防御性行业'],
    conclusion: '请防御性投资，保持资产配置安全，关注防御性行业。',
    series: [0.244, 0.259, 0.244, 0.229, 0.244, 0.259, 0.244, 0.229, 0.244, 0.259, 0.244, 0.229]
  },
  house: {
    title: '房价 (去泡沫阶段)',
    summary: 'THD认为房价仍处于去泡沫阶段，平均每年百分之10的跌幅。房子已经不是资产，而是负债。',
    drivers: ['利率变化', '住房需求结构', '土地供应政策', '城镇化节奏'],
    risks: ['政策收紧', '信贷收缩', '外部宏观冲击'],
    advice: ['关注城市分化机会', '防范杠杆风险', '持有期拉长策略'],
    conclusion: '极端一点可能会持续下跌30-40年，请做好准备。',
    series: [113, 111, 112, 110, 108, 106, 107, 105, 103, 101, 102, 100]
  },

  // inflation: {
  //   title: '通货膨胀 (示例)',
  //   summary: '食品与能源价格波动是短期脆弱点，中期回归目标区间。',
  //   drivers: ['能源价格', '供给链瓶颈', '工资增长'],
  //   risks: ['输入性冲击', '货币宽松'],
  //   advice: ['关注实物资产对冲', '短期关注情绪指标'],
  //   conclusion: '结构性通胀压力有限，但局部波动频发',
  //   series: [2.1,2.2,2.4,2.6,2.5,2.7,2.9,3.0,2.8,2.6,2.5,2.4]
  // },
  rates: {
    title: '现金',
    summary: 'THD认为rmb会因为通缩、滞涨周期走向升值。',
    drivers: ['货币政策', '通胀预期', '财政融资需求'],
    risks: ['美元指数走低', '通货紧缩'],
    advice: ['分散期限结构风险', '留意利率衍生品对冲'],
    conclusion: '利率仍将围绕通胀与增长博弈',
    series: [3.0,3.05,3.03,3.1,3.08,3.15,3.12,3.2,3.18,3.25,3.22,3.3]
  },
  perf: {
    title: '前端趋势',
    summary: '我认为低中的前端会快速的被ai代替。',
    drivers: ['ai'],
    risks: ['前端被ai后端替代', '前端算法性能优化ai来决定'],
    advice: ['再厉害的算法、性能优化，在ai面前变得毫无意义'],
    conclusion: '没有ai能力的前端会被快速淘汰',
    series: [75,76,78,80,82,83,85,86,87,88,89,90]
  },
  // frameworks: {
  //   title: '框架热度 (示例)',
  //   summary: '框架更迭快，但生态与长期支持决定企业采用。',
  //   drivers: ['社区活跃度', '企业采纳', '学习成本'],
  //   risks: ['碎片化', '安全漏洞'],
  //   advice: ['关注生态稳定性', '选择长期支持的工具链'],
  //   conclusion: '成熟生态优先',
  //   series: [50,52,55,57,60,62,63,65,67,68,70,72]
  // },
  // tools: {
  //   title: '工具链 (示例)',
  //   summary: '构建速度与 DX 是工具链竞争的核心。',
  //   drivers: ['构建速度', '插件生态', '可用性'],
  //   risks: ['碎片化', '兼容性问题'],
  //   advice: ['保持升级并做兼容测试', '模块化迁移策略'],
  //   conclusion: '工具链快速演进但多以兼容与稳定为王',
  //   series: [10,12,14,16,18,20,23,25,28,30,33,35]
  // }
})

// computed for details
const currentDetail = computed(() => mockData[selectedModule.value])

// derived metrics (示例计算：简单统计)
const currentMetrics = computed(() => {
  const s = mockData[selectedModule.value].series || []
  if (!s.length) return { index: '—', change: '—', shortTerm: '—', midTerm: '—', shortConf: 0, midConf: 0 }
  const last = s[s.length - 1]
  const prev = s[s.length - 2] || s[s.length - 1]
  const change = ((last - prev) / Math.abs(prev || 1) * 100).toFixed(2) + '%'
  const shortTrend = last > prev ? '上行' : (last < prev ? '下行' : '平稳')
  const mid = (s.slice(-6).reduce((a,b)=>a+b,0)/Math.max(s.slice(-6).length,1)).toFixed(2)
  const midTrend = mid > s[s.length-7] ? '上行' : '平稳'
  return {
    index: last,
    change,
    shortTerm: shortTrend,
    midTerm: midTrend,
    shortConf: 70,
    midConf: 60
  }
})

// make simple svg path from series
const chartPath = computed(() => {
  const s = mockData[selectedModule.value].series || []
  if (!s.length) return ''
  // normalize to 0-30 in svg viewbox
  const min = Math.min(...s)
  const max = Math.max(...s)
  const range = max - min || 1
  const points = s.map((v,i) => {
    const x = (i / Math.max(s.length - 1,1)) * 100
    const y = 30 - ((v - min) / range) * 28 - 1 // keep margin
    return `${x},${y}`
  })
  return points.join(' ')
})

// lastUpdated auto refresh when module changes
watch(selectedModule, ()=>{
  lastUpdated.value = new Date().toLocaleString()
})

function selectModule(key){
  selectedModule.value = key
}

function resetView(){
  selectedModule.value = activeTab.value === '金融' ? 'house' : 'perf'
  granularity.value = 'monthly'
  selectedDate.value = new Date().toISOString().slice(0,10)
}

function toggleRealtime(){
  realtime.value = !realtime.value
}

// expose for template
const current = { selectedModule, activeTab }

</script>

<style scoped>
@keyframes fade-in-up { from { opacity: 0; transform: translateY(20px);} to{ opacity:1; transform: translateY(0);} }
.animate-fade-in-up { animation: fade-in-up .9s ease-out forwards }

@keyframes bounce { 0%,100%{ transform: translateY(0);} 50%{ transform: translateY(-20px);} }
.animate-bounce-slow { animation: bounce 6s infinite }

/* hide scrollbar but keep scroll */
::-webkit-scrollbar { width: 0; height: 0 }
</style>
