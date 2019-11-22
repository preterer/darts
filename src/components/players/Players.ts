import Component, { mixins } from "vue-class-component";

import { Player } from "#/interfaces/player";
import { PlayersMixin } from "../../mixins/Players.mixin";
import template from "./Players.html";

@Component({ name: "Players", template })
export class Players extends mixins(PlayersMixin) {
  /**
   * Adds a player to the list
   *
   * @memberof Players
   */
  public addPlayer(): void {
    this.$store.dispatch("players/add", {
      name: `Player ${this.players.length + 1}`,
      score: 0,
      state: {}
    });
  }

  /**
   * Removes a player from the list
   *
   * @param {number} index
   * @memberof Players
   */
  public removePlayer(id: number): void {
    this.$store.dispatch("players/remove", id);
  }

  /**
   * Updates players list
   *
   * @param {Player} player
   * @memberof Players
   */
  public updatePlayer(player: Player): void {
    this.$store.dispatch("players/update", player);
  }
}
