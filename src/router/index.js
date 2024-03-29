import { createRouter, createWebHashHistory } from 'vue-router'
import { links } from '@/constants'

/* Layout */
import Layout from '@/layout/index.vue'
import { paths } from '@/constants'

/* Component */
import Login from '@/views/login/index.vue'
import AuthRedirect from '@/views/login/auth-redirect.vue'
import Page404 from '@/views/error-page/404.vue'
import Dashboard from '@/views/dashboard/index.vue'
import PlaceHolders from '@/views/placeholders/index.vue'
import PasswordReset from '@/views/passwordReset/index.vue'
import SendResetMail from '@/views/sendResetMail/index.vue'
import AdminPage from '@/views/admin-page/index.vue'
import AdminRolePage from '@/views/admin-page-roles/index.vue'
import AdminRolePageEdit from '@/views/admin-page-roles-edit-create/index.vue'

export const constantRoutes = [
  {
    path: '/login',
    component: Login,
    hidden: true,
  },
  {
    path: '/auth-redirect',
    component: AuthRedirect,
    hidden: true,
  },
  {
    path: '/404',
    component: Page404,
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: Dashboard,
        name: 'Home',
        meta: { title: 'Home', icon: 'home_filled', affix: true },
      },
    ],
  },
  {
    path: paths.placeholders,
    component: Layout,
    children: [
      {
        path: paths.placeholders,
        component: PlaceHolders,
        name: 'Platzhalter',
        meta: {
          title: 'Platzhalter',
          icon: 'edit',
        },
      },
    ],
  },
  {
    path: paths.users,
    component: Layout,
    meta: {
      title: 'Benutzer',
      icon: 'user',
    },
    children: [
      {
        path: "",
        component: AdminPage,
        name: 'Benutzer',
        meta: {
          title: 'Benutzer',
          parentPath: `#${paths.users}`,
        },
      },
      {
        path: paths.permissionSets,
        component: AdminRolePage,
        name: 'Rollenübersicht',
        meta: {
          title: 'Rollenübersicht',
          parentPath: `#${paths.users}`,
        },
      },
      {
        path: paths.permissionSettings,
        component: AdminRolePageEdit,
        name: 'Berechtigungs Optionen',
        meta: {
          title: 'Berechtigungs Optionen',
          parentPath: `#${paths.users}`,
        },
      },
    ],
  },
  {
    path: '/notes',
    component: Layout,
    children: [
      {
        path: links.releaseNotes,
        meta: { title: 'Release Notes', icon: 'external_link' },
      },
    ],
  },
  {
    path: '/jira',
    component: Layout,
    children: [
      {
        path: links.jiraHelpDesk,
        meta: { title: 'JIRA Service Desk', icon: 'external_link' },
      },
    ],
  },
  {
    path: '/manual',
    component: Layout,
    children: [
      {
        path: links.manual,
        meta: { title: 'Bedienungsanleitung', icon: 'external_link' },
      },
    ],
  },
  {
    path: '/manualChatbot',
    component: Layout,
    children: [
      {
        path: links.manualChatbot,
        meta: { title: 'API-Dokumentation', icon: 'external_link' },
      },
    ],
  },
  {
    path: '/sendResetMail',
    component: SendResetMail
  },
  {
    path: '/passwordReset',
    component: PasswordReset
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    hidden: true,
    meta: {
      title: 'Error Pages',
      icon: '404',
    },
    children: [
      {
        path: '404',
        component: () => import('@/views/error-page/404.vue'),
        name: 'Page404',
        meta: { title: '404', noCache: true },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  { path: '/:catchAll(.*)', redirect: '/404', hidden: true },
]

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter({
    history: createWebHashHistory(),
    routes: []
  })
  router.matcher = newRouter.matcher // reset router
}
const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
export default router
