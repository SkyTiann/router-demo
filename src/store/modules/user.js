import { AuthConfig } from '../../router/authConfig'
import { routes } from '../../router/index'

/**
 * 模拟网络请求
 */
const getRoles = () => new Promise((resolve, reject) => {
    setTimeout(() => { resolve(['user']) }, 2000);
})

const state = {
    roles: [],
    sidebar: []
}

const mutations = {
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_SIDEBAR: (state, sidebar) => {
        state.sidebar = sidebar
    }
}

const actions = {
    async getUserRoles({ commit }) {
        const roles = await getRoles()
        commit('SET_ROLES', roles)
        commit('SET_SIDEBAR', AuthConfig.generateSidebar(routes, roles))
        return roles
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
