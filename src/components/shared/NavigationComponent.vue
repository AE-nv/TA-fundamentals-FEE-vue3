<script setup lang="ts"></script>
<template>
  <v-app-bar app>
    <v-toolbar-items class="v-toolbar-items">
      <slot></slot>
    </v-toolbar-items>
  </v-app-bar>
</template>

<style lang="scss">
.v-toolbar-items {
  justify-content: space-between;
  padding: 0;
  display: flex;
  width: 100%;
}
</style>
