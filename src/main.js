import { createApp } from 'vue'

import Element from 'element-plus'
import './styles/element-variables.module.scss'
import enLang from 'element-plus/es/locale/lang/en'

import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'
import Vuex from 'vuex'

import './icons'
import './permission'

import SvgIcon from '@/components/SvgIcon'

const app = createApp(App);
app.use(Element, {
  size: 'default',
  locale: enLang,
});
app.use(store);
app.use(router);
app.use(Vuex);

app.mount('#app')

app.component('SvgIcon', SvgIcon)