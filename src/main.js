import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/all.scss'
import { date, currency } from './util/filters'

const vm = createApp(App)

vm.config.globalProperties.$filters = {
  date,
  currency
}

vm.use(router)
vm.mount('#app')
