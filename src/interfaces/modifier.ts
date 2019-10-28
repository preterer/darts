/**
 * Throw modifier
 *
 * @export
 * @interface Modifier
 */
export interface Modifier {
  /**
   * Button text
   *
   * @type {string}
   * @memberof Modifier
   */
  text: string;

  /**
   * Modifier
   *
   * @type {number}
   * @memberof Modifier
   */
  modifier: number;

  /**
   * CSS class
   *
   * @type {string}
   * @memberof Modifier
   */
  class?: string;

  /**
   * CSS class when active
   *
   * @type {string}
   * @memberof Modifier
   */
  activeClass?: string;
}
