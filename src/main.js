import './styles/element-variables.module.scss'
import '@/styles/index.scss'
import './icons'
import ApplicationCreator from '@/application/ApplicationCreator'
import './permission'

const application = ApplicationCreator.createApp();
application.mount('#app');
