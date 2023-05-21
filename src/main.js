import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { galleryStore } from './store/galleryStore'

import './styles/global.scss'

loadFonts()

createApp(App).use(vuetify).use(galleryStore).mount('#app')
