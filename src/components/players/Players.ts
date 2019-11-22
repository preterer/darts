import Component, { mixins } from "vue-class-component";

import { Player } from "#/interfaces/player";
import { PlayersMixin } from "../../mixins/Players.mixin";
import template from "./Players.html";

@Component({ name: "Players", template })
export class Players extends mixins(PlayersMixin) {
  /**
   * List of players
   *
   * @type {Player[]}
   * @memberof Players
   */
  public players: Player[] = this.getPlayers();

  /**
   * Adds a player to the list
   *
   * @memberof Players
   */
  public addPlayer(): void {
    this.players.push({
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
  public removePlayer(index: number): void {
    if (this.players.length > 1) {
      this.players.splice(index, 1);
    }
  }

  /**
   * Saves players list to store
   *
   * @memberof Players
   */
  public savePlayers(): void {
    localStorage.setItem("players", JSON.stringify(this.players));
  }
}
