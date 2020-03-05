import { MasterOutService } from "./masterOut.service";

/**
 * White only master out
 *
 * @export
 * @class WhiteService
 * @extends {MasterOutService}
 */
export class WhiteService extends MasterOutService {
  constructor() {
    super(0);
    this.scorable.unshift(1, 4, 5, 6, 9, 11, 15, 16, 17, 19);
  }
}
