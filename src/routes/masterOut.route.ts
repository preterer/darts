import { RouteConfig } from "vue-router";

import { MasterOutService } from "../services/masterOut.service";
import { store } from "../store/store";
import { Game } from "../views/game/Game";

export const masterOutRoute: RouteConfig = {
  name: "masterOut",
  path: "/master-out",
  component: Game,
  beforeEnter(to, from, next) {
    store.commit("gameMode/setService", new MasterOutService());
    store.commit("gameMode/setMissButton", {
      text: "Miss",
      score: 25,
      class: "btn-100 btn-danger",
      alwaysNegative: true
    });
    next();
  }
};
