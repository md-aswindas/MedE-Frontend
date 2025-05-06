export default{
  getUrl : (state) => state.base_url,
  getstore_id: (state) => state.auth.store_id, // session storage
  getuser_id: (state) => state.auth.user_id,
  
}