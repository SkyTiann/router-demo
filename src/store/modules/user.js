import { getRoles } from '@/api'
import { groups } from '@/router'
import { roleSidebar } from '@/router/compute'


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
    },
}

const actions = {
    async getUserRoles({ commit }) {
        const roles = await getRoles()
        commit('SET_ROLES', roles)
        commit('SET_SIDEBAR',roleSidebar(groups, roles))
        return roles
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
