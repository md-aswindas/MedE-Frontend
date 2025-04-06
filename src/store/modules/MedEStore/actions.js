import axios from "axios";

export default {
  async fetchStoreProducts({ rootGetters }, storeId) {
    try {
      console.log("fetching products");

      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/Store/StoreViewAllProducts`,{params: { storeId: storeId }});

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      }

    } catch (error) {
      return { success: false, error: error.response?.data?.message || "failed to fetch products" };
      
    }
  },

  async fetchStoreFeedback({ rootGetters }, storeId) {
    try{
      console.log("Fetching Feedback",storeId);

      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/Store/fetchFeedBack`,{params: { Store_id: storeId }  });

      if(response.status >= 200 && response.status < 300){
        return { success : true, data: response.data };
      }
      
    }catch(error){
      return { success: false, error: error.  response?.data?.message || "failed to fetch feedback"};
    }
  },

  async fetchPrescription({rootGetters}, storeId){
    try{
      console.log("Fetching prescription", storeId);

      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/Store/fetchPrescription`,{params: { storeId: storeId }  })
      
      if(response.status >= 200 && response.status < 300){
        return { success : true, data: response.data };
      }
    } catch(error){
      return { success: false, error: error.response?.data?.message || "failed to fetch prescription"};
    }
  },

  async fetchStoreProfile({rootGetters},storeId){
    try{
      console.log("fetching profile",storeId);
      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/Store/profile`,{params: { Store_id:storeId}});

      if(response.status >= 200 && response.status < 300){
        return { success: true, data: response.data};
      }
    } catch(error){
      return{ success: false, error: error.response?.data?.message ||" failed to fetch profile"};
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
        store_id: payload.storeId,
      },
    
    });
    if (response.status >= 200 && response.status < 300) {
      console.log(response);
      return true;
    }
  },

  async searchProducts({ rootGetters }, { storeId, productName }) {
    try {
      console.log("🚀 Sending request to search API...");
  
      const response = await axios.get(
        `${rootGetters.getUrl}/api/MedE/Store/searchStoreProduct`,
        {
          params: { store_id: storeId, productName },
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
  }
  
  

}