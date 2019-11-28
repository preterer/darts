import Component, { mixins } from "vue-class-component";

import { Button } from "#/interfaces/button";
import { PlayersMixin } from "../../mixins/Players.mixin";
import { DartsService } from "../../services/darts.service";
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
   * Currently used darts service
   *
   * @readonly
   * @type {DartsService}
   * @memberof ScoreButtons
   */
  public get service(): DartsService {
    return this.$store.state.gameMode.service;
  }

  /**
   * CSS classes of a button
   *
   * @param {Button} button
   * @returns {(string | undefined)}
   * @memberof ScoreButtons
   */
  public buttonClass(button: Button): string | undefined {
    if (this.service.isClosed(button)) {
      return button.class + " btn-warning";
    }

    if (this.service.isOpen(button)) {
      return button.class + " btn-success";
    }

    return button.class;
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
   * Perform throw
   *
   * @param {Button} button
   * @memberof ScoreButtons
   */
  public throwAction(button: Button): void {
    this.$store.commit("game/throw", button);
  }
}
