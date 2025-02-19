<template>
  <div class="main-container">
    <div class="navbar">
      <div class="left-nav">
        <h1 class="logo">MedE</h1>
        <p class="nav-txt" style="width: 140px;">  <v-icon large color="#03045E" size="1.2rem" class="icon">mdi-map-marker</v-icon> Find a store  </p>
      </div>
      <div class="right-nav">

        <router-link to="/storeLogin" style="text-decoration: none; color: inherit; font-weight: 500;">
        <p class="nav-txt" style="width: 170px;"> <v-icon large color="#03045E" size="1.2rem" class="icon">mdi-storefront-outline</v-icon>     Become A Seller  </p>
        </router-link>
        <router-link to="/userLogin"  style="text-decoration: none; color: inherit; font-weight: 500;">
          <p class="nav-img"  style="display: flex; justify-content: center; align-items: center; color: #03045E; padding:7px; border-radius: 20px; width: 100px;">
            <v-icon large color="#03045E" size="1.2rem" class="icon">mdi-account-outline</v-icon> Sign In
          </p>
        </router-link>


        <p class="nav-txt"><v-icon large color="#03045E" size="1.2rem" class="icon">mdi-cart-outline</v-icon>   Cart</p>

        
      </div>
    </div>
    <div class="searchbar">
      <input type="text" name="search" class="search" placeholder="Search Product / Store" >
      <v-icon large color="black" class="searchicon" size="35px">mdi-magnify</v-icon>
    </div>
    <div class="heading">
      <div class="line"></div>
      <div class="heading-txt"><h4>Stores Near Me</h4></div>
      <div class="line"></div>
    </div>
    <div class="card-container">
      <div class="left-arrow"><p><v-icon large color="#545454"  size="50px">mdi-chevron-left</v-icon></p></div>
      <div class="cards">
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
      </div>
      <div class="right-arrow"><p><v-icon large color="#545454" size="50px" >mdi-chevron-right</v-icon></p></div>
    </div>
    <div class="heading">
      <div class="line"></div>
      <div class="heading-txt"><h4>Top Rated Store</h4></div>
      <div class="line"></div>
    </div>
    <div class="card-container">
      <div class="left-arrow"></div>
      <div class="cards">
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
      </div>
      <div class="right-arrow"></div>
    </div>
    <div class="heading">
      <div class="line"></div>
      <div class="heading-txt"><h4>Offer By Store</h4></div>
      <div class="line"></div>
    </div>
    <div class="card-container">
      <div class="left-arrow"></div>
      <div class="cards">
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
      </div>
      <div class="right-arrow"></div>
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
  height:fit-content;
  padding-bottom: 50px;
  background-color: rgb(255, 255, 255);
  
}
.navbar{
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
  box-shadow: 0 15px 40px -20px rgba(40, 44, 63, .15);
  -webkit-box-shadow:0 15px 40px -20px rgba(40, 44, 63, .15);
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
  color: #03045E;
}
.searchbar{
  /* background-color:rgb(255, 255, 255); */
  height: 100px;
  margin-top: 72px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  
}
.search{
  background-color: rgb(255, 255, 255);
  width: 800px;
  height: 55px;
  padding-left: 50px;
  padding-right: 20px;
  border-radius: 50px ;
  border:.5px solid rgb(209, 209, 209);
 
  
}
.searchicon{
  height: 60px;
  width: 60px;
  
  transform: translateX(-140%);
  
  
  margin-bottom: 10px;
  border-radius: 100%;
  
}
.nav-txt{
  font-weight: 500;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
  color: #03045E;
  border-radius: 20px;
}
.icon{
  margin-right: 5px;
}
.heading{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90px;
  /* background-color: rgb(255, 255, 237); */
}
.line{
  height: 1px;
  background-color: rgb(209, 209, 209);
  width: 500px;
  margin-right: 20px;
  margin-left: 20px;
}
.card-container{
  /* background-color: rgb(255, 255, 237); */
  height: 230px;
  display: flex;
}
.left-arrow{
  margin-left: 50px;
  width: 41px;
  height: 100%;
  /* background-color: rgb(255, 255, 237); */
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.cards{
width: 88%;
height: 100%;
/* background-color: rgb(255, 255, 237); */
display: flex;
align-items: flex-end;
justify-content: center;

}
.right-arrow{
  margin-right: 50px;
  width: 41px;
  height: 100%;
  /* background-color: rgb(255, 255, 237); */
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.card{
  background-color: rgb(255, 255, 255);
  height: 200px;
  width: 300px;
  border-radius: 20px;
  margin-right: 10px;
  margin-left: 10px;
  border:.5px solid rgb(209, 209, 209);
}


    
</style>
