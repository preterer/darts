/**
 * Game of darts state
 *
 * @export
 * @interface Game
 */
export interface Game {
  /**
   * Current multiplier
   *
   * @type {number}
   * @memberof Game
   */
  multiplier: number;

  /**
   * Current turn
   *
   * @type {number}
   * @memberof Game
   */
  turn: number;

  /**
   * Throws left in the current turn
   *
   * @type {number}
   * @memberof Game
   */
  throwsLeft: number;
}
