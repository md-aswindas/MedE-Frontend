import axios from "axios";

export default{
  async adminLogin({rootGetters},payload){
    const response = await axios.post(`${rootGetters.getUrl}/api/MedE/Admin/adminLogin`,payload);
    if(response.status>=200 && response.status<300){
      console.log(response);
      return true;
    }
  },
}
