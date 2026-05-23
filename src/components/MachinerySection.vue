<template>
  <section id="machinery" class="py-16 px-4 bg-background">
    <v-container>
      <!-- Section Header -->
      <v-row class="justify-center mb-12">
        <v-col cols="12" class="text-center fade-up" v-animate>
          <span class="text-subtitle-2 font-weight-black text-secondary tracking-widest text-uppercase">Infrastructure</span>
          <h2 class="text-h4 text-sm-h3 font-weight-black text-primary mt-2">Machinery &amp; Capacities</h2>
          <v-sheet color="accent" height="4" width="80" class="mx-auto mt-4 rounded-pill"></v-sheet>
          <p class="text-body-2 text-grey-darken-1 mt-4 max-width-md mx-auto">
            Equipped with high-performance automatic bandsaws and circular saws capable of precision bundle and high-tolerance rod cuts.
          </p>
        </v-col>
      </v-row>

      <!-- Featured Machine Highlight -->
      <v-row class="mb-12">
        <v-col cols="12">
          <v-card flat class="rounded-2xl border overflow-hidden bg-surface hover-scale fade-up delay-100" v-animate style="border-color: rgba(143, 166, 180, 0.2) !important;">
            <v-row class="align-center g-0">
              <!-- Left side: Gorgeous Image -->
              <v-col cols="12" md="6" class="pa-0">
                <v-img
                  src="/bandsaw.png"
                  height="450"
                  cover
                  alt="High-capacity CNC bandsaw cutting steel"
                  class="position-relative"
                >
                  <div class="overlay-gradient"></div>
                  <!-- Floating Accent Chip -->
                  <v-chip color="accent" variant="flat" class="font-weight-black" style="position: absolute; top: 20px; left: 20px;">
                    FEATURED TECH
                  </v-chip>
                </v-img>
              </v-col>

              <!-- Right side: Technical Specs Details -->
              <v-col cols="12" md="6" class="pa-8 pa-md-12">
                <span class="text-caption font-weight-bold text-secondary text-uppercase tracking-wider">Heavy-Duty Cutting</span>
                <h3 class="text-h4 font-weight-black text-primary mt-1 mb-4">Automatic Bundle Cutting</h3>
                <p class="text-body-1 text-grey-darken-1 mb-6">
                  Our shop floor boasts German and Taiwanese-engineered heavy bundle cutting bandsaw machines. These workhorses leverage variable-frequency blade drives and specialized hydraulic clamping grids to perform continuous, clean vertical cuts on heavy steel bundles with minimum tolerances.
                </p>

                <div class="d-flex flex-wrap gap-4 mb-6">
                  <div class="d-flex align-center">
                    <v-icon color="accent" class="mr-2" size="20">mdi-diameter-outline</v-icon>
                    <span class="text-body-2 font-weight-bold text-primary">Max capacity: 330mm Dia</span>
                  </div>
                  <div class="d-flex align-center">
                    <v-icon color="accent" class="mr-2" size="20">mdi-sync</v-icon>
                    <span class="text-body-2 font-weight-bold text-primary">Fully Automatic Cycles</span>
                  </div>
                </div>

                <v-btn color="primary" class="font-weight-bold text-capitalize px-6 py-2 rounded-lg" @click="scrollTo('estimator')">
                  <v-icon start>mdi-calculator</v-icon>
                  Estimate Cutting Job
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!-- Machinery Portfolio Grid -->
      <v-row>
        <v-col
          v-for="(machine, idx) in machines"
          :key="machine.sl"
          cols="12"
          sm="6"
          lg="3"
          class="d-flex"
        >
          <v-card flat :class="['pa-6 rounded-xl border bg-surface hover-scale flex-grow-1 d-flex flex-column justify-space-between fade-up', 'delay-' + ((idx % 4) + 1) * 100]" v-animate style="border-color: rgba(143, 166, 180, 0.2) !important;">
            <div>
              <div class="d-flex align-center justify-space-between mb-4">
                <v-avatar :color="machine.color" size="44">
                  <v-icon color="white" size="22">{{ machine.icon }}</v-icon>
                </v-avatar>
                <v-chip color="secondary" variant="outlined" size="small" class="font-weight-black">
                  {{ machine.qty }}
                </v-chip>
              </div>

              <div class="text-caption text-secondary font-weight-bold tracking-wider text-uppercase">Make: {{ machine.make }}</div>
              <h4 class="text-h6 font-weight-black text-primary my-2 leading-tight">{{ machine.name }}</h4>
              
              <v-divider class="my-3" style="opacity: 0.5;"></v-divider>

              <v-list dense class="pa-0 bg-transparent">
                <v-list-item class="px-0 py-1" v-for="(spec, idx) in machine.specs" :key="idx">
                  <template v-slot:prepend>
                    <v-icon color="accent" size="16" class="mr-2">mdi-circle-medium</v-icon>
                  </template>
                  <v-list-item-title class="text-caption text-grey-darken-2 font-weight-medium">
                    {{ spec }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </div>

            <div class="mt-6">
              <v-chip color="primary" variant="flat" size="small" class="font-weight-black w-100 justify-center">
                {{ machine.specLabel }}
              </v-chip>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'MachinerySection',
  setup() {
    const machines = [
      {
        sl: 1,
        name: 'Automatic Bundle Bandsaw',
        make: 'Cosen (Taiwan)',
        qty: '1 No.',
        specLabel: 'Up to 300mm Dia',
        color: 'primary',
        icon: 'mdi-layers-outline',
        specs: [
          'Dual column stability design',
          'Heavy bundle clamping grids',
          'Blade speed VFD controller',
          'Smart auto-feed mechanisms'
        ]
      },
      {
        sl: 2,
        name: 'Automatic Bundle Bandsaw',
        make: 'Meba (Germany)',
        qty: '1 No.',
        specLabel: 'Up to 330mm Dia',
        color: 'secondary',
        icon: 'mdi-vector-combine',
        specs: [
          'High precision German blades',
          'Max capacity 330mm round',
          'Laser guide positioning line',
          'Auto chip removal system'
        ]
      },
      {
        sl: 3,
        name: 'Automatic Cutting Machine',
        make: 'Accuratesaw',
        qty: '1 No.',
        specLabel: 'Up to 250mm Dia',
        color: 'accent',
        icon: 'mdi-border-color',
        specs: [
          'Optimized for single rod cuts',
          'High cutting speed ratios',
          'Pre-set digital cut lengths',
          'Hydraulic tension control'
        ]
      },
      {
        sl: 4,
        name: 'Automatic Circular Saw',
        make: 'Zeal Tech Automation',
        qty: '1 No.',
        specLabel: 'Up to 80mm Dia',
        color: 'success',
        icon: 'mdi-record-circle-outline',
        specs: [
          'Ultra-fast cycle times',
          'TCT carbide tipped blades',
          'Ideal for high-volume rods',
          'Extreme cut edge smoothness'
        ]
      }
    ]

    const scrollTo = (targetId) => {
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }

    return {
      machines,
      scrollTo
    }
  }
}
</script>

<style scoped>
.leading-tight {
  line-height: 1.25;
}

.gap-4 {
  gap: 16px;
}

.overlay-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(11, 60, 93, 0.4) 0%, rgba(21, 31, 50, 0.1) 100%);
  pointer-events: none;
}
</style>
