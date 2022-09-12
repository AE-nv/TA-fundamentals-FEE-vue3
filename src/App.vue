<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <v-app>
    <v-main fluid>
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
.v-card {
  margin: 10px;
}

ul {
  list-style-type: disc;
  margin-left: 40px;
}
</style>
