<template>
  <input
    v-bind="$attrs"
    :value="modelValue"
    :placeholder="label"
    :id="uuid"
    :class="{
      'is-invalid': error,
    }"
    @input="$emit('update:modelValue', $event.target.value)"
    :aria-describedby="error ? `${uuid}-error` : null"
    :aria-invalid="error ? true : null"
  />
  <div
    class="invalid-feedback"
    :id="`${uuid}-error`"
    v-if="error"
    aria-live="assertive"
  >
    {{ error }}
  </div>
  <label :class="showLabel ? 'form-label' : 'visually-hidden'" :for="uuid">{{
    label
  }}</label>
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
    showLabel: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: "",
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
.form-label {
  color: #c1c1c1;
  font-size: 20px;
}
</style>
