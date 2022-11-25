<template>
  <main class="form-signin w-100 m-auto">
    <form @submit="submitForm" class="loginForm">
      <img class="mb-4 logo" src="../assets/logo.svg" alt="" width="90" />
      <h1 class="h3 mb-3 fw-normal">Please Sign In</h1>

      <div class="form-floating">
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          placeholder="name@example.com"
          required
        />
        <label for="email">Email address</label>
      </div>
      <div class="form-floating">
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          required
        />
        <label for="password">Password</label>
      </div>

      <button class="w-100 btn btn-lg btn-success" type="submit">
        Sign in
      </button>
    </form>
  </main>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useToast } from "vue-toastification";

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
    async submitForm(e) {
      e.preventDefault();

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
label {
  color: #c1c1c1;
  font-size: 20px;
}

.form-control {
  margin-top: 5px;
}
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
