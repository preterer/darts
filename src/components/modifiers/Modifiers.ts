import Vue from "vue";
import Component from "vue-class-component";

import { Modifier } from "#/interfaces/modifier";
import template from "./Modifiers.html";

@Component({ name: "Modifiers", template })
export class Modifiers extends Vue {
  /**
   * List of modifiers
   *
   * @type {Modifier[]}
   * @memberof DartsMixin
   */
  public modifiers: Modifier[] = [
    {
      modifier: 2,
      text: "Double!",
      class: "btn-outline-info btn-50",
      activeClass: "btn-info btn-50"
    },
    {
      modifier: 3,
      text: "Tripple!",
      class: "btn-outline-warning btn-50",
      activeClass: "btn-warning btn-50"
    }
  ];

  /**
   * Score multiplier
   *
   * @readonly
   * @type {number}
   * @memberof DartsMixin
   */
  public get multiplier(): number {
    return this.$store.state.game.multiplier;
  }

  /**
   * Triggers a multiplier
   *
   * @param {number} multiplier
   * @memberof DartsMixin
   */
  public triggerMultiplier(multiplier: number): void {
    this.$store.commit("game/setMultiplier", multiplier);
  }
}
