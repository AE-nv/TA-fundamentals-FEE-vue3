import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BikeQuest from "@/components/Quest/BikeQuest.vue";
import CarQuest from "@/components/Quest/CarQuest.vue";
import ChairQuest from "@/components/Quest/ChairQuest.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/quest/bike",
      name: "bike-quest",
      component: BikeQuest,
    },
    {
      path: "/quest/car",
      name: "car-quest",
      component: CarQuest,
    },
    {
      path: "/quest/chair",
      name: "chair-quest",
      component: ChairQuest,
    },
  ],
});

export default router;
