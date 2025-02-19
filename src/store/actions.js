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
  }
}