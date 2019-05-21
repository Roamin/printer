import Vue from 'vue'
import Vuex from 'vuex'

// import { createPersistedState, createSharedMutations } from 'vuex-electron'

import workspace from './modules/workspace'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    workspace
  },
  // plugins: [createPersistedState(), createSharedMutations()],
  strict: process.env.NODE_ENV !== 'production'
})
