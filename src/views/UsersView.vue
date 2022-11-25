<template>
  <section v-if="isLoading">
    <div class="spinner-border m-5" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </section>

  <UserList v-else />
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import UserList from "@/components/UserList.vue";

export default {
  name: "UsersView",
  inheritAttrs: false,
  setup() {
    const authStore = useAuthStore();
    const userStore = useUserStore();

    return {
      authStore,
      userStore,
    };
  },
  data() {
    return {
      isLoading: true,
    };
  },
  async mounted() {
    await this.userStore.getUsers();
    this.isLoading = false;
    document.title = `The SOAP Dish - Users`;
  },
  components: {
    UserList,
  },
  methods: {},
};
</script>

<style scoped>
.shadow-custom {
  box-shadow: 5px 5px 10px #111;
}
</style>
