import { Button } from "#/interfaces/button";
import { Player } from "#/interfaces/player";
import { store } from "../store/store";

export class DartsService {
  /**
   * Current multiplier
   *
   * @readonly
   * @private
   * @type {number}
   * @memberof DartsService
   */
  public get multiplier(): number {
    return store.state.game.multiplier;
  }

  /**
   * Currently throwing player
   *
   * @readonly
   * @private
   * @type {Player}
   * @memberof DartsService
   */
  public get currentPlayer(): Player {
    return store.getters["players/current"];
  }

  /**
   * Scores a player throw
   *
   * @param {Button} button
   * @memberof DartsService
   */
  public score(button: Button): void {
    this.appendPlayerScore(this.currentPlayer, button.score);
  }

  /**
   * Appends player score
   *
   * @param {Player} player
   * @param {number} appendedScore
   * @memberof DartsService
   */
  public appendPlayerScore(player: Player, appendedScore: number): void {
    const score = player.score + appendedScore * this.multiplier;
    store.commit("players/update", { ...player, score });
  }

  /**
   * Is player a winner
   *
   * @param {Player} player
   * @returns {boolean}
   * @memberof DartsService
   */
  public isWinner(player: Player): boolean {
    return false;
  }
}
