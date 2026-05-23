<template>
  <section id="workflow" class="py-16 px-4 bg-surface" style="border-top: 1px solid rgba(143, 166, 180, 0.1);">
    <v-container>
      <!-- Section Header -->
      <v-row class="justify-center mb-12">
        <v-col cols="12" class="text-center fade-up" v-animate>
          <span class="text-subtitle-2 font-weight-black text-secondary tracking-widest text-uppercase">How We Work</span>
          <h2 class="text-h4 text-sm-h3 font-weight-black text-primary mt-2">Our Operational Process</h2>
          <v-sheet color="accent" height="4" width="80" class="mx-auto mt-4 rounded-pill"></v-sheet>
          <p class="text-body-2 text-grey-darken-1 mt-4 max-width-md mx-auto">
            From material receipt to final delivery, our streamlined workflow ensures your raw materials are processed safely, accurately, and delivered on time.
          </p>
        </v-col>
      </v-row>

      <!-- Workflow Timeline -->
      <v-row class="justify-center">
        <v-col cols="12" lg="10">
          <v-timeline align="start" truncate-line="both">
            <v-timeline-item
              v-for="(step, i) in steps"
              :key="i"
              :dot-color="step.color"
              :icon="step.icon"
              fill-dot
              size="large"
            >
              <v-card class="elevation-1 border rounded-lg hover-scale fade-up delay-100" v-animate style="border-color: rgba(143, 166, 180, 0.2) !important;">
                <v-card-title class="text-h6 font-weight-bold text-primary px-4 pt-4 pb-1">
                  {{ i + 1 }}. {{ step.title }}
                </v-card-title>
                <v-card-text class="text-body-2 text-grey-darken-2 px-4 pb-4">
                  {{ step.description }}
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'WorkflowSection',
  setup() {
    const steps = [
      {
        title: 'Material Receipt & Unloading',
        description: 'Client trucks arrive at our SIDCO plant. Using our inbuilt 2-ton overhead crane, we safely and quickly unload large bundles of raw material rods and pipes directly into our staging area.',
        color: 'primary',
        icon: 'mdi-crane'
      },
      {
        title: 'Initial Inspection',
        description: 'Materials are verified against the order challan. We check the material grade, diameter, and confirm the specific cutting lengths and tolerances required by the client before processing.',
        color: 'secondary',
        icon: 'mdi-clipboard-check'
      },
      {
        title: 'Precision Bandsaw Cutting',
        description: 'Rods are fed into our high-speed automatic circular saws. The machines are programmed for exact lengths, ensuring clean, burr-free cuts with high output capacity.',
        color: 'accent',
        icon: 'mdi-saw-blade'
      },
      {
        title: 'Quality Control',
        description: 'Cut pieces undergo random dimensional inspection using Vernier calipers and micrometers to ensure the cut lengths fall perfectly within the required client tolerances.',
        color: 'success',
        icon: 'mdi-shield-check'
      },
      {
        title: 'Dispatch & Delivery',
        description: 'Finished components are neatly bundled, loaded back onto the transport vehicles using our crane, and dispatched securely, fulfilling our promise of On-Time Delivery.',
        color: 'info',
        icon: 'mdi-truck-check'
      }
    ]

    return {
      steps
    }
  }
}
</script>

<style scoped>
.max-width-md {
  max-width: 600px;
}
.hover-scale {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-scale:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.05) !important;
}
</style>
