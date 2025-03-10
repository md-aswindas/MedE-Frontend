import { createStore } from "vuex";
import rootActions from './actions.js'
import rootGetters from './getter.js'
import rootMutations from './mutations.js'
import Adminmodule from './modules/Admin/index.js'
import EndUsermodule from './modules/EndUser/index.js'
import MedEStoremodule from "./modules/MedEStore/index.js";


const store = createStore({
  modules:{
    Admin : Adminmodule,
    EndUser : EndUsermodule,
    MedEStore : MedEStoremodule,
  },
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