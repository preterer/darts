import Vue from "vue";
import Component from "vue-class-component";

import { Players } from "../../components/players/Players";
import template from "./Home.html";

@Component({ name: "Home", template, components: { Players } })
export class Home extends Vue {
  public modes = [{ name: "Master Out", route: { name: "masterOut" } }];
}
