import { defineStore } from "pinia";
import api from "../api/index";

export const useLanguageStore = defineStore({
  id: "language",
  state: () => ({
    languages: JSON.parse(localStorage.getItem("languages")),
  }),
  actions: {
    async getLanguages() {
      try {
        const results = await api.get("/languages");
        const languageData = {};
        results.data.forEach((language) => {
          languageData[language._id] = language;
        });
        this.languages = languageData;
        localStorage.setItem("languages", JSON.stringify(languageData));
      } catch (err) {
        throw err.response.data.msg;
      }
    },
  },
  getters: {
    getLanguageById: (state) => {
      return (id) => state.languages[id];
    },
  },
});
