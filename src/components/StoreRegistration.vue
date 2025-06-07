<template>
  <div class="container">
    <div class="login-container">
      <div class="txt">
        <h2 class="login-h">Create Account</h2>
        <router-link
          to="/storeLogin"
          style="text-decoration: none; color: inherit"
        >
          <h4 class="create-acnt">
            Already have an account?
            <span style="font-weight: 600">log in</span>
          </h4>
        </router-link>
      </div>

      <div class="fields">
        <input
          type="text"
          name="licenseNumber"
          v-model="licenseNumber"
          class="txt-field"
          placeholder="License number"
        />
        <input
          type="tel"
          name="phone"
          v-model="phoneNumber"
          class="txt-field"
          placeholder="Phone number"
        />
        <!-- <input
          type="password"
          name="password"
          v-model="password"
          class="txt-field"
          placeholder="Password"
        /> -->
        <!-- Password Field -->
        <div class="password-field">
          <input
            :type="showPassword ? 'text' : 'password'"
            name="password"
            v-model="password"
            class="txt-field"
            placeholder="Password"
            
          />
          <v-icon
            @click="togglePasswordVisibility"
            class="eye-icon"
            color="grey"
            style="cursor: pointer"
          >
            {{ showPassword ? "mdi-eye-off" : "mdi-eye" }}
          </v-icon>
        </div>

        <!-- Confirm Password Field -->
        <div class="password-field">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            name="confirmPassword"
            v-model="confirmPassword"
            class="txt-field"
            placeholder="Confirm Password"
          />
          <v-icon
            @click="toggleConfirmPasswordVisibility"
            class="eye-icon"
            color="grey"
            style="cursor: pointer"
          >
            {{ showConfirmPassword ? "mdi-eye-off" : "mdi-eye" }}
          </v-icon>
        </div>
         <p v-if="confirmPassword && password !== confirmPassword" style="color: red; padding-left: 50px;">
      Passwords do not match!
    </p>

        <button type="button" class="gbtn" @click="openUpload">
          Upload license image
        </button>
        <button type="button" class="btn" @click="submitForm">Continue</button>
      </div>
    </div>
  </div>

  <div class="file-upload" id="fileUpload">
    <div class="main-box">
      <div class="upload">
        <h2>Upload a File</h2>
        <h3 style="font-weight: 300">Attach your file below</h3>
        <div class="close" @click="close"></div>
      </div>
      <div
        class="box"
        @dragover.prevent="dragging = true"
        @dragleave.prevent="dragging = false"
        @drop.prevent="handleDrop"
        @click="triggerFileInput"
      >
        <h4 v-if="!imageUrl">Drag file(s) here</h4>
        <h4 v-if="!imageUrl">
          or <span style="color: #00b4d8">click here</span> to upload file
        </h4>
        <input
          type="file"
          name="file"
          id="file"
          class="file"
          hidden
          ref="fileInput"
          @change="handleFile"
          accept="image/*"
        />
        <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" width="200" />
      </div>
      <div class="upload-btn">
        <button class="c-btn" @click.stop="removeImage">Cancel</button>
        <button class="s-btn" @click="confirmImage">Submit</button>
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
      storeName: "",
      licenseNumber: "",
      phoneNumber: "",
      password: "",
      confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
      dragging: false,
      imageFile: null,
      imageUrl: null,
      selectedFile: null,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
    };
  },
  methods: {
    togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  },
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  },
    submitForm() {
      const phoneRegex = /^[6-9]\d{9}$/;
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
      if (!this.selectedFile) {
        this.showSnackbar(
          "🖼️ Please upload an image before continuing.",
          "error"
        );
        return;
      }
      this.registerStore();
    },
    async registerStore() {
      const formData = new FormData();
      formData.append("licenseImage", this.selectedFile);
      const storeData = new Blob(
        [
          JSON.stringify({
            store_name: this.storeName,
            licenseNumber: this.licenseNumber,
            phone_number: this.phoneNumber,
            password: this.password,
          }),
        ],
        { type: "application/json" }
      );
      formData.append("storeRegistrationModel", storeData);
      try {
        const response = await this.$store.dispatch("registerStore", formData);
        if (response) {
          this.showSnackbar("🎉 Store Registered Successfully", "success");
          this.$router.push("/storeLogin");
        } else {
          this.showSnackbar("😟 Store Registration Failed", "error");
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          this.showSnackbar("⚠️ License number already registered", "warning");
        } else {
          console.error(error);
          this.showSnackbar(
            "❌ An error occurred during registration",
            "error"
          );
        }
      }
    },
    showSnackbar(message, color) {
      this.snackbarMessage = message;
      this.snackbarColor = color;
      this.snackbar = true;
    },
    close() {
      document.getElementById("fileUpload").style.display = "none";
    },
    openUpload() {
      document.getElementById("fileUpload").style.display = "flex";
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFile(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.selectedFile = file;
        this.imageUrl = URL.createObjectURL(file);
      } else {
        this.showSnackbar("🖼️ Please upload an image file.", "error");
      }
    },
    handleDrop(event) {
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        this.selectedFile = file;
        this.imageUrl = URL.createObjectURL(file);
      } else {
        this.showSnackbar("🖼️ Please upload an image file.", "error");
      }
    },
    removeImage() {
      this.imageFile = null;
      this.imageUrl = null;
      this.selectedFile = null;
      this.$refs.fileInput.value = "";
    },
    confirmImage() {
      if (this.selectedFile) {
        this.close();
      } else {
        this.showSnackbar(
          "🖼️ Please upload an image before submitting.",
          "error"
        );
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Teko:wght@300..700&display=swap");

.file-upload {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.081);
  backdrop-filter: blur(10px); /* Glass effect */
  display: none;
}
.main-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  width: 550px;
  height: 450px;
  background-color: #f4f0f0;
  border-radius: 15px;
  box-shadow: 0px 0px 0px 2px #f4f0f0;
}

.upload {
  width: 90%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
.close {
  height: 50px;
  width: 50px;
  border-radius: 50px;
  /* background-color: #00acd1; */
  position: absolute;
  right: 0;
  background-image: url(D:\med_e\src\assets\cross.png);
  background-repeat: no-repeat;
  background-size: 2rem;
  background-position: 50%;
  cursor: pointer;
}
.box {
  width: 90%;
  height: 55%;
  border: 1.5px #03045e dashed;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.box:hover {
  background-color: #e7e5e580;
}
.upload-btn {
  width: 90%;
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: #03045e; */
}
.c-btn {
  width: 100px;
  height: 40px;
  border: 1px solid #03045e;
  color: #03045e;
  font-weight: 500;
  border-radius: 20px;
}
.s-btn {
  width: 130px;
  height: 40px;
  background-color: #03045e;
  color: #ffffff;
  font-weight: 500;
  border-radius: 20px;
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
  width: 55%;
  height: 100%;
  margin-right: 150px;
  padding: 80px 0px 0px 100px;
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
  width: 38%;
  height: 85%;
  background: rgba(255, 255, 255, 0.081);
  /* margin-right: 150px; */
  margin-left: 50px;
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
  background-image: url(D:\med_e\src\assets\continue.png);
  background-repeat: no-repeat;
  background-size: 1.5rem;
  background-position: 96%;
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
  background-image: url(D:\med_e\src\assets\image.png);
  background-repeat: no-repeat;
  background-size: 2rem;
  background-position: 96%;
}
</style>
