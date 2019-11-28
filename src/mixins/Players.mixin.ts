import Vue from "vue";
import Component from "vue-class-component";

import { Player } from "#/interfaces/player";

@Component
export class PlayersMixin extends Vue {
  /**
   * List of players
   *
   * @type {Player[]}
   * @memberof PlayersMixin
   */
  public get players(): Player[] {
    return this.$store.state.players.list;
  }

  /**
   * Current player
   *
   * @readonly
   * @type {Player}
   * @memberof PlayersMixin
   */
  public get currentPlayer(): Player {
    return this.$store.getters["players/current"];
  }

  /**
   * Returns winner of the game if it's finished yet
   *
   * @returns {(Player | undefined)}
   * @memberof PlayersMixin
   */
  public get winner(): Player | undefined {
    return this.$store.getters["players/winner"];
  }
}
