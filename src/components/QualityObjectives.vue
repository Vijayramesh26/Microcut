<template>
  <section id="quality" class="py-16 px-4 bg-surface" style="border-top: 1px solid rgba(143, 166, 180, 0.1); border-bottom: 1px solid rgba(143, 166, 180, 0.1);">
    <v-container>
      <v-row class="align-stretch">
        
        <!-- Left Side: Quality Objectives -->
        <v-col cols="12" md="6" class="d-flex flex-column">
          <v-card flat class="pa-8 rounded-2xl border bg-surface hover-scale flex-grow-1" style="border-color: rgba(143, 166, 180, 0.2) !important;">
            <div class="d-flex align-center mb-6">
              <v-avatar color="rgba(217, 179, 16, 0.15)" size="48" class="mr-4">
                <v-icon color="accent" size="26">mdi-target</v-icon>
              </v-avatar>
              <div>
                <span class="text-caption font-weight-bold text-secondary text-uppercase tracking-wider">Quality Policy</span>
                <h3 class="text-h5 font-weight-black text-primary mt-1">Our Quality Objectives</h3>
              </div>
            </div>

            <p class="text-body-2 text-grey-darken-1 mb-6 leading-relaxed">
              At Microcut Engineering, precision is not just a standard—it is a continuous commitment. We continuously audit our manufacturing cycles and material handling processes to ensure compliance at every level.
            </p>

            <v-list class="bg-transparent pa-0">
              <v-list-item
                v-for="(obj, i) in objectives"
                :key="i"
                class="px-0 py-3 d-flex align-start border-bottom-dashed"
              >
                <template v-slot:prepend>
                  <v-avatar color="primary" class="mr-4" size="28" style="margin-top: 2px;">
                    <span class="text-caption font-weight-black text-white">{{ i + 1 }}</span>
                  </v-avatar>
                </template>
                <div>
                  <h4 class="text-subtitle-1 font-weight-bold text-primary">{{ obj.title }}</h4>
                  <p class="text-body-2 text-grey-darken-1 mt-1">{{ obj.desc }}</p>
                </div>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <!-- Right Side: Strengths -->
        <v-col cols="12" md="6" class="d-flex flex-column">
          <v-card flat class="pa-8 rounded-2xl bg-primary text-white hover-scale flex-grow-1" style="position: relative; overflow: hidden;">
            <!-- Abstract background shape -->
            <v-icon size="200" color="rgba(255, 255, 255, 0.02)" style="position: absolute; right: -40px; top: -40px; pointer-events: none;">mdi-shield-check</v-icon>
            
            <div class="d-flex align-center mb-6">
              <v-avatar color="rgba(255, 255, 255, 0.1)" size="48" class="mr-4">
                <v-icon color="accent" size="26">mdi-medal-outline</v-icon>
              </v-avatar>
              <div>
                <span class="text-caption font-weight-bold text-grey-lighten-2 text-uppercase tracking-wider">Competitive Edges</span>
                <h3 class="text-h5 font-weight-black text-white mt-1">Core Strengths</h3>
              </div>
            </div>

            <p class="text-body-2 text-grey-lighten-2 mb-6 leading-relaxed">
              Our business operations thrive on consistency. From prompt billing to reliable logistical support, our partners value our consistency across the following parameters:
            </p>

            <v-row dense>
              <v-col cols="12" sm="6" v-for="(strength, idx) in strengths" :key="idx" class="py-2">
                <v-card flat color="rgba(255, 255, 255, 0.06)" class="pa-3 rounded-lg border border-opacity-10 fill-height d-flex align-center" style="border-color: rgba(255, 255, 255, 0.1) !important;">
                  <v-avatar color="rgba(217, 179, 16, 0.15)" class="mr-3" size="28">
                    <v-icon color="accent" size="16">mdi-check-bold</v-icon>
                  </v-avatar>
                  <div>
                    <div class="text-body-2 font-weight-bold text-white">{{ strength.title }}</div>
                    <div class="text-caption text-grey-lighten-3" style="font-size: 0.72rem !important;">{{ strength.subtitle }}</div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            
            <div class="mt-6 pa-3 rounded-lg bg-surface text-primary border text-center font-weight-black text-caption tracking-wider">
              100% RELIABILITY &amp; CONSISTENT QUALITY ASSURANCE
            </div>
          </v-card>
        </v-col>

      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'QualityObjectives',
  setup() {
    const objectives = [
      {
        title: 'Customer Satisfaction First',
        desc: 'Meet and exceed the needs and expectations of our clients through zero-defect cutting and 100% on-time deliveries.'
      },
      {
        title: 'Safe & Better Work Environment',
        desc: 'Encourage employees by providing regular training in safe material handling (crane logistics) and excellent plant conditions.'
      },
      {
        title: 'Continuous Quality Upgrades',
        desc: 'Continuously improve our production processes, cutting technologies, tolerances, and quality system audits.'
      }
    ]

    const strengths = [
      { title: 'Competitive Pricing', subtitle: 'Best rates in the SIDCO area' },
      { title: 'Client Relationships', subtitle: 'Direct partner coordination' },
      { title: '100% On-Time Delivery', subtitle: 'Zero shipment delays' },
      { title: 'Good Service Always', subtitle: 'Instant updates & fast setups' },
      { title: 'MSME Certified Quality', subtitle: 'Micrometer precision cuts' },
      { title: 'Consistency Over Time', subtitle: 'Repeat orders handled flawlessly' }
    ]

    return {
      objectives,
      strengths
    }
  }
}
</script>

<style scoped>
.leading-relaxed {
  line-height: 1.625;
}

.border-bottom-dashed {
  border-bottom: 1px dashed rgba(143, 166, 180, 0.2);
}

.border-bottom-dashed:last-child {
  border-bottom: none;
}
</style>
