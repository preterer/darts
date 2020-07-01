import { RouteConfig } from "vue-router";

import { ReverseService } from "../../services/reverse.service";
import { gameRoute } from "../../utils/gameRoute";
import { missButton } from "../../utils/missButton";

export const reverseFifteenRoute: RouteConfig = gameRoute(
  "reverseFifteen",
  "/reverse-fifteen",
  "Reverse Fifteen",
  new ReverseService(15),
  missButton(25)
);
