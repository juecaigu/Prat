import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    position:"北京",
    userName:"",
  },
  mutations: {
    setPosition(state,value){
      state.position = value;
    },
    setName(state,value){
      state.userName = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
