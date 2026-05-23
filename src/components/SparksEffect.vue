<template>
  <div class="sparks-container">
    <!-- The intense central cutting flash -->
    <div class="cutting-flash"></div>
    <div class="cutting-flash-core"></div>

    <!-- Emitter: Sparks will originate from here -->
    <div
      v-for="n in sparkCount"
      :key="n"
      class="spark"
      :style="getSparkStyle(n)"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'SparksEffect',
  setup() {
    const sparkCount = 80; // Doubled the amount of sparks for high intensity
    
    const getSparkStyle = (n) => {
      // Much faster sparks to simulate high RPM cutting
      const duration = 0.3 + Math.random() * 0.8; // 0.3s to 1.1s
      const delay = Math.random() * 2; // Tighter staggering
      
      // Arc: Sparks shoot out horizontally and downwards, mostly to the sides
      // We will spray them out in a wider, more aggressive arc
      const angle = (Math.random() * 160 + 10) * (Math.PI / 180);
      
      // Shoot much further away
      const distance = Math.random() * 600 + 200; 
      
      const tx = Math.cos(angle) * distance;
      // Heavy gravity effect, pushing them down fast
      const ty = Math.sin(angle) * distance + 400; 
      
      // Intense, long streaks of sparks
      const size = 1 + Math.random() * 3;
      const length = size * (8 + Math.random() * 10);
      
      const rotation = Math.atan2(ty, tx) * (180 / Math.PI) + 90;

      return {
        width: `${size}px`,
        height: `${length}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        '--tx': `${tx}px`,
        '--ty': `${ty}px`,
        transform: `rotate(${rotation}deg)`,
        opacity: 0
      }
    }

    return { sparkCount, getSparkStyle }
  }
}
</script>

<style scoped>
.sparks-container {
  position: absolute;
  top: 15%;
  left: 50%;
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 0;
}

/* Pulsating cutting flash */
.cutting-flash {
  position: absolute;
  top: -20px;
  left: -20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,183,3,0.4) 40%, rgba(251,133,0,0) 70%);
  animation: pulse-flash 0.1s infinite alternate;
  box-shadow: 0 0 50px 20px rgba(255, 183, 3, 0.3);
}

.cutting-flash-core {
  position: absolute;
  top: -5px;
  left: -5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 10px white, 0 0 20px #ffb703;
  animation: pulse-core 0.05s infinite alternate;
}

.spark {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff; /* Super hot white core */
  border-radius: 4px;
  /* Aggressive bright orange/yellow glow */
  box-shadow: 0 0 4px #fff, 0 0 8px #ffb703, 0 0 15px #fb8500, 0 0 25px #e85d04;
  animation-name: spark-shoot;
  animation-timing-function: cubic-bezier(0.1, 0.8, 0.3, 1); /* Explosive start */
  animation-iteration-count: infinite;
}

@keyframes spark-shoot {
  0% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    opacity: 1;
  }
  15% {
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx), var(--ty)) scale(0);
    opacity: 0;
  }
}

@keyframes pulse-flash {
  0% { transform: scale(0.8); opacity: 0.6; }
  100% { transform: scale(1.5); opacity: 1; }
}

@keyframes pulse-core {
  0% { transform: scale(0.9); opacity: 0.8; }
  100% { transform: scale(1.2); opacity: 1; }
}
</style>
