<template>
  <div class="product-view-container">
    <!-- Navigation Breadcrumb -->
    <div class="breadcrumb">
      <router-link to="/UserHomeMain">Home</router-link> >
      <router-link to="/products">Products</router-link>
      <router-link :to="'/category/' + product.category">{{
        product.category
      }}</router-link>
      >
      <span>{{ product.productName }}</span>
    </div>

    <!-- Main Product Section -->
    <div class="product-main">
      <!-- Left Section - Images -->
      <div class="product-images">
        <div class="image-gallery">
          <div class="main-image">
            <img
              :src="'data:image/jpeg;base64,'+ product.productImage"
              alt="Product Image"
            />
          </div>
        </div>
        <div class="product-actions">
          <button class="add-to-cart" @click="addToCart">
            <v-icon>mdi-cart</v-icon> ADD TO CART
          </button>
          <button class="buy-now" @click="buyNow">
            <v-icon>mdi-flash</v-icon> BUY NOW
          </button>
        </div>
      </div>

      <!-- Right Section - Details -->
      <div class="product-details">
        <h1 class="product-title">{{ product.productName }}</h1>

        <div class="product-info">
          <div class="product-price">
            <span class="special-price">₹{{ product.discountPrice }}</span>
            <div class="price-details">
              <span class="original-price">₹{{ product.actualPrice }}</span>
              <span class="discount">{{ product.offerPercentage }}% off</span>
            </div>
          </div>
        </div>
        <div class="product-description">
          <h3>Product Details</h3>
          <p>{{ product.description }}</p>
          <div class="product-additional-details">
            <div class="detail-item">
              <span class="detail-label">Category :</span>
              <span class="detail-value">{{ product.categoryName }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Expiry Date :</span>
              <span class="detail-value">{{ product.expiryDate }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Description :</span>
              <span class="detail-value">{{ product.productDescription }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Stock Count :</span>
              <span class="detail-value">{{ product.stockCount }} </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Store Name :</span>
              <span class="detail-value">{{ product.storeName }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedImage: null,
      product: {
        name: "",
        categoryName: "",
        expiryDate: "",
        productDescription: "",
        stockCount: 0,
        storeName: "",
        images: [],
        mainImage: "",
        discountPrice: 0,
        actualPrice: 0,
        offerPercentage: 0,
      },
    };
  },
  methods: {
    addToCart() {
      // Implement add to cart logic
    },
    buyNow() {
      // Implement buy now logic
    },
    
    async loadProductDetails(productId, storeId) {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/MedE/User/getProductDetails",
          {
            params: { productId, storeId },
          }
        );

        if (response.status === 200) {
          this.product = response.data;
          console.log("product",this.product);
        } else {
          console.error("❌ Failed to load product details.");
        }
      } catch (error) {
        console.error("🚨 Error loading product details:", error);
      }
    },
  },
  mounted() {
    const productId = this.$route.params.id;
    const storeId = sessionStorage.getItem("store_id"); // assuming store_id is stored in sessionStorage

    if (productId && storeId) {
      this.loadProductDetails(productId, storeId);
    } else {
      console.error("❌ Missing productId or storeId");
    }
  },
};
</script>

<style scoped>
.product-view-container {
  max-width: 1470px;
  /* margin: 20px auto; */
  margin: 20px;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.breadcrumb {
  padding: 10px 0;
  color: #878787;
  width: 1400px;
}

.breadcrumb a {
  color: #03045e;
  text-decoration: none;
}

.product-main {
  display: flex;
  gap: 30px;
  margin-top: 20px;
  width: 1400px;
}

.product-images {
  width: 40%;
  height: 630px;
}

.image-gallery {
  display: flex;
  gap: 20px;
}

.thumbnail-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.thumbnail {
  width: 60px;
  height: 60px;
  border: 1px solid #f0f0f0;
  cursor: pointer;
}

.thumbnail.active {
  border-color: #2874f0;
}

.main-image {
  flex-grow: 1;
  position: relative;
  padding: 15px;
  height: 500px;
  width: 500px;
  /* background-color: red; */
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  
}

.product-actions {
  display: flex;
  gap: 20px;
  margin-top: 40px;
}

.add-to-cart,
.buy-now {
  flex: 1;
  padding: 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.add-to-cart {
  background-color: white;
  border: 2px solid #03045e;
  color: #03045e;
}

.buy-now {
  background: #03045e;
  border: 2px solid #03045e;
  color: white;
}

.product-details {
  width: 1400px;
  flex-grow: 1;
  margin-left: 80px;
}

.product-title {
  font-size: 35px;
  margin-bottom: 10px;
}

.product-rating {
  margin-bottom: 15px;
}

.rating {
  background: green;
  color: white;
  padding: 2px 8px;
  border-radius: 3px;
}

.rating-count {
  color: #878787;
  margin-left: 10px;
}

.product-price {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.special-price {
  font-size: 32px;
  font-weight: 500;
}

.price-details {
  display: flex;
  align-items: center;
  gap: 20px;
}

.original-price {
  text-decoration: line-through;
  color: #878787;
  font-size: 16px;
}

.discount {
  color: #ff0000;
  font-size: 16px;
  
}

/* Remove these styles as they're no longer needed */
.offers-section,
.offers-list,
.delivery-info,
.pincode-check,
.delivery-available {
  display: none;
}

.product-description {
  margin-top: 30px;
}

.product-additional-details {
  margin-top: 30px;
  border-top: 1px solid #e0e0e0;
  padding-top: 20px;
}

.detail-item {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
}

.detail-label {
  font-weight: 600;
  color: #666;
  min-width: 120px;
}

.detail-value {
  color: #333;
}
.specifications {
  width: 100%;
  margin-top: 15px;
}

.specifications tr {
  border-bottom: 1px solid #f0f0f0;
}

.specifications td {
  padding: 10px 0;
}

.spec-key {
  color: #878787;
  width: 150px;
}
</style>