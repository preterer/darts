import Component, { mixins } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { Button } from "#/interfaces/button";
import { PlayersMixin } from "../../mixins/Players.mixin";
import { store } from "../../store/store";
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
   * Miss button
   *
   * @type {Button}
   * @memberof ScoreButtons
   */
  @Prop({
    type: Object,
    default: () => ({
      text: "Miss!",
      score: 0,
      class: "btn-100 btn-danger",
      alwaysNegative: true
    })
  })
  public missButton!: Button;

  /**
   * Buttons list
   *
   * @type {Button[]}
   * @memberof ScoreButtons
   */
  public buttons: Button[] = this.getButtons();

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
    buttons.push(this.missButton);
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
    if (this.$store.state.calculation.service.isClosed) {
      return this.$store.state.calculation.service.isClosed(button);
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
