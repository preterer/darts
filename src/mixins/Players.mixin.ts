import Vue from "vue";
import Component from "vue-class-component";

import { Player } from "#/interfaces/player";

@Component
export class PlayersMixin extends Vue {
  /**
   * Gets current players list
   *
   * @returns {Player[]}
   * @memberof PlayersMixin
   */
  public getPlayers(): Player[] {
    const storePlayers = this.getStoredPlayers();
    if (storePlayers && Array.isArray(storePlayers) && storePlayers.length) {
      return storePlayers;
    }
    return this.getDefaultPlayers();
  }

  /**
   * Gets players from store
   *
   * @private
   * @returns {(Player[] | void)}
   * @memberof PlayersMixin
   */
  private getStoredPlayers(): Player[] | void {
    const storedPlayers = localStorage.getItem("players");
    if (storedPlayers) {
      return JSON.parse(storedPlayers);
    }
  }

  /**
   * Gets a new players list
   *
   * @private
   * @returns {Player[]}
   * @memberof PlayersMixin
   */
  private getDefaultPlayers(): Player[] {
    return [
      { name: "Player 1", score: 0, state: {} },
      { name: "Player 2", score: 0, state: {} }
    ];
  }
}
