import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// The one global stylesheet, imported here so every component shares it.
import './assets/styles.css'

const app = createApp(App)

// Pinia goes in first. The header and the views call useThemeStore() and
// useQuoteStore() the moment they render, so the stores have to exist
// before anything mounts.
app.use(createPinia())
app.use(router)

app.mount('#app')
