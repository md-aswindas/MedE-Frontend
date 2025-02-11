import { createRouter,createWebHistory } from "vue-router";
// import LoginPage from "./components/LoginPage.vue";
// import CreatePage from "./components/CreatePage.vue";

const router = createRouter({
  history:createWebHistory(),
  routes:[
    {path:'/',component:()=>import('./components/LoginPage.vue')},
    {path:'/createAccount',component:()=>import('./components/CreatePage.vue') },
    {path:'/userhome',component:()=>import('./components/UserHome.vue')}
  ],
});

export default router;
