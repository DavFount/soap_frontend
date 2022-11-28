<template>
  <select
    :value="modelValue"
    :id="uuid"
    :class="{
      'is-invalid': error,
    }"
    v-bind="{
      ...$attrs,
      onChange: ($event) => {
        $emit('update:modelValue', $event.target.value);
      },
    }"
    :aria-describedby="error ? `${uuid}-error` : null"
    :aria-invalid="error ? true : null"
  >
    <option
      v-for="option in options"
      :value="option.value"
      :key="option.value"
      :selected="option.value === modelValue"
    >
      {{ option.display }}
    </option>
  </select>
  <div
    class="invalid-feedback"
    :id="`${uuid}-error`"
    v-if="error"
    aria-live="assertive"
  >
    {{ error }}
  </div>
  <label
    v-if="label"
    :class="showLabel ? 'form-label' : 'visually-hidden'"
    :for="uuid"
    >{{ label }}</label
  >
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
      type: [Array, String, Number],
      default: [],
    },
    options: {
      type: Array,
      required: true,
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
  data() {
    return {};
  },
  mounted() {},
  setup() {
    const uuid = uuidv4();
    return {
      uuid,
    };
  },
};
</script>

<style scoped>
select:not([multiple]) {
  height: 3.5rem;
}
</style>
