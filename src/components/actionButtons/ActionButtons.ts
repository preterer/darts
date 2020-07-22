import Component from "vue-class-component";
import { Mixins } from "vue-property-decorator";

import { PlayersMixin } from "../../mixins/Players.mixin";
import template from "./ActionButtons.html";

/**
 * Action buttons component
 *
 * @export
 * @class ActionButtons
 * @extends {Mixins(PlayersMixin)}
 */
@Component({ name: "ActionButtons", template })
export class ActionButtons extends Mixins(PlayersMixin) {
  /**
   * Resets state of the game
   *
   * @memberof ActionButtons
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
   * @memberof ActionButtons
   */
  public undo(): void {
    this.$store.commit("game/undo");
  }

  /**
   * Undos current turn
   *
   * @memberof ActionButtons
   */
  public undoTurn(): void {
    this.$store.commit("game/undoTurn");
  }
}
