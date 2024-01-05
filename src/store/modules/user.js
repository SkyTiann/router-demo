import { getRoles } from '@/api'
import { routes } from '@/router'
import { roleStrategy } from '@/router/strategy'


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
        commit('SET_SIDEBAR', roleStrategy.generateSidebar(routes, roles))
        return roles
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
