const state = {
    routeMaps: [],
    tags: []
}

const mutations = {
    SET_ROUTEMAPS: (state, routeMaps) => {
        state.routeMaps = routeMaps
    }
}

const actions = {}



export default {
    namespaced: true,
    state,
    mutations,
    actions
}
