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
    {path:'/cart-',component:()=> import('./components/CartPage.vue')},
    {path:'/search',component:()=> import('./components/SearchProduct.vue')},
    {path:'/storeHome',component:()=> import('./components/StoreHome.vue')},
    {path:'/admin',component:()=> import('./components/AdminLogin.vue')},
    {path:'/adminp',component:()=> import('./components/NewAdminHome.vue')},
    {path:'/adminHome',component:()=> import('./components/AdminHome.vue')},
    {path:'/rejected',component:()=> import('./components/RejectPage.vue')},
    {path:'/pending',component:()=> import('./components/PendingPage.vue')},
    {path: '/productView/:id', component:()=> import('./components/ProductView.vue')},
    // {path: '/userProfile', component:()=> import('./components/UserProfile.vue')},
    {path: '/cart', component:()=> import('./components/TestPage.vue')},
    {path: '/userProfile', component:()=> import('./components/UserDashboard.vue')},
    {path: '/checkout2', component:()=> import('./components/CheckOut2.vue')},
    // {path:'/addProduct',component:()=> import('./components/AddProduct.vue')}
  ],
});

export default router;
