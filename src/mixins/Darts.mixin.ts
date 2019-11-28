import Component, { mixins } from "vue-class-component";

import { GameWithPlayers } from "#/interfaces/gameWithPlayers";
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
}
