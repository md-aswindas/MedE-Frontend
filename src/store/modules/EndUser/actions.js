import axios from "axios";

export default{
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
  async storeNearMe({rootGetters},{latitude,longitude}){
    try{
      const res = await axios.get(`${rootGetters.getUrl}/api/MedE/User/findNearbyStores`,{
        params:{
          latitude:latitude,
          longitude:longitude,
        },
      });
      if(res.status >= 200 && res.status < 300){
        return{ success : true, data: res.data };
      } 
    }catch(error){
      return{success :false, error: error.res?.data?.message || "failed"};
    }
    
  },

  async fetchStoreAds({ rootGetters }) {
    try{
      console.log("Fetching Feedback");

      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/Admin/fetchAds`);

      if(response.status >= 200 && response.status < 300){
        return { success : true, data: response.data };
      }
      
    }catch(error){
      return { success: false, error: error.  response?.data?.message || "failed to fetch Ads"};
    }
  },
  
}