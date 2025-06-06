<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <!-- Enhanced Sidebar -->
      <v-col cols="12" md="3" class="sidebar">
        <div class="sidebar-header">
          <v-avatar size="64" class="mb-3" color="primary">
            <v-icon size="32" color="white">mdi-account</v-icon>
          </v-avatar>
          <h3 class="text-h6 font-weight-medium">{{ user.username }}</h3>
          <p class="text-caption text-grey-darken-1">User Dashboard</p>
        </div>
        
        <v-divider class="my-4"></v-divider>
        
        <v-list nav class="sidebar-nav">
          <v-list-item
            v-for="(item, index) in sidebarItems"
            :key="index"
            @click="activeItem = item.title"
            :class="{ 'active-nav-item': activeItem === item.title }"
            class="nav-item"
            rounded="lg"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon" size="20"></v-icon>
            </template>
            <v-list-item-title class="font-weight-medium">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>

      <!-- Enhanced Main Content -->
      <v-col cols="12" md="9" class="main-content">
        <!-- Profile Section -->
        <v-card v-if="activeItem === 'Profile'" elevation="3" class="profile-card">
          <v-card-title class="card-header">
            <div class="d-flex align-center">
              <v-icon class="mr-3" color="primary">mdi-account-circle</v-icon>
              <span class="text-h5 font-weight-bold">My Profile</span>
            </div>
          </v-card-title>
          
          <v-divider></v-divider>
          
          <v-card-text class="pa-8">
            <v-row dense>
              <v-col cols="12" md="6">
                <v-text-field 
                  label="Username" 
                  :model-value="user.username" 
                  readonly
                  variant="outlined"
                  prepend-inner-icon="mdi-account"
                  class="input-field"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field 
                  label="Password" 
                  :model-value="'••••••••'" 
                  readonly
                  variant="outlined"
                  prepend-inner-icon="mdi-lock"
                  class="input-field"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field 
                  label="Phone Number" 
                  :model-value="user.phone" 
                  readonly
                  variant="outlined"
                  prepend-inner-icon="mdi-phone"
                  class="input-field"
                />
              </v-col>

              <v-col cols="12" md="6" class="d-flex align-end">
                <v-btn 
                  :color="isEditing ? 'success' : 'primary'" 
                  :variant="isEditing ? 'elevated' : 'outlined'"
                  @click="isEditing ? saveChanges() : (isEditing = true)"
                  size="large"
                  class="edit-btn"
                >
                  <v-icon class="mr-2">{{ isEditing ? 'mdi-content-save' : 'mdi-pencil' }}</v-icon>
                  {{ isEditing ? 'Save Changes' : 'Edit Profile' }}
                </v-btn>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  label="Address"
                  :readonly="!isEditing"
                  v-model="user.address"
                  variant="outlined"
                  rows="3"
                  prepend-inner-icon="mdi-home"
                  class="input-field"
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Location"
                  :readonly="!isEditing"
                  v-model="user.location"
                  variant="outlined"
                  prepend-inner-icon="mdi-map-marker"
                  class="input-field"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Orders Section -->
        <v-card v-else-if="activeItem === 'Your Orders'" class="content-card" elevation="3">
          <v-card-title class="card-header">
            <div class="d-flex align-center">
              <v-icon class="mr-3" color="primary">mdi-package-variant</v-icon>
              <span class="text-h5 font-weight-bold">Your Orders</span>
            </div>
          </v-card-title>
          
          <v-divider></v-divider>
          
          <v-card-text class="pa-8">
            <div class="empty-state">
              <v-icon size="64" color="grey-lighten-1">mdi-package-variant-closed</v-icon>
              <h3 class="text-h6 mt-4 mb-2">No Orders Yet</h3>
              <p class="text-body-2 text-grey-darken-1">Your order history will appear here once you make your first purchase.</p>
              <v-btn color="primary" variant="elevated" class="mt-4">
                Start Shopping
              </v-btn>
            </div>
          </v-card-text>
        </v-card>

        <!-- Prescription Section -->
        <v-card v-else-if="activeItem === 'List Prescription'" class="content-card" elevation="3">
          <v-card-title class="card-header">
            <div class="d-flex align-center">
              <v-icon class="mr-3" color="primary">mdi-prescription</v-icon>
              <span class="text-h5 font-weight-bold">List Prescription</span>
            </div>
          </v-card-title>
          
          <v-divider></v-divider>
          
          <v-card-text class="pa-8">
            <div class="empty-state">
              <v-icon size="64" color="grey-lighten-1">mdi-prescription</v-icon>
              <h3 class="text-h6 mt-4 mb-2">No Prescriptions</h3>
              <p class="text-body-2 text-grey-darken-1">Upload your prescriptions to manage them digitally.</p>
              <v-btn color="primary" variant="elevated" class="mt-4">
                <v-icon class="mr-2">mdi-plus</v-icon>
                Add Prescription
              </v-btn>
            </div>
          </v-card-text>
        </v-card>

        <!-- Logout Confirmation -->
        <v-card v-else-if="activeItem === 'Logout'" class="content-card" elevation="3">
          <v-card-title class="card-header">
            <div class="d-flex align-center">
              <v-icon class="mr-3" color="error">mdi-logout</v-icon>
              <span class="text-h5 font-weight-bold">Logout</span>
            </div>
          </v-card-title>
          
          <v-divider></v-divider>
          
          <v-card-text class="pa-8">
            <div class="text-center">
              <v-icon size="64" color="warning">mdi-logout-variant</v-icon>
              <h3 class="text-h6 mt-4 mb-2">Are you sure you want to logout?</h3>
              <p class="text-body-2 text-grey-darken-1 mb-6">You will need to login again to access your account.</p>
              <div class="d-flex justify-center gap-4">
                <v-btn color="error" variant="elevated" @click="confirmLogout">
                  Yes, Logout
                </v-btn>
                <v-btn color="primary" variant="outlined" @click="activeItem = 'Profile'">
                  Cancel
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "UserProfilePage",
  data() {
    return {
      activeItem: "Profile",
      isEditing: false,
      sidebarItems: [
        { title: "Profile", icon: "mdi-account-circle" },
        { title: "Your Orders", icon: "mdi-package-variant" },
        { title: "List Prescription", icon: "mdi-prescription" },
        { title: "Logout", icon: "mdi-logout" },
      ],
      user: {
        username: "johndoe",
        password: "secret123",
        phone: "+91-9876543210",
        address: "123, ABC Street, New Delhi",
        location: "New Delhi, India",
      },
    };
  },
  methods: {
    saveChanges() {
      console.log("Address:", this.user.address);
      console.log("Location:", this.user.location);
      this.isEditing = false;
      // Show success message
      this.$emit('showMessage', 'Profile updated successfully!');
    },
    confirmLogout() {
      console.log("Logging out...");
      // Handle logout logic here
    },
  },
};
</script>

