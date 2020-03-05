import { RouteConfig } from "vue-router";

import { WhiteService } from "../../services/white.service";
import { gameRoute } from "../../utils/gameRoute";
import { missButton } from "../../utils/missButton";

export const whiteRoute: RouteConfig = gameRoute(
  "white",
  "/white",
  "White",
  new WhiteService(),
  missButton(25)
);
