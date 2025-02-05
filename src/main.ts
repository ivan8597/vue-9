import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar } from 'quasar'; 
import 'quasar/src/css/index.sass';
import App from "./App.vue";
import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia();

app.use(Quasar);
app.use(pinia);
app.mount("#app");
