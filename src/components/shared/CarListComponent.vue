<script setup lang="ts">
import type { Car } from "@/services/CarSearch.service";

const props = defineProps<{
  btnText: string;
  cars: Car[];
}>();

const emit = defineEmits(["carClicked"]);

const carClicked = (value: Car) => emit("carClicked", value);
</script>
<template>
  <div class="car-list">
    <div v-if="props.cars.length === 0">No cars found...</div>

    <div v-for="(car, index) in props.cars" :key="index">
      <v-card class="car-card">
        <div class="car-card-text">
          {{ car.make_display }} - {{ car.model_trim }}
        </div>
        <div class="car-card-button">
          <v-btn text icon @click="carClicked(car)">
            <v-icon>{{ props.btnText }}</v-icon>
          </v-btn>
        </div>
      </v-card>
    </div>
  </div>
</template>
<style lang="scss" scoped>
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
