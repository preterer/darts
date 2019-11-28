import { GameMode } from "./gameMode";
import { GameWithHistory } from "./gameWithHistory";
import { Players } from "./players";

/**
 * State of the store
 *
 * @export
 * @interface StoreState
 */
export interface StoreState {
  /**
   * Game mode module state
   *
   * @type {GameMode}
   * @memberof StoreState
   */
  gameMode: GameMode;

  /**
   * Game module state
   *
   * @type {GameWithHistory}
   * @memberof StoreState
   */
  game: GameWithHistory;

  /**
   * Players module state
   *
   * @type {Players}
   * @memberof StoreState
   */
  players: Players;
}
