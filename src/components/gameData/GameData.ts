import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { Player } from "#/interfaces/player";
import template from "./GameData.html";

/**
 * Game data component
 *
 * @export
 * @class GameData
 * @extends {Vue}
 */
@Component({ name: "GameData", template })
export class GameData extends Vue {
  /**
   * Game winner
   *
   * @type {Player}
   * @memberof GameData
   */
  @Prop({ type: Object })
  public winner?: Player;

  /**
   * Currently throwing player
   *
   * @type {Player}
   * @memberof GameData
   */
  @Prop({ type: Object, required: true })
  public currentPlayer!: Player;

  /**
   * Throws left in players turn
   *
   * @type {number}
   * @memberof GameData
   */
  @Prop({ type: Number, required: true })
  public throwsLeft!: number;
}
