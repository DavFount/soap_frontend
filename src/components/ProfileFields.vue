<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col">
          <nav aria-label="breadcrumb" class="bg-dark rounded-3 p-3 mb-4">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <RouterLink class="breadcrumb-link" to="/">Home</RouterLink>
              </li>
              <li class="breadcrumb-item">
                <RouterLink class="breadcrumb-link" to="/users"
                  >Users</RouterLink
                >
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Profile - {{ fullName }}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <form>
        <div class="row">
          <div class="col-lg-4">
            <div class="card mb-4 shadow-custom card-bg-dark">
              <GravatarAvatar
                :hash="getProfileById($route.params.id).avatarHash"
                :alt="`${fullName} Avatar`"
                class="card-img-top"
              />
              <div class="card-body text-center">
                <h5 class="my-3">{{ fullName }}</h5>
                <p class="text-muted mb-1">
                  {{ getProfileById($route.params.id).title }}
                </p>
                <p class="text-muted mb-4">
                  {{ getProfileById($route.params.id).location }}
                </p>
                <div class="d-flex justify-content-center mb-2">
                  <button
                    v-if="inEditMode"
                    class="btn btn-primary ms-1"
                    @click="saveProfile"
                  >
                    Save
                  </button>
                  <button
                    v-if="inEditMode"
                    class="btn btn-info ms-1"
                    @click="cancelEditProfile"
                  >
                    Cancel
                  </button>
                  <button
                    v-else
                    v-if="$route.params.id == authStore.user._id"
                    class="btn btn-primary ms-1"
                    @click="editProfile"
                  >
                    Edit Profile
                  </button>
                  <button
                    v-if="$route.params.id != authStore.user._id"
                    type="button"
                    class="btn btn-primary"
                  >
                    Follow
                  </button>
                </div>
              </div>
            </div>
            <div class="card mb-4 mb-lg-0 shadow-custom card-bg-dark">
              <div class="card-body p-0">
                <ul class="list-group list-group-flush rounded-3">
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center p-3 bg-dark text-light"
                    v-if="!socials && !inEditMode"
                  >
                    <p class="mb-0">No Socials</p>
                  </li>
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center p-3 bg-dark text-light"
                    v-if="
                      getProfileById($route.params.id).website || inEditMode
                    "
                  >
                    <i class="fas fa-globe fa-lg text-warning"></i>
                    <p class="mb-0">
                      <input
                        id="website"
                        type="text"
                        class="form-control"
                        placeholder="Website"
                        v-model="website"
                        v-if="inEditMode"
                      />
                      <span v-else> {{ website }}</span>
                    </p>
                  </li>
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center p-3 bg-dark text-light"
                    v-if="
                      getProfileById($route.params.id).twitter || inEditMode
                    "
                  >
                    <i class="fab fa-twitter fa-lg" style="color: #55acee"></i>
                    <p class="mb-0">
                      <input
                        id="twitter"
                        type="text"
                        class="form-control"
                        placeholder="Twitter"
                        v-if="inEditMode"
                        v-model="twitter"
                      />
                      <span v-else>{{ twitter }}</span>
                    </p>
                  </li>
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center p-3 bg-dark text-light"
                    v-if="
                      getProfileById($route.params.id).instagram || inEditMode
                    "
                  >
                    <i
                      class="fab fa-instagram fa-lg"
                      style="color: #ac2bac"
                    ></i>
                    <p class="mb-0">
                      <input
                        id="instagram"
                        type="text"
                        class="form-control"
                        placeholder="Instagram"
                        v-if="inEditMode"
                        v-model="instagram"
                      />
                      <span v-else>{{ instagram }}</span>
                    </p>
                  </li>
                  <li
                    class="list-group-item d-flex justify-content-between align-items-center p-3 bg-dark text-light"
                    v-if="
                      getProfileById($route.params.id).facebook || inEditMode
                    "
                  >
                    <i
                      class="fab fa-facebook-f fa-lg"
                      style="color: #3b5998"
                    ></i>
                    <p class="mb-0">
                      <input
                        id="facebook"
                        type="text"
                        class="form-control"
                        placeholder="Facebook"
                        v-if="inEditMode"
                        v-model="facebook"
                      />
                      <span v-else>{{ facebook }}</span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="card mb-4 shadow-custom card-bg-dark">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Full Name</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">{{ fullName }}</p>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Title</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">
                      <input
                        id="title"
                        type="text"
                        class="form-control"
                        placeholder="Title"
                        maxlength="25"
                        v-if="inEditMode"
                        v-model="title"
                      />
                      <span v-else>{{ title }}</span>
                    </p>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Location</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">
                      <input
                        id="location"
                        type="text"
                        class="form-control"
                        placeholder="Location"
                        v-if="inEditMode"
                        v-model="location"
                      />
                      <span v-else>{{ location }}</span>
                    </p>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Bio</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">
                      <input
                        id="bio"
                        type="text"
                        class="form-control"
                        placeholder="Bio"
                        v-model="bio"
                        v-if="inEditMode"
                      />
                      <span v-else>{{ bio }}</span>
                    </p>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Joined</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">
                      {{ joinDate }}
                    </p>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Updated</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">
                      {{ lastUpdate }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <!-- <div class="card mb-4 mb-md-0 shadow-custom card-bg-dark">
                  <div class="card-body">
                    <p class="mb-4">
                      <span class="text-primary font-italic me-1"
                        >assigment</span
                      >
                      Project Status
                    </p>
                    <p class="mb-1" style="font-size: 0.77rem">Web Design</p>
                    <div class="progress rounded" style="height: 5px">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 80%"
                        aria-valuenow="80"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="mt-4 mb-1" style="font-size: 0.77rem">
                      Website Markup
                    </p>
                    <div class="progress rounded" style="height: 5px">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 72%"
                        aria-valuenow="72"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="mt-4 mb-1" style="font-size: 0.77rem">One Page</p>
                    <div class="progress rounded" style="height: 5px">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 89%"
                        aria-valuenow="89"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="mt-4 mb-1" style="font-size: 0.77rem">
                      Mobile Template
                    </p>
                    <div class="progress rounded" style="height: 5px">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 55%"
                        aria-valuenow="55"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="mt-4 mb-1" style="font-size: 0.77rem">
                      Backend API
                    </p>
                    <div class="progress rounded mb-2" style="height: 5px">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 66%"
                        aria-valuenow="66"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card mb-4 mb-md-0 shadow-custom card-bg-dark">
                  <div class="card-body">
                    <p class="mb-4">
                      <span class="text-primary font-italic me-1"
                        >assigment</span
                      >
                      Project Status
                    </p>
                    <p class="mb-1" style="font-size: 0.77rem">Web Design</p>
                    <div class="progress rounded" style="height: 5px">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 80%"
                        aria-valuenow="80"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="mt-4 mb-1" style="font-size: 0.77rem">
                      Website Markup
                    </p>
                    <div class="progress rounded" style="height: 5px">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 72%"
                        aria-valuenow="72"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="mt-4 mb-1" style="font-size: 0.77rem">One Page</p>
                    <div class="progress rounded" style="height: 5px">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 89%"
                        aria-valuenow="89"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="mt-4 mb-1" style="font-size: 0.77rem">
                      Mobile Template
                    </p>
                    <div class="progress rounded" style="height: 5px">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 55%"
                        aria-valuenow="55"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p class="mt-4 mb-1" style="font-size: 0.77rem">
                      Backend API
                    </p>
                    <div class="progress rounded mb-2" style="height: 5px">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 66%"
                        aria-valuenow="66"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import moment from "moment";

import GravatarAvatar from "@/components/GravatarAvatar.vue";

export default {
  name: "ProfileFields",
  inheritAttrs: false,
  setup() {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const toast = useToast();
    const route = useRoute();

    return {
      authStore,
      userStore,
      getUserById: userStore.getUserById,
      getProfileById: userStore.getProfileById,
      toast,
      route,
    };
  },
  async created() {
    document.title = `The SOAP Dish - ${this.fullName}`;
    this.updateProfile();
  },
  async mounted() {},
  computed: {
    fullName() {
      return (
        this.getUserById(this.$route.params.id).firstName +
        " " +
        this.getUserById(this.$route.params.id).lastName
      );
    },
    email() {
      return this.getUserById(this.$route.params.id).email;
    },
    socials() {
      const profile = this.getProfileById(this.$route.params.id);
      return (
        profile.website ||
        profile.twitter ||
        profile.instagram ||
        profile.facebook
      );
    },
    joinDate() {
      const createdAt = this.getProfileById(this.$route.params.id).createdAt;
      return moment(createdAt).format("MMM Do YYYY");
    },
    lastUpdate() {
      const updatedAt = this.getProfileById(this.$route.params.id).updatedAt;
      return moment(updatedAt).fromNow();
    },
  },
  components: {
    GravatarAvatar,
  },
  data() {
    return {
      inEditMode: false,
      title: this.getProfileById(this.$route.params.id).title,
      location: this.getProfileById(this.$route.params.id).location,
      bio: this.getProfileById(this.$route.params.id).bio,
      website: this.getProfileById(this.$route.params.id).website,
      twitter: this.getProfileById(this.$route.params.id).twitter,
      instagram: this.getProfileById(this.$route.params.id).instagram,
      facebook: this.getProfileById(this.$route.params.id).facebook,
      options: this.getProfileById(this.$route.params.id).options,
    };
  },
  methods: {
    async updateProfile() {
      await this.userStore.getUsers(this.authStore.user.token);
    },
    editProfile(e) {
      e.preventDefault();

      this.inEditMode = true;
    },
    cancelEditProfile(e) {
      e.preventDefault();

      this.inEditMode = false;
    },
    async saveProfile(e) {
      e.preventDefault();
      const values = {
        title: this.title,
        location: this.location,
        bio: this.bio,
        website: this.website,
        twitter: this.twitter,
        instagram: this.instagram,
        facebook: this.facebook,
        options: {
          showEmail: false,
          showPhone: false,
          showMobile: false,
        },
      };

      await this.userStore.updateProfile(this.authStore.user._id, values);

      this.inEditMode = false;
      this.updateProfile();
    },
  },
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
</style>
