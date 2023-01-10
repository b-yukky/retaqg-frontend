/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'

import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import setupInterceptors from '@/services/setupInterceptors'
import '@/styles/styles.scss'
import '@core/scss/index.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { useAuthStore } from './stores/auth'

loadFonts()

const pinia = createPinia()
const app = createApp(App)

app.use(vuetify)
app.use(pinia)
app.use(router)
app.use(layoutsPlugin)

setupInterceptors(useAuthStore())

app.mount('#app')

