import Vue from "vue";
import Vuex, { Store } from "vuex";

import { StoreState } from "#/interfaces/storeState";
import { game } from "./modules/game.module";
import { gameMode } from "./modules/gameMode.module";
import { players } from "./modules/players.module";

Vue.use(Vuex);

export const store = new Store<StoreState>({
  modules: { gameMode, game, players }
});
