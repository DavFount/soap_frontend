<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <NavBar />
  <br /><br /><br />
  <RouterView class="main-content" />

  <div class="clear"></div>
  <Footer class="fixed-bottom" />
</template>

<style scoped>
.clear {
  clear: both;
  height: 60px;
}
.main-content {
  margin-top: 1rem;
  margin-bottom: 3rem;
}
</style>
