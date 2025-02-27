import { createRouter,createWebHistory } from "vue-router";
// import LoginPage from "./components/LoginPage.vue";
// import CreatePage from "./components/CreatePage.vue";

const router = createRouter({
  history:createWebHistory(),
  routes:[
    {path:'/userLogin',component:()=>import('./components/LoginPage.vue')},
    {path:'/createAccount',component:()=>import('./components/CreatePage.vue') },
    {path:'/',component:()=>import('./components/UserHome.vue')},
    {path:'/storeLogin',component:()=> import('./components/StoreLogin.vue')},
    {path:'/storeRegistration', component:()=> import('./components/StoreRegistration.vue')},
    {path:'/UserHomeMain',component:()=> import('./components/UserstoreHome.vue')},
    {path:'/products',component:()=> import('./components/ProductsPage.vue')},
    {path:'/cart',component:()=> import('./components/CartPage.vue')}
  ],
});

export default router;
