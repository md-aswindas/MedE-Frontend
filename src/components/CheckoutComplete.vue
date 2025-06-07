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
        <div class="step completed">
          <v-icon size="20">mdi-truck-delivery</v-icon>
          <span>Checkout</span>
        </div>
        <div class="step-line completed"></div>
        <div class="step completed">
          <v-icon size="20">mdi-check-circle</v-icon>
          <span>Complete</span>
        </div>
      </div>
    </div>

    <!-- Success Message Section - Centered -->
    <div class="success-section">
      <div class="success-icon">
        <v-icon size="100" color="#4CAF50">mdi-check-circle</v-icon>
      </div>
      <h1 class="success-title">Order Placed Successfully!</h1>
      <p class="success-subtitle">
        Thank you for your order. We'll prepare your items and deliver them
        soon.
      </p>
      <div class="order-number">Order #{{ orderDetails.orderId }}</div>
    </div>

    <!-- Order Information Section -->
    <div class="order-info-container">
      <!-- Order Details -->
      <div class="order-details-card">
        <div class="card-header">
          <h3>Order Details</h3>
        </div>

        <div class="detail-item">
          <div class="detail-icon">
            <v-icon size="20" color="#03045E">mdi-map-marker</v-icon>
          </div>
          <div class="detail-content">
            <span class="detail-label">Delivery Address</span>
            <span class="detail-value">{{ orderDetails.deliveryAddress }}</span>
          </div>
        </div>

        <div class="detail-item">
          <div class="detail-icon">
            <v-icon size="20" color="#03045E">mdi-credit-card</v-icon>
          </div>
          <div class="detail-content">
            <span class="detail-label">Payment Method</span>
            <span class="detail-value">{{ orderDetails.paymentMethod }}</span>
          </div>
        </div>

        <div class="detail-item">
          <div class="detail-icon">
            <v-icon size="20" color="#03045E">mdi-clock</v-icon>
          </div>
          <div class="detail-content">
            <span class="detail-label">Estimated Delivery</span>
            <span class="detail-value delivery-time">{{
              orderDetails.estimatedDelivery
            }}</span>
          </div>
        </div>

        <div class="total-section">
          <div class="total-label">Total Amount</div>
          <div class="total-amount">
            ₹{{ orderDetails.totalAmount.toFixed(2) }}
          </div>
        </div>
      </div>

      <!-- Order Items -->
      <div class="order-items-card">
        <div class="card-header">
          <h3>Items Ordered ({{ orderDetails.items.length }})</h3>
        </div>

        <div class="items-list">
          <div
            v-for="item in orderDetails.items"
            :key="item.itemId"
            class="item-row"
          >
            <div class="item-icon">
              <i class="fas fa-pills"></i>
            </div>
            <div class="item-details">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-quantity">Quantity: {{ item.quantity }}</div>
            </div>
            <div class="item-price">₹{{ item.price.toFixed(2) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <button @click="trackOrder" class="track-order-btn">
        <v-icon size="20">mdi-truck-delivery</v-icon>
        Track Your Order History
      </button>
      <button @click="continueShopping" class="continue-shopping-btn">
        <v-icon size="20">mdi-cart</v-icon>
        Continue Shopping
      </button>
    </div>

    <!-- Rating Section -->
    <div class="rating-section">
      <div class="rating-card">
        <div class="rating-header">
          <div class="store-info">
            <div class="store-icon">
              <v-icon size="40" color="#03045E">mdi-store</v-icon>
            </div>
            <div class="store-details">
              <h3 class="store-name">{{ orderDetails.storeName }}</h3>
              <p class="rating-subtitle">
                How was your experience with this store?
              </p>
            </div>
          </div>
        </div>

        <div class="rating-content">
          <!-- Star Rating -->
          <div class="star-rating">
            <div class="rating-label">Rate this store:</div>
            <div class="stars">
              <button
                v-for="star in 5"
                :key="star"
                @click="setRating(star)"
                @mouseover="hoverRating = star"
                @mouseleave="hoverRating = 0"
                class="star-btn"
                :class="{
                  active: star <= (hoverRating || selectedRating),
                  hover: star <= hoverRating,
                }"
              >
                <v-icon size="28">mdi-star</v-icon>
              </button>
            </div>
            <div class="rating-text">
              {{ getRatingText(selectedRating) }}
            </div>
          </div>

          <!-- Review Text -->
          <div class="review-section">
            <label class="review-label">
              Share your experience (optional):
            </label>
            <textarea
              v-model="reviewText"
              class="review-input"
              rows="3"
              placeholder="Tell us about your experience with this store..."
              maxlength="300"
            ></textarea>
            <div class="char-count">{{ reviewText.length }}/300</div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="rating-actions">
          <button
            @click="submitRating"
            :disabled="!selectedRating || isSubmitting"
            class="submit-rating-btn"
            :class="{ submitting: isSubmitting }"
          >
            <v-icon v-if="isSubmitting" size="20">mdi-loading</v-icon>
            <v-icon v-else size="20">mdi-heart</v-icon>
            {{ isSubmitting ? "Submitting..." : "Submit Rating" }}
          </button>
          <button @click="skipRating" class="skip-btn">Skip for now</button>
        </div>

        <!-- Thank You Message (shown after rating) -->
        <div v-if="ratingSubmitted" class="thank-you-message">
          <v-icon size="32" color="#4CAF50">mdi-heart-circle</v-icon>
          <span>Thank you for your feedback!</span>
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
      orderDetails: {
        orderId: "ORD-" + Date.now(),
        storeName: "MedPlus Pharmacy",
        deliveryAddress: "123 Main Street, Kanayannur, Kerala",
        paymentMethod: "Cash on Delivery",
        estimatedDelivery: "45-60 minutes",
        totalAmount: 285.5,
        items: [
          {
            itemId: 1,
            name: "Paracetamol 500mg",
            quantity: 2,
            price: 45.0,
          },
          {
            itemId: 2,
            name: "Cough Syrup",
            quantity: 1,
            price: 120.0,
          },
          {
            itemId: 3,
            name: "Vitamin D3 Tablets",
            quantity: 1,
            price: 120.5,
          },
        ],
      },

      // Rating system
      selectedRating: 0,
      hoverRating: 0,
      reviewText: "",

      isSubmitting: false,
      ratingSubmitted: false,

      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
    };
  },

  methods: {
    setRating(rating) {
      this.selectedRating = rating;
    },

    getRatingText(rating) {
      const texts = {
        1: "Poor",
        2: "Fair",
        3: "Good",
        4: "Very Good",
        5: "Excellent",
      };
      return rating ? texts[rating] : "Select a rating";
    },

    async submitRating() {
      if (!this.selectedRating) {
        this.showSnackbar("Please select a rating", "error");
        return;
      }

      this.isSubmitting = true;

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        this.ratingSubmitted = true;
        this.showSnackbar("Thank you for your rating!", "success");
      } catch (error) {
        console.error("Error submitting rating:", error);
        this.showSnackbar(
          "Failed to submit rating. Please try again.",
          "error"
        );
      } finally {
        this.isSubmitting = false;
      }
    },

    skipRating() {
      this.ratingSubmitted = true;
      this.showSnackbar(
        "You can rate this store anytime from your order history",
        "info"
      );
    },

    trackOrder() {
      this.$router.push({
        path: "/userProfile",
        query: { section: "orders" },
      });
    },

    continueShopping() {
      this.$router.push("/");
    },

    showSnackbar(message, color) {
      this.snackbarMessage = message;
      this.snackbarColor = color;
      this.snackbar = true;
    },
  },

  mounted() {
    // In a real app, you'd get order details from route params or store
    // this.loadOrderDetails();
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
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding-bottom: 3rem;
}

