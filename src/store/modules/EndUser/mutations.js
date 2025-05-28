export default{
  setCartProducts(state, products) {
    state.cartProducts = products.items || [];
    state.cartCount = products.items?.length || 0;
  },
}
