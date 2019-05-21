const state = {
  repositoryPath: {
    name: '',
    path: ''
  },
  category: {
    name: '',
    path: ''
  },
  article: {
    name: '',
    path: ''
  }
}

const mutations = {
  updateCategory (state, { name, path }) {
    state.category = {
      name,
      path
    }
  },
  updateArticle (state, { name, path }) {
    state.article = {
      name,
      path
    }
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
