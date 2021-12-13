/* eslint-disable no-async-promise-executor */
import { login, logOutAndRemoveCookie } from '@/api/user'
import { getToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { getCustomerMetaData } from '@/api/customer.js'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  // the user is logged out per default
  loggedOut: true
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_LOGGED_OUT: (state, loggedOut) => {
    state.loggedOut = loggedOut
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { customer, username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ customer: customer, email: username.trim(), password: password }).then(response => {
        // call the set fct (mutation) which sets the logged-out-flag at false
        commit('SET_LOGGED_OUT', false)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise(async (resolve, reject) => {
      /**
       * static info is added at the moment.
       * In the future you can get informations about the user
       * in this function.
       */
      const roles = ['admin']
      const name = 'name'
      const { avatar_link } = await getCustomerMetaData();
      const avatar = avatar_link
      const introduction = 'introduction'
      commit('SET_ROLES', roles)
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      commit('SET_INTRODUCTION', introduction)
      resolve({ roles, name, avatar, introduction })
    })
  },

  // user logout
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      logOutAndRemoveCookie().then(() => {
        commit('SET_LOGGED_OUT', true)
        commit('SET_ROLES', [])
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove roles
  resetRoles({ commit }) {
    return new Promise(resolve => {
      commit('SET_ROLES', [])
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const { roles } = await dispatch('getInfo')
    resetRouter()
    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
