<template>
  <div class="main-container">
    <!-- Navigation Bar -->
    <div class="navbar">
      <div class="left-nav">
        <router-link to="/UserHomeMain" class="logo-link">
          <h1 class="logo">MedE</h1>
        </router-link>
      </div>
      <div class="right-nav">
        <p class="nav-txt">
          <v-icon large color="#03045E" size="1.2rem" class="icon"
            >mdi-account</v-icon
          >
          {{ user.name }}
        </p>
      </div>
    </div>

    <!-- Main Dashboard Content -->
    <div class="dashboard-container">
      <!-- Left Sidebar -->
      <div class="sidebar">
        <div class="user-profile">
          <v-avatar size="80" color="primary">
            <v-icon size="40" color="white">mdi-account</v-icon>
          </v-avatar>
          <h3 class="user-name">{{ user.name }}</h3>
          <p class="user-email">{{ user.email }}</p>
        </div>

        <v-list nav class="nav-menu">
          <v-list-item
            v-for="(item, index) in menuItems"
            :key="index"
            @click="currentSection = item.id"
            :class="{ active: currentSection === item.id }"
            class="menu-item"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon" size="20"></v-icon>
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
          <button class="logout" @click="logout()">Logout</button>
        </v-list>
      </div>

      <!-- Main Content Area -->
      <div class="content-area">
        <!-- User Details Section -->
        <div v-if="currentSection === 'details'" class="content-section">
          <div class="section-header">
            <h2 class="section-title">Personal Details</h2>
            <!-- <v-btn
              :color="isEditing ? 'success' : 'primary'"
              @click="toggleEdit"
              class="action-btn"
            >
              <v-icon class="mr-2">{{
                isEditing ? "mdi-content-save" : "mdi-pencil"
              }}</v-icon>
              {{ isEditing ? "Save Changes" : "Edit Details" }}
            </v-btn> -->
          </div>

          <v-form class="details-form">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="user.name"
                  label="Username"
                  :readonly="!isEditing"
                  variant="outlined"
                  class="input-field"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="user.email"
                  label="Email"
                  variant="outlined"
                  :readonly="!isEditing"
                  class="input-field"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="user.phoneNumber"
                  label="Phone"
                  :readonly="!isEditing"
                  variant="outlined"
                  class="input-field"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="user.password"
                  label="Password"
                  type="password"
                  :readonly="!isEditing"
                  variant="outlined"
                  class="input-field"
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12">
                <v-textarea
                  v-model="user.address"
                  label="Address"
                  :readonly="!isEditing"
                  variant="outlined"
                  rows="3"
                  class="input-field"
                ></v-textarea>
              </v-col> -->
            </v-row>
          </v-form>
        </div>

        <!-- Prescriptions Section -->
        <div v-if="currentSection === 'prescriptions'" class="content-section">
          <div class="section-header">
            <h2 class="section-title">My Prescriptions</h2>
          </div>

          <div v-if="prescriptions.length > 0" class="prescriptions-grid">
            <v-card
              v-for="prescription in prescriptions"
              :key="prescription.id"
              class="prescription-card"
            >
              <v-img
                :src="
                  'data:image/jpeg;base64,' + prescription.prescriptionImage
                "
                height="200"
                cover
                class="prescription-image"
              ></v-img>
              <v-card-text>
                <p class="prescription-date">{{ prescription.date }}</p>
                <p class="prescription-doctor">
                  Status :
                  <span
                    :style="{
                      color:
                        prescription.status === 'Accepted'
                          ? '#4CAF50'
                          : prescription.status === 'Rejected'
                          ? '#FF5252'
                          : '#000000',
                    }"
                  >
                    {{ prescription.status }}
                  </span>
                </p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  variant="text"
                  @click="viewPrescription(prescription)"
                >
                  <v-icon class="mr-2">mdi-eye</v-icon>
                  View
                </v-btn>
                <v-btn
                  color="error"
                  variant="text"
                  @click="handleDelete(prescription.prescriptionId)"
                >
                  <v-icon class="mr-2">mdi-delete</v-icon>
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
          <div v-else class="empty-state">
            <v-icon size="64" color="grey-lighten-1"
              >mdi-file-document-outline</v-icon
            >
            <h3>No Prescriptions Yet</h3>
            <p>Upload your first prescription to get started</p>
          </div>
        </div>

        <v-dialog v-model="showPrescriptionDialog" max-width="800">
          <v-card>
            <v-card-title class="dialog-title">
              <span>Prescription Image</span>
              <v-btn
                icon="mdi-close"
                variant="text"
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
                <strong>Date:</strong> {{ selectedPrescription?.date }}
              </p>
              <p class="text-body-1">
                <strong>Status:</strong>
                {{
                  selectedPrescription && selectedPrescription.status
                    ? selectedPrescription.status
                    : ""
                }}
              </p>
            </v-card-text>
          </v-card>
        </v-dialog>

        <!-- Orders Section -->
        <div v-if="currentSection === 'orders'" class="content-section">
          <div class="section-header">
            <h2 class="section-title">Order History</h2>
          </div>

          <div v-if="orders.length > 0" class="orders-list">
            <v-card v-for="order in orders" :key="order.id" class="order-card">
              <v-card-text>
                <div class="order-header">
                  <div>
                    <h3 class="order-id">#{{ order.orderId }}</h3>
                    <p class="order-date">{{ order.orderDate }}</p>
                    <p class="store-name">
                      <v-icon size="16" color="#03045E" class="mr-1"
                        >mdi-store</v-icon
                      >
                      {{ order.storeName }}
                    </p>
                  </div>
                  <!-- <v-chip
                    :color="getStatusColor(order.status)"
                    class="status-chip"
                  >
                    {{ order.status }}
                  </v-chip> -->
                </div>

                <v-divider class="my-3"></v-divider>

                <div class="order-items">
                  <div
                    v-for="item in order.items"
                    :key="item.id"
                    class="order-item"
                  >
                    <div class="item-info">
                      <img :src="item.imageBase64" class="item-image" />
                      <div class="item-details">
                        <span class="item-name">{{ item.productName }}</span>
                        <span class="item-quantity"
                          >Quantity: {{ item.quantity }}</span
                        >
                      </div>
                    </div>
                    <span class="item-price">₹{{ item.price }}</span>
                  </div>
                </div>

                <v-divider class="my-3"></v-divider>
                <div class="order-total">
                  <span>Total Amount:</span>
                  <span class="total-price">₹{{ order.totalPrice }}</span>
                </div>
              </v-card-text>
            </v-card>
          </div>
          <div v-else class="empty-state">
            <v-icon size="64" color="grey-lighten-1"
              >mdi-package-variant</v-icon
            >
            <h3>No Orders Yet</h3>
            <p>Your order history will appear here</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserDashboard",
  data() {
    return {
      currentSection: "details",
      isEditing: false,
      showPrescriptionDialog: false,
      selectedPrescription: null,
      menuItems: [
        {
          id: "details",
          title: "Personal Details",
          icon: "mdi-account-circle",
        },
        {
          id: "prescriptions",
          title: "Prescriptions",
          icon: "mdi-file-document-outline",
        },
        { id: "orders", title: "Order History", icon: "mdi-package-variant" },
        // { id: "logout", title: "Logout", icon: "mdi-logout" },
      ],
      user: {
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        address: "123 Main St, City, State",
      },
      prescriptions: [],
      orders: [],
    };
  },
  methods: {
    async viewPrescription(prescription) {
      this.selectedPrescription = prescription;
      this.showPrescriptionDialog = true;
    },
    async loadOrders() {
      try {
        const result = await this.$store.dispatch("EndUser/loadOrders", {
          userId: sessionStorage.getItem("user_id"),
        });
        if (result.success) {
          this.orders = result.data;
          console.log("Orders", result.data);
        } else {
          this.snackbarMessage = `Error: ${result.error}`;
          this.snackbar = true;
          this.snackbarColor = "error";
        }
      } catch (error) {
        console.error("Error loading orders:", error);
        this.snackbarMessage = "Failed to load order items";
        this.snackbar = true;
        this.snackbarColor = "error";
      }
    },

    async loadPrescriptions() {
      try {
        const result = await this.$store.dispatch(
          "EndUser/fetchPrescriptions",
          {
            userId: sessionStorage.getItem("user_id"),
          }
        );
        if (result.success) {
          this.prescriptions = result.data;
          console.log("prescriptions", result.data);
        } else {
          this.snackbarMessage = "Failed to load prescriptions";
          this.snackbar = true;
          this.snackbarColor = "error";
        }
      } catch (error) {
        console.error("Error loading prescription:", error);
        this.snackbarMessage = "Failed to load prescriptions";
        this.snackbar = true;
        this.snackbarColor = "error";
      }
    },

    async loadProfile() {
      try {
        const result = await this.$store.dispatch("EndUser/fetchProfile", {
          userId: sessionStorage.getItem("user_id"),
        });
        if (result.success) {
          this.user = result.data;
          console.log("profile", result.data);
        } else {
          this.snackbarMessage = "Failed to load profile";
          this.snackbar = true;
          this.snackbarColor = "error";
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        this.snackbarMessage = "Failed to load profile";
        this.snackbar = true;
        this.snackbarColor = "error";
      }
    },

    async handleDelete(prescriptionId) {
      const userId = sessionStorage.getItem("user_id");
      if (!userId) {
        this.snackbarMessage = "User not logged in";
        this.snackbar = true;
        this.snackbarColor = "error";
        return;
      }

      console.log("deleteing prescription with id:", prescriptionId);

      try {
        const result = await this.$store.dispatch(
          "EndUser/deletePrescriptionByUser",
          {
            userId,
            prescriptionId,
          }
        );

        if (result.success) {
          this.snackbarMessage = "Prescription deleted successfully";
          this.snackbarColor = "success";
          this.snackbar = true;
          await this.loadPrescriptions(); // refresh the list
        } else {
          this.snackbarMessage = result.error;
          this.snackbarColor = "error";
          this.snackbar = true;
        }
      } catch (err) {
        console.error("Deletion error:", err);
        this.snackbarMessage = "Error deleting prescription";
        this.snackbarColor = "error";
        this.snackbar = true;
      }
    },

    toggleEdit() {
      if (this.isEditing) {
        this.saveChanges();
      }
      this.isEditing = !this.isEditing;
    },
    saveChanges() {
      // Implement save logic here
      console.log("Saving user details:", this.user);
    },

    async logout() {
      try {
        const confirmation = confirm("Want to logout ?");
        if (!confirmation) return;
        const result = await this.$store.dispatch("logoutUser");
        if (result) {
          this.$router.push("/"); // Or wherever your login route is
        }
      } catch (error) {
        console.log("logout failed:", error);
      }
    },
  },
  mounted() {
    this.loadOrders();
    this.loadPrescriptions();
    this.loadProfile();
    const sectionFromQuery = this.$route.query.section;
    if (sectionFromQuery) {
      this.currentSection = sectionFromQuery;
    }
  },
  watch: {
     currentSection(newVal) {
    // Handle logout
    if (newVal === "logout") {
      console.log("Logging out...");
      // Place actual logout logic here if needed
      this.logout(); // assuming you have a logout method
      return;
    }

    // Sync query param with current section
    this.$router.replace({ query: { section: newVal } });
  }
    
  },
};
</script>

