<template>
  <div class="navbar">
    <div class="left-nav">
      <a href="#" class="logo">MedE</a>
      <a href="#" class="nav-txt">
        <i class="fas fa-map-marker-alt"></i>
        <span>Find a store</span>
      </a>
    </div>
    <div class="right-nav">
      <a href="#" class="nav-txt">
        <i class="fas fa-store"></i>
        <span>Become A Seller</span>
      </a>
      <a href="#" class="nav-txt">
        <i class="fas fa-user"></i>
        <span>Sign In</span>
      </a>
      <a href="#" class="nav-txt">
        <i class="fas fa-shopping-cart"></i>
        <span>Cart</span>
      </a>
    </div>
  </div>

  <!-- Main Container -->
  <div class="main-container">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <a href="#">Home</a> > <a href="#">Cart</a> > <strong>Checkout</strong>
    </div>

    <!-- Checkout Title -->
    <div class="checkout-title">CHECKOUT</div>

    <!-- Checkout Content -->
    <div class="checkout-content">
      <div class="left-column">
        <!-- Contact Information -->
        <div class="form-section">
          <h3 class="section-title">Contact Information</h3>
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                v-model="formData.firstName"
                placeholder="Enter your first name"
              />
            </div>
            <div class="form-group">
              <label for="lastName">Last name</label>
              <input
                type="text"
                id="lastName"
                v-model="formData.lastName"
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="email">Email address</label>
              <input
                type="email"
                id="email"
                v-model="formData.email"
                placeholder="your.email@example.com"
              />
            </div>
            <div class="form-group">
              <label for="phone">Phone number</label>
              <input
                type="tel"
                id="phone"
                v-model="formData.phone"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
        </div>

        <!-- Delivery Method -->
        <div class="form-section">
          <h3 class="section-title">Delivery Method</h3>
          <div class="radio-group">
            <label
              class="radio-option"
              :class="{ selected: formData.delivery === 'standard' }"
            >
              <input
                type="radio"
                v-model="formData.delivery"
                value="standard"
                @change="selectDelivery('standard')"
              />
              <div class="radio-content">
                <span class="delivery-info">Standard delivery (5-6 days)</span>
                <span class="free-tag">FREE</span>
              </div>
            </label>
            <label
              class="radio-option"
              :class="{ selected: formData.delivery === 'express' }"
            >
              <input
                type="radio"
                v-model="formData.delivery"
                value="express"
                @change="selectDelivery('express')"
              />
              <div class="radio-content">
                <span class="delivery-info">Express delivery (1-2 days)</span>
                <span class="delivery-price">$10.00</span>
              </div>
            </label>
          </div>
        </div>

        <!-- Shipping Information -->
        <div class="form-section">
          <h3 class="section-title">Shipping Information</h3>
          <div class="form-row">
            <div class="form-group">
              <label for="country">Country</label>
              <select id="country" name="country">
                <option value="">Select Country</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="in">India</option>
              </select>
            </div>
            <div class="form-group">
              <label for="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter your city"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your full address"
              />
            </div>
            <div class="form-group">
              <label for="postal">Postal code</label>
              <input
                type="text"
                id="postal"
                name="postal"
                placeholder="12345"
              />
            </div>
          </div>
        </div>

        <!-- Payment Method -->
        <div class="form-section">
          <h3 class="section-title">Payment Method</h3>
          <div class="radio-group">
            <label
              v-for="method in ['visa', 'googlepay', 'paypal']"
              :key="method"
              class="radio-option"
              :class="{ selected: formData.payment === method }"
            >
              <input
                type="radio"
                v-model="formData.payment"
                :value="method"
                @change="selectPayment(method)"
              />
              <div class="radio-content">
                <span class="delivery-info">{{
                  method === "visa"
                    ? "Credit/Debit Card"
                    : method === "googlepay"
                    ? "Google Pay"
                    : "PayPal"
                }}</span>
                <div class="payment-icons">
                  <div :class="['payment-icon', method]">
                    {{
                      method === "visa"
                        ? "VISA"
                        : method === "googlepay"
                        ? "GPay"
                        : "PP"
                    }}
                  </div>
                </div>
              </div>
            </label>
          </div>

          <div v-if="formData.payment === 'visa'">
            <div class="form-row" style="margin-top: 2rem">
              <div class="form-group">
                <label for="cardNumber">Card number</label>
                <input
                  type="text"
                  id="cardNumber"
                  v-model="formData.cardNumber"
                  @input="formatCardNumber"
                  placeholder="1234 5678 9012 3456"
                  maxlength="19"
                />
              </div>
              <div class="form-group">
                <label for="cardHolder">Cardholder name</label>
                <input
                  type="text"
                  id="cardHolder"
                  v-model="formData.cardHolder"
                  placeholder="John Doe"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="expiryDate">Expiry date (MM/YY)</label>
                <input
                  type="text"
                  id="expiryDate"
                  v-model="formData.expiryDate"
                  @input="formatExpiryDate"
                  placeholder="12/25"
                  maxlength="5"
                />
              </div>
              <div class="form-group">
                <label for="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  v-model="formData.cvv"
                  placeholder="123"
                  maxlength="4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="order-summary">
        <h3 class="section-title">Order Summary</h3>

        <!-- Order Items -->
        <div v-for="item in items" :key="item.id" class="order-item">
          <div class="item-image">
            <i
              class="fas fa-pills"
              style="font-size: 1.5rem; color: #03045e"
            ></i>
          </div>
          <div class="item-details">
            <div class="item-name">{{ item.name }}</div>
            <div class="item-meta">{{ item.type }} • ID: {{ item.itemId }}</div>
            <div class="item-price">₹{{ item.price.toFixed(2) }}</div>
            <div class="quantity-control">
              <button class="qty-btn" @click="updateQuantity(item.id, -1)">
                -
              </button>
              <input
                type="number"
                class="qty-input"
                v-model="item.quantity"
                readonly
              />
              <button class="qty-btn" @click="updateQuantity(item.id, 1)">
                +
              </button>
              <button class="remove-btn" @click="removeItem(item.id)">
                Remove
              </button>
            </div>
          </div>
        </div>

        <!-- Order Totals -->
        <div class="order-totals">
          <div class="total-row store">
            <span>Store:</span>
            <span class="store-name">MedE Pharmacy</span>
          </div>
          <div class="total-row">
            <span>Subtotal:</span>
            <span id="subtotal">₹{{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="total-row savings">
            <span>You Save:</span>
            <span id="savings">-₹{{ savings.toFixed(2) }}</span>
          </div>
          <div class="total-row">
            <span>Delivery:</span>
            <span id="delivery-cost">
              {{ deliveryCost === 0 ? "FREE" : `₹${deliveryCost.toFixed(2)}` }}
            </span>
          </div>
          <div class="total-row final">
            <span>Total:</span>
            <span id="total">₹{{ total.toFixed(2) }}</span>
          </div>
        </div>

        <div class="terms-checkbox">
          <input type="checkbox" id="terms" name="terms" required />
          <label for="terms"
            >By proceeding, I accept the <a href="#">Terms & Conditions</a> and
            <a href="#">Privacy Policy</a></label
          >
        </div>

        <button class="pay-now-btn" onclick="proceedToPayment()">
          <i class="fas fa-credit-card"></i>
          Pay Now
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        delivery: "standard",
        country: "",
        city: "",
        address: "",
        postal: "",
        payment: "visa",
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: "",
        termsAccepted: false,
      },
      items: [
        {
          id: "item1",
          name: "Paracetamol 500mg",
          type: "Medicine",
          itemId: "MED001",
          price: 25.99,
          quantity: 2,
        },
        {
          id: "item2",
          name: "Vitamin D3 Capsules",
          type: "Supplement",
          itemId: "SUP002",
          price: 45.0,
          quantity: 1,
        },
        {
          id: "item3",
          name: "Antacid Tablets",
          type: "Medicine",
          itemId: "MED003",
          price: 18.5,
          quantity: 3,
        },
      ],
      deliveryCost: 0,
      savings: 15.5,
    };
  },
  computed: {
    subtotal() {
      return this.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    total() {
      return this.subtotal + this.deliveryCost - this.savings;
    },
  },
  methods: {
    updateQuantity(itemId, change) {
      const item = this.items.find((i) => i.id === itemId);
      if (item) {
        const newQuantity = item.quantity + change;
        if (newQuantity >= 1) {
          item.quantity = newQuantity;
        }
      }
    },
    removeItem(itemId) {
      const index = this.items.findIndex((i) => i.id === itemId);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },
    selectDelivery(type) {
      this.formData.delivery = type;
      this.deliveryCost = type === "express" ? 10 : 0;
    },
    selectPayment(method) {
      this.formData.payment = method;
    },
    formatCardNumber(e) {
      let value = e.target.value.replace(/\D/g, "");
      value = value.replace(/(.{4})/g, "$1 ").trim();
      this.formData.cardNumber = value;
    },
    formatExpiryDate(e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
      }
      this.formData.expiryDate = value;
    },
    async proceedToPayment() {
      if (!this.formData.termsAccepted) {
        alert("Please accept the terms and conditions");
        return;
      }
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        alert("Payment successful!");
        this.$router.push("/order-confirmation");
      } catch (error) {
        alert("Payment failed. Please try again.");
      }
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
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
  padding: 0 70px;
}

