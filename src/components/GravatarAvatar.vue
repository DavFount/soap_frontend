<template>
  <img
    :src="`https://www.gravatar.com/avatar/${hash}?s=${size}&d=${defaultImg}&r=g`"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  props: {
    hash: {
      type: String,
      default: "0",
    },
    size: {
      type: Number,
      default: 500,
    },
    defaultImg: {
      type: String,
      default: "robohash",
    },
  },
};
</script>
