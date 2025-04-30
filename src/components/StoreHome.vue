<template>
  <div class="container">
    <div class="blur">
      <!-- NAVIGATION BAR -->
      <div class="sidebar">
        <h2>Med E</h2>
        <div class="sidebar-content">
          <h4
            :class="{ active: selectedItem === 'home' }"
            @click="select('home')"
            tabindex="0"
          >
            <v-icon>mdi-home-outline</v-icon>&nbsp; Home
          </h4>
          <h4
            :class="{ active: selectedItem === 'products' }"
            @click="select('products')"
            tabindex="0"
          >
            <v-icon>mdi-shopping-outline</v-icon>&nbsp; Products
          </h4>
          <h4
            :class="{ active: selectedItem === 'orders' }"
            @click="select('orders')"
            tabindex="0"
          >
            <v-icon>mdi-cart-variant</v-icon>&nbsp; Orders
          </h4>
          <h4
            :class="{ active: selectedItem === 'ads' }"
            @click="select('ads')"
            tabindex="0"
          >
            <v-icon>mdi-movie-outline</v-icon>&nbsp; Ads
          </h4>
          <h4
            :class="{ active: selectedItem === 'feedback' }"
            @click="select('feedback')"
            tabindex="0"
          >
            <v-icon>mdi-comment-quote-outline</v-icon>&nbsp; FeedBack
          </h4>
          <h4
            :class="{ active: selectedItem === 'prescription' }"
            @click="select('prescription')"
            tabindex="0"
          >
            <v-icon>mdi-note-outline</v-icon>&nbsp; Prescription List
          </h4>
        </div>
        <h4 class="logout" @click="logout">
          <v-icon>mdi-logout</v-icon>&nbsp; Logout
        </h4>
      </div>

      <!-- HOME PAGE -->
      <div class="content order" ref="order" v-if="orderIsVisible">
        <div class="parent">
          <!-- HOME PAGE TOP DETAILS -->
          <div class="div1">
            <h2>Hey {{ profile.storeName }} !</h2>
            <div class="nav">
              <button
                class="btn"
                style="background: rgba(0, 255, 17, 0.862); color: black"
                v-if="statusActive"
              >
                <v-icon>mdi-check-decagram-outline</v-icon>&nbsp; Active
              </button>
              <button
                class="btn"
                style="background: rgba(255, 208, 0, 0.862); color: black"
                v-if="statusPending"
              >
                <v-icon>mdi-progress-clock</v-icon>&nbsp; Pending
              </button>
              <button
                class="btn"
                style="background: rgba(255, 0, 0, 0.862); color: white"
                v-if="statusReject"
              >
                <v-icon>mdi-progress-close</v-icon>&nbsp; Rejected
              </button>
              <v-rating
                v-model="averageRating"
                readonly
                half-increments
                size="30px"
                active-color="#ffa534"
                color="#ffa534"
              ></v-rating>
              <div class="nav-item nav-profile" @click="profileDialog = true">
                <h4>
                  <v-icon color="#03045E" size="30px">mdi-storefront</v-icon
                  >&nbsp; My Profile
                </h4>
              </div>
            </div>
          </div>

          <!-- STORE PROFILE DIALOG BOX -->
          <v-dialog v-model="profileDialog" max-width="500" height="780px">
            <template v-slot:default="{ isActive }">
              <v-card rounded="lg">
                <v-card-title class="d-flex justify-space-between align-center">
                  <div class="text-h5 text-medium-emphasis ps-2">
                    Store Profile
                  </div>

                  <v-btn
                    icon="mdi-close"
                    variant="text"
                    @click="isActive.value = false"
                  ></v-btn>
                </v-card-title>

                <v-divider class="mb-2"></v-divider>

                <v-card-text>
                  <v-text-field
                    :class="isReadonly ? 'readonly-field' : 'editable-field'"
                    append-inner-icon="mdi-storefront"
                    label="Store Name"
                    v-model="profile.storeName"
                    variant="outlined"
                    :readonly="isReadonly"
                    color="#03045E"
                  ></v-text-field>
                  <v-text-field
                    color="#03045E"
                    append-inner-icon="mdi-history"
                    label="Status Name"
                    :model-value="profile.statusName"
                    variant="outlined"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    color="#03045E"
                    append-inner-icon="mdi-account"
                    label="License Number"
                    :model-value="profile.licenseNumber"
                    variant="outlined"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    :class="isReadonly ? 'readonly-field' : 'editable-field'"
                    append-inner-icon="mdi-cellphone"
                    label="Phone Number"
                    v-model="profile.phoneNumber"
                    variant="outlined"
                    :readonly="isReadonly"
                    color="#03045E"
                  ></v-text-field>

                  <v-text-field
                    :class="isReadonly ? 'readonly-field' : 'editable-field'"
                    append-inner-icon="mdi-lock"
                    label="Password"
                    v-model="profile.storePassword"
                    variant="outlined"
                    :readonly="isReadonly"
                    color="#03045E"
                  ></v-text-field>
                  <v-text-field
                    color="#03045E"
                    append-inner-icon="mdi-map-marker"
                    label="Address"
                    :model-value="profile.address"
                    variant="outlined"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    color="#03045E"
                    append-inner-icon="mdi-calendar-range"
                    label="Created Date"
                    :model-value="profile.registrationDate"
                    variant="outlined"
                    readonly
                  ></v-text-field>
                </v-card-text>

                <v-divider class="mt-0"></v-divider>

                <v-card-actions class=" d-flex justify-center">
                  <v-btn
                    class="text-none"
                    color="#ff0000"
                    variant="flat"
                    rounded="x2"
                    width="48%"
                    height="50px"
                    text="Edit Profile"
                    @click="toggleReadonly"
                  >
                    {{ isReadonly ? "Edit Profile" : "Lock Edit" }}
                  </v-btn>

                  <v-btn
                    class="text-none"
                    color="#03045E"
                    rounded="x2"
                    width="48%"
                    height="50px"
                    text="Save Profile"
                    variant="flat"
                    @click="updateProfile()"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>

          <!-- HOME PAGE -->
          <div class="div2">
            <h3>Total Orders</h3>
            <h1
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                height: 60px;
                margin-top: 10px;
              "
            >
              <v-icon>mdi-cart-variant </v-icon>&nbsp;10000
            </h1>
          </div>
          <div class="div3">
            <h3>Total Products</h3>
            <h1
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                height: 60px;
                margin-top: 10px;
              "
            >
              <v-icon>mdi-shopping </v-icon>&nbsp;{{ products.length }}
            </h1>
          </div>
          <div class="div4">
            <h3>Orders Today</h3>
            <h1
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                height: 60px;
                margin-top: 10px;
              "
            >
              <v-icon>mdi-cart-variant </v-icon>&nbsp; 50
            </h1>
          </div>
          <div class="div5">
            <v-date-picker
              width="100%"
              height="100%"
              style="
                border-radius: 20px;
                background: rgba(255, 255, 255, 0.514);
                backdrop-filter: blur(10px);
                color: #03045e;
              "
            ></v-date-picker>
          </div>
          <div class="div6"><h3>Best Selling Product</h3></div>
          <div class="div7"><h3>Chart</h3></div>
        </div>
      </div>

      <!-- PRODUCT PAGE -->
      <div class="products" v-if="productIsVisible">
        <div class="product-head">
          <h2>Products</h2>

          <div class="nav">
            <button class="add-btn" @click="addProductDialog = true">
              <v-icon>mdi-plus</v-icon>&nbsp; Add Products
            </button>

            <!-- PRODUCT SEARCH BAR -->
            <div class="nav-item">
              <input
                type="text"
                name="search"
                id="search"
                v-model="searchQuery"
                @input="searchProducts"
                placeholder="Search"
                class="search"
                style="
                  height: 100%;
                  border-radius: 15px;
                  width: 350px;
                  padding-left: 20px;
                "
              />
              <v-icon size="2rem" color="#03045E">mdi-magnify</v-icon>
            </div>
          </div>
        </div>

        <!-- PRODUCT CONTENTS -->
        <div class="product-content content-2" v-if="products.length > 0">
          <div
            class="product-card"
            v-for="product in products"
            :key="product.id"
          >
            <img :src="'data:image/jpeg;base64,'+ product.productImage" alt="" style="width: 90px; height: 90px; background-size: contain;" />
            <!-- <v-img
            :src="'data:image/jpeg;base64,'+ product.productImage"
            class="productImage"
            >
            </v-img> -->

            <div class="name">
              <h2>{{ product.productName }}</h2>
              <h4>stock : {{ product.stockCount ?? product.stock }}</h4>
            </div>
            <p>{{ product.productDesc }}</p>
            <p>{{ product.expiryDate }}</p>
            <p>
              ₹
              {{
                Math.ceil(
                  product.actualPrice -
                    (product.actualPrice * product.offerPercentage) / 100
                )
              }}
            </p>
            <p style="text-decoration: line-through">
              ₹ {{ product.actualPrice }}
            </p>
            <p>{{ product.offerPercentage }} %</p>
            <div class="product-btns">
              <button class="p-btn update" @click="openUpdateDialog(product)">
                <v-icon>mdi-update</v-icon>&nbsp; Update
              </button>
              <button
                class="p-btn delete"
                @click="deleteStoreProduct(product.productId)"
              >
                <v-icon>mdi-trash-can-outline</v-icon>&nbsp; Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- PRESCRIPTION PAGE -->

      <div class="products" v-if="prescriptionIsVisible">
        <div class="product-head">
          <h2>Prescription List</h2>
        </div>

        <!-- PRESCRIPTION CONTENTS -->
        <div class="product-content" v-if="prescriptions.length > 0">
          <div
            class="product-card prescription-card"
            v-for="prescription in prescriptions"
            :key="prescription.id"
          >
            <div
              style="
                width: 70px;
                height: 70px;
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <v-icon size="50px">mdi-account-box-outline</v-icon>
            </div>
            <p v-if="hide">{{ prescription.userName }}</p>
            <p v-if="hide">{{ prescription.email }}</p>
            <p v-if="hide">{{ prescription.phoneNumber }}</p>
            <p v-if="hide" style="width: 80px"><v-icon>mdi-eye</v-icon></p>

            <input
              v-if="inputT"
              type="text"
              v-model="message"
              id=""
              placeholder="Enter Reject Message"
              style="
                width: 830px;
                height: 50px;
                padding-left: 20px;
                border-radius: 50px;
                border: 1px solid #03045e;
              "
            />
            <p
              v-if="inputT"
              style="
                background-color: #00dc0f;
                width: 80px;
                padding: 0px 10px 0px 10px;
                color: black;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50px;
                font-weight: 500;
                position: absolute;
                left: 76%;
                cursor: pointer;
              "
              @click="rejectPrescription(prescription.prescriptionId)"
            >
              Send
            </p>
            <div class="product-btns">
              <button
                class="p-btn update"
                @click="acceptPrescription(prescription.prescriptionId)"
              >
                <v-icon>mdi-update</v-icon>&nbsp; Accept
              </button>
              <button
                class="p-btn delete"
                @click="hideP(prescription.prescriptionId)"
              >
                <v-icon>mdi-trash-can-outline</v-icon>&nbsp; Reject
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- FEEDBACK PAGE -->
      <div class="products" v-if="feedbackIsVisible">
        <div class="product-head">
          <h2>FeedBacks</h2>
        </div>

        <!-- FEEDBACK CONTENT -->
        <div class="product-content" v-if="feedbacks.length > 0">
          <div
            class="product-card"
            v-for="feedback in feedbacks"
            :key="feedback.id"
          >
            <div
              style="
                width: 70px;
                height: 70px;
                border-radius: 50px;
                background-size: cover;
                /* border: 1px solid #03045e; */
                margin-right: 50px;
                margin-left: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <v-icon size="50px">mdi-account-circle-outline</v-icon>
            </div>
            <p>{{ feedback.user_id }}</p>
            <v-rating
              v-model="feedback.rating"
              readonly
              half-increments
              size="30px"
              active-color="#ffa534"
              color="#ffa534"
            ></v-rating>

            <div class="product-btns feedback">
              <p>
                {{ feedback.comment }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ADD PRODUCTS DIALOG BOX -->
      <v-dialog v-model="addProductDialog" width="100%" height="775px">
        <div class="container-dialog">
          <div class="addproduct-dialog">
            <h1 style="margin-bottom: 30px">Add Product</h1>
            <div class="price-dialog">
              <v-text-field
                class="field-p-dialog"
                hint="For example, vicks"
                label="Product Name"
                variant="outlined"
                v-model="productName"
              ></v-text-field>
              <v-select
                label="Category"
                :items="category"
                item-title="categoryName"
                item-value="categoryId"
                v-model="selectedCategory"
                @update:model-value="selected"
                variant="outlined"
                class="field-p-dialog"
              ></v-select>
            </div>
            <v-textarea
              class="field-dialog"
              label="Product Description"
              v-model="productDesc"
              row-height="25"
              rows="3"
              variant="outlined"
              auto-grow
            ></v-textarea>
            <div class="price-dialog">
              <v-text-field
                class="field-p-dialog"
                hint="For example, 100 no"
                label="Stock"
                v-model="stock"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                class="field-p-dialog"
                hint="yyyy-mm-dd"
                label="Expiry Date"
                v-model="expiryDate"
                variant="outlined"
              ></v-text-field>
            </div>
            <div class="price-dialog">
              <v-text-field
                class="field-p-dialog"
                hint="For example, ₹200"
                label="Price"
                v-model="actualPrice"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                class="field-p-dialog"
                hint="For example, 20%"
                label="Offer Percentage"
                v-model="offerPercentage"
                variant="outlined"
              ></v-text-field>
              <button class="btn-dialog" @click="addImageDialog = true">
                <v-icon>mdi-image</v-icon> Add image
              </button>
            </div>
            <div class="price-dialog">
              <button class="add-dialog" @click="StoreAddProduct">Add</button>
              <button
                class="add-dialog cancel-dialog"
                @click="addProductDialog = false"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </v-dialog>

      <!-- UPDATE PRODUCT DIALOG BOX -->
      <v-dialog v-model="updateProductDialog" width="100%" height="775px">
        <div class="container-dialog">
          <div class="addproduct-dialog">
            <h1 style="margin-bottom: 30px">Update Product</h1>
            <div class="price-dialog">
              <v-text-field
                class="field-p-dialog"
                hint="For example, vicks"
                label="Product Name"
                variant="outlined"
                v-model="productName"
                disabled
              ></v-text-field>
              <v-select
                label="Category"
                :items="category"
                item-title="categoryName"
                item-value="categoryId"
                v-model="selectedCategory"
                @update:model-value="selected"
                variant="outlined"
                class="field-p-dialog"
                disabled
              ></v-select>
            </div>

            <v-textarea
              class="field-dialog"
              label="Product Description"
              v-model="productDesc"
              row-height="25"
              rows="3"
              variant="outlined"
              auto-grow
              disabled
            ></v-textarea>
            <div class="price-dialog">
              <v-text-field
                class="field-p-dialog"
                hint="For example, 100 no"
                label="Stock"
                v-model="stock"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                class="field-p-dialog"
                hint="For example, 10-12-2080"
                label="Expiry Date"
                v-model="expiryDate"
                variant="outlined"
                disabled
              ></v-text-field>
            </div>
            <div class="price-dialog">
              <v-text-field
                class="field-p-dialog"
                hint="For example, ₹200"
                label="Price"
                v-model="actualPrice"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                class="field-p-dialog"
                hint="For example, 20%"
                label="Offer Percentage"
                v-model="offerPercentage"
                variant="outlined"
              ></v-text-field>
              <button
                class="btn-dialog"
                @click="addImageDialog = true"
                disabled
              >
                <v-icon>mdi-image</v-icon> Add image
              </button>
            </div>
            <div class="price-dialog">
              <button class="add-dialog" @click="UpdateProduct()">
                Update
              </button>
              <button
                class="add-dialog cancel-dialog"
                @click="updateProductDialog = false"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </v-dialog>

      <!-- UPLOAD IMAGE DIALOG BOX -->
      <v-dialog v-model="addImageDialog" margin="0" padding="0">
        <div class="file-upload" id="fileUpload">
          <div class="main-box">
            <div class="upload">
              <h2>Upload a File</h2>
              <h3 style="font-weight: 300">Attach your file below</h3>
              <div class="close" @click="addImageDialog = false"></div>
            </div>
            <div
              class="box"
              @dragover.prevent="dragging = true"
              @dragleave.prevent="dragging = false"
              @drop.prevent="handleDrop"
              @click="triggerFileInput"
            >
              <h4 v-if="!imageUrl">Drag file(s) here</h4>
              <h4 v-if="!imageUrl">
                or <span style="color: #00b4d8">click here </span>to upload file
              </h4>
              <input
                type="file"
                name="file"
                id="file"
                class="file"
                hidden
                ref="fileInput"
                @change="handleFile"
                accept="image/*"
              />
              <img
                v-if="imageUrl"
                :src="imageUrl"
                alt="Uploaded Image"
                width="200"
              />
            </div>
            <div class="upload-btn">
              <button class="c-btn" @click.stop="removeImage">Cancel</button>
              <button class="s-btn" @click="confirmImage">Submit</button>
            </div>
          </div>
        </div>
      </v-dialog>

      <!-- MAP PAGE -->
      <div class="ads map" v-if="realOrderVisible">
        <v-btn @click="loadMap">Show Map</v-btn>
        <v-btn color="red" @click="useCurrentLocation"
          >Use Current Location</v-btn
        >

        <div
          ref="mapContainer"
          style="
            height: 100%;
            width: 100%;
            border-radius: 20px;
            margin-top: 20px;
          "
        ></div>
        <v-btn style="background-color: #00dc0f" @click="addStoreLocation()"
          >Save location</v-btn
        >
      </div>

      <!-- ADS PAGE -->
      <div class="ads" v-if="adsIsVisible">
        <!-- ADD ADS -->
        <div class="ads-div1">
          <div class="add-ads">
            <h3>Add Ads</h3>
          </div>
          <div class="add-ads-cntnt">
            <v-text-field
              class="field-p-dialog"
              hint="festival Sale"
              label="Offer Name"
              variant="outlined"
              v-model="offerName"
            ></v-text-field>
            <v-text-field
              class="field-p-dialog"
              hint="50%"
              label="Offer Percentage"
              variant="outlined"
              v-model="offerPercent"
            ></v-text-field>
            <v-text-field
              class="field-p-dialog"
              hint="2025-03-12"
              label="Offer Start Date"
              variant="outlined"
              v-model="offerStartDate"
            ></v-text-field>
            <v-text-field
              class="field-p-dialog"
              hint="2025-04-12"
              label="Offer End Date"
              variant="outlined"
              v-model="offerEndDate"
            ></v-text-field>
            <v-text-field
              class="field-p-dialog"
              hint="*Free Delivery above ₹500"
              label="Conditions*"
              variant="outlined"
              v-model="conditions"
            ></v-text-field>
            <button class="add-dialog add-ads-btn" @click="StoreAddAds()">
              Continue
            </button>
            <p>Conditions Apply*</p>
          </div>
        </div>

        <!-- DISPLAY ADS -->
        <div class="ads-div2">
          <div class="add-ads">
            <h3>Your Ads</h3>
          </div>
          <div class="add-ads-cntnt scroll">
            <div class="ad-card card-style5" v-for="ad in Ads" :key="ad.id">
              <div class="adname one">
                <h3>{{ ad.offerName }}</h3>
                <div class="deletead" @click="deleteStoreAds(ad.adsId)">
                  <v-icon size="30px">mdi-close-circle-outline</v-icon>
                </div>
              </div>
              <div class="adoffer one">
                <h1>{{ ad.offerPercentage }}% off on all Products</h1>
              </div>
              <div class="dates one">
                <h5>From :&nbsp; {{ ad.startDate }}</h5>
                <h5>To :&nbsp;{{ ad.endDate }}</h5>
              </div>
              <div class="condition one">
                <h5>*&nbsp; {{ ad.conditions }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import { nextTick } from "vue";
import L from "leaflet";
import "leaflet-control-geocoder"; // just import to register it globally

export default {
  data() {
    return {
      map: null,
      marker: null,
      latitude: null,
      longitude: null,
      

      // PROFILE DATA
      profile: {
        storeName: "",
        statusName: "",
        licenseNumber: "",
        phoneNumber: "",
        storePassword: "",
        registrationDate: "",
        address:"",
      },
      selectedItem: "home",
      // SEARCH PRODUCT DATA
      searchQuery: "",

      // PRODUCTS DATA LIST
      products: [],
      productId: "",

      // FEEDBACK DATA LIST
      feedbacks: [],
      averageRating: "",

      // PRESCRIPTION DATA LIST
      prescriptions: [],

      // CATEGORY LIST
      category: [], // Stores categories fetched from the API
      selectedCategory: "", // Stores the currently selected categoryId

      // PRODUCT DATA
      productName: "",
      productDesc: "",
      stock: "",
      expiryDate: "",
      actualPrice: "",
      offerPercentage: "",
      dragging: false,
      imageFile: null,
      imageUrl: null,

      // ADS DATA
      Ads: [],
      adsId: "",
      offerName: "",
      offerPercent: "",
      conditions: "",
      offerStartDate: "",
      offerEndDate: "",

      orderIsVisible: true,
      productIsVisible: false,
      prescriptionIsVisible: false,
      feedbackIsVisible: false,
      adsIsVisible: false,
      realOrderVisible: false,
      // ----------------------------------------

      // Dialogbox

      addProductDialog: false,
      updateProductDialog: false,
      addImageDialog: false,
      profileDialog: false,
      dialog: false,
      isReadonly: true,

      hide: true,
      inputT: false,
    };
  },
  created() {
    //Lifecycle Hook
    this.loadCategory();
  },
  mounted() {
    this.loadStoreProducts();
    this.loadStoreFeedBack();
    this.loadPrescription();
    this.loadStoreProfile();
    this.loadStoreAds();
    // console.log("Mounted Hook: Fetching product images...");
   
  },
  watch: {
    profile(newValue) {
      if (newValue) {
        if (this.statusPending) {
          this.$router.push("/pending");
        } else if (this.statusReject) {
          this.$router.push("/rejected");
        }
      }
    },
  },

  computed: {
    ...mapGetters(["getstore_id"]),

    // CHECK THE STORE STATUS
    statusActive() {
      return this.profile.statusName === "Active";
    },
    statusPending() {
      return this.profile.statusName === "Pending";
    },
    statusReject() {
      return this.profile.statusName === "Rejected";
    },
  },
  methods: {
    ...mapActions(["fetchStoreProducts"]),

   
    loadMap() {
      nextTick(() => {
        const container = this.$refs.mapContainer;

        if (container && !this.map) {
          this.map = L.map(container).setView([9.4981, 76.3388], 19); // Kerala
          // Add satellite imagery
          L.tileLayer(
            `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=yW9Chaj3bp5BpSfoMfNq`,
            {
              attribution:
                '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>',
              tileSize: 512,
              zoomOffset: -1,
            }
          ).addTo(this.map);

          // 👉 Add search control here
          L.Control.geocoder({
            defaultMarkGeocode: false,
          })
            .on("markgeocode", async (e) => {
              const bbox = e.geocode.bbox;
              const poly = L.polygon([
                bbox.getSouthEast(),
                bbox.getNorthEast(),
                bbox.getNorthWest(),
                bbox.getSouthWest(),
              ]).addTo(this.map);

              this.map.fitBounds(poly.getBounds());
            })
            .addTo(this.map);

          // Marker on map click
          this.map.on("click", async (e) => {
            const { lat, lng } = e.latlng;
            if (this.marker) {
              this.marker.setLatLng([lat, lng]);
            } else {
              this.marker = L.marker([lat, lng]).addTo(this.map);
            }

            this.latitude = lat;
            this.longitude = lng;
            console.log(`Selected: ${lat}, ${lng}`);
            const apiKey = "yW9Chaj3bp5BpSfoMfNq"; // your actual MapTiler key
        const url = `https://api.maptiler.com/geocoding/${lng},${lat}.json?key=${apiKey}`;

        try {
          const res = await fetch(url);
          const data =  await res.json();
          if (data.features && data.features.length > 0) {
            const address = data.features[0].place_name;
            console.log("Address:", address);
            this.selectedAddress = address;

            // Optional: Show popup with address
            this.marker.bindPopup(address).openPopup();
          } else {
            this.selectedAddress = "No address found";
          }
        } catch (error) {
          console.error("Error in reverse geocoding:", error);
          this.selectedAddress = "Reverse geocoding failed";
        }
      
            
          });
        } else if (this.map) {
          this.map.invalidateSize();
        }
        
      });
    },

    useCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);

            // Store in your data if needed
            this.latitude = latitude;
            this.longitude = longitude;
          },
          (error) => {
            console.error("Error getting location:", error);
            alert("Could not get location.");
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },

    hideP() {
      this.hide = !this.hide;
      this.inputT = !this.inputT;
    },
    async logout() {
      try {
        const confirmation = confirm("Want to logout ?");
        if (!confirmation) return;
        const result = await this.$store.dispatch("logoutStore");
        if (result) {
          this.$router.push("/storeLogin"); // Or wherever your login route is
        }
      } catch (error) {
        console.log("logout failed:", error);
      }
    },
    select(item) {
      this.selectedItem = item;
      if (item === "home") this.home();
      else if (item === "products") this.productss();
      else if (item === "orders") this.orders();
      else if (item === "ads") this.ads();
      else if (item === "feedback") this.feedback();
      else if (item === "prescription") this.prescription();
    },
    selected(categoryId) {
      console.log("Selected CategoryId:", categoryId);
    },

    debugDeleteProduct(product) {
      console.log("Product clicked for deletion:", product);
      this.deleteStoreProduct(product.productId); // Ensure the correct property is passed
    },

    toggleReadonly() {
      this.isReadonly = !this.isReadonly; // Toggle between readonly and editable
      this.fieldColor = "#FF0000";
    },

    async searchProducts() {
      if (!this.searchQuery.trim()) {
        console.log("🔴 Search query is empty. Skipping API call.");
        return; // Stop if input is empty
      }

      console.log("✅ Calling search API with:", this.searchQuery);

      const response = await this.$store.dispatch("MedEStore/searchProducts", {
        storeId: this.getstore_id,
        productName: this.searchQuery,
      });

      console.log("🔹 API Response:", response);

      if (response.success) {
        this.products = response.data;
      } else {
        this.products = [];
      }
    },

    openUpdateDialog(product) {
      // Set form fields with product data
      this.productId = product.productId;
      this.productName = product.productName;
      this.productDesc = product.productDesc;
      this.stock = product.stock;
      this.actualPrice = product.actualPrice;
      this.offerPercentage = product.offerPercentage;
      this.expiryDate = product.expiryDate;
      this.selectedCategory = product.categoryId;

      // Open the dialog
      this.updateProductDialog = true;
    },

    async UpdateProduct() {
      const payload = {
        productId: this.productId,
        stock: this.stock,
        actualPrice: this.actualPrice,
        offerPercentage: this.offerPercentage,
        storeId: this.getstore_id,
      };

      try {
        const response = await this.$store.dispatch(
          "MedEStore/updateProduct",
          payload
        );
        if (response) {
          alert("Product Updated Successfully");
          this.loadStoreProducts();
          this.updateProductDialog = false;
        } else {
          console.log("Error updating product");
        }
      } catch (error) {
        console.log("Update failed:", error);
      }
    },

    async rejectPrescription(prescriptionId) {
      const payload = {
        storeId: this.getstore_id,
        rejectionReason: this.message,
        prescriptionId: prescriptionId,
      };
      console.log("Prescription ID:", prescriptionId);

      try {
        const response = await this.$store.dispatch(
          "MedEStore/rejectPrescription",
          payload
        );
        if (response) {
          alert("Prescription Rejected");
          this.loadPrescription();
          this.hideP();
        } else {
          console.log("error rejecting prescription");
        }
      } catch (error) {
        console.log("rejecting failed", error);
      }
    },
    async acceptPrescription(prescriptionId) {
      const payload = {
        storeId: this.getstore_id,
        prescriptionId: prescriptionId,
      };
      try {
        const response = await this.$store.dispatch(
          "MedEStore/acceptPrescription",
          payload
        );
        if (response) {
          alert("Prescription accepted");
          this.loadPrescription();
        } else {
          console.log("error accepting prescription");
        }
      } catch (error) {
        console.log("accepting failed", error);
      }
    },
    async addStoreLocation() {
      if (this.latitude && this.longitude) {
        const payload = {
          storeId: this.getstore_id,
          latitude: this.latitude,
          longitude: this.longitude,
          address:this.selectedAddress,
        };
        try {
          const response = await this.$store.dispatch(
            "MedEStore/addStoreLocation",
            payload
          );
          if (response) {
            alert("location Added");
          } else {
            console.log("error adding location");
          }
        } catch (error) {
          console.log("location addding failed", error);
        }
      }
    },
    async updateProfile() {
      const payload = {
        storeName: this.profile.storeName,
        storePassword: this.profile.storePassword,
        phoneNumber: this.profile.phoneNumber,
        storeId: this.getstore_id,
      };
      try {
        const response = await this.$store.dispatch(
          "MedEStore/updateProfile",
          payload
        );
        if (response) {
          alert("Profile Updated Successfully");
          this.loadStoreProfile();
          this.profileDialog = false;
        } else {
          console.log("Error updating profile");
        }
      } catch (error) {
        console.log("Update failed:", error);
      }
    },

    async StoreAddAds() {
      const payload = {
        offerName: this.offerName,
        offerPercent: parseInt(this.offerPercent),
        conditions: this.conditions,
        offerStartDate: this.offerStartDate,
        offerEndDate: this.offerEndDate,
        storeId: parseInt(this.getstore_id),
      };
      try {
        const response = await this.$store.dispatch(
          "MedEStore/addAds",
          payload
        );
        if (response) {
          alert("Ad added Successfully");
          this.loadStoreAds();
        } else {
          console.log("Error adding ad");
        }
      } catch (error) {
        console.log("ad adding failed :", error);
      }
    },

    async StoreAddProduct() {
      const formData = new FormData();
      formData.append("productImage", this.selectedFile);
      const product = {
        productName: this.productName,
        productDesc: this.productDesc,
        stock: this.stock,
        actualPrice: this.actualPrice,
        offerPercentage: this.offerPercentage,
        expiryDate: this.expiryDate,
        categoryId: this.selectedCategory,
        storeId: this.getstore_id,
      };

      formData.append(
        "productModel",
        new Blob([JSON.stringify(product)], { type: "application/json" })
      );
      try {
        const response = await this.$store.dispatch(
          "MedEStore/addProducts",
          formData
        );
        if (response) {
          alert("Product Added ✅" + response);
          this.addProductDialog = false;
          this.loadStoreProducts();
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async loadStoreProducts() {
      try {
        const storeId = this.getstore_id;
        const result = await this.$store.dispatch(
          "MedEStore/fetchStoreProducts",
          storeId
        );
        console.log("API Response:", result);
        if (result.success) {
          console.log("Fetched Products:", result.data); // Debugging
          this.products = result.data;
        } else {
          // alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading products :", error);
      }
    },

    async loadStoreAds() {
      try {
        const storeId = this.getstore_id;
        const result = await this.$store.dispatch(
          "MedEStore/fetchStoreAds",
          storeId
        );
        console.log("Ads fetch API Response:", result);
        if (result.success) {
          console.log("Fetched Ads:", result.data); // Debugging
          this.Ads = result.data;
        } else {
          // alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading Ads :", error);
      }
    },

    async loadStoreFeedBack() {
      try {
        const storeId = this.getstore_id;
        const result = await this.$store.dispatch(
          "MedEStore/fetchStoreFeedback",
          storeId
        );
        if (result.success) {
          console.log("fetched feedback:", result.data);
          this.feedbacks = result.data;
        } else {
          // alert(`Error: ${result.error}`);
        }
        const total = this.feedbacks.reduce(
          (sum, feedback) => sum + feedback.rating,
          0
        );
        this.averageRating = total / this.feedbacks.length;
        console.log("average rating :", this.averageRating.toFixed(1));
      } catch (error) {
        console.error("Error loading feedback :", error);
      }
    },

    async loadStoreProfile() {
      try {
        const storeId = this.getstore_id;
        const result = await this.$store.dispatch(
          "MedEStore/fetchStoreProfile",
          storeId
        );
        if (result.success) {
          console.log("fetched profile:", result.data);
          this.profile = result.data[0];
        } else {
          // alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading profile :", error);
      }
    },

    async loadPrescription() {
      try {
        const storeId = this.getstore_id;
        const result = await this.$store.dispatch(
          "MedEStore/fetchPrescription",
          storeId
        );
        if (result.success) {
          console.log("fetched prescriptions:", result.data);
          this.prescriptions = result.data;
        } else {
          // alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading prescription :", error);
      }
    },

    async deleteStoreProduct(productId) {
      try {
        console.log("Deleting product with ID:", productId); // Debugging
        if (!productId) {
          alert("Error: Product ID is undefined!");
          return;
        }

        const confirmation = confirm("Delete?");
        if (!confirmation) return;

        const result = await this.$store.dispatch(
          "MedEStore/deleteProduct",
          productId
        );

        if (result.success) {
          this.loadStoreProducts();
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },

    async deleteStoreAds(adsId) {
      try {
        console.log("Deleting Ad with ID:", adsId); // Debugging
        if (!adsId) {
          alert("Error: Ad ID is undefined!");
          return;
        }

        const confirmation = confirm("Delete Ad ?");
        if (!confirmation) return;

        const result = await this.$store.dispatch("MedEStore/deleteAds", adsId);

        if (result.success) {
          this.loadStoreAds();
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error deleting Ads:", error);
      }
    },

    async loadCategory() {
      try {
        const result = await this.$store.dispatch("MedEStore/loadCategories");
        if (result.success) {
          this.category = result.data;
          console.log(result);
        } else {
          // alert(`Error : ${result.error}`);
        }
      } catch (error) {
        console.error("Error Loading Category:", error);
      }
    },

    productss() {
      this.orderIsVisible = false;
      this.productIsVisible = true;
      this.prescriptionIsVisible = false;
      this.feedbackIsVisible = false;
      this.adsIsVisible = false;
      this.realOrderVisible = false;
    },
    home() {
      this.orderIsVisible = true;
      this.productIsVisible = false;
      this.prescriptionIsVisible = false;
      this.feedbackIsVisible = false;
      this.adsIsVisible = false;
      this.realOrderVisible = false;
    },
    prescription() {
      this.prescriptionIsVisible = true;
      this.orderIsVisible = false;
      this.productIsVisible = false;
      this.feedbackIsVisible = false;
      this.adsIsVisible = false;
      this.realOrderVisible = false;
    },
    feedback() {
      this.feedbackIsVisible = true;
      this.prescriptionIsVisible = false;
      this.orderIsVisible = false;
      this.productIsVisible = false;
      this.adsIsVisible = false;
      this.realOrderVisible = false;
    },
    ads() {
      this.feedbackIsVisible = false;
      this.prescriptionIsVisible = false;
      this.orderIsVisible = false;
      this.productIsVisible = false;
      this.adsIsVisible = true;
      this.realOrderVisible = false;
    },
    orders() {
      this.orderIsVisible = false;
      this.productIsVisible = false;
      this.prescriptionIsVisible = false;
      this.feedbackIsVisible = false;
      this.adsIsVisible = false;
      this.realOrderVisible = true;
    },
    // file upload

    close() {
      const close = document.getElementById("fileUpload");
      close.style.display = "none";
    },
    openUpload() {
      const open = document.getElementById("fileUpload");
      console.log(open);
      open.style.display = "flex";
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFile(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.imageUrl = URL.createObjectURL(file); // Show preview
      }
    },

    handleDrop(event) {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file) {
        this.selectedFile = file;
        this.imageUrl = URL.createObjectURL(file); // Show preview
      }
    },
    processFile(file) {
      if (file && file.type.startsWith("image/")) {
        this.imageFile = file;
        this.imageUrl = URL.createObjectURL(file);
      } else {
        alert("Please upload an image file.");
      }
    },
    removeImage() {
      this.imageFile = null;
      this.imageUrl = null;
      this.$refs.fileInput.value = ""; // Reset file input
    },
    confirmImage() {
      if (this.selectedFile) {
        this.imageConfirmed = true; // Mark image as confirmed
        this.close(); // Close modal after confirmation
      } else {
        alert("Please upload an image before submitting.");
      }
    },
  },
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Boldonse&family=Pacifico&family=Teko:wght@300..700&display=swap");

.container {
  height: 100vh;
  width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-image: url(D:\med_e\src\assets\bgimg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  color: #03045e;
}
.blur {
  background: rgba(255, 255, 255, 0.081);
  backdrop-filter: blur(10px);
  height: 100vh;
  width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
}
.sidebar {
  background-color: white;
  border-radius: 20px;
  width: 18%;
  height: 95vh;
  padding-top: 30px;
  color: #03045e;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.sidebar-content {
  margin-top: 50px;
  width: 210px;
  height: 52%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.sidebar-content h4 {
  height: 45px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 50px;
}

.sidebar-content h4.active {
  background-color: #03045e;
  color: white;
  font-weight: bold;
}
.sidebar-content h4:hover {
  border: 1px #03045e solid;
  cursor: pointer;
  padding-left: 10px;
}
.logout {
  cursor: pointer;
  color: #ff0000;
  font-weight: 500;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 50px;
  position: absolute;
  bottom: 0;
}
.content {
  width: 90%;
  height: 95vh;
}

.parent {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  gap: 12px;
  height: 100%;
  padding: 20px 0px 0px 20px;
}

.div1 {
  grid-column: span 8 / span 8;
  height: 65px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: space-between;
}
.nav {
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.nav-item {
  height: 40px;
  width: 400px;
  border-radius: 20px;
  border: 1px solid #03045e;
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.search {
  border: 0;
}
input:focus {
  border: none; /* Hides border on focus */
  outline: none; /* Prevents the default outline */
}
.nav-profile {
  height: 45px;
  width: 170px;
  border: 0;
  /* border: 2px solid #03045E; */
  border-radius: 50px;
  background-color: white;
  color: #03045e;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.btn {
  height: 45px;
  width: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  border-radius: 50px;
  font-weight: 600;
}

.div2 {
  grid-column: span 3 / span 3;
  grid-row: span 2 / span 2;
  grid-row-start: 2;
  border-radius: 20px;
  background-color: #03045e;
  color: white;
  padding: 15px 20px 20px 20px;
}

.div3 {
  grid-column: span 2 / span 2;
  grid-row: span 2 / span 2;
  grid-column-start: 4;
  grid-row-start: 2;
  border-radius: 20px;
  padding: 15px 20px 20px 20px;
  border: 1px solid rgb(255, 255, 255);
}

.div4 {
  grid-column: span 3 / span 3;
  grid-column-start: 6;
  grid-row-start: 2;
  grid-row-end: 4;
  border-radius: 20px;
  padding: 15px 20px 20px 20px;
  border: 1px solid rgb(255, 255, 255);
}

.div5 {
  grid-column: span 3 / span 3;
  grid-row: span 6 / span 6;
  grid-column-start: 6;
  grid-row-start: 4;
  height: 460px;
  border-radius: 20px;

  border: 1px solid rgb(255, 255, 255);
}

.div6 {
  grid-column: span 5 / span 5;
  grid-row: span 2 / span 2;
  grid-column-start: 1;
  grid-row-start: 4;
  grid-row-end: 6;
  border-radius: 20px;
  padding: 15px 20px 20px 20px;
  border: 1px solid rgb(255, 255, 255);
}

.div7 {
  grid-column: span 5 / span 5;
  grid-row: span 3 / span 3;
  grid-row-start: 6;
  grid-row-end: 10;
  border-radius: 20px;
  padding: 15px 20px 20px 20px;
  border: 1px solid rgb(255, 255, 255);
}

.products {
  width: 90%;
  height: 95vh;
  margin-left: 20px;
  /* padding: 20px 20px 20px 20px; */
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid white;
}
.ads {
  width: 90%;
  height: 95vh;
  margin-left: 20px;
  /* padding: 20px 20px 20px 20px; */
  border-radius: 20px;
  /* border: 1px solid white; */
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 8px;
}
.map {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ads-div1 {
  grid-column: span 3 / span 3;
  grid-row: span 5 / span 5;
  /* border: 1px solid #03045E; */
  border-radius: 20px;
}
.add-ads {
  height: 60px;
  width: 100%;
  border-radius: 20px;
  background-color: #03045e;
  color: #ffffff;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.add-ads-cntnt {
  width: 100%;
  height: 615px;
  border-radius: 20px;
  border: 1px solid #ffffff;
  padding: 30px;
  box-sizing: border-box;
}
.scroll {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
}
.scroll::-webkit-scrollbar {
  display: none;
}
.one {
  width: 100%;
}
.ad-card {
  /* border: 1px #16db93 solid; */
  height: 200px;
  width: 100%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px;
  margin-bottom: 15px;
  flex-shrink: 0;
  position: relative;
}
.dates {
  display: flex;
  justify-content: space-around;
}
.adoffer {
  display: flex;
  justify-content: center;
  font-family: Boldonse;
  font-weight: 300;
  font-size: 12px;
}
.condition {
  padding-left: 20px;
}
.deletead {
  color: white;
  /* background-color: #ff0000; */
  cursor: pointer;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 3%;
  right: 1%;
}
.adname {
  display: flex;
  justify-content: space-between;
  padding: 0px 20px 0px 20px;
  font-family: Pacifico;
  font-weight: 400;
}
.card-style1 {
  background: linear-gradient(to bottom right, #ffffff, #be92a2);
  color: #5a2a37;
}
.card-style2 {
  background: linear-gradient(to bottom right, #ffffff, #3fa7d6);
  color: #1e2a3a;
}
.card-style3 {
  background: linear-gradient(to bottom right, #ffffff, #9c89b8);
  color: #3c2a4d;
}
.card-style4 {
  background: linear-gradient(to bottom right, #ffffff, #ff6b6b);
  color: #5e1f1f;
}
.card-style5 {
  background: linear-gradient(to bottom right, #ffffff, #4dabf7);
  color: #1b2d44;
}

.ads-div2 {
  grid-column: span 2 / span 2;
  grid-row: span 5 / span 5;
  grid-column-start: 4;
  /* border: 1px solid #03045E; */
  border-radius: 20px;
}

.product-content {
  width: 100%;
  height: 662px;
  /* background-color: aquamarine; */
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
}
.product-content::-webkit-scrollbar {
  display: none;
}
.product-content p {
  width: 200px;
}
.content-2 p {
  width: 120px;
}
.product-head {
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 20px 20px;
  /* border: 1px solid black; */
  border-radius: 20px 20px 0px 0px;
  /* background: rgba(255, 255, 255, 0.514); */
  /* backdrop-filter: blur(10px); */
  background-color: white;
}
.add-btn {
  height: 40px;
  width: 160px;
  border-radius: 50px;
  background-color: #03045e;
  color: white;
  padding: 0px 10px 0px 10px;
}
.product-card {
  border: 1px solid rgb(255, 255, 255);
  margin-top: 15px;
  height: 120px;
  width: 95%;
  border-radius: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: rgba(255, 255, 255, 0.215);
  backdrop-filter: blur(10px);
  flex-shrink: 0;
}
.productImage{
  width: 90px;
  height: 90px;

}
.prescription-card {
  height: 100px;
}

.product-card p {
  height: fit-content;
}
.name {
  width: 150px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.product-btns {
  display: flex;
  width: 130px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.feedback {
  width: 600px;
}
.p-btn {
  height: 40px;
  width: 100%;
  border-radius: 50px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
}
.update {
  border: 1px solid #03045e;
}
.delete {
  background-color: red;
  color: white;
}

/* add product dialog box */

.container-dialog {
  width: 100%;
  height: 100vh;
  /* background: rgba(255, 255, 255, 0.081);
  backdrop-filter: blur(10px); */
  display: flex;
  justify-content: center;
  align-items: center;
}
.addproduct-dialog {
  width: 50%;
  height: 80%;
  background-color: rgb(251, 251, 251);
  padding: 30px;
  border-radius: 10px;
}
.price-dialog {
  display: flex;
  justify-content: space-between;
}
.filed-dialog {
  margin-left: 5px;
  margin-right: 5px;
}
.field-p-dialog {
  margin-left: 2px;
  margin-right: 2px;
}
.btn-dialog {
  border-radius: 5px;
  border: 1px solid rgb(125, 125, 125);
  color: rgb(125, 125, 125);
  height: 56px;
  width: 150px;
  padding: 10px;
}
.add-dialog {
  width: 46%;
  background-color: #03045e;
  color: white;
  font-weight: 400;
  height: 50px;
  border-radius: 5px;
  margin-top: 10px;
}
.add-ads-btn {
  width: 100%;
  background-color: #ff0101;
  color: white;
  font-weight: 600;
  height: 50px;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 30px;
}
.cancel-dialog {
  background-color: #ff0101;
  margin-top: 10px;
}

/* image dialog box  */

.file-upload {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* z-index: 10; */
  /* position: fixed;
  top: 0;
  left: 0; */
  background: rgba(255, 255, 255, 0.081);
  backdrop-filter: blur(10px); /* Glass effect */
  border-radius: 20px;
  display: flex;
}
.main-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  width: 550px;
  height: 450px;
  background-color: #f4f0f0;
  border-radius: 15px;
  box-shadow: 0px 0px 0px 2px #f4f0f0;
}

.upload {
  width: 90%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
.close {
  height: 50px;
  width: 50px;
  border-radius: 50px;
  /* background-color: #00acd1; */
  position: absolute;
  right: 0;
  background-image: url(D:\med_e\src\assets\cross.png);
  background-repeat: no-repeat;
  background-size: 2rem;
  background-position: 50%;
  cursor: pointer;
}
.box {
  width: 90%;
  height: 55%;
  border: 1.5px #03045e dashed;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.box:hover {
  background-color: #e7e5e580;
}
.upload-btn {
  width: 90%;
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: #03045e; */
}
.c-btn {
  width: 100px;
  height: 40px;
  border: 1px solid #03045e;
  color: #03045e;
  font-weight: 500;
  border-radius: 20px;
}
.s-btn {
  width: 130px;
  height: 40px;
  background-color: #03045e;
  color: #ffffff;
  font-weight: 500;
  border-radius: 20px;
}
/* ::v-deep(.readonly-field .v-input__control) {
  background-color: #f0f0f0 !important;
  color: #ffeb3b; 
} */

::v-deep(.editable-field .v-input__control) {
  color: #ff0000 !important;
}
</style>
