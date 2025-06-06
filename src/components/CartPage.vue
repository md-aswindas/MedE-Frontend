<template>
  <div class="main-container">
    <div class="navbar">
      <div class="left-nav">
        <router-link
          to="/UserHomeMain"
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
          <div
            class="cart-card"
            v-for="cartproduct in cartProducts.items"
            :key="cartproduct.itemId"
          >
            <img
              :src="cartproduct.imageBase64"
              alt="Product Image"
              class="card-img"
            />

            <div class="card-content">
              <h2>{{ cartproduct.name }}</h2>
              <h4>Price : {{ cartproduct.discountPrice }}</h4>
              <h4>Discount : {{ cartproduct.discountPercentage }}%</h4>
              <h4>Count : {{ cartproduct.quantity }}</h4>
            </div>
            <div class="btns">
              <button
                type="button"
                class="remove-btn"
                @click="removeCartItem(cartproduct.itemId)"
              >
                Remove
              </button>
              <button type="button" class="buy-btn">Buy</button>
            </div>
          </div>
        </div>
      </div>
      <div class="price-container">
        <h1 class="cart-head">Checkout</h1>

        <table class="cart-table">
          <thead>
            <tr>
              <th>Product Name (ID)</th>
              <th>Description</th>
              <th>Category</th>
              <th>Store</th>
              <th>Actual Price</th>
              <th>Discount Price</th>
              <th>Offer %</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="cartproduct in cartProducts.items"
              :key="cartproduct.itemId"
            >
              <td>{{ cartproduct.name }} ({{ cartproduct.productId }})</td>
              <td>{{ cartproduct.description }}</td>
              <td>{{ cartproduct.category }}</td>
              <td>{{ cartProducts.storeName }}</td>
              <td>₹{{ cartproduct.actualPrice }}</td>
              <td>₹{{ cartproduct.discountPrice }}</td>
              <td>{{ cartproduct.offerPercentage }}%</td>
              <td>{{ cartproduct.quantity }}</td>
              <td>
                ₹{{
                  (cartproduct.discountPrice * cartproduct.quantity)
                }}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="summary">
          <p>
            <strong>Total Price:</strong> ₹{{
              cartProducts.totalPrice
            }}
          </p>
          <p>
            <strong>Amount Saved:</strong> ₹{{
              cartProducts.totalDiscount
            }}
          </p>
          <p><strong>Store Name:</strong> {{ cartProducts.storeName }}</p>
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
      cartProducts: [],
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
    };
  },
  methods: {
    async loadCartProducts() {
      try {
        const result = await this.$store.dispatch("EndUser/fetchcartProducts", {
          userId: sessionStorage.getItem("user_id"),
        });
        if (result.success) {
          this.cartProducts = result.data;
          console.log("cart products", result.data);
        } else {
          this.snackbarMessage = `Error: ${result.error}`;
          this.snackbar = true;
          this.snackbarColor = "error";
        }
      } catch (error) {
        console.error("Error loading cart products:", error);
      }
    },
    async removeCartItem(itemId) {
      console.log("Clicked Item ID:", itemId);

      const userId = sessionStorage.getItem("user_id");
      const result = await this.$store.dispatch("EndUser/removeFromCart", {
        userId,
        itemId,
      });
      if (result.success) {
        this.snackbarMessage = "Cart Item Removed 🗑️";
        this.snackbar = true;
        this.snackbarColor = "success";
        this.loadCartProducts(); // refresh cart
      } else {
        this.snackbarMessage = result.error;
        this.snackbar = true;
        this.snackbarColor = "error";
      }
    },
  },
  mounted() {
    this.loadCartProducts();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.price-container {
  max-width: 900px;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #fff;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
}

.cart-head {
  text-align: center;
  margin-bottom: 25px;
  font-weight: 700;
  font-size: 2rem;
  color: #222;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}

.cart-table th,
.cart-table td {
  padding: 12px 10px;
  border: 1px solid #ccc;
  text-align: center;
  font-size: 0.95rem;
  vertical-align: middle;
}

.cart-table th {
  background-color: #f7f7f7;
  font-weight: 600;
  color: #444;
}

.summary {
  text-align: right;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.summary p {
  margin: 8px 0;
}


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
.cart-main-container {
  width: 100%;
  height: 704px;
  background-color: rgb(244, 244, 244);
  padding: 5px;
  margin-top: 72px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.cart-container {
  width: 64%;
  height: 680px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cart-card-div {
  overflow-y: auto;
  width: 100%;
  height: 100%;
}
.cart-card-div::-webkit-scrollbar {
  display: none;
}
.price-container {
  height: 680px;
  width: 33%;
  background-color: #ffffff;
  margin: 0px 5px 5px 5px;
  border-radius: 10px;
  /* position: -webkit-sticky; */
  display: flex;
  justify-content: center;
  padding: 20px;
}
.cart-card {
  width: 100%;
  height: 25%;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  margin-bottom: 20px;
  border: 1px solid rgb(220, 220, 220);
  padding: 10px;
  display: flex;
  align-items: center;
}
.cart-head {
  width: fit-content;
  height: fit-content;
  margin: 10px;
  margin-bottom: 30px;
  position: -webkit-sticky;
  font-size: 22px;
  font-weight: 500;
  color: #03045e;
}
.card-img {
  width: 130px;
  height: 130px;
  border-radius: 10px;
  background-color: #03045e;
}
.card-content {
  height: 130px;
  width: 586px;
  margin-left: 15px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.btns {
  height: 130px;
  width: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
}
.remove-btn {
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
.buy-btn {
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
