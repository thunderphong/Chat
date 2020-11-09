import { createApp } from "vue";

import App from "./App.vue";
import router from "./router.js";
import store from "./store/index.js";

import TheHeader from "./components/layout/TheHeader.vue";
import Button from "./components/UI/Button.vue";

const app = createApp(App);

app.use(router);
app.use(store);

app.component("the-header", TheHeader);
app.component("my-button", Button);

app.mount("#app");
