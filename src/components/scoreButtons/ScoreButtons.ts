import Component, { mixins } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { Button } from "#/interfaces/button";
import { DartsMixin } from "../../mixins/Darts.mixin";
import template from "./ScoreButtons.html";

@Component({ name: "ScoreButtons", template })
export class ScoreButtons extends mixins(DartsMixin) {
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
   * @memberof DartsMixin
   */
  public buttons: Button[] = this.getButtons();

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
    buttons.push(this.missButton);
    return buttons;
  }
}
