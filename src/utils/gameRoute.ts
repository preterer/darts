import { RouteConfig } from "vue-router";

import { Button } from "#/interfaces/button";
import { DartsService } from "../services/darts.service";
import { store } from "../store/store";
import { Game } from "../views/game/Game";

export function gameRoute(
  name: string,
  path: string,
  title: string,
  service: DartsService,
  missButton: Button
): RouteConfig {
  return {
    name,
    path,
    component: Game,
    meta: { game: true, title },
    beforeEnter(to, from, next) {
      store.commit("gameMode/setService", service);
      store.commit("gameMode/setMissButton", missButton);
      next();
    }
  };
}
