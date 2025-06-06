<template>
  <div class="main-container">
    <!-- Navigation Bar -->
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

    <!-- Main Cart Content -->
    <div class="cart-main-container">
      <!-- Cart Items Section -->
      <div class="cart-container">
        <div class="section-header">
          <h1 class="section-title">Your Cart</h1>
          <div class="item-count">{{ cartProducts.items?.length || 0 }} items</div>
        </div>

        <div class="cart-items-wrapper" @scroll="handleCartScroll" ref="cartScrollContainer">
          <div
            v-if="cartProducts.items && cartProducts.items.length > 0"
            class="cart-items-list"
          >
            <div
              class="cart-item-card"
              v-for="cartproduct in cartProducts.items"
              :key="cartproduct.itemId"
            >
              <div class="item-image-container">
                <img
                  :src="cartproduct.imageBase64"
                  :alt="cartproduct.name"
                  class="item-image"
                />
              </div>

              <div class="item-details">
                <h3 class="item-name">{{ cartproduct.name }}</h3>
                <div class="item-meta">
                  <span class="item-category">{{ cartproduct.category }}</span>
                  <span class="item-id">ID: {{ cartproduct.productId }}</span>
                </div>
                <div class="price-info">
                  <span class="current-price">₹{{ cartproduct.discountPrice }}</span>
                  <span v-if="cartproduct.actualPrice !== cartproduct.discountPrice" class="original-price">
                    ₹{{ cartproduct.actualPrice }}
                  </span>
                  <span v-if="cartproduct.discountPercentage" class="discount-badge">
                    {{ cartproduct.discountPercentage }}% OFF
                  </span>
                </div>
                <div class="quantity-info">
                  <span>Quantity: {{ cartproduct.quantity }}</span>
                </div>
              </div>

              <div class="item-actions">
                <button
                  class="btn btn-remove"
                  @click="removeCartItem(cartproduct.itemId)"
                >
                  <v-icon size="16">mdi-delete-outline</v-icon>
                  Remove
                </button>
                <button class="btn btn-buy">
                  <v-icon size="16">mdi-cart</v-icon>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          
          <div v-else class="empty-cart">
            <v-icon size="64" color="#ccc">mdi-cart-outline</v-icon>
            <h3>Your cart is empty</h3>
            <p>Add some items to get started</p>
          </div>

          <!-- Fixed Scroll Indicator -->
          <div 
            v-if="cartProducts.items && cartProducts.items.length > 2 && showCartScrollIndicator" 
            class="scroll-indicator-fixed"
          >
            <v-icon size="16">mdi-arrow-down</v-icon>
            Scroll for more items
          </div>
        </div>
      </div>

      <!-- Checkout Section -->
      <div class="checkout-container">
        <div class="section-header">
          <h2 class="section-title">Order Summary</h2>
        </div>

        <div v-if="cartProducts.items && cartProducts.items.length > 0" class="checkout-content">
          <!-- Order Details Table -->
          <div class="order-details" @scroll="handleSummaryScroll" ref="summaryScrollContainer">
            <div class="table-container">
              <table class="details-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th style="text-align: right;">Price</th>
                    <th style="text-align: right;">Qty</th>
                    <th style="text-align: right;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="cartproduct in cartProducts.items"
                    :key="cartproduct.itemId"
                  >
                    <td>
                      <div class="table-item-info">
                        <span class="table-item-name">{{ cartproduct.name }}</span>
                        <small class="table-item-category">{{ cartproduct.category }}</small>
                      </div>
                    </td>
                    <td class="price-cell">₹{{ cartproduct.discountPrice }}</td>
                    <td class="quantity-cell">{{ cartproduct.quantity }}</td>
                    <td class="subtotal-cell">
                      ₹{{ (cartproduct.discountPrice * cartproduct.quantity).toFixed(2) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Summary Scroll Indicator -->
            <div 
              v-if="cartProducts.items && cartProducts.items.length > 3 && showSummaryScrollIndicator" 
              class="summary-scroll-indicator"
            >
              <v-icon size="14">mdi-arrow-down</v-icon>
              More items below
            </div>
          </div>

          <!-- Order Summary -->
          <div class="order-summary">
            <div class="summary-row">
              <span>Store:</span>
              <span class="store-name">{{ cartProducts.storeName }}</span>
            </div>
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>₹ {{ (cartProducts.totalPrice + cartProducts.totalDiscount).toFixed(2) }}</span>
            </div>
            <div class="summary-row savings">
              <span>You Save:</span>
              <span class="savings-amount">-₹ {{ cartProducts.totalDiscount.toFixed(2) }}</span>
            </div>
            <div class="summary-row total">
              <span>Total:</span>
              <span class="total-amount">₹ {{ cartProducts.totalPrice.toFixed(2) }}</span>
            </div>
          </div>

          <!-- Checkout Button -->
          <button class="checkout-btn">
            <v-icon size="20">mdi-credit-card</v-icon>
            <router-link to="/checkout2" style="text-decoration: none;color: white;"> Proceed to Checkout </router-link>
          </button>
        </div>
      </div>
    </div>

    <!-- Snackbar for notifications -->
    <v-snackbar v-model="snackbar" :timeout="3000" :color="snackbarColor" top>
      {{ snackbarMessage }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartProducts: {
        items: [],
        totalPrice: 0,
        totalDiscount: 0,
        storeName: ''
      },
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
      showCartScrollIndicator: true,
      showSummaryScrollIndicator: true,
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
          // Check scroll indicators after loading
          this.$nextTick(() => {
            this.checkScrollIndicators();
          });
        } else {
          this.snackbarMessage = `Error: ${result.error}`;
          this.snackbar = true;
          this.snackbarColor = "error";
        }
      } catch (error) {
        console.error("Error loading cart products:", error);
        this.snackbarMessage = "Failed to load cart items";
        this.snackbar = true;
        this.snackbarColor = "error";
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
        this.snackbarMessage = "Item removed from cart";
        this.snackbar = true;
        this.snackbarColor = "success";
        this.loadCartProducts(); // refresh cart
      } else {
        this.snackbarMessage = result.error || "Failed to remove item";
        this.snackbar = true;
        this.snackbarColor = "error";
      }
    },
    handleCartScroll() {
      const container = this.$refs.cartScrollContainer;
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        // Hide indicator when near bottom (within 50px)
        this.showCartScrollIndicator = (scrollHeight - scrollTop - clientHeight) > 50;
      }
    },
    handleSummaryScroll() {
      const container = this.$refs.summaryScrollContainer;
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        // Hide indicator when near bottom (within 30px)
        this.showSummaryScrollIndicator = (scrollHeight - scrollTop - clientHeight) > 30;
      }
    },
    checkScrollIndicators() {
      // Check if cart needs scroll indicator
      const cartContainer = this.$refs.cartScrollContainer;
      if (cartContainer) {
        this.showCartScrollIndicator = cartContainer.scrollHeight > cartContainer.clientHeight;
      }
      
      // Check if summary needs scroll indicator
      const summaryContainer = this.$refs.summaryScrollContainer;
      if (summaryContainer) {
        this.showSummaryScrollIndicator = summaryContainer.scrollHeight > summaryContainer.clientHeight;
      }
    }
  },
  mounted() {
    this.loadCartProducts();
    // Add resize listener to check scroll indicators
    window.addEventListener('resize', this.checkScrollIndicators);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScrollIndicators);
  }
};
</script>

