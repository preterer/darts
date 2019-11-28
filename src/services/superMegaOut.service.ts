import { MasterOutService } from "./masterOut.service";

/**
 * Super mega out calculation service
 * It's like master out, but all the fields are scorable
 *
 * @export
 * @class SuperMegaOutService
 * @extends {MasterOutService}
 */
export class SuperMegaOutService extends MasterOutService {
  constructor() {
    super();
    this.scorable = new Array(20).fill(0).map((_, index) => index + 1);
    this.scorable.push(25);
  }
}
