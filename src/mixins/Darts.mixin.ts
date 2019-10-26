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
   * Buttons list
   *
   * @type {Button[]}
   * @memberof DartsMixin
   */
  public buttons!: Button[];

  /**
   * Which player's turn is it
   *
   * @memberof DartsMixin
   */
  public turn!: number;

  /**
   * Throws left in the current turn
   *
   * @memberof DartsMixin
   */
  public throwsLeft!: number;

  /**
   * Players list
   *
   * @type {Player[]}
   * @memberof DartsMixin
   */
  public players!: Player[];

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
    const buttons: Button[] = this.getButtons();
    const gameData = localStorage.getItem("game");
    if (gameData) {
      const parsedGameData = JSON.parse(gameData);
      return {
        buttons,
        players: parsedGameData.players,
        turn: parsedGameData.turn,
        throwsLeft: parsedGameData.throwsLeft
      };
    }
    return { buttons, players: this.getPlayers(), turn: 0, throwsLeft: 3 };
  }

  /**
   * Creates players list
   *
   * @private
   * @returns {Player[]}
   * @memberof DartsMixin
   */
  private getPlayers(): Player[] {
    return new Array(parseInt(localStorage.getItem("players") as string) || 2)
      .fill(0)
      .map((_, index) => ({
        name: `Player ${index + 1}`,
        score: 0,
        state: {}
      }));
  }

  /**
   * Creates score buttons
   *
   * @private
   * @returns
   * @memberof DartsMixin
   */
  private getButtons() {
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
    return buttons;
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
    this.saveState();
  }

  /**
   * Saves current state of the game
   *
   * @memberof DartsMixin
   */
  public saveState() {
    localStorage.setItem(
      "game",
      JSON.stringify({
        players: this.players,
        turn: this.turn,
        throwsLeft: this.throwsLeft
      })
    );
  }

  /**
   * Resets state of the game
   *
   * @memberof DartsMixin
   */
  reset() {
    localStorage.removeItem("game");
    location.reload();
  }
}
