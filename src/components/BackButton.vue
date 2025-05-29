<template>
  <button class="back"><v-icon>mdi-arrow-left</v-icon></button>
</template>

<script>
export default {
  methods: {
    goBack() {
      if (window.history.length > 1) {
        this.$router.back();
      } else {
        this.$router.push('/');
      }
    }
  }
}
</script>

<style>
.back{
  margin-right: 30px;
  background-color: #03045e;
  color: #ffffff;
  height: 30px;
  width: 30px;
  border-radius: 50px;
}
</style>