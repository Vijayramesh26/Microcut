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
    background: '#0B111E',   // Midnight steel
    surface: '#151F32',      // Deep charcoal-blue
    primary: '#328CC1',      // Machined Blue
    secondary: '#8FA6B4',    // Steel Gray
    accent: '#F26A36',       // Molten Orange (represents heat cutting)
    error: '#EF5350',
    info: '#42A5F5',
    success: '#66BB6A',
    warning: '#FFA726',
    'on-background': '#ECEFF1',
    'on-surface': '#ECEFF1',
    'on-primary': '#FFFFFF',
    'on-secondary': '#0F172A',
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
