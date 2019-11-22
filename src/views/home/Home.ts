import Vue from "vue";
import Component from "vue-class-component";

import { GameModes } from "../../components/gameModes/GameModes";
import { Players } from "../../components/players/Players";
import template from "./Home.html";

@Component({ name: "Home", template, components: { GameModes, Players } })
export class Home extends Vue {}
