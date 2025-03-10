<template>
  <div>
    <button @click="updateLocation" class="button">Update Store Location</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      storeId: 6// Set storeId manually
    };
  },
  methods: {
    ...mapActions(["updateStoreLocation"]),

    async updateLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            console.log("Updating store location for storeId:", this.storeId);

            const response = await this.updateStoreLocation({
              storeId: this.storeId,
              latitude,
              longitude
            });

            alert(response.success ? "Location updated!" : response.error);
          },
          (error) => {
            console.error("Error fetching location:", error.message);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
  }
};
</script>


<style scoped>
  .button{
    margin: 50px;
    width: 200px;
    height: 50px;
    background-color: cadetblue;
    color: aliceblue;
    font-weight: 600;
  }
</style>
