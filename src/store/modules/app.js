const sidebarClosed = "sidebarClosed"

function isSideBarOpenend() {
  const isClosed = localStorage.getItem(sidebarClosed)
  return isClosed === null
}

const state = {
  sidebar: {
    opened: isSideBarOpenend(),
    withoutAnimation: false
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      localStorage.removeItem(sidebarClosed)
    } else {
      localStorage.setItem(sidebarClosed, 1)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    localStorage.setItem(sidebarClosed, 1)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
