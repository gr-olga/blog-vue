import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {ceatePinia, createPinia} from 'pinia'

createApp(App)
    .use(createPinia())
    .mount('#app')
