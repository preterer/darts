import Vue from "vue";
import Component from "vue-class-component";

import { Button } from "../interfaces/button";
import { Player } from "../interfaces/player";
import { Modifier } from "../interfaces/modifier";

/**
 * Mixin of a darts game
 *
 * @export
 * @class DartsMixin
 * @extends {Vue}
 */
@Component
export class DartsMixin extends Vue {
  /**
   * Scorable fields
   *
   * @memberof DartsMixin
   */
  public scorable = [15, 16, 17, 18, 19, 20, 25];

  /**
   * Which player's turn is it
   *
   * @memberof DartsMixin
   */
  public turn = 0;

  /**
   * Throws left in the current turn
   *
   * @memberof DartsMixin
   */
  public throwsLeft = 3;

  /**
   * Score multiplier
   *
   * @memberof DartsMixin
   */
  public multiplier = 1;

  /**
   * Clicks required to open a field
   *
   * @memberof DartsMixin
   */
  public clicksToOpen = 3;

  /**
   * List of players
   *
   * @type {Player[]}
   * @memberof DartsMixin
   */
  public players: Player[] = new Array(
    parseInt(localStorage.getItem("players") as string) || 2
  )
    .fill(0)
    .map((_, index) => ({ name: `Player ${index + 1}`, score: 0, state: {} }));

  /**
   * List of modifiers
   *
   * @type {Modifier[]}
   * @memberof DartsMixin
   */
  public modifiers: Modifier[] = [
    { modifier: 2, text: "Double!", class: "btn-info btn-50" },
    { modifier: 3, text: "Tripple!", class: "btn-warning btn-50" }
  ];

  /**
   * Creates buttons
   *
   * @returns
   * @memberof DartsMixin
   */
  public data() {
    const buttons: Button[] = new Array(20).fill(0).map((_, index) => ({
      text: index + 1,
      score: index + 1,
      class: "btn-20"
    }));
    buttons.push({ text: "Bulls eye!", score: 25, class: "btn-100" });
    buttons.push({
      text: "Miss!",
      score: 25,
      class: "btn-100 btn-danger",
      alwaysNegative: true
    });

    return { buttons };
  }

  /**
   * Triggers a multiplier
   *
   * @param {number} modifier
   * @memberof DartsMixin
   */
  public triggerMultiplier(modifier: number) {
    if (this.multiplier === modifier) {
      this.multiplier = 1;
    } else {
      this.multiplier = modifier;
    }
  }

  /**
   * Appends player score
   *
   * @param {Player} player
   * @param {Button} button
   * @memberof DartsMixin
   */
  public appendPlayerScore(player: Player, button: Button): void {
    player.score += button.score * this.multiplier;
  }

  /**
   * Ends a throw
   *
   * @memberof DartsMixin
   */
  public endThrow() {
    this.multiplier = 1;
    this.throwsLeft--;
    if (this.throwsLeft === 0) {
      this.throwsLeft = 3;
      this.turn = (this.turn + 1) % this.players.length;
    }
  }
}
