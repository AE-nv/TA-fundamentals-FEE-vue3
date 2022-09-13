<script setup lang="ts">
import NavigationComponent from "@/components/shared/NavigationComponent.vue";
import { carSearchService, type Car } from "@/services/CarSearch.service";
import { reactive } from "vue";
import TextAreaBox from "../shared/TextAreaBox.vue";

const isQuestComplete = () => false;

const state = reactive<{ foundCars: Car[] }>({ foundCars: [] });

const searchForCars = (value: string) => {
  state.foundCars = carSearchService.search(value);
};
</script>

<template>
  <div>
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
          <div>
            <h2 class="quest-header">I'm looking for a car.<br /></h2>
            <div>
              <p>
                Oh no, my car broke down! Can you recommend me a new one? Search
                for cars using the inputfield below. If you find one that suits
                me, recommend it!
              </p>
              <p>My car should have:</p>
              <ul>
                <li>Room for 3 children</li>
                <li>A sporty look</li>
                <li>A lot of safety features</li>
                <li>A BMW Logo</li>
              </ul>
            </div>
          </div>
        </v-container>
      </v-card>
      <div>
        <v-card>
          <v-container>
            <h3 class="quest-header">Recommended Cars</h3>

            <!-- TODO: Show list of recommended cars -->
          </v-container>
        </v-card>
      </div>

      <div>
        <v-card>
          <v-container>
            <h3 class="quest-header">Search for Cars</h3>
            <!-- TODO 1: include the text-area-box component -->
            <TextAreaBox
              @text="searchForCars"
              btnText="Search cars"
              label="Car keywords go here"
            />
            <div v-for="(car, index) in state.foundCars" :key="index">
              <v-card class="car-card">
                {{ car.make_display }} - {{ car.model_trim }}
              </v-card>
            </div>
            <!-- TODO 2: implement function that calls the CarSearchService -->
            <!-- TODO 3: show list of cars returned by the CarSearchService -->
            <!-- TODO 4: implement function to recommend car -->
            <!-- TODO 5: implement function to unrecommend car -->
            <!-- TODO 6: implement a message to show when the list of cars is empty -->
            <!-- TODO 7: extract the list of found and recommended cars to a shared component -->
          </v-container>
        </v-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-card {
  margin-bottom: 10px;
}
</style>
