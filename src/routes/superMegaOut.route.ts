import { RouteConfig } from "vue-router";

import { SuperMegaOutService } from "../services/superMegaOut.service";
import { gameRoute } from "../utils/gameRoute";
import { missButton } from "../utils/missButton";

export const superMegaOutRoute: RouteConfig = gameRoute(
  "superMegaOut",
  "/super-mega-out",
  "Super Mega Out",
  new SuperMegaOutService(),
  missButton(25)
);
