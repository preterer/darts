/**
 * Player
 *
 * @export
 * @interface Player
 */
export interface Player {
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
