<template>
  <div v-if="!isDestroyed" class="splash-overlay" :class="{ 'splash-fade-out': !isVisible }">
    <!-- Panning Blueprint CAD Grid Background -->
    <div class="blueprint-bg"></div>
    <div class="blueprint-grid"></div>

    <!-- Outer tech circular scopes -->
    <div class="tech-scope outer"></div>
    <div class="tech-scope middle"></div>
    <div class="tech-scope inner"></div>

    <!-- Floating subtle spark particles inside the background -->
    <div class="ambient-sparks">
      <div v-for="n in 12" :key="n" class="ambient-spark" :style="getAmbientSparkStyle(n)"></div>
    </div>

    <!-- Central Branding Container -->
    <div class="branding-box text-center">
      <!-- 1. The Spinning Gilded Axis Logo Icon -->
      <div class="logo-wrapper mb-6">
        <div class="gilded-circle"></div>
        <v-avatar color="rgba(217, 179, 16, 0.15)" size="80" class="logo-avatar border border-accent">
          <v-icon color="accent" size="48" class="logo-icon">mdi-axis-arrow</v-icon>
        </v-avatar>
      </div>

      <!-- 2. The Sliced/Laser-Cut Text Reveal -->
      <div class="text-reveal-container position-relative mx-auto">
        <!-- Laser horizontal sweep line -->
        <div class="laser-sweep-beam"></div>

        <h1 class="splash-title tracking-widest font-weight-black">
          MICROCUT
        </h1>
        <h2 class="splash-subtitle font-weight-bold tracking-widest text-accent mt-1">
          ENGINEERING
        </h2>
      </div>
    </div>

    <!-- 3. Bottom CNC Telemetry Console & Progress Bar -->
    <div class="telemetry-console font-mono">
      <!-- High-tech metrics strip -->
      <div class="d-flex justify-space-between text-caption text-grey-darken-1 px-4 mb-2 max-width-sm mx-auto">
        <span>[FEED: 450 MM/M]</span>
        <span class="text-accent blinking-text">[LASER ACTIVE]</span>
        <span>[TEMP: 1842°C]</span>
      </div>

      <!-- Progress Line container -->
      <div class="progress-bar-track mx-auto">
        <div class="progress-bar-fill" :style="{ width: progress + '%' }"></div>
        <!-- Glowing laser node tracker -->
        <div class="progress-laser-dot" :style="{ left: progress + '%' }"></div>
      </div>

      <!-- Live Loading telemetry counter -->
      <div class="text-center text-caption text-grey-lighten-1 mt-3 tracking-widest font-weight-bold">
        LOADING PRECISION RIG... <span class="text-accent font-weight-black font-mono">{{ Math.floor(progress) }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'SplashScreen',
  setup() {
    const progress = ref(0)
    const isVisible = ref(true)
    const isDestroyed = ref(false)

    // Generate random layout delays for floating particles
    const getAmbientSparkStyle = (n) => {
      const size = 2 + Math.random() * 3
      const delay = Math.random() * 2
      const duration = 2 + Math.random() * 3
      const left = Math.random() * 100
      const bottom = -10 - Math.random() * 20
      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        bottom: `${bottom}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }
    }

    onMounted(() => {
      // 1. Telemetry Loader count (0 to 100% over 2.4s)
      const duration = 2400
      const stepTime = 24
      const increment = 100 / (duration / stepTime)
      
      const interval = setInterval(() => {
        progress.value += increment
        if (progress.value >= 100) {
          progress.value = 100
          clearInterval(interval)
          
          // 2. Trigger slide-up exit transition at 2.6s
          setTimeout(() => {
            isVisible.value = false
            
            // 3. Fully remove component from DOM after fade-out transition finishes
            setTimeout(() => {
              isDestroyed.value = true
            }, 800)
          }, 200)
        }
      }, stepTime)
    })

    return {
      progress,
      isVisible,
      isDestroyed,
      getAmbientSparkStyle
    }
  }
}
</script>

<style scoped>
/* Core full-screen panel overlay */
.splash-overlay {
  position: fixed;
  inset: 0;
  background-color: #050d18;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: transform 0.8s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.8s ease, filter 0.8s ease;
  will-change: transform, opacity;
}

/* Glassmorphic Slide-Up Dissolve Exit style */
.splash-fade-out {
  transform: translateY(-100%);
  opacity: 0;
  filter: blur(20px);
}

/* Panning grid & blueprints */
.blueprint-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(11, 60, 93, 0.25) 0%, transparent 80%);
  pointer-events: none;
}

.blueprint-grid {
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background-image: 
    linear-gradient(rgba(255, 183, 3, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 183, 3, 0.05) 1px, transparent 1px),
    linear-gradient(rgba(255, 183, 3, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 183, 3, 0.02) 1px, transparent 1px);
  background-size: 80px 80px, 80px 80px, 20px 20px, 20px 20px;
  background-position: center;
  pointer-events: none;
  animation: pan-grid 60s linear infinite;
  opacity: 0.8;
}

@keyframes pan-grid {
  0% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(80px, 80px) rotate(1deg); }
}

/* CAD circular scopes */
.tech-scope {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border: 1px dashed rgba(255, 183, 3, 0.15);
  pointer-events: none;
}

.outer {
  width: 600px;
  height: 600px;
  animation: rotate-clockwise 45s linear infinite;
}

.middle {
  width: 440px;
  height: 440px;
  border-style: solid;
  border-color: rgba(143, 166, 180, 0.06);
  animation: rotate-counter-clockwise 30s linear infinite;
}

.inner {
  width: 280px;
  height: 280px;
}

@keyframes rotate-clockwise {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes rotate-counter-clockwise {
  0% { transform: translate(-50%, -50%) rotate(360deg); }
  100% { transform: translate(-50%, -50%) rotate(0deg); }
}

/* Central branding card */
.branding-box {
  position: relative;
  z-index: 5;
}

/* 1. Gilded Axis Logo Icon CSS Animation */
.logo-wrapper {
  position: relative;
  display: inline-block;
  animation: logo-pop 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.logo-avatar {
  background: rgba(8, 20, 32, 0.9) !important;
  box-shadow: 0 0 30px rgba(217, 179, 16, 0.25);
  z-index: 2;
}

.logo-icon {
  animation: logo-spin 1.2s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}

.gilded-circle {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  border: 1px solid rgba(217, 179, 16, 0.4);
  box-shadow: 0 0 15px rgba(217, 179, 16, 0.15);
  animation: pulse-ring 2.5s infinite alternate;
  pointer-events: none;
}

@keyframes logo-pop {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes logo-spin {
  0% { transform: rotate(-240deg); }
  100% { transform: rotate(0deg); }
}

@keyframes pulse-ring {
  0% { transform: scale(0.96); opacity: 0.4; }
  100% { transform: scale(1.04); opacity: 0.95; }
}

/* 2. Slicing laser line & horizontal text reveal clip-path */
.text-reveal-container {
  overflow: visible;
  padding: 10px 30px;
  max-width: 500px;
}

.splash-title {
  font-size: clamp(2.2rem, 6vw, 3.8rem);
  letter-spacing: 12px !important;
  color: #ffffff;
  background: linear-gradient(135deg, #ffffff 0%, #cfd8dc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
  text-shadow: 0 0 40px rgba(255, 255, 255, 0.1);
  animation: reveal-text-clip 1.6s cubic-bezier(0.4, 0, 0.2, 1) 0.6s forwards;
  clip-path: inset(0 100% 0 0); /* starts fully hidden */
}

.splash-subtitle {
  font-size: clamp(0.7rem, 2vw, 1rem);
  letter-spacing: 9px !important;
  animation: fade-subtitle 1s ease-out 1.8s forwards;
  opacity: 0;
}

/* Glowing vertical CNC cutting beam line */
.laser-sweep-beam {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #ffb703;
  box-shadow: 0 0 15px 4px #ffb703, 0 0 30px 8px #fb8500, 0 0 50px 12px #e85d04;
  animation: sweep-laser-line 1.6s cubic-bezier(0.4, 0, 0.2, 1) 0.6s forwards;
  opacity: 0;
  pointer-events: none;
  z-index: 10;
}

@keyframes sweep-laser-line {
  0% { left: 0%; opacity: 0; }
  10% { left: 0%; opacity: 1; }
  90% { left: 100%; opacity: 1; }
  100% { left: 100%; opacity: 0; }
}

@keyframes reveal-text-clip {
  0% { clip-path: inset(0 100% 0 0); }
  100% { clip-path: inset(0 0 0 0); }
}

@keyframes fade-subtitle {
  0% { opacity: 0; transform: translateY(5px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* 3. Bottom CNC Telemetry Console styles */
.telemetry-console {
  position: absolute;
  bottom: 8%;
  left: 0;
  right: 0;
  z-index: 5;
  width: 100%;
}

.progress-bar-track {
  position: relative;
  width: 80%;
  max-width: 380px;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  overflow: visible;
  border: 1px solid rgba(255,255,255,0.03);
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffb703 0%, #fb8500 100%);
  box-shadow: 0 0 10px rgba(255, 183, 3, 0.6);
  border-radius: 10px;
  width: 0;
  transition: width 0.08s linear;
}

.progress-laser-dot {
  position: absolute;
  top: 50%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 8px 3px #ffb703;
  transform: translate(-50%, -50%);
  transition: left 0.08s linear;
  pointer-events: none;
}

.max-width-sm {
  max-width: 380px;
}

.blinking-text {
  animation: text-blink 1s steps(2, start) infinite;
}

@keyframes text-blink {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

/* 4. Ambient Spark Particles inside overlay */
.ambient-sparks {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.ambient-spark {
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 6px #ffb703, 0 0 12px #fb8500;
  opacity: 0;
  animation: spark-float 3s infinite linear;
}

@keyframes spark-float {
  0% { transform: translateY(0) scale(0.2); opacity: 0; }
  20% { opacity: 0.8; }
  80% { opacity: 0.8; }
  100% { transform: translateY(-300px) scale(0); opacity: 0; }
}

/* =========================================
   Premium Light Theme Blueprint Overrides
   ========================================= */
.v-theme--light .splash-overlay {
  background-color: #F4F7FA !important;
}

.v-theme--light .blueprint-bg {
  background: radial-gradient(circle at center, rgba(11, 60, 93, 0.15) 0%, transparent 80%) !important;
}

.v-theme--light .blueprint-grid {
  background-image: 
    linear-gradient(rgba(11, 60, 93, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(11, 60, 93, 0.04) 1px, transparent 1px),
    linear-gradient(rgba(11, 60, 93, 0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(11, 60, 93, 0.015) 1px, transparent 1px) !important;
  opacity: 0.9 !important;
}

.v-theme--light .tech-scope {
  border-color: rgba(11, 60, 93, 0.08) !important;
}

.v-theme--light .middle {
  border-color: rgba(11, 60, 93, 0.04) !important;
}

.v-theme--light .gilded-circle {
  border-color: rgba(11, 60, 93, 0.2) !important;
  box-shadow: 0 0 15px rgba(11, 60, 93, 0.08) !important;
}

.v-theme--light .logo-avatar {
  background: #0B3C5D !important;
  border-color: #D9B310 !important;
  box-shadow: 0 0 30px rgba(11, 60, 93, 0.15) !important;
}

.v-theme--light .logo-icon {
  color: #D9B310 !important;
}

.v-theme--light .splash-title {
  background: linear-gradient(135deg, #0B3C5D 0%, #1A2332 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  text-shadow: 0 0 40px rgba(11, 60, 93, 0.1) !important;
}

.v-theme--light .splash-subtitle {
  color: #D9B310 !important;
}

.v-theme--light .telemetry-console :deep(.text-grey-darken-1),
.v-theme--light .telemetry-console span:not(.text-accent) {
  color: #4A5A6A !important;
}

.v-theme--light .progress-bar-track {
  background-color: rgba(11, 60, 93, 0.08) !important;
  border-color: rgba(11, 60, 93, 0.04) !important;
}

.v-theme--light .progress-laser-dot {
  background-color: #0B3C5D !important;
  box-shadow: 0 0 8px 3px rgba(11, 60, 93, 0.3) !important;
}

.v-theme--light .telemetry-console .text-grey-lighten-1 {
  color: #0B3C5D !important;
}

.v-theme--light .ambient-spark {
  background-color: #328CC1 !important;
  box-shadow: 0 0 6px rgba(11, 60, 93, 0.25), 0 0 12px rgba(50, 140, 193, 0.15) !important;
}
</style>