<style scoped>
.container {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  padding: 20px !important;
}

.sidebar {
  background: white;
  border-radius: 20px;
  padding: 24px;
  height: calc(100vh - 40px);
  position: sticky;
  top: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  text-align: center;
  padding: 16px 0;
}

.nav-item {
  margin: 8px 0;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.nav-item:hover {
  background: rgba(3, 4, 94, 0.05);
  border-color: rgba(3, 4, 94, 0.1);
}

.active-nav-item {
  background: rgba(3, 4, 94, 0.1) !important;
  border-color: #03045e !important;
  color: #03045e;
}

.main-content {
  padding: 0 24px !important;
}

.profile-card,
.content-card {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
  border: 1px solid #e0e0e0;
}

.card-header {
  background: white;
  padding: 24px !important;
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

.input-field :deep(.v-field__input) {
  padding: 8px 12px;
}

.edit-btn {
  width: 100%;
  height: 48px;
  border-radius: 12px;
  text-transform: none;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 48px 0;
}

.empty-state .v-btn {
  border-radius: 12px;
  text-transform: none;
  font-weight: 600;
  padding: 0 24px;
  height: 48px;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .sidebar {
    height: auto;
    position: static;
    margin-bottom: 20px;
  }

  .main-content {
    padding: 0 !important;
  }
}
</style>