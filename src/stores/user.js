import { defineStore } from "pinia";
import api from "../api/index";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    users: JSON.parse(localStorage.getItem("users")),
    profiles: JSON.parse(localStorage.getItem("profiles")),
  }),
  actions: {
    async getUsers() {
      try {
        const results = await api.get("/users");
        let usersList = {};
        results.data.users.forEach((user) => {
          usersList[user._id] = user;
        });

        let userProfiles = {};
        results.data.profiles.forEach((profile) => {
          userProfiles[profile.userId] = profile;
        });
        this.users = usersList;
        this.profiles = userProfiles;
        localStorage.setItem("users", JSON.stringify(usersList));
        localStorage.setItem("profiles", JSON.stringify(userProfiles));
      } catch (err) {
        console.error(err);
      }
    },
    async updateProfile(userId, values) {
      try {
        const results = await api.put(`/users/${userId}`, values);
        return true;
      } catch (err) {
        console.error(err);
      }
    },
  },
  getters: {
    getUserById: (state) => {
      return (userId) => state.users[userId];
    },
    getProfileById: (state) => {
      return (userId) => state.profiles[userId];
    },
  },
});
