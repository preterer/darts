import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

import template from "./Home.html";

@Component({ name: "Home", template })
export class Home extends Vue {
  public modes = [{ name: "Master Out", route: { name: "masterOut" } }];

  public playersAmount =
    parseInt(localStorage.getItem("players") as string) || 2;

  @Watch("playersAmount")
  public updatePlayers(amount: number) {
    localStorage.setItem("players", amount.toString());
  }
}
