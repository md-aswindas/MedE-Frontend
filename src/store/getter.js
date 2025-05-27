export default{
  getUrl : (state) => state.base_url,
  getstore_id: (state) => state.auth.store_id, // session storage
  getuser_id: (state) => state.auth.user_id,
  getuser_name: (state) => state.auth.user_name,
  getuser_store: (state) => state.auth.user_store,
}