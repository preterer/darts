import Component, { mixins } from "vue-class-component";

import { Button } from "#/interfaces/button";
import { GameWithPlayers } from "#/interfaces/gameWithPlayers";
import { Player } from "#/interfaces/player";
import { ActionButtons } from "../../components/actionButtons/ActionButtons";
import { GameData } from "../../components/gameData/GameData";
import { Modifiers } from "../../components/modifiers/Modifiers";
import { Scoreboard } from "../../components/scoreboard/Scoreboard";
import { ScoreButtons } from "../../components/scoreButtons/ScoreButtons";
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
  components: { ActionButtons, GameData, Modifiers, Scoreboard, ScoreButtons }
})
export class MasterOut extends mixins(DartsMixin) implements GameWithPlayers {
  /**
   * Miss button which always increases score by 25
   *
   * @returns {Button}
   * @memberof MasterOut
   */
  public missButton: Button = {
    text: "Miss",
    score: 25,
    class: "btn-100 btn-danger",
    alwaysNegative: true
  };

  /**
   * Scores a throw
   *
   * @param {Button} button
   * @memberof MasterOut
   */
  public score(button: Button): void {
    if (this.scorable.includes(button.score) && !button.alwaysNegative) {
      this.scoreScorable(button);
    } else {
      this.appendPlayerScore(this.currentPlayer, button.score);
    }
  }

  /**
   * Scores a scorable field hit
   *
   * @private
   * @param {Button} button
   * @returns {void}
   * @memberof MasterOut
   */
  private scoreScorable(button: Button): void {
    if (this.isClosed(button)) {
      return this.appendPlayerScore(this.currentPlayer, button.score);
    }
    this.scoreNotClosed(button.score);
  }

  /**
   * Scores a field that is not closed yet
   *
   * @private
   * @param {number} score
   * @memberof MasterOut
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
   * Updates player state and multiplier for scoring calculations
   *
   * @private
   * @param {number} score
   * @memberof MasterOut
   */
  private updateStateAndMultiplier(score: number): void {
    const clicksBeforeUpdate = this.playerState(this.currentPlayer, score);
    const clicksAfterUpdate = clicksBeforeUpdate + this.multiplier;
    const newMultiplier = clicksAfterUpdate - this.clicksToOpen;
    if (clicksBeforeUpdate !== this.clicksToOpen) {
      this.updateState(this.currentPlayer, clicksAfterUpdate, score);
    }
    this.$store.commit("game/setMultiplier", newMultiplier);
  }

  /**
   * Updates player state
   *
   * @private
   * @param {number} clicks
   * @param {Player} player
   * @param {number} score
   * @memberof MasterOut
   */
  private updateState(player: Player, clicks: number, score: number): void {
    const newState = Math.min(clicks, this.clicksToOpen);
    this.$store.commit("players/update", {
      ...player,
      state: { ...player.state, [score]: newState }
    });
  }

  /**
   * Adds scores to other players
   *
   * @private
   * @param {number} score
   * @memberof MasterOut
   */
  private addOtherPlayersScore(score: number): void {
    this.players
      .filter(player => this.playerState(player, score) !== this.clicksToOpen)
      .forEach(player => this.appendPlayerScore(player, score));
  }
}
