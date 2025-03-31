<template>
  <div class="container">
    <div class="blur">
      <div class="sidebar">
        <h2>Med E</h2>
        <div class="sidebar-content">
          <h4 @click="orders" tabindex="0">
            <v-icon>mdi-cart-outline</v-icon>&nbsp; Orders
          </h4>
          <h4 @click="productss" tabindex="0">
            <v-icon>mdi-shopping-outline</v-icon>&nbsp; Products
          </h4>
          <h4><v-icon>mdi-movie-outline</v-icon>&nbsp; Ads</h4>
          <h4 @click="feedback" tabindex="0">
            <v-icon>mdi-comment-quote-outline</v-icon>&nbsp; FeedBack
          </h4>
          <h4 @click="prescription" tabindex="0">
            <v-icon>mdi-note-outline</v-icon>&nbsp; Prescription List
          </h4>
        </div>
      </div>
      <div class="content order" ref="order" v-if="orderIsVisible">
        <div class="parent">
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
              <!-- <div class="nav-item">
                <v-icon size="2rem">mdi-magnify</v-icon>
              </div> -->
              <div class="nav-item nav-profile"></div>
            </div>
          </div>
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

      <div class="products" v-if="productIsVisible">
        <div class="product-head">
          <h2>Products</h2>

          <div class="nav">
            <button class="add-btn" @click="addProductDialog = true">
              <v-icon>mdi-plus</v-icon>&nbsp; Add Products
            </button>

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
        <div class="product-content" v-if="products.length > 0">
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
            <p>{{ product.categoryName }}</p>
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

      <!-- prescription list -->

      <div class="products" v-if="prescriptionIsVisible">
        <div class="product-head">
          <h2>Prescription List</h2>
          <button class="add-btn">
            <v-icon>mdi-plus</v-icon>&nbsp; Add Products
          </button>
        </div>
        <div class="product-content">
          <div class="product-card">
            <img src="" alt="" style="width: 90px; height: 90px" />
            <p>user name</p>
            <p>email</p>
            <p>phone number</p>
            <p><v-icon>mdi-eye</v-icon></p>

            <div class="product-btns">
              <button class="p-btn update">
                <v-icon>mdi-update</v-icon>&nbsp; Accept
              </button>
              <button class="p-btn delete">
                <v-icon>mdi-trash-can-outline</v-icon>&nbsp; Reject
              </button>
            </div>
            <!-- <p>offer percentage</p> -->
          </div>
        </div>
      </div>

      <!-- Feedbacks -->

      <div class="products" v-if="feedbackIsVisible">
        <div class="product-head">
          <h2>FeedBacks</h2>
          <!-- <button class="add-btn">
            <v-icon>mdi-plus</v-icon>&nbsp; Add Products
          </button> -->
        </div>
        <div class="product-content" v-if="feedbacks.length>0">
          <div class="product-card" v-for="feedback in feedbacks"
          :key="feedback.id">
            <img
              src=""
              alt=""
              style="
                width: 70px;
                height: 70px;
                border-radius: 50px;
                background-size: cover;
                border: 1px solid #03045e;
              "
            />
            <p>{{feedback.user_id}}</p>
            <v-rating v-model="feedback.rating" readonly size="30px"></v-rating>

            <div class="product-btns feedback">
              <p>
              {{ feedback.comment }}
              </p>
            </div>
            <!-- <p>offer percentage</p> -->
          </div>
        </div>
      </div>
      <!-- add product dialog -->

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

              <!-- <v-select
                label="Category"
                :items="category"
                variant="outlined"
                class="field-p-dialog"
              ></v-select> -->

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
      <!-- Update product dialog -->

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

              <!-- <v-select
                label="Category"
                :items="category"
                variant="outlined"
                class="field-p-dialog"
              ></v-select> -->

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
      <!-- add image dialog -->

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
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      searchQuery: "",
      storeId: 1,
      // fetch product

      products: [],
      productId: "",

      // fetch feedback

      feedbacks:[],
      

      // --------------------------------------

      // select category

      category: [], // Stores categories fetched from the API
      selectedCategory: "", // Stores the currently selected categoryId

      // -------------------------------------------

      // add product
      productName: "",
      productDesc: "",
      stock: "",
      expiryDate: "",
      actualPrice: "",
      offerPercentage: "",
      dragging: false,
      imageFile: null,
      imageUrl: null,

      // ----------------------------------------

      statusActive: false,
      statusPending: false,
      statusReject: true,

      // ----------------------------------------
      orderIsVisible: true,
      productIsVisible: false,
      prescriptionIsVisible: false,
      feedbackIsVisible: false,

      // ----------------------------------------

      // Dialogbox

      addProductDialog: false,
      updateProductDialog: false,
      addImageDialog: false,
    };
  },
  created() {
    //Lifecycle Hook
    this.loadCategory();
  },
  mounted() {
    this.loadStoreProducts();
    this.loadStoreFeedBack();
    // console.log("Mounted Hook: Fetching product images...");
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

    async searchProducts() {
      if (!this.searchQuery.trim()) {
        console.log("🔴 Search query is empty. Skipping API call.");
        return; // Stop if input is empty
      }

      console.log("✅ Calling search API with:", this.searchQuery);

      const response = await this.$store.dispatch("MedEStore/searchProducts", {
        storeId: this.storeId,
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
      this.productDesc = product.productDescription;
      this.stock = product.stockCount;
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
        storeId: 1,
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
        const result = await this.$store.dispatch(
          "MedEStore/fetchStoreProducts"
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

    async loadStoreFeedBack(){
      try{
        const storeId = 1;
        const result = await this.$store.dispatch("MedEStore/fetchStoreFeedback",storeId);
        if(result.success){
          console.log("fetched feedback:", result.data);
          this.feedbacks = result.data;
        } else {
          alert(`Error: ${result.error}`);
        }
        
      }catch(error){
        console.error("Error loading feedback :", error);
        
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
    },
    orders() {
      this.orderIsVisible = true;
      this.productIsVisible = false;
      this.prescriptionIsVisible = false;
      this.feedbackIsVisible = false;
    },
    prescription() {
      this.prescriptionIsVisible = true;
      this.orderIsVisible = false;
      this.productIsVisible = false;
      this.feedbackIsVisible = false;
    },
    feedback() {
      this.feedbackIsVisible = true;
      this.prescriptionIsVisible = false;
      this.orderIsVisible = false;
      this.productIsVisible = false;
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
  height: 50px;
  width: 50px;
  border: 0;
  border-radius: 50%;
  background-color: white;
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
  width: 710px;
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
</style>
