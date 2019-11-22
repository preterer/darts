import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { Player } from "#/interfaces/player";
import template from "./Row.html";

/**
 * Row of a scoreboard
 *
 * @export
 * @class ScoreboardRow
 * @extends {Vue}
 */
@Component({ name: "ScoreboardRow", template })
export class ScoreboardRow extends Vue {
  /**
   * Player which row will be displayed
   *
   * @type {Player}
   * @memberof ScoreboardRow
   */
  @Prop({ type: Object, required: true })
  public player!: Player;

  /**
   * Displayed numbers
   *
   * @type {number[]}
   * @memberof ScoreboardRow
   */
  @Prop({ type: Array, required: false, default: () => [] })
  public numbers!: number[];
}
