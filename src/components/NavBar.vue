<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top border-bottom-nav"
  >
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/"> The SOAP Dish </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink
              :class="$route.fullPath == '/' ? 'nav-link active' : 'nav-link'"
              to="/"
              >Home</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              :class="
                $route.fullPath == '/about' ? 'nav-link active' : 'nav-link'
              "
              to="/about"
              >About</RouterLink
            >
          </li>
          <!-- <li class="nav-item">
            <a href="https://discord.gg/chaox" class="nav-link" target="_blank"
              >Join our Discord</a
            >
          </li> -->
          <li class="nav-item dropdown text-bg-dark">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul style="margin: 0" class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li>
        </ul>
        <div v-if="!authStore.user">
          <RouterLink class="btn btn-outline-success" to="/login"
            >Login</RouterLink
          >
          <RouterLink
            style="margin-left: 10px; margin-right: 10px"
            class="btn btn-outline-primary btn-nav"
            to="/register"
            >Register</RouterLink
          >
        </div>
        <div v-else>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 dropdown-right">
            <li class="nav-item dropdown text-bg-dark">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Welcome {{ name }}
              </a>
              <ul style="margin: 0" class="dropdown-menu">
                <li>
                  <RouterLink
                    class="dropdown-item"
                    :to="{
                      name: 'profile',
                      params: { id: authStore.user._id },
                    }"
                  >
                    Profile
                  </RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/users"
                    >Users</RouterLink
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" @click="logout"> Logout </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useToast } from "vue-toastification";

export default {
  name: "NavBar",
  setup() {
    const authStore = useAuthStore();
    const toast = useToast();

    return {
      authStore,
      toast,
    };
  },
  data() {
    return {};
  },
  components: {},
  computed: {
    name() {
      return this.authStore.user.firstName;
    },
  },
  methods: {
    logout() {
      this.authStore.logout();
      this.toast.success("Successfully Logged Out");
    },
  },
};
</script>

<style scoped>
.dropdown-right {
  margin-right: 15px !important;
}
</style>
