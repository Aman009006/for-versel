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
  }
}

/**
 * translates a path - component into a browser - readable name
 */
function encodePathComponent(pathComponent) {
  return encodeURIComponent(pathComponent.replace('(', '%28').replace(')', '%29'))
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
      title: 'Skills and intents', icon: 'chart'
    },
    children: []
  }

  skillsWithIntents.forEach(skillWithIntent => {
    route.children.push({
      path: encodePathComponent(skillWithIntent.SkillName),
      component: routerView,
      // do i really need the names?
      name: `skill-${skillWithIntent.SkillName}`,
      meta: {
        title: `${skillWithIntent.SkillName}`
      },
      children: []
    })
    skillWithIntent.IntentNames.forEach(intentName => {
      route.children[route.children.length - 1].children.push({
        path: encodePathComponent(intentName),
        component: () => import('@/views/intent/index'),
        name: `intent-${intentName}`,
        meta: {
          title: `${intentName}`
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
