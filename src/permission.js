import router from './router'
import store from './store'
import { ElMessage as Message } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import { isLoggedIn, getRefreshToken } from './api/user'
import { encodePathComponent } from '@/store/modules/permission'
import ChatbotWidgetUtils from './utils/ChatbotWidgetUtils'
import { loadDynamicRoutes } from "@/utils/routes/loadDynamicRoutes";

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/passwordReset'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  let loggedIn
  try {
    // determine whether the user has logged in
    loggedIn = await isLoggedIn()
  } catch (error) {
    /**
     * If the user was not authorized then 404 error comes from BE from tokenMiddleware.
     * Therefore it is catched here and it is known that the user was not logged in
     */
    loggedIn = false
  }
  if (loggedIn) {
    // get Meta Info for the logged in customer
    if (store.getters.metainfo.customer == null) {
      await store.dispatch('user/getCustomerMetainfo')
    }
    // insert the chatbotWidget
    ChatbotWidgetUtils.insertChatbotWidget()
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get new token directly after the user opened the application
          await getNewTokenInCookies()

          await loadDynamicRoutes()

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ path: encodePathComponent(to.path), replace: true })
        } catch (error) {
          // remove roles and go to login page to re-login
          await store.dispatch('user/resetRoles')
          Message.error(error || 'Has Error')
          console.log(error)
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

/**
 * @throws {Error} when the token could not be refreshed
 */
async function getNewTokenInCookies() {
  await getRefreshToken()
}
// get new token every half an hour
setInterval(getNewTokenInCookies, 1000 * 60 * 30)
