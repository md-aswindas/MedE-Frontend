import axios from "axios";

export default {
  async fetchStoreProducts({ rootGetters }) {
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

  async deleteProduct({ rootGetters }, productId) {
    try {
      console.log("delete");
      const response = await axios.delete(`${rootGetters.getUrl}/api/MedE/Store/deleteProduct`, {
        params: { productId }
      });

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "failed to delete" };
    }
  },

  async loadCategories({ rootGetters }) {
    try {
      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/Store/loadCategories`);
      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: 'unexpected response' };
      }
    } catch (error) {
      console.error("error fetching Category:", error);
      return { success: false, error: error.message || 'An error occured while fetching Category' };
    }
  },

  async addProducts({ rootGetters }, payload) {
    console.log("sending payload:", payload);
    const response = await axios.post(`${rootGetters.getUrl}/api/MedE/Store/addProduct`, payload, { headers: { "Content-Type": "multipart/form-data" } });
    if (response.status >= 200 && response.status < 300) {
      console.log(response);
      return true;
    }
  },

  async updateProduct({ rootGetters }, payload) {
    console.log("sending payload", payload);
    const response = await axios.put(`${rootGetters.getUrl}/api/MedE/Store/updateProduct`, null, {
      params: {
        productId: payload.productId,
        stock: payload.stock,
        actualPrice: payload.actualPrice,
        offerPercentage: payload.offerPercentage,
        store_id: 1,
      },
    });
    if (response.status >= 200 && response.status < 300) {
      console.log(response);
      return true;
    }
  }


}