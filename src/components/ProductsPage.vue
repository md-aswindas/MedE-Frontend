<template>
  <div class="main-container">
    <div class="navbar">
      <div class="left-nav">
        <h1 class="logo">MedE</h1>
        <p class="nav-txt" style="width: 140px">
          <v-icon large color="#03045E" size="1.2rem" class="icon">mdi-map-marker</v-icon>
          Find a store
        </p>
      </div>
      <div class="right-nav">
        <router-link to="/storeLogin" style="text-decoration: none; color: inherit; font-weight: 500">
          <p class="nav-txt" style="width: 170px">
            <v-icon large color="#03045E" size="1.2rem" class="icon">mdi-storefront-outline</v-icon>
            Become A Seller
          </p>
        </router-link>
        <router-link to="/userLogin" style="text-decoration: none; color: inherit; font-weight: 500">
          <p class="nav-img" style="display: flex; justify-content: center; align-items: center; color: #03045e; padding: 7px; border-radius: 20px; width: 100px;">
            <v-icon large color="#03045E" size="1.2rem" class="icon">mdi-account-outline</v-icon>
            Sign In
          </p>
        </router-link>
        <p class="nav-txt">
          <v-icon large color="#03045E" size="1.2rem" class="icon">mdi-cart-outline</v-icon>
          Cart
        </p>
      </div>
    </div>

    <div class="product-div">
      <div class="product-leftside">
      
        <div class="filters">
          <h4>Filters</h4>
        </div>
          
        <div class="filter-cntnt">
          <p style="margin-top: 20px; margin-left: 30px; margin-bottom: 20px; font-weight: 600;"> 
              PRICE
             <v-icon large color="black" size="2rem" class="filter-icon" @click="open()">mdi-menu-down </v-icon>
          </p>
          <div class="checkbox">
            <input type="radio" name="High - Low" id="High - Low" >
          <label for="High - Low">Price High - Low</label>
          </div>
          
          <div class="checkbox">
            <input type="radio" name="High - Low" id="Low - High">
          <label for="Low - High">Price Low - High</label>
          </div>

          <p style="margin-top: 20px; margin-left: 30px; margin-bottom: 20px; font-weight: 600;">
            CATEGORIES
            <v-icon large color="black" size="2rem" class="filter-icon" @click="openCat()">mdi-menu-down </v-icon>
          </p>

        </div>

      </div>
      <div class="product-rightside">
        <div class="item-found">
          <p>Products found !</p>
        </div>
        <div class="product-cards" v-if="products.length">
          <div class="card" v-for="product in products" :key="product.id">
            <div class="card-img">
              <img src="" alt="Product Image" />
              
            </div>
            <div class="card-txt1">
              <h4>{{ product.productName }}</h4>
              <h4 class="stock">Stock : {{ product.stock }}</h4>
            </div>
          
            <div class="price">
              <h4 class="final-price">₹ {{ Math.ceil(product.actualPrice - (product.actualPrice * product.offerPercentage / 100)) }}</h4>
              <h4 class="org-price">₹ {{ product.actualPrice }}</h4>
              <h4 class="disc">({{ product.offerPercentage }}% OFF)</h4>
            </div>
            <div class="buttons">
              <div class="twbtn">
                <button type="button" class="cartbtn">Add to cart</button>
              </div>
              <div class="buy-btn">
                <button type="button" class="bbtn">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
        <!-- <p v-else>No products available.</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    ...mapActions(['fetchProducts']), 

    async loadProducts() {
      try {
        const result = await this.fetchProducts(); 
        if (result.success) {
          this.products = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading products:", error);
      }
    },
    open(){
      document.querySelectorAll(".checkbox").forEach((checkbox) => {
      checkbox.style.display = checkbox.style.display === "none" ? "flex" : "none";
    });
    }
  },
  mounted() {
    this.loadProducts();
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-container {
  width: 100%;
  height: fit-content;
  padding-bottom: 50px;
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
.product-div {
  margin-top: 72px;
  background-color: rgb(244, 244, 244);
  display: flex;
}
.product-leftside {
  width: 15%;
  height: 704px;
  background-color: rgb(244, 244, 244);
  position: fixed;
  display: flex;
  padding-top: 0px;
  flex-direction: column;
  
}
.checkbox{
  margin-top: 10px;
  margin-left: 20px;
  width: 80%;
  display: none;
  justify-content: space-around;
}
.product-rightside {
  width: 85%;
  height: 100%;
  margin-left: 228px;
  /* background-color: rgb(0, 255, 21); */
}
.item-found {
  width: 1285px;
  height: 50px;
  background-color: #ffffff;
  padding-left: 30px;
  display: flex;
  align-items: center;
  box-shadow: 0 15px 40px -20px rgba(40, 44, 63, 0.15);
  -webkit-box-shadow: 0 15px 40px -20px rgba(40, 44, 63, 0.15);
  margin: 5px;
}
.filters{
  width: 97%;
  height: 50px;
  background-color: #ffffff;
  padding-left: 30px;
  display: flex;
  align-items: center;
  box-shadow: 0 15px 40px -20px rgba(40, 44, 63, 0.15);
  margin: 5px;
}
.filter-cntnt{
  width: 97%;
  height: 654px;
  background-color: #ffffff;
  margin-left: 5px;
 
}
.filter-cntnt p{
  display: flex;
  align-items: center;
}

.filter-icon{
  margin-left: 10px;
}

.product-cards {
  width: 1283px;
  background-color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  margin: 5px;
  
  /* justify-content: space-evenly; */
}
.card {
  background-color: #ffffff;
  width: 250px;
  height: 360px;
  /* margin-right: 55px; */
  margin: 35px;
  border-radius: 10px;
  position: relative;
  overflow: hidden; /* Hide overflowing elements */
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3); /* Enhance shadow on hover */
}

/* Card image styling */
.card-img {
  width: 220px;
  height: 250px;
  margin: 10px auto;
  border-radius: 5px;
  background-color: black;
  overflow: hidden; /* Ensure image doesn't overflow */
}

.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Maintain image aspect ratio */
}

