import { RouteConfig } from "vue-router";

import { MasterOutService } from "../../services/masterOut.service";
import { gameRoute } from "../../utils/gameRoute";
import { missButton } from "../../utils/missButton";

export const megaOutRoute: RouteConfig = gameRoute(
  "megaOut",
  "/mega-out",
  "Mega Out",
  new MasterOutService(11),
  missButton(25)
);
