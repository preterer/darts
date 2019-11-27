import Component, { mixins } from "vue-class-component";

import { Button } from "#/interfaces/button";
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
export class DartsMixin extends mixins(PlayersMixin) {
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
   * Game history
   *
   * @private
   * @type {any[]}
   * @memberof DartsMixin
   */
  private history: any[] =
    JSON.parse(localStorage.getItem("history") as string) || [];

  /**
   * List of modifiers
   *
   * @type {Modifier[]}
   * @memberof DartsMixin
   */
  public modifiers: Modifier[] = [
    {
      modifier: 2,
      text: "Double!",
      class: "btn-outline-info btn-50",
      activeClass: "btn-info btn-50"
    },
    {
      modifier: 3,
      text: "Tripple!",
      class: "btn-outline-warning btn-50",
      activeClass: "btn-warning btn-50"
    }
  ];

  /**
   * Creates buttons
   *
   * @returns
   * @memberof DartsMixin
   */
  public data() {
    const gameData = localStorage.getItem("game");
    if (gameData) {
      const parsedGameData = JSON.parse(gameData);
      return {
        turn: parsedGameData.turn,
        throwsLeft: parsedGameData.throwsLeft
      };
    }
    return { turn: 0, throwsLeft: 3 };
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
   * Triggers a multiplier
   *
   * @param {number} modifier
   * @memberof DartsMixin
   */
  public triggerMultiplier(modifier: number): void {
    if (this.multiplier === modifier) {
      this.multiplier = 1;
    } else {
      this.multiplier = modifier;
    }
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
      this.players.every(
        player => player.state[button.score] === this.clicksToOpen
      )
    );
  }

  /**
   * Checks if the game is finished
   *
   * @returns {boolean}
   * @memberof DartsMixin
   */
  public winner(): Player | undefined {
    return this.players.find(
      player =>
        this.hasPlayerClosedAll(player) && this.hasPlayerLowestScore(player)
    );
  }

  /**
   * Checks if player has the lowest score
   *
   * @private
   * @param {Player} player
   * @returns {unknown}
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
   * @returns
   * @memberof DartsMixin
   */
  private hasPlayerClosedAll(player: Player): boolean {
    return this.scorable.every(
      score => player.state[score] === this.clicksToOpen
    );
  }

  /**
   * Throw action
   *
   * @param {Button} button
   * @memberof DartsMixin
   */
  public throwAction(button: Button): void {
    this.saveHistory();
    const player = this.players[this.turn];
    this.score(player, button);
    this.endThrow();
  }

  /**
   * Scores a player throw
   *
   * @param {Player} player
   * @param {Button} button
   * @memberof DartsMixin
   */
  public score(player: Player, button: Button): void {
    this.appendPlayerScore(player, button.score);
  }

  /**
   * Appends player score
   *
   * @param {Player} player
   * @param {Button} button
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
    this.multiplier = 1;
    this.throwsLeft--;
    if (this.throwsLeft === 0) {
      this.throwsLeft = 3;
      this.turn = (this.turn + 1) % this.players.length;
    }
    this.saveState();
  }

  /**
   * Saves history state
   *
   * @memberof DartsMixin
   */
  public saveHistory(): void {
    this.history.push(JSON.parse(JSON.stringify(this.getState())));
    localStorage.setItem("history", JSON.stringify(this.history));
  }

  /**
   * Saves current state of the game
   *
   * @memberof DartsMixin
   */
  public saveState(): void {
    localStorage.setItem("game", JSON.stringify(this.getState()));
  }

  /**
   * Creates state object
   *
   * @private
   * @returns
   * @memberof DartsMixin
   */
  private getState() {
    return {
      players: this.players,
      turn: this.turn,
      throwsLeft: this.throwsLeft
    };
  }

  /**
   * Resets state of the game
   *
   * @memberof DartsMixin
   */
  public reset(): void {
    if (
      !!this.winner() ||
      confirm("Are you sure you want to reset the game progress?")
    ) {
      localStorage.removeItem("game");
      this.players.forEach(player =>
        this.$store.commit("players/update", { ...player, score: 0, state: {} })
      );
      this.throwsLeft = 3;
    }
  }

  /**
   * Undos last throw
   *
   * @memberof DartsMixin
   */
  public undo(): void {
    if (this.history.length) {
      const state = this.history.pop();
      state.players.forEach((player: Player) =>
        this.$store.commit("players/update", player)
      );
      this.turn = state.turn;
      this.throwsLeft = state.throwsLeft;
      this.saveState();
    }
  }
}
