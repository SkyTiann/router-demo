const state = {
    /* { Array<{ path: string, name: string}>} */
    tags: []
}


const mutations = {
    ADD_TAG(state, tag) {
        if (state.tags.some((innerTag) => innerTag.path === tag.path)) return
        state.tags.push(tag)
    },
    DEL_TAG(state, path) {
        if (state.tags.length <= 1) return
        const index = state.tags.findIndex((tag) => tag.path === path)
        index > -1 && state.tags.splice(index, 1)
    }
}

const actions = {
    addTag({ commit }, tag) {
        commit('ADD_TAG', tag)
    },
    delTag({ commit }, path) {
        commit('DEL_TAG', path)
    }
}



export default {
    namespaced: true,
    state,
    mutations,
    actions
}
