<template>
  <section
    id="home"
    class="steel-mesh-bg d-flex flex-column justify-center align-center position-relative"
    style="min-height: calc(100vh - 64px);"
  >
    <!-- Background Ambient Glow (moves with mouse) -->
    <div style="position: absolute; inset: 0; pointer-events: none; z-index: 1;">
      <div id="hero-glow-right" class="ambient-glow glow-right"></div>
      <div id="hero-glow-left"  class="ambient-glow glow-left"></div>
      <div style="overflow: hidden; position: absolute; inset: 0;">
        <BlueprintGrid />
      </div>
    </div>

    <v-container class="position-relative text-center text-white" style="z-index: 2; max-width: 860px;">

      <!-- Live status pill -->
      <div class="live-pill mb-8 mx-auto">
        <span class="live-dot"></span>
        <span>Serving 7+ Industrial Clients in Chennai</span>
      </div>

      <!-- Headline with typewriter -->
      <h1 class="hero-headline mb-3">
        We Cut
        <span class="typewriter-wrap">
          <span class="typewriter-text">{{ displayText }}</span><span class="cursor" :class="{ blink: !isTyping }">|</span>
        </span>
      </h1>

      <h2 class="hero-headline-sub mb-8">
        with <span class="text-accent-gradient">Precision</span>
      </h2>

      <!-- One-line descriptor -->
      <p class="hero-sub mb-10">
        Automatic bandsaw cutting up to 330mm diameter — built for industrial scale.
      </p>

      <!-- CTA Buttons -->
      <div class="d-flex flex-column flex-sm-row justify-center align-center" style="gap: 16px;">
        <v-btn
          color="accent"
          size="large"
          class="font-weight-black text-capitalize px-10 rounded-lg glow-btn"
          flat
          @click="scrollTo('estimator')"
        >
          Get Estimate
        </v-btn>
        <v-btn
          variant="outlined"
          color="white"
          size="large"
          class="font-weight-bold text-capitalize px-10 rounded-lg"
          style="border-width: 1.5px; opacity: 0.85;"
          @click="scrollTo('machinery')"
        >
          Explore Machinery
        </v-btn>
      </div>

      <!-- Trust badges row -->
      <div class="trust-row mt-10">
        <div class="trust-badge" v-for="badge in trustBadges" :key="badge.text">
          <v-icon size="14" style="opacity:0.6; margin-right:5px;">{{ badge.icon }}</v-icon>
          <span>{{ badge.text }}</span>
        </div>
      </div>

      <!-- Subtle scroll hint -->
      <div class="scroll-hint mt-10">
        <v-icon color="white" style="opacity: 0.3;" size="20">mdi-chevron-down</v-icon>
      </div>

    </v-container>

    <!-- Scrolling Marquee Ticker Strip -->
    <div class="ticker-wrap">
      <div class="ticker-track">
        <span class="ticker-item" v-for="(item, i) in [...tickerItems, ...tickerItems]" :key="i">
          <span class="ticker-dot">◆</span>
          {{ item }}
        </span>
      </div>
    </div>

  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import BlueprintGrid from './BlueprintGrid.vue'

export default {
  name: 'HeroSection',
  components: { BlueprintGrid },
  setup() {

    // ── Typewriter ──────────────────────────────────────────────────
    const words = ['Steel Rods', 'Alloy Bars', 'MS Bundles', 'Stainless Steel', 'Bright Bars']
    const displayText = ref('')
    const isTyping   = ref(true)
    let wordIndex = 0, charIndex = 0, deleting = false, typeTimer = null

    const type = () => {
      const current = words[wordIndex]
      if (!deleting) {
        charIndex++
        displayText.value = current.slice(0, charIndex)
        isTyping.value = true
        if (charIndex === current.length) {
          isTyping.value = false; deleting = true
          typeTimer = setTimeout(type, 1800); return
        }
        typeTimer = setTimeout(type, 90)
      } else {
        charIndex--
        displayText.value = current.slice(0, charIndex)
        isTyping.value = true
        if (charIndex === 0) {
          deleting = false
          wordIndex = (wordIndex + 1) % words.length
          typeTimer = setTimeout(type, 300); return
        }
        typeTimer = setTimeout(type, 45)
      }
    }

    // ── Mouse Parallax (simplest reliable approach) ────────────────
    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 80
      const y = (e.clientY / window.innerHeight - 0.5) * 60
      const r = document.getElementById('hero-glow-right')
      const l = document.getElementById('hero-glow-left')
      if (r) r.style.transform = `translate(${x}px, ${y}px)`
      if (l) l.style.transform = `translate(${-x * 0.7}px, ${-y * 0.6}px)`
    }

    // ── Trust badges ─────────────────────────────────────────────────
    const trustBadges = [
      { icon: 'mdi-certificate-outline',   text: 'MSME Certified'       },
      { icon: 'mdi-shield-check-outline',  text: 'Quality Assured'       },
      { icon: 'mdi-truck-delivery-outline',text: 'On-Time Delivery'      },
      { icon: 'mdi-currency-inr',          text: 'Competitive Pricing'   },
    ]

    onMounted(() => {
      typeTimer = setTimeout(type, 600)
      window.addEventListener('mousemove', onMouseMove)
    })
    onUnmounted(() => {
      clearTimeout(typeTimer)
      window.removeEventListener('mousemove', onMouseMove)
    })

    // ── Marquee items ─────────────────────────────────────────
    const tickerItems = [
      'Mild Steel', 'Alloy Steel', 'Stainless Steel', 'Non-Ferrous',
      'Bundle Cutting', 'Precision Cutting', '330mm Capacity',
      'MSME Certified', 'On-Time Delivery', 'Ambattur SIDCO',
      '2-Ton Crane', 'Cosen Bandsaw', 'Meba Germany',
    ]

    const scrollTo = (id) => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return { displayText, isTyping, trustBadges, tickerItems, scrollTo }
  }
}
</script>

