import Component, { mixins } from "vue-class-component";

import { Button } from "#/interfaces/button";
import { PlayersMixin } from "../../mixins/Players.mixin";
import template from "./ScoreButtons.html";

/**
 * Score buttons component
 *
 * @export
 * @class ScoreButtons
 * @extends {mixins(PlayersMixin)}
 */
@Component({ name: "ScoreButtons", template })
export class ScoreButtons extends mixins(PlayersMixin) {
  /**
   * Default buttons list
   *
   * @type {Button[]}
   * @memberof ScoreButtons
   */
  private defaultButtons: Button[] = this.getButtons();

  /**
   * Miss button
   *
   * @readonly
   * @type {Button}
   * @memberof ScoreButtons
   */
  public get missButton(): Button {
    return this.$store.state.gameMode.missButton;
  }

  /**
   * Buttons list
   *
   * @readonly
   * @type {Button[]}
   * @memberof ScoreButtons
   */
  public get buttons(): Button[] {
    return [...this.defaultButtons, this.missButton];
  }

  /**
   * Creates score buttons
   *
   * @private
   * @returns {Button[]}
   * @memberof ScoreButtons
   */
  private getButtons(): Button[] {
    const buttons: Button[] = new Array(20).fill(0).map((_, index) => ({
      text: index + 1,
      score: index + 1,
      class: "btn-20"
    }));
    buttons.push({ text: "Bulls eye!", score: 25, class: "btn-100" });
    return buttons;
  }

  /**
   * Is button closed
   *
   * @param {Button} button
   * @returns {boolean}
   * @memberof ScoreButtons
   */
  public isClosed(button: Button): boolean {
    if (this.$store.state.gameMode.service.isClosed) {
      return this.$store.state.gameMode.service.isClosed(button);
    }
    return false;
  }

  /**
   * Perform throw
   *
   * @param {Button} button
   * @memberof ScoreButtons
   */
  public throwAction(button: Button): void {
    this.$store.commit("game/throw", button);
  }
}
