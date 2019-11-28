import Vue from "vue";
import Component from "vue-class-component";

import { routes } from "../../router/router";
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
  public modes = routes
    .filter(route => route.meta && route.meta.game)
    .map(route => ({ title: route.meta.title, route: { name: route.name } }));
}
