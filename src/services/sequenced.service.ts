import { Button } from "#/interfaces/button";
import { MasterOutService } from "./masterOut.service";

export class SequencedService extends MasterOutService {
  constructor(
    private descendingOrder: boolean = true,
    scorableAmount: number = 20,
    withMiddle: boolean = true
  ) {
    super(scorableAmount, withMiddle);
  }

  /**
   * Is button closed
   *
   * @param {Button} button
   * @returns {boolean}
   * @memberof SequencedService
   */
  public isClosed(button: Button): boolean {
    return (
      !button.alwaysNegative &&
      this.isCurrentlyScorable(button) &&
      this.players.every((player) => this.hasPlayerOpened(player, button.score))
    );
  }

  /**
   * Can button be scored
   *
   * @protected
   * @param {Button} button
   * @returns {boolean}
   * @memberof SequencedService
   */
  protected canBeScored(button: Button): boolean {
    return (
      this.scorable.includes(button.score) &&
      !button.alwaysNegative &&
      this.isCurrentlyScorable(button)
    );
  }

  /**
   * First scorable number
   *
   * @private
   * @returns {number}
   * @memberof SequencedService
   */
  private firstScorable(): number {
    return this.descendingOrder
      ? this.scorable[this.scorable.length - 1]
      : this.scorable[0];
  }

  /**
   * Is button currently scorable
   *
   * @private
   * @param {Button} button
   * @returns {boolean}
   * @memberof SequencedService
   */
  private isCurrentlyScorable(button: Button): boolean {
    if (this.firstScorable() === button.score) {
      return true;
    }

    const currentIndex = this.scorable.indexOf(button.score);
    const previousIndex = this.descendingOrder
      ? currentIndex + 1
      : currentIndex - 1;
    const previousScorable = this.scorable[previousIndex];

    return this.hasPlayerOpened(this.currentPlayer, previousScorable);
  }
}
