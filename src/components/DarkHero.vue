<template>
  <main>
    <div class="bg-dark text-secondary px-4 py-5 text-center">
      <div class="py-5">
        <h1 class="display-5 fw-bold text-white">{{ title }}</h1>
        <div class="col-lg-6 mx-auto">
          <p class="fs-5 mb-4">
            <slot></slot>
          </p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center" v-if="useButton">
            <a :href="buttonLink" class="btn btn-outline-info px-4 me-sm-3 fw-bold" target="_blank">{{ buttonText }}</a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "DarkHero",
  inheritAttrs: false,
  setup() {},
  props: {
    title: {
      type: String,
      required: true,
    },
    useButton: {
      type: Boolean,
      required: false,
      default: false
    },
    buttonText: {
      type: String,
      required: false
    },
    buttonLink: {
      type: String,
      required: false,
      default: "#"
    }
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.btn-outline-info {
  border-color: rgba(216, 154, 46, 0.5);
  color: rgba(216, 154, 46, 1);
}

.btn-outline-info:hover {
  border: 1px solid #111 !important;
  background-color: rgba(112, 18, 18, 0.75) !important;
  color: #111 !important;
}
</style>