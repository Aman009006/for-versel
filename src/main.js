import ApplicationCreator from '@/application/ApplicationCreator'
import './styles/element-variables.module.scss'
import '@/styles/index.scss'
import './permission'

const application = ApplicationCreator.createApp();
application.mount('#app');
