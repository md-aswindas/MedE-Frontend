import { createRouter,createWebHistory } from "vue-router";
import LoginPage from "./components/LoginPage.vue";
import CreatePage from "./components/CreatePage.vue";

const router = createRouter({
  history:createWebHistory(),
  routes:[
    {path:'/',component:LoginPage},
    {path:'/createAccount',component:CreatePage},
  ],
});

export default router;