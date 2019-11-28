import { Game } from "./game";
import { GameWithPlayers } from "./gameWithPlayers";

/**
 * State of darts game with history
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
