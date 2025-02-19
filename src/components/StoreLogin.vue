<template>
  
  <div class="container">
    
    
    <div class="login-container">
      <div class="txt">
        <h2 class="login-h">Log in</h2>
        <router-link
          to="/storeRegistration"
          style="text-decoration: none; color: inherit"
          ><h4 class="create-acnt">
            New Here ?<span style="font-weight: 600"> create account</span>
          </h4></router-link
        >
      </div>

      <div class="fields">
        <input
          type="text"
          name="licenseNumber"
          v-model="licenseNumber"
          class="txt-field"
          placeholder="license number"
        />
        <input
          type="password"
          name="password"
          v-model="password"
          class="txt-field"
          placeholder="password"
        />
        <div class="link">
          <h4 class="link-txt" @click="forgotPswd()" style="cursor: pointer;">Forgot Password ?</h4>
          
        </div>
        <!-- <router-link to="/userhome"> -->
          <button type="button" class="btn" @click="Storesubmit">Log in</button>
        <!-- </router-link> -->
        <div class="heading">
          <div class="line"></div>
          <div class="heading-txt"><h4>Or</h4></div>
          <div class="line"></div>
        </div>
        <button type="button" class="gbtn">
          <span><v-icon></v-icon></span>Log in with Google
        </button>
      </div>
    </div>
    <div class="texts">
      
      <div class="quote-container">
        
      </div>

      <div class="frgtpswd" id="frgtpswd">
        <div class="forgot">
          <p>Reset Password</p>
          <div class="close" @click="close()"></div>
        </div>
        <input type="number" name="resetPswdNumber" id="resetPswdNumber" placeholder="connected phnone number" class="frgt-input">
        <div class="heading">
          <div class="line"></div>
          <div class="heading-txt"><h4>Or</h4></div>
          <div class="line"></div>
        </div>
        <input type="email" name="resetPswdEmail" id="resetPswdEmail" placeholder="connected email" class="frgt-input2">
        <button class="send-btn">Send</button>
      </div>

    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      licenseNumber: "",
      password: "",
    };
  },
  methods: {
    async Storesubmit() {
      const payload = {
        licenseNumber: this.licenseNumber,
        password: this.password,
      };
      try {
        const response = await this.$store.dispatch("loginStore", payload);
        if (response) {
          alert("successfully login!!!!");
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error(error);
      }
    },
    forgotPswd(){
      const frgtPsword = document.getElementById("frgtpswd");
      frgtPsword.style.display= "flex";
    },
    close(){
      const close = document.getElementById("frgtpswd");
      close.style.display= "none";
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Teko:wght@300..700&display=swap");


/* .quote-container{
  color: #ffffffcf;
  font-family: Bebas Neue;
  font-size: 80px;
  line-height: 80px;
  width: 600px;
  height: 400px;
  background: rgba(255, 255, 255, 0.081);
  backdrop-filter: blur(10px); 
  border-radius: 25px 25px 25px 25px;
  display: none;
} */
.forgot{
  height: 18%;
  width: 100%;
  background-color: #ffffff;
  border-radius: 25px 25px 0px 0px;
  padding-left: 30px;
  color: #03045e;
  display:flex;
  align-items: center;
  
  font-weight: 500;
  font-size: 20px;
  
}
.frgtpswd{
  width: 550px;
  height: 350px;
  background: rgba(255, 255, 255, 0.081);
  backdrop-filter: blur(10px); /* Glass effect */
  border-radius: 25px 25px 25px 25px;
  display: none;
  flex-direction: column;
  align-items: center;
}
.frgt-input{
  width: 400px;
  height: 45px;
  border-radius: 50px;
  border: 0.5px solid #03045e;
  padding-left: 30px;
  margin-top: 40px;
  margin-bottom: 5px;
}
.frgt-input2{
  width: 400px;
  height: 45px;
  border-radius: 50px;
  border: 0.5px solid #03045e;
  padding-left: 30px;
  margin-top: 5px;
}
.frgtpswd input::placeholder{
  font-size: 17px;
  color: #03055e9f;
}
.send-btn{
  width: 400px;
  height: 45px;
  border-radius: 50px;
  background-color:  #03045e;
  color: #ffffff;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-weight: 500;
}
.close{
  height: 50px;
  width: 50px;
  border-radius: 50px;
  position: absolute;
  right: 0;
  background-image: url(D:\med_e\src\assets\cross.png);
  background-repeat: no-repeat;
  background-size: 1.6rem;
  background-position: 50%;
  cursor: pointer;

}
.quote {
  margin-left: 50px;
  margin-top: 0;
  width: fit-content;
  color: #03045e;
}
.sub-txt{
  width: 500px;
  font-size: 15px;
  font-weight: 100;
  font-family: sans-serif;
  margin-top: 20px;
  margin-left: 80px;
  line-height: normal;
  color: #ffffffc2;
}
.heading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  
}
.line {
  height: 1px;
  background-color: #03055e6d;
  width: 100px;
  margin-right: 20px;
  margin-left: 20px;
}
.heading-txt {
  color: #03045e;
}
.fields {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: fit-content;
}
.container {
  background-color: #ffffff;
  height: 100vh;
  width: 100%;
  margin: 0;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  /* padding-left: 80px; */
   background-image: url(D:\med_e\src\assets\bgimg.jpg);
      background-repeat: no-repeat;
      background-size: cover;
      
  /* margin-right: 150px; */   
}

.txt {
  padding-left: 10px;
  width: 500px;
}
.link {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  margin-left: 55px;
  width: 74%;
}

.link-txt {
  font-weight: 400;
  font-size: 15px;
  color: #03045e;
}
.texts {
  position: relative;
  width: 50%;
  height: 100%;
  margin-left: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
}


.login-container {
  width: 38%;
  height: 85%;
  background: rgba(255, 255, 255, 0.081);
  /* margin-right: 150px; */
  margin-left: 90px;
  backdrop-filter: blur(10px); /* Glass effect */
  border-radius: 25px 25px 25px 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
}

.login-h {
  font-size: 45px;
  width: max-content;
  margin-top: 30px;
  margin-left: 40px;
  margin-bottom: 0;
  color: #03045e;
}

.create-acnt {
  font-weight: 400;
  margin-left: 40px;
  margin-top: 6px;
  color: #03045e;
  width: max-content;
}

.txt-field {
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 20px;
  width: 400px;
  height: 45px;
  border-radius: 50px;
  border: 0.5px solid #03045e;
  padding-left: 30px;
}

.txt-field::placeholder {
  font-size: 17px;
  color: #03055e9f;
}

.btn {
  margin-left: 40px;
  margin-top: 40px;
  margin-bottom: 20px;
  width: 400px;
  height: 45px;
  border-radius: 50px;
  background-color: #03045e;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(133, 133, 133);
  font-weight: bold;
}

.gbtn {
  margin-left: 40px;
  margin-top: 20px;
  width: 400px;
  height: 45px;
  border-radius: 50px;
  color: #03045e;
  
  border: 1px solid #03045e;
  font-weight: 400;
  background-image: url(D:\med_e\src\assets\googleblue.png);
  background-repeat: no-repeat;
  background-size: 1.2rem;
  background-position: 25%;
}
</style>
