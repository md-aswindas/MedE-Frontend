export default{
  // session storage 
  setstore_id(state,payload){
    state.auth.store_id=payload;
    sessionStorage.setItem("store_id",payload);
    // ------------------------------
  }
}