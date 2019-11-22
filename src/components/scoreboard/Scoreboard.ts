import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { Player } from "#/interfaces/player";
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
export class Scoreboard extends Vue {
  /**
   * Displayed numbers
   *
   * @type {number[]}
   * @memberof Scoreboard
   */
  @Prop({ type: Array, required: false, default: () => [] })
  public numbers!: number[];

  /**
   * Current game players
   *
   * @type {Player[]}
   * @memberof Scoreboard
   */
  @Prop({ type: Array, required: true })
  public players!: Player[];
}
