import Vue from "vue";
import VueRouter from "vue-router";

import { App } from "./App";
import { Btn } from "./components/btn/Btn";
import { router } from "./routes/router";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.component("btn", Btn);

new Vue({ render: h => h(App), router }).$mount("#app");
