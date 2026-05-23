<template>
  <section id="estimator" class="py-16 px-4 bg-surface" style="border-top: 1px solid rgba(143, 166, 180, 0.1); border-bottom: 1px solid rgba(143, 166, 180, 0.1);">
    <v-container>
      <!-- Section Header -->
      <v-row class="justify-center mb-12">
        <v-col cols="12" class="text-center">
          <span class="text-subtitle-2 font-weight-black text-secondary tracking-widest text-uppercase">Interactive Quote Calculator</span>
          <h2 class="text-h4 text-sm-h3 font-weight-black text-primary mt-2">Precision Cost Estimator</h2>
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
                Submit Estimate to Admin Dashboard
              </v-btn>
            </v-form>
          </v-card>
        </v-col>

        <!-- Right Side: Calculations Display Panel -->
        <v-col cols="12" lg="5">
          <v-card flat class="pa-6 rounded-2xl bg-primary text-white fill-height d-flex flex-column justify-space-between hover-scale" style="position: relative; overflow: hidden;">
            <v-icon size="240" color="rgba(255, 255, 255, 0.02)" style="position: absolute; right: -50px; bottom: -50px; pointer-events: none;">mdi-calculator</v-icon>
            
            <div>
              <div class="text-caption font-weight-bold text-accent text-uppercase tracking-wider">Calculations Sheet</div>
              <h3 class="text-h5 font-weight-black text-white mt-1 mb-6">Live Calculations Output</h3>

              <!-- Material density callout -->
              <div class="pa-3 rounded-lg bg-white bg-opacity-10 mb-6 d-flex align-center border border-opacity-10" style="border-color: rgba(255, 255, 255, 0.15) !important;">
                <v-avatar color="rgba(217, 179, 16, 0.2)" size="36" class="mr-3">
                  <v-icon color="accent" size="18">mdi-atom</v-icon>
                </v-avatar>
                <div>
                  <div class="text-caption text-grey-lighten-2 leading-none">Selected density</div>
                  <div class="text-body-2 font-weight-bold text-white mt-1">{{ material.name }} ({{ material.density }} g/cm³)</div>
                </div>
              </div>

              <!-- Output fields -->
              <div class="d-flex flex-column gap-y-4">
                <div class="d-flex justify-space-between align-center border-bottom-white py-2">
                  <span class="text-body-2 text-grey-lighten-2">Cross-Section Area</span>
                  <span class="text-subtitle-1 font-weight-bold">{{ crossSectionArea.toFixed(2) }} mm²</span>
                </div>
                
                <div class="d-flex justify-space-between align-center border-bottom-white py-2">
                  <span class="text-body-2 text-grey-lighten-2">Single Bar Volume</span>
                  <span class="text-subtitle-1 font-weight-bold">{{ singleVolume.toFixed(2) }} cm³</span>
                </div>

                <div class="d-flex justify-space-between align-center border-bottom-white py-2">
                  <span class="text-body-2 text-grey-lighten-2">Weight Per Cut Piece</span>
                  <span class="text-subtitle-1 font-weight-black text-accent">{{ singleWeight.toFixed(3) }} kg</span>
                </div>

                <div class="d-flex justify-space-between align-center border-bottom-white py-2">
                  <span class="text-body-2 text-grey-lighten-2">Total Job Weight</span>
                  <span class="text-h6 font-weight-black text-accent">{{ totalWeight.toFixed(2) }} kg</span>
                </div>

                <div class="d-flex justify-space-between align-center border-bottom-white py-2">
                  <span class="text-body-2 text-grey-lighten-2">Estimator Machine Allocation</span>
                  <span class="text-body-2 font-weight-bold">{{ allocatedMachine }}</span>
                </div>
              </div>
            </div>

            <!-- Estimated Cutting Charge Card -->
            <div class="mt-8">
              <v-card flat color="rgba(255, 255, 255, 0.08)" class="pa-4 rounded-xl text-center border border-opacity-10" style="border-color: rgba(255, 255, 255, 0.15) !important;">
                <span class="text-caption text-grey-lighten-2 tracking-wider text-uppercase">Simulated Job Cutting Charge</span>
                <div class="text-h3 font-weight-black text-accent my-2">₹ {{ estimatedCost.toLocaleString('en-IN') }}</div>
                <span class="text-caption text-grey-lighten-3">*Does not include raw steel material costs. Pricing based on MSME Ambattur cutting rates.</span>
              </v-card>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Success Snackbar -->
    <v-snackbar v-model="snackbar" color="success" rounded="xl" timeout="4000">
      <div class="d-flex align-center">
        <v-icon class="mr-2">mdi-check-circle</v-icon>
        <span>Estimate sent successfully! Open the **Admin Portal** at the top right to view the live dashboard!</span>
      </div>
    </v-snackbar>
  </section>
</template>

<script>
import { ref, reactive, computed } from 'vue'

export default {
  name: 'QuoteEstimator',
  emits: ['submit-quote'],
  setup(props, { emit }) {
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

    return {
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
      submitQuotation
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
</style>
