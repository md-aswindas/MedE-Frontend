<template>
  <div class="container">
    <div class="left-side" >
      <!-- Nav Bar -->
      <h2>Med E</h2>
      <div class="nav-content">
        <div class="list" @click="home" tabindex="0">
          <p>Home</p>
        </div>
        <div class="list" @click="store" tabindex="0">
          <p>Manage Store</p>
        </div>
        <div class="list">
          <p>Manage Users</p>
        </div>
        <div class="list">
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
          <h3> Stores &nbsp;<span
              style="
                background-color: greenyellow;
                border-radius: 50px;
                padding: 1px 7px 1px 7px;
                
                color: black;
                font-size: 18px;
              "
              >01</span
            >&nbsp;</h3>
            <input type="search" name="search" id="" class="search" placeholder="Search Store">
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
              >01</span
            >
            &nbsp; Pending Requests
          </h3>
          
          <div class="request store-request" >
            <div class="status-card store-card">
              <p>Store Name</p>
              <p>License Number</p>
              <p>Created_date</p>
              <button type="button" class="btn dwn">
                <v-icon>mdi-eye</v-icon>
              </button>
              <button type="button" class="btn acpt">Accept</button>
              <button type="button" class="btn rjct">Reject</button>
            </div>
            <div class="status-card store-card">
              <p>Store Name</p>
              <p>License Number</p>
              <p>Created_date</p>
              <button type="button" class="btn dwn">
                <v-icon>mdi-eye</v-icon>
              </button>
              <button type="button" class="btn acpt">Accept</button>
              <button type="button" class="btn rjct">Reject</button>
            </div>
            <div class="status-card store-card">
              <p>Store Name</p>
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
        <div class="div3">3</div>
        <div class="div4">4</div>
        <div class="div6">
          <h3>FeedBacks</h3> 
        </div>
        <div class="div7">
          <h3>Top Rated Stores</h3> 
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isVisibleHome: true,
      isVisibleStore: false,
    };
  },
  methods: {
    scroll(x, y) {
      this.$refs.status.scrollBy({ left: x, top: y, behavior: "smooth" });
    },
    home() {
      this.isVisibleHome = true;
      this.isVisibleStore = false;
    },
    store() {
      this.isVisibleStore = true;
      this.isVisibleHome = false;
    },
  },
};
</script>
<style scoped>
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
  top: 133px;
  height: 50px;
  width: 50px;
  border-top-left-radius: 20px;
  box-shadow: -15px -15px 0 8px #000000;
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
.store-request{
  flex-wrap: wrap;
  overflow-y: auto;
  height: 170px;
  margin-top: 15px;
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
    border-radius:20px ;
    background-color: #212121;
    padding: 20px 20px 20px 30px;
    color: rgb(175, 175, 175);
}
.search{
  margin-top: 30px;
  width: 100%;
  height: 50px;
  padding-left: 30px ;
  border: 1px solid rgb(175, 175, 175);
  border-radius: 50px;
}

.div2 {
    grid-column: span 3 / span 3;
    grid-row: span 2 / span 2;
    border-radius:20px ;
    background-color: #212121;
    padding: 30px;
    color: rgb(175, 175, 175);
}
.store-card{
  width: 99%;
  margin-bottom: 10px;
}

.div3 {
    grid-column-start: 2;
    grid-row-start: 3;
    border-radius:20px ;
    background-color: #212121;
}

.div4 {
    grid-column-start: 3;
    grid-row-start: 3;
    border-radius:20px ;
    background-color: #212121;
}

.div6 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 2;
    grid-row-start: 4;
    border-radius:20px ;
    background-color: #212121;
    padding: 20px 20px 20px 30px;
    color: rgb(175, 175, 175);
}

.div7 {
    grid-row: span 3 / span 3;
    grid-column-start: 4;
    grid-row-start: 3;
    border-radius:20px ;
    background-color: #212121;
    color: rgb(175, 175, 175);
    padding: 20px 20px 20px 30px;
}
        
</style>