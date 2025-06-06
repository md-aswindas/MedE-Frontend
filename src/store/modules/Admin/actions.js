import axios from "axios";

export default {
  async adminLogin({ rootGetters }, payload) {
    const response = await axios.post(`${rootGetters.getUrl}/api/MedE/Admin/adminLogin`, payload);
    if (response.status >= 200 && response.status < 300) {
      console.log(response);
      return true;
    }
  },

  async acceptStore({ rootGetters }, { store_id, status_id }) {
    try {
      console.log("updating");

      const response = await axios.put(`${rootGetters.getUrl}/api/MedE/Admin/adminUpdateStoreStatus`, null, {
        params: {                 // <-- wrap store_id and status_id inside `params`
          store_id: store_id,
          status_id: status_id,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "failed to update" };
    }
  },

  async loadPendingStores({ rootGetters }) {
    try {
      console.log("fetching pending stores");

      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/Admin/fetchPendingStores`);

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "failed to pending stores" };

    }
  },

  async loadStores({ rootGetters }) {
    try {
      console.log("fetching stores");

      const response = await axios.post(`${rootGetters.getUrl}/api/MedE/Admin/adminViewStore`);

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "failed to fetch stores" };

    }
  },

   async loadStoresTop({ rootGetters }) {
    try {
      console.log("fetching top stores ");

      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/Admin/findTopStores`);

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "failed to fetch stores" };

    }
  },

  async loadAds({ rootGetters }) {
    try {
      console.log("fetching Ads");

      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/Admin/fetchAds`);

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "failed to  fetch Ads" };

    }
  },

  async loadFeedBack({ rootGetters }) {
    try {
      console.log("fetching feedback");

      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/Admin/fetchFeedback`);

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "failed to  fetch feedback" };

    }
  },
}
