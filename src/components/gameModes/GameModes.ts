import Vue from "vue";
import Component from "vue-class-component";

import template from "./GameModes.html";

@Component({ name: "GameModes", template })
export class GameModes extends Vue {
  public modes = [{ name: "Master Out", route: { name: "masterOut" } }];
}
