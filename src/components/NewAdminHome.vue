<template>
  <div class="container">
    <!-- Sidebar Navigation -->
    <div class="sidebar">
      <div class="logo">
        <h2>Med E</h2>
      </div>
      <div class="nav-menu">
        <div 
          class="nav-item" 
          :class="{ active: activeSection === 'dashboard' }"
          @click="setActiveSection('dashboard')"
        >
          <v-icon>mdi-view-dashboard</v-icon>
          <span>Dashboard</span>
        </div>
        <div 
          class="nav-item" 
          :class="{ active: activeSection === 'stores' }"
          @click="setActiveSection('stores')"
        >
          <v-icon>mdi-store</v-icon>
          <span>Manage Stores</span>
        </div>
        <div 
          class="nav-item" 
          :class="{ active: activeSection === 'users' }"
          @click="setActiveSection('users')"
        >
          <v-icon>mdi-account-group</v-icon>
          <span>Manage Users</span>
        </div>
        <div 
          class="nav-item" 
          :class="{ active: activeSection === 'analytics' }"
          @click="setActiveSection('analytics')"
        >
          <v-icon>mdi-chart-bar</v-icon>
          <span>Analytics</span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Dashboard Section -->
      <div v-if="activeSection === 'dashboard'" class="dashboard">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <v-icon size="40" color="greenyellow">mdi-account-check</v-icon>
            </div>
            <div class="stat-info">
              <h3>Total Users</h3>
              <h2>1,234</h2>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <v-icon size="40" color="greenyellow">mdi-store</v-icon>
            </div>
            <div class="stat-info">
              <h3>Total Stores</h3>
              <h2>56</h2>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <v-icon size="40" color="greenyellow">mdi-currency-inr</v-icon>
            </div>
            <div class="stat-info">
              <h3>Total Revenue</h3>
              <h2>₹ 125,000</h2>
            </div>
          </div>
        </div>

        <div class="dashboard-grid">
          <div class="grid-item pending-requests">
            <div class="header">
              <h3>
                <span class="badge">01</span>
                Pending Requests
              </h3>
              <div class="actions">
                <v-icon @click="scrollRequests(-1)">mdi-chevron-left</v-icon>
                <v-icon @click="scrollRequests(1)">mdi-chevron-right</v-icon>
              </div>
            </div>
            <div class="requests-container" ref="requestsContainer">
              <div class="request-card" v-for="n in 3" :key="n">
                <div class="request-info">
                  <p class="store-name">Store {{ n }}</p>
                  <p class="license">LIC123{{ n }}</p>
                  <p class="date">2024-01-{{ n }}</p>
                </div>
                <div class="request-actions">
                  <v-btn icon small color="white">
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                  <v-btn small color="greenyellow" class="action-btn">Accept</v-btn>
                  <v-btn small color="error" class="action-btn">Reject</v-btn>
                </div>
              </div>
            </div>
          </div>

          <div class="grid-item top-products">
            <h3>Top Products</h3>
            <div class="products-grid">
              <div class="product-card" v-for="n in 4" :key="n">
                <div class="product-image"></div>
                <div class="product-info">
                  <h4>Product {{ n }}</h4>
                  <p>₹ {{ n }}99</p>
                </div>
              </div>
            </div>
          </div>

          <div class="grid-item top-stores">
            <h3>Top Rated Stores</h3>
            <div class="stores-list">
              <div class="store-card" v-for="n in 3" :key="n">
                <div class="store-image"></div>
                <div class="store-info">
                  <h4>Store {{ n }}</h4>
                  <div class="rating">
                    <v-icon small color="greenyellow">mdi-star</v-icon>
                    <span>{{ 4 + n/10 }}</span>
                  </div>
                  <p>Location {{ n }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="activeSection === 'stores'" class="stores-section">
  <div class="section-header">
    <h2>Manage Stores</h2>
    <div class="search-bar">
      <v-icon color="greenyellow">mdi-magnify</v-icon>
      <input type="text" v-model="storeSearch" placeholder="Search stores..." />
    </div>
  </div>

  <div class="stores-grid">
    <div class="stores-list-panel">
      <div class="panel-header">
        <h3>Store List <span class="count-badge">{{ stores.length }}</span></h3>
      </div>
      <div class="stores-list-container">
        <div 
          v-for="store in filteredStores" 
          :key="store.id"
          class="store-list-item"
          :class="{ 'active': selectedStore?.id === store.id }"
          @click="selectStore(store)"
        >
          <div class="store-avatar">
            <v-icon size="35">mdi-store</v-icon>
          </div>
          <div class="store-details">
            <h4>{{ store.name }}</h4>
            <p>License: {{ store.license }}</p>
          </div>
          <div class="store-status" :class="store.status">
            {{ store.status }}
          </div>
        </div>
      </div>
    </div>

    <div class="store-details-panel" v-if="selectedStore">
      <div class="panel-header">
        <h3>Store Details</h3>
        <div class="action-buttons">
          <v-btn small color="greenyellow" class="action-btn">Edit</v-btn>
          <v-btn small color="error" class="action-btn">Suspend</v-btn>
        </div>
      </div>
      <div class="details-content">
        <div class="detail-group">
          <label>Store Name</label>
          <p>{{ selectedStore.name }}</p>
        </div>
        <div class="detail-group">
          <label>License Number</label>
          <p>{{ selectedStore.license }}</p>
        </div>
        <div class="detail-group">
          <label>Status</label>
          <p :class="selectedStore.status">{{ selectedStore.status }}</p>
        </div>
        <div class="detail-group">
          <label>Rating</label>
          <div class="rating-display">
            <v-rating
              v-model="selectedStore.rating"
              readonly
              half-increments
              size="small"
              color="greenyellow"
            ></v-rating>
            <span>{{ selectedStore.rating }}/5</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Manage Users Section -->
<div v-if="activeSection === 'users'" class="users-section">
  <div class="section-header">
    <h2>Manage Users</h2>
    <div class="search-bar">
      <v-icon color="greenyellow">mdi-magnify</v-icon>
      <input type="text" v-model="userSearch" placeholder="Search users..." />
    </div>
  </div>

  <div class="users-grid">
    <div class="users-list-panel">
      <div class="panel-header">
        <h3>Users <span class="count-badge">{{ users.length }}</span></h3>
      </div>
      <div class="users-list-container">
        <div 
          v-for="user in filteredUsers" 
          :key="user.id"
          class="user-list-item"
          :class="{ 'active': selectedUser?.id === user.id }"
          @click="selectUser(user)"
        >
          <div class="user-avatar">
            <v-icon size="35">mdi-account-circle</v-icon>
          </div>
          <div class="user-details">
            <h4>{{ user.name }}</h4>
            <p>{{ user.email }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="user-details-panel" v-if="selectedUser">
      <div class="panel-header">
        <h3>User Details</h3>
      </div>
      <div class="details-content">
        <div class="user-stats-grid">
          <div class="stat-box">
            <v-icon color="greenyellow">mdi-cart</v-icon>
            <h4>Total Orders</h4>
            <p>{{ selectedUser.totalOrders }}</p>
          </div>
          <div class="stat-box">
            <v-icon color="greenyellow">mdi-file-document</v-icon>
            <h4>Prescriptions</h4>
            <p>{{ selectedUser.prescriptions.length }}</p>
          </div>
        </div>

        <div class="prescriptions-list">
          <h4>Recent Prescriptions</h4>
          <div 
            v-for="prescription in selectedUser.prescriptions" 
            :key="prescription.id"
            class="prescription-card"
          >
            <div class="prescription-header">
              <span class="date">{{ prescription.date }}</span>
              <span class="status" :class="prescription.status">{{ prescription.status }}</span>
            </div>
            <div class="prescription-details">
              <p><strong>Doctor:</strong> {{ prescription.doctor }}</p>
              <p><strong>Medicines:</strong> {{ prescription.medicines.join(', ') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Analytics Section -->
<div v-if="activeSection === 'analytics'" class="analytics-section">
  <div class="analytics-grid">
    <div class="chart-card full-width">
      <h3>Revenue Overview</h3>
      <canvas ref="revenueChart"></canvas>
    </div>

    <div class="chart-card">
      <h3>User Growth</h3>
      <canvas ref="userGrowthChart"></canvas>
    </div>

    <div class="chart-card">
      <h3>Popular Categories</h3>
      <canvas ref="categoriesChart"></canvas>
    </div>

    <div class="metrics-panel">
      <h3>Key Metrics</h3>
      <div class="metrics-grid">
        <div class="metric-card">
          <v-icon color="greenyellow" size="30">mdi-trending-up</v-icon>
          <div class="metric-info">
            <h4>Growth Rate</h4>
            <p>+25%</p>
          </div>
        </div>
        <div class="metric-card">
          <v-icon color="greenyellow" size="30">mdi-account-multiple</v-icon>
          <div class="metric-info">
            <h4>New Users</h4>
            <p>+156</p>
          </div>
        </div>
        <div class="metric-card">
          <v-icon color="greenyellow" size="30">mdi-store-check</v-icon>
          <div class="metric-info">
            <h4>Active Stores</h4>
            <p>45</p>
          </div>
        </div>
        <div class="metric-card">
          <v-icon color="greenyellow" size="30">mdi-cart-check</v-icon>
          <div class="metric-info">
            <h4>Orders</h4>
            <p>289</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { Chart } from 'chart.js/auto';
export default {
  name: 'NewAdminHome',
  data() {
    return {
       activeSection: 'dashboard',
      storeSearch: '',
      userSearch: '',
      stores: [], // Will be populated with store data
      users: [], // Will be populated with user data
      selectedStore: null,
      selectedUser: null,
      charts: {
        revenue: null,
        userGrowth: null,
        categories: null
      }
    };
  },
  computed: {
    filteredStores() {
      return this.stores.filter(store =>
        store.name.toLowerCase().includes(this.storeSearch.toLowerCase())
      );
    },
    filteredUsers() {
      return this.users.filter(user =>
        user.name.toLowerCase().includes(this.userSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(this.userSearch.toLowerCase())
      );
    }
  },
  methods: {
    setActiveSection(section) {
      this.activeSection = section;
    },
    scrollRequests(direction) {
      const container = this.$refs.requestsContainer;
      container.scrollBy({
        left: direction * 300,
        behavior: 'smooth'
      });
    },
    selectStore(store) {
      this.selectedStore = store;
    },
    selectUser(user) {
      this.selectedUser = user;
    },
    initCharts() {
      // Initialize charts when analytics section is active
      if (this.activeSection === 'analytics') {
        this.initRevenueChart();
        this.initUserGrowthChart();
        this.initCategoriesChart();
      }
    },
    initRevenueChart() {
      const ctx = this.$refs.revenueChart.getContext('2d');
      this.charts.revenue = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Revenue',
            data: [30000, 45000, 35000, 50000, 49000, 60000],
            borderColor: 'greenyellow',
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: 'white' }
            }
          },
          scales: {
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
              ticks: { color: 'white' }
            },
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
              ticks: { color: 'white' }
            }
          }
        }
      });
    }
  },
  watch: {
    activeSection(newSection) {
      if (newSection === 'analytics') {
        this.$nextTick(() => {
          this.initCharts();
        });
      }
    }
  }
};
</script>