/* Card title styling */
.card-txt1 {
  margin-left: 10px;
  text-align: left;
}

.card-txt1 h4 {
  margin-top: 0;
  padding-left: 7px;
  width:fit-content;
}

/* Price section styling */
.price {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 0;
  height: 50px;
  position: absolute;
  bottom: 0px;
  left: 0;

  width: 240px;
  background-color: #ffffff;
  z-index: 3;
}

.final-price {
  font-size: 18px;
}
.stock{
  font-size: 13px; 
  color: green;
  font-weight: 500;
}

.org-price {
  font-size: 15px;
  text-decoration: line-through;
  opacity: 0.6;
}

.disc {
  font-size: 16px;
  color: #ff0000;
}

/* div contains buttons */
.buttons {
  position: absolute;
  bottom: -100px; /* Initially hidden below the card */
  left: 0;
  width: 100%;
  height: 100px;
  background-color: #ffffff;
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease; /* Smooth transition effect adjust */
  z-index: 1;
}

/* Reveal buttons on hover */
.card:hover .buttons {
  bottom: 50px; /* Move the buttons into view */
  opacity: 1;
  visibility: visible;
}

/* Button section styling */
.twbtn,
.buy-btn {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 50%;
}

.cartbtn {
  width: 90%;
  height: 80%;
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
}

.bbtn {
  width: 90%;
  height: 80%;
  background-color: #03045e;
  border: 2px solid #03045e;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 700;
  color: white;
}

.bkmrk {
  width: 18%;
  height: 80%;
  background-color: white;

  border: 2px solid black;
  border-radius: 15%;
  cursor: pointer;
  /* background-image: url(bookmark.png);
    background-repeat: no-repeat;
    background-position: center; */
  background-size: 1rem;
}

.buy-btn {
  justify-content: center;
  background-color: rgb(255, 255, 255);
}
</style>
