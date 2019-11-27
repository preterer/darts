import { Game } from "./game";
import { Player } from "./player";

/**
 * Game of darts state with players
 *
 * @export
 * @interface GameWithPlayers
 * @extends {Game}
 */
export interface GameWithPlayers extends Game {
  /**
   * Players list
   *
   * @type {Player[]}
   * @memberof GameWithPlayers
   */
  players: Player[];
}
