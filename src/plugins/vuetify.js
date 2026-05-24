import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const lightTheme = {
  dark: false,
  colors: {
    background: '#F4F7FA',   // Soft industrial slate background
    surface: '#FFFFFF',
    primary: '#0B3C5D',      // Steel Navy
    secondary: '#328CC1',    // Machined Blue
    accent: '#D9B310',       // Gold Accent (represents precision/quality)
    error: '#E53935',
    info: '#1E88E5',
    success: '#43A047',
    warning: '#FB8C00',
    'on-background': '#1A2332',
    'on-surface': '#1A2332',
    'on-primary': '#FFFFFF',
    'on-secondary': '#FFFFFF',
  }
}

const darkTheme = {
  dark: true,
  colors: {
    background: '#02060c',   // Premium matte black CNC console canvas
    surface: '#070d14',      // Ultra-premium charcoal black card background
    primary: '#ffb703',      // Gilded yellow-gold
    secondary: '#8fa6b4',    // Steel Gray
    accent: '#ffb703',       // Yellow-gold accents
    error: '#EF5350',
    info: '#42A5F5',
    success: '#66BB6A',
    warning: '#FFA726',
    'on-background': '#ECEFF1',
    'on-surface': '#ECEFF1',
    'on-primary': '#02060c', // High contrast black text on gold buttons!
    'on-secondary': '#FFFFFF',
  }
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: lightTheme,
      dark: darkTheme,
    }
  }
})
