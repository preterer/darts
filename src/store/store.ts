import Vue from "vue";
import Vuex, { Store } from "vuex";

import { GameWithHistory } from "#/interfaces/gameWithHistory";
import { Player } from "#/interfaces/player";
import { DartsService } from "../services/darts.service";
import { calculation } from "./modules/calculation.module";
import { game } from "./modules/game.module";
import { players } from "./modules/players.module";

Vue.use(Vuex);

/**
 * State of the store
 *
 * @export
 * @interface StoreState
 */
export interface StoreState {
  /**
   * Calculation module state
   *
   * @type {{ service: DartsService }}
   * @memberof StoreState
   */
  calculation: { service: DartsService };

  /**
   * Game module state
   *
   * @type {GameWithHistory}
   * @memberof StoreState
   */
  game: GameWithHistory;

  /**
   * Players module state
   *
   * @type {{ list: Player[] }}
   * @memberof StoreState
   */
  players: { list: Player[] };
}

export const store = new Store<StoreState>({
  modules: { calculation, game, players }
});
