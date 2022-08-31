import { createApp } from 'vue'

import Element from 'element-plus'
import './styles/element-variables.module.scss'
import enLang from 'element-plus/es/locale/lang/en'

import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

import './icons'
import './permission'

const app = createApp(App);
app.use(Element, {
  size: 'default',
  locale: enLang,
});
app.use(store);
app.use(router);

app.mount('#app')
