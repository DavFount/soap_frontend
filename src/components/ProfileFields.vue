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

      <form @submit.prevent="saveProfile">
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
                    type="submit"
                  >
                    Save
                  </button>
                  <button
                    v-if="inEditMode"
                    class="btn btn-info ms-1"
                    type="button"
                    @click="cancelEditProfile"
                  >
                    Cancel
                  </button>
                  <button
                    v-else
                    v-if="$route.params.id == authStore.user._id"
                    class="btn btn-primary ms-1"
                    type="button"
                    @click="editProfile"
                  >
                    Edit Profile
                  </button>
                  <button
                    v-if="
                      $route.params.id != authStore.user._id &&
                      !getProfileById(authStore.user._id).friends.includes(
                        $route.params.id
                      )
                    "
                    type="button"
                    class="btn btn-primary"
                    @click="followUser"
                  >
                    Follow
                  </button>
                  <button
                    v-else-if="
                      $route.params.id != authStore.user._id &&
                      getProfileById(authStore.user._id).friends.includes(
                        $route.params.id
                      )
                    "
                    type="button"
                    class="btn btn-danger"
                    @click="unfollowUser"
                  >
                    Unfollow
                  </button>
                </div>
              </div>
            </div>
            <div class="card mb-4 mb-lg-0 shadow-custom card-bg-dark">
              <div class="card-body p-0">
                <fieldset>
                  <legend class="visually-hidden">Social Links</legend>
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
                        <BaseInput
                          label="Website"
                          :showLabel="false"
                          class="form-control"
                          v-model="website"
                          type="text"
                          placeholder="Website"
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
                      <i
                        class="fab fa-twitter fa-lg"
                        style="color: #55acee"
                      ></i>
                      <p class="mb-0">
                        <BaseInput
                          label="Twitter"
                          :showLabel="false"
                          class="form-control"
                          v-model="twitter"
                          type="text"
                          placeholder="Twitter"
                          v-if="inEditMode"
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
                        <BaseInput
                          label="Instagram"
                          :showLabel="false"
                          class="form-control"
                          v-model="instagram"
                          type="text"
                          placeholder="Instagram"
                          v-if="inEditMode"
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
                        <BaseInput
                          label="Facebook"
                          :showLabel="false"
                          class="form-control"
                          v-model="facebook"
                          type="text"
                          placeholder="Facebook"
                          v-if="inEditMode"
                        />
                        <span v-else>{{ facebook }}</span>
                      </p>
                    </li>
                  </ul>
                </fieldset>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="card mb-4 shadow-custom card-bg-dark">
              <div class="card-body">
                <fieldset>
                  <legend class="visually-hidden">User Information</legend>
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
                        <BaseInput
                          label="Title"
                          :showLabel="false"
                          class="form-control"
                          v-model="title"
                          type="text"
                          placeholder="Title"
                          v-if="inEditMode"
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
                        <BaseInput
                          label="Location"
                          :showLabel="false"
                          class="form-control"
                          v-model="location"
                          type="text"
                          placeholder="Location"
                          v-if="inEditMode"
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
                        <BaseInput
                          label="Bio"
                          :showLabel="false"
                          class="form-control"
                          v-model="bio"
                          type="text"
                          placeholder="Bio"
                          v-if="inEditMode"
                        />
                        <span v-else>{{ bio }}</span>
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Language</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">
                        <BaseSelect
                          label="Language"
                          class="form-select"
                          :showLabel="false"
                          :options="languages"
                          v-model="language"
                          v-if="inEditMode"
                        />
                        <span v-else>{{
                          getLanguageById(language).name_en
                        }}</span>
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
                </fieldset>
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
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { useLanguageStore } from "@/stores/language";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import moment from "moment";

import GravatarAvatar from "@/components/GravatarAvatar.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";

export default {
  name: "ProfileFields",
  inheritAttrs: false,
  setup() {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const languageStore = useLanguageStore();
    const toast = useToast();
    const route = useRoute();

    if (!languageStore.languages) {
      languageStore.getLanguages();
    }

    return {
      authStore,
      userStore,
      languageStore,
      getUserById: userStore.getUserById,
      getProfileById: userStore.getProfileById,
      getLanguageById: languageStore.getLanguageById,
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
    languages() {
      const langArray = [];
      for (const languageId in this.languageStore.languages) {
        const language = this.getLanguageById(languageId);
        langArray.push({
          value: languageId,
          display: language.name_en,
        });
      }
      return langArray;
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
    BaseInput,
    BaseSelect,
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
      language: this.getLanguageById(
        this.getProfileById(this.$route.params.id).language
      )._id,
    };
  },
  methods: {
    async updateProfile() {
      await this.userStore.getUsers(this.authStore.user.token);
      this.title = this.getProfileById(this.$route.params.id).title;
      this.location = this.getProfileById(this.$route.params.id).location;
      this.bio = this.getProfileById(this.$route.params.id).bio;
      this.website = this.getProfileById(this.$route.params.id).website;
      this.twitter = this.getProfileById(this.$route.params.id).twitter;
      this.instagram = this.getProfileById(this.$route.params.id).instagram;
      this.facebook = this.getProfileById(this.$route.params.id).facebook;
      this.language = this.getLanguageById(
        this.getProfileById(this.$route.params.id).language
      )._id;
    },
    editProfile(e) {
      e.preventDefault();

      this.inEditMode = true;
    },
    async cancelEditProfile(e) {
      e.preventDefault();

      this.inEditMode = false;
      await this.updateProfile();
    },
    async saveProfile() {
      const values = {
        title: this.title,
        location: this.location,
        bio: this.bio,
        website: this.website,
        twitter: this.twitter,
        instagram: this.instagram,
        facebook: this.facebook,
        language: this.language,
      };

      await this.userStore.updateProfile(this.authStore.user._id, values);

      this.inEditMode = false;
      this.updateProfile();
    },
    async followUser() {
      const result = await this.userStore.followUser(
        this.authStore.user._id,
        this.$route.params.id
      );
      if (result) {
        this.toast.success(`Successfully followed ${this.fullName}.`);
        this.updateProfile();
      } else {
        this.toast.error("Something went wrong!");
      }
    },
    async unfollowUser() {
      const result = await this.userStore.unfollowUser(
        this.authStore.user._id,
        this.$route.params.id
      );
      if (result) {
        this.toast.success(`Successfully unfollowed ${this.fullName}.`);
        this.updateProfile();
      } else {
        this.toast.error("Something went wrong!");
      }
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
