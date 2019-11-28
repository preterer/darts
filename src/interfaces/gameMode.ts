import { DartsService } from "../services/darts.service";
import { Button } from "./button";

/**
 * Game mode state
 *
 * @export
 * @interface GameMode
 */
export interface GameMode {
  /**
   * Calculation service
   *
   * @type {DartsService}
   * @memberof GameMode
   */
  service: DartsService;

  /**
   * Miss button
   *
   * @type {Button}
   * @memberof GameMode
   */
  missButton: Button;
}
