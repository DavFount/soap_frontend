<template>
  <main></main>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useToast } from "vue-toastification";

export default {
  name: "VerifyView",
  inheritAttrs: false,
  setup() {
    const authStore = useAuthStore();
    const toast = useToast();
    return {
      authStore,
      toast,
    };
  },
  async mounted() {
    const token = this.$route.query.t;
    if (token) {
      try {
        await this.authStore.verify(token);
        this.toast.success("Your account has been verified.");
      } catch (err) {
        this.toast.error(err);
        this.$router.push("/");
      }
    } else {
      this.$router.push("/");
    }
  },
  created() {
    document.title = "The SOAP Dish - Verify";
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
