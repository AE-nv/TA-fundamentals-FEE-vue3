<script setup lang="ts">
import type { IQuest } from "@/models/IQuest";

const props = defineProps<{
  quest: IQuest;
}>();
</script>

<template>
  <v-list-item :key="quest.title" :to="`/quest/${props.quest.link}`">
    <v-img
      :src="`./${props.quest.image}`"
      class="my-3"
      contain
      height="200"
    ></v-img>
    <v-list-item-title>{{ props.quest.title }}</v-list-item-title>
    <v-list-item-subtitle class="text--primary">{{
      props.quest.description
    }}</v-list-item-subtitle>
  </v-list-item>
</template>

<style></style>
