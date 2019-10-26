/**
 * Modyfikator wartości
 *
 * @export
 * @interface Modifier
 */
export interface Modifier {
  /**
   * Tekst przycisku
   *
   * @type {string}
   * @memberof Modifier
   */
  text: string;

  /**
   * Modyfikator
   *
   * @type {number}
   * @memberof Modifier
   */
  modifier: number;

  /**
   * Klasa przycisku
   *
   * @type {string}
   * @memberof Modifier
   */
  class?: string;
}
