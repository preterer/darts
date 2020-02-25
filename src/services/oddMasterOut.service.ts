import { MasterOutService } from "./masterOut.service";

/**
 * Odd (or even) master out
 *
 * Only counts odd or even numbers as scorable
 *
 * @export
 * @class OddMasterOutService
 * @extends {MasterOutService}
 */
export class OddMasterOutService extends MasterOutService {
  constructor(odd: boolean = true) {
    super(20);
    this.scorable = this.scorable.filter(n => (n % 2 === 1) === odd);
  }
}
