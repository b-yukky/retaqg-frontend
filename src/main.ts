/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import layoutsPlugin from '@/plugins/layouts'
import tooltip from "@/plugins/tooltip"
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import setupInterceptors from '@/services/setupInterceptors'
import '@/styles/styles.scss'
import '@/styles/tooltip.css'
import '@core/scss/index.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

loadFonts()
setupInterceptors()

const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(layoutsPlugin)
app.directive("tooltip", tooltip)
app.mount('#app')

