<template>
  <div class="body">
  <div class="container">
    <div class="login-container">
      
        <h2 class="login-h">Login</h2>
        <router-link to="/createAccount"><h4 class="create-acnt">or create account</h4></router-link>
        <input type="text" name="email" id="email" class="txt-field" placeholder="email">
        <input type="password" name="password" id="password" class="txt-field" placeholder="password">
        <button type="button" class="btn">Login</button>
      
    </div>
  </div>
</div>
</template>

<script>
export default {
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body {
      margin: 0;
      padding: 0;
      background-color: white;
      display: flex;
      justify-content: center;
      margin-top: 39px;
      font-family: Arial, Helvetica, sans-serif
    }

    .container {
      background-color: rgb(236, 236, 236);
      height: 90vh;
      width: 85%;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-radius: 20px;
    }

    .login-container {
      width: 35%;
      height: 80%;
      background-color: rgb(255, 255, 255);
      margin-right: 100px;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;

    }

    .login-h {
      font-size: 40px;
      width: max-content;
      margin-top: 0px;
      margin-left: 40px;
      margin-bottom: 0;
    }

    .create-acnt {
      font-weight: 100;
      margin-left: 40px;
      margin-top: 6px;
      
      width: max-content;
    }

    .txt-field {
      margin-left: 40px;
      margin-top: 20px;
      width: 350px;
      height: 35px;
      border-radius: 20px;
      border: .5px solid rgb(133, 133, 133);
      padding-left: 30px;
    }

    .txt-field::placeholder {
      font-size: 17px;

    }

    .btn {
      margin-left: 40px;
      margin-top: 40px;
      width: 350px;
      height: 40px;
      border-radius: 20px;
      background-color: rgb(0, 136, 255);
      color: white;
      border: 1px solid rgb(133, 133, 133);
      font-weight: bold;
    }

    
</style>
