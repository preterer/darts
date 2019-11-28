import Component from "vue-class-component";

import { Mixins } from "vue-property-decorator";
import { DartsMixin } from "../../mixins/Darts.mixin";
import template from "./ActionButtons.html";

@Component({ name: "ActionButtons", template })
export class ActionButtons extends Mixins(DartsMixin) {
  /**
   * Resets state of the game
   *
   * @memberof DartsMixin
   */
  public reset(): void {
    if (
      !!this.winner ||
      confirm("Are you sure you want to reset the game progress?")
    ) {
      this.$store.commit("game/reset");
    }
  }

  /**
   * Undos last throw
   *
   * @memberof DartsMixin
   */
  public undo(): void {
    this.$store.commit("game/undo");
  }
}
