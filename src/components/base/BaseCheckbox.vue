<template>
  <input
    type="checkbox"
    :id="uuid"
    :checked="modelValue"
    v-bind="$attrs"
    @change="$emit('update:modelValue', $event.target.checked)"
    class="field"
  />
  <label @click="checkBox" :for="uuid" v-if="label">{{ label }}</label>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    checkBox() {
      this.$emit("update:modelValue", !this.modelValue);
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
input {
  margin-right: 5px;
}
</style>
