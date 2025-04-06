<template>
  <div class="container">
    <div class="blur">
      <!-- NAVIGATION BAR -->
      <div class="sidebar">
        <h2>Med E</h2>
        <div class="sidebar-content">
          <h4 @click="orders" tabindex="0">
            <v-icon>mdi-home-outline</v-icon>&nbsp; Home
          </h4>
          <h4 @click="productss" tabindex="0">
            <v-icon>mdi-shopping-outline</v-icon>&nbsp; Products
          </h4>
          <h4 @click="ads" tabindex="0">
            <v-icon>mdi-movie-outline</v-icon>&nbsp; Ads
          </h4>
          <h4 @click="feedback" tabindex="0">
            <v-icon>mdi-comment-quote-outline</v-icon>&nbsp; FeedBack
          </h4>
          <h4 @click="prescription" tabindex="0">
            <v-icon>mdi-note-outline</v-icon>&nbsp; Prescription List
          </h4>
        </div>
      </div>

      <!-- HOME PAGE -->
      <div class="content order" ref="order" v-if="orderIsVisible">
        <div class="parent">
          <!-- HOME PAGE TOP DETAILS -->
          <div class="div1">
            <h2>Hey Store !</h2>
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
          <v-dialog activator="parent" max-width="500" height="700px">
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

                <v-divider class="mb-4"></v-divider>

                <v-card-text>
                  <v-text-field
                    :class="isReadonly ? 'readonly-field' : 'editable-field'"
                    append-inner-icon="mdi-storefront"
                    label="Store Name"
                    v-model="profile.storeName"
                    variant="outlined"
                    :readonly="isReadonly"
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
                  ></v-text-field>
                  <v-text-field
                    :class="isReadonly ? 'readonly-field' : 'editable-field'"
                    append-inner-icon="mdi-lock"
                    label="Password"
                    v-model="profile.storePassword"
                    variant="outlined"
                    :readonly="isReadonly"
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

                <v-divider class="mt-2"></v-divider>

                <v-card-actions class="my-2 d-flex justify-center">
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
                    @click="isActive.value = false"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
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
              <v-icon>mdi-shopping </v-icon>&nbsp;10000
            </h1>
          </div>
          <div class="div3">3</div>
          <div class="div4">4</div>
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
          <div class="div6">6</div>
          <div class="div7">7</div>
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
            <img src="" alt="" style="width: 90px; height: 90px" />

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
            class="product-card"
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
            <p>{{ prescription.userName }}</p>
            <p>{{ prescription.email }}</p>
            <p>{{ prescription.phoneNumber }}</p>
            <p><v-icon>mdi-eye</v-icon></p>

            <div class="product-btns">
              <button class="p-btn update">
                <v-icon>mdi-update</v-icon>&nbsp; Accept
              </button>
              <button class="p-btn delete">
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
            ></v-text-field>
            <v-text-field
              class="field-p-dialog"
              hint="50%"
              label="Offer Percentage"
              
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="field-p-dialog"
              hint="2025-03-12"
              label="Offer Start Date"
              
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="field-p-dialog"
              hint="2025-04-12"
              label="Offer End Date"
              
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="field-p-dialog"
              hint="*Free Delivery above ₹500"
              label="Conditions*"
              
              variant="outlined"
            ></v-text-field>
            <button class="add-dialog add-ads-btn">Continue</button>
            <p>Conditions Apply*</p>
          </div>
        </div>

        <!-- DISPLAY ADS -->
        <div class="ads-div2">
          <div class="add-ads">
            <h3>Your Ads</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {

      // PROFILE DATA
      profile: {
        storeName: "",
        statusName: "",
        licenseNumber: "",
        phoneNumber: "",
        storePassword: "",
        registrationDate: "",
      },

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


      orderIsVisible: true,
      productIsVisible: false,
      prescriptionIsVisible: false,
      feedbackIsVisible: false,
      adsIsVisible: false,

      // ----------------------------------------

      // Dialogbox

      addProductDialog: false,
      updateProductDialog: false,
      addImageDialog: false,
      profileDialog: false,

      isReadonly: true,
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
    // console.log("Mounted Hook: Fetching product images...");
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
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading products :", error);
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
          alert(`Error: ${result.error}`);
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
          alert(`Error: ${result.error}`);
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
          alert(`Error: ${result.error}`);
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

    async loadCategory() {
      try {
        const result = await this.$store.dispatch("MedEStore/loadCategories");
        if (result.success) {
          this.category = result.data;
          console.log(result);
        } else {
          alert(`Error : ${result.error}`);
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
    },
    orders() {
      this.orderIsVisible = true;
      this.productIsVisible = false;
      this.prescriptionIsVisible = false;
      this.feedbackIsVisible = false;
      this.adsIsVisible = false;
    },
    prescription() {
      this.prescriptionIsVisible = true;
      this.orderIsVisible = false;
      this.productIsVisible = false;
      this.feedbackIsVisible = false;
      this.adsIsVisible = false;
    },
    feedback() {
      this.feedbackIsVisible = true;
      this.prescriptionIsVisible = false;
      this.orderIsVisible = false;
      this.productIsVisible = false;
      this.adsIsVisible = false;
    },
    ads() {
      this.feedbackIsVisible = false;
      this.prescriptionIsVisible = false;
      this.orderIsVisible = false;
      this.productIsVisible = false;
      this.adsIsVisible = true;
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
}
.sidebar-content {
  margin-top: 50px;
  width: fit-content;
  height: 40%;
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
.sidebar-content h4:hover {
  background-color: #03045e;
  color: white;
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
  padding: 20px 20px 20px 30px;
}

.div3 {
  grid-column: span 2 / span 2;
  grid-row: span 2 / span 2;
  grid-column-start: 4;
  grid-row-start: 2;
  border-radius: 20px;
  border: 1px solid black;
}

.div4 {
  grid-column: span 3 / span 3;
  grid-column-start: 6;
  grid-row-start: 2;
  grid-row-end: 4;
  border-radius: 20px;
  border: 1px solid black;
}

.div5 {
  grid-column: span 3 / span 3;
  grid-row: span 6 / span 6;
  grid-column-start: 6;
  grid-row-start: 4;
  height: 460px;
  border-radius: 20px;
  border: 1px solid black;
}

.div6 {
  grid-column: span 5 / span 5;
  grid-row: span 2 / span 2;
  grid-column-start: 1;
  grid-row-start: 4;
  grid-row-end: 6;
  border-radius: 20px;
  border: 1px solid black;
}

.div7 {
  grid-column: span 5 / span 5;
  grid-row: span 3 / span 3;
  grid-row-start: 6;
  grid-row-end: 10;
  border-radius: 20px;
  border: 1px solid black;
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
