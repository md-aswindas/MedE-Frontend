<template>
  <div class="container">
    <div class="texts">
      <!-- <h1 class="txt-color">MedE</h1> -->
      <div class="quote-container">
        <p class="quote">
          <span>"</span>The <br />&nbsp; Path to
          <span style="color: #03045e">Wellness</span> <br />&nbsp; Starts
          Here.<span>"</span>
        </p>
        <h4 class="sub-txt">
          Wellness made easy, your health products delivered to your doorstep
          with just one click. With shops near you and a world of care at your
          fingertips, the path to better health has never been more convenient.
        </h4>
      </div>
    </div>
    <div class="login-container">
      <div class="txt">
        <h2 class="login-h">Create Account</h2>
        <router-link
          to="/userLogin"
          style="text-decoration: none; color: inherit"
          ><h4 class="create-acnt">
            Already have an account ?
            <span style="font-weight: 600">log in</span>
          </h4></router-link
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
          type="tel"
          name="phone"
          id="phone"
          class="txt-field"
          placeholder="phone number"
        />
        <!-- <input
        v-model="password"
          type="password"
          name="password"
          
          class="txt-field"
          placeholder="password"
        /> -->
        <input
          :type="showPassword ? 'text' : 'password'"
          name="password"
          v-model="password"
          class="txt-field"
          placeholder="Password"
          id="password"
        />
        <v-icon
          @click="togglePasswordVisibility"
          class="eye-icon"
          color="grey"
          style="cursor: pointer"
        >
          {{ showPassword ? "mdi-eye-off" : "mdi-eye" }}
        </v-icon>
        <input
          :type="showConfirmPassword ? 'text' : 'password'"
          name="confirmPassword"
          v-model="confirmPassword"
          class="txt-field"
          placeholder="Confirm Password"
        />
        <v-icon
          @click="toggleConfirmPasswordVisibility"
          class="eye-iconc"
          color="grey"
          style="cursor: pointer"
        >
          {{ showConfirmPassword ? "mdi-eye-off" : "mdi-eye" }}
        </v-icon>
        <p
          v-if="confirmPassword && password !== confirmPassword"
          style="color: red; padding-left: 50px"
        >
          Passwords do not match!
        </p>

        <button type="button" class="btn" @click="submitForm()">
          Continue
        </button>

        <div class="heading">
          <div class="line"></div>
          <div class="heading-txt"><h4>Or</h4></div>
          <div class="line"></div>
        </div>
        <button type="button" class="gbtn">Continue with Google</button>
      </div>
    </div>
  </div>
  <v-snackbar v-model="snackbar" :timeout="3000" :color="snackbarColor" top>
    {{ snackbarMessage }}
  </v-snackbar>
</template>
 
<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
    };
  },
  methods: {
    showSnackbar(message, color) {
      this.snackbarMessage = message;
      this.snackbarColor = color;
      this.snackbar = true;
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    submitForm() {
      const phoneRegex = /^[6-9]\d{9}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex

      if (!this.email) {
        this.showSnackbar("📧 Email is required", "error");
        return;
      }

      if (!emailRegex.test(this.email)) {
        this.showSnackbar("⚠️ Enter a valid email address", "error");
        return;
      }

      if (!this.phoneNumber) {
        this.showSnackbar("📱 Phone number is required", "error");
        return;
      }

      if (!phoneRegex.test(this.phoneNumber)) {
        this.showSnackbar(
          "⚠️ Enter a valid 10-digit Indian phone number",
          "error"
        );
        return;
      }

      this.register();
    },

    async register() {
      const payload = {
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber,
        password: this.password,
      };
      try {
        const response = await this.$store.dispatch("registerUser", payload);
        if (response) {
          this.showSnackbar(
            "🎉  Registered Successfully" + response,
            "success"
          );
          this.$router.push("/userLogin");
        } else {
          console.log("error");
          this.showSnackbar(" Registered failed", "error");
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          this.showSnackbar(
            "⚠️ Email or Phone Number already registered",
            "warning"
          );
        } else {
          console.error(error);
          this.showSnackbar(
            "❌ An error occurred during registration",
            "error"
          );
        }
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
.quote-container {
  color: #ffffffcf;
  font-family: Bebas Neue;
  font-size: 80px;
  margin-top: 120px;
  line-height: 80px;
  width: fit-content;
}
.quote {
  margin-left: 50px;
  margin-top: 0;
  width: fit-content;
}
.sub-txt {
  width: 500px;
  font-size: 15px;
  font-weight: 100;
  font-family: sans-serif;
  margin-top: 20px;
  margin-left: 80px;
  line-height: normal;
  color: #ffffffc2;
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
.eye-icon {
  position: absolute;
  right: 100px;
  top: 54%;
}
.eye-iconc {
  position: absolute;
  right: 100px;
  top: 63%;
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
