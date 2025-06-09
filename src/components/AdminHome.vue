<template>
  <div class="container">
    <div class="left-side">
      <!-- Nav Bar -->
      <h2>Med E</h2>
      <div class="nav-content">
        <div
          class="list"
          :class="{ active: activeTab === 'store' }"
          @click="store"
          tabindex="0"
        >
          <p>Manage Store</p>
        </div>
        <div
          class="list"
          :class="{ active: activeTab === 'users' }"
          @click="userss"
          tabindex="0"
        >
          <p>Manage Users</p>
        </div>
        <div class="list logout-btn" @click="logout" tabindex="0">
          <p>Logout</p>
        </div>
      </div>
    </div>
    <v-dialog v-model="showDialog" max-width="800">
          <v-card class="custom-color">
            <v-card-title class="dialog-title">
              <span >License Image</span>
              <v-btn
                icon="mdi-close"
                variant="text"
                color="white"
                @click="showDialog = false"
              ></v-btn>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-img
                :src="
                  selectedLicense?.license_image
                    ? 'data:image/jpeg;base64,' +
                      selectedLicense.license_image
                    : ''
                "
                max-height="600"
                class="prescription-dialog-image"
                contain
              ></v-img>
            </v-card-text>
            <v-card-text class="pt-4">
              <p class="text-body-1">
                <strong>Store Name: </strong> {{ selectedPrescription?.userName }}
              </p>
              
            </v-card-text>
          </v-card>
        </v-dialog>
    <!-- Manage Store -->
    <div class="store" v-if="isVisibleStore" ref="store">
      <div class="parent">
        <div class="div1">
          <h3>
            Stores &nbsp;<span
              style="
                background-color: greenyellow;
                border-radius: 50px;
                padding: 1px 7px 1px 7px;
                color: black;
                font-size: 18px;
              "
              >{{ StoreCount }}</span
            >&nbsp;
          </h3>
          <input
            type="search"
            name="search"
            id=""
            class="search"
            placeholder="Search Store"
          />
          <div class="info scroll-container">
            <div
              class="store-info-card"
              v-for="stores in stores"
              :key="stores.id"
            >
              <div class="store-info-header">
                <h4>Store Information</h4>
              </div>
              <div class="store-info-content">
                <div class="info-row">
                  <span class="info-label">Store Name: </span>
                  <span class="info-value">{{ stores.storeName }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">License Number:</span>
                  <span class="info-value">{{ stores.licenseNumber }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Created Date:</span>
                  <span class="info-value">{{ stores.registrationDate }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="div2">
          <h3>
            <span
              style="
                background-color: greenyellow;
                border-radius: 50px;
                padding: 1px 7px 1px 7px;
                color: black;
              "
            >
              {{ pendingStoreCount }}
            </span>
            &nbsp; Pending Requests
          </h3>

          <div v-if="pendingStoreCount === 0" class="no-requests-message">
            No pending Requests
          </div>

          <div v-else>
            <div
              class="request store-request"
              v-for="pending in pendingStores"
              :key="pending.id"
            >
              <div class="status-card store-card">
                <p>{{ pending.storeName }}</p>
                <p>{{ pending.licenseNumber }}</p>
                <p>{{ pending.created_at }}</p>
                <button type="button" class="btn dwn" @click="viewLicense(pending)">
                  <v-icon>mdi-eye</v-icon>
                </button>
                <button
                  type="button"
                  class="btn acpt"
                  @click="updateStoreStatus(pending.store_id, 2)"
                >
                  Accept
                </button>
                <button
                  type="button"
                  class="btn rjct"
                  @click="updateStoreStatus(pending.store_id, 3)"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="div3">
          <h3>Total Stores</h3>
          <div class="num">
            <h1>
              <v-icon class="num-icon" size="2.2rem" style="margin-top: 5px"
                >mdi-storefront
              </v-icon>
              {{ StoreCount }}
            </h1>
          </div>
        </div>
        <div class="div4">
          <h3>Total Orders</h3>
          <div class="num">
            <h1>
              <v-icon class="num-icon" size="2.2rem" style="margin-top: 5px"
                >mdi-storefront
              </v-icon>
              {{ orderCount }}
            </h1>
          </div>
        </div>

        <div class="div6">
          <h3>FeedBacks</h3>

          <div class="feedback-content">
            <div
              class="feedback-card"
              v-for="feedback in feedbacks"
              :key="feedback.id"
            >
              <div class="user-info info-width" style="width: fit-content">
                <p class="user-id">{{ feedback.userName }}</p>
                <p class="user-id">{{ feedback.storeName }}</p>
                <v-rating
                  v-model="feedback.rating"
                  readonly
                  half-increments
                  size="small"
                  color="#ffa534"
                  density="compact"
                ></v-rating>
              </div>

              <div class="feedback-details">
                <p class="feedback-comment1">{{ feedback.comment }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="div7" v-if="toprated.length >= 0">
          <h3>Top Rated Stores</h3>

          <div
            class="store-card"
            v-for="(store, index) in toprated.slice(0, 3)"
            :key="index"
          >
            <div class="store-info">
              <div class="store-name">{{ store.storeName }}</div>
              <div class="store-date">Created: {{ store.created }}</div>
            </div>
            <div class="store-rating">
              <v-rating
                v-model="store.averageRating"
                readonly
                half-increments
                size="small"
                color="yellow"
                density="compact"
              ></v-rating>
              <div class="rating-value">{{ store.averageRating }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Updated User Section -->
    <div class="users" v-if="isVisibleUsers" ref="users">
      <div class="users-grid">
        <!-- Users List -->
        <div class="users-list">
          <h3>
            Users &nbsp;<span class="count-badge">{{ users.length }}</span
            >&nbsp;
          </h3>
          <input
            type="search"
            v-model="userSearch"
            class="search"
            placeholder="Search Users"
          />
          <div class="users-container">
            <div
              v-for="user in filteredUsers"
              :key="user.id"
              class="user-card-new"
            >
              <div class="user-details-grid">
                <div class="detail-item">
                  <span class="detail-label">User ID:</span>
                  <span class="detail-value">{{ user.user_id }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Username:</span>
                  <span class="detail-value">{{ user.name }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Email:</span>
                  <span class="detail-value">{{ user.email }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Phone:</span>
                  <span class="detail-value">{{ user.phoneNumber }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Prescriptions List -->
        <div class="prescriptions-section">
          <h3>
            Prescriptions &nbsp;<span class="count-badge">{{
              prescriptions.length
            }}</span
            >&nbsp;
          </h3>

          <div class="prescriptions-container">
            <div
              v-for="prescription in filteredPrescriptions"
              :key="prescription.id"
              class="prescription-card-new"
            >
              <div class="prescription-header">
                <button
                  type="button"
                  class="btn view-btn"
                  @click="viewPrescription(prescription)"
                >
                  <v-icon color="black">mdi-eye</v-icon>
                </button>
              </div>
              <div class="prescription-details-grid">
                <div class="detail-item">
                  <span class="detail-label">Prescription ID:</span>
                  <span class="detail-value">{{
                    prescription.prescriptionId
                  }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">User ID:</span>
                  <span class="detail-value">{{ prescription.userId }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Username:</span>
                  <span class="detail-value">{{ prescription.userName }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Store ID:</span>
                  <span class="detail-value">{{ prescription.storeId }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Store Name:</span>
                  <span class="detail-value">{{ prescription.storeName }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <v-dialog v-model="showPrescriptionDialog" max-width="800">
          <v-card class="custom-color">
            <v-card-title class="dialog-title">
              <span >Prescription Image</span>
              <v-btn
                icon="mdi-close"
                variant="text"
                color="white"
                @click="showPrescriptionDialog = false"
              ></v-btn>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-img
                :src="
                  selectedPrescription?.prescriptionImage
                    ? 'data:image/jpeg;base64,' +
                      selectedPrescription.prescriptionImage
                    : ''
                "
                max-height="600"
                class="prescription-dialog-image"
                contain
              ></v-img>
            </v-card-text>
            <v-card-text class="pt-4">
              <p class="text-body-1">
                <strong>User Name: </strong> {{ selectedPrescription?.userName }}
              </p>
              <p class="text-body-1">
                <strong>Store Name: </strong>
                {{
                  selectedPrescription?.storeName
                }}
              </p>
            </v-card-text>
          </v-card>
        </v-dialog>

        <!-- Categories Section -->
        <div class="categories-section">
          <div class="categories-header">
            <h3>
              Categories &nbsp;<span class="count-badge">{{
                categories.length
              }}</span
              >&nbsp;
            </h3>
            <button
              type="button"
              class="btn add-btn"
              @click="showAddCategoryForm = !showAddCategoryForm"
            >
              <v-icon>mdi-plus</v-icon> Add Category
            </button>
          </div>

          <!-- Add Category Form -->
          <div v-if="showAddCategoryForm" class="add-category-form">
            <input
              type="text"
              v-model="newCategoryName"
              class="category-input"
              placeholder="Enter category name"
            />
            <div class="form-buttons">
              <button type="button" class="btn save-btn" @click="addCategory">
                Save
              </button>
              <button
                type="button"
                class="btn cancel-btn"
                @click="cancelAddCategory"
              >
                Cancel
              </button>
            </div>
          </div>

          <div class="categories-container">
            <div
              v-for="category in categories"
              :key="category.id"
              class="category-card"
            >
              <div class="category-info">
                <h4>{{ category.categoryName }}</h4>
                <p class="category-date">Id: {{ category.categoryId }}</p>
              </div>
              <div class="category-actions">
                <!-- <button type="button" class="btn delete-btn" @click="deleteCategory(category.categoryId)">
                  <v-icon>mdi-delete</v-icon>
                </button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <v-snackbar v-model="snackbar" :timeout="3000" :color="snackbarColor" center>
    {{ snackbarMessage }}
  </v-snackbar>
</template>

<script>
// import Chart from "chart.js/auto";
export default {
  data() {
    return {
      showPrescriptionDialog: false,
      showDialog: false,
      selectedPrescription: null,
      selectedLicense: null,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
      activeTab: "store",
      isVisibleStore: true,
      isVisibleUsers: false,
      rating: 4.5,
      feedbacks: [],
      ads: [],
      userSearch: "",
      prescriptionSearch: "",
      users: [], // Will be populated with user data
      prescriptions: [], // Will be populated with prescription data
      categories: [], // Will be populated with category data
      pendingStores: [],
      stores: [],
      toprated: [],
      toprated1: [],
      orders: [],
      StoreCount: 0,
      orderCount: 0,
      pendingStoreCount: 0,
      showAddCategoryForm: false,
      newCategoryName: "",
    };
  },
  methods: {
    async viewPrescription(prescription) {
      this.selectedPrescription = prescription;
      this.showPrescriptionDialog = true;
    },
    async viewLicense(pending) {
      this.selectedLicense = pending;
      this.showDialog = true;
    },
    async updateStoreStatus(store_id, statusId) {
      if (!store_id) {
        this.snackbarMessage = "Store ID is missing.";
        this.snackbar = true;
        this.snackbarColor = "error";
        return;
      }

      const result = await this.$store.dispatch("Admin/acceptStore", {
        store_id: store_id,
        status_id: statusId,
      });

      if (result.success) {
        this.snackbarMessage = "Store status updated successfully.";
        this.snackbar = true;
        this.snackbarColor = "success";
        this.loadPendingStores();
      } else {
        this.snackbarMessage = result.error || "Failed to update store status.";
        this.snackbar = true;
        this.snackbarColor = "error";
      }
    },

    async loadPendingStores() {
      try {
        const result = await this.$store.dispatch("Admin/loadPendingStores");
        if (result.success) {
          this.pendingStores = result.data;
          console.log("pending stores", result.data);
          this.pendingStoreCount = result.data.length;
        } else {
          this.snackbarMessage = `Error: ${result.error}`;
          this.snackbar = true;
          this.snackbarColor = "error";
        }
      } catch (error) {
        console.error("Error loading pending stores:", error);
        this.snackbarMessage = "Failed to load pending stores";
        this.snackbar = true;
        this.snackbarColor = "error";
      }
    },

    async loadStores() {
      try {
        const result = await this.$store.dispatch("Admin/loadStores");
        if (result.success) {
          this.stores = result.data;
          console.log(" stores", result.data);
          this.StoreCount = result.data.length;
        } else {
          this.snackbarMessage = `Error: ${result.error}`;
          this.snackbar = true;
          this.snackbarColor = "error";
        }
      } catch (error) {
        console.error("Error loading  stores:", error);
        this.snackbarMessage = "Failed to load stores";
        this.snackbar = true;
        this.snackbarColor = "error";
      }
    },

    async loadStoresTop() {
      try {
        const result = await this.$store.dispatch("Admin/loadStoresTop");
        if (result.success) {
          this.toprated1 = result.data;
          console.log(" stores", result.data);
          this.StoreCount = result.data.length;

          this.toprated = this.toprated1
            .filter(
              (toprated1) =>
                toprated1.averageRating !== null &&
                toprated1.averageRating !== undefined
            )
            .sort((a, b) => b.averageRating - a.averageRating)
            .slice(0, 4);

          console.log("topRated store fetched", this.toprated);
        } else {
          this.snackbarMessage = `Error: ${result.error}`;
          this.snackbar = true;
          this.snackbarColor = "error";
        }
      } catch (error) {
        console.error("Error loading  stores:", error);
        this.snackbarMessage = "Failed to load stores";
        this.snackbar = true;
        this.snackbarColor = "error";
      }
    },

    async loadAds() {
      try {
        const result = await this.$store.dispatch("Admin/loadAds");
        if (result.success) {
          this.ads = result.data;
          console.log(" ads", result.data);
        } else {
          this.snackbarMessage = `Error: ${result.error}`;
          this.snackbar = true;
          this.snackbarColor = "error";
        }
      } catch (error) {
        console.error("Error loading  ads:", error);
        this.snackbarMessage = "Failed to load ads";
        this.snackbar = true;
        this.snackbarColor = "error";
      }
    },

    async loadFeedBack() {
      try {
        const result = await this.$store.dispatch("Admin/loadFeedBack");
        if (result.success) {
          this.feedbacks = result.data;
          console.log(" feedback", result.data);
        } else {
          this.snackbarMessage = `Error: ${result.error}`;
          this.snackbar = true;
          this.snackbarColor = "error";
        }
      } catch (error) {
        console.error("Error loading  feedback:", error);
        this.snackbarMessage = "Failed to load feedback";
        this.snackbar = true;
        this.snackbarColor = "error";
      }
    },

    async loadOrders() {
      try {
        const result = await this.$store.dispatch("Admin/loadOrders");
        if (result.success) {
          this.orders = result.data;
          console.log(" orders", result.data);
          this.orderCount = result.data.length;
        } else {
          this.snackbarMessage = `Error: ${result.error}`;
          this.snackbar = true;
          this.snackbarColor = "error";
        }
      } catch (error) {
        console.error("Error loading  feedback:", error);
        this.snackbarMessage = "Failed to load feedback";
        this.snackbar = true;
        this.snackbarColor = "error";
      }
    },

    // New methods for user section
    async loadUsers() {
      try {
        const result = await this.$store.dispatch("Admin/loadUsers");
        if (result.success) {
          this.users = result.data;
          console.log("users", result.data);
        } else {
          this.snackbarMessage = `Error: ${result.error}`;
          this.snackbar = true;
          this.snackbarColor = "error";
        }
      } catch (error) {
        console.error("Error loading users:", error);
        this.snackbarMessage = "Failed to load users";
        this.snackbar = true;
        this.snackbarColor = "error";
      }
    },

    async loadPrescriptions() {
      try {
        const result = await this.$store.dispatch("Admin/loadPrescriptions");
        if (result.success) {
          this.prescriptions = result.data;
          console.log("prescriptions", result.data);
        } else {
          this.snackbarMessage = `Error: ${result.error}`;
          this.snackbar = true;
          this.snackbarColor = "error";
        }
      } catch (error) {
        console.error("Error loading prescriptions:", error);
        this.snackbarMessage = "Failed to load prescriptions";
        this.snackbar = true;
        this.snackbarColor = "error";
      }
    },

    async loadCategories() {
      try {
        const result = await this.$store.dispatch("Admin/loadCategories");
        if (result.success) {
          this.categories = result.data;
          console.log("categories", result.data);
        } else {
          this.snackbarMessage = `Error: ${result.error}`;
          this.snackbar = true;
          this.snackbarColor = "error";
        }
      } catch (error) {
        console.error("Error loading categories:", error);
        this.snackbarMessage = "Failed to load categories";
        this.snackbar = true;
        this.snackbarColor = "error";
      }
    },

    viewPrescriptionImage(prescriptionId) {
      console.log("Viewing prescription image for ID:", prescriptionId);
      // Implement image viewing logic here
    },

    async addCategory() {
      if (!this.newCategoryName.trim()) {
        this.snackbarMessage = "Category name is required";
        this.snackbar = true;
        this.snackbarColor = "error";
        return;
      }

      try {
        const result = await this.$store.dispatch("Admin/addCategory", {
          categoryName: this.newCategoryName.trim(),
        });

        if (result.success) {
          this.snackbarMessage = "Category added successfully";
          this.snackbarColor = "success";
          this.snackbar = true;
          // ...other success logic
        } else {
          this.snackbarMessage = result.error || "Failed to add category";
          this.snackbarColor = "error";
          this.snackbar = true;
        }
      } catch (error) {
        console.error("Error adding category:", error);

        if (error.response && error.response.status === 409) {
          this.snackbarMessage = "Category already exists";
        } else {
          this.snackbarMessage = "Failed to add category";
        }
        this.snackbarColor = "error";
        this.snackbar = true;
      }
    },

    cancelAddCategory() {
      this.newCategoryName = "";
      this.showAddCategoryForm = false;
    },

    // editCategory(category) {
    //   console.log("Editing category:", category);
    //   // Implement edit category logic here
    // },

    // async deleteCategory(categoryId) {
    //   if (confirm("Are you sure you want to delete this category?")) {
    //     try {
    //       const result = await this.$store.dispatch("Admin/deleteCategory", {
    //         categoryId: categoryId
    //       });

    //       if (result.success) {
    //         this.snackbarMessage = "Category deleted successfully";
    //         this.snackbar = true;
    //         this.snackbarColor = "success";
    //         this.loadCategories();
    //       } else {
    //         this.snackbarMessage = result.error || "Failed to delete category";
    //         this.snackbar = true;
    //         this.snackbarColor = "error";
    //       }
    //     } catch (error) {
    //       console.error("Error deleting category:", error);
    //       this.snackbarMessage = "Failed to delete category";
    //       this.snackbar = true;
    //       this.snackbarColor = "error";
    //     }
    //   }
    // },

    store() {
      this.activeTab = "store";
      this.isVisibleStore = true;
      this.isVisibleUsers = false;
    },

    userss() {
      this.activeTab = "users";
      this.isVisibleUsers = true;
      this.isVisibleStore = false;
      // Load user-related data when switching to users tab
      this.loadUsers();
      this.loadPrescriptions();
      this.loadCategories();
    },

    logout() {
      sessionStorage.removeItem("isAdminLoggedIn");
      this.$router.push("/admin");
      console.log("Logging out...");
    },
  },

  mounted() {
    this.loadPendingStores();
    this.loadStores();
    this.loadStoresTop();
    this.loadAds();
    this.loadFeedBack();
    this.loadOrders();
  },

  computed: {
    filteredUsers() {
      return this.users.filter(
        (user) =>
          user.name.toLowerCase().includes(this.userSearch.toLowerCase()) ||
          user.email.toLowerCase().includes(this.userSearch.toLowerCase()) ||
          user.phoneNumber.includes(this.userSearch)
      );
    },

    filteredPrescriptions() {
      const search = (this.prescriptionSearch ?? "").toLowerCase();

      return this.prescriptions.filter(
        (prescription) =>
          (prescription.username ?? "").toLowerCase().includes(search) ||
          (prescription.storeName ?? "").toLowerCase().includes(search) ||
          (prescription.id?.toString() ?? "").includes(
            this.prescriptionSearch ?? ""
          )
      );
    },
  },
};
</script>
<style scoped>
.users {
  width: 100%;
  height: 700px;
  padding: 20px;
  background: black;
  color: white;
}

.users-grid {
  display: grid;
  grid-template-columns: 300px 1fr 400px;
  gap: 20px;
  height: 665px;
}

.users-list {
  background: #212121;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 665px;
  color: rgb(175, 175, 175);
}

.count-badge {
  background-color: greenyellow;
  border-radius: 50px;
  padding: 1px 7px;
  color: black;
  font-size: 20px;
  /* font-weight: 800; */
}

.custom-color{
  background: #212121;
}
.dialog-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  color: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}
.text-body-1{
  color: yellowgreen;
}

.users-container {
  flex: 1;
  overflow-y: auto;
  margin-top: 20px;
  height: 500px;
}

.user-card {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(172, 255, 47, 0.1);
}

.user-card:hover,
.user-card.active {
  background: rgba(172, 255, 47, 0.1);
  border-color: rgba(172, 255, 47, 0.3);
}

.user-avatar {
  margin-right: 15px;
  color: greenyellow;
}

.user-info h4 {
  margin: 0;
  font-size: 1rem;
}
.info-width {
  width: fit-content;
  display: flex;
  flex-direction: column;
  width: fit-content;
  padding-left: 10px;
  padding-right: 10px;
}

.user-info p {
  margin: 5px 0 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.user-details {
  background: #212121;
  border-radius: 15px;
  padding: 20px;
  overflow-y: auto;
}

.user-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.stat-card {
  background: rgba(172, 255, 47, 0.1);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
}

.stat-value {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
  font-size: 1.5rem;
  color: greenyellow;
}

.prescription-card {
  background: rgba(33, 33, 33, 0.5);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid rgba(172, 255, 47, 0.2);
}

.prescription-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.status.completed {
  background: rgba(172, 255, 47, 0.2);
  color: greenyellow;
}

.status.pending {
  background: rgba(255, 165, 0, 0.2);
  color: orange;
}

.user-chart {
  background: #212121;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.user-chart canvas {
  flex: 1;
  width: 100% !important;
  height: calc(100% - 40px) !important;
}

.feedback-card {
  background: #212121;
  border-radius: 15px;
  /* padding: 15px; */
  margin-bottom: 15px;
  height: 150px;
  width: 660px;
  margin-right: 20px;
  display: flex;
  justify-content: space-around;
  /* gap: 10px; */
  border: 1px solid rgba(172, 255, 47, 0.2);
  flex-shrink: 0;
  flex-grow: none;
}

.feedback-content::-webkit-scrollbar {
  display: none;
}

.feedback-content {
  max-height: calc(100%);
  overflow-x: auto;
  /* padding: 10px; */
  display: flex;
  flex-wrap: nowrap;
  margin-top: 20px;
}

.feedback-card {
  background: #212121;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-around;
  gap: 10px;
  border: 1px solid rgba(172, 255, 47, 0.2);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 20%;
  justify-content: space-between;
}

.user-avatar {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(255, 255, 255);
}

.user-id {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  width: fit-content;
}

.feedback-details {
  display: flex;
  gap: 4px;
  justify-content: space-between;
  align-items: center;
  width: 85%;
}

.feedback-comment {
  color: rgb(175, 175, 175);
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
}

.feedback-comment1 {
  color: rgb(175, 175, 175);
  font-size: 0.9rem;
  /* margin: 0; */
  line-height: 1.4;
  width: 480px;
  height: 80%;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.store-card {
  background: #212121;
  border-radius: 15px;
  padding: 20px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(172, 255, 47, 0.2);
}

.store-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.store-name {
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
}

.store-date {
  color: rgb(175, 175, 175);
  font-size: 0.9rem;
}

.store-rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.rating-value {
  color: rgb(255, 255, 255);
  font-weight: 500;
}
.container {
  background-color: black;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.left-side {
  height: 8%;
  width: 1459px;
  margin-top: 20px;
  background: #212121;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: rgb(175, 175, 175);
  padding-left: 30px;
  border-radius: 30px;
}

.nav-content {
  width: 90%;
  height: 100%;
  /* background-color: aliceblue; */
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: 400;
  font-size: 17px;
}
/* .list {
  height: 65%;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
}

.list:focus {
  background: linear-gradient(
    360deg,
    hsla(84, 100%, 50%, 1) 0%,
    hsla(84, 100%, 68%, 1) 100%
  ); */
/* background-color: hsl(84, 100%, 47%); */
/* color: black;
} */

.home {
  height: 100%;
  width: 100%;
  /* background-color:#212121; */
  display: flex;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
}
.home-left {
  background: #212121;
  height: 95%;
  width: 30%;
  border-radius: 20px;
}
.profile {
  background-color: rgb(0, 0, 0);
  width: 35%;
  height: 100%;
  border-radius: 20px;
  border-bottom-right-radius: 40px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile::after {
  content: "";
  position: absolute;
  left: 147px;
  top: 0px;
  height: 50px;
  width: 50px;
  border-top-left-radius: 20px;
  box-shadow: -15px -15px 0 2px #000000;
}
.profile::before {
  content: "";
  position: absolute;
  left: 0px;
  top: 130px;
  height: 50px;
  width: 50px;
  border-top-left-radius: 20px;
  box-shadow: -15px -15px 0 8px #000000;
}
.txt {
  color: white;
  width: 272px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.profile-top {
  height: 20%;
  display: flex;
}

.profile p {
  width: 80%;
  height: 84%;
  border-radius: 50%;
  background-color: #6a7fdb;
  z-index: 10;

  background-image: url(D:\med_e\src\assets\boss.png);
  background-size: 6.5rem;
  background-position: 7px 8px;
}
.home-right {
  margin-left: 20px;
  /* background: greenyellow;  */
  width: 70%;
  height: 95%;
}
.status-pending {
  width: 100%;
  height: 30%;
  border-radius: 20px;
  background: #212121;
  display: flex;
  flex-direction: column;
  padding: 20px 30px 0px 30px;
  color: rgb(175, 175, 175);
}

.status-card {
  width: 952px;
  height: 78px;
  border: 1px solid rgba(172, 255, 47, 0.295);
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 20px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  color: white;
  justify-content: space-evenly;
}
.request {
  margin-top: 30px;
  height: fit-content;

  display: flex;
  flex-wrap: nowrap; /* for scroll the content */
  overflow-x: auto;
  align-items: center;
}

.store-request {
  flex-wrap: wrap;
  overflow-y: auto;
  height: 170px;
  margin-top: 15px;
}
.no-requests-message {
  margin-top: 30px;
  display: flex;
  align-items: center;
  height: 80px;
  justify-content: center;
  font-weight: 500;
}
.request::-webkit-scrollbar {
  display: none;
}
.btn {
  /* background-color: greenyellow; */
  /* color: #212121; */
  height: 40px;
  width: 130px;
  border-radius: 20px;
  font-weight: 500;
}
.dwn {
  height: 40px;
  width: 40px;
}
.dwn:hover {
  color: #6a7fdb;
}
.acpt {
  border: 1px solid greenyellow;
  color: greenyellow;
}
.acpt:hover {
  background: linear-gradient(
    360deg,
    hsla(84, 100%, 50%, 1) 0%,
    hsla(84, 100%, 68%, 1) 100%
  );
  color: rgb(0, 0, 0);
}
.rjct {
  background-color: #ca2e55;
}
.rjct:hover {
  background-color: #212121;
  border: 1px solid #ca2e55;
  color: #ca2e55;
}
.status-pending h3 {
  position: relative;
}
.s-btn {
  position: absolute;
  right: 4%;
}
#slide-icon-left {
  /* margin-left: 690px; */
  margin-right: 10px;
}
.slide:hover {
  color: white;
}
.count {
  width: 100%;
  height: 20%;
  border-radius: 20px;
  /* background: #212121; */
  display: flex;
  color: rgb(175, 175, 175);
  margin-top: 20px;
  justify-content: space-between;
}
.count-card {
  height: 100%;
  width: 32%;
  border-radius: 20px;
  background-color: #212121;
  padding: 20px 0px 0px 30px;
  display: flex;
  flex-direction: column;
}
.num {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin-right: 30px;
  color: greenyellow;
}
.num-icon {
  padding-bottom: 10px;
}
.top-product {
  width: 100%;
  height: 291px;
  border-radius: 20px;
  /* background: #212121; */
  display: flex;
  color: rgb(175, 175, 175);
  margin-top: 20px;
  justify-content: space-between;
}
.top-p {
  height: 100%;
  width: 49%;
  border-radius: 20px;
  background-color: #212121;
  padding: 20px 0px 0px 30px;
  display: flex;
  flex-direction: column;
}
.box {
  height: 100%;
  margin-right: 30px;
  margin-top: 20px;
}
.box-item {
  width: 100%;
  height: 40%;
  border: 1px solid rgba(172, 255, 47, 0.284);
  margin-bottom: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 5px;
}
.star {
  margin-bottom: 3px;
  color: greenyellow;
}
.store {
  height: 700px;
  width: 100%;
  /* background-color:#212121; */
  display: flex;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 18px;
  padding-bottom: 18px;
}

.parent {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 13px;
}

.div1 {
  grid-row: span 5 / span 5;
  border-radius: 20px;
  background-color: #212121;
  padding: 20px 20px 20px 30px;
  color: rgb(175, 175, 175);
}
.search {
  margin-top: 30px;
  width: 100%;
  height: 50px;
  padding-left: 30px;
  border: 1px solid rgb(175, 175, 175);
  border-radius: 50px;
}

.div2 {
  grid-column: span 3 / span 3;
  grid-row: span 2 / span 2;
  border-radius: 20px;
  background-color: #212121;
  padding: 30px;
  color: rgb(175, 175, 175);
}
.store-card {
  width: 99%;
  margin-bottom: 10px;
}

.div3 {
  grid-column-start: 2;
  grid-row-start: 3;
  border-radius: 20px;
  background-color: #212121;
  padding: 20px 20px 20px 30px;
  color: rgb(175, 175, 175);
}

.div4 {
  grid-column-start: 3;
  grid-row-start: 3;
  border-radius: 20px;
  background-color: #212121;
  padding: 20px 20px 20px 30px;
  color: rgb(175, 175, 175);
}

.div6 {
  grid-column: span 2 / span 2;
  grid-row: span 2 / span 2;
  grid-column-start: 2;
  grid-row-start: 4;
  border-radius: 20px;
  background-color: #212121;
  padding: 20px 20px 20px 30px;
  color: rgb(175, 175, 175);
}

.div7 {
  grid-row: span 3 / span 3;
  grid-column-start: 4;
  grid-row-start: 3;
  border-radius: 20px;
  background-color: #212121;
  color: rgb(175, 175, 175);
  padding: 20px 20px 20px 30px;
}

.Analytics-parent {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 12px;
  height: 100%;
  width: 100%;
}

.div9 {
  grid-column: span 3 / span 3;
  grid-row: span 3 / span 3;
  border-radius: 20px;
  background: linear-gradient(
    360deg,
    hsla(84, 100%, 50%, 1) 0%,
    hsla(84, 100%, 68%, 1) 100%
  );
  padding: 20px 20px 20px 30px;
  color: rgb(175, 175, 175);
}

.div10 {
  grid-column: span 2 / span 2;
  grid-row: span 3 / span 3;
  grid-column-start: 4;
  border-radius: 20px;
  background-color: #212121;
  padding: 20px 20px 20px 30px;
  color: rgb(175, 175, 175);
}

.div11 {
  grid-column: span 3 / span 3;
  grid-row: span 2 / span 2;
  grid-column-start: 6;
  border-radius: 20px;
  background-color: #212121;
  padding: 20px 20px 20px 30px;
  color: rgb(175, 175, 175);
}

.div12 {
  grid-column: span 3 / span 3;
  grid-row: span 3 / span 3;
  grid-column-start: 1;
  grid-row-start: 4;
  border-radius: 20px;
  background-color: #212121;
  padding: 20px 20px 20px 30px;
  color: rgb(175, 175, 175);
}

.div13 {
  grid-column: span 3 / span 3;
  grid-row: span 3 / span 3;
  grid-column-start: 4;
  grid-row-start: 4;
  border-radius: 20px;
  background-color: #212121;
  padding: 20px 20px 20px 30px;
  color: rgb(175, 175, 175);
}

.div15 {
  grid-column: span 3 / span 3;
  grid-column-start: 6;
  grid-row-start: 3;
  border-radius: 20px;
  background-color: #212121;
  padding: 20px 20px 20px 30px;
  color: rgb(175, 175, 175);
}

.div16 {
  grid-column: span 2 / span 2;
  grid-row: span 3 / span 3;
  grid-column-start: 7;
  grid-row-start: 4;
  border-radius: 20px;
  background-color: #212121;

  color: rgb(175, 175, 175);
}

/* .store-info-card {
  background: #212121;
  border-radius: 15px;
  margin-top: 20px;
  padding: 15px;
  border: 1px solid rgba(172, 255, 47, 0.2);
  flex: 0 0 auto;
}
.info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-wrap: nowrap; 
  overflow-y: scroll;
} */

.scroll-container {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  white-space: nowrap;
  gap: 16px;
  padding: 1rem;
  height: 535px;
}

.scroll-container::-webkit-scrollbar {
  width: 0px;
}
.scroll-container {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.store-info-card {
  min-width: 250px;
  flex: 0 0 auto;
  border: 1px solid rgba(172, 255, 47, 0.2);
  border-radius: 8px;
  padding: 1rem;
  background: #212121;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* .scroll-container {
  
  overflow-x: auto;
  gap: 16px;
  padding: 1rem;
} */

.store-info-header {
  margin-bottom: 15px;
  color: greenyellow;
}

.store-info-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info-label {
  color: rgb(175, 175, 175);
  font-weight: 500;
}

.info-value {
  color: white;
}

.list {
  height: 65%;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Replace the :focus styles with .active class */
.list.active {
  background: linear-gradient(
    360deg,
    hsla(84, 100%, 50%, 1) 0%,
    hsla(84, 100%, 68%, 1) 100%
  );
  color: black;
}

/* Keep hover effect for better UX */
.list:hover:not(.active) {
  background: rgba(172, 255, 47, 0.1);
}

/* Logout button should not have active state */
.logout-btn.active {
  background: none !important;
  color: rgb(175, 175, 175) !important;
}

.logout-btn:hover {
  background: rgb(255, 0, 64) !important;
  color: #ffffff !important;
}

.users {
  padding: 20px;
  background-color: #000000;
  height: 700px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 18px;
  padding-bottom: 18px;
}

.users-grid {
  display: grid;
  grid-template-columns: 4.5fr 3fr 2fr; /* Users: 2fr, Prescriptions: 1fr, Categories: 1.5fr */
  gap: 26px;
  width: 100%;
  max-width: 1400px;
}

/* Section Headers */
/* h3 {
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
} */

.count-badge {
  background: greenyellow;
  color: rgb(0, 0, 0);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 24px;
  text-align: center;
}

/* Search Inputs */
/* .search {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  background: white;
} */

/* .search:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
} */

/* Users Section */
.users-list {
  background-color: #212121;
  border-radius: 12px;
  padding: 24px;
}

.users-container {
  max-height: 600px;
  overflow-y: auto;
  padding-right: 8px;
  padding-top: 5px;
}

.users-container::-webkit-scrollbar {
  width: 6px;
  display: none;
}

.users-container::-webkit-scrollbar-track {
  background-color: #212121;
  border-radius: 3px;
  display: none;
}

.users-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.users-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.user-card-new {
  /* background: #f8f9ff; */
  border: 1px solid rgba(172, 255, 47, 0.2);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.user-card-new:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  border-color: #667eea;
}

/* Prescriptions Section */
.prescriptions-section {
  background-color: #212121;
  border-radius: 12px;
  padding: 20px; /* Reduced padding for narrower section */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  /* border: 1px solid #e1e5e9; */
  height: 665px;
  color: rgb(175, 175, 175);
}

.prescriptions-container {
  padding-top: 5px;
  height: 560px;
  overflow-y: auto;
  padding-right: 6px; /* Reduced padding */
  margin-top: 40px;
}

.prescriptions-container::-webkit-scrollbar {
  width: 4px; /* Narrower scrollbar */
  display: none;
}

.prescriptions-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
  display: none;
}

.prescriptions-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
  display: none;
}

.prescription-card-new {
  background-color: #212121;
  border: 1px solid rgba(172, 255, 47, 0.2);
  border-radius: 8px;
  padding: 12px; /* Reduced padding */
  margin-bottom: 10px; /* Reduced margin */
  transition: all 0.3s ease;
}

.prescription-card-new:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 165, 0, 0.15);
  border-color: #ff9500;
}

.prescription-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}

/* Categories Section */
.categories-section {
  background-color: #212121;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  width: 350px;
  height: 660px;
  /* border: 1px solid #e1e5e9; */
}

.categories-header {
  color: rgb(175, 175, 175);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.categories-container {
  max-height: 555px;
  overflow-y: auto;
  padding-right: 8px;
}

.categories-container::-webkit-scrollbar {
  width: 6px;
  display: none;
}

.categories-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
  display: none;
}

.categories-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
  display: none;
}

.category-card {
  background-color: #212121;
  border: 1px solid rgba(172, 255, 47, 0.2);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.15);
  border-color: #48bb78;
}

.category-info h4 {
  color: #ffffff;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.category-date {
  color: #d7d7d7;
  font-size: 0.875rem;
  margin: 0;
}

.category-actions {
  display: flex;
  gap: 8px;
}

/* Detail Grids */
.user-details-grid,
.prescription-details-grid {
  display: grid;
  gap: 8px;
}

.user-details-grid {
  grid-template-columns: 1fr 1fr; /* Two columns for users */
}

.prescription-details-grid {
  grid-template-columns: 1fr; /* Single column for prescriptions to save space */
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.detail-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #b8b8b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 0.875rem;
  color: #ffffff;
  font-weight: 500;
  word-break: break-word;
}

/* Add Category Form */
.add-category-form {
  border: 1px solid rgba(172, 255, 47, 0.2);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  z-index: 100;
}

.category-input {
  color: white;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid rgba(172, 255, 47, 0.2);
  border-radius: 6px;
  font-size: 0.875rem;
  margin-bottom: 12px;
  transition: border-color 0.3s ease;
}

.category-input:focus {
  outline: none;
  border-color: yellowgreen;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-buttons {
  display: flex;
  gap: 8px;
}

/* Buttons */
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
}

.view-btn {
  background: linear-gradient(
    360deg,
    hsla(84, 100%, 50%, 1) 0%,
    hsla(84, 100%, 68%, 1) 100%
  );
  color: rgb(0, 0, 0);
  padding: 6px 6px; /* Smaller for prescription section */
  width: fit-content;
  border-radius: 100%;
  height: fit-content;
}

.view-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

.add-btn {
  background: linear-gradient(
    360deg,
    hsla(84, 100%, 50%, 1) 0%,
    hsla(84, 100%, 68%, 1) 100%
  );
  color: rgb(0, 0, 0);
  width: fit-content;
}

.add-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(72, 187, 120, 0.3);
}

.edit-btn {
  background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
  color: white;
  padding: 6px 8px;
}

.edit-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(237, 137, 54, 0.3);
}

.delete-btn {
  background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
  color: white;
  padding: 6px 8px;
  width: fit-content;
}

.delete-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(245, 101, 101, 0.3);
}

.save-btn {
  background: linear-gradient(
    360deg,
    hsla(84, 100%, 50%, 1) 0%,
    hsla(84, 100%, 68%, 1) 100%
  );
  color: rgb(0, 0, 0);
}

.save-btn:hover {
  background: linear-gradient(
    360deg,
    hsla(84, 100%, 50%, 1) 0%,
    hsla(84, 100%, 68%, 1) 100%
  );
  border: 1px solid #000000;
}

.cancel-btn {
  background: #e2e8f0;
  color: #4a5568;
}

.cancel-btn:hover {
  background: #cbd5e0;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .users-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .users-container,
  .prescriptions-container,
  .categories-container {
    max-height: 400px;
  }
}

@media (max-width: 768px) {
  .users {
    padding: 12px;
  }

  .users-list,
  .prescriptions-section,
  .categories-section {
    padding: 16px;
  }

  .user-details-grid {
    grid-template-columns: 1fr;
  }

  .categories-header {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .category-card {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .category-actions {
    justify-content: center;
  }
}

/* Loading and Empty States */
.loading-state,
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #718096;
}

.loading-state {
  font-style: italic;
}

.empty-state {
  background: #f7fafc;
  border-radius: 8px;
  border: 2px dashed #e2e8f0;
}

/* Animation for new items */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.user-card-new,
.prescription-card-new,
.category-card {
  animation: slideInUp 0.3s ease-out;
}
</style>
