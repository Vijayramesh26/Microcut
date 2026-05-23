<template>
  <section id="about" class="py-16 px-4 bg-background">
    <v-container>
      <!-- Section Title -->
      <v-row class="justify-center mb-12">
        <v-col cols="12" class="text-center fade-up" v-animate>
          <span class="text-subtitle-2 font-weight-black text-secondary tracking-widest text-uppercase">Who We Are</span>
          <h2 class="text-h4 text-sm-h3 font-weight-black text-primary mt-2">Refashioning the Machining Industry</h2>
          <v-sheet color="accent" height="4" width="80" class="mx-auto mt-4 rounded-pill"></v-sheet>
        </v-col>
      </v-row>

      <v-row class="align-stretch">
        <!-- Left Side: Company Overview and Stats -->
        <v-col cols="12" lg="6" class="d-flex flex-column justify-space-between">
          <v-card flat class="pa-6 rounded-xl border border-opacity-10 mb-6 bg-surface hover-scale flex-grow-1 d-flex flex-column justify-center fade-right" v-animate style="border-color: rgba(143, 166, 180, 0.2) !important;">
            <div class="d-flex align-center mb-4">
              <v-icon color="secondary" size="32" class="mr-3">mdi-rocket-launch-outline</v-icon>
              <h3 class="text-h5 font-weight-bold text-primary">Microcut Engineering</h3>
            </div>
            <p class="text-body-1 text-grey-darken-1 mb-4 leading-relaxed">
              Taking shape in <strong>2019</strong> to fulfill various precision industrial needs, Team Microcut Engineering represents a modern startup dedicated to refashioning the machining industry &amp; support services in Chennai.
            </p>
            <p class="text-body-1 text-grey-darken-1 leading-relaxed">
              Through enduring dedication, cutting expertise, and the combined strength of our core businesses, we deliver excellence and innovation at every level.
            </p>
          </v-card>

          <!-- Core Attributes Grid -->
          <v-row>
            <v-col cols="12" sm="6">
              <v-card flat class="pa-5 rounded-xl border border-opacity-10 bg-surface hover-scale fill-height d-flex align-center fade-up delay-100" v-animate style="border-color: rgba(143, 166, 180, 0.2) !important;">
                <v-avatar color="rgba(217, 179, 16, 0.1)" class="mr-4" size="48">
                  <v-icon color="accent" size="24">mdi-crane</v-icon>
                </v-avatar>
                <div>
                  <div class="text-subtitle-1 font-weight-bold text-primary">2-Ton Crane</div>
                  <div class="text-caption text-grey-darken-1">Inbuilt heavy material handling facility.</div>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card flat class="pa-5 rounded-xl border border-opacity-10 bg-surface hover-scale fill-height d-flex align-center fade-up delay-200" v-animate style="border-color: rgba(143, 166, 180, 0.2) !important;">
                <v-avatar color="rgba(50, 140, 193, 0.1)" class="mr-4" size="48">
                  <v-icon color="secondary" size="24">mdi-cctv</v-icon>
                </v-avatar>
                <div>
                  <div class="text-subtitle-1 font-weight-bold text-primary">CCTV Monitored</div>
                  <div class="text-caption text-grey-darken-1">Surveillance for raw material assurance.</div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <!-- Right Side: Company Details & Vision Pillars -->
        <v-col cols="12" lg="6" class="d-flex flex-column">
          <!-- Corporate Spec Panel -->
          <v-card flat class="pa-6 rounded-xl bg-primary text-white mb-6 hover-scale fade-left delay-100" v-animate style="position: relative; overflow: hidden;">
            <v-icon size="180" color="rgba(255, 255, 255, 0.03)" style="position: absolute; right: -20px; bottom: -40px; pointer-events: none;">mdi-factory</v-icon>
            
            <h3 class="text-h5 font-weight-bold mb-4 text-accent">Key Company Constituent</h3>
            
            <v-row class="g-3">
              <v-col cols="6" sm="3" class="text-center border-right border-opacity-10">
                <div class="text-h6 font-weight-black">MSME</div>
                <div class="text-caption text-grey-lighten-2 mt-1">Industry Type</div>
              </v-col>
              <v-col cols="6" sm="3" class="text-center border-right border-opacity-10">
                <div class="text-h6 font-weight-black">2019</div>
                <div class="text-caption text-grey-lighten-2 mt-1">Established</div>
              </v-col>
              <v-col cols="6" sm="3" class="text-center border-right border-opacity-10">
                <div class="text-h6 font-weight-black">2000 SQF</div>
                <div class="text-caption text-grey-lighten-2 mt-1">Total Area</div>
              </v-col>
              <v-col cols="6" sm="3" class="text-center">
                <div class="text-h6 font-weight-black text-truncate">Partnership</div>
                <div class="text-caption text-grey-lighten-2 mt-1">Constituent</div>
              </v-col>
            </v-row>
          </v-card>

          <!-- Core Vision Card -->
          <v-card flat class="pa-6 rounded-xl border border-opacity-10 bg-surface hover-scale flex-grow-1 fade-left delay-200" v-animate style="border-color: rgba(143, 166, 180, 0.2) !important;">
            <h3 class="text-h5 font-weight-bold text-primary mb-6 d-flex align-center">
              <v-icon color="accent" class="mr-2">mdi-eye-outline</v-icon>
              Our Vision Pillars
            </h3>

            <div class="d-flex flex-column gap-y-4">
              <div v-for="(pillar, i) in visionPillars" :key="i" class="d-flex align-start">
                <v-avatar color="rgba(50, 140, 193, 0.15)" class="mr-4" size="32" style="margin-top: 2px;">
                  <span class="text-subtitle-2 font-weight-black text-secondary">{{ i + 1 }}</span>
                </v-avatar>
                <div>
                  <h4 class="text-subtitle-1 font-weight-bold text-primary">{{ pillar.title }}</h4>
                  <p class="text-body-2 text-grey-darken-1">{{ pillar.desc }}</p>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'AboutSection',
  setup() {
    const visionPillars = [
      {
        title: 'Addressing the exact need of customer',
        desc: 'We analyze your industrial requirements precisely to perform clean cutting and custom fabrication down to exact tolerances.'
      },
      {
        title: 'Ensure the best service in industry',
        desc: 'Leveraging highly trained personnel and state-of-the-art machinery from Meba and Cosen to ensure top product output.'
      },
      {
        title: 'Dedicated support for each and every customer',
        desc: 'Our partners Mr. Kishore and Mr. Santhosh are personally involved, ensuring 100% responsiveness and clear communications.'
      }
    ]

    return {
      visionPillars
    }
  }
}
</script>

<style scoped>
.leading-relaxed {
  line-height: 1.625;
}

.border-right {
  border-right: 1px solid rgba(255, 255, 255, 0.15);
}

@media (max-width: 600px) {
  .border-right {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    padding-bottom: 12px;
  }
}

.gap-y-4 {
  row-gap: 16px;
}
</style>
