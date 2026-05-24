<template>
  <section class="counters-section py-0">
    <div class="counters-inner">
      <div
        v-for="(stat, i) in stats"
        :key="i"
        class="counter-item"
        :class="{ 'counter-divider': i < stats.length - 1 }"
        v-animate
      >
        <div class="counter-icon">
          <v-icon :color="stat.color" size="22">{{ stat.icon }}</v-icon>
        </div>
        <div class="counter-value">
          <span class="counter-number">{{ stat.display }}</span>
          <span class="counter-suffix">{{ stat.suffix }}</span>
        </div>
        <div class="counter-label">{{ stat.label }}</div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'CountersBar',
  setup() {
    const stats = ref([
      { label: 'Years in Operation',   target: 6,    suffix: '+',   color: 'accent',     icon: 'mdi-calendar-check',         display: '0' },
      { label: 'Max Cutting Diameter', target: 330,  suffix: 'mm',  color: 'secondary',  icon: 'mdi-diameter-outline',       display: '0' },
      { label: 'Industrial Clients',   target: 7,    suffix: '+',   color: 'accent',     icon: 'mdi-handshake-outline',      display: '0' },
      { label: 'Plant Area (Sq. Ft.)', target: 2000, suffix: '',    color: 'secondary',  icon: 'mdi-warehouse',              display: '0' },
      { label: 'Crane Capacity (Ton)', target: 2,    suffix: 'T',   color: 'accent',     icon: 'mdi-crane',                  display: '0' },
    ])

    let animated = false
    let observer = null

    const animateCounters = () => {
      if (animated) return
      animated = true

      stats.value.forEach((stat, i) => {
        const duration = 1800
        const start = performance.now()
        const end = stat.target

        const step = (now) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          // Ease out expo
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
          const current = Math.round(eased * end)
          stat.display = current.toLocaleString()
          if (progress < 1) requestAnimationFrame(step)
        }

        // Stagger each counter slightly
        setTimeout(() => requestAnimationFrame(step), i * 120)
      })
    }

    onMounted(() => {
      const el = document.querySelector('.counters-section')
      observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) animateCounters() },
        { threshold: 0.3 }
      )
      if (el) observer.observe(el)
    })

    onUnmounted(() => observer?.disconnect())

    return { stats }
  }
}
</script>

<style scoped>
.counters-section {
  background: #0b1628;
  border-top: 1px solid rgba(50, 140, 193, 0.2);
  border-bottom: 1px solid rgba(50, 140, 193, 0.2);
}

.counters-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.counter-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 36px;
  flex: 1 1 160px;
  min-width: 140px;
  gap: 6px;
  transition: background 0.3s ease;
}

.counter-item:hover {
  background: rgba(50, 140, 193, 0.06);
}

.counter-divider {
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}

@media (max-width: 600px) {
  .counter-divider {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  .counter-item {
    padding: 28px 20px;
    flex: 1 1 45%;
  }
}

.counter-icon {
  margin-bottom: 4px;
  opacity: 0.8;
}

.counter-value {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.counter-number {
  font-size: 2.4rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
  letter-spacing: -1px;
  font-variant-numeric: tabular-nums;
}

.counter-suffix {
  font-size: 1.1rem;
  font-weight: 700;
  color: rgba(217, 179, 16, 0.9);
  margin-left: 2px;
}

.counter-label {
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.35);
  text-align: center;
  line-height: 1.4;
}
</style>
