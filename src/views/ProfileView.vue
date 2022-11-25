<template>
  <section v-if="isLoading">
    <div class="spinner-border m-5" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </section>
  <ProfileFields v-else />
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import ProfileFields from "@/components/ProfileFields.vue";

export default {
  name: "ProfileView",
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
  },
  components: {
    ProfileFields,
  },
  methods: {},
};
</script>

<style scoped>
.shadow-custom {
  box-shadow: 5px 5px 10px #111;
}
</style>
