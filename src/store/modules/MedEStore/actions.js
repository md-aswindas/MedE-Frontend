import axios from "axios";

export default {
  async fetchStoreProducts({ rootGetters }, storeId) {
    try {
      console.log("fetching products");

      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/Store/StoreViewAllProducts`, { params: { storeId: storeId } });

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      }

    } catch (error) {
      return { success: false, error: error.response?.data?.message || "failed to fetch products" };

    }
  },

  async fetchStoreAds({ rootGetters }, storeId) {
    try {
      console.log("fetching ads");
      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/Store/fetchAds`, { params: { store_id: storeId } });

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "failed to fetch Ads" };

    }
  },

  async fetchStoreFeedback({ rootGetters }, storeId) {
    try {
      console.log("Fetching Feedback", storeId);

      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/Store/fetchFeedBack`, { params: { Store_id: storeId } });

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      }

    } catch (error) {
      return { success: false, error: error.response?.data?.message || "failed to fetch feedback" };
    }
  },

  async fetchPrescription({ rootGetters }, storeId) {
    try {
      console.log("Fetching prescription", storeId);

      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/Store/fetchPrescription`, { params: { storeId: storeId } })

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "failed to fetch prescription" };
    }
  },

  async fetchStoreProfile({ rootGetters }, storeId) {
    try {
      console.log("fetching profile", storeId);
      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/Store/profile`, { params: { Store_id: storeId } });

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || " failed to fetch profile" };
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

  async deleteAds({ rootGetters }, adsId) {
    try {
      console.log("delete ads");
      const response = await axios.delete(`${rootGetters.getUrl}/api/MedE/Store/deleteAds`, {
        params: { adsId }
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

  async addAds({ rootGetters }, payload) {
    console.log("sending Ads payload", payload);
    const response = await axios.post(`${rootGetters.getUrl}/api/MedE/Store/addAds`, {
      offerName: payload.offerName,
      offerPercentage: payload.offerPercent,
      conditions: payload.conditions,
      startDate: payload.offerStartDate,
      endDate: payload.offerEndDate,
      storeId: payload.storeId,
    });
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

  async updateProfile({ rootGetters }, payload) {
    console.log("sending payload profile", payload);
    const response = await axios.put(`${rootGetters.getUrl}/api/MedE/Store/updateProfile`, null, {
      params: {
        store_id: payload.storeId,
        store_name: payload.storeName,
        password: payload.storePassword,
        phone_number: payload.phoneNumber,
      },
    });
    if (response.status >= 200 && response.status < 300) {
      console.log(response);
      return true;
    }
  },

  async rejectPrescription({ rootGetters }, payload) {
    console.log("sending payload rejectprescription", payload);
    const response = await axios.put(`${rootGetters.getUrl}/api/MedE/Store/rejectPrescription`, null, {
      params: {
        storeId: payload.storeId,
        rejectionReason: payload.rejectionReason,
        prescriptionId: payload.prescriptionId,
      },
    });
    if (response.status >= 200 && response.status < 300) {
      console.log(response);
      return true;
    }
  },
  async acceptPrescription({ rootGetters }, payload) {
    const response = await axios.put(`${rootGetters.getUrl}/api/MedE/Store/acceptPrescription`, null, {
      params: {
        storeId: payload.storeId,
        prescriptionId: payload.prescriptionId,
      },
    });
    if (response.status >= 200 && response.status < 300) {
      console.log(response);
      return true;

    }
  },

  async addStoreLocation({ rootGetters }, payload) {
    const response = await axios.put(`${rootGetters.getUrl}/api/MedE/Store/AddStoreLocation`, null, {
      params: {
        store_Id: payload.storeId,
        latitude: payload.latitude,
        longitude: payload.longitude,
        address: payload.address,
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
  },

  async loadOrders({ rootGetters }, { status, storeId }) {
    try {
      console.log("fetching Orders");

      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/Store/getByStatus`,
        {
          params: { status, storeId }
        });

      if (response.status >= 200 && response.status < 300) {
        return { success: true, data: response.data };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "failed to fetch" };

    }
  },

  async addDispatch({ rootGetters }, { orderId, status }) {
    
      try {
        console.log("adding to dispatch");

        const response = await axios.put(`${rootGetters.getUrl}/api/MedE/Store/updateStatus`,null,
          {
            params: { orderId, status }
          });

        if (response.status >= 200 && response.status < 300) {
          return { success: true, data: response.data };
        }
      } catch (error) {
        return { success: false, error: error.response?.data?.message || "failed to dispatch" };

      }
    
  }



}