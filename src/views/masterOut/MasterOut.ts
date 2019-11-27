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
      this.appendPlayerScore(player, button.score);
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
    if (this.isClosed(button)) {
      return this.appendPlayerScore(player, button.score);
    }
    this.scoreNotClosed(player, button.score);
  }

  /**
   * Scores a field that is not closed yet
   *
   * @private
   * @param {Player} currentPlayer
   * @param {Button} button
   * @memberof MasterOut
   */
  private scoreNotClosed(currentPlayer: Player, score: number): void {
    if (this.playerState(currentPlayer, score) !== this.clicksToOpen) {
      this.updatePlayerState(currentPlayer, score);
    }

    const currentState = this.playerState(currentPlayer, score);
    if (currentState === this.clicksToOpen && this.multiplier) {
      this.addOtherPlayersScore(score);
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
  private updatePlayerState(player: Player, score: number): void {
    const clicksAfterUpdate = this.playerState(player, score) + this.multiplier;
    const newState = Math.min(clicksAfterUpdate, this.clicksToOpen);
    this.$store.commit("players/update", {
      ...player,
      state: { ...player.state, [score]: newState }
    });
    this.$store.commit(
      "game/setMultiplier",
      clicksAfterUpdate - this.clicksToOpen
    );
  }

  /**
   * Adds scores to other players
   *
   * @private
   * @param {Button} button
   * @memberof MasterOut
   */
  private addOtherPlayersScore(score: number): void {
    this.players
      .filter(player => this.playerState(player, score) !== this.clicksToOpen)
      .forEach(player => this.appendPlayerScore(player, score));
  }
}
