<template>
  <iframe
    :src="source"
    :title="title"
    :height="height"
    :width="width"
    v-bind="$attrs"
  ></iframe>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      default: 300,
    },
    width: {
      type: Number,
      default: 100,
    },
  },
};
</script>
