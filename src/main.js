import Vue from 'vue'

import Element from 'element-ui'
import './styles/element-variables.module.scss'
import enLang from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

import './icons'
import './permission'

import * as filters from './filters'

Vue.use(Element, {
  size: 'medium',
  locale: enLang
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
