import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

import template from "./Btn.html";

/**
 * Button component
 *
 * @export
 * @class Button
 * @extends {Vue}
 */
@Component({ name: "Button", template })
export class Btn extends Vue {
  /**
   * Button text
   *
   * @type {string}
   * @memberof Button
   */
  @Prop({ type: [String, Number] })
  public text?: string | number;

  /**
   * Icon class
   *
   * @type {string}
   * @memberof Button
   */
  @Prop({ type: String })
  public icon?: string;

  /**
   * Final icon classes with margin
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof Button
   */
  public get iconClasses(): string | undefined {
    if (this.text) {
      return this.icon + " mr-2";
    }
    return this.icon;
  }
}
