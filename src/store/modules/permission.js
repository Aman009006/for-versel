import { asyncRoutes, constantRoutes } from '@/router'
import { getSkillsWithIntents } from '@/api/answers'
import IntentRouteCreator from '@/utils/routes/IntentRouteCreator'
import PowerBiRouteCreator from '@/utils/routes/PowerBiRouteCreator.js'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role))
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

  routes.forEach((route) => {
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
  addRoutes: [],
  skillsWithIntents: [],
  // link: 'https://app.powerbi.com/groups/aaf839c8-bbf7-46d4-afb0-19832c9b8b1b/reports/7ec29e52-3f8b-4cd9-b518-5c008a90f198/ReportSection3f54145046b3409026bd?ctid=58edcd46-9a0e-4d7f-9e4d-8da23bf52b1c&openReportSource=ReportInvitation'
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
      '/intents',
      '/placeholders',
      '/reporting',
      '/jira',
      '/notes',
      '/manual',
      '/manualChatbot',
    ]
    state.routes.sort((route1, route2) => {
      const { path: path1 } = route1
      const { path: path2 } = route2
      if (order.indexOf(path1) > order.indexOf(path2)) {
        return 1
      } else {
        return -1
      }
    })
  },
  SET_SKILLS_WITH_INTENTS: (state, skillsWithIntents) => {
    state.skillsWithIntents = skillsWithIntents
  },
}

const actions = {
  async pullIntentsAndSetRoutes({ commit, state, dispatch }, roles) {
    // add dynamic routes here
    let accessedRoutes
    if (roles.includes('admin')) {
      accessedRoutes = asyncRoutes || []
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    // call the action which gets skills and intents from the DB and saves them in the state
    await dispatch(actions.setSkillsAndIntents.name)

    // make dynamic routes for skills and intents
    const additionalRoutes = new IntentRouteCreator(state.skillsWithIntents).createIntentRouting();

    // create all additionalRoutes
    let allAdditionalRoutes = additionalRoutes.concat(accessedRoutes)

    // create PowerBI Route
    const powerBiReportRoute = new PowerBiRouteCreator().createRouteForPowerBIReport()
    if (powerBiReportRoute !== null) {
      // add powerBiReportRoute to the existing dynamic routes
      allAdditionalRoutes = allAdditionalRoutes.concat(powerBiReportRoute)
    }

    commit('SET_ROUTES', allAdditionalRoutes)
    return allAdditionalRoutes
  },

  async generateRoutes({ dispatch }, roles) {
    // get this informations in a defined interval. The answerTexts can change over time
    setInterval(() => dispatch(actions.setSkillsAndIntents.name), 1000 * 60)
    const allAdditionalRoutes = dispatch(
      actions.pullIntentsAndSetRoutes.name,
      roles
    )
    return allAdditionalRoutes
  },

  async setSkillsAndIntents({ commit }) {
    // get skills and intents from the DB
    const skillsWithIntents = await getSkillsWithIntents()
    // save the data in the state
    commit('SET_SKILLS_WITH_INTENTS', skillsWithIntents)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
