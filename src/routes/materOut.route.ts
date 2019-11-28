import { RouteConfig } from "vue-router";

import { MasterOutService } from "../services/masterOut.service";
import { store } from "../store/store";
import { Game } from "../views/game/Game";

export const masterOutRoute: RouteConfig = {
  name: "masterOut",
  path: "/master-out",
  component: Game,
  beforeEnter(to, from, next) {
    store.commit("calculation/setService", new MasterOutService());
    next();
  }
};
