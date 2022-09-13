<script setup lang="ts">
import NavigationComponent from "@/components/shared/NavigationComponent.vue";
import CarListComponent from "../shared/CarListComponent.vue";
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
            <CarListComponent
              :cars="state.recommendations"
              btnText="mdi-thumb-down"
              @carClicked="unrecommend"
            />
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
            <!-- TODO 7: extract the list of found and recommended cars to a shared component -->
            <TextAreaBox
              @text="searchForCars"
              btnText="Search cars"
              label="Car keywords go here"
            />
            <CarListComponent
              :cars="state.foundCars"
              btnText="mdi-thumb-up"
              @carClicked="recommend"
            />
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
