import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/all.scss'
import 'bootstrap/dist/js/bootstrap.bundle'
import { date, currency } from './utils/filters'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min, max, numeric } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import AOS from 'aos'
import 'aos/src/sass/aos.scss'
import axios from 'axios'
import CKEditor from '@ckeditor/ckeditor5-vue'

axios.interceptors.request.use(
  config => {
    // 從 localStorage 將 token 取出
    const token = localStorage.getItem('token')
    // 如果 token 存在的話，則帶入到 headers 當中
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  err => Promise.reject(err)
)

AOS.init()

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('number', numeric)

configure({
  generateMessage: localize({ zh_TW: zhTW }, { // 載入中文語系
    messages: {
      number: context => `${context.field} 必須是數字喔!` // 客製化錯誤訊息
    }
  }),
  validateOnInput: true // 當輸入內容時直接驗證
})
// 預設語系
setLocale('zh_TW')

const vm = createApp(App)

vm.config.globalProperties.$filters = {
  date,
  currency
}

vm.use(router)
vm.use(AOS)
vm.use(CKEditor)
vm.component('v-form', Form)
vm.component('v-field', Field)
vm.component('error-message', ErrorMessage)
vm.mount('#app')
