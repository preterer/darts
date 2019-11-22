import Vue from "vue";
import VueRouter from "vue-router";

import { App } from "./App";
import { router } from "./routes/router";
import { Button } from "./components/button/Button";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.component("btn", Button);

new Vue({ render: h => h(App), router }).$mount("#app");
