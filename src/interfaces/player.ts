/**
 * Player
 *
 * @export
 * @interface Player
 */
export interface Player {
  /**
   * Identifier
   *
   * @type {number}
   * @memberof Player
   */
  id?: number;

  /**
   * Name
   *
   * @type {string}
   * @memberof Player
   */
  name: string;

  /**
   * Score
   *
   * @type {number}
   * @memberof Player
   */
  score: number;

  /**
   * State of open/closed fields
   *
   * @type {*}
   * @memberof Player
   */
  state: any;
}