.left-nav {
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo {
  color: #03045e;
  font-size: 1.8rem;
  font-weight: 700;
  text-decoration: none;
}

.nav-txt {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #03045e;
  font-weight: 500;
  text-decoration: none;
  padding: 7px 15px;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}

.nav-txt:hover {
  background-color: #f0f0f0;
}

.right-nav {
  display: flex;
  align-items: center;
  gap: 30px;
}

/* Main Content */
.main-container {
  margin-top: 70px;
  padding: 20px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

.checkout-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #03045e;
  margin: 2rem 0;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.breadcrumb {
  text-align: center;
  margin-bottom: 2rem;
  color: #666;
  font-size: 0.9rem;
}

.breadcrumb a {
  color: #03045e;
  text-decoration: none;
  font-weight: 500;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 500px;
  gap: 30px;
  margin-bottom: 2rem;
}

/* Form Sections */
.form-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
  font-size: 0.9rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #fafafa;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #03045e;
  background: white;
  box-shadow: 0 0 0 3px rgba(3, 4, 94, 0.1);
}

/* Radio Options */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fafafa;
}

.radio-option:hover {
  background: #f0f4ff;
  border-color: #03045e;
}

.radio-option.selected {
  background: #e3f2fd;
  border-color: #03045e;
  box-shadow: 0 0 0 3px rgba(3, 4, 94, 0.1);
}

