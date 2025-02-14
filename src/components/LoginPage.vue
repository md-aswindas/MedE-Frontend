<template>
  
  <div class="container">
    <div class="texts">
      
    </div>
    <div class="login-container">

      <div class="txt">
        <h2 class="login-h">Log in</h2>
        <router-link to="/createAccount"  style="text-decoration: none;  color: inherit;"><h4 class="create-acnt">New Here ?<span style="font-weight: 600;"> create account</span></h4></router-link>
      </div>

      <div class="fields">
        <input type="text" name="email" v-model="email" class="txt-field" placeholder="email">
        <input type="password" name="password" v-model="password" class="txt-field" placeholder="password">
        <div class="link">
          <h4 class="link-txt">Forgot Password ?</h4>
          <h4 class="link-txt">Forgot Email ?</h4>
        </div>
        <router-link to="/userhome" >
          <button type="button" class="btn" @click="submit">Log in</button>
        </router-link>
        <div class="heading">
      <div class="line"></div>
      <div class="heading-txt"><h4>Or</h4></div>
      <div class="line"></div>
    </div>
        <button type="button" class="gbtn" ><span><v-icon ></v-icon></span>Log in with Google</button>
      </div>
    </div>
  </div>

</template>
 
<script>
export default {
  data(){
    return{
      email:'',
      password:''
    }
  },
  methods:{
    async submit(){
      const payload = {
          'email': this.email,
          'password' : this.password
        }
        try{
          const response = await this.$store.dispatch('loginUser',payload)
          if(response) {
            alert("successfully login!!!!")
          }else{
            console.log('error')
            
          }
        }catch(error){
          console.error(error);
        }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


      .heading{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    margin-top:10px ;
    margin-bottom: 10px;
    background-color: rgb(255, 255, 255);
  }
  .line{
    height: 1px;
    background-color: rgb(209, 209, 209);
    width: 100px;
    margin-right: 20px;
    margin-left: 20px;
  }
    .fields{
      display: flex;
      flex-direction: column;
      margin-top: 30px;
      
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
    .txt{
      padding-left:10px;
    }
    .link{
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      margin-left: 55px;
      width: 74%;
    }

    .link-txt{
      font-weight: 400;
      font-size: 15px;
      color: #03045E;
    }
    .texts{
      position: relative;
      width: 55%;
      height: 100%;
      margin-right: 150px;
      padding: 50px;
      border-radius: 0px 0px 50px 0px;
      display: flex;
      flex-direction: column;
      background: linear-gradient(45deg, hsla(239, 94%, 19%, 1) 0%, hsla(190, 100%, 42%, 1) 100%);

     
      
      /* background: linear-gradient(270deg, hsla(190, 100%, 42%, 1) 0%, hsla(204, 99%, 31%, 1) 61%, hsla(215, 97%, 26%, 1) 86%, hsla(223, 97%, 23%, 1) 99%, hsla(239, 94%, 19%, 1) 100%); */

      /* background: -moz-linear-gradient(270deg, hsla(190, 100%, 42%, 1) 0%, hsla(204, 99%, 31%, 1) 61%, hsla(215, 97%, 26%, 1) 86%, hsla(223, 97%, 23%, 1) 99%, hsla(239, 94%, 19%, 1) 100%); */

      /* background: -webkit-linear-gradient(270deg, #00b3d6 0%, hsla(204, 99%, 31%, 1) 61%, hsla(215, 97%, 26%, 1) 86%, hsla(223, 97%, 23%, 1) 99%, hsla(239, 94%, 19%, 1) 100%); */

      /* filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#00B4D8", endColorstr="#01619F", GradientType=1 ); */
    }
    .texts::before{
      content: "";
    position: absolute;
    /* background-color: #ff0000; */
    right: -50px;
    top: .3px;
    height: 50px;
    width: 50px;
    border-top-left-radius: 40px;
    box-shadow: -10px -9px 0  8px #00acd1;
    }
    .login-container {
      width: 30%;
      height: 75%;
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
      color:#03045E;
      
    }

    .create-acnt {
      font-weight: 400;
      margin-left: 40px;
      margin-top: 6px;
      color: #03045E;
      width: max-content;
    }

    .txt-field {
      margin-left: 40px;
      margin-right: 40px;
      margin-top: 20px;
      width: 80%;
      height: 45px;
      border-radius: 50px;
      border: .5px solid #03045E;
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
      background-color: #03045E;
      color: rgb(255, 255, 255);
      border: 1px solid rgb(133, 133, 133);
      font-weight: 400;
      background-image: url(D:\med_e\src\assets\google.png);
      background-repeat: no-repeat;
      background-size: 1.2rem;
      background-position: 25%;
    }


    
</style>
