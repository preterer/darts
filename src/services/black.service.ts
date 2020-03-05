import { MasterOutService } from "./masterOut.service";

/**
 * Black only master out
 *
 * @export
 * @class BlackService
 * @extends {MasterOutService}
 */
export class BlackService extends MasterOutService {
  constructor() {
    super(0);
    this.scorable.unshift(2, 3, 7, 8, 10, 12, 13, 14, 18, 20);
  }
}
