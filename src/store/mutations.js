export default {
  // session storage 
  setstore_id(state, payload) {
    state.auth.store_id = payload;
    sessionStorage.setItem("store_id", payload);
    // ------------------------------
    
  },
  setuser_id(state, payload){
    state.auth.user_id = payload;
    sessionStorage.setItem("user_id", payload);
  },

  setuser_name(state, payload){
    state.auth.user_name = payload;
    sessionStorage.setItem("user_name", payload);
  },

  setuser_store(state,payload){
    state.auth.user_store = payload;
    sessionStorage.setItem("user_store",payload);
  }

  

}