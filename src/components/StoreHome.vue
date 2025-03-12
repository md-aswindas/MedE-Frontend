<template>
  <div class="container">
    <div class="blur">
      <div class="sidebar">
        <h2>Med E</h2>
        <div class="sidebar-content">
          <h4 @click="orders" tabindex="0">
            <v-icon>mdi-cart-outline</v-icon>&nbsp; Orders
          </h4>
          <h4 @click="products" tabindex="0">
            <v-icon>mdi-shopping-outline</v-icon>&nbsp; Products
          </h4>
          <h4><v-icon>mdi-movie-outline</v-icon>&nbsp; Ads</h4>
          <h4><v-icon>mdi-comment-quote-outline</v-icon>&nbsp; FeedBack</h4>
          <h4><v-icon>mdi-note-outline</v-icon>&nbsp; Prescription List</h4>
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
              <div class="nav-item">
                <v-icon size="2rem">mdi-magnify</v-icon>
              </div>
              <div class="nav-item">
                <img src="" alt="" />
              </div>
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
          <button class="add-btn">
            <v-icon>mdi-plus</v-icon>&nbsp; Add Products
          </button>
        </div>
        <div class="product-content">
          <div class="product-card">
            <img src="" alt="" style="width: 90px; height: 90px" />
            <div class="name">
              <h2>Product 1</h2>
              <h4>stock : 100</h4>
            </div>
            <p>category</p>
            <p>expiry date</p>
            <p>offer price</p>
            <p>Actual price</p>
            <p>offer percentage</p>
            <div class="product-btns">
              <button class="p-btn update">
                <v-icon>mdi-update</v-icon>&nbsp; Update
              </button>
              <button class="p-btn delete">
                <v-icon>mdi-trash-can-outline</v-icon>&nbsp; Delete
              </button>
            </div>
          </div>
          <div class="product-card">
            <img src="" alt="" style="width: 90px; height: 90px" />
            <div class="name">
              <h2>Product 1</h2>
              <h4>stock : 100</h4>
            </div>
            <p>category</p>
            <p>expiry date</p>
            <p>offer price</p>
            <p>Actual price</p>
            <p>offer percentage</p>
            <div class="product-btns">
              <button class="p-btn update">
                <v-icon>mdi-update</v-icon>&nbsp; Update
              </button>
              <button class="p-btn delete">
                <v-icon>mdi-trash-can-outline</v-icon>&nbsp; Delete
              </button>
            </div>
          </div>
          <div class="product-card">
            <img src="" alt="" style="width: 90px; height: 90px" />
            <div class="name">
              <h2>Product 1</h2>
              <h4>stock : 100</h4>
            </div>
            <p>category</p>
            <p>expiry date</p>
            <p>offer price</p>
            <p>Actual price</p>
            <p>offer percentage</p>
            <div class="product-btns">
              <button class="p-btn update">
                <v-icon>mdi-update</v-icon>&nbsp; Update
              </button>
              <button class="p-btn delete">
                <v-icon>mdi-trash-can-outline</v-icon>&nbsp; Delete
              </button>
            </div>
          </div>
          <div class="product-card">
            <img src="" alt="" style="width: 90px; height: 90px" />
            <div class="name">
              <h2>Product 1</h2>
              <h4>stock : 100</h4>
            </div>
            <p>category</p>
            <p>expiry date</p>
            <p>offer price</p>
            <p>Actual price</p>
            <p>offer percentage</p>
            <div class="product-btns">
              <button class="p-btn update">
                <v-icon>mdi-update</v-icon>&nbsp; Update
              </button>
              <button class="p-btn delete">
                <v-icon>mdi-trash-can-outline</v-icon>&nbsp; Delete
              </button>
            </div>
          </div>
          
          <div class="product-card">
            <img src="" alt="" style="width: 90px; height: 90px" />
            <div class="name">
              <h2>Product 1</h2>
              <h4>stock : 100</h4>
            </div>
            <p>category</p>
            <p>expiry date</p>
            <p>offer price</p>
            <p>Actual price</p>
            <p>offer percentage</p>
            <div class="product-btns">
              <button class="p-btn update">
                <v-icon>mdi-update</v-icon>&nbsp; Update
              </button>
              <button class="p-btn delete">
                <v-icon>mdi-trash-can-outline</v-icon>&nbsp; Delete
              </button>
            </div>
          </div>
          <div class="product-card">
            <img src="" alt="" style="width: 90px; height: 90px" />
            <div class="name">
              <h2>Product 1</h2>
              <h4>stock : 100</h4>
            </div>
            <p>category</p>
            <p>expiry date</p>
            <p>offer price</p>
            <p>Actual price</p>
            <p>offer percentage</p>
            <div class="product-btns">
              <button class="p-btn update">
                <v-icon>mdi-update</v-icon>&nbsp; Update
              </button>
              <button class="p-btn delete">
                <v-icon>mdi-trash-can-outline</v-icon>&nbsp; Delete
              </button>
            </div>
          </div>
          <div class="product-card">
            <img src="" alt="" style="width: 90px; height: 90px" />
            <div class="name">
              <h2>Product 1</h2>
              <h4>stock : 100</h4>
            </div>
            <p>category</p>
            <p>expiry date</p>
            <p>offer price</p>
            <p>Actual price</p>
            <p>offer percentage</p>
            <div class="product-btns">
              <button class="p-btn update">
                <v-icon>mdi-update</v-icon>&nbsp; Update
              </button>
              <button class="p-btn delete">
                <v-icon>mdi-trash-can-outline</v-icon>&nbsp; Delete
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statusActive: false,
      statusPending: false,
      statusReject: true,

      orderIsVisible: true,
      productIsVisible: false,
    };
  },
  methods: {
    products() {
      this.orderIsVisible = false;
      this.productIsVisible = true;
    },
    orders() {
      this.orderIsVisible = true;
      this.productIsVisible = false;
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
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.nav-item {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
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
.product-content{
  width: 100%;
  height: 662px;
  /* background-color: aquamarine; */
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
}
.product-content::-webkit-scrollbar{
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
  background: rgba(255, 255, 255, 0.514);
  backdrop-filter: blur(10px);
}
.add-btn {
  height: 40px;
  width: 150px;
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
</style>
