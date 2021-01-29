import { asyncRoutes, constantRoutes } from '@/router'
import { getSkillsWithIntents } from '@/api/answers'
import Layout from '@/layout'
import routerView from '@/views/routerView'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  /**
   * add new routes to the store. The navigation gets updated automatically.
   * The routes are added to the router automatically, too.
   * use it with the function "commit"
   * @see https://vuex.vuejs.org/guide/mutations.html
   */
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    // set the order of the routes:
    const order = [
      '/',
      '/skills',
      '/jira',
      '/snippet',
    ]
    state.routes.sort((route1, route2) => {
      const { path: path1 } = route1
      const { path: path2 } = route2
      if (order.indexOf(path1) > order.indexOf(path2)) {
        return 1;
      } else {
        return -1;
      }
    });
  }
}

/**
 * translates a path - component into a browser - readable name
 */
export function encodePathComponent(pathComponent) {
  return pathComponent.replace('(', '').replace(')', '').replace('?', '%3F')
}

/**
 * the skills and intents are pulled from the database and
 * translated into a vue - readable form
 */
export async function getDynamicSkillsWithIntents() {
  const skillsWithIntents = await getSkillsWithIntents()
  const routes = []
  const route = {
    path: '/skills',
    component: Layout,
    name: 'Skills and intents',
    meta: {
      title: 'Dialoge', icon: 'el-icon-s-comment'
    },
    children: []
  }
  skillsWithIntents.forEach(skillWithIntent => {
    route.children.push({
      path: encodePathComponent(skillWithIntent.SkillName),
      component: routerView,
      // do i really need the names? --> Yes, you can use the name as an identifikator to go to specific routes
      name: `skill-${skillWithIntent.SkillName}`,
      meta: {
        title: `${skillWithIntent.SkillName}`
      },
      children: []
    })
    skillWithIntent.Intents.forEach(intent => {
      route.children[route.children.length - 1].children.push({
        path: encodePathComponent(intent.name),
        component: () => import('@/views/intent/index'),
        name: `intent-${intent.name}`,
        meta: {
          title: `${intent.name}`
        }
      })
    })
  })
  routes.push(route)
  return routes
}

const actions = {
  generateRoutes({ commit }, roles) {
    // add dynamic routes here
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      getDynamicSkillsWithIntents().then(additionalRoutes => {
        const allAdditionalRoutes = additionalRoutes.concat(accessedRoutes)
        commit('SET_ROUTES', allAdditionalRoutes)
        resolve(allAdditionalRoutes)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
