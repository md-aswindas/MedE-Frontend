<template>
  <div class="main-container">
    <div class="navbar">
      <div class="left-nav">
        <h1 class="logo">MedE</h1>
        <p class="nav-txt" style="width: 140px">
          <v-icon large color="#03045E" size="1.2rem" class="icon"
            >mdi-map-marker</v-icon
          >
          Find a store
        </p>
      </div>
      <div class="right-nav">
        <router-link
          to="/storeLogin"
          style="text-decoration: none; color: inherit; font-weight: 500"
        >
          <p class="nav-txt" style="width: 170px">
            <v-icon large color="#03045E" size="1.2rem" class="icon"
              >mdi-storefront-outline</v-icon
            >
            Become A Seller
          </p>
        </router-link>
        <router-link
          to="/userLogin"
          style="text-decoration: none; color: inherit; font-weight: 500"
        >
          <p
            class="nav-img"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              color: #03045e;
              padding: 7px;
              border-radius: 20px;
              width: 100px;
            "
          >
            <v-icon large color="#03045E" size="1.2rem" class="icon"
              >mdi-account-outline</v-icon
            >
            Sign In
          </p>
        </router-link>

        <p class="nav-txt">
          <v-icon large color="#03045E" size="1.2rem" class="icon"
            >mdi-cart-outline</v-icon
          >
          Cart
        </p>
      </div>
    </div>

    <div class="cart-main-container">
      <div class="cart-container">
        <h1 class="cart-head">Your Cart</h1>
        <div class="cart-card-div">
        <div class="cart-card">
          <img src="" alt="" class="card-img">
          <div class="card-content">
            <h3>Product Name</h3>
            <p>Price : </p>
            <p>Discount : </p>
            <p>Count : </p>
          </div>
          <div class="btns">
            <button type="button" class="remove-btn">Remove</button>
            <button type="button" class="buy-btn">Buy</button>
          </div>
          
        </div>
        
      </div>

      </div>
      <div class="price-container">
        <h1 class="cart-head">Checkout</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-container {
  width: 100%;
  /* height: fit-content; */
  background-color: rgb(255, 255, 255);
}

.navbar {
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 15px 40px -20px rgba(40, 44, 63, 0.15);
  -webkit-box-shadow: 0 15px 40px -20px rgba(40, 44, 63, 0.15);
}
.left-nav {
  height: 70px;
  width: 25%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 70px;
}
.right-nav {
  height: 70px;
  width: 35%;
  display: flex;
  align-items: center;
  margin-right: 70px;
  justify-content: space-between;
}
.logo {
  width: fit-content;
  height: fit-content;
  color: #03045e;
}
.searchbar {
  /* background-color:rgb(255, 255, 255); */
  height: 100px;
  margin-top: 72px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.search {
  background-color: rgb(255, 255, 255);
  width: 800px;
  height: 55px;
  padding-left: 50px;
  padding-right: 20px;
  border-radius: 50px;
  border: 0.5px solid rgb(209, 209, 209);
}
.searchicon {
  height: 60px;
  width: 60px;
  transform: translateX(-140%);
  margin-bottom: 10px;
  border-radius: 100%;
}
.nav-txt {
  font-weight: 500;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
  color: #03045e;
  border-radius: 20px;
}
.icon {
  margin-right: 5px;
}
.cart-main-container{
  width: 100%;
  height: 704px;
  background-color: rgb(244, 244, 244);
  padding: 5px;
  margin-top: 72px;
  display: flex;
  justify-content:space-around;
  align-items: center;
  
}
.cart-container{
  width: 64%;
  height: 680px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
}
.cart-card-div{
  overflow-y: auto;
  width: 100%;
  height: 100%;
}
.cart-card-div::-webkit-scrollbar{
  display: none;
}
.price-container{
  height: 680px;
  width:33%;
  background-color: #ffffff;
  margin: 0px 5px 5px 5px;
  border-radius: 10px;
  /* position: -webkit-sticky; */
  display: flex;
  justify-content: center;
  padding: 20px;
  
}
.cart-card{
  width:100%;
  height: 25%;
  background-color: rgb(244, 244, 244);
  border-radius: 10px;
  margin-bottom: 20px;
  border: 1px solid rgb(220, 220, 220);
  padding: 10px;
  display: flex;
  align-items: center;
}
.cart-head{
  width: fit-content;
  height: fit-content;
  margin: 10px;
  margin-bottom: 30px;
  position: -webkit-sticky;
  font-size: 22px;
  font-weight: 500;
  color: #03045e;
}
.card-img{
  width: 130px;
  height: 130px;
  border-radius: 10px;
  background-color: #03045e;
}
.card-content{
  height: 130px;
  width: 586px;
  margin-left: 15px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.btns{
  height: 130px;
  width: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
}
.remove-btn{
  background-color: white;
  border: 2px solid #03045e;
  color: #03045e;
  border-radius: 5px;
  cursor: pointer;
  /* background-image: url(grocery-store.png);
    background-repeat: no-repeat;
    background-position: 1em center;
    background-size: 1rem; */
  font-weight: 700;
  width: 150px;
  height: 40px;
  margin-bottom: 20px;
  
}
.buy-btn{
  background-color: #03045e;
  border: 2px solid #03045e;
  color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  /* background-image: url(grocery-store.png);
    background-repeat: no-repeat;
    background-position: 1em center;
    background-size: 1rem; */
  font-weight: 700;
  width: 150px;
  height: 40px;
  
}

</style>