<style scoped>
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #212121;
  border-radius: 10px;
  padding: 8px 15px;
  width: 300px;
  border: 1px solid rgba(172, 255, 47, 0.2);
}

.search-bar input {
  background: none;
  border: none;
  color: white;
  margin-left: 10px;
  width: 100%;
  outline: none;
}

.stores-grid,
.users-grid {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 20px;
  height: calc(100vh - 180px);
}

.stores-list-panel,
.users-list-panel,
.store-details-panel,
.user-details-panel {
  background: #212121;
  border-radius: 15px;
  border: 1px solid rgba(172, 255, 47, 0.2);
  overflow: hidden;
}

.panel-header {
  padding: 20px;
  border-bottom: 1px solid rgba(172, 255, 47, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stores-list-container,
.users-list-container {
  padding: 15px;
  height: calc(100% - 70px);
  overflow-y: auto;
}

.store-list-item,
.user-list-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(172, 255, 47, 0.1);
}

.store-list-item:hover,
.user-list-item:hover,
.store-list-item.active,
.user-list-item.active {
  background: rgba(172, 255, 47, 0.1);
  border-color: rgba(172, 255, 47, 0.3);
}

.store-avatar,
.user-avatar {
  color: greenyellow;
  margin-right: 15px;
}

.store-details,
.user-details {
  flex: 1;
}

.store-status {
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
}

.store-status.active {
  background: rgba(172, 255, 47, 0.2);
  color: greenyellow;
}

.store-status.pending {
  background: rgba(255, 165, 0, 0.2);
  color: orange;
}

.details-content {
  padding: 20px;
}

.detail-group {
  margin-bottom: 20px;
}

.detail-group label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 5px;
  display: block;
}

