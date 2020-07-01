import { RouteConfig } from "vue-router";

import { ReverseService } from "../../services/reverse.service";
import { gameRoute } from "../../utils/gameRoute";
import { missButton } from "../../utils/missButton";

export const reverseFifteenNoMiddleRoute: RouteConfig = gameRoute(
  "reverseFifteenNoMiddle",
  "/reverse-fifteen-no-middle",
  "Reverse Fifteen No Middle",
  new ReverseService(15, false),
  missButton(25)
);
