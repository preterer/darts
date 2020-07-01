import { RouteConfig } from "vue-router";

import { SequencedService } from "../../services/sequenced.service";
import { gameRoute } from "../../utils/gameRoute";
import { missButton } from "../../utils/missButton";

export const ascendingRoute: RouteConfig = gameRoute(
  "ascending",
  "/ascending",
  "Ascending",
  new SequencedService(false),
  missButton(25)
);
