<template>
  <div class="main-container">
    <div class="navbar">
      <div class="left-nav">
        <h1 class="logo">MedE</h1>
        <p
          class="nav-txt"
          style="width: 140px; cursor: pointer"
          @click="showlocation()"
        >
          <v-icon large color="#03045E" size="1.2rem" class="icon"
            >mdi-map-marker</v-icon
          >
          Find a store
        </p>
      </div>
      <div class="right-nav">
        <router-link
          to="/storeLogin"
          style="text-decoration: none; color: inherit; font-weight: 500"
        >
          <p class="nav-txt" style="width: 170px">
            <v-icon large color="#03045E" size="1.2rem" class="icon"
              >mdi-storefront-outline</v-icon
            >
            Become A Seller
          </p>
        </router-link>
        <router-link
          to="/userLogin"
          style="text-decoration: none; color: inherit; font-weight: 500"
        >
          <p
            class="nav-img"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              color: #03045e;
              padding: 7px;
              border-radius: 20px;
              width: 100px;
            "
          >
            <v-icon large color="#03045E" size="1.2rem" class="icon"
              >mdi-account-outline</v-icon
            >
            Sign In
          </p>
        </router-link>

        <p class="nav-txt">
          <v-icon large color="#03045E" size="1.2rem" class="icon"
            >mdi-cart-outline</v-icon
          >
          Cart
        </p>
      </div>
    </div>
    <div class="location-wide" v-if="locationVisible">
      <div class="location">
        <p @click="showlocation()" style="cursor: pointer">
          <v-icon size="32px">mdi-close</v-icon>
        </p>
        <button
          style="
            width: 430px;
            height: 50px;
            margin-top: 30px;
            background-color: #03045e;
            color: white;
            font-weight: 500;
            border-radius: 10px;
          "
          @click="useCurrentLocation()"
        >
          Use Current Location
        </button>
        <button
          style="
            width: 430px;
            height: 50px;
            margin-top: 20px;
            border: 1px solid #03045e;
            color: #03045e;
            font-weight: 500;
            border-radius: 10px;
          "
          @click="loadMap()"
        >
          Custom Location
        </button>
        <div
          class="map"
          ref="mapContainer"
          style="
            margin-top: 20px;
            width: 430px;
            height: 450px;
            /* border: 1px solid #03045e; */
            border-radius: 10px;
          "
          v-if="showMap"
        ></div>
        <button
          style="
            width: 430px;
            height: 50px;
            margin-top: 20px;
            background-color: #00dc0f;
            color: white;
            font-weight: 500;
            border-radius: 10px;
          "
          @click="nearbyStore()"
        >
          Save
        </button>
      </div>
    </div>
    <div class="searchbar">
      <input
        type="text"
        name="search"
        v-model="searchQuery"
        class="search"
        placeholder="Search Store"
        @input="searchStore()"
      />
      <v-icon large color="black" class="searchicon" size="35px"
        >mdi-magnify</v-icon
      >
    </div>
    <div class="headings" v-if="stores.length > 0">
      <span style="font-weight: 700">{{ stores.length }}</span> &nbsp; stores
      found!
    </div>
    <div class="search-products" v-if="stores.length > 0">
      <div class="card c1" v-for="store in stores" :key="store.id">
        <h2>{{ store.storeName }}</h2>
        <div class="c2">
          <h4
            style="
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            "
          >
            {{ store.address }}
          </h4>
          <v-rating
            readonly
            half-increments
            size="small"
            active-color="#ffa534"
            color="#ffa534"
            density="compact"
          ></v-rating>
        </div>
      </div>
    </div>
    <div class="heading">
      <div class="line"></div>
      <div class="heading-txt"><h4>Stores Near Me</h4></div>
      <div class="line"></div>
    </div>
    <div class="card-container">
      <div class="left-arrow">
        <p>
          <v-icon large color="#545454" size="50px">mdi-chevron-left</v-icon>
        </p>
      </div>
      <div class="cards scroll">
        <div class="card shop-near c1">
          <h2>Store Name</h2>
          <div class="c2">
            <h4>store location</h4>
            <v-rating
              readonly
              half-increments
              size="small"
              active-color="#ffa534"
              color="#ffa534"
              density="compact"
            ></v-rating>
          </div>
        </div>
        <div class="card shop-near c1">
          <h2>Store Name</h2>
          <div class="c2">
            <h4>store location</h4>
            <v-rating
              readonly
              half-increments
              size="small"
              active-color="#ffa534"
              color="#ffa534"
              density="compact"
            ></v-rating>
          </div>
        </div>
        <div class="card shop-near c1">
          <h2>Store Name</h2>
          <div class="c2">
            <h4>store location</h4>
            <v-rating
              readonly
              half-increments
              size="small"
              active-color="#ffa534"
              color="#ffa534"
              density="compact"
            ></v-rating>
          </div>
        </div>
        <div class="card shop-near c1">
          <h2>Store Name</h2>
          <div class="c2">
            <h4>store location</h4>
            <v-rating
              readonly
              half-increments
              size="small"
              active-color="#ffa534"
              color="#ffa534"
              density="compact"
            ></v-rating>
          </div>
        </div>
        <div class="card shop-near c1">
          <h2>Store Name</h2>
          <div class="c2">
            <h4>store location</h4>
            <v-rating
              readonly
              half-increments
              size="small"
              active-color="#ffa534"
              color="#ffa534"
              density="compact"
            ></v-rating>
          </div>
        </div>
      </div>
      <div class="right-arrow">
        <p>
          <v-icon large color="#545454" size="50px">mdi-chevron-right</v-icon>
        </p>
      </div>
    </div>
    <div class="heading">
      <div class="line"></div>
      <div class="heading-txt"><h4>Top Rated Store</h4></div>
      <div class="line"></div>
    </div>
    <div class="card-container">
      <div class="left-arrow"></div>
      <div class="cards">
        <div class="card shop-near c1">
          <h2>Store Name</h2>
          <div class="c2">
            <h4>store location</h4>
            <v-rating
              readonly
              half-increments
              size="small"
              active-color="#ffa534"
              color="#ffa534"
              density="compact"
            ></v-rating>
          </div>
        </div>
        <div class="card shop-near c1">
          <h2>Store Name</h2>
          <div class="c2">
            <h4>store location</h4>
            <v-rating
              readonly
              half-increments
              size="small"
              active-color="#ffa534"
              color="#ffa534"
              density="compact"
            ></v-rating>
          </div>
        </div>
        <div class="card shop-near c1">
          <h2>Store Name</h2>
          <div class="c2">
            <h4>store location</h4>
            <v-rating
              readonly
              half-increments
              size="small"
              active-color="#ffa534"
              color="#ffa534"
              density="compact"
            ></v-rating>
          </div>
        </div>
        <div class="card shop-near c1">
          <h2>Store Name</h2>
          <div class="c2">
            <h4>store location</h4>
            <v-rating
              readonly
              half-increments
              size="small"
              active-color="#ffa534"
              color="#ffa534"
              density="compact"
            ></v-rating>
          </div>
        </div>
      </div>
      <div class="right-arrow"></div>
    </div>
    <div class="heading">
      <div class="line"></div>
      <div class="heading-txt"><h4>Offer By Store</h4></div>
      <div class="line"></div>
    </div>
    <div class="card-container">
      <div class="left-arrow"></div>
      <div class="cards">
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
      </div>
      <div class="right-arrow"></div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import { nextTick } from "vue";
