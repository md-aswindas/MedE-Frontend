import axios from "axios";

export default {
  async searchStore({ rootGetters }, { storeName }) {
    try {
      console.log(" Sending request to search API...");

      const response = await axios.get(
        `${rootGetters.getUrl}/api/MedE/User/searchStore`,
        {
          params: { storeName },
        }
      );

      console.log("Store search API Response Data:", response.data);

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, data: [] };
      }
    } catch (error) {
      console.error(" API Error:", error);
      return { success: false, data: [] };
    }
  },
  async storeNearMe({ rootGetters }, { latitude, longitude }) {
    try {
      const res = await axios.get(`${rootGetters.getUrl}/api/MedE/User/findNearbyStores`, {
        params: {
          latitude: latitude,
          longitude: longitude,
        },
      });
      if (res.status >= 200 && res.status < 300) {
        return { success: true, data: res.data };
      }
    } catch (error) {
      return { success: false, error: error.res?.data?.message || "failed" };
    }

  },

  async fetchStoreAds({ rootGetters }) {
    try {
      console.log("Fetching Feedback");

      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/Admin/fetchAds`);

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      }

    } catch (error) {
      return { success: false, error: error.response?.data?.message || "failed to fetch Ads" };
    }
  },

  async searchProducts({ rootGetters }, { storeId, productName }) {
    try {
      console.log("🚀 Sending request to search API...");

      const response = await axios.get(
        `${rootGetters.getUrl}/api/MedE/User/searchProduct`,
        {
          params: { storeId: storeId, productName },
        }
      );

      console.log("🔹 API Response Data:", response.data);

      if (response.status === 200) {
        return { success: true, data: response.data };
      } else {
        return { success: false, data: [] };
      }
    } catch (error) {
      console.error("❌ API Error:", error);
      return { success: false, data: [] };
    }
  },
  async fetchProducts({ rootGetters }, { storeId,sort ,categoryId}) {
    try {
      console.log("fetching products");

      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/Admin/adminViewStoreProduct`,
        {
          params: { storeId: storeId, 
            sort, categoryId
          },
        });

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "failed to fetch" };

    }
  },

  async prescriptionAdd({ rootGetters }, payload) {
    const response = await axios.post(`${rootGetters.getUrl}/api/MedE/User/uploadPrescription`, payload, { headers: { "Content-Type": "multipart/form-data" } });
    if (response.status >= 200 && response.status < 300) {
      console.log(response);
      return true;
    }
  },

  async addToCart({ rootGetters }, payload) {
    console.log("adding to cart", payload);

    const { userId, productId, quantity } = payload;

    try {
      const response = await axios.post(
        `${rootGetters.getUrl}/api/MedE/User/addCart`,
        {
          userId,
          productId,
          quantity,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
        return true;
      } else {
        console.log("Add to cart failed", response);
        return false;
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      return false;
    }
  },
  async fetchcartProducts({ rootGetters, commit }, { userId }) {
    try {
      console.log("fetching cart products");

      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/User/getCart`,
        {
          params: { userId: userId },
        });

      if (response.status >= 200 && response.status < 300) {
        commit("setCartProducts", response.data); // <-- update state here
        return { success: true, data: response.data };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "failed to fetch" };

    }
  },

  async removeFromCart({ rootGetters }, { userId, itemId }) {
    try {
      const response = await axios.delete(`${rootGetters.getUrl}/api/MedE/User/deleteCartProduct`, {
        params: { userId, itemId }
      });
      return { success: true, message: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data || "Failed to remove item" };
    }
  },


}