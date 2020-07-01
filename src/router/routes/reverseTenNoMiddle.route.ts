import { RouteConfig } from "vue-router";

import { ReverseService } from "../../services/reverse.service";
import { gameRoute } from "../../utils/gameRoute";
import { missButton } from "../../utils/missButton";

export const reverseTenNoMiddleRoute: RouteConfig = gameRoute(
  "reverseTenNoMiddle",
  "/reverse-ten-no-middle",
  "Reverse Ten No Middle",
  new ReverseService(10, false),
  missButton(25)
);
