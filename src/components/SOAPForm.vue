<template>
  <div class="soap-form">
    <!-- Scripture -->
    <div class="card bg-dark shadow-custom">
      <div class="card-body">
        <h5 class="card-title">Scripture</h5>
        <p class="card-text">
          Write out the verse. Document which book, chapter and verse. It also helps to document
          the Bible translation.
        </p>
        <p class="card-text">
          <div class="editor">
            <QuillEditor theme="snow" toolbar="essential" contentType="html" v-model:content="scripture" />
          </div>
        </p>
      </div>
    </div>

    <!-- Observation -->
    <div class="card bg-dark mt-3 shadow-custom">
      <div class="card-body">
        <h5 class="card-title">Observation</h5>
        <p class="card-text">
          What jumps out at you? What words repeat? Who is the author? Who is
          the audience? Where is this taking place? What is the message?
        </p>
        <p class="card-text">
          <div class="editor">
            <QuillEditor theme="snow" toolbar="essential" contentType="html" v-model:content="observation" />
          </div>
        </p>
      </div>
    </div>

    <!-- Application -->
    <div class="card bg-dark mt-3 shadow-custom">
      <div class="card-body">
        <h5 class="card-title">Application</h5>
        <p class="card-text">
          How can you apply this to your life? How would your life look
          differently if you applied this to your life?
        </p>
        <p class="card-text">
          <div class="editor">
            <QuillEditor theme="snow" toolbar="essential" contentType="html" v-model:content="application" />
          </div>
        </p>
      </div>
    </div>

    <!-- Prayer -->
    <div class="card bg-dark mt-3 shadow-custom">
      <div class="card-body">
        <h5 class="card-title">Prayer</h5>
        <p class="card-text">
          What do you need help with? Ask God to help you apply the message to
          your life. Ask for clarity on the passage.
        </p>
        <p class="card-text">
          <div class="editor">
            <QuillEditor theme="snow" toolbar="essential" contentType="html" v-model:content="prayer" />
          </div>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "./base/BaseInput.vue";
import BaseCheckbox from "./base/BaseCheckbox.vue";
import { QuillEditor } from "@vueup/vue-quill";

export default {
  setup() {},
  data() {
    return {
      scripture: null,
      observation: null,
      application: null,
      prayer: null,
    };
  },
  watch: {
    scripture(newVal, oldVal){
      console.log(newVal);
    }
  },
  props: {},
  methods: {},
  components: {
    BaseInput,
    BaseCheckbox,
    QuillEditor,
  },
};
</script>

<style scoped>
.shadow-custom {
  border: 1px solid #000;
  box-shadow: 5px 5px 10px #111;
}

.editor {
  box-shadow: 5px 5px 10px #111;
}
</style>
