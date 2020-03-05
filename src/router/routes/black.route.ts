import { RouteConfig } from "vue-router";

import { BlackService } from "../../services/black.service";
import { gameRoute } from "../../utils/gameRoute";
import { missButton } from "../../utils/missButton";

export const blackRoute: RouteConfig = gameRoute(
  "black",
  "/black",
  "Black",
  new BlackService(),
  missButton(25)
);
