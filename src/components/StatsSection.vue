  <template>
  <section class="stats-section">
    <!-- Animated background grid lines -->
    <div class="stats-bg-grid"></div>

    <v-container class="position-relative" style="z-index: 2;">
      <v-row class="justify-center">
        <v-col
          v-for="(stat, i) in stats"
          :key="i"
          cols="6"
          md="3"
          class="text-center"
        >
          <div class="stat-card" ref="statCards">
            <div class="stat-icon-wrap">
              <v-icon :color="stat.color" size="28">{{ stat.icon }}</v-icon>
            </div>
            <div class="stat-number">
              <span class="stat-count">{{ stat.displayValue }}</span>
              <span class="stat-suffix">{{ stat.suffix }}</span>
            </div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-sub">{{ stat.sub }}</div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { ref, onMounted, reactive } from 'vue'

export default {
  name: 'StatsSection',
  setup() {
    const statsData = [
      { target: 5, suffix: '+', label: 'Years in Service', sub: 'Est. 2019, Chennai', icon: 'mdi-calendar-check', color: '#d9b310' },
      { target: 7, suffix: '+', label: 'Core Clients', sub: 'Automotive & Forging', icon: 'mdi-account-star', color: '#328CC1' },
      { target: 4, suffix: '', label: 'CNC Machines', sub: 'Meba, Cosen & more', icon: 'mdi-cog-outline', color: '#d9b310' },
      { target: 330, suffix: 'mm', label: 'Max Cut Diameter', sub: 'Bundle cutting capacity', icon: 'mdi-diameter-outline', color: '#328CC1' },
    ]

    const stats = reactive(statsData.map(s => ({ ...s, displayValue: 0 })))

    const animateCounters = () => {
      stats.forEach((stat, i) => {
        const duration = 1800
        const step = stat.target / (duration / 30)
        let current = 0
        const timer = setInterval(() => {
          current += step
          if (current >= stat.target) {
            current = stat.target
            clearInterval(timer)
          }
          stat.displayValue = Math.floor(current)
        }, 30)
      })
    }

    onMounted(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateCounters()
              observer.disconnect()
            }
          })
        },
        { threshold: 0.3 }
      )
      const section = document.querySelector('.stats-section')
      if (section) observer.observe(section)
    })

    return { stats }
  }
}
</script>

<style scoped>
.stats-section {
  position: relative;
  background: linear-gradient(135deg, #0B3C5D 0%, #0a1830 50%, #0B3C5D 100%);
  padding: 64px 16px;
  overflow: hidden;
  border-top: 1px solid rgba(50, 140, 193, 0.3);
  border-bottom: 1px solid rgba(50, 140, 193, 0.3);
}

/* Animated blueprint grid background */
.stats-bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(50, 140, 193, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(50, 140, 193, 0.06) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: gridMove 20s linear infinite;
  pointer-events: none;
}

@keyframes gridMove {
  0% { background-position: 0 0; }
  100% { background-position: 40px 40px; }
}

/* Stat Card */
.stat-card {
  padding: 24px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease;
  cursor: default;
}

.stat-card:hover {
  transform: translateY(-6px);
  background: rgba(50, 140, 193, 0.1);
  border-color: rgba(50, 140, 193, 0.3);
}

.stat-icon-wrap {
  width: 52px;
  height: 52px;
  margin: 0 auto 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-number {
  font-size: 2.8rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
  margin-bottom: 8px;
  letter-spacing: -1px;
}

.stat-suffix {
  font-size: 1.8rem;
  font-weight: 700;
  color: #d9b310;
}

.stat-label {
  font-size: 0.9rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 4px;
  letter-spacing: 0.5px;
}

.stat-sub {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.5px;
}
</style>
