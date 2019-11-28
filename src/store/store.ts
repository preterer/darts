import Vue from "vue";
import Vuex, { Store } from "vuex";

import { GameWithHistory } from "#/interfaces/gameWithHistory";
import { Player } from "#/interfaces/player";
import { DartsService } from "../services/darts.service";
import { calculation } from "./modules/calculation.module";
import { game } from "./modules/game.module";
import { players } from "./modules/players.module";

Vue.use(Vuex);

export const store = new Store<{
  calculation: {
    service: DartsService;
  };
  game: GameWithHistory;
  players: { list: Player[] };
}>({
  modules: { calculation, game, players }
});
