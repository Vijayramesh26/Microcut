import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import vAnimate from './directives/vAnimate'

const app = createApp(App)

app.use(vuetify)
app.directive('animate', vAnimate)

app.mount('#app')
