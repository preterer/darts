/**
 * Score button
 *
 * @export
 * @interface Button
 */
export interface Button {
  /**
   * Button text
   *
   * @type {(string | number)}
   * @memberof Button
   */
  text: string | number;

  /**
   * Score
   *
   * @type {number}
   * @memberof Button
   */
  score: number;

  /**
   * CSS classes
   *
   * @type {string}
   * @memberof Button
   */
  class?: string;

  /**
   * Always score as negative
   *
   * @type {boolean}
   * @memberof Button
   */
  alwaysNegative?: boolean;
}
