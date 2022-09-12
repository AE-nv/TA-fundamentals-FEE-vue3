<script setup lang="ts">
import type { IQuest } from "@/models/IQuest";
import { reactive } from "vue";
import { questService } from "@/services/Quest.service";
import HeaderComponent from "@/components/shared/HeaderComponent.vue";
import QuestTile from "./QuestTile.vue";

const state: { quests: IQuest[] } = reactive({
  quests: [],
});

state.quests = questService.getAllQuests();
</script>

<template>
  <div>
    <HeaderComponent></HeaderComponent>

    <v-container fluid>
      <!-- <v-row justify="center" class="test"> -->
      <v-list class="quest-list">
        <v-card
          class="quest-card"
          v-for="(quest, index) in state.quests"
          :key="index"
        >
          <v-container>
            <quest-tile v-bind:quest="quest"></quest-tile>
          </v-container>
        </v-card>
      </v-list>
      <!-- </v-row> -->
    </v-container>
  </div>
</template>

<style>
.quest-header {
  text-align: center;
}

.quest-card {
  width: 33%;
}

.quest-list {
  display: flex;
}
</style>
