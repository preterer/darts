import { RouteConfig } from "vue-router";

import { ReverseService } from "../../services/reverse.service";
import { gameRoute } from "../../utils/gameRoute";
import { missButton } from "../../utils/missButton";

export const reverseTenRoute: RouteConfig = gameRoute(
  "reverseTen",
  "/reverse-ten",
  "Reverse Ten",
  new ReverseService(10),
  missButton(25)
);
