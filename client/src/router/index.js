import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/edit-post",
    name: "EditPost",
    props : true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EditPost.vue"),
    beforeEnter : (to, from, next)=> {
      if(localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('token')){
        next()
      }
      else{
        next({name : 'Login', params : {error : "Please Login/SignUp before Adding a Post"}})
      }
    }
  },
  {
    path: "/view-post",
    props : true,
    name: "ViewPost",
    component: () =>
      import(/* webpackchunkname: "about" */ "../views/ViewPost.vue"),
    beforeEnter : (to, from, next)=> {
      if(to.params.id){
        next()
      }
      else{
        next({name : 'Home'})
      }
    }
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackchunkname: "about" */ "../views/SignUp.vue")
  },
  {
    path: "/login",
    name: "Login",
    props : true,
    component: () =>
      import(/* webpackchunkname: "about" */ "../views/Login.vue")
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () =>
      import(/* webpackchunkname: "about" */ "../views/ResetPassword.vue")
  },
  {
    path: "/reset/:token",
    props : true,
    name: "ChangePassword",
    component: () =>
      import(/* webpackchunkname: "about" */ "../views/ChangePassword.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackchunkname: "about" */ "../views/Dashboard.vue"),
    beforeEnter : (to, from, next)=> {
      if(localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('token')){
        next()
      }
      else{
        next({name : 'Login', params : {error : "Please Login/SignUp to view your Dashboard "}})
      }
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
