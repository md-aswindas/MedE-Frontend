import { createStore } from "vuex";
import rootActions from './actions.js'
import rootGetters from './getter.js'
import rootMutations from './mutations.js'

const store = createStore({
  state(){
    return{
      base_url:'http://localhost:8081'
    };
  },
  mutations:rootMutations,
  actions:rootActions,
  getters:rootGetters
})
export default store;