<template>
  <v-footer 
    class="py-12 px-4 border-t" 
    :style="{
      borderTop: isDark ? '2px solid rgba(255, 183, 3, 0.45) !important' : '2px solid rgba(143, 166, 180, 0.2) !important'
    }"
    color="background"
  >
    <v-container>
      <v-row class="justify-space-between mb-8">
        
        <!-- Left Side: Slogan and Branding -->
        <v-col cols="12" md="3" class="py-2">
          <div class="d-flex align-center mb-4">
            <v-avatar :color="isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(11, 60, 93, 0.1)'" size="36" class="mr-3">
              <v-icon color="accent" size="18">mdi-axis-arrow</v-icon>
            </v-avatar>
            <span class="font-weight-black text-h6 tracking-widest" :class="isDark ? 'text-white' : 'text-primary'">MICROCUT ENGINEERING</span>
          </div>

          <p class="text-body-2 leading-relaxed mb-4 max-width-sm" :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-2'">
            Specialist in high-precision rod cutting and machining solutions. Certified partnership startup dedicated to supporting Chennai's engineering services since 2019.
          </p>

          <div class="pa-3 rounded-lg border" :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(11, 60, 93, 0.05)', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(11, 60, 93, 0.1)' }">
            <div class="text-caption tracking-wide font-weight-bold mb-1" :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-1'">OUR MISSION COMMITMENT</div>
            <div class="text-body-2 font-weight-bold text-accent">Price • Best Service • On-Time Delivery • Customer Satisfaction</div>
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
                <span class="text-body-2 font-weight-medium hover-text-white" :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-1'">{{ link.name }}</span>
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
                <div class="text-body-2 mb-1" :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-1'">Hotline Telephones:</div>
                <div class="text-body-2 font-weight-bold mb-2" :class="isDark ? 'text-white' : 'text-grey-darken-3'">+91 96772 84841 (Mr. Kishore)</div>
                <div class="text-body-2 font-weight-bold" :class="isDark ? 'text-white' : 'text-grey-darken-3'">+91 98401 58782 (Mr. Santhosh)</div>
              </div>
            </div>

            <div class="d-flex align-start">
              <v-icon color="secondary" size="18" class="mr-3 mt-1">mdi-email-outline</v-icon>
              <div>
                <div class="text-body-2 mb-1" :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-1'">Official Inquiry Mail:</div>
                <a href="mailto:microcutengineerings@gmail.com" target="_blank" rel="noopener noreferrer" class="text-body-2 font-weight-bold text-accent text-decoration-none d-block mt-0.5" style="word-break: break-word; overflow-wrap: break-word;">
                  microcutengineerings<wbr>@gmail.com
                </a>
              </div>
            </div>
            
            <div class="mt-4 pt-4 border-t" :style="{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }">
              <div class="text-caption mb-2 font-weight-medium" :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-1'">Connect With Us:</div>
              <div class="d-flex gap-2">
                <v-btn icon="mdi-linkedin" size="small" :color="isDark ? 'white' : 'primary'" variant="tonal" class="mr-2" href="#" target="_blank"></v-btn>
                <v-btn icon="mdi-facebook" size="small" :color="isDark ? 'white' : 'primary'" variant="tonal" class="mr-2" href="#" target="_blank"></v-btn>
                <v-btn icon="mdi-instagram" size="small" :color="isDark ? 'white' : 'primary'" variant="tonal" class="mr-2" href="#" target="_blank"></v-btn>
                <v-btn icon="mdi-whatsapp" size="small" :color="isDark ? 'white' : 'primary'" variant="tonal" href="https://wa.me/919677284841" target="_blank"></v-btn>
              </div>
            </div>
          </div>
        </v-col>

      </v-row>

      <v-divider class="mb-6" :style="{ opacity: isDark ? 0.08 : 0.15 }"></v-divider>

      <!-- Bottom Credits -->
      <v-row class="align-center justify-space-between text-caption" :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-1'">
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
          <span :class="isDark ? 'text-grey-lighten-2' : 'text-grey-darken-1'">Developed and managed by </span>
          <a href="https://rameshvijay-portfolio.web.app/" target="_blank" rel="noopener noreferrer" class="text-accent text-decoration-none font-weight-bold hover-underline">
            VIJAY RAMESH
          </a>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import { useTheme } from 'vuetify'
import { computed } from 'vue'

export default {
  name: 'Footer',
  setup() {
    const theme = useTheme()
    const isDark = computed(() => theme.global.name.value === 'dark')

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
      scrollTo,
      isDark
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
