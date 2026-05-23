<template>
  <section id="materials" class="py-16 px-4 bg-background">
    <v-container>
      <!-- Section Header -->
      <v-row class="justify-center mb-12">
        <v-col cols="12" class="text-center fade-up" v-animate>
          <span class="text-subtitle-2 font-weight-black text-secondary tracking-widest text-uppercase">Material Capabilities</span>
          <h2 class="text-h4 text-sm-h3 font-weight-black text-primary mt-2">Metals We Process</h2>
          <v-sheet color="accent" height="4" width="80" class="mx-auto mt-4 rounded-pill"></v-sheet>
          <p class="text-body-2 text-grey-darken-1 mt-4 max-width-md mx-auto">
            Our high-speed automatic bandsaws and precision machining tools are optimized to handle a wide variety of industrial metals with exact tolerances.
          </p>
        </v-col>
      </v-row>

      <!-- Materials Grid -->
      <v-row>
        <v-col
          v-for="(material, index) in materials"
          :key="index"
          cols="12"
          sm="6"
          lg="3"
          class="d-flex"
        >
          <v-card
            flat
            :class="['pa-6 rounded-xl border bg-surface flex-grow-1 hover-scale d-flex flex-column align-center text-center fade-up', 'delay-' + ((index % 4) + 1) * 100]"
            v-animate
            style="border-color: rgba(143, 166, 180, 0.2) !important;"
          >
            <v-avatar size="72" :color="material.color + '-lighten-4'" class="mb-4 shadow-sm">
              <v-icon :color="material.color" size="36">{{ material.icon }}</v-icon>
            </v-avatar>
            
            <h3 class="text-h6 font-weight-bold text-primary mb-2">{{ material.title }}</h3>
            
            <div class="mb-4">
              <v-chip
                v-for="(grade, i) in material.grades"
                :key="i"
                size="x-small"
                variant="tonal"
                :color="material.color"
                class="ma-1 font-weight-bold"
              >
                {{ grade }}
              </v-chip>
            </div>
            
            <p class="text-body-2 text-grey-darken-2 flex-grow-1">
              {{ material.description }}
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'MaterialsSection',
  setup() {
    const materials = [
      {
        title: 'Mild Steel (MS)',
        icon: 'mdi-gold',
        color: 'blue-grey',
        grades: ['IS 2062', 'Bright Bar', 'MS Rounds'],
        description: 'Standard construction and general engineering steel. We provide high-volume bundle cutting for MS rods with clean, burr-free edges.'
      },
      {
        title: 'Alloy Steels',
        icon: 'mdi-shield-star',
        color: 'indigo',
        grades: ['EN8', 'EN19', 'EN24', 'EN31'],
        description: 'High-tensile alloy steels primarily used in automotive components, gears, and heavy machinery shafts.'
      },
      {
        title: 'Stainless Steel',
        icon: 'mdi-sparkles',
        color: 'teal',
        grades: ['SS 304', 'SS 316', 'SS 410'],
        description: 'Corrosion-resistant steel perfect for food-grade, medical, and marine applications requiring precise finishes.'
      },
      {
        title: 'Non-Ferrous',
        icon: 'mdi-layers-triple',
        color: 'deep-orange',
        grades: ['Aluminum', 'Brass', 'Copper'],
        description: 'Softer metals requiring specific cutting speeds and coolants to prevent galling and ensure exact dimensional tolerances.'
      }
    ]

    return {
      materials
    }
  }
}
</script>

<style scoped>
.max-width-md {
  max-width: 600px;
}
.shadow-sm {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.hover-scale {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-scale:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.05) !important;
}
</style>
