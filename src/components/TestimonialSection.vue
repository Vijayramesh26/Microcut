<template>
  <section id="testimonials" class="py-16 px-4 bg-background">
    <v-container>
      <!-- Section Header -->
      <v-row class="justify-center mb-10">
        <v-col cols="12" class="text-center">
          <span class="text-subtitle-2 font-weight-black text-secondary tracking-widest text-uppercase">Client Reviews</span>
          <h2 class="text-h4 text-sm-h3 font-weight-black text-primary mt-2">What Our Partners Say</h2>
          <v-sheet color="accent" height="4" width="80" class="mx-auto mt-4 rounded-pill"></v-sheet>
        </v-col>
      </v-row>

      <!-- Testimonials Grid -->
      <v-row class="justify-center">
        <v-col
          v-for="(testimonial, index) in testimonials"
          :key="index"
          cols="12"
          md="4"
          class="pa-3"
        >
          <v-card
            flat
            class="pa-6 rounded-xl border bg-surface fill-height d-flex flex-column hover-scale"
            style="border-color: rgba(143, 166, 180, 0.2) !important;"
          >
            <div class="mb-4">
              <v-icon color="accent" size="36">mdi-format-quote-open</v-icon>
            </div>
            
            <p class="text-body-1 text-grey-darken-2 font-italic flex-grow-1 mb-6">
              "{{ testimonial.quote }}"
            </p>

            <v-divider class="mb-4" style="opacity: 0.3;"></v-divider>
            
            <div class="d-flex align-center">
              <v-avatar color="primary" size="48" class="mr-4 text-white font-weight-bold">
                {{ testimonial.initials }}
              </v-avatar>
              <div>
                <div class="font-weight-black text-subtitle-1 text-primary">{{ testimonial.name }}</div>
                <div class="text-caption text-secondary font-weight-medium">{{ testimonial.company }}</div>
              </div>
            </div>
            
            <div class="d-flex mt-3">
              <v-icon v-for="n in 5" :key="n" color="warning" size="18">mdi-star</v-icon>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'TestimonialSection',
  setup() {
    const testimonials = [
      {
        quote: "Microcut Engineering has been our trusted partner for over 3 years. Their bundle bandsaw cutting speed and precision are unmatched in Ambattur SIDCO.",
        name: "Arun Prakash",
        company: "AP Auto Components",
        initials: "AP"
      },
      {
        quote: "On-time delivery is critical for our assembly line. Kishore and his team always ensure our MS and EN series rods are cut to exact tolerances with zero delays.",
        name: "Rajesh Kannan",
        company: "Kannan Heavy Machining",
        initials: "RK"
      },
      {
        quote: "Their facility's 2-ton crane makes material handling completely hassle-free. We simply unload the bundles and they take care of the entire cutting process safely.",
        name: "S. Venkatesh",
        company: "SV Steel Traders",
        initials: "SV"
      }
    ]

    return {
      testimonials
    }
  }
}
</script>

<style scoped>
.hover-scale {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-scale:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.05) !important;
}
</style>
