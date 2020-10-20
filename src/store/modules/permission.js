import { asyncRoutes, constantRoutes } from '@/router'
import { getSkillsWithIntents } from '@/api/skillsWithIntents'
import Layout from '@/layout'

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
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

/**
 * the skills and intents are pulled from the database and
 * translated into a vue - readable form
 */
export async function getDynamicSkillsWithIntents() {
  const skillsWithIntents = await getSkillsWithIntents()
  const routes = []
  skillsWithIntents.forEach(skillWithIntent => {
    const route = {
      path: '/skills/' + skillWithIntent.SkillName,
      component: Layout,
      name: `skill-${skillWithIntent.SkillName}`,
      meta: {
        title: `skill: ${skillWithIntent.SkillName}`,
        icon: 'user'
      },
      children: []
    }
    skillWithIntent.IntentNames.forEach(intentName => {
      route.children.push({
        path: intentName,
        component: () => import('@/views/home/index'),
        name: `intent-${intentName}`,
        meta: {
          title: `intent: ${intentName}`,
          icon: 'user'
        }
      })
    })
    routes.push(route)
    // router.addRoutes(routes)
  })
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
