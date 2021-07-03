import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/all.scss'
import { date, currency } from './utils/filters'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min, max, numeric } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

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
vm.component('v-form', Form)
vm.component('v-field', Field)
vm.component('error-message', ErrorMessage)
vm.mount('#app')
