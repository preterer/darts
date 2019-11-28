import Vue from "vue";
import Component from "vue-class-component";

import { ActionButtons } from "../../components/actionButtons/ActionButtons";
import { GameData } from "../../components/gameData/GameData";
import { Modifiers } from "../../components/modifiers/Modifiers";
import { Scoreboard } from "../../components/scoreboard/Scoreboard";
import { ScoreButtons } from "../../components/scoreButtons/ScoreButtons";
import template from "./Game.html";

/**
 * Master out game mode
 *
 * @export
 * @class MasterOut
 * @extends {Vue}
 */
@Component({
  name: "MasterOut",
  template,
  components: { ActionButtons, GameData, Modifiers, Scoreboard, ScoreButtons }
})
export class Game extends Vue {
  /**
   * Game title
   *
   * @readonly
   * @type {string}
   * @memberof Game
   */
  public get title(): string {
    return this.$route.meta.title;
  }
}
