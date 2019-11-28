import Component, { mixins } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { PlayersMixin } from "../../mixins/Players.mixin";
import { ScoreboardHeader } from "./header/Header";
import { ScoreboardRow } from "./row/Row";
import template from "./Scoreboard.html";

/**
 * Scoreboard component
 *
 * @export
 * @class Scoreboard
 * @extends {Vue}
 */
@Component({
  name: "Scoreboard",
  template,
  components: { ScoreboardHeader, ScoreboardRow }
})
export class Scoreboard extends mixins(PlayersMixin) {
  /**
   * Displayed numbers
   *
   * @type {number[]}
   * @memberof Scoreboard
   */
  @Prop({ type: Array, required: false, default: () => [] })
  public numbers!: number[];
}
