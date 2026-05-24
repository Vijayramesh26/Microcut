<template>
  <section id="estimator" class="py-16 px-4 bg-surface" style="border-top: 1px solid rgba(143, 166, 180, 0.1); border-bottom: 1px solid rgba(143, 166, 180, 0.1);">
    <v-container>
      <!-- Section Header -->
      <v-row class="justify-center mb-12">
        <v-col cols="12" class="text-center fade-up" v-animate>
          <div class="text-subtitle-2 font-weight-black text-secondary tracking-widest text-uppercase">Interactive Quote Calculator</div>
          <h2 class="laser-header text-h4 text-sm-h3 font-weight-black text-primary mt-2" v-animate>Precision Cost Estimator</h2>
          <v-sheet color="accent" height="4" width="80" class="mx-auto mt-4 rounded-pill"></v-sheet>
          <p class="text-body-2 text-grey-darken-1 mt-4 max-width-md mx-auto">
            Input your material specifications below to get an instant weight and cutting charge estimation. Submit the estimate to get partner approvals.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <!-- Left Side: Input Form and Sliders -->
        <v-col cols="12" lg="7">
          <v-card flat class="pa-6 rounded-2xl border bg-surface fill-height" style="border-color: rgba(143, 166, 180, 0.2) !important;">
            <h3 class="text-h6 font-weight-black text-primary mb-6 d-flex align-center">
              <v-icon color="secondary" class="mr-2">mdi-cogs</v-icon>
              1. Material Specifications
            </h3>

            <v-form ref="form" v-model="valid">
              <v-row>
                <!-- Material Type -->
                <v-col cols="12" sm="6" class="py-2">
                  <v-select
                    v-model="material"
                    :items="materialItems"
                    item-title="name"
                    item-value="id"
                    label="Material Type"
                    variant="outlined"
                    density="comfortable"
                    color="primary"
                    return-object
                  ></v-select>
                </v-col>

                <!-- Bar Shape -->
                <v-col cols="12" sm="6" class="py-2">
                  <v-select
                    v-model="shape"
                    :items="shapeItems"
                    item-title="name"
                    item-value="id"
                    label="Bar Profile / Shape"
                    variant="outlined"
                    density="comfortable"
                    color="primary"
                    return-object
                  ></v-select>
                </v-col>
              </v-row>

              <!-- Diameter Slider -->
              <div class="mt-4">
                <div class="d-flex justify-space-between text-body-2 font-weight-bold text-primary mb-2">
                  <span>{{ shape.id === 'round' ? 'Diameter' : 'Side Width' }} (mm)</span>
                  <span class="text-secondary">{{ diameter }} mm</span>
                </div>
                <v-slider
                  v-model="diameter"
                  min="10"
                  :max="maxDiameterLimit"
                  step="1"
                  color="secondary"
                  track-color="rgba(143,166,180,0.3)"
                  thumb-label
                ></v-slider>
                <div class="text-caption text-grey-darken-1 mt-n2 mb-4 d-flex justify-space-between">
                  <span>Min: 10mm</span>
                  <span>Max Limit (Meba): {{ maxDiameterLimit }}mm</span>
                </div>
              </div>

              <!-- Cut Length Input -->
              <v-row class="mt-2">
                <v-col cols="12" sm="6" class="py-2">
                  <v-text-field
                    v-model.number="cutLength"
                    label="Cut Length (mm)"
                    type="number"
                    variant="outlined"
                    density="comfortable"
                    color="primary"
                    prepend-inner-icon="mdi-ruler"
                    :rules="[rules.required, rules.positive, rules.maxLength]"
                  ></v-text-field>
                </v-col>

                <!-- Quantity Input -->
                <v-col cols="12" sm="6" class="py-2">
                  <v-text-field
                    v-model.number="quantity"
                    label="Quantity (Pcs)"
                    type="number"
                    variant="outlined"
                    density="comfortable"
                    color="primary"
                    prepend-inner-icon="mdi-tag-multiple-outline"
                    :rules="[rules.required, rules.positiveInt]"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-divider class="my-6" style="opacity: 0.5;"></v-divider>

              <h3 class="text-h6 font-weight-black text-primary mb-6 d-flex align-center">
                <v-icon color="secondary" class="mr-2">mdi-account-box-outline</v-icon>
                2. Contact Information
              </h3>

              <v-row dense>
                <v-col cols="12" sm="6" class="py-1">
                  <v-text-field
                    v-model="contact.name"
                    label="Your Name"
                    variant="outlined"
                    density="comfortable"
                    color="primary"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="py-1">
                  <v-text-field
                    v-model="contact.company"
                    label="Company Name"
                    variant="outlined"
                    density="comfortable"
                    color="primary"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="py-1">
                  <v-text-field
                    v-model="contact.phone"
                    label="Contact Phone"
                    variant="outlined"
                    density="comfortable"
                    color="primary"
                    :rules="[rules.required, rules.phone]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="py-1">
                  <v-text-field
                    v-model="contact.email"
                    label="Email Address"
                    variant="outlined"
                    density="comfortable"
                    color="primary"
                    :rules="[rules.required, rules.email]"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-btn
                block
                color="primary"
                size="large"
                class="mt-6 font-weight-bold text-capitalize glow-btn rounded-lg"
                flat
                :disabled="!valid"
                @click="submitQuotation"
              >
                <v-icon start>mdi-send-check-outline</v-icon>
                Submit Estimate Request
              </v-btn>
            </v-form>
          </v-card>
        </v-col>

        <!-- Right Side: Calculations Display Panel -->
        <v-col cols="12" lg="5">
          <v-card flat class="pa-6 rounded-2xl border hover-scale fill-height d-flex flex-column justify-space-between tech-card" :class="isDark ? 'bg-surface' : 'bg-surface'" :style="{ borderColor: 'rgba(143, 166, 180, 0.2) !important', position: 'relative', overflow: 'hidden', backgroundColor: isDark ? '#070d14 !important' : '#FFFFFF !important' }">
            <v-icon size="240" :color="isDark ? 'rgba(255, 255, 255, 0.015)' : 'rgba(11, 60, 93, 0.02)'" style="position: absolute; right: -50px; bottom: -50px; pointer-events: none;">mdi-calculator</v-icon>
            
            <div class="d-flex pa-1 rounded-xl mb-6" :style="{ backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05) !important' : 'rgba(11, 60, 93, 0.05) !important', border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(11,60,93,0.15)', position: 'relative', zIndex: 5 }">
              <v-btn
                variant="flat"
                :color="!showSimulator ? 'accent' : 'transparent'"
                class="text-capitalize rounded-lg font-weight-black text-caption flex-grow-1"
                :class="!showSimulator ? (isDark ? 'text-grey-darken-4 font-weight-black' : 'text-primary font-weight-black') : (isDark ? 'text-grey-lighten-2' : 'text-grey-darken-1')"
                density="comfortable"
                @click="showSimulator = false"
                style="flex: 1;"
              >
                <v-icon start size="16">mdi-calculator</v-icon>
                Calculations Sheet
              </v-btn>
              <v-btn
                variant="flat"
                :color="showSimulator ? 'accent' : 'transparent'"
                class="text-capitalize rounded-lg font-weight-black text-caption flex-grow-1"
                :class="showSimulator ? (isDark ? 'text-grey-darken-4 font-weight-black' : 'text-primary font-weight-black') : (isDark ? 'text-grey-lighten-2' : 'text-grey-darken-1')"
                density="comfortable"
                @click="showSimulator = true"
                style="flex: 1;"
              >
                <v-icon start size="16">mdi-cog-play-outline</v-icon>
                Live Cutting Demo
              </v-btn>
            </div>
 
            <!-- TAB 1: Calculations Sheet -->
            <div v-if="!showSimulator" class="flex-grow-1 d-flex flex-column justify-space-between">
              <div>
                <div class="text-caption font-weight-bold text-accent text-uppercase tracking-wider">Calculations Sheet</div>
                <h3 class="text-h5 font-weight-black mt-1 mb-6" :class="isDark ? 'text-white' : 'text-primary'">Live Calculations Output</h3>
 
                <!-- Material density callout -->
                <div class="pa-3 rounded-lg mb-6 d-flex align-center border border-opacity-10" :style="{ backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05) !important' : 'rgba(11, 60, 93, 0.05) !important', borderColor: isDark ? 'rgba(255, 255, 255, 0.15) !important' : 'rgba(11, 60, 93, 0.15) !important' }">
                  <v-avatar color="rgba(217, 179, 16, 0.2)" size="36" class="mr-3">
                    <v-icon color="accent" size="18">mdi-atom</v-icon>
                  </v-avatar>
                  <div>
                    <div class="text-caption leading-none" :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-1'">Selected density</div>
                    <div class="text-body-2 font-weight-bold mt-1" :class="isDark ? 'text-white' : 'text-primary'">{{ material.name }} ({{ material.density }} g/cm³)</div>
                  </div>
                </div>
 
                <!-- Output fields -->
                <div class="d-flex flex-column gap-y-4">
                  <div class="d-flex justify-space-between align-center py-2" :style="{ borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(11, 60, 93, 0.1)' }">
                    <span class="text-body-2" :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-1'">Cross-Section Area</span>
                    <span class="text-subtitle-1 font-weight-bold" :class="isDark ? 'text-white' : 'text-primary'">{{ crossSectionArea.toFixed(2) }} mm²</span>
                  </div>
                  
                  <div class="d-flex justify-space-between align-center py-2" :style="{ borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(11, 60, 93, 0.1)' }">
                    <span class="text-body-2" :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-1'">Single Bar Volume</span>
                    <span class="text-subtitle-1 font-weight-bold" :class="isDark ? 'text-white' : 'text-primary'">{{ singleVolume.toFixed(2) }} cm³</span>
                  </div>
 
                  <div class="d-flex justify-space-between align-center py-2" :style="{ borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(11, 60, 93, 0.1)' }">
                    <span class="text-body-2" :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-1'">Weight Per Cut Piece</span>
                    <span class="text-subtitle-1 font-weight-black text-accent">{{ singleWeight.toFixed(3) }} kg</span>
                  </div>
 
                  <div class="d-flex justify-space-between align-center py-2" :style="{ borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(11, 60, 93, 0.1)' }">
                    <span class="text-body-2" :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-1'">Total Job Weight</span>
                    <span class="text-h6 font-weight-black text-accent">{{ totalWeight.toFixed(2) }} kg</span>
                  </div>
 
                  <div class="d-flex justify-space-between align-center py-2" :style="{ borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(11, 60, 93, 0.1)' }">
                    <span class="text-body-2" :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-1'">Estimator Machine Allocation</span>
                    <span class="text-body-2 font-weight-bold" :class="isDark ? 'text-white' : 'text-primary'">{{ allocatedMachine }}</span>
                  </div>
                </div>
              </div>
 
              <!-- Estimated Cutting Charge Card -->
              <div class="mt-8">
                <v-card flat class="pa-4 rounded-xl text-center border border-opacity-10" :style="{ backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04) !important' : 'rgba(11, 60, 93, 0.04) !important', borderColor: isDark ? 'rgba(255, 255, 255, 0.12) !important' : 'rgba(11, 60, 93, 0.12) !important' }">
                  <span class="text-caption tracking-wider text-uppercase" :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-1'">Simulated Job Cutting Charge</span>
                  <div class="text-h3 font-weight-black text-accent my-2">₹ {{ estimatedCost.toLocaleString('en-IN') }}</div>
                  <span class="text-caption" :class="isDark ? 'text-grey-lighten-3' : 'text-grey-darken-2'">*Does not include raw steel material costs. Pricing based on MSME Ambattur cutting rates.</span>
                </v-card>
              </div>
            </div>
 
            <!-- TAB 2: Interactive Cutting Demo -->
            <div v-else class="flex-grow-1 d-flex flex-column justify-space-between" style="position: relative; z-index: 2;">
              <div>
                <div class="text-caption font-weight-bold text-accent text-uppercase tracking-wider">High-Tech Cutting Room</div>
                <h3 class="text-h5 font-weight-black mt-1 mb-4 d-flex justify-space-between align-center" :class="isDark ? 'text-white' : 'text-primary'">
                  <span>Live Simulator</span>
                  <v-chip size="small" color="accent" class="font-weight-black text-caption px-3" variant="flat">
                    Cuts Count: {{ totalCuts }}
                  </v-chip>
                </h3>
 
                <!-- Bandsaw Graphic Window -->
                <div class="bandsaw-window rounded-xl border d-flex justify-center align-center position-relative mb-6" style="height: 200px; background-color: rgba(0, 0, 0, 0.4) !important; border-color: rgba(255,255,255,0.15) !important; overflow: hidden; --blade-y-sparks: calc(v-bind(bladeYPos) * 1px);">
                  <!-- Grid layout overlay for engineering vibe -->
                  <div class="sim-grid-bg"></div>
 
                  <!-- Sparks Effect layer -->
                  <SparksEffect v-if="isCutting && progress > 15 && progress < 95" />
 
                  <!-- Machine SVG Rig -->
                  <svg viewBox="0 0 400 200" width="100%" height="100%" class="position-absolute" style="top: 0; left: 0; pointer-events: none;">
                    <!-- Collection Bin (Bottom Right) -->
                    <rect x="270" y="150" width="90" height="40" fill="#1b2e3c" rx="4" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
                    <text x="315" y="174" font-size="9" fill="rgba(255,255,255,0.6)" font-weight="900" text-anchor="middle">COLLECTION BIN</text>
 
                    <!-- Left Stand Vise base -->
                    <rect x="30" y="145" width="110" height="20" fill="#2d3d4b" rx="2" />
                    <rect x="160" y="145" width="120" height="20" fill="#2d3d4b" rx="2" />
 
                    <!-- Clamping Vise Left Arm -->
                    <rect x="65" y="95" width="15" height="52" fill="#4f5e6d" rx="2" />
                    <!-- Clamping Vise Right Arm (Animate translation when clamping) -->
                    <g :style="viseTranslateStyle">
                      <rect x="125" y="95" width="15" height="52" fill="#4f5e6d" rx="2" />
                    </g>
 
                    <!-- Metal Rod Cylinder/Box (Renders dynamically based on Shape, Color and Size) -->
                    <!-- Uncut Left Rod -->
                    <g :style="rodVibrationStyle">
                      <rect
                        x="10"
                        :y="rodY"
                        width="138"
                        :height="rodHeight"
                        :fill="materialColor"
                        rx="2"
                        stroke="rgba(255,255,255,0.2)"
                        stroke-width="1"
                      />
                    </g>
                    <!-- Cut Piece (Right side of rod - starts at x=150) -->
                    <g :style="cutPieceStyle">
                      <rect
                        x="152"
                        :y="rodY"
                        width="78"
                        :height="rodHeight"
                        :fill="materialColor"
                        rx="2"
                        stroke="rgba(255,255,255,0.2)"
                        stroke-width="1"
                      />
                    </g>
 
                    <!-- Bandsaw Blade Housing & Beam (Animate vertical descend) -->
                    <g :style="bladeTranslateStyle">
                      <!-- Structural Upper Arm -->
                      <rect x="50" y="20" width="220" height="15" fill="#ffb703" rx="4" />
                      <circle cx="75" cy="27.5" r="8" fill="#1b2e3c" />
                      <circle cx="245" cy="27.5" r="8" fill="#1b2e3c" />
                      <!-- Blade Beam Support -->
                      <rect x="80" y="35" width="160" height="8" fill="#1d2731" />
                      <!-- The Actual Blade Edge (represented as a thin steel line) -->
                      <rect x="80" y="43" width="160" height="2" fill="#ffb703" />
                    </g>
 
                    <!-- Sparks contact glowing dot -->
                    <circle v-if="isCutting && progress > 15 && progress < 95" cx="150" :cy="bladeYPos" r="6" fill="#fff" filter="drop-shadow(0 0 8px #ffb703)" />
                  </svg>
 
                  <!-- Digital cutting progress overlay -->
                  <div class="position-absolute px-3 py-1 rounded-lg text-accent font-weight-black text-caption font-mono" style="bottom: 10px; left: 10px; background-color: rgba(0, 0, 0, 0.7) !important; border: 1px solid rgba(255,183,3,0.35);">
                    <span v-if="isCutting">CUTTING: {{ Math.floor(progress) }}%</span>
                    <span v-else-if="isCutCompleted" class="text-success">COMPLETE!</span>
                    <span v-else class="text-grey">READY</span>
                  </div>
                </div>
 
                <!-- Digital Telemetry Dashboard (Gauges) -->
                <v-row dense class="mb-4">
                  <!-- RPM -->
                  <v-col cols="4">
                    <v-card flat class="pa-3 text-center border border-opacity-10" :style="{ backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04) !important' : 'rgba(11, 60, 93, 0.04) !important', borderColor: isDark ? 'rgba(255, 255, 255, 0.1) !important' : 'rgba(11, 60, 93, 0.1) !important' }">
                      <div class="text-caption leading-none mb-1" :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-1'">Blade RPM</div>
                      <div class="text-subtitle-1 font-weight-black font-mono" :class="isCutting ? 'text-accent' : (isDark ? 'text-white' : 'text-primary')">
                        {{ rpmValue }}
                      </div>
                    </v-card>
                  </v-col>
                  <!-- Feed Rate -->
                  <v-col cols="4">
                    <v-card flat class="pa-3 text-center border border-opacity-10" :style="{ backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04) !important' : 'rgba(11, 60, 93, 0.04) !important', borderColor: isDark ? 'rgba(255, 255, 255, 0.1) !important' : 'rgba(11, 60, 93, 0.1) !important' }">
                      <div class="text-caption leading-none mb-1" :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-1'">Feed mm/m</div>
                      <div class="text-subtitle-1 font-weight-black font-mono" :class="isCutting ? 'text-accent' : (isDark ? 'text-white' : 'text-primary')">
                        {{ feedRate }}
                      </div>
                    </v-card>
                  </v-col>
                  <!-- Hydraulic pressure -->
                  <v-col cols="4">
                    <v-card flat class="pa-3 text-center border border-opacity-10" :style="{ backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04) !important' : 'rgba(11, 60, 93, 0.04) !important', borderColor: isDark ? 'rgba(255, 255, 255, 0.1) !important' : 'rgba(11, 60, 93, 0.1) !important' }">
                      <div class="text-caption leading-none mb-1" :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-1'">Vise bar</div>
                      <div class="text-subtitle-1 font-weight-black font-mono" :class="isClamped ? 'text-success' : (isDark ? 'text-white' : 'text-primary')">
                        {{ pressureValue }}
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
 
              <!-- Simulator CTA Buttons -->
              <div>
                <v-btn
                  block
                  :color="isCutting ? 'grey' : 'accent'"
                  size="large"
                  class="font-weight-black text-capitalize glow-btn rounded-lg"
                  flat
                  :disabled="isCutting"
                  @click="runSimulation"
                >
                  <v-icon start>{{ isCutting ? 'mdi-cogs' : 'mdi-play-circle-outline' }}</v-icon>
                  {{ isCutting ? 'Simulating Cut...' : isCutCompleted ? 'Simulate Cut Again' : 'Start Virtual Cut' }}
                </v-btn>
                <div class="text-center text-caption mt-2" :class="isDark ? 'text-grey-lighten-3' : 'text-grey-darken-2'">
                  *Speed and feed dials adjust based on selected Steel Hardness and Diameter slider.
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
 
    <!-- Success Snackbar -->
    <v-snackbar v-model="snackbar" color="success" rounded="xl" timeout="4000">
      <div class="d-flex align-center">
        <v-icon class="mr-2">mdi-check-circle</v-icon>
        <span>Estimate submitted successfully! Our engineering team will contact you shortly.</span>
      </div>
    </v-snackbar>
  </section>
