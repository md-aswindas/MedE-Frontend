<template>
  <div class="main-container">
    <div class="navbar">
      <div class="left-nav">
        <router-link
          to="/"
          style="
            text-decoration: none;
            color: inherit;
            font-weight: 500;
            cursor: pointer;
          "
        >
          <h1 class="logo">MedE</h1></router-link
        >
        <p
          class="nav-txt"
          style="width: 140px; cursor: pointer"
          @click="showlocation()"
        >
          <v-icon large color="#03045E" size="1.2rem" class="icon">
            mdi-map-marker
          </v-icon>
          {{ locationText }}
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
        <!-- <router-link
          to="/userLogin"
          style="text-decoration: none; color: inherit; font-weight: 500"
        >
          <p
            v-if="!isLoggedIn"
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
          <p
            v-else
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
            {{ username }}
          </p>
        </router-link> -->

        <router-link
          v-if="!isLoggedIn"
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
              max-width: 100px;
              height: 40px;
              white-space: nowrap;
              overflow: hidden;
            "
          >
            <v-icon large color="#03045E" size="1.2rem" class="icon"
              >mdi-account-outline</v-icon
            >
            Sign In
          </p>
        </router-link>

        <!-- If user IS logged in -->
        <router-link
          v-else
          to="/userProfile"
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
              max-width: 100px;
              height: 40px;
              white-space: nowrap;
              overflow: hidden;
            "
          >
            <v-icon large color="#03045E" size="1.2rem" class="icon"
              >mdi-account-outline</v-icon
            >
            {{ username }}
          </p>
        </router-link>

        <router-link
          to="/cart"
          style="text-decoration: none; color: inherit; font-weight: 500"
        >
          <p class="nav-txt">
            <v-icon large color="#03045E" size="1.2rem" class="icon"
              >mdi-cart-outline</v-icon
            >
            <v-badge color="blue" :content="cartCount" floating> Cart </v-badge>
          </p>
        </router-link>
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
      <div
        class="card c1"
        v-for="store in stores"
        :key="store.id"
        @click="selectStore(store.storeId)"
      >
        <h2>{{ store.storeName }}</h2>
        <div class="c2">
          <h4>
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
      <div
        v-if="nearby.length === 0"
        style="
          width: 88%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
          font-size: large;
        "
      >
        NO STORES NEARBY !
      </div>
      <div class="cards scroll" v-else>
        <div
          class="card shop-near c1"
          v-for="nstore in nearby"
          :key="nstore.id"
          @click="selectStore(nstore.storeId)"
        >
          <h2>{{ nstore.storeName }}</h2>
          <div class="c2">
            <h4>
              {{ nstore.address }}
            </h4>
            <v-rating
              v-model="nstore.averageRating"
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
      <div class="heading-txt"><h4>Top Rated Stores</h4></div>
      <div class="line"></div>
    </div>

    <div class="card-container">
      <div class="left-arrow"></div>
      <div
        v-if="topRated.length === 0"
        style="
          width: 88%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
          font-size: large;
        "
      >
        NO STORES !
      </div>
      <div class="cards" v-else>
        <div
          class="card shop-near c1"
          v-for="topstore in topRated"
          :key="topstore.id"
          @click="selectStore(topstore.storeId)"
        >
          <h2>{{ topstore.storeName }}</h2>
          <div class="c2">
            <h4>{{ topstore.address }}</h4>
            <v-rating
              v-model="topstore.averageRating"
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
      <div class="heading-txt"><h4>Offer By Stores</h4></div>
      <div class="line"></div>
    </div>
    <div class="card-container">
      <div class="left-arrow">
        <p>
          <v-icon large color="#545454" size="50px">mdi-chevron-left</v-icon>
        </p>
      </div>
      <div class="cards scroll">
        <div class="ad-card card-style5 card" v-for="ad in Ads" :key="ad.id">
          <div class="adname one">
            <h3>{{ ad.offerName }}</h3>
          </div>
          <div class="adoffer one">
            <h1>{{ ad.offerPercentage }}% off on all Products</h1>
          </div>
          <div class="dates one">
            <h5>From :&nbsp; {{ ad.startDate }}</h5>
            <h5>To :&nbsp;{{ ad.endDate }}</h5>
          </div>
          <div class="condition one">
            <h5>*&nbsp; {{ ad.conditions }}</h5>
          </div>
        </div>
      </div>
      <div class="right-arrow">
        <p>
          <v-icon large color="#545454" size="50px">mdi-chevron-right</v-icon>
        </p>
      </div>
    </div>
    <div class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>About MedE</h3>
          <p>Your trusted medical e-commerce platform</p>
          <p>Connecting patients with local pharmacies</p>
        </div>
        <div class="footer-section">
          <h3>Quick Links</h3>
          <router-link to="/">Home</router-link>
          <router-link to="/cart">Cart</router-link>
          <router-link to="/storeLogin">Become a Seller</router-link>
        </div>
        <div class="footer-section">
          <h3>Contact Us</h3>
          <p><v-icon size="small">mdi-email</v-icon> support@mede.com</p>
          <p><v-icon size="small">mdi-phone</v-icon> +1 (555) 123-4567</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 MedE. All rights reserved.</p>
      </div>
    </div>
  </div>
  <v-snackbar v-model="snackbar" :timeout="3000" :color="snackbarColor" top>
    {{ snackbarMessage }}
  </v-snackbar>
