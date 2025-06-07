<template>
  <div class="main-container">
    <!-- Checkout Progress -->
    <div class="checkout-progress">
      <div class="progress-steps">
        <div class="step completed">
          <v-icon size="20">mdi-cart</v-icon>
          <span>Cart</span>
        </div>
        <div class="step-line completed"></div>
        <div class="step active">
          <v-icon size="20">mdi-truck-delivery</v-icon>
          <span>Checkout</span>
        </div>
        <div class="step-line"></div>
        <div class="step">
          <v-icon size="20">mdi-check-circle</v-icon>
          <span>Complete</span>
        </div>
      </div>
    </div>

    <!-- Main Checkout Content -->
    <div class="checkout-main-container">
      <!-- Left Section - Forms -->
      <div class="checkout-forms">
        <!-- Delivery Address Section -->
        <div class="form-section">
          <div class="section-header">
            <h2 class="section-title">
              <v-icon size="24" color="#03045E">mdi-map-marker</v-icon>
              Delivery Address
            </h2>
          </div>

          <div class="address-options">
            <button class="add-address-btn" @click="showAddressForm = true">
              <v-icon size="20">mdi-plus</v-icon>
              Add Address
            </button>
          </div>

          <!-- Add/Edit Address Form -->
          <div v-if="showAddressForm" class="address-form">
            <h3>{{ editingIndex !== -1 ? "Edit" : "Add New" }} Address</h3>
            <form @submit.prevent="saveAddress">
              <div class="form-row">
                <div class="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    v-model="addressForm.name"
                    required
                    class="form-control"
                    placeholder="Enter full name"
                  />
                </div>
                <div class="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    v-model="addressForm.phone"
                    required
                    class="form-control"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div class="form-group">
                <label>Address Type *</label>
                <select
                  v-model="addressForm.type"
                  required
                  class="form-control"
                >
                  <option value="">Select address type</option>
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div class="form-group">
                <label>Street Address *</label>
                <textarea
                  v-model="addressForm.address"
                  required
                  class="form-control"
                  rows="3"
                  placeholder="House/Flat no., Building name, Street name"
                ></textarea>
              </div>

              <div class="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  v-model="addressForm.location"
                  required
                  class="form-control"
                  placeholder="Your Location"
                />
              </div>

              <div class="form-actions">
                <button
                  type="button"
                  class="btn btn-cancel"
                  @click="cancelAddressForm"
                >
                  Cancel
                </button>
                <!-- <button type="submit" class="btn btn-save">
                  {{ editingIndex !== -1 ? "Update" : "Save" }} Address
                </button> -->
              </div>
            </form>
          </div>
        </div>

        <!-- Payment Method Section -->
        <div class="form-section">
          <div class="section-header">
            <h2 class="section-title">
              <v-icon size="24" color="#03045E">mdi-cash</v-icon>
              Payment Method
            </h2>
          </div>

          <div class="payment-options">
            <div class="payment-card active">
              <div class="payment-header">
                <input type="radio" checked disabled class="payment-radio" />
                <div class="payment-info">
                  <span class="payment-title">Cash on Delivery</span>
                  <span class="payment-subtitle"
                    >Pay when you receive your order</span
                  >
                </div>
                <v-icon size="32" color="#4CAF50">mdi-cash-multiple</v-icon>
              </div>
              <div class="payment-description">
                <p>
                  Pay cash directly to our delivery partner when your order
                  arrives at your doorstep. No advance payment required.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Instructions -->
        <div class="form-section">
          <div class="section-header">
            <h2 class="section-title">
              <v-icon size="24" color="#03045E">mdi-note-text</v-icon>
              Delivery Instructions (Optional)
            </h2>
          </div>

          <div class="instructions-form">
            <textarea
              v-model="deliveryInstructions"
              class="form-control"
              rows="3"
              placeholder="Any specific instructions for delivery (e.g., gate code, landmark, preferred time)"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="order-summary">
        <h3 class="section-title">Order Summary</h3>

        <!-- Order Items -->
        <div
          v-for="cartproduct in cartProducts.items"
          :key="cartproduct.itemId"
          class="order-item"
        >
          <div class="item-image">
            <i
              class="fas fa-pills"
              style="font-size: 1.5rem; color: #03045e"
            ></i>
          </div>
          <div class="item-details">
            <div class="item-name">{{ cartproduct.name }}</div>
            <div class="item-meta">
              {{ cartproduct.category }} • Qty: {{ cartproduct.quantity }}
            </div>
            <div class="item-price">₹ {{ cartproduct.discountPrice }}</div>
          </div>
        </div>

        <!-- Order Totals -->
        <div class="order-totals">
          <div class="total-row store">
            <span>Store:</span>
            <span class="store-name">{{ cartProducts.storeName }}</span>
          </div>
          <div class="total-row">
            <span>Subtotal:</span>
            <span id="subtotal"
              >₹
              {{
                (cartProducts.totalPrice + cartProducts.totalDiscount).toFixed(
                  2
                )
              }}</span
            >
          </div>
          <div class="total-row savings">
            <span>You Save:</span>
            <span id="savings"
              >-₹ {{ cartProducts.totalDiscount.toFixed(2) }}</span
            >
          </div>
          <div class="total-row">
            <span>Delivery:</span>
            <span id="delivery-cost">
              {{ deliveryCost === 0 ? "FREE" : `₹${deliveryCost}` }}
            </span>
          </div>
          <div class="total-row final">
            <span>Total:</span>
            <span id="total">₹ {{ cartProducts.totalPrice.toFixed(2) }}</span>
          </div>
        </div>

        <button class="pay-now-btn" @click="checkoutCart()">
          <i class="fas fa-credit-card"></i>
          Pay Now
        </button>
      </div>
    </div>
    <div
      v-if="cartProducts.items && cartProducts.items.length > 0"
      class="scroll-indicator-fixed"
    >
      <v-icon size="16">mdi-arrow-down</v-icon>
      Scroll Down
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
    const locationData = JSON.parse(
      sessionStorage.getItem("user_location") || "{}"
    );
    return {
      cartProducts: {
        items: [],
        totalPrice: 0,
        totalDiscount: 0,
        storeName: "",
      },

      selectedAddressIndex: 0,
      showAddressForm: false,
      // editingIndex: -1,
      addressForm: {
        type: "",
        name: "",
        address: "",
        phone: "",
        deliveryInstructions: "",
        paymentMethod: "Cash on Delivery",
        location: locationData.name || "",
        latitude: locationData.latitude || "",
        longitude: locationData.longitude || "",
      },

      isProcessingOrder: false,

      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
    };
  },
  computed: {
    // subtotal() {
    //   return this.items.reduce(
    //     (total, item) => total + item.price * item.quantity,
    //     0
    //   );
    // },
    // total() {
    //   return this.subtotal + this.deliveryCost - this.savings;
    // },
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
          // this.$nextTick(() => {
          //   this.checkScrollIndicators();
          // });
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

    cancelAddressForm() {
      this.showAddressForm = false;
      this.addressForm = {
        type: "",
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
        location: "",
      };
    },

    async checkoutCart() {
      try {
        const userId = sessionStorage.getItem("user_id");

        const payload = {
          customerName: this.addressForm.name,
          phoneNumber: this.addressForm.phone,
          address: this.addressForm.address,
          addressType: this.addressForm.type,
          paymentMethod: this.selectedPaymentMethod || "Cash on Delivery",
          instructions: this.addressForm.deliveryInstructions || "",
          location: this.addressForm.location
        
        };

        const result = await this.$store.dispatch("EndUser/checkoutCart", {
          userId,
          checkoutDetails: payload,
        });

        if (result && result.orderId) {
          console.log("Checkout successful:", result);
          this.snackbarMessage = "✅ Order placed successfully!";
          this.snackbarColor = "success";
          this.snackbar = true;
          this.$router.push("/cart"); // or confirmation page
        } else {
          console.log("Checkout failed:", result);
          this.snackbarMessage = "❌ Checkout failed!";
          this.snackbarColor = "error";
          this.snackbar = true;
        }
      } catch (error) {
        console.error("Checkout error:", error);
        this.snackbarMessage = "⚠️ Something went wrong during checkout.";
        this.snackbarColor = "error";
        this.snackbar = true;
      }
    },
  },

  mounted() {
    this.loadCartProducts();
  },
};
</script>

