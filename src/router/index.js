import { createRouter, createWebHistory } from "vue-router";
// import Cookies from "js-cookie";
import ExploreView from "../layouts/ExploreView.vue";
import LandingView from "../layouts/LandingView.vue";
import AccountView from "../views/Explore/AccountView.vue";
import NotFound from "../views/Explore/NotFound.vue";
import Registration from "../views/Landing/Registration.vue";
import LoginView from "../views/Landing/LoginView.vue";
import IndexView from "../views/Landing/IndexView.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingView,
    children: [
      {
        path: "",
        name: "Index",
        component: IndexView,
      },
      {
        path: "registration",
        name: "Registration",
        component: Registration,
      },

      {
        path: "login",
        name: "Login",
        component: LoginView,
      },
    ],
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem("AccessToken"))) {
        window.location.href = "/explore";
      } else {
        next();
      }
    },
  },
  {
    path: "/explore",
    name: "Explore",
    component: ExploreView,
    children: [
      {
        path: "",
        name: "index",
        component: () => import("@/views/Explore/Products/index.vue"),
        beforeEnter: (to, from, next) => {
          if (JSON.parse(localStorage.getItem("token"))) {
            window.location.href = "/";
          } else {
            next();
          }
        },
      },
      {
        path: "products/edit/:id",
        name: "edit",
        component: () => import("@/views/Explore/Products/edit.vue"),
        beforeEnter: (to, from, next) => {
          if (JSON.parse(localStorage.getItem("token"))) {
            window.location.href = "/";
          } else {
            next();
          }
        },
      },
      {
        path: "products/view/:id",
        name: "view",
        component: () => import("@/views/Explore/Products/view.vue"),
        beforeEnter: (to, from, next) => {
          if (JSON.parse(localStorage.getItem("token"))) {
            window.location.href = "/";
          } else {
            next();
          }
        },
      },
      {
        path: "users",
        name: "user",
        component: () => import("@/views/Explore/Users/index.vue"),
        beforeEnter: (to, from, next) => {
          if (JSON.parse(localStorage.getItem("token"))) {
            window.location.href = "/";
          } else {
            next();
          }
        },
      },
      {
        path: "users/edit/:id",
        name: "users",
        component: () => import("@/views/Explore/Users/edit.vue"),
        beforeEnter: (to, from, next) => {
          if (JSON.parse(localStorage.getItem("token"))) {
            window.location.href = "/";
          } else {
            next();
          }
        },
      },
      {
        path: "users/view/:id",
        name: "users",
        component: () => import("@/views/Explore/Users/view.vue"),
        beforeEnter: (to, from, next) => {
          if (JSON.parse(localStorage.getItem("token"))) {
            window.location.href = "/";
          } else {
            next();
          }
        },
      },
      {
        path: "carts/user/:id",
        name: "carts",
        component: () => import("@/views/Explore/Carts/index.vue"),
        beforeEnter: (to, from, next) => {
          if (JSON.parse(localStorage.getItem("token"))) {
            window.location.href = "/";
          } else {
            next();
          }
        },
      },

      // Account

      {
        path: "account",
        name: "AccountView",
        component: AccountView,
        beforeEnter: (to, from, next) => {
          if (JSON.parse(localStorage.getItem("token"))) {
            window.location.href = "/";
          } else {
            next();
          }
        },
      },
    ],
    beforeEnter: (to, from, next) => {
      if (!JSON.parse(localStorage.getItem("AccessToken"))) {
        window.location.href = "/login";
      } else {
        next();
      }
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),

  routes,
});

export default router;
