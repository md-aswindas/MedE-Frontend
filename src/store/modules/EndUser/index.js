import actions from "./actions";
import getter from "./getter";
import mutations from "./mutations";

export default{
  namespaced: true,
  state(){
    return {
      cartProducts: [],
      cartCount: 0
    };
  },
  mutations,getter,actions
}