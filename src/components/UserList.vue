<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <nav aria-label="breadcrumb" class="bg-dark rounded-3 p-3 mb-4">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <RouterLink class="breadcrumb-link" to="/">Home</RouterLink>
            </li>
            <li class="breadcrumb-item">
              <RouterLink class="breadcrumb-link" to="/users">Users</RouterLink>
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="container text-center">
      <div class="row">
        <div class="col mb-4" v-for="user in userStore.users">
          <div class="card bg-dark shadow-custom">
            <GravatarAvatar
              :hash="getProfileById(user._id).avatarHash"
              :alt="`${user.firstName} ${user.lastName} Avatar`"
              class="card-img-top"
            />
            <div class="card-body">
              <h5 class="card-title">
                {{ user.firstName }} {{ user.lastName }}
              </h5>
              <h6 class="card-subtitle mb-4 text-muted">
                {{ getProfileById(user._id).title || "&nbsp;" }}
              </h6>
              <!-- <p class="card-text">
                {{ getProfileById(user._id).bio }}
              </p> -->
              <RouterLink
                class="btn btn-primary"
                :to="{
                  name: 'profile',
                  params: { id: user._id },
                }"
              >
                View Profile
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";

import GravatarAvatar from "./GravatarAvatar.vue";

export default {
  name: "UserList",
  inheritAttrs: false,
  setup() {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const toast = useToast();
    const route = useRoute();

    return {
      authStore,
      userStore,
      getProfileById: userStore.getProfileById,
      toast,
      route,
    };
  },
  async mounted() {},
  computed: {},
  components: {
    GravatarAvatar,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.card-img-top {
  scale: 90%;
  border: 1px solid rgba(216, 154, 46, 1);
  box-shadow: 5px 5px 10px #111;
  border-radius: 8px;
}
.shadow-custom {
  box-shadow: 5px 5px 10px #111;
}

.card {
  width: 16rem;
  height: 25rem;
}
</style>
