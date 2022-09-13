<script setup lang="ts">
import NavigationComponent from "@/components/shared/NavigationComponent.vue";
import { carSearchService, type Car } from "@/services/CarSearch.service";
import { reactive } from "vue";
import TextAreaBox from "../shared/TextAreaBox.vue";

const isQuestComplete = () => {
  return !!state.recommendations.find((car: Car) =>
    car.make_display.toLowerCase().includes("bmw")
  );
};

const state = reactive<{ foundCars: Car[]; recommendations: Car[] }>({
  foundCars: [],
  recommendations: [],
});

const searchForCars = (value: string) => {
  state.foundCars = carSearchService.search(value);
};

const recommend = (value: Car) => {
  state.recommendations.push(value);
  state.foundCars.splice(state.foundCars.indexOf(value), 1);
};

const unrecommend = (value: Car) => {
  state.foundCars.push(value);
  state.recommendations.splice(state.recommendations.indexOf(value), 1);
};
</script>

<template>
  <div>
    <navigation-component>
      <v-btn text @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn text @click="$router.go(-1)" :disabled="!isQuestComplete()"
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
            <div v-for="(car, index) in state.recommendations" :key="index">
              <v-card class="car-card">
                <div class="car-card-text">
                  {{ car.make_display }} - {{ car.model_trim }}
                </div>
                <div class="car-card-button">
                  <v-btn text icon @click="unrecommend(car)">
                    <v-icon>mdi-thumb-down</v-icon>
                  </v-btn>
                </div>
              </v-card>
            </div>
          </v-container>
        </v-card>
      </div>

      <div>
        <v-card>
          <v-container>
            <h3 class="quest-header">Search for Cars</h3>
            <!-- TODO 1: include the text-area-box component -->
            <!-- TODO 2: implement function that calls the CarSearchService -->
            <!-- TODO 3: show list of cars returned by the CarSearchService -->
            <!-- TODO 4: implement function to recommend car -->
            <!-- TODO 5: implement function to unrecommend car -->
            <!-- TODO 6: implement a message to show when the list of cars is empty -->
            <TextAreaBox
              @text="searchForCars"
              btnText="Search cars"
              label="Car keywords go here"
            />
            <div v-for="(car, index) in state.foundCars" :key="index">
              <v-card class="car-card">
                <div class="car-card-text">
                  {{ car.make_display }} - {{ car.model_trim }}
                </div>
                <div class="car-card-button">
                  <v-btn flat icon @click="recommend(car)"
                    ><v-icon>mdi-thumb-up</v-icon></v-btn
                  >
                </div>
              </v-card>
            </div>
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

.car-card {
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &-button {
    width: 50%;
    display: flex;
    justify-content: flex-end;
  }

  &-text {
    display: flex;
    align-items: center;
    width: 50%;
  }
}
</style>
