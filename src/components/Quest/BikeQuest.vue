<script setup lang="ts">
import NavigationComponent from "@/components/shared/NavigationComponent.vue";
import { reactive, ref } from "vue";

const isQuestComplete = () => false;

const text = ref<string>("");
const state = reactive<{ responses: string[] }>({ responses: [] });

const addResponse = () => {
  state.responses.push(text.value);
  text.value = "";
};
</script>

<template>
  <v-container>
    <div class="full-height">
      <navigation-component>
        <v-btn text @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn text @click="$router.go(-1)" :disabled="!isQuestComplete"
          >Complete Quest</v-btn
        >
      </navigation-component>
      <div>
        <v-card>
          <v-container>
            <h2 class="quest-header">Have a bike for me?</h2>
            <div class="quest-container">
              <div class="quest-image">
                <img height="200" src="/bike.png">
              </div>
            </div>
            <div class="quest-container">
              <p>
                I'm looking for a bike with two wheels, pedals and a saddle.
                Preferably not too far from Leuven. Leave a comment if you have
                one available.
              </p>
            </div>
          </v-container>
        </v-card>
        <v-card>
          <v-container>
            <!--TODO 1: create a text box -->
            <v-textarea auto-grow v-model="text" label="Response"></v-textarea>
            <!--TODO 2: display the response -->
            <v-card>
              {{ text }}
            </v-card>
            <!--TODO 3: add response to list + show the list of all responses -->
            <v-btn @click="addResponse" :disabled="!text">Save</v-btn>
            <p>Saved responses:</p>
            <v-card v-for="(res, index) in state.responses" :key="index">
              {{ res }}
            </v-card>
            <!--TODO 4: implement function to determine if quest is complete -->
            <!--TODO 5: add the textbox to a seperate component -->
          </v-container>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
.quest-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.quest-image {
  width: 80%;
}
</style>
