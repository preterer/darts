import { Game } from "./game";
import { GameWithPlayers } from "./gameWithPlayers";

/**
 * Game of darts state with history
 *
 * @export
 * @interface GameWithHistory
 * @extends {Game}
 */
export interface GameWithHistory extends Game {
  /**
   * History of the game
   *
   * @type {GameWithPlayers[]}
   * @memberof Game
   */
  history: GameWithPlayers[];
}
