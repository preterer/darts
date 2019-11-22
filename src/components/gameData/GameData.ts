import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { Player } from "../../interfaces/player";
import template from "./GameData.html";

@Component({ name: "GameData", template })
export class GameData extends Vue {
  @Prop({ type: Object })
  public winner?: Player;

  @Prop({ type: Object, required: true })
  public currentPlayer!: Player;

  @Prop({ type: Number, required: true })
  public throwsLeft!: number;
}
