import { MasterOutService } from "./masterOut.service";

export class ReverseService extends MasterOutService {
  /**
   * Lowest scorable number
   *
   * @protected
   * @returns {number}
   * @memberof ReverseService
   */
  protected firstScorableNumber(): number {
    return 1;
  }
}
