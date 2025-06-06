<template>
  <div class="container">
    <div class="left-side">
      <!-- Nav Bar -->
      <h2>Med E</h2>
      <div class="nav-content">
        <div class="list" @click="home" tabindex="0">
          <p>Home</p>
        </div>
        <div class="list" @click="store" tabindex="0">
          <p>Manage Store</p>
        </div>
        <div class="list" @click="userss" tabindex="0">
          <p>Manage Users</p>
        </div>
        <div class="list" @click="analytics" tabindex="0">
          <p>Analytics</p>
        </div>
      </div>
    </div>

    <div class="home" v-if="isVisibleHome" ref="Home">
      <!-- Home -->
      <div class="home-left">
        <div class="profile-top">
          <div class="profile">
            <p class="img"></p>
          </div>
          <div class="txt"></div>
        </div>
      </div>
      <div class="home-right">
        <div class="status-pending">
          <h3>
            <span
              style="
                background-color: greenyellow;
                border-radius: 50px;
                padding: 1px 7px 1px 7px;
                color: black;
              "
              >01</span
            >
            &nbsp; Pending Requests
          </h3>
          <div class="s-btn">
            <v-icon id="slide-icon-left" class="slide" @click="scroll(-962, 0)"
              >mdi-arrow-left-circle-outline</v-icon
            >
            <v-icon id="slide-icon-right" class="slide" @click="scroll(962, 0)"
              >mdi-arrow-right-circle-outline</v-icon
            >
          </div>
          <div class="request" ref="status">
            <div class="status-card">
              <p>Store Name</p>
              <p>License Number</p>
              <p>Created_date</p>
              <button type="button" class="btn dwn">
                <v-icon>mdi-eye</v-icon>
              </button>
              <button type="button" class="btn acpt">Accept</button>
              <button type="button" class="btn rjct">Reject</button>
            </div>
            <div class="status-card">
              <p>Store Name 1</p>
              <p>License Number</p>
              <p>Created_date</p>
              <button type="button" class="btn dwn">
                <v-icon>mdi-eye</v-icon>
              </button>
              <button type="button" class="btn acpt">Accept</button>
              <button type="button" class="btn rjct">Reject</button>
            </div>
            <div class="status-card">
              <p>Store Name 2</p>
              <p>License Number</p>
              <p>Created_date</p>
              <button type="button" class="btn dwn">
                <v-icon>mdi-eye</v-icon>
              </button>
              <button type="button" class="btn acpt">Accept</button>
              <button type="button" class="btn rjct">Reject</button>
            </div>
          </div>
        </div>

        <div class="count">
          <div class="count-card">
            <h4>Total Users</h4>
            <div class="num">
              <h1>
                <v-icon class="num-icon" size="2.5rem"
                  >mdi-account-check</v-icon
                >
                1000
              </h1>
            </div>
          </div>
          <div class="count-card">
            <h4>Total Stores</h4>
            <div class="num">
              <h1>
                <v-icon class="num-icon" size="2.2rem" style="margin-top: 5px"
                  >mdi-storefront
                </v-icon>
                1000
              </h1>
            </div>
          </div>
          <div class="count-card">
            <h4>Total Transction Amount</h4>
            <div class="num">
              <h1>₹ 100000</h1>
            </div>
          </div>
        </div>
        <div class="top-product">
          <div class="top-p">
            <h4>Top Selling Products</h4>
            <div class="box">
              <div class="box-item"></div>
              <div class="box-item"></div>
            </div>
          </div>
          <div class="top-p">
            <h4>Top Rated Stores</h4>
            <div class="box">
              <div class="box-item">
                <h4
                  style="
                    background-color: black;
                    height: 55px;
                    width: 55px;
                    border-radius: 50%;
                  "
                ></h4>
                <h4>Store Name</h4>
                <h4>
                  <v-icon size="1rem" class="star">mdi-star-circle</v-icon> 4.5
                </h4>
                <h4>created</h4>
                <h4>Location</h4>
              </div>
              <div class="box-item">
                <h4
                  style="
                    background-color: black;
                    height: 55px;
                    width: 55px;
                    border-radius: 50%;
                  "
                ></h4>
                <h4>Store Name</h4>
                <h4>
                  <v-icon size="1rem" class="star">mdi-star-circle</v-icon> 4.5
                </h4>
                <h4>created</h4>
                <h4>Location</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
                <button type="button" class="btn dwn">
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
              1000
            </h1>
          </div>
        </div>

        <div class="div6">
          <h3>FeedBacks</h3>
          

            <div class="feedback-content">

              <div class="feedback-card" v-for="feedback in feedbacks" :key="feedback.id">
                <div class="user-info">
                  <p class="user-id">userId  :  {{feedback.user_id}}</p>
                </div>
                
                <div class="feedback-details">
                  <p class="feedback-comment" style="font-weight: 600;">storeId : {{feedback.store_id}}</p>
                  <v-rating
                    v-model="feedback.rating"
                    readonly
                    half-increments
                    size="small"
                    color="#ffa534"
                    density="compact"
                  ></v-rating>
                  <p class="feedback-comment">comment</p>
                </div>
              </div>

              
              

            </div>
            
          
        </div>

        <div class="div7">
          <h3>Top Rated Stores</h3>
          <div class="store-card">
            <div class="store-info">
              <div class="store-name">MedStore Plus</div>
              <div class="store-date">Created: 2024-01-20</div>
            </div>
            <div class="store-rating">
              <v-rating
                v-model="rating"
                readonly
                half-increments
                size="small"
                color="yellow"
                density="compact"
              ></v-rating>
              <div class="rating-value">4.5</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- User -->

    <div class="users" v-if="isVisibleUsers" ref="users">
      <div class="users-grid">
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
              class="user-card"
              @click="selectUser(user)"
              :class="{ active: selectedUser?.id === user.id }"
            >
              <div class="user-avatar">
                <v-icon size="40">mdi-account-circle</v-icon>
              </div>
              <div class="user-info">
                <h4>{{ user.name }}</h4>
                <p>{{ user.email }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="user-details">
          <div class="user-stats">
            <div class="stat-card">
              <h4>Total Prescriptions</h4>
              <div class="stat-value">
                <v-icon class="stat-icon">mdi-file-document-multiple</v-icon>
                <span>{{ selectedUser?.prescriptions?.length || 0 }}</span>
              </div>
            </div>
            <div class="stat-card">
              <h4>Last Order</h4>
              <div class="stat-value">
                <v-icon class="stat-icon">mdi-calendar</v-icon>
                <span>{{ selectedUser?.lastOrder || "N/A" }}</span>
              </div>
            </div>
          </div>

          <div class="prescriptions-list" v-if="selectedUser">
            <h3>Prescriptions History</h3>
            <div
              class="prescription-card"
              v-for="prescription in selectedUser.prescriptions"
              :key="prescription.id"
            >
              <div class="prescription-header">
                <span class="date">{{ prescription.date }}</span>
                <span class="status" :class="prescription.status">{{
                  prescription.status
                }}</span>
              </div>
              <div class="prescription-content">
                <p><strong>Doctor:</strong> {{ prescription.doctor }}</p>
                <p>
                  <strong>Medicines:</strong>
                  {{ prescription.medicines.join(", ") }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="user-chart">
          <h3>User Activity</h3>
          <canvas ref="userChart"></canvas>
        </div>
      </div>
    </div>
    <!-- Analytics  -->

    <div class="Analytics store" v-if="isVisibleAnalytics" ref="analytics">
      <div class="Analytics-parent">
        <div class="div9">9</div>
        <div class="div10">10</div>
        <div class="div11">11</div>
        <div class="div12">12</div>
        <div class="div13">13</div>
        <div class="div15">15</div>
        <div class="div16">
          <v-date-picker width="100%" height="100%"></v-date-picker>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js/auto";
export default {
  data() {
    return {
      isVisibleHome: true,
      isVisibleStore: false,
      isVisibleAnalytics: false,
      rating: 4.5,
      feedbacks: [],
      ads: [],
      isVisibleUsers: false,
      userSearch: "",
      users: [], // Will be populated with user data
      pendingStores: [],
      stores: [],
      StoreCount: 0,
      selectedUser: null,
      userChart: null,
      pendingStoreCount: 0,
    };
  },
  methods: {
    async updateStoreStatus(store_id, statusId) {
      if (!store_id) {
        this.snackbarMessage = "Store ID is missing.";
        this.snackbar = true;
        this.snackbarColor = "error";
        return;
      }

      const result = await this.$store.dispatch("Admin/acceptStore", {
        store_id: store_id, // <-- use snake_case, exactly like in Vuex action
        status_id: statusId,
      });

      if (result.success) {
        this.snackbarMessage = "Store status updated successfully.";
        this.snackbar = true;
        this.snackbarColor = "success";
        // Optionally, refresh the list here
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
          // Check scroll indicators after loading
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
          // Check scroll indicators after loading
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
          // this.StoreCount = result.data.length;
          // Check scroll indicators after loading
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
          // this.StoreCount = result.data.length;
          // Check scroll indicators after loading
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

    scroll(x, y) {
      this.$refs.status.scrollBy({ left: x, top: y, behavior: "smooth" });
    },
    home() {
      this.isVisibleHome = true;
      this.isVisibleStore = false;
      this.isVisibleAnalytics = false;
      this.isVisibleUsers = false;
    },
    store() {
      this.isVisibleStore = true;
      this.isVisibleHome = false;
      this.isVisibleAnalytics = false;
      this.isVisibleUsers = false;
    },
    analytics() {
      this.isVisibleStore = false;
      this.isVisibleHome = false;
      this.isVisibleAnalytics = true;
      this.isVisibleUsers = false;
    },
    userss() {
      this.isVisibleUsers = true;
      this.isVisibleStore = false;
      this.isVisibleHome = false;
      this.isVisibleAnalytics = false;
    },
    selectUser(user) {
      this.selectedUser = user;
      this.updateUserChart();
    },
    updateUserChart() {
      if (this.userChart) {
        this.userChart.destroy();
      }

      const ctx = this.$refs.userChart.getContext("2d");
      this.userChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Orders",
              data: [12, 19, 3, 5, 2, 3],
              borderColor: "rgb(172, 255, 47)",
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: "white",
              },
            },
          },
          scales: {
            y: {
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
              ticks: {
                color: "white",
              },
            },
            x: {
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
              ticks: {
                color: "white",
              },
            },
          },
        },
      });
    },
  },
  mounted() {
    this.loadPendingStores();
    this.loadStores();
    this.loadAds();
    this.loadFeedBack();
  },
  computed: {
    filteredUsers() {
      return this.users.filter(
        (user) =>
          user.name.toLowerCase().includes(this.userSearch.toLowerCase()) ||
          user.email.toLowerCase().includes(this.userSearch.toLowerCase())
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
  height: calc(700px - 40px);
}

.users-list {
  background: #212121;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.count-badge {
  background-color: greenyellow;
  border-radius: 50px;
  padding: 1px 7px;
  color: black;
  font-size: 18px;
}

.users-container {
  flex: 1;
  overflow-y: auto;
  margin-top: 20px;
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
  height: 90px;
  width: 648px;
  margin-right: 20px;
  display: flex;
  justify-content: space-around;
  /* gap: 10px; */
  border: 1px solid rgba(172, 255, 47, 0.2);
  flex-shrink: 0;
  flex-grow: none;
}

.feedback-content::-webkit-scrollbar{
  display: none;
}

.feedback-content {
  max-height: calc(100% - 20px);
  overflow-x: auto;
  padding: 10px;
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
}

.feedback-details {
  display: flex;
  gap: 4px;
  justify-content: space-between;
  align-items: center;
  width: 70%;
}

.feedback-comment {
  color: rgb(175, 175, 175);
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
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
.list {
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
  );
  /* background-color: hsl(84, 100%, 47%); */
  color: black;
}

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
</style>
