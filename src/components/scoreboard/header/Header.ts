import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

import template from "./Header.html";

/**
 * Header of the scoreboard
 *
 * @export
 * @class ScoreboardHeader
 * @extends {Vue}
 */
@Component({ name: "ScoreboardHeader", template })
export class ScoreboardHeader extends Vue {
  /**
   * Displayed numbers
   *
   * @type {number[]}
   * @memberof ScoreboardHeader
   */
  @Prop({ type: Array, required: false, default: () => [] })
  public numbers!: number[];
}
