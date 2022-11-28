<template>
  <input
    type="radio"
    :id="uuid"
    :checked="modelValue == value"
    :value="value"
    v-bind="$attrs"
    @change="$emit('update:modelValue', value)"
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
      type: [String, Number],
      default: "",
    },
    value: {
      type: [String, Number],
      required: true,
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
