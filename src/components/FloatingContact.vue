<template>
  <div class="floating-contact">
    <v-tooltip location="left">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          icon="mdi-whatsapp"
          color="success"
          size="x-large"
          class="elevation-6 glow-btn"
          href="https://wa.me/919677284841?text=Hello%20Microcut%20Engineering,%20I%20would%20like%20to%20inquire%20about%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
        ></v-btn>
      </template>
      <span>Quick WhatsApp Inquiry</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: 'FloatingContact'
}
</script>

<style scoped>
.floating-contact {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 100;
  animation: bounce 2s infinite;
}

.glow-btn {
  box-shadow: 0 0 15px rgba(76, 175, 80, 0.5) !important;
  transition: transform 0.3s ease;
}

.glow-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(76, 175, 80, 0.8) !important;
  animation: none;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
</style>