.rating-display {
  display: flex;
  align-items: center;
  gap: 10px;
}

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.chart-card {
  background: #212121;
  border-radius: 15px;
  padding: 20px;
  border: 1px solid rgba(172, 255, 47, 0.2);
  height: 300px;
}

.chart-card.full-width {
  grid-column: 1 / -1;
}

.metrics-panel {
  grid-column: 1 / -1;
  background: #212121;
  border-radius: 15px;
  padding: 20px;
  border: 1px solid rgba(172, 255, 47, 0.2);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.metric-card {
  background: rgba(33, 33, 33, 0.5);
  border-radius: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  border: 1px solid rgba(172, 255, 47, 0.1);
}

.metric-info h4 {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.metric-info p {
  margin: 5px 0 0;
  font-size: 1.2rem;
  color: greenyellow;
}

.user-stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 30px;
}

.stat-box {
  background: rgba(33, 33, 33, 0.5);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  border: 1px solid rgba(172, 255, 47, 0.1);
}

.stat-box h4 {
  margin: 10px 0;
  color: rgba(255, 255, 255, 0.7);
}

.stat-box p {
  margin: 0;
  font-size: 1.5rem;
  color: greenyellow;
}

.prescriptions-list {
  margin-top: 20px;
}

.prescription-card {
  background: rgba(33, 33, 33, 0.5);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid rgba(172, 255, 47, 0.1);
}

.prescription-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.prescription-header .status {
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 0.9rem;
}

.prescription-header .status.completed {
  background: rgba(172, 255, 47, 0.2);
  color: greenyellow;
}

.prescription-header .status.pending {
  background: rgba(255, 165, 0, 0.2);
  color: orange;
}
.container {
  display: flex;
  min-height: 100vh;
  background: black;
  color: white;
}

.sidebar {
  width: 250px;
  background: #212121;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.logo h2 {
  color: greenyellow;
  margin: 0;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-item:hover, .nav-item.active {
  background: rgba(172, 255, 47, 0.1);
  color: greenyellow;
}

.main-content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: #212121;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid rgba(172, 255, 47, 0.2);
}

.stat-info h3 {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.stat-info h2 {
  margin: 5px 0 0;
  color: greenyellow;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 20px;
}

.grid-item {
  background: #212121;
  border-radius: 15px;
  padding: 20px;
  border: 1px solid rgba(172, 255, 47, 0.2);
}

.pending-requests {
  grid-column: 1 / -1;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.badge {
  background: greenyellow;
  color: black;
  padding: 2px 8px;
  border-radius: 50px;
  font-size: 0.9rem;
  margin-right: 10px;
}

.actions {
  display: flex;
  gap: 10px;
}

.requests-container {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.request-card {
  min-width: 300px;
  background: rgba(33, 33, 33, 0.5);
  border-radius: 10px;
  padding: 15px;
  border: 1px solid rgba(172, 255, 47, 0.1);
}

.request-info p {
  margin: 5px 0;
}

.request-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.action-btn {
  text-transform: none;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 20px;
}

.product-card {
  background: rgba(33, 33, 33, 0.5);
  border-radius: 10px;
  overflow: hidden;
}

.product-image {
  height: 100px;
  background: #333;
}

.product-info {
  padding: 10px;
}

.product-info h4 {
  margin: 0;
  font-size: 1rem;
}

.product-info p {
  margin: 5px 0 0;
  color: greenyellow;
}

.stores-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.store-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  background: rgba(33, 33, 33, 0.5);
  border-radius: 10px;
  border: 1px solid rgba(172, 255, 47, 0.1);
}

.store-image {
  width: 50px;
  height: 50px;
  background: #333;
  border-radius: 50%;
}

.store-info h4 {
  margin: 0;
  font-size: 1rem;
}

.rating {
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 5px 0;
}

.store-info p {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}
</style>