</template>

<script>
import { nextTick } from "vue";
import L from "leaflet";
import "leaflet-control-geocoder"; // just import to register it globally
export default {
  data() {
    return {
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
      // SEARCH Store DATA
      searchQuery: "",
      stores: [],
      search: true,
      locationVisible: false,
      showMap: false,

      latitude: 9.49809589449932,
      longitude: 76.33891403675081,

      map: null,
      marker: null,

      nearby: [],
      topRated: [],
      Ads: [],

      username: sessionStorage.getItem("user_name"),
    };
  },
  mounted() {
    this.loadStoreAds();
    this.nearbyStore();
    this.initializeLocation();
  },
  computed: {
    isLoggedIn() {
      const username = this.$store.state.auth.user_name;
      return username && username.trim().length > 0;
    },

    cartCount() {
      return this.$store.state.EndUser.cartCount;
    },
    locationText() {
      try {
        const location = sessionStorage.getItem("user_location");
        if (location) {
          const locationObj = JSON.parse(location);
          if (locationObj.name) {
            // Show only the first part before the first comma
            const shortName = locationObj.name.split(",")[0];
            return shortName;
          }
        }
        return "Find a store";
      } catch (error) {
        console.error("Error parsing location data:", error);
        return "Find a store";
      }
    },
  },
  methods: {
    selectStore(storeId) {
      sessionStorage.setItem("store_id", storeId);
      // You can also navigate or trigger any other action here if needed
      console.log("Store ID saved:", storeId);
      this.$router.push("/UserHomeMain");
    },
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

                const locationPayload = {
                  name: address,
                  latitude: lat,
                  longitude: lng,
                };
                sessionStorage.setItem(
                  "user_location",
                  JSON.stringify(locationPayload)
                );

                // ✅ Commit to Vuex if needed
                this.$store.commit("setlocation", locationPayload);
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
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);

            this.latitude = latitude;
            this.longitude = longitude;

            try {
              // 🌍 Reverse geocoding using MapTiler API
              const response = await fetch(
                `https://api.maptiler.com/geocoding/${longitude},${latitude}.json?key=yW9Chaj3bp5BpSfoMfNq`
              );
              const data = await response.json();

              if (data.features.length > 0) {
                const placeName =
                  data.features[0].place_name || "Unknown Location";

                const locationPayload = {
                  name: placeName,
                  latitude: latitude,
                  longitude: longitude,
                };

                // ✅ Save to sessionStorage
                sessionStorage.setItem(
                  "user_location",
                  JSON.stringify(locationPayload)
                );

                // ✅ Update Vuex
                this.$store.commit("setlocation", locationPayload);

                // Optional: Show success message
                this.snackbarMessage = "📍 Location set to: " + placeName;
                this.snackbar = true;
                this.snackbarColor = "success";
              } else {
                throw new Error("No location found");
              }
            } catch (error) {
              console.error("Reverse geocoding failed:", error);
              this.snackbarMessage =
                "🌐 Failed to reverse geocode coordinates.";
              this.snackbar = true;
              this.snackbarColor = "error";
            }
          },
          (error) => {
            console.error("Error getting location:", error);
            this.snackbarMessage = "🗺️ Could not get location.";
            this.snackbar = true;
            this.snackbarColor = "error";
          }
        );
      } else {
        this.snackbarMessage =
          "🗺️ Geolocation is not supported by this browser.";
        this.snackbar = true;
        this.snackbarColor = "error";
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
    async initializeLocation() {
      try {
        const savedLocation = sessionStorage.getItem("user_location");
        
        if (savedLocation) {
          const locationObj = JSON.parse(savedLocation);
          this.latitude = locationObj.latitude;
          this.longitude = locationObj.longitude;
          console.log("Using saved location:", locationObj);
        } else {
          console.log("No saved location found, using default coordinates");
        }
        
        await this.nearbyStore();
        
      } catch (error) {
        console.error("Error initializing location:", error);
        await this.nearbyStore();
      }
    },

    // ✅ UPDATED: Improve nearbyStore method
    async nearbyStore() {
      try {
        const latitude = this.latitude;
        const longitude = this.longitude;
        
        if (!latitude || !longitude) {
          console.log("No valid coordinates available");
          this.nearby = [];
          this.topRated = [];
          return;
        }
        
        const response = await this.$store.dispatch("EndUser/storeNearMe", {
          latitude,
          longitude,
        });
        
        console.log("nearby stores:", response);
        
        if (response.success) {
          console.log("nearby store fetched", response.data);
          this.nearby = response.data;
          this.locationVisible = false;
          
          this.topRated = this.nearby
            .filter(
              (nearby) =>
                nearby.averageRating !== null &&
                nearby.averageRating !== undefined
            )
            .sort((a, b) => b.averageRating - a.averageRating)
            .slice(0, 4);

          console.log("topRated store fetched", this.topRated);
        } else {
          console.log("Failed to fetch nearby stores:", response.error);
          this.nearby = [];
          this.topRated = [];
        }
      } catch (error) {
        console.log("fetching nearby store failed", error);
        this.nearby = [];
        this.topRated = [];
      }
    },

    

    // async nearbyStore() {
    //   try {
    //     const latitude = this.latitude;
    //     const longitude = this.longitude;
    //     const response = await this.$store.dispatch("EndUser/storeNearMe", {
    //       latitude,
    //       longitude,
    //     });
    //     console.log("nearby stores:", response);
    //     if (response.success) {
    //       console.log("nearby store fetched", response.data);
    //       this.nearby = response.data;

    //       this.locationVisible = false;
    //       this.topRated = this.nearby
    //         .filter(
    //           (nearby) =>
    //             nearby.averageRating !== null &&
    //             nearby.averageRating !== undefined
    //         )
    //         .sort((a, b) => b.averageRating - a.averageRating)
    //         .slice(0, 4);

    //       console.log("topRated store fetched", this.topRated);
    //     }
    //   } catch (error) {
    //     console.log("fetching nearby store failed", error);
    //   }
    // },

    async loadStoreAds() {
      try {
        const result = await this.$store.dispatch("EndUser/fetchStoreAds");
        console.log("Ads fetch API Response:", result);
        if (result.success) {
          console.log("Fetched Ads:", result.data); // Debugging
          this.Ads = result.data;
        } else {
          // alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error("Error loading Ads :", error);
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
  background-color: #03045e;
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
  height: 130px;
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
  justify-content: center;
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
.card:hover {
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3); /* Enhance shadow on hover */
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
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.c2 {
  display: flex;
  font-weight: 500;
  margin-top: 10px;
}
/* .footer {
  margin-top: 50px;
  height: 500px;
  background: black;
} */
.one {
  width: 100%;
}
.ad-card {
  /* border: 1px #16db93 solid; */
  height: 220px;
  width: 350px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px;
  margin-bottom: 15px;
  flex-shrink: 0;
  position: relative;
  background: linear-gradient(to bottom right, #ffffff, #4dabf7);
  color: #1b2d44;
}
.adname {
  display: flex;
  justify-content: space-between;
  padding: 0px 20px 0px 20px;
  font-family: Pacifico;
  font-weight: 400;
}
.dates {
  display: flex;
  justify-content: space-around;
}
.adoffer {
  display: flex;
  justify-content: center;
  font-family: Boldonse;
  font-weight: 300;
  font-size: 12px;
}
.condition {
  padding-left: 20px;
}
.deletead {
  color: white;
  /* background-color: #ff0000; */
  cursor: pointer;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 3%;
  right: 1%;
}

/* footer */

.footer {
  background: linear-gradient(to bottom, #000000, #2f2f2f);
  color: white;
  padding: 40px 0 20px;
  margin-top: 50px;
  height: 300px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
}

.footer-section {
  flex: 1;
  max-width: 300px;
  margin: 0 20px;
}

.footer-section h3 {
  font-family: "Boldonse";
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.footer-section p,
.footer-section a {
  color: #ffffff;
  text-decoration: none;
  display: block;
  margin-bottom: 10px;
  font-size: 0.9rem;
  transition: opacity 0.3s;
}

.footer-section a:hover {
  opacity: 0.8;
}

.footer-section .v-icon {
  margin-right: 8px;
  color: #ffffff;
}

.footer-bottom {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.8rem;
}
</style>
