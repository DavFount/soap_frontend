<template>
  <component
    v-for="option in options"
    :key="option.value"
    :is="vertical ? 'div' : 'span'"
    :class="{
      horizontal: !vertical,
    }"
  >
    <BaseRadio
      :label="option.label"
      :value="option.value"
      :name="name"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelView', $event)"
    />
  </component>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const uuid = uuidv4();
    return {
      uuid,
    };
  },
};
</script>

<style scoped>
.horizontal {
  margin-right: 20px;
}
</style>
