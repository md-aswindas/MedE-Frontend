import axios from "axios"

export default{
  async loginUser({rootGetters},payload){
    const response = await axios.post(`${rootGetters.getUrl}/api/MedE/User/userLogin`,payload);
    if(response.status>=200 || response.status<300){
      console.log(response);
      return true;
    }
  },
  async loginStore({rootGetters},payload){
    console.log("Sending payload:", payload);
    const response = await axios.post(`${rootGetters.getUrl}/api/MedE/Store/storeLogin`,payload);
    if(response.status>=200 && response.status<300){
      console.log(response);
      
      return true;
    }
  },
  async registerUser({rootGetters},payload){
    console.log("sending payloadv:",payload);
    const response = await axios.post(`${rootGetters.getUrl}/api/MedE/User/userRegistration`,payload);
    if(response.status>=200 && response.status<300){
      console.log(response);
      return true;
    }
  },
  async registerStore({rootGetters},payload){
    const response = await axios.post(`${rootGetters.getUrl}/api/MedE/Store/storeRegistration`,payload,{ headers: { "Content-Type": "multipart/form-data" }});
    if(response.status>=200 && response.status<300){
      console.log(response);
      return true;
    }
  } ,
  async fetchProducts({ rootGetters }){
    try{
      console.log("fetching products");

      const response = await axios.get(`${rootGetters.getUrl}/api/MedE/Admin/adminViewAllProduct`);

      if(response.status >= 200 && response.status <=300 ){
        return{ success : true, data : response.data};
      }
    } catch(error){
      return{ success : false, error : error.response?.data?.message || "failed to fetch"};
      
    }
  }
}