/**
 * Zawodnik
 *
 * @export
 * @interface Player
 */
export interface Player {
  /**
   * Nazwa zawodnika
   *
   * @type {string}
   * @memberof Player
   */
  name: string;

  /**
   * Aktualny wynik
   *
   * @type {number}
   * @memberof Player
   */
  score: number;

  /**
   * Stan zakmniętych/otwartych pól
   *
   * @type {*}
   * @memberof Player
   */
  state: any;
}
