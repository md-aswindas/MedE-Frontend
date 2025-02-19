<template>
  <div class="container">
    <div class="texts"></div>
    <div class="login-container">
      <div class="txt">
        <h2 class="login-h">Create Account</h2>
        <router-link to="/" style="text-decoration: none; color: inherit"
          ><h4 class="create-acnt">Already have an account ? <span style="font-weight: 600;">log in</span></h4></router-link
        >
      </div>

      <div class="fields">
        <input
        v-model="name"
          type="text"
          name="name"
          id="name"
          class="txt-field"
          placeholder="name"
        />
        <input
        v-model="email"
          type="email"
          name="email"
          id="email"
          class="txt-field"
          placeholder="email"
        />
        <input
        v-model="phoneNumber"
          type="number"
          name="phone"
          id="phone"
          class="txt-field"
          placeholder="phone number"
        />
        <input
        v-model="password"
          type="password"
          name="password"
          id="password"
          class="txt-field"
          placeholder="password"
        />

        <button type="button" class="btn" @click="register()">Continue</button>

        <div class="heading">
          <div class="line"></div>
          <div class="heading-txt"><h4>Or</h4></div>
          <div class="line"></div>
        </div>
        <button type="button" class="gbtn">Continue with Google</button>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data(){
    return{
      name:"",
      email:"",
      phoneNumber:"",
      password:""
    };
  },
  methods:{
    async register(){
      const payload ={
        name:this.name,
        email:this.email,
        phoneNumber:this.phoneNumber,
        password:this.password,
      };
      try{
      const response = await this.$store.dispatch("registerUser",payload);
      if(response){
        alert("Registered Successfully"+response.data.name);
      }else{
        console.log("error")
      }
    }catch (error){
      console.log(error);
    }
  },
},
};
</script>


<style scoped>
.heading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: rgb(255, 255, 255);
}
.line {
  height: 1px;
  background-color: rgb(209, 209, 209);
  width: 100px;
  margin-right: 20px;
  margin-left: 20px;
}
.fields {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
.container {
  background-color: #ffffff;
  height: 100vh;
  width: 100%;
  margin: 0;

  display: flex;
  
  align-items: center;
  justify-content: flex-start;
  border-radius: 10px;
  /* padding-left: 80px; */
  /* background-image: url(D:\med_e\src\assets\blue.png);
      background-repeat: no-repeat;
      background-size: 30rem;
      background-position: 15%; */
}
.txt {
  padding-left: 10px;
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
  width: 55%;
  height: 100%;
  margin-right: 150px;
  padding: 50px;
  border-radius: 0px 0px 50px 0px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    45deg,
    hsla(239, 94%, 19%, 1) 0%,
    hsla(190, 100%, 42%, 1) 100%
  );

  }
.texts::before {
  content: "";
  position: absolute;
  /* background-color: #ff0000; */
  right: -50px;
  top: 0.3px;
  height: 50px;
  width: 50px;
  border-top-left-radius: 40px;
  box-shadow: -10px -9px 0 8px #00acd1;
}
.login-container {
  width: 30%;
  height: 85%;
  background-color: rgb(255, 255, 255);
  /* margin-right: 150px; */
  border-radius: 20px;
  display: flex;
  flex-direction: column;

  margin-left: -20px;
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
  width: 80%;
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
  width: 80%;
  height: 45px;
  border-radius: 50px;
  background-color: #00b4d8;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(133, 133, 133);
  font-weight: bold;
}
.gbtn {
  margin-left: 40px;
  margin-top: 20px;
  width: 80%;
  height: 45px;
  border-radius: 50px;
  background-color: #03045e;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(133, 133, 133);
  font-weight: 400;
  background-image: url(D:\med_e\src\assets\google.png);
  background-repeat: no-repeat;
  background-size: 1.2rem;
  background-position: 20%;
}
</style>