<style scoped>
/* Global Styles */
* {
  box-sizing: border-box;
}

.main-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  /* font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; */
}

/* Navigation Bar */
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

.logo-link,
.nav-link {
  text-decoration: none;
  color: inherit;
  font-weight: 500;
  cursor: pointer;
}

.logo {
  width: fit-content;
  height: fit-content;
  color: #03045e;
  font-size: 1.8rem;
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
  margin-right: 8px;
}

.nav-signin {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #03045e;
  padding: 7px;
  border-radius: 20px;
  width: 100px;
}

.nav-icon {
  margin-right: 5px;
  font-size: 1.2rem;
}

/* Main Content */
.cart-main-container {
  margin-top: 70px;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 500px;
  gap: 20px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  height: calc(100vh - 70px);
  overflow: hidden;
}

/* Cart Container */
.cart-container {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
}
.cart-container ::-webkit-scrollbar{
  display: none;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.item-count {
  background: #03045E;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.cart-items-wrapper {
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
  position: relative;
}

.cart-items-wrapper::-webkit-scrollbar {
  width: 6px;
}

.cart-items-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.cart-items-wrapper::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.cart-items-wrapper::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}



.cart-items-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 2rem;
}

.cart-item-card {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #fafafa;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  align-items: center;
}

.cart-item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.item-image-container {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.item-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #666;
}

.item-category {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-weight: 500;
}

