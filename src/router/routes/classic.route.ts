import { RouteConfig } from "vue-router";

import { DartsService } from "../../services/darts.service";
import { gameRoute } from "../../utils/gameRoute";
import { missButton } from "../../utils/missButton";

export const classicRoute: RouteConfig = gameRoute(
  "classic",
  "/classic",
  "Classic darts",
  new DartsService(),
  missButton(0)
);
