<template>
  <v-footer class="bg-primary text-white border-t border-opacity-10 py-10 px-4" style="border-color: rgba(255, 255, 255, 0.1) !important;">
    <v-container>
      <v-row class="justify-space-between mb-8">
        
        <!-- Left Side: Slogan and Branding -->
        <v-col cols="12" md="3" class="py-2">
          <div class="d-flex align-center mb-4">
            <v-avatar color="rgba(255, 255, 255, 0.15)" size="36" class="mr-3">
              <v-icon color="accent" size="18">mdi-axis-arrow</v-icon>
            </v-avatar>
            <span class="font-weight-black text-h6 text-white tracking-widest">MICROCUT ENGINEERING</span>
          </div>

          <p class="text-body-2 text-grey-lighten-2 leading-relaxed mb-4 max-width-sm">
            Specialist in high-precision rod cutting and machining solutions. Certified partnership startup dedicated to supporting Chennai's engineering services since 2019.
          </p>

          <div class="pa-3 rounded-lg bg-white bg-opacity-5 border border-opacity-10" style="border-color: rgba(255,255,255,0.08) !important;">
            <div class="text-caption text-grey-lighten-2 tracking-wide font-weight-bold">OUR MISSION COMMITMENT</div>
            <div class="text-body-2 font-weight-bold text-accent mt-1">Price • Best Service • On-Time Delivery • Customer Satisfaction</div>
          </div>
        </v-col>

        <!-- Center: Quick Navigation Links -->
        <v-col cols="12" sm="12" md="4" class="py-2">
          <h4 class="text-subtitle-1 font-weight-bold text-accent mb-4 tracking-wider">Quick Navigation</h4>
          <v-row dense>
            <v-col cols="6" v-for="link in footerLinks" :key="link.target" class="py-1">
              <div 
                class="d-flex align-start cursor-pointer footer-link"
                @click="scrollTo(link.target)"
              >
                <v-icon color="accent" size="18" class="mr-2 mt-0.5">mdi-chevron-right</v-icon>
                <span class="text-body-2 text-grey-lighten-2 font-weight-medium hover-text-white" style="transition: color 0.2s;">{{ link.name }}</span>
              </div>
            </v-col>
          </v-row>
        </v-col>

        <!-- Right: Contacts & Support -->
        <v-col cols="12" sm="7" md="4" class="py-2">
          <h4 class="text-subtitle-1 font-weight-bold text-accent mb-4 tracking-wider">Plant Office Contacts</h4>
          <div class="d-flex flex-column">
            <div class="d-flex align-start mb-6">
              <v-icon color="secondary" size="18" class="mr-3 mt-1">mdi-phone-outline</v-icon>
              <div>
                <div class="text-body-2 text-grey-lighten-2 mb-1">Hotline Telephones:</div>
                <div class="text-body-2 font-weight-bold text-white mb-2">+91 96772 84841 (Mr. Kishore)</div>
                <div class="text-body-2 font-weight-bold text-white">+91 98401 58782 (Mr. Santhosh)</div>
              </div>
            </div>

            <div class="d-flex align-start">
              <v-icon color="secondary" size="18" class="mr-3 mt-1">mdi-email-outline</v-icon>
              <div>
                <div class="text-body-2 text-grey-lighten-2">Official Inquiry Mail:</div>
                <a href="mailto:microcutengineerings@gmail.com" target="_blank" rel="noopener noreferrer" class="text-body-2 font-weight-bold text-accent text-decoration-none d-block mt-0.5">
                  microcutengineerings@gmail.com
                </a>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-opacity-10" style="border-color: rgba(255,255,255,0.1) !important;">
              <div class="text-caption text-grey-lighten-1 mb-2 font-weight-medium">Connect With Us:</div>
              <div class="d-flex gap-2">
                <v-btn icon="mdi-linkedin" size="small" color="white" variant="tonal" class="mr-2" href="#" target="_blank"></v-btn>
                <v-btn icon="mdi-facebook" size="small" color="white" variant="tonal" class="mr-2" href="#" target="_blank"></v-btn>
                <v-btn icon="mdi-instagram" size="small" color="white" variant="tonal" class="mr-2" href="#" target="_blank"></v-btn>
                <v-btn icon="mdi-whatsapp" size="small" color="white" variant="tonal" href="https://wa.me/919677284841" target="_blank"></v-btn>
              </div>
            </div>
          </div>
        </v-col>

      </v-row>

      <v-divider class="mb-6" style="opacity: 0.1;"></v-divider>

      <!-- Bottom Credits -->
      <v-row class="align-center justify-space-between text-caption text-grey-lighten-2">
        <v-col cols="12" md="4" class="text-center text-md-left">
          &copy; 2026 Microcut Engineering. All Rights Reserved.
        </v-col>
        <v-col cols="12" md="4" class="text-center mt-2 mt-md-0 font-weight-bold text-accent">
          GSTIN: 33AAACM1234N1Z5 • MSME: UDYAM-TN-02-XXXXXXX
        </v-col>
        <v-col cols="12" md="4" class="text-center text-md-right mt-2 mt-md-0">
          Chennai Ambattur SIDCO Estate • Partnership Unit
        </v-col>
      </v-row>

      <v-row class="text-center text-caption mt-2">
        <v-col cols="12">
          <span class="text-grey-lighten-2">Developed and managed by </span>
          <a href="https://rameshvijay-portfolio.web.app/" target="_blank" rel="noopener noreferrer" class="text-accent text-decoration-none font-weight-bold hover-underline">
            VIJAY RAMESH
          </a>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  setup() {
    const footerLinks = [
      { name: 'Home', target: 'home' },
      { name: 'About', target: 'about' },
      { name: 'Organization', target: 'org' },
      { name: 'Machinery', target: 'machinery' },
      { name: 'Materials', target: 'materials' },
      { name: 'Gallery', target: 'gallery' },
      { name: 'Workflow', target: 'workflow' },
      { name: 'Quality', target: 'quality' },
      { name: 'Customers', target: 'customers' },
      { name: 'Reviews', target: 'testimonials' },
      { name: 'FAQ', target: 'faq' },
      { name: 'Estimator', target: 'estimator' },
      { name: 'Contact', target: 'contact' }
    ]

    const scrollTo = (targetId) => {
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }

    return {
      footerLinks,
      scrollTo
    }
  }
}
</script>

<style scoped>
.max-width-sm {
  max-width: 420px;
}

.gap-y-3 {
  row-gap: 12px;
}

.footer-link {
  transition: color 0.2s ease;
  cursor: pointer;
}

.footer-link:hover {
  color: rgb(var(--v-theme-accent)) !important;
}
</style>
