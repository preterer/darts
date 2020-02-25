import { Player } from "#/interfaces/player";
import { store } from "../store/store";
import { DartsService } from "./darts.service";

/**
 * Game of NPoints (ex. 301, 401)
 *
 * @export
 * @class NPoints
 * @extends {DartsService}
 */
export class NPoints extends DartsService {
  constructor(private pointsToGet: number) {
    super();
  }

  /**
   * Appends player score
   *
   * @param {Player} player
   * @param {number} appendedScore
   * @memberof NPoints
   */
  public appendPlayerScore(player: Player, appendedScore: number): void {
    const score = player.score + appendedScore * this.multiplier;
    if (score <= this.pointsToGet) {
      store.commit("players/update", { ...player, score });
    }
  }

  /**
   * Is player a winner
   *
   * @param {Player} player
   * @returns {boolean}
   * @memberof NPoints
   */
  public isWinner(player: Player): boolean {
    return player.score === this.pointsToGet;
  }
}
