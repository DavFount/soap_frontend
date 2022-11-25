<template>
  <main class="form-signin w-100 m-auto">
    <form @submit="submitForm" class="loginForm">
      <img class="mb-4 logo" src="../assets/logo.svg" alt="" width="90" />
      <h1 class="h3 mb-3 fw-normal">Register an Account</h1>

      <div
        :class="firstNameErrors ? 'form-floating is-invalid' : 'form-floating'"
      >
        <input
          v-model="firstName"
          type="text"
          :class="firstNameErrors ? 'form-control is-invalid' : 'form-control'"
          id="first_name"
          placeholder="John"
        />
        <label for="first_name">First Name</label>
      </div>
      <div
        v-if="firstNameErrors"
        class="invalid-feedback register-invalid-feedback"
      >
        {{ firstNameErrors }}
      </div>

      <div
        :class="lastNameErrors ? 'form-floating is-invalid' : 'form-floating'"
      >
        <input
          v-model="lastName"
          type="text"
          :class="lastNameErrors ? 'form-control is-invalid' : 'form-control'"
          id="last_name"
          placeholder="Doe"
        />
        <label for="last_name">Last Name</label>
      </div>
      <div
        v-if="lastNameErrors"
        class="invalid-feedback register-invalid-feedback"
      >
        {{ lastNameErrors }}
      </div>

      <div :class="emailErrors ? 'form-floating is-invalid' : 'form-floating'">
        <input
          v-model="email"
          type="email"
          :class="emailErrors ? 'form-control is-invalid' : 'form-control'"
          id="email"
          placeholder="name@example.com"
        />
        <label for="email">Email address</label>
      </div>
      <div
        v-if="emailErrors"
        class="invalid-feedback register-invalid-feedback"
      >
        {{ emailErrors }}
      </div>

      <div
        :class="passwordErrors ? 'form-floating is-invalid' : 'form-floating'"
      >
        <input
          v-model="password"
          type="password"
          :class="passwordErrors ? 'form-control is-invalid' : 'form-control'"
          id="password"
          placeholder="Password"
        />
        <label for="password">Password</label>
      </div>
      <div
        v-if="passwordErrors"
        class="invalid-feedback register-invalid-feedback"
      >
        {{ passwordErrors }}
      </div>

      <div
        :class="
          confirmPasswordErrors ? 'form-floating is-invalid' : 'form-floating'
        "
      >
        <input
          v-model="confirmPassword"
          type="password"
          :class="
            confirmPasswordErrors ? 'form-control is-invalid' : 'form-control'
          "
          id="confirm_password"
          placeholder="Password"
        />
        <label for="confirm_password">Confirm Password</label>
      </div>
      <div
        v-if="confirmPasswordErrors"
        class="invalid-feedback register-invalid-feedback"
      >
        {{ confirmPasswordErrors }}
      </div>

      <button class="w-100 btn btn-lg btn-success" type="submit">
        Register
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
    document.title = "The SOAP Dish - Register";
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
      firstNameErrors: null,
      lastNameErrors: null,
      emailErrors: null,
      passwordErrors: null,
      confirmPasswordErrors: null,
    };
  },
  watch: {
    firstName(newValue, oldValue) {
      if (newValue.length <= 0) {
        this.firstNameErrors = "First name is required!";
      } else {
        this.firstNameErrors = null;
      }
    },
    lastName(newValue, oldValue) {
      if (newValue.length <= 0) {
        this.lastNameErrors = "Last name is required!";
      } else {
        this.lastNameErrors = null;
      }
    },
    email(newValue, oldValue) {
      if (
        !String(newValue)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        this.emailErrors = "A valid email address is required!";
      } else {
        this.emailErrors = null;
      }
    },
    password(newValue, oldValue) {
      if (newValue.length < 8) {
        this.passwordErrors = "Password must be atleast 8 characters!";
      } else {
        this.passwordErrors = null;
      }

      if (this.confirmPassword !== newValue) {
        this.confirmPasswordErrors = "Passwords Don't Match!";
      } else {
        this.confirmPasswordErrors = null;
      }
    },
    confirmPassword(newValue, oldValue) {
      if (newValue !== this.password) {
        this.confirmPasswordErrors = "Passwords Don't Match!";
      } else {
        this.confirmPasswordErrors = null;
      }
    },
  },
  methods: {
    async submitForm(e) {
      e.preventDefault();
      if (this.validateForm()) {
        return this.authStore
          .register(this.firstName, this.lastName, this.email, this.password)
          .then(() => {
            this.toast.success("Check your email to complete registration!");
          })
          .catch((error) => {
            this.toast.error(error);
          });
      } else {
        this.toast.error("Please complete the form fix your errors!");
      }
    },
    validateForm() {
      if (
        this.firstName &&
        this.lastName &&
        this.email &&
        this.password &&
        this.confirmPassword &&
        !this.firstNameErrors &&
        !this.lastNameErrors &&
        !this.emailErrors &&
        !this.passwordErrors &&
        !this.confirmPasswordErrors
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.register-invalid-feedback {
  text-align: left;
  font-size: 15px;
}

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
  top: 45%;
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
