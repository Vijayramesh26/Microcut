<template>
  <section id="customers" class="py-16 px-4 bg-background">
    <v-container>
      <!-- Section Header -->
      <v-row class="justify-center mb-12">
        <v-col cols="12" class="text-center fade-up" v-animate>
          <span class="text-subtitle-2 font-weight-black text-secondary tracking-widest text-uppercase">Trust Portfolio</span>
          <h2 class="text-h4 text-sm-h3 font-weight-black text-primary mt-2">Customer Database</h2>
          <v-sheet color="accent" height="4" width="80" class="mx-auto mt-4 rounded-pill"></v-sheet>
          <p class="text-body-2 text-grey-darken-1 mt-4 max-width-md mx-auto">
            Proudly delivering high-precision rod cutting and machining solutions to major industrial machinery and automobile part manufacturers in Chennai.
          </p>
        </v-col>
      </v-row>

      <!-- Customer Cards Grid -->
      <v-row>
        <v-col
          v-for="(customer, index) in customers"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="d-flex"
        >
          <v-card flat :class="['pa-5 rounded-xl border bg-surface hover-scale flex-grow-1 d-flex flex-column justify-space-between fade-up', 'delay-' + ((index % 4) + 1) * 100]" v-animate style="border-color: rgba(143, 166, 180, 0.2) !important;">
            <div>
              <div class="d-flex align-center justify-space-between mb-4">
                <v-avatar color="rgba(50, 140, 193, 0.1)" size="40">
                  <v-icon color="secondary">mdi-office-building-cog</v-icon>
                </v-avatar>
                <span class="text-caption font-weight-black text-grey-lighten-1">ID: #0{{ index + 1 }}</span>
              </div>

              <h4 class="text-subtitle-1 font-weight-black text-primary mb-2 leading-tight">
                {{ customer.name }}
              </h4>
              
              <div class="text-caption text-grey-darken-1 mb-4">
                Industrial estate partner in Ambattur region, collaborating for high-volume component cutting.
              </div>
            </div>

            <div>
              <v-chip color="accent" variant="tonal" size="small" class="font-weight-black text-caption tracking-wider w-100 justify-center">
                <v-icon start size="14">mdi-scissors-cutting</v-icon>
                {{ customer.operation }}
              </v-chip>
            </div>
          </v-card>
        </v-col>

        <!-- Summary Statistics Card inside Grid -->
        <v-col cols="12" sm="6" md="4" lg="3" class="d-flex">
          <v-card flat class="pa-5 rounded-xl bg-primary text-white hover-scale flex-grow-1 d-flex flex-column justify-center text-center fade-up delay-400" v-animate style="position: relative; overflow: hidden;">
            <v-icon size="120" color="rgba(255, 255, 255, 0.03)" style="position: absolute; right: -10px; bottom: -20px; pointer-events: none;">mdi-account-multiple-check</v-icon>
            
            <div class="text-h3 font-weight-black text-accent">7+</div>
            <div class="text-subtitle-2 font-weight-bold text-white mt-1">Core Industrial Clients</div>
            <div class="text-caption text-grey-lighten-2 mt-2 leading-snug">
              Providing repeat contract job works for leading automotive, gear, and forging units.
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'CustomersSection',
  setup() {
    const customers = [
      { name: 'MANPRO Equipment Pvt Ltd', operation: 'PRECISION CUTTING' },
      { name: 'VELSAKTHI ENGINEERING', operation: 'PRECISION CUTTING' },
      { name: 'Sarang Auto Parts Pvt Ltd', operation: 'PRECISION CUTTING' },
      { name: 'VAASAN ENGINEERING', operation: 'PRECISION CUTTING' },
      { name: 'Veltech Auto Parts', operation: 'PRECISION CUTTING' },
      { name: 'MOD FORGE', operation: 'PRECISION CUTTING' },
      { name: 'BALAJI INDUSTRIES', operation: 'PRECISION CUTTING' }
    ]

    return {
      customers
    }
  }
}
</script>

<style scoped>
.leading-tight {
  line-height: 1.3;
}
.leading-snug {
  line-height: 1.4;
}
</style>
