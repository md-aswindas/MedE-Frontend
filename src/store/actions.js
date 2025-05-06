import axios from "axios"

export default {
  async loginUser({ commit,rootGetters }, payload) {
    console.log("Sending payload:", payload);
    const response = await axios.post(`${rootGetters.getUrl}/api/MedE/User/userLogin`, payload);
    if (response.status >= 200 || response.status < 300) {
      console.log(response);
      commit('setuser_id', response.data.user_id);
      return true;
    }
  },
  // add commit,
  async loginStore({ commit, rootGetters }, payload) {
    console.log("Sending payload:", payload);
    const response = await axios.post(`${rootGetters.getUrl}/api/MedE/Store/storeLogin`, payload);
    if (response.status >= 200 && response.status < 300) {
      console.log(response);
      commit('setstore_id', response.data.store_id);
      return true;
    }
  },
  async logoutStore({ commit }) {
    // Clear both Vuex state and session storage
    commit('setstore_id', null);

    // Optionally, return true to confirm logout
    return true;
  },
  async registerUser({ rootGetters }, payload) {
    console.log("sending payload:", payload);
    const response = await axios.post(`${rootGetters.getUrl}/api/MedE/User/userRegistration`, payload);
    if (response.status >= 200 && response.status < 300) {
      console.log(response);
      return true;
    }
  },
  async registerStore({ rootGetters }, payload) {
    const response = await axios.post(`${rootGetters.getUrl}/api/MedE/Store/storeRegistration`, payload, { headers: { "Content-Type": "multipart/form-data" } });
    if (response.status >= 200 && response.status < 300) {
      console.log(response);
      return true;
    }
  },
  async fetchProducts({ rootGetters }) {
    try {
      console.log("fetching products");

      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/Admin/adminViewAllProduct`);

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "failed to fetch" };

    }
  },

  async fetchSearchResult({ rootGetters }) {
    try {
      console.log("fetching search Result");
      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/User/searchProduct`);

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "failed to search" };
    }
  },

  async updateStoreLocation({ rootGetters }, { storeId, latitude, longitude }) {
    try {
      console.log("Updating store location...");
      const response = await axios.put(
        `${rootGetters.getUrl}/api/stores/${storeId}/update-location?latitude=${latitude}&longitude=${longitude}`
      );

      if (response.status >= 200 && response.status < 300) {
        return { success: true, message: "Store location updated successfully!" };
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to update store location."
      };
    }

  },

}