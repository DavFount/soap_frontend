import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import VerifyView from "../views/VerifyView.vue";
import ProfileView from "../views/ProfileView.vue";
import UsersView from "../views/UsersView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/verify",
      name: "verify",
      component: VerifyView,
    },
    {
      path: "/profile/:id",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/users",
      name: "users",
      component: UsersView,
    },
  ],
});

router.beforeEach(async (to, from) => {
  const publicPages = ["/", "/login", "/register", "/verify"];
  const authRequired = !publicPages.includes(to.path);
  const loginPages = ["/login", "/register"];
  const preventPage = loginPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return "/login";
  } else if (preventPage && auth.user) {
    return from.fullPath;
  }
});

export default router;
