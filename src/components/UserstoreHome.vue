<template>
  <div class="main-container">
    <div class="navbar">
      <div class="left-nav">
        <h1 class="logo">MedE</h1>
        <p class="nav-txt">  <v-icon large color="black" size="1.2rem" class="icon">mdi-map-marker</v-icon> Find a store  </p>
      </div>
      <div class="right-nav">

        <p class="nav-txt"> <v-icon large color="black" size="1.2rem" class="icon">mdi-storefront-outline</v-icon>     Merchant  </p>

        <router-link to="/"  style="text-decoration: none; color: inherit; font-weight: 500;"><p class="nav-img">  <v-icon large color="black" size="1.2rem" class="icon">mdi-account-outline</v-icon>Sign In</p></router-link>


        <p class="nav-txt"><v-icon large color="black" size="1.2rem" class="icon">mdi-cart-outline</v-icon>   Cart</p>

        <p class="nav-txt"> <v-icon large color="black" size="1.2rem" class="icon">mdi-arrow-up-bold-box-outline</v-icon>  help</p>

      </div>
    </div>
    <div class="searchbar">
      <input type="text" name="search" class="search" placeholder="Search Product / Store" >
      <v-icon large color="black" class="searchicon" size="35px">mdi-magnify</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-container{
  width: 100%;
  height:100vh;
  background-color: aquamarine;
}
.navbar{
  width: 100%;
  height: 70px;
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: space-between;
}
.left-nav{
  height: 70px;
  width: 25%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 70px;
}
.right-nav{
  height: 70px;
  width: 35%;
  display: flex;
  align-items: center;
  margin-right: 70px;
  justify-content: space-between;
}
.logo{
  width: fit-content;
  height: fit-content;
}
.searchbar{
  background-color: bisque;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.search{
  background-color: rgb(255, 255, 255);
  width: 800px;
  height: 50px;
  padding-left: 50px;
  padding-right: 20px;
  border-radius: 50px ;
 
  
}
.searchicon{
  height: 50px;
  width: 50px;
  background-color: rgb(255, 255, 255);
  transform: translateX(-150%);
  
}
.nav-txt{
  font-weight: 500;
}
.icon{
  margin-right: 5px;
}





    
</style>