.radio-option input[type="radio"] {
  width: 20px;
  height: 20px;
  accent-color: #03045e;
}

.radio-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delivery-info {
  font-weight: 600;
  color: #333;
}

.delivery-price {
  font-weight: 700;
  color: #03045e;
}

.free-tag {
  background: #4caf50;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Payment Icons */
.payment-icons {
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
}

.payment-icon {
  width: 40px;
  height: 25px;
  background: #f0f0f0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  color: #666;
  border: 1px solid #ddd;
}

.payment-icon.visa {
  background: #1a1f71;
  color: white;
}
.payment-icon.mastercard {
  background: #eb001b;
  color: white;
}
.payment-icon.googlepay {
  background: #4285f4;
  color: white;
}
.payment-icon.paypal {
  background: #0070ba;
  color: white;
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
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
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

/* Responsive Design */
@media (max-width: 1024px) {
  .checkout-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .order-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 0 1rem;
  }

  .main-container {
    padding: 1rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .checkout-title {
    font-size: 2rem;
  }

  .left-nav,
  .right-nav {
    gap: 1rem;
  }

  .nav-txt span {
    display: none;
  }
}

@media (max-width: 480px) {
  .form-section,
  .order-summary {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 1.25rem;
  }
}

/* Animation for smooth interactions */
.form-section,
.order-summary {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>