import L from "leaflet";
import "leaflet-control-geocoder"; // just import to register it globally
export default {
  data() {
    return {
      // SEARCH Store DATA
      searchQuery: "",
      stores: [],
      search: true,
      locationVisible: false,
      showMap: false,

      map: null,
      marker: null,
      latitude: null,
      longitude: null,

      nearby:[],

    };
  },
  methods: {
    // MAP
    loadMap() {
      this.showMap = true;
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
              const data = await res.json();
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

    async searchStore() {
      if (!this.searchQuery.trim()) {
        console.log(" Search query is empty. Skipping API call.");
        this.stores = [];
        return; // Stop if input is empty
      }

      console.log(" Calling search API with:", this.searchQuery);

      const response = await this.$store.dispatch("EndUser/searchStore", {
        storeName: this.searchQuery,
      });

      console.log("🔹 API Response:", response);

      if (response.success) {
        this.stores = response.data;
      } else {
        this.stores = [];
      }
    },

    showlocation() {
      this.locationVisible = !this.locationVisible;
    },

    async nearbyStore(){
      
      try{
        const latitude= this.latitude;
        const longitude= this.longitude;
        const response = await this.$store.dispatch("EndUser/storeNearMe",{latitude,longitude});
        console.log("nearby stores:", response);
        if(response.success){
          console.log("nearby store fetched", response.data);
          this.nearby = response.data;
          this.showlocation();
        }
      } catch(error){
        console.log("fetching nearby store failed", error);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Boldonse&family=Pacifico&family=Teko:wght@300..700&display=swap");

.main-container {
  width: 100%;
  height: fit-content;
  /* padding-bottom: 50px; */
  background-color: rgb(255, 255, 255);
}
.navbar {
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 15px 40px -20px rgba(40, 44, 63, 0.15);
  -webkit-box-shadow: 0 15px 40px -20px rgba(40, 44, 63, 0.15);
}
.location {
  background-color: #ffffff;
  height: 100%;
  width: 500px;
  position: sticky;
  padding-top: 30px;
  padding-left: 30px;
}
.location-wide {
  background-color: #000000ba;
  height: 900px;
  width: 100%;
  position: fixed;
  z-index: 99999;
  margin-top: -80px;
}
.left-nav {
  height: 70px;
  width: 25%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 70px;
}
.right-nav {
  height: 70px;
  width: 35%;
  display: flex;
  align-items: center;
  margin-right: 70px;
  justify-content: space-between;
}
.logo {
  width: fit-content;
  height: fit-content;
  color: #03045e;
}
.searchbar {
  /* background-color:rgb(255, 255, 255); */
  height: 100px;
  margin-top: 72px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.search {
  background-color: rgb(255, 255, 255);
  width: 800px;
  height: 55px;
  padding-left: 50px;
  padding-right: 20px;
  border-radius: 50px;
  border: 0.5px solid rgb(209, 209, 209);
}
.searchicon {
  height: 60px;
  width: 60px;
  transform: translateX(-140%);
  margin-bottom: 10px;
  border-radius: 100%;
}
.search-products {
  height: fit-content;
  padding-left: 140px;
  /* padding-right: 120px; */
  padding-bottom: 20px;
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
.headings {
  padding-left: 30px;
  margin-top: 30px;
  color: #ffffff;
  background-color: black;
  height: 50px;
  width: 1260px;
  display: flex;
  align-items: center;
  margin-left: 150px;
  border-radius: 20px;
}
.nav-txt {
  font-weight: 500;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
  color: #03045e;
  border-radius: 20px;
}
.icon {
  margin-right: 5px;
}
.heading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90px;
  /* background-color: rgb(255, 255, 237); */
}
.line {
  height: 1px;
  background-color: rgb(209, 209, 209);
  width: 500px;
  margin-right: 20px;
  margin-left: 20px;
}
.card-container {
  /* background-color: rgb(255, 255, 237); */
  height: 230px;
  display: flex;
}
.left-arrow {
  margin-left: 50px;
  width: 41px;
  height: 100%;
  /* background-color: rgb(255, 255, 237); */
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.cards {
  width: 88%;
  height: 100%;
  /* background-color: rgb(255, 255, 237); */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 50px;
}
.scroll {
  overflow-x: auto;
  flex-wrap: nowrap;
}
.scroll::-webkit-scrollbar {
  display: none;
}
.right-arrow {
  margin-right: 50px;
  width: 41px;
  height: 100%;
  /* background-color: rgb(255, 255, 237); */
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.card {
  background-color: rgb(255, 255, 255);
  height: 200px;
  width: 300px;
  border-radius: 20px;
  margin-right: 10px;
  margin-left: 10px;
  border: 0.5px solid rgb(209, 209, 209);
  flex-shrink: 0;
}
.c1 {
  margin-top: 20px;
  border: 0;
  color: #ffffff;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0),
      /* top color: semi-transparent black */ rgba(0, 0, 0, 0.8)
        /* bottom color: semi-transparent black */
    ),
    url("D:\med_e\src\assets\store1.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding-left: 30px;
  padding-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}
.shop-near {
  background-image: linear-gradient(
      rgba(255, 255, 255, 0),
      /* top color: semi-transparent black */ rgba(0, 0, 0, 0.8)
        /* bottom color: semi-transparent black */
    ),
    url("D:\med_e\src\assets\store2.jpg");
}
.c1 h2 {
  font-family: Boldonse;
  letter-spacing: 1.2px;
  font-size: 16px;
}
.c2 h4 {
  letter-spacing: 0.5px;
  margin-right: 15px;
  width: 140px;
}
.c2 {
  display: flex;
  font-weight: 500;
  margin-top: 10px;
}
.footer {
  margin-top: 50px;
  height: 500px;
  background: black;
}
</style>
