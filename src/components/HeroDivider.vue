<template>
  <div class="b-divider" v-if="!lastItem"></div>
  <div class="b-divider mb-0" v-else></div>
</template>

<script>
export default {
  setup() {},
  props: {
    lastItem: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.b-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}
</style>