import Vue from "vue";
import Component from "vue-class-component";

import template from "./GameModes.html";

/**
 * Game modes component
 *
 * @export
 * @class GameModes
 * @extends {Vue}
 */
@Component({ name: "GameModes", template })
export class GameModes extends Vue {
  /**
   * Available game modes
   *
   * @memberof GameModes
   */
  public modes = [{ name: "Master Out", route: { name: "masterOut" } }];
}
