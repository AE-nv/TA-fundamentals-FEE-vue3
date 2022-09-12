import "vuetify/styles"; // Global CSS has to be imported
import "@mdi/font/css/materialdesignicons.css";
import { createApp } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import router from "./router";
import App from "./App.vue";

const app = createApp(App);
const vuetify = createVuetify({ components, directives }); // Replaces new Vuetify()
app.use(router);
app.use(vuetify);

app.mount("#app");
