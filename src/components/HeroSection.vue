<template>
  <section
    id="home"
    class="steel-mesh-bg d-flex flex-column justify-center align-center position-relative py-4 px-4"
    style="
      min-height: calc(100vh - 64px);
      border-bottom: 2px solid rgba(143, 166, 180, 0.2);
    "
  >
    <!-- Background Ambient Glow -->
    <div
      style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: 1;
      "
    >
      <div class="ambient-glow bg-secondary"></div>
      <div class="ambient-glow bg-accent left-glow"></div>
      
      <!-- Animated CAD Blueprint Grid -->
      <BlueprintGrid />
    </div>

    <v-container class="position-relative" style="z-index: 2">
      <v-row class="align-center justify-center">
        <!-- Main Text and CTAs -->
        <v-col cols="12" md="10" lg="10" class="text-center text-white">
          <v-chip
            color="accent"
            variant="flat"
            class="mb-6 font-weight-bold px-4 hover-scale py-1"
            size="small"
            style="letter-spacing: 2px"
          >
            ESTABLISHED IN 2019 • MSME REGISTERED
          </v-chip>

          <h1
            class="text-h3 text-sm-h2 text-md-h1 font-weight-black tracking-tight mb-2 line-height-tight"
          >
            Precision Rod Cutting <br />
            <span class="text-accent-gradient">&amp; Machining Services</span>
          </h1>

          <p
            class="text-subtitle-1 text-sm-h6 font-weight-light text-grey-lighten-2 mb-6 mx-auto max-width-xl px-2"
          >
            Providing high-capacity cutting and precision steel machining with
            enduring dedication, modern technology, and MSME-certified quality
            assurance.
          </p>

          <!-- Slogan Display Grid -->
          <v-card
            flat
            color="rgba(21, 31, 50, 0.65)"
            class="border border-opacity-10 rounded-xl px-4 py-2 mb-6 mx-auto max-width-xl glass-card hover-scale"
            style="border-color: rgba(255, 255, 255, 0.15) !important"
          >
            <div
              class="d-flex flex-wrap align-center justify-space-around py-2"
            >
              <div
                v-for="(item, index) in sloganItems"
                :key="index"
                class="d-flex align-center my-1 mx-2"
              >
                <v-icon color="accent" size="18" class="mr-2">{{
                  item.icon
                }}</v-icon>
                <span
                  class="font-weight-medium text-caption text-sm-body-2 tracking-wide text-white"
                  >{{ item.text }}</span
                >
              </div>
            </div>
          </v-card>

          <!-- CTA Buttons -->
          <div
            class="d-flex flex-column flex-sm-row justify-center align-center gap-4"
          >
            <v-btn
              color="accent"
              size="large"
              class="font-weight-black glow-btn text-capitalize px-8 py-3 rounded-lg hover-scale"
              flat
              @click="scrollTo('estimator')"
            >
              <v-icon start>mdi-calculator</v-icon>
              Get Instant Estimate
            </v-btn>

            <v-btn
              variant="outlined"
              color="white"
              size="large"
              class="font-weight-bold text-capitalize px-8 py-3 rounded-lg hover-scale"
              style="border-width: 2px"
              @click="scrollTo('machinery')"
            >
              <v-icon start>mdi-cog-outline</v-icon>
              Explore Machinery
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <!-- Bottom Floating Stats Grid -->
      <v-row class="mt-12 justify-center">
        <v-col
          v-for="(stat, idx) in statItems"
          :key="idx"
          cols="12"
          sm="6"
          md="4"
          class="px-3"
        >
          <v-card
            flat
            class="px-6 py-5 rounded-xl text-center glass-card border border-opacity-10 text-white hover-scale d-flex align-center"
            color="rgba(15, 23, 42, 0.5)"
            style="
              border-color: rgba(255, 255, 255, 0.08) !important;
              min-height: 100px;
            "
          >
            <v-avatar size="48" color="rgba(50, 140, 193, 0.15)" class="mr-4">
              <v-icon :color="stat.iconColor" size="26">{{ stat.icon }}</v-icon>
            </v-avatar>
            <div class="text-left">
              <div
                class="text-caption text-uppercase tracking-wider text-grey-lighten-1 font-weight-medium"
              >
                {{ stat.label }}
              </div>
              <div
                class="text-subtitle-1 font-weight-black text-white line-height-tight mt-1"
              >
                {{ stat.value }}
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import BlueprintGrid from './BlueprintGrid.vue'

export default {
  name: 'HeroSection',
  components: {
    BlueprintGrid
  },
  setup() {
    const sloganItems = [
      { text: "Competitive Price", icon: "mdi-currency-usd" },
      { text: "Best Service", icon: "mdi-face-agent" },
      { text: "On-Time Delivery", icon: "mdi-truck-delivery-outline" },
      { text: "Customer Satisfaction", icon: "mdi-thumb-up-outline" },
    ];

    const statItems = [
      {
        label: "Cutting Capacity",
        value: "Up to 330mm Diameter",
        icon: "mdi-axis-z-rotate-clockwise",
        iconColor: "accent",
      },
      {
        label: "Industrial Facility",
        value: "2000 Sq. Ft. SIDCO Plant",
        icon: "mdi-factory",
        iconColor: "secondary",
      },
      {
        label: "Material Handling",
        value: "Inbuilt 2-Ton Crane Facility",
        icon: "mdi-crane",
        iconColor: "accent",
      },
    ];

    const scrollTo = (targetId) => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    return {
      sloganItems,
      statItems,
      scrollTo,
    };
  },
};
</script>

<style scoped>
.line-height-tight {
  line-height: 1.15;
}

.text-accent-gradient {
  background: linear-gradient(
    to right,
    rgb(var(--v-theme-accent)) 0%,
    #ff8e53 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.max-width-xl {
  max-width: 680px;
}

.gap-4 {
  gap: 16px;
}

/* Glassmorphic Background Blur Card */
.glass-card {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Ambient light glow in the background */
.ambient-glow {
  position: absolute;
  top: -15%;
  right: -10%;
  width: 50vw;
  height: 50vw;
  border-radius: 50%;
  opacity: 0.15;
  filter: blur(120px);
  z-index: 1;
  pointer-events: none;
}

.left-glow {
  top: 40%;
  left: -15%;
  opacity: 0.1;
  width: 40vw;
  height: 40vw;
}
</style>
