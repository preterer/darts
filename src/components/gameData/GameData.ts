import Component, { mixins } from "vue-class-component";

import { DartsMixin } from "../../mixins/Darts.mixin";
import template from "./GameData.html";

/**
 * Game data component
 *
 * @export
 * @class GameData
 * @extends {Vue}
 */
@Component({ name: "GameData", template })
export class GameData extends mixins(DartsMixin) {}
