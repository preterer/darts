/**
 * Przycisk wyniku rzutu
 *
 * @export
 * @interface Button
 */
export interface Button {
  /**
   * Tekst przycisku
   *
   * @type {(string | number)}
   * @memberof Button
   */
  text: string | number;

  /**
   * Punktacja
   *
   * @type {number}
   * @memberof Button
   */
  score: number;

  /**
   * Klasa przycisku
   *
   * @type {string}
   * @memberof Button
   */
  class?: string;

  /**
   * Zawsze negatywny wynik
   *
   * @type {boolean}
   * @memberof Button
   */
  alwaysNegative?: boolean;
}