<style scoped>
.dialog-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

.prescription-dialog-image {
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

.store-name {
  display: flex;
  align-items: center;
  color: #03045e;
  font-weight: 500;
  font-size: 0.875rem;
  margin: 4px 0 0;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.item-image {
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background: #f8f9fa;
  height: 60px;
  width: 50px;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.item-quantity {
  font-size: 0.875rem;
  color: #666;
}

.main-container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.navbar {
  width: 100%;
  height: 70px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 70px;
  box-shadow: 0 15px 40px -20px rgba(40, 44, 63, 0.15);
}

.left-nav,
.right-nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo {
  color: #03045e;
  font-size: 1.8rem;
  margin: 0;
}

.logo-link {
  text-decoration: none;
  color: inherit;
}

.nav-txt {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #03045e;
  font-weight: 500;
}

.dashboard-container {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.sidebar {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 20px;
  padding: 24px;
  height: calc(100vh - 118px);
  position: sticky;
  top: 94px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.user-profile {
  text-align: center;
  padding: 24px 0;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 24px;
}

.user-name {
  margin: 16px 0 4px;
  color: #1a1a1a;
  font-weight: 600;
}

.user-email {
  color: #666;
  font-size: 0.875rem;
  margin: 0;
}

.nav-menu {
  margin-top: 16px;
}

.menu-item {
  margin: 8px 0;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.logout {
  background-color: red;
  color: white;
  font-weight: 600;
  height: 50px;
  width: 235px;
  margin-top: 60px;
  border-radius: 10px;
}

.menu-item:hover {
  background: rgba(3, 4, 94, 0.05);
}

.menu-item.active {
  background: rgba(3, 4, 94, 0.1);
  color: #03045e;
}

.content-area {
  background: white;
  border-radius: 20px;
  padding: 24px;
  min-height: calc(100vh - 118px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.action-btn {
  border-radius: 12px;
  text-transform: none;
  font-weight: 600;
  padding: 0 24px;
  height: 48px;
}

.details-form {
  max-width: 800px;
}

.input-field {
  margin-bottom: 16px;
}

.input-field :deep(.v-field) {
  border-radius: 12px;
  background: #fafafa;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
}

.input-field :deep(.v-field--focused) {
  border-color: #03045e;
  background: white;
  box-shadow: 0 0 0 3px rgba(3, 4, 94, 0.1);
}

.prescriptions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  padding: 16px 0;
}

.prescription-card {
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease;
  border: 1px solid #e0e0e0;
}

.prescription-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.prescription-image {
  border-bottom: 1px solid #e0e0e0;
}

.prescription-date {
  font-size: 0.875rem;
  color: #666;
  margin: 0;
}

.prescription-doctor {
  font-weight: 600;
  color: #1a1a1a;
  margin: 4px 0 0;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.order-card {
  border-radius: 16px;
  border: 1px solid #e0e0e0;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.order-id {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.order-date {
  font-size: 0.875rem;
  color: #666;
  margin: 4px 0 0;
}

.status-chip {
  border-radius: 20px;
  text-transform: none;
  font-weight: 600;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.item-name {
  flex: 1;
  font-weight: 500;
}

.item-quantity {
  color: #666;
  margin: 0 16px;
}

.item-price {
  font-weight: 600;
  color: #03045e;
}

.order-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}

.total-price {
  font-size: 1.25rem;
  color: #03045e;
}

.empty-state {
  text-align: center;
  padding: 48px 0;
  color: #666;
}

.empty-state h3 {
  margin: 16px 0 8px;
  font-size: 1.5rem;
  color: #1a1a1a;
}

.empty-state p {
  margin: 0;
  color: #666;
}

@media (max-width: 1024px) {
  .dashboard-container {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
    height: auto;
  }

  .navbar {
    padding: 0 24px;
  }
}
</style>