.price-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.current-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #03045E;
}

.original-price {
  font-size: 1rem;
  color: #999;
  text-decoration: line-through;
}

.discount-badge {
  background: #4caf50;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.quantity-info {
  color: #666;
  font-weight: 500;
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  min-width: 120px;
  justify-content: center;
}

.btn-remove {
  background: white;
  color: #dc3545;
  border: 2px solid #dc3545;
}

.btn-remove:hover {
  background: #dc3545;
  color: white;
  transform: translateY(-1px);
}

.btn-buy {
  background: #03045E;
  color: white;
}

.btn-buy:hover {
  background: #0077B6;
  transform: translateY(-1px);
}

/* Empty Cart */
.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

.empty-cart h3 {
  margin: 1rem 0 0.5rem 0;
  font-size: 1.5rem;
}

/* Checkout Container */
.checkout-container {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.checkout-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
  overflow: hidden;
}

/* Order Details with Hidden Scrollbar */
.order-details {
  flex: 1;
  overflow-y: auto;
  position: relative;
  /* Hide scrollbar for webkit browsers */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.order-details::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.table-container {
  overflow-x: auto;
}

.details-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.details-table th {
  background: #f8f9fa;
  padding: 0.75rem 0.5rem;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #e9ecef;
  position: sticky;
  top: 0;
  z-index: 10;
}

.details-table td {
  padding: 1rem 0.5rem;
  border-bottom: 1px solid #e9ecef;
}

.table-item-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.table-item-name {
  font-weight: 500;
  color: #333;
}

.table-item-category {
  color: #666;
  font-size: 0.75rem;
}

.price-cell,
.quantity-cell,
.subtotal-cell {
  text-align: right;
  font-weight: 500;
}

/* Summary Scroll Indicator */
.summary-scroll-indicator {
  position: fixed;
  bottom: 410px;
  right: 250px;
  background: rgba(3, 4, 94, 0.8);
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 20;
  animation: pulse 2s infinite;
  pointer-events: none;
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 10px rgba(3, 4, 94, 0.3);
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}

/* Fixed Scroll Indicator - doesn't move with scroll */
.scroll-indicator-fixed {
  position: fixed;
  bottom: 30px;
  left: 35%;
  transform: translateX(-50%);
  background: rgba(3, 4, 94, 0.9);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 100;
  animation: bounce 2s infinite;
  pointer-events: none;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(3, 4, 94, 0.3);
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

.order-summary {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid #e9ecef;
  flex-shrink: 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  font-size: 1rem;
}

.summary-row:not(:last-child) {
  border-bottom: 1px solid #e9ecef;
}

.store-name {
  font-weight: 600;
  color: #03045E;
}

.savings {
  color: #4caf50;
}

.savings-amount {
  font-weight: 600;
}

.total {
  font-size: 1.25rem;
  font-weight: 700;
  color: #03045E;
}

.total-amount {
  font-size: 1.5rem;
}

.checkout-btn {
  background: linear-gradient(135deg, #03045E, #0077B6);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 16px;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(3, 4, 94, 0.3);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .cart-main-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    height: calc(100vh - 70px);
  }
  
  .checkout-container {
    position: static;
  }

  .scroll-indicator-fixed {
    bottom: 20px;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 0 1rem;
    height: 70px;
  }
  
  .cart-main-container {
    margin-top: 70px;
    padding: 1rem;
    height: calc(100vh - 70px);
  }
  
  .left-nav,
  .right-nav {
    gap: 1rem;
  }
  
  .nav-item span {
    display: none;
  }
  
  .cart-item-card {
    grid-template-columns: 80px 1fr;
    grid-template-rows: auto auto;
    gap: 1rem;
  }
  
  .item-actions {
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: space-between;
  }
  
  .item-image-container {
    width: 80px;
    height: 80px;
  }

  .scroll-indicator-fixed {
    bottom: 15px;
    font-size: 0.8rem;
    padding: 6px 12px;
  }
}

@media (max-width: 480px) {
  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .details-table {
    font-size: 0.75rem;
  }
  
  .details-table th,
  .details-table td {
    padding: 0.5rem 0.25rem;
  }

  .scroll-indicator-fixed {
    bottom: 10px;
    font-size: 0.75rem;
    padding: 5px 10px;
  }

  .summary-scroll-indicator {
    font-size: 0.7rem;
    padding: 4px 8px;
    bottom: 5px;
    right: 10px;
  }
}
</style>