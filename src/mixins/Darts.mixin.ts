import Component, { mixins } from "vue-class-component";

import { Button } from "#/interfaces/button";
import { GameWithPlayers } from "#/interfaces/gameWithPlayers";
import { Modifier } from "#/interfaces/modifier";
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
  public buttons: Button[] = this.getButtons();

  /**
   * Clicks required to open a field
   *
   * @memberof DartsMixin
   */
  public clicksToOpen = 3;

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
   * Current player
   *
   * @readonly
   * @type {Player}
   * @memberof DartsMixin
   */
  public get currentPlayer(): Player {
    return this.players[this.turn];
  }

  /**
   * Returns winner of the game if it's finished yet
   *
   * @returns {(Player | undefined)}
   * @memberof DartsMixin
   */
  public get winner(): Player | undefined {
    return this.players.find(
      player =>
        this.hasPlayerClosedAll(player) && this.hasPlayerLowestScore(player)
    );
  }

  /**
   * Creates score buttons
   *
   * @private
   * @returns {Button[]}
   * @memberof DartsMixin
   */
  private getButtons(): Button[] {
    const buttons: Button[] = new Array(20).fill(0).map((_, index) => ({
      text: index + 1,
      score: index + 1,
      class: "btn-20"
    }));
    buttons.push({ text: "Bulls eye!", score: 25, class: "btn-100" });
    buttons.push(this.getMissButton());
    return buttons;
  }

  /**
   * Creates a miss button (different behaviour in different game modes)
   *
   * @returns {Button}
   * @memberof DartsMixin
   */
  public getMissButton(): Button {
    return {
      text: "Miss!",
      score: 0,
      class: "btn-100 btn-danger",
      alwaysNegative: true
    };
  }

  /**
   * Is button closed
   *
   * @param {Button} button
   * @returns {boolean}
   * @memberof DartsMixin
   */
  public isClosed(button: Button): boolean {
    return (
      !button.alwaysNegative &&
      this.players.every(player => this.hasPlayerClosed(player, button.score))
    );
  }

  /**
   * Players state for given score
   *
   * @private
   * @param {Player} player
   * @param {number} score
   * @returns {number}
   * @memberof DartsMixin
   */
  public playerState(player: Player, score: number): number {
    return player.state[score] || 0;
  }

  /**
   * Throw action
   *
   * @param {Button} button
   * @memberof DartsMixin
   */
  public throwAction(button: Button): void {
    this.saveHistory();
    this.score(button);
    this.endThrow();
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
    this.$store.commit("game/throw");
  }

  /**
   * Saves history state
   *
   * @memberof DartsMixin
   */
  public saveHistory(): void {
    this.$store.commit("game/saveHistory");
  }

  /**
   * Checks if player has the lowest score
   *
   * @private
   * @param {Player} player
   * @returns {boolean}
   * @memberof DartsMixin
   */
  private hasPlayerLowestScore(player: Player): boolean {
    return this.players.every(p => p.score >= player.score);
  }

  /**
   * Chcecks if player has closed all fields
   *
   * @private
   * @param {Player} player
   * @returns {boolean}
   * @memberof DartsMixin
   */
  private hasPlayerClosedAll(player: Player): boolean {
    return this.scorable.every(score => this.hasPlayerClosed(player, score));
  }

  /**
   * Checks if player has closed a field
   *
   * @private
   * @param {Player} player
   * @param {number} score
   * @returns {boolean}
   * @memberof DartsMixin
   */
  private hasPlayerClosed(player: Player, score: number): boolean {
    return this.playerState(player, score) === this.clicksToOpen;
  }
}