</template>

<script>
import { ref, reactive, computed, onUnmounted } from 'vue'
import { useTheme } from 'vuetify'
import SparksEffect from './SparksEffect.vue'

export default {
  name: 'QuoteEstimator',
  components: { SparksEffect },
  emits: ['submit-quote'],
  setup(props, { emit }) {
    const theme = useTheme()
    const isDark = computed(() => theme.global.name.value === 'dark')
    const valid = ref(false)
    const snackbar = ref(false)

    // Form inputs
    const material = ref({ id: 'alloy', name: 'Alloy Steel', density: 7.85 })
    const shape = ref({ id: 'round', name: 'Round Bar', icon: 'mdi-record-circle-outline' })
    const diameter = ref(50)
    const cutLength = ref(200)
    const quantity = ref(100)

    const contact = reactive({
      name: '',
      company: '',
      phone: '',
      email: ''
    })

    // Dropdown items
    const materialItems = [
      { id: 'alloy', name: 'Alloy Steel', density: 7.85 },
      { id: 'carbon', name: 'Carbon Steel', density: 7.84 },
      { id: 'stainless', name: 'Stainless Steel', density: 8.00 },
      { id: 'mild', name: 'Mild Steel', density: 7.85 }
    ]

    const shapeItems = [
      { id: 'round', name: 'Round Bar', icon: 'mdi-record-circle-outline' },
      { id: 'square', name: 'Square Bar', icon: 'mdi-square-outline' },
      { id: 'hex', name: 'Hexagonal Bar', icon: 'mdi-hexagon-outline' }
    ]

    const maxDiameterLimit = 330 // Meba bandsaw max capacity

    // Physics formulas
    const crossSectionArea = computed(() => {
      const d = diameter.value
      if (shape.value.id === 'round') {
        return Math.PI * Math.pow(d / 2, 2)
      } else if (shape.value.id === 'square') {
        return Math.pow(d, 2)
      } else if (shape.value.id === 'hex') {
        // Area of regular hexagon = (3 * sqrt(3) / 2) * side^2
        // side length = d / (2 * cos(30)) or typically width across flats is d
        // side = d / sqrt(3)
        // Area = (3 * sqrt(3) / 2) * (d^2 / 3) = (sqrt(3) / 2) * d^2
        return (Math.sqrt(3) / 2) * Math.pow(d, 2)
      }
      return 0
    })

    const singleVolume = computed(() => {
      // Volume = area in mm^2 * length in mm
      // 1 cm^3 = 1000 mm^3
      const volMm3 = crossSectionArea.value * cutLength.value
      return volMm3 / 1000
    })

    const singleWeight = computed(() => {
      // Weight in kg = volume in cm^3 * density in g/cm^3 / 1000
      return (singleVolume.value * material.value.density) / 1000
    })

    const totalWeight = computed(() => {
      return singleWeight.value * quantity.value
    })

    // Allocated machine based on diameter capacity
    const allocatedMachine = computed(() => {
      const d = diameter.value
      if (d <= 80 && shape.value.id === 'round') {
        return 'Zeal Tech Circular Saw (Upto 80)'
      } else if (d <= 250) {
        return 'Accuratesaw Single Cut (Upto 250)'
      } else if (d <= 300) {
        return 'Cosen Bundle Bandsaw (Upto 300)'
      } else {
        return 'Meba German Bandsaw (Upto 330)'
      }
    })

    // Simulated MSME cutting fee calculation
    const estimatedCost = computed(() => {
      const qty = quantity.value
      const d = diameter.value
      // Base fee per cut scales with diameter
      let costPerCut = 0
      if (d <= 50) {
        costPerCut = 8
      } else if (d <= 100) {
        costPerCut = 18
      } else if (d <= 200) {
        costPerCut = 45
      } else if (d <= 250) {
        costPerCut = 90
      } else {
        costPerCut = 150
      }
      
      // Hex and Square cuts are slightly harder (15% premium)
      if (shape.value.id !== 'round') {
        costPerCut *= 1.15
      }
      
      // Total cutting charge = qty * costPerCut plus handling fee based on total weight
      const totalCutCharge = qty * costPerCut
      const handlingCharge = totalWeight.value * 1.5 // 1.5 INR per kg handling fee (crane logistics)
      
      return Math.round(totalCutCharge + handlingCharge)
    })

    // Input Validation rules
    const rules = {
      required: v => !!v || 'Field is required',
      maxLength: v => v <= 5000 || 'Max cut length is 5000mm',
      positive: v => v > 0 || 'Must be a positive number',
      positiveInt: v => (Number.isInteger(v) && v > 0) || 'Must be a positive integer',
      email: v => /.+@.+\..+/.test(v) || 'Must be a valid email',
      phone: v => /^\d{10}$/.test(v) || 'Must be a 10-digit mobile number'
    }

    const form = ref(null)

    const submitQuotation = () => {
      if (form.value.validate()) {
        const estimatePayload = {
          id: 'RFQ-' + Math.floor(1000 + Math.random() * 9000),
          material: material.value.name,
          shape: shape.value.name,
          diameter: diameter.value,
          cutLength: cutLength.value,
          quantity: quantity.value,
          weight: totalWeight.value.toFixed(2),
          machine: allocatedMachine.value,
          cost: estimatedCost.value,
          client: contact.company,
          contactName: contact.name,
          phone: contact.phone,
          email: contact.email,
          timestamp: new Date().toLocaleTimeString(),
          status: 'Pending Review'
        }
        
        emit('submit-quote', estimatePayload)
        snackbar.value = true

        // Reset forms but keep contact for convenience
        cutLength.value = 200
        quantity.value = 100
      }
    }

    // ── Simulator state variables ──────────────────────────────
    const showSimulator = ref(false)
    const isCutting = ref(false)
    const progress = ref(0)
    const isClamped = ref(false)
    const isCutCompleted = ref(false)
    const totalCuts = ref(0)
    const bladeYOffset = ref(-10)

    const rpmValue = ref(0)
    const feedRate = ref(0)
    const pressureValue = ref(0)

    let simInterval = null

    onUnmounted(() => {
      if (simInterval) clearInterval(simInterval)
    })

    const runSimulation = () => {
      if (isCutting.value) return
      
      // Reset values
      isCutting.value = true
      progress.value = 0
      isClamped.value = false
      isCutCompleted.value = false
      bladeYOffset.value = -10
      rpmValue.value = 0
      feedRate.value = 0
      pressureValue.value = 0

      // Step 1: Clamp vise (takes 0.8s)
      setTimeout(() => {
        isClamped.value = true
        pressureValue.value = 120 // 120 bar clamping pressure
        
        // Start descending blade and cutting (after vise is clamped)
        let step = 0
        const totalDurationSteps = 100
        // The speed is determined by material and thickness
        // Stainless steel or thick diameters cut slower!
        let intervalMs = 40 // base speed (4s total)
        if (material.value.id === 'stainless') {
          intervalMs += 25
        }
        if (diameter.value > 150) {
          intervalMs += 20
        }
        if (diameter.value > 250) {
          intervalMs += 20
        }

        simInterval = setInterval(() => {
          step++
          progress.value = step

          // RPM and Feed rate ramp up as blade touches metal (at progress > 15%)
          if (progress.value > 15 && progress.value < 95) {
            // Target values based on material
            let targetRpm = 110
            let targetFeed = 38
            if (material.value.id === 'stainless') {
              targetRpm = 75
              targetFeed = 20
            } else if (material.value.id === 'alloy') {
              targetRpm = 95
              targetFeed = 28
            } else if (material.value.id === 'mild') {
              targetRpm = 130
              targetFeed = 50
            }
            // Add slight vibrations to telemetry values
            rpmValue.value = Math.round(targetRpm + (Math.random() - 0.5) * 6)
            feedRate.value = Math.round(targetFeed + (Math.random() - 0.5) * 3)
            pressureValue.value = Math.round(120 + (Math.random() - 0.5) * 2)
          }

          // Animate Blade Y descend:
          // bladeYOffset goes from -10 to (rodY.value - 45) for clamping/touching (progress 0% to 15%)
          // Then goes from (rodY.value - 45) to (rodY.value + rodHeight.value - 45) during cut (progress 15% to 90%)
          // Then finishes the cut and moves slightly down (progress 90% to 95%)
          const ry = rodY.value
          const rh = rodHeight.value
          const startTouchY = ry - 45
          const endCutY = ry + rh - 45

          if (progress.value <= 15) {
            const p = progress.value / 15
            bladeYOffset.value = -10 + p * (startTouchY - (-10))
          } else if (progress.value <= 90) {
            const p = (progress.value - 15) / 75
            bladeYOffset.value = startTouchY + p * (endCutY - startTouchY)
          } else if (progress.value <= 95) {
            const p = (progress.value - 90) / 5
            bladeYOffset.value = endCutY + p * 2
          }

          // At 95% progress, the cut completes and piece splits!
          if (progress.value === 95) {
            isCutCompleted.value = true
            totalCuts.value++
            // RPM and feed rates start ramping down
            rpmValue.value = Math.round(rpmValue.value * 0.4)
            feedRate.value = Math.round(feedRate.value * 0.3)
          }

          if (step >= 100) {
            clearInterval(simInterval)
            isCutting.value = false
            // Dials reset to 0
            rpmValue.value = 0
            feedRate.value = 0
            pressureValue.value = 0
            isClamped.value = false
            
            // Retract blade back up after 1.5 seconds
            setTimeout(() => {
              if (!isCutting.value) {
                bladeYOffset.value = -10
                isCutCompleted.value = false
              }
            }, 1500)
          }
        }, intervalMs)

      }, 800)
    }

    const rodHeight = computed(() => 10 + (diameter.value / maxDiameterLimit) * 35)
    const rodY = computed(() => 125 - rodHeight.value / 2)
    const bladeYPos = computed(() => bladeYOffset.value + 43)

    const materialColor = computed(() => {
      if (material.value.id === 'alloy') return '#3a5c7c'
      if (material.value.id === 'carbon') return '#4d5256'
      if (material.value.id === 'stainless') return '#cfd8dc'
      return '#8a949c' // mild steel
    })

    const viseTranslateStyle = computed(() => {
      if (!isClamped.value) return { transform: 'translateX(0px)' }
      // Clamp arm shift based on diameter size
      const clampShift = -25 + (diameter.value / maxDiameterLimit) * 15
      return {
        transform: `translateX(${clampShift}px)`,
        transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }
    })

    const bladeTranslateStyle = computed(() => {
      let vx = 0
      let vy = 0
      if (isCutting.value && progress.value > 15 && progress.value < 95) {
        vx = (Math.random() - 0.5) * 0.8
        vy = (Math.random() - 0.5) * 0.8
      }
      return {
        transform: `translate(${vx}px, ${bladeYOffset.value + vy}px)`,
        transition: isCutting.value ? 'none' : 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }
    })

    const rodVibrationStyle = computed(() => {
      if (isCutting.value && progress.value > 15 && progress.value < 95) {
        const vx = (Math.random() - 0.5) * 0.8
        const vy = (Math.random() - 0.5) * 0.8
        return { transform: `translate(${vx}px, ${vy}px)` }
      }
      return { transform: 'none' }
    })

    const cutPieceStyle = computed(() => {
      if (!isCutCompleted.value) {
        return {
          transform: 'none',
          transition: 'none'
        }
      }
      // Slides off and falls down inside the collection bin
      return {
        transform: 'translate(115px, 35px) rotate(22deg)',
        transformOrigin: '152px 125px',
        transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }
    })

    return {
      isDark,
      valid,
      form,
      snackbar,
      material,
      shape,
      diameter,
      cutLength,
      quantity,
      contact,
      materialItems,
      shapeItems,
      maxDiameterLimit,
      crossSectionArea,
      singleVolume,
      singleWeight,
      totalWeight,
      allocatedMachine,
      estimatedCost,
      rules,
      submitQuotation,
      
      // Simulator setup exports
      showSimulator,
      isCutting,
      progress,
      isClamped,
      isCutCompleted,
      totalCuts,
      bladeYOffset,
      rpmValue,
      feedRate,
      pressureValue,
      runSimulation,
      rodHeight,
      rodY,
      bladeYPos,
      materialColor,
      viseTranslateStyle,
      bladeTranslateStyle,
      rodVibrationStyle,
      cutPieceStyle
    }
  }
}
</script>

<style scoped>
.leading-none {
  line-height: 1;
}

.border-bottom-white {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.border-bottom-white:last-child {
  border-bottom: none;
}

.gap-y-4 {
  row-gap: 16px;
}

.sim-grid-bg {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 15px 15px;
  pointer-events: none;
}

.bandsaw-window :deep(.sparks-container) {
  position: absolute;
  top: var(--blade-y-sparks) !important;
  left: 150px !important;
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 10;
}
</style>
