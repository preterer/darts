import Component, { mixins } from "vue-class-component";

import { Button } from "#/interfaces/button";
import { Player } from "#/interfaces/player";
import { GameData } from "../../components/gameData/GameData";
import { Scoreboard } from "../../components/scoreboard/Scoreboard";
import { DartsMixin } from "../../mixins/Darts.mixin";
import template from "./MasterOut.html";

/**
 * Master out game mode
 *
 * @export
 * @class MasterOut
 * @extends {mixins(DartsMixin)}
 */
@Component({
  name: "MasterOut",
  template,
  components: { GameData, Scoreboard }
})
export class MasterOut extends mixins(DartsMixin) {
  /**
   * Creates a miss button (different behaviour in different game modes)
   *
   * @returns {Button}
   * @memberof MasterOut
   */
  public getMissButton(): Button {
    return {
      text: "Miss",
      score: 25,
      class: "btn-100 btn-danger",
      alwaysNegative: true
    };
  }

  /**
   * Calculates points
   *
   * @param {Button} button
   * @memberof MasterOut
   */
  public score(player: Player, button: Button): void {
    if (this.scorable.includes(button.score) && !button.alwaysNegative) {
      this.scoreScorable(player, button);
    } else {
      this.appendPlayerScore(player, button);
    }
  }

  /**
   * Scores a scorable field hit
   *
   * @private
   * @param {Player} player
   * @param {Button} button
   * @returns {void}
   * @memberof MasterOut
   */
  private scoreScorable(player: Player, button: Button): void {
    const isClosed = this.players
      .map(player => player.state)
      .every(state => state[button.score] === this.clicksToOpen);
    if (isClosed) {
      return this.appendPlayerScore(player, button);
    }
    this.scoreNotClosed(player, button);
  }

  /**
   * Scores a field that is not closed yet
   *
   * @private
   * @param {Player} currentPlayer
   * @param {Button} button
   * @memberof MasterOut
   */
  private scoreNotClosed(currentPlayer: Player, button: Button) {
    const currentPlayerState = currentPlayer.state;

    if (currentPlayerState[button.score] !== this.clicksToOpen) {
      this.updatePlayerState(currentPlayerState, button);
    }

    if (
      currentPlayerState[button.score] === this.clicksToOpen &&
      this.multiplier
    ) {
      this.addOtherPlayersScore(button);
    }
  }

  /**
   * Updates player state
   *
   * @private
   * @param {*} currentPlayerState
   * @param {Button} button
   * @memberof MasterOut
   */
  private updatePlayerState(currentPlayerState: any, button: Button) {
    const clicksAfterUpdate =
      (currentPlayerState[button.score] || 0) + this.multiplier;

    this.$set(
      currentPlayerState,
      button.score,
      clicksAfterUpdate > this.clicksToOpen
        ? this.clicksToOpen
        : clicksAfterUpdate
    );

    this.multiplier = clicksAfterUpdate - this.clicksToOpen;
  }

  /**
   * Adds scores to other players
   *
   * @private
   * @param {Button} button
   * @memberof MasterOut
   */
  private addOtherPlayersScore(button: Button) {
    this.players
      .filter(player => player.state[button.score] !== this.clicksToOpen)
      .forEach(player => this.appendPlayerScore(player, button));
  }
}
