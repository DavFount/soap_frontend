<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="submitForm" class="loginForm">
      <img class="mb-4 logo" src="../assets/logo.svg" alt="" width="90" />
      <h1 class="h3 mb-3 fw-normal">Please Sign In</h1>

      <fieldset>
        <legend class="visually-hidden">Please Sign In</legend>
        <div class="form-floating">
          <BaseInput
            v-model="email"
            label="Email"
            type="email"
            class="form-control"
            :showLabel="true"
            required
          />
        </div>
        <div class="form-floating">
          <BaseInput
            v-model="password"
            label="Password"
            type="password"
            class="form-control mt-1"
            :showLabel="true"
            required
          />
        </div>

        <button class="w-100 btn btn-lg btn-success" type="submit">
          Sign in
        </button>
      </fieldset>
    </form>
  </main>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useToast } from "vue-toastification";

import BaseInput from "@/components/base/BaseInput.vue";

export default {
  name: "LoginView",
  inheritAttrs: false,
  setup() {
    const authStore = useAuthStore();
    const toast = useToast();
    return {
      authStore,
      toast,
    };
  },
  components: {
    BaseInput,
  },
  created() {
    document.title = "The SOAP Dish - Login";
  },
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async submitForm() {
      if (this.email && this.password) {
        return this.authStore
          .login(this.email, this.password)
          .then(() => {
            this.toast.success("Successfully Logged In");
          })
          .catch((error) => {
            console.log(error);
            this.toast.error(error);
          });
      }
    },
    logout() {
      this.authStore.logout();
    },
  },
};
</script>

<style scoped>
.loginForm {
  min-width: 500px;
  position: absolute;
  text-align: center;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5rem;
}

@media (max-width: 500px) {
  .loginForm {
    min-width: 90%;
  }
}
</style>
