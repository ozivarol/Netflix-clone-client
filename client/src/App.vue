<template>

  <router-view></router-view>
  <FooterComponent v-if="route.name === video" />
</template>
<script setup>

import FooterComponent from "./components/FooterBar.vue";
import { useRoute } from "vue-router";

const route = useRoute();




</script>

