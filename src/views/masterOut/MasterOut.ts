import Component, { mixins } from "vue-class-component";

import { Button } from "#/interfaces/button";
import { GameWithPlayers } from "#/interfaces/gameWithPlayers";
import { ActionButtons } from "../../components/actionButtons/ActionButtons";
import { GameData } from "../../components/gameData/GameData";
import { Modifiers } from "../../components/modifiers/Modifiers";
import { Scoreboard } from "../../components/scoreboard/Scoreboard";
import { ScoreButtons } from "../../components/scoreButtons/ScoreButtons";
import { DartsMixin } from "../../mixins/Darts.mixin";
import template from "./MasterOut.html";

/**
 * Master out game mode
 *
 * @export
 * @class MasterOut
 * @extends {mixins(DartsMixin)}
 */
@Component({
  name: "MasterOut",
  template,
  components: { ActionButtons, GameData, Modifiers, Scoreboard, ScoreButtons }
})
export class MasterOut extends mixins(DartsMixin) implements GameWithPlayers {
  /**
   * Miss button which always increases score by 25
   *
   * @returns {Button}
   * @memberof MasterOut
   */
  public missButton: Button = {
    text: "Miss",
    score: 25,
    class: "btn-100 btn-danger",
    alwaysNegative: true
  };
}
