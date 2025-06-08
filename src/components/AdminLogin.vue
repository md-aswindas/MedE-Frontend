<template>
  <div class="container">
    <div class="login">
      <h1 class="head">Admin Login</h1>
      <div class="textfield">
        <v-text-field
          label="Username"
          v-model="adminUserName"
          variant="outlined"
          class="txt-field"
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          type="password"
          variant="outlined"
          class="txt-field"
        ></v-text-field>
      </div>
      <button type="button" class="login-btn" @click="submit">Login</button>
    </div>
  </div>  

  <!-- Snackbar -->
  <v-snackbar
    v-model="snackbar"
    color="#adff2f"
    width="400px"
    height="80px"
    location="left"
    style="margin: 50px;"
  >
    Login Success

    <template v-slot:actions>
      <v-btn
        color="red"
        variant="text"
        @click="snackbar = false"
        style="font-weight: 700"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      adminUserName: "",
      password: "",
      snackbar: false, // Snackbar state
    };
  },
  methods: {
    async submit() {
      const payload = {
        adminUserName: this.adminUserName,
        password: this.password,
      };
      try {
        const response = await this.$store.dispatch("Admin/adminLogin", payload);
        if (response) {
          this.snackbar = true; // Show snackbar on success
          sessionStorage.setItem("isAdminLoggedIn", "true"); // ✅ Save login flag
          setTimeout(() => {
            this.$router.push("/adminHome"); // Redirect after a delay
          }, 500);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.container{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: black;
}
.login{
  background-color: #212121;
  height: 550px;
  width: 750px;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.head{
  color: aliceblue;
  width: fit-content;
  margin-top: 50px;
}
.textfield{
  color: aliceblue;
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}
.txt-field{
  width: 100%;
  height: 80px;
}
.login-btn{
  color: rgb(34, 34, 34);
  background: linear-gradient(360deg, hsla(84, 100%, 50%, 1) 0%, hsla(84, 100%, 68%, 1) 100%);
  width: 500px;
  height: 55px;
  border-radius: 5px;
  font-weight: 600;
}
</style>