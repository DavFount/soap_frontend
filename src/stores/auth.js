import { defineStore } from "pinia";
import axios from "axios";
import api from "../api/index";
import interceptors from "../api/interceptors";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
  }),
  actions: {
    async login(email, password) {
      try {
        const user = await axios.post(
          "http://localhost:3000/api/v1/auth/login",
          {
            email,
            password,
          }
        );
        this.user = user.data;
        localStorage.setItem("user", JSON.stringify(user.data));
        this.$router.push(this.returnUrl || "/");
      } catch (err) {
        throw err.response.data.msg;
      }
    },
    async register(firstName, lastName, email, password) {
      try {
        const user = await axios.post(
          "http://localhost:3000/api/v1/auth/register",
          {
            firstName,
            lastName,
            email,
            password,
          }
        );
        this.$router.push("/");
      } catch (err) {
        throw err.response.data.msg;
      }
    },
    async verify(token) {
      try {
        const user = await axios.post(
          "http://localhost:3000/api/v1/auth/verify",
          {
            token,
          }
        );
        this.user = user.data;
        localStorage.setItem("user", JSON.stringify(user.data));
        this.$router.push("/");
      } catch (err) {
        throw err.response.data.msg;
      }
    },
    async logout() {
      this.$router.push("/");
      this.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("users");
      localStorage.removeItem("profiles");
    },
    async refreshToken() {
      try {
        const accessToken = await api.post("auth/refresh", {
          refreshToken: this.user.refreshToken,
        });
        this.user.accessToken = accessToken.data;
        return accessToken;
      } catch (err) {
        console.error(err);
      }
    },
  },
  getters: {},
});

interceptors(useAuthStore);
