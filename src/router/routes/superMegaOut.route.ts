import { RouteConfig } from "vue-router";

import { MasterOutService } from "../../services/masterOut.service";
import { gameRoute } from "../../utils/gameRoute";
import { missButton } from "../../utils/missButton";

export const superMegaOutRoute: RouteConfig = gameRoute(
  "superMegaOut",
  "/super-mega-out",
  "Super Mega Out",
  new MasterOutService(20),
  missButton(25)
);
