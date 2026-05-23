<template>
  <div>
    <!-- Navigation Bar -->
    <v-app-bar
      flat
      sticky
      class="glass-nav px-md-8 px-2"
      style="border-bottom: 1px solid rgba(143, 166, 180, 0.2);"
      :color="isDark ? 'rgba(21, 31, 50, 0.85)' : 'rgba(255, 255, 255, 0.85)'"
    >
      <!-- Logo / Title -->
      <v-avatar class="mr-3" rounded="lg" color="primary" size="40">
        <v-icon color="accent" size="24">mdi-axis-arrow</v-icon>
      </v-avatar>
      
      <div>
        <v-app-bar-title class="font-weight-black text-h6 tracking-widest text-primary d-flex align-center">
          MICROCUT
          <span class="text-accent font-weight-light ml-1 text-subtitle-2 d-none d-sm-inline">ENGINEERING</span>
        </v-app-bar-title>
      </div>

      <v-spacer></v-spacer>

      <!-- Desktop Links -->
      <div class="d-none d-lg-flex align-center">
        <template v-for="(item, idx) in navItems" :key="idx">
          
          <v-menu v-if="item.children" open-on-hover open-delay="0" close-delay="100">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="text"
                class="text-body-2 font-weight-medium mx-1 nav-btn text-capitalize"
                append-icon="mdi-chevron-down"
              >
                {{ item.name }}
              </v-btn>
            </template>
            <v-list class="bg-surface border" elevation="3" rounded="lg">
              <v-list-item
                v-for="(child, childIdx) in item.children"
                :key="childIdx"
                @click="scrollTo(child.target)"
                class="hover-bg-light"
              >
                <template v-slot:prepend>
                  <v-icon size="small" color="secondary" class="mr-3">{{ child.icon }}</v-icon>
                </template>
                <v-list-item-title class="text-body-2 font-weight-medium text-primary">{{ child.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn
            v-else
            variant="text"
            class="text-body-2 font-weight-medium mx-1 nav-btn text-capitalize"
            @click="scrollTo(item.target)"
          >
            {{ item.name }}
          </v-btn>
          
        </template>

        <!-- Divider -->
        <v-divider vertical class="mx-3 my-4" style="opacity: 0.3;"></v-divider>
      </div>

      <!-- Theme Switcher -->
      <v-btn icon @click="toggleTheme" class="mr-1">
        <v-icon :color="isDark ? 'amber' : 'primary'">
          {{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
        </v-icon>
      </v-btn>

      <!-- Mobile Hamburger -->
      <v-app-bar-nav-icon
        class="d-lg-none"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="right"
      color="background"
    >
      <v-list class="py-4">
        <v-list-item class="px-4 mb-4">
          <div class="d-flex align-center">
            <v-avatar class="mr-3" color="primary" size="36">
              <v-icon color="accent" size="20">mdi-axis-arrow</v-icon>
            </v-avatar>
            <span class="font-weight-black text-h6 text-primary">MICROCUT</span>
          </div>
        </v-list-item>

        <v-divider class="mb-4"></v-divider>

        <template v-for="(item, idx) in navItems" :key="idx">
          <v-list-group v-if="item.children" :value="item.name">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                class="px-6 py-2"
              >
                <template v-slot:prepend>
                  <v-icon color="secondary" class="mr-2">{{ item.icon || 'mdi-menu' }}</v-icon>
                </template>
                <v-list-item-title class="font-weight-medium">{{ item.name }}</v-list-item-title>
              </v-list-item>
            </template>
            
            <v-list-item
              v-for="(child, childIdx) in item.children"
              :key="childIdx"
              link
              @click="scrollToMobile(child.target)"
              class="px-10 py-1"
            >
              <template v-slot:prepend>
                <v-icon color="secondary" size="small" class="mr-3">{{ child.icon }}</v-icon>
              </template>
              <v-list-item-title class="font-weight-regular text-body-2">{{ child.name }}</v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-item
            v-else
            link
            @click="scrollToMobile(item.target)"
            class="px-6 py-2"
          >
            <template v-slot:prepend>
              <v-icon color="secondary" class="mr-2">{{ item.icon }}</v-icon>
            </template>
            <v-list-item-title class="font-weight-medium">{{ item.name }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { useTheme } from 'vuetify'
import { ref, computed } from 'vue'

export default {
  name: 'Navbar',
  props: {
  },
  emits: ['toggle-theme'],
  setup(props, { emit }) {
    const theme = useTheme()
    const drawer = ref(false)

    const isDark = computed(() => theme.global.current.value.dark)

    const navItems = [
      { name: 'Home', target: 'home', icon: 'mdi-home' },
      { 
        name: 'Company',
        icon: 'mdi-domain',
        children: [
          { name: 'About Us', target: 'about', icon: 'mdi-information' },
          { name: 'Organization', target: 'org', icon: 'mdi-account-group' }
        ]
      },
      { 
        name: 'Capabilities',
        icon: 'mdi-cogs',
        children: [
          { name: 'Machinery', target: 'machinery', icon: 'mdi-cog' },
          { name: 'Materials', target: 'materials', icon: 'mdi-layers-triple' },
          { name: 'Workflow', target: 'workflow', icon: 'mdi-sitemap' },
          { name: 'Quality', target: 'quality', icon: 'mdi-shield-check' }
        ]
      },
      { 
        name: 'Clients',
        icon: 'mdi-account-star',
        children: [
          { name: 'Customers', target: 'customers', icon: 'mdi-database' },
          { name: 'Gallery', target: 'gallery', icon: 'mdi-image-multiple' },
          { name: 'Reviews', target: 'testimonials', icon: 'mdi-format-quote-open' }
        ]
      },
      { name: 'FAQ', target: 'faq', icon: 'mdi-frequently-asked-questions' },
      { name: 'Cost Estimator', target: 'estimator', icon: 'mdi-calculator' },
      { name: 'Contact', target: 'contact', icon: 'mdi-phone' }
    ]

    const toggleTheme = () => {
      emit('toggle-theme')
    }

    const scrollTo = (targetId) => {
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }

    const scrollToMobile = (targetId) => {
      drawer.value = false
      setTimeout(() => {
        scrollTo(targetId)
      }, 300)
    }

    return {
      drawer,
      isDark,
      navItems,
      toggleTheme,
      scrollTo,
      scrollToMobile
    }
  }
}
</script>

<style scoped>
.nav-btn {
  letter-spacing: 0.5px;
  position: relative;
  transition: color 0.3s ease;
}

.nav-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: rgb(var(--v-theme-accent));
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-btn:hover::after {
  width: 70%;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 6px rgba(76, 175, 80, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
  }
}

.pulse-badge :deep(.v-badge__badge) {
  animation: pulse 1.8s infinite;
}
</style>
