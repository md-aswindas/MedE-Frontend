<template>
  <v-app>
    <v-main>
      
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {
  
  },

  data: () => ({
    //
  }),

  created() {
  const userId = sessionStorage.getItem("user_id");
  if (userId) {
    this.$store.dispatch("EndUser/fetchcartProducts", { userId });
  }
},

}
</script>
