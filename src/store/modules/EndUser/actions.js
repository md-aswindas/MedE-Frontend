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
  }
}