import { RouteConfig } from "vue-router";

import { MasterOutService } from "../services/masterOut.service";
import { gameRoute } from "../utils/gameRoute";
import { missButton } from "../utils/missButton";

export const masterOutRoute: RouteConfig = gameRoute(
  "masterOut",
  "/master-out",
  "Master Out",
  new MasterOutService(),
  missButton(25)
);
