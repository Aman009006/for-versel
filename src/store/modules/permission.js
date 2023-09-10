import { asyncRoutes, constantRoutes } from '@/router'
import { getSkillsWithIntents } from '@/api/answers'
import Layout from '@/layout/index.vue'
import { paths } from '@/constants'
import Reporting from '@/views/reporting/index.vue'
import Intents from '@/views/intents/index.vue'
import IntentGroup from '@/views/intents/intent-group/index.vue'

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
      '/benutzer',
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

/**
 * translates a path - component into a browser - readable name
 */
export function encodePathComponent(pathComponent) {
  return pathComponent.replace('(', '').replace(')', '').replace('?', '%3F')
}

/**
 * sort skillsWithIntents alphabetically by a given key
 */

function sortSkillsWithIntentsAlphabetically(array) {
  array.sort(function (a, b) {
    var textA = a.SkillName.toUpperCase();
    var textB = b.SkillName.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
}

/**
 * Make the routes for intent group overview
 */

export function makeRouteForIntents(skillsWithIntents) {
  sortSkillsWithIntentsAlphabetically(skillsWithIntents);
  const routes = [];
  const route = {
    path: paths.intents,
    name: 'IntentGroupOverview',
    isIntents: true,
    component: Layout,
    meta: {
      title: 'Dialoge',
      icon: 'comment',
    },
    children: [
      {
        path: paths.intents,
        props: { intentGroups: skillsWithIntents },
        component: Intents,
        name: 'Intents',
        meta: {
          placeholderTitle: 'Dialoge',
          icon: 'comment',
        },
      },
    ],
  }
  skillsWithIntents.forEach((skillWithIntent) => {
    const specificIntentGroupPath = encodeURIComponent(encodePathComponent(skillWithIntent.SkillName))
    route.children.push({
      path: `${paths.intents}/${encodeURIComponent(encodePathComponent(skillWithIntent.SkillName))}`,
      component: IntentGroup,
      props: { headline: skillWithIntent.SkillName, intents: skillWithIntent.Intents },
      // do i really need the names? --> Yes, you can use the name as an identifikator to go to specific routes
      name: `skill-${skillWithIntent.SkillName}`,
      meta: {
        title: `${skillWithIntent.SkillName}`,
        parentPath: `#${paths.intents}`,
      },
      children: [],
    })
    skillWithIntent.Intents.forEach((intent) => {
      route.children.push({
        path: `${paths.intents}/${specificIntentGroupPath}/${encodeURIComponent(encodePathComponent(intent.name))}`,
        component: () => import('@/views/intents/single-intent/index.vue'),
        name: `intent-${intent.name}`,
        meta: {
          title: `${intent.name}`,
          intentGroup: `${skillWithIntent.SkillName}`,
          parentPath: `#${paths.intents}/${specificIntentGroupPath}`,
          intent: `${intent.intent}`,
          entity: intent.entity,
          description: `${intent.description}`,
          newIntent: intent.newIntent,
          creationTimestamp: intent.creationTimestamp,
        },
      })
    })
  })
  routes.push(route);
  return routes
}

/**
 * @param powerBi_reportId is the given powerBI Report Id of the current customer.
 * @param customer is the current customer.
 * @return the route which redirects at the given PowerBI URL.
 */
export function createRouteForPowerBIReport(powerBi_reportId, customer) {
  const powerBIReportRoute = {
    path: '/reporting',
    component: Layout,
    children: [
      {
        path: paths.reporting,
        component: Reporting,
        props: { customer: customer, powerBiReportId: powerBi_reportId },
        name: 'Reporting',
        meta: {
          title: 'Reporting',
          icon: 'dashboard',
        },
      },
    ],
  }
  return powerBIReportRoute
}

const actions = {
  async pullIntentsAndSetRoutes({ commit, state, dispatch, rootGetters }, roles) {
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
    const additionalRoutes = makeRouteForIntents(state.skillsWithIntents);

    // add them to the existing dynamic routes
    let allAdditionalRoutes = additionalRoutes.concat(accessedRoutes)

    // get PowerBI Report ID and customer name from DB to create path and fill data
    const { powerBI_reportID, customer } = rootGetters.metainfo
    let powerBIReportRoute
    if (powerBI_reportID) {
      powerBIReportRoute = createRouteForPowerBIReport(powerBI_reportID, customer);
      allAdditionalRoutes = allAdditionalRoutes.concat(powerBIReportRoute)
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