<style scoped>
/* ── Live pill ──────────────────────────────────── */
.live-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 999px;
  padding: 6px 18px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: rgba(255,255,255,0.75);
  backdrop-filter: blur(8px);
}
.live-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%  { box-shadow: 0 0 0 0   rgba(34,197,94,0.7); }
  70% { box-shadow: 0 0 0 8px rgba(34,197,94,0);   }
  100%{ box-shadow: 0 0 0 0   rgba(34,197,94,0);   }
}

/* ── Headlines ──────────────────────────────────── */
.hero-headline {
  font-size: clamp(2.8rem, 8vw, 5.5rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -2px;
  margin-bottom: 0;
}
.hero-headline-sub {
  font-size: clamp(2.8rem, 8vw, 5.5rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -2px;
  color: rgba(255,255,255,0.92);
}

/* ── Typewriter ─────────────────────────────────── */
.typewriter-wrap { display: inline; white-space: nowrap; }
.typewriter-text { color: #d9b310; }
.cursor { color: #d9b310; font-weight: 300; margin-left: 2px; }
.cursor.blink { animation: blink-caret 0.85s step-end infinite; }
@keyframes blink-caret { 0%,100%{opacity:1} 50%{opacity:0} }

/* ── Sub ────────────────────────────────────────── */
.hero-sub {
  font-size: 1rem;
  color: rgba(255,255,255,0.5);
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
}

/* ── Gradient text ──────────────────────────────── */
.text-accent-gradient {
  background: linear-gradient(to right, rgb(var(--v-theme-accent)) 0%, #ff8e53 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ── Trust row ──────────────────────────────────── */
.trust-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 24px; }
.trust-badge {
  display: flex; align-items: center;
  font-size: 0.7rem; font-weight: 600;
  letter-spacing: 0.5px;
  color: rgba(255,255,255,0.35);
  text-transform: uppercase;
}

/* ── Ambient glows ──────────────────────────────── */
.ambient-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  /* CSS transition handles the smoothness — no rAF needed */
  transition: transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
}
.glow-right {
  width: 60vw; height: 60vw;
  top: -20%; right: -10%;
  background: radial-gradient(circle, rgba(50,140,193,0.4) 0%, transparent 70%);
}
.glow-left {
  width: 50vw; height: 50vw;
  bottom: -5%; left: -15%;
  background: radial-gradient(circle, rgba(217,179,16,0.3) 0%, transparent 70%);
}

/* ── Scroll hint ────────────────────────────────── */
.scroll-hint { animation: bounce 2.5s ease-in-out infinite; }
@keyframes bounce {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(8px); }
}

/* ── Marquee Ticker ──────────────────────────────── */
.ticker-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  background: rgba(0,0,0,0.25);
  border-top: 1px solid rgba(255,255,255,0.07);
  backdrop-filter: blur(8px);
  z-index: 3;
  padding: 10px 0;
}

.ticker-track {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
}

.ticker-track:hover {
  animation-play-state: paused;
}

.ticker-item {
  white-space: nowrap;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  padding: 0 28px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: color 0.3s;
}

.ticker-item:hover {
  color: rgba(255,255,255,0.85);
}

.ticker-dot {
  color: #d9b310;
  font-size: 0.5rem;
  opacity: 0.7;
}

@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
