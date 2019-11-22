import Vue from "vue";
import Component from "vue-class-component";

import { Player } from "#/interfaces/player";

@Component
export class PlayersMixin extends Vue {
  /**
   * List of players
   *
   * @type {Player[]}
   * @memberof Players
   */
  public get players(): Player[] {
    return this.$store.state.players.list;
  }
}