<style scoped>
/* Global Styles */
* {
  box-sizing: border-box;
}

.main-container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
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

/* Checkout Progress */
.checkout-progress {
  margin-top: 10px;
  padding: 2rem 0;
  background: white;
  border-bottom: 1px solid #e0e0e0;
}

.progress-steps {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #999;
  font-size: 0.875rem;
  font-weight: 500;
}

.step.completed {
  color: #4caf50;
}

.step.active {
  color: #03045e;
}

.step-line {
  width: 60px;
  height: 2px;
  background: #e0e0e0;
}

.step-line.completed {
  background: #4caf50;
}

/* Main Content */
.checkout-main-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 450px;
  gap: 2rem;
  align-items: start;
}

/* Forms Section */
.checkout-forms {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
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
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.item-count {
  background: #03045e;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

/* Address Options */
.address-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.address-card {
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.address-card:hover {
  border-color: #03045e;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(3, 4, 94, 0.1);
}

.address-card.active {
  border-color: #03045e;
  background: #f8f9ff;
}

.address-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.address-radio {
  width: 20px;
  height: 20px;
  accent-color: #03045e;
}

.address-type {
  background: #03045e;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
}

.edit-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  margin-left: auto;
  transition: all 0.3s ease;
}

.edit-btn:hover {
  background: #f0f0f0;
  color: #03045e;
}

.address-details {
  margin-left: 2rem;
}

.recipient-name {
  font-weight: 600;
  font-size: 1.125rem;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
}

.address-text {
  color: #666;
  margin: 0.25rem 0;
  line-height: 1.4;
}

.phone-number {
  color: #03045e;
  font-weight: 500;
  margin: 0.5rem 0 0 0;
}

.add-address-btn {
  border: 2px dashed #03045e;
  background: none;
  color: #03045e;
  border-radius: 16px;
  padding: 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.add-address-btn:hover {
  background: #f8f9ff;
  transform: translateY(-2px);
}

/* Address Form */
.address-form {
  margin-top: 2rem;
  padding: 2rem;
  background: #f8f9ff;
  border-radius: 16px;
  border: 1px solid #e0e7ff;
}

.address-form h3 {
  margin: 0 0 1.5rem 0;
  color: #03045e;
  font-size: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-row:has(.form-group:last-child:nth-child(3)) {
  grid-template-columns: 1fr 1fr 1fr;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-control:focus {
  outline: none;
  border-color: #03045e;
  box-shadow: 0 0 0 3px rgba(3, 4, 94, 0.1);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;
}

.btn-cancel {
  background: #f0f0f0;
  color: #666;
}

.btn-cancel:hover {
  background: #e0e0e0;
}

.btn-save {
  background: #03045e;
  color: white;
}

.btn-save:hover {
  background: #0077b6;
  transform: translateY(-1px);
}

/* Payment Options */
.payment-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.payment-card {
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.payment-card.active {
  border-color: #4caf50;
  background: #f8fff8;
}

.payment-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.payment-radio {
  width: 20px;
  height: 20px;
  accent-color: #4caf50;
}

.payment-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.payment-title {
  font-weight: 600;
  font-size: 1.125rem;
  color: #1a1a1a;
}

.payment-subtitle {
  color: #666;
  font-size: 0.875rem;
}

.payment-description {
  margin-left: 2rem;
  color: #666;
  line-height: 1.5;
}

/* Instructions Form */
.instructions-form {
  margin-top: 1rem;
}

/* Order Summary */
.order-summary-container {
  position: sticky;
  top: 2rem;
}

.order-items {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 2rem;
  position: relative;
}

.order-items::-webkit-scrollbar {
  width: 6px;
}

.order-items::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.order-items::-webkit-scrollbar-thumb {
  background: #03045e;
  border-radius: 10px;
}

.order-items::-webkit-scrollbar-thumb:hover {
  background: #0077b6;
}

.order-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
}

/* Order Summary */
.order-summary {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 90px;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  /* padding-top: 1.5rem; */
  border-top: 1px solid #e0e0e0;
}

.item-image {
  width: 80px;
  height: 80px;
  background: #f0f0f0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 0.8rem;
  text-align: center;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-name {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.item-meta {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.item-price {
  font-weight: 700;
  color: #03045e;
  font-size: 1.1rem;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.qty-btn {
  width: 32px;
  height: 32px;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #03045e;
  transition: all 0.3s ease;
}

.qty-btn:hover {
  background: #03045e;
  color: white;
}

.qty-input {
  width: 50px;
  text-align: center;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.5rem;
  font-weight: 600;
}

.remove-btn {
  background: #03045e;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  background: #dc3545;
  transform: translateY(-1px);
}

/* Order Totals */
.order-totals {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e0e0e0;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.total-row.store {
  color: #666;
}

.store-name {
  font-weight: 600;
  color: #03045e;
}

.total-row.savings {
  color: #4caf50;
  font-weight: 600;
}

.total-row.final {
  font-weight: 700;
  font-size: 1.25rem;
  color: #03045e;
  border-top: 2px solid #e0e0e0;
  padding-top: 1rem;
  margin-top: 1rem;
}

/* Checkout Button */
.pay-now-btn {
  width: 100%;
  background: linear-gradient(135deg, #03045e, #0077b6);
  color: white;
  border: none;
  padding: 1.25rem;
  border-radius: 16px;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 700;
  margin-top: 1.5rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.pay-now-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(3, 4, 94, 0.3);
}

.terms-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #666;
}

.terms-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #03045e;
  margin-top: 2px;
}

.terms-checkbox a {
  color: #03045e;
  text-decoration: none;
  font-weight: 600;
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
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}
</style>