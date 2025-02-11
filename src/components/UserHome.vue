<template>
  <div class="main-container">
    <div class="navbar">
      <div class="left-nav">
        <h1 class="logo">MedE</h1>
        <p class="nav-txt">Find a store</p>
      </div>
      <div class="right-nav">
        <p class="nav-img">Merchant</p>
        <router-link to="/"  style="text-decoration: none; color: inherit;"><p class="nav-img">Sign In</p></router-link>
        <p class="nav-img">Cart</p>
      </div>
    </div>
    <div class="searchbar">
      <input type="text" name="search" class="search" placeholder="Search Product / Store">
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
  width: 30%;
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
  border-radius: 50px;
  background-image: url(D:\med_e\src\assets\logo.png);
  background-repeat: no-repeat;
  background-position: 95%;
  background-size: 2rem;
}
.nav-txt{
  background-image: url(D:\med_e\src\assets\logo.png);
  background-repeat: no-repeat;
  padding-right: 40px;
  background-position: 100%;
  background-size: 2rem;
}

.nav-img{
  background-image: url(D:\med_e\src\assets\logo.png);
  background-repeat: no-repeat;
  padding-right: 40px;
  background-position: 100%;
  background-size: 2rem;
  
}



    
</style>
