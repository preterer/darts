import Component, { mixins } from "vue-class-component";

import { Button } from "#/interfaces/button";
import { GameWithPlayers } from "#/interfaces/gameWithPlayers";
import { Player } from "#/interfaces/player";
import { PlayersMixin } from "./Players.mixin";

/**
 * Mixin of a darts game
 *
 * @export
 * @class DartsMixin
 * @extends {Vue}
 */
@Component
export class DartsMixin extends mixins(PlayersMixin)
  implements GameWithPlayers {
  /**
   * Which player's turn is it
   *
   * @readonly
   * @type {number}
   * @memberof DartsMixin
   */
  public get turn(): number {
    return this.$store.state.game.turn;
  }

  /**
   * Throws left in the current turn
   *
   * @readonly
   * @type {number}
   * @memberof DartsMixin
   */
  public get throwsLeft(): number {
    return this.$store.state.game.throwsLeft;
  }

  /**
   * Score multiplier
   *
   * @readonly
   * @type {number}
   * @memberof DartsMixin
   */
  public get multiplier(): number {
    return this.$store.state.game.multiplier;
  }

  /**
   * Throw action
   *
   * @param {Button} button
   * @memberof DartsMixin
   */
  public throwAction(button: Button): void {
    this.$store.commit("game/throw", button);
  }

  /**
   * Scores a player throw
   *
   * @param {Button} button
   * @memberof DartsMixin
   */
  public score(button: Button): void {
    this.appendPlayerScore(this.currentPlayer, button.score);
  }

  /**
   * Appends player score
   *
   * @param {Player} player
   * @param {number} appendedScore
   * @memberof DartsMixin
   */
  public appendPlayerScore(player: Player, appendedScore: number): void {
    const score = player.score + appendedScore * this.multiplier;
    this.$store.commit("players/update", { ...player, score });
  }

  /**
   * Ends a throw
   *
   * @memberof DartsMixin
   */
  public endThrow(): void {
    this.$store.commit("game/endThrow");
  }

  /**
   * Saves history state
   *
   * @memberof DartsMixin
   */
  public saveHistory(): void {
    this.$store.commit("game/saveHistory");
  }
}
