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
    getInfo({ commit }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const roles = ['admin']
                commit('SET_ROLES', roles)
                resolve(roles)
            }, 2000);
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