/* Checkout Progress */
.checkout-progress {
  padding: 2rem 0;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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
  color: #4caf50;
  font-size: 0.875rem;
  font-weight: 600;
}

.step-line {
  width: 60px;
  height: 3px;
  background: #4caf50;
  border-radius: 2px;
}

/* Success Section - Centered */
.success-section {
  text-align: center;
  padding: 3rem 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.success-icon {
  margin-bottom: 1.5rem;
  animation: bounce 0.6s ease-out;
}

@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  40%,
  43% {
    transform: translate3d(0, -20px, 0);
  }
  70% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}

.success-title {
  font-size: 3rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #4caf50, #45a049);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.success-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
}

.order-number {
  display: inline-block;
  background: linear-gradient(135deg, #03045e, #0077b6);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 25px;
  font-weight: 700;
  font-size: 1.125rem;
  box-shadow: 0 4px 15px rgba(3, 4, 94, 0.3);
}

/* Order Information Section */
.order-info-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.order-details-card,
.order-items-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f5f9;
}

.card-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f1f5f9;
}

.card-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

/* Order Details Styling */
.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border-left: 4px solid #03045e;
}

.detail-icon {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.detail-content {
  flex: 1;
}

.detail-label {
  display: block;
  font-weight: 600;
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.detail-value {
  display: block;
  font-weight: 600;
  color: #1e293b;
  font-size: 1rem;
}

.delivery-time {
  color: #4caf50;
}

.total-section {
  background: linear-gradient(135deg, #03045e, #0077b6);
  color: white;
  padding: 1.5rem;
  border-radius: 15px;
  margin-top: 1rem;
  text-align: center;
}

.total-label {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
}

.total-amount {
  font-size: 2rem;
  font-weight: 800;
}

/* Order Items Styling */
.items-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.item-row:hover {
  background: #f1f5f9;
  transform: translateY(-1px);
}

.item-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #03045e, #0077b6);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
}

.item-details {
  flex: 1;
}

.item-name {
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
  font-size: 1.125rem;
}

.item-quantity {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.item-price {
  font-weight: 700;
  color: #03045e;
  font-size: 1.25rem;
}

/* Action Buttons */
.action-buttons {
  max-width: 600px;
  margin: 3rem auto 2rem;
  padding: 0 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.track-order-btn,
.continue-shopping-btn {
  padding: 1.25rem 2.5rem;
  border-radius: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  flex: 1;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.track-order-btn {
  background: linear-gradient(135deg, #03045e, #0077b6);
  color: white;
  border: none;
}

.track-order-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(3, 4, 94, 0.4);
}

.continue-shopping-btn {
  background: white;
  border: 2px solid #03045e;
  color: #03045e;
}

.continue-shopping-btn:hover {
  background: #03045e;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(3, 4, 94, 0.3);
}

/* Rating Section */
.rating-section {
  max-width: 800px;
  margin: 4rem auto 0;
  padding: 0 2rem;
}

.rating-card {
  background: white;
  border-radius: 25px;
  padding: 2.5rem;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f9;
}

.rating-header {
  margin-bottom: 2rem;
}

.store-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.store-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.store-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.rating-subtitle {
  color: #64748b;
  margin: 0;
  font-size: 1.125rem;
}

.rating-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Star Rating */
.star-rating {
  text-align: center;
}

.rating-label {
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
}

.stars {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.star-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #e2e8f0;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 8px;
}

.star-btn:hover,
.star-btn.hover {
  color: #fbbf24;
  transform: scale(1.2);
}

.star-btn.active {
  color: #f59e0b;
}

.rating-text {
  font-weight: 700;
  color: #03045e;
  font-size: 1.25rem;
}

/* Review Section */
.review-section {
  text-align: left;
}

.review-label {
  display: block;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  font-size: 1.125rem;
}

.review-input {
  width: 100%;
  padding: 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 15px;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  transition: all 0.3s ease;
}

.review-input:focus {
  outline: none;
  border-color: #03045e;
  box-shadow: 0 0 0 3px rgba(3, 4, 94, 0.1);
}

.char-count {
  text-align: right;
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.5rem;
}

/* Rating Actions */
.rating-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.submit-rating-btn {
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  border: none;
  padding: 1.25rem 2.5rem;
  border-radius: 15px;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 700;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex: 1;
}

.submit-rating-btn:hover:not(.submitting) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
}

.submit-rating-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.skip-btn {
  background: white;
  border: 2px solid #e2e8f0;
  color: #64748b;
  padding: 1.25rem 2rem;
  border-radius: 15px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.skip-btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
}

/* Thank You Message */
.thank-you-message {
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-weight: 600;
  font-size: 1.125rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .order-info-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }

  .success-title {
    font-size: 2.25rem;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
    padding: 0 1rem;
  }

  .track-order-btn,
  .continue-shopping-btn {
    width: 100%;
    max-width: 400px;
  }

  .rating-actions {
    flex-direction: column;
  }

  .rating-section {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .success-section {
    padding: 2rem 1rem;
  }

  .success-title {
    font-size: 1.875rem;
  }

  .order-details-card,
  .order-items-card,
  .rating-card {
    padding: 1.5rem;
  }

  .item-row {
    padding: 1rem;
  }

  .stars {
    gap: 0.25rem;
  }

  .star-btn {
    padding: 0.25rem;
  }
}
</style>