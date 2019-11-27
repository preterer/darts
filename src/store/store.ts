import Vue from "vue";
import Vuex, { Store } from "vuex";

import { game } from "./modules/game.module";
import { players } from "./modules/players.module";

Vue.use(Vuex);

export const store = new Store({
  modules: { game, players }
});
