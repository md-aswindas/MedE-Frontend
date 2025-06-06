<template>
  <div class="main-container">
    <div class="navbar">
      <div class="left-nav">
        <router-link
          to="/"
          style="
            text-decoration: none;
            color: inherit;
            font-weight: 500;
            cursor: pointer;
          "
        >
          <h1 class="logo">MedE</h1></router-link
        >
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
            v-if="!isLoggedIn"
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
          <p
            v-else
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
            {{ username }}
          </p>
        </router-link>

        <router-link
          to="/cart"
          style="text-decoration: none; color: inherit; font-weight: 500"
        >
          <p class="nav-txt">
            <v-icon large color="#03045E" size="1.2rem" class="icon"
              >mdi-cart-outline</v-icon
            ><v-badge color="#07fc03" :content="cartCount" floating>
              Cart
            </v-badge>
          </p>
        </router-link>
      </div>
    </div>
    <div class="searchbar">
      <input
        type="text"
        name="search"
        v-model="searchQuery"
        @input="searchProducts"
        class="search"
        placeholder="Search Product "
      />
      <v-icon large color="black" class="searchicon" size="35px"
        >mdi-magnify</v-icon
      >
    </div>

    <div class="prescription" @click="dialog = true">
      <v-icon>mdi-note-plus</v-icon>
      <p
        style="
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-thickness: 1.5px;
          padding-left: 10px;
        "
      >
        Shop with prescription
      </p>
    </div>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Upload Prescription</v-card-title>
        <v-card-text>
          <v-file-input
            v-model="file"
            label="Choose your prescription"
            prepend-icon="mdi-paperclip"
            outlined
          ></v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="prescription">Save</v-btn>
          <v-btn color="primary" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <router-link to="/products">
      <button class="view">View All Products</button>
    </router-link>

    <div class="headings" v-if="products.length > 0">
      <span style="font-weight: 700">{{ products.length }}</span> &nbsp;
      products found!
    </div>

    <div class="search-products" v-if="products.length > 0">
      <!-- <div class="card c1" v-for="product in products" :key="product.id">
        <h2>{{ store.storeName }}</h2>
        <div class="c2">
          <h4>
            {{ store.address }}
          </h4>
          <v-rating
            readonly
            half-increments
            size="small"
            active-color="#ffa534"
            color="#ffa534"
            density="compact"
          ></v-rating>
        </div>
      </div> -->

      <div class="product-cards" v-if="products.length">
        <div class="pcard" v-for="product in products" :key="product.id">
          <div class="card-img">
            <img
              :src="'data:image/jpeg;base64,' + product.productImage"
              alt=""
              style="background-size: contain"
            />
          </div>
          <div class="card-txt1">
            <h4>{{ product.productName }}</h4>
            <h4 class="stock">Stock : {{ product.stock }}</h4>
          </div>

          <div class="price">
            <h4 class="final-price">
              ₹
              {{
                product.actualPrice -
                (product.actualPrice * product.offerPercentage) / 100
              }}
            </h4>
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
    </div>
    <div class="heading">
      <div class="line"></div>
      <div class="heading-txt"><h4>Food And Suppliments</h4></div>
      <div class="line"></div>
    </div>
    <div class="card-container">
      <div class="cards">
        <div class="card" @click="goToProducts(6)">
          <div class="name">
            <h3>Nutritional Supplements</h3>
          </div>
        </div>
        <div class="card" @click="goToProducts(7)">
          <div class="name">
            <h3>Protein & Fitness</h3>
          </div>
        </div>
        <div class="card" @click="goToProducts(8)">
          <div class="name">
            <h3>Herbal & Ayurvedic</h3>
          </div>
        </div>
        <div class="card" @click="goToProducts(9)">
          <div class="name">
            <h3>Specialized Dietary</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="heading">
      <div class="line"></div>
      <div class="heading-txt"><h4>Personal Care</h4></div>
      <div class="line"></div>
    </div>
    <div class="card-container">
      <div class="cards">
        <div class="card" @click="goToProducts(2)">
          <div class="name">
            <h3>Skin Care</h3>
          </div>
        </div>
        <div class="card" @click="goToProducts(3)">
          <div class="name">
            <h3>Hair Care</h3>
          </div>
        </div>
        <div class="card" @click="goToProducts(4)">
          <div class="name">
            <h3>Oral Care</h3>
          </div>
        </div>
        <div class="card" @click="goToProducts(5)">
          <div class="name">
            <h3>Baby Care</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  <v-snackbar v-model="snackbar" :timeout="3000" :color="snackbarColor" top>
    {{ snackbarMessage }}
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      username: sessionStorage.getItem("user_name"),
      // PRODUCTS DATA LIST
      products: [],
      productId: "",
      searchQuery: "",
      dialog: false,
      file: null,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
      
    };
  },
  methods: {
    async goToProducts(categoryId) {
      this.$router.push({
        path:'/products', // replace with your route path
        query: {
          categoryId: categoryId,
        },
      });
    },
    async searchProducts() {
      const query = this.searchQuery.trim();

      if (!query) {
        console.log("🟡 Search query is empty. Clearing product list.");
        this.products = [];
        return; // Skip API call
      }

      console.log("✅ Calling search API with:", query);
      console.log("📦 storeId:", sessionStorage.getItem("store_id"));

      try {
        const response = await this.$store.dispatch("EndUser/searchProducts", {
          storeId: sessionStorage.getItem("store_id"),
          productName: query,
        });

        console.log("🔹 API Response:", response);

        this.products = response.success ? response.data : [];
      } catch (error) {
        console.error("❌ Error during search API call:", error);
        this.products = [];
      }
    },

    async prescription() {
      const formData = new FormData();

      const prescriptionModel = new Blob(
        [
          JSON.stringify({
            storeId: sessionStorage.getItem("store_id"),
            user_id: sessionStorage.getItem("user_id"),
          }),
        ],
        { type: "application/json" }
      );
      formData.append("prescriptionModel", prescriptionModel);
      formData.append("prescriptionImage", this.file);
      try {
        const response = await this.$store.dispatch(
          "EndUser/prescriptionAdd",
          formData
        );
        if (response) {
          this.snackbarMessage = "prescription added Successfully";
          this.snackbar = true;
          this.snackbarColor = "success";
          this.dialog = false;
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    cartCount() {
      return this.$store.state.EndUser.cartCount;
    },
    isLoggedIn() {
      const username = this.$store.state.auth.user_name;
      return username && username.trim().length > 0;
    },
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

/* SEARCH PRODUCT AND PRODUCT CARD */
.search-products {
  height: fit-content;
  padding-left: 140px;
  /* padding-right: 120px; */
  padding-bottom: 20px;
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
.view {
  background-color: #03045e;
  font-weight: 500;
  color: #ffffff;
  border: 2px solid #ffffff;
  width: 160px;
  height: 48px;
  border-radius: 30px;
  z-index: 900;
  position: fixed;
  right: 30px;
  bottom: 30px;
  box-shadow: rgb(85, 85, 85) 5px 6px 25px;
}
.headings {
  padding-left: 30px;
  margin-top: 30px;
  color: #ffffff;
  background-color: #03045e;
  height: 50px;
  width: 1260px;
  display: flex;
  align-items: center;
  margin-left: 150px;
  border-radius: 20px;
}
.product-cards {
  width: 1283px;
  background-color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  margin: 5px;

  /* justify-content: space-evenly; */
}

.pcard {
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

.pcard:hover {
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3); /* Enhance shadow on hover */
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
  width: fit-content;
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
.stock {
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
.pcard:hover .buttons {
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
.prescription {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 1px;

  color: blue;
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
.heading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  margin-top: 20px;
  /* background-color: rgb(255, 255, 237); */
}
.line {
  height: 1px;
  background-color: rgb(209, 209, 209);
  width: 500px;
  margin-right: 20px;
  margin-left: 20px;
}
.card-container {
  /* background-color: rgb(255, 255, 237); */
  height: 230px;
  display: flex;
  justify-content: center;
}

.cards {
  width: 88%;
  height: 100%;
  /* background-color: rgb(255, 255, 237); */
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.card {
  background-color: #dbdbff;
  height: 200px;
  width: 300px;
  border-radius: 20px;
  margin-right: 10px;
  margin-left: 10px;
  border: 0.5px solid rgb(209, 209, 209);
}
.name {
  border-top-left-radius: 100%;
  border-top-right-radius: 100%;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  background-color: #03045e;
  width: 100%;
  height: 60%;
  margin-top: 26.5%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}
</style>
