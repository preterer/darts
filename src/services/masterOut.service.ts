import { Button } from "#/interfaces/button";
import { Player } from "#/interfaces/player";
import { store } from "../store/store";
import { DartsService } from "./darts.service";

/**
 * MasterOut darts calculation service
 *
 * @export
 * @class MasterOutService
 * @extends {DartsService}
 */
export class MasterOutService extends DartsService {
  /**
   * Scorable fields
   *
   * @memberof MasterOutService
   */
  public scorable: number[] = [15, 16, 17, 18, 19, 20, 25];

  /**
   * Clicks required to open a field
   *
   * @memberof MasterOutService
   */
  public clicksToOpen = 3;

  constructor(scorableAmount: number = 6, withMiddle: boolean = true) {
    super();
    this.setupScorableFields(scorableAmount, withMiddle);
  }

  /**
   * Players list
   *
   * @readonly
   * @type {Player[]}
   * @memberof MasterOutService
   */
  public get players(): Player[] {
    return store.state.players.list;
  }

  /**
   * Is player a winner
   *
   * @param {Player} player
   * @returns {boolean}
   * @memberof MasterOutService
   */
  public isWinner(player: Player): boolean {
    return this.hasPlayerClosedAll(player) && this.hasPlayerLowestScore(player);
  }

  /**
   * Scores a throw
   *
   * @param {Button} button
   * @memberof MasterOutService
   */
  public score(button: Button): void {
    if (this.canBeScored(button)) {
      this.scoreScorable(button);
    } else {
      this.appendPlayerScore(this.currentPlayer, button.score);
    }
  }

  /**
   * Can button be scored
   *
   * @protected
   * @param {Button} button
   * @returns {boolean}
   * @memberof MasterOutService
   */
  protected canBeScored(button: Button): boolean {
    return this.scorable.includes(button.score) && !button.alwaysNegative;
  }

  /**
   * Scores a scorable field hit
   *
   * @private
   * @param {Button} button
   * @returns {void}
   * @memberof MasterOutService
   */
  private scoreScorable(button: Button): void {
    if (this.isClosed(button)) {
      return this.appendPlayerScore(this.currentPlayer, button.score);
    }
    this.scoreNotClosed(button.score);
  }

  /**
   * Is button closed
   *
   * @param {Button} button
   * @returns {boolean}
   * @memberof MasterOutService
   */
  public isClosed(button: Button): boolean {
    return (
      button.alwaysNegative ||
      this.players.every((player) => this.hasPlayerOpened(player, button.score))
    );
  }

  /**
   * Is button open for current player
   *
   * @param {Button} button
   * @returns {boolean}
   * @memberof MasterOutService
   */
  public isOpen(button: Button): boolean {
    return this.hasPlayerOpened(this.currentPlayer, button.score);
  }

  /**
   * Scores a field that is not closed yet
   *
   * @private
   * @param {number} score
   * @memberof MasterOutService
   */
  private scoreNotClosed(score: number): void {
    if (this.playerState(this.currentPlayer, score) !== this.clicksToOpen) {
      this.updateStateAndMultiplier(score);
    }

    const currentState = this.playerState(this.currentPlayer, score);
    if (currentState === this.clicksToOpen && this.multiplier) {
      this.addOtherPlayersScore(score);
    }
  }

  /**
   * Players state for given score
   *
   * @private
   * @param {Player} player
   * @param {number} score
   * @returns {number}
   * @memberof MasterOutService
   */
  public playerState(player: Player, score: number): number {
    return player.state[score] || 0;
  }

  /**
   * Prepares the scorable fields
   *
   * @protected
   * @param {number} scorableAmount
   * @param {boolean} withMiddle
   * @memberof MasterOutService
   */
  protected setupScorableFields(
    scorableAmount: number,
    withMiddle: boolean
  ): void {
    if (scorableAmount > 20) {
      throw new Error("Scorable amount cannot be higher than 20");
    }

    const firstScorableNumber = this.lowestScorableNumber(scorableAmount);

    this.scorable = new Array(scorableAmount)
      .fill(0)
      .map((_, index) => firstScorableNumber + index);

    if (withMiddle) {
      this.scorable.push(25);
    }
  }

  /**
   * Lowest scorable number
   *
   * @protected
   * @param {number} scorableAmount
   * @returns {number}
   * @memberof MasterOutService
   */
  protected lowestScorableNumber(scorableAmount: number): number {
    return 21 - scorableAmount;
  }

  /**
   * Updates player state and multiplier for scoring calculations
   *
   * @private
   * @param {number} score
   * @memberof MasterOutService
   */
  private updateStateAndMultiplier(score: number): void {
    const clicksBeforeUpdate = this.playerState(this.currentPlayer, score);
    const clicksAfterUpdate = clicksBeforeUpdate + this.multiplier;
    const newMultiplier = clicksAfterUpdate - this.clicksToOpen;
    if (clicksBeforeUpdate !== this.clicksToOpen) {
      this.updateState(this.currentPlayer, clicksAfterUpdate, score);
    }
    store.commit("game/setMultiplier", newMultiplier);
  }

  /**
   * Updates player state
   *
   * @private
   * @param {number} clicks
   * @param {Player} player
   * @param {number} score
   * @memberof MasterOutService
   */
  private updateState(player: Player, clicks: number, score: number): void {
    const newState = Math.min(clicks, this.clicksToOpen);
    store.commit("players/update", {
      ...player,
      state: { ...player.state, [score]: newState },
    });
  }

  /**
   * Adds scores to other players
   *
   * @private
   * @param {number} score
   * @memberof MasterOutService
   */
  private addOtherPlayersScore(score: number): void {
    this.players
      .filter((player) => this.playerState(player, score) !== this.clicksToOpen)
      .forEach((player) => this.appendPlayerScore(player, score));
  }

  /**
   * Checks if player has the lowest score
   *
   * @private
   * @param {Player} player
   * @returns {boolean}
   * @memberof MasterOutService
   */
  private hasPlayerLowestScore(player: Player): boolean {
    return this.players.every((p) => p.score >= player.score);
  }

  /**
   * Chcecks if player has closed all fields
   *
   * @private
   * @param {Player} player
   * @returns {boolean}
   * @memberof MasterOutService
   */
  private hasPlayerClosedAll(player: Player): boolean {
    return this.scorable.every((score) => this.hasPlayerOpened(player, score));
  }

  /**
   * Checks if player has closed a field
   *
   * @private
   * @param {Player} player
   * @param {number} score
   * @returns {boolean}
   * @memberof MasterOutService
   */
  protected hasPlayerOpened(player: Player, score: number): boolean {
    return this.playerState(player, score) === this.clicksToOpen;
  }
}
