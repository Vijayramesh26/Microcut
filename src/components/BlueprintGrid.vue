<template>
  <div class="blueprint-container">
    <!-- The panning grid background -->
    <div class="blueprint-grid"></div>
    
    <!-- Technical CAD graphics overlay -->
    <div class="tech-graphic graphic-1">
      <div class="tech-circle border-dashed"></div>
      <div class="tech-circle border-solid"></div>
      <div class="tech-crosshair-h"></div>
      <div class="tech-crosshair-v"></div>
    </div>

    <div class="tech-graphic graphic-2">
      <div class="tech-circle border-dashed"></div>
      <div class="tech-circle border-solid-thick"></div>
      <div class="tech-crosshair-h"></div>
      <div class="tech-crosshair-v"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlueprintGrid'
}
</script>

<style scoped>
.blueprint-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  opacity: 0.8;
  pointer-events: none;
}

/* 
  Creates a standard engineering blueprint grid.
  Uses multiple linear-gradients:
  - Major grid lines every 100px
  - Minor grid lines every 20px
*/
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
  background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
  background-position: -1px -1px, -1px -1px, -1px -1px, -1px -1px;
  animation: pan-grid 40s linear infinite;
}

/* Slowly pan the grid diagonally to simulate motion through space */
@keyframes pan-grid {
  0% { transform: translate(0, 0); }
  100% { transform: translate(100px, 100px); }
}

/* Abstract CAD technical drawings */
.tech-graphic {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.4;
}

.graphic-1 {
  top: 15%;
  left: -5%;
  width: 400px;
  height: 400px;
  animation: rotate-slow 60s linear infinite;
}

.graphic-2 {
  bottom: -10%;
  right: 5%;
  width: 600px;
  height: 600px;
  animation: rotate-slow-reverse 90s linear infinite;
  opacity: 0.2;
}

.tech-circle {
  position: absolute;
  border-radius: 50%;
}

.border-dashed {
  width: 80%;
  height: 80%;
  border: 1px dashed rgba(255, 183, 3, 0.25);
}

.border-solid {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(143, 166, 180, 0.6);
}

.border-solid-thick {
  width: 100%;
  height: 100%;
  border: 2px solid rgba(143, 166, 180, 0.5);
}

.tech-crosshair-h {
  position: absolute;
  width: 120%;
  height: 1px;
  background-color: rgba(255, 183, 3, 0.3);
}

.tech-crosshair-v {
  position: absolute;
  width: 1px;
  height: 120%;
  background-color: rgba(255, 183, 3, 0.3);
}

@keyframes rotate-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes rotate-slow-reverse {
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
}
</